---
name: ep-condition-generator
description: Phân tích yêu cầu tính năng (functional requirement) để trích xuất và định nghĩa các điều kiện kiểm thử (Test Conditions) dựa trên phương pháp Phân vùng tương đương (Equivalence Partitioning).
---

# Tạo Điều kiện Kiểm thử bằng Phân Vùng Tương Đương (EP Condition Generator)

## When to use this skill
- Sử dụng khi người dùng yêu cầu phân tích điều kiện kiểm thử cho một tính năng (feature) cụ thể.
- Lệnh kích hoạt ví dụ: `ep-condition-generator [Tên tính năng]`.
- Chú ý: Lệnh gọi skill sẽ KHÔNG truyền trực tiếp nội dung mô tả chức năng vào câu lệnh. Agent bắt buộc phải TỰ ĐỘNG đọc file tài liệu (ví dụ: `report.md` hoặc file chứa mô tả yêu cầu) của feature đó để lấy nội dung phân tích.

## Core Principles (Quy tắc cốt lõi)
Dựa theo lý thuyết chuẩn của Phân vùng tương đương (Equivalence Partitioning Theory):
1. **Chỉ tập trung vào Input Domain**: Mọi phân tích phải hoàn toàn dựa trên dữ liệu đầu vào (dữ liệu người dùng nhập, tham số API, trạng thái hiện tại tác động lên nghiệp vụ, v.v...).
2. **Không phân vùng theo Trạng thái UI (No UI State Partitioning)**: Bỏ qua các yếu tố trạng thái giao diện (ví dụ: Nút bấm bị mờ, màu sắc hiển thị) khi xác định điều kiện.
3. **Không tạo lớp tương đương dựa trên kết quả (No Outcome-based Classes)**: Điều kiện phải là nguyên nhân (input/rule), không phải là hệ quả (success, error_page).
4. **Không trộn lẫn (No Mixed Concerns)**: Mỗi điều kiện (Condition) chỉ được tập trung vào duy nhất MỘT biến (variable) hoặc một quy tắc độc lập.
5. **Thể hiện Ràng buộc Nghiệp vụ/Logic (Business Rules / Constraints)**: Một Điều kiện kiểm thử (Test Condition) phải thể hiện một quy tắc kiểm tra hoặc ràng buộc logic cụ thể mà đầu vào phải tuân thủ (ví dụ: quy tắc chuyển đổi trạng thái, điều kiện về định dạng, độ dài, v.v.), CHỨ KHÔNG ĐƯỢC chỉ đơn thuần liệt kê tên biến và các giá trị của nó (ví dụ: Tránh việc viết "C1: Trạng thái hiện tại (pending, confirmed)").

## How to use it (Workflow)
Khi thực thi skill này, Agent cần làm theo các bước sau:
1. **Phân tích yêu cầu**: Đọc kỹ mô tả chức năng người dùng cung cấp. Nhận diện toàn bộ các biến đầu vào (variables) và các ràng buộc (constraints/business rules).
2. **Trích xuất Điều kiện (Extract Conditions)**: 
   - Tách từng biến đầu vào hoặc từng quy tắc logic thành một Điều kiện riêng biệt.
   - Thể hiện rõ ràng các ràng buộc nghiệp vụ hoặc điều kiện chuyển đổi trạng thái dưới dạng các mệnh đề kiểm tra.
   - Đảm bảo vét cạn tất cả các quy tắc đã được mô tả (độ dài, định dạng, ký tự đặc biệt, quan hệ giữa các biến, quy tắc chuyển đổi trạng thái...).
3. **Xuất kết quả (Output Format)**:
   - Trình bày dưới dạng danh sách tuần tự.
   - Định dạng: `C[STT]: [Tên Biến/Yếu tố] [ràng buộc/quy tắc cần kiểm tra]`
   - Ví dụ:
     - `C1: Username bắt đầu bằng ký tự`
     - `C2: Username chưa tồn tại`
     - `C3: Username có ký tự đặc biệt`
     - `C4: Password có >= 6 ký tự`
     - `C5: Password có >= 2 ký tự đặc biệt`

## AI Behavior Constraints
- Agent không được tự ý sinh ra Test Case ngay lập tức. Chỉ dừng lại ở việc liệt kê các Điều Kiện (C1, C2, C3...).
- Luôn giải thích ngắn gọn tại sao chọn các biến/điều kiện này dựa trên yêu cầu đề bài.
- **Tự động đọc tài liệu (Read Context)**: Bắt buộc sử dụng các tool đọc file (ví dụ `view_file` hoặc tương tự) để tìm và lấy nội dung mô tả của tính năng từ các file nằm trong thư mục workspace hiện tại. **KHÔNG** được đọc tài liệu ở bất kỳ thư mục nào khác ngoài workspace hiện tại (ví dụ: thư mục cha, thư mục anh em, v.v.).
- **Xử lý khi thiếu thông tin**: Nếu tìm khắp thư mục workspace hiện tại mà không có tài liệu mô tả yêu cầu tính năng đó, Agent phải báo lỗi là không tìm thấy yêu cầu, tuyệt đối **KHÔNG** tự ý sinh ra (bịa ra/hallucinate) nội dung yêu cầu tính năng.
- **Zero Fluff (Không dài dòng)**: Bỏ qua toàn bộ các lời chào hỏi (như "Chào bạn", "Vâng, tôi sẽ làm") hay các câu kết luận sáo rỗng. Hãy đi thẳng vào vấn đề và trả về kết quả chuyên nghiệp, súc tích.
