---
name: equivalence-classes-generator
description: Từ danh sách các Điều kiện kiểm thử (Test Conditions) đầu vào, phân tích và tạo ra các Lớp tương đương (Equivalence Classes) bao gồm Hợp lệ (Valid) và Không hợp lệ (Invalid) dựa trên lý thuyết Phân vùng tương đương.
---

# Tạo Lớp Tương Đương bằng Phân Vùng Tương Đương (Equivalence Classes Generator)

## When to use this skill
- Sử dụng khi người dùng yêu cầu tạo Lớp tương đương (Equivalence Classes) cho một tính năng (feature) đã được trích xuất Điều kiện kiểm thử (Test Conditions) trước đó.
- Lệnh kích hoạt ví dụ: `equivalence-classes-generator [Tên tính năng]`.
- Chú ý: Lệnh gọi skill sẽ KHÔNG truyền trực tiếp danh sách các Condition vào câu lệnh. Agent bắt buộc phải TỰ ĐỘNG đọc file tài liệu (ví dụ: `report.md`) của feature đó để lấy danh sách Condition làm đầu vào phân tích.

## Core Principles (Quy tắc cốt lõi)
Dựa theo lý thuyết chuẩn của Phân vùng tương đương (Equivalence Partitioning Theory):
1. **Chỉ tập trung vào Input Domain**: Các lớp tương đương được tạo ra chỉ nhằm mục đích phân loại dữ liệu đầu vào.
2. **Không phân vùng theo Trạng thái UI (No UI State Partitioning)**: Tuyệt đối không tạo ra các lớp liên quan đến giao diện (ví dụ: "Nút Submit sáng lên", "Có thông báo màu đỏ").
3. **Không tạo lớp tương đương dựa trên kết quả (No Outcome-based Classes)**: Không sử dụng kết quả mong đợi (ví dụ: "Đăng nhập thành công", "Báo lỗi 404") làm tiêu chí để chia lớp.
4. **Không trộn lẫn (No Mixed Concerns)**: Mỗi lớp tương đương chỉ đánh giá một quy tắc duy nhất. Không gộp chung nhiều lỗi vào một lớp Invalid (ví dụ: không gộp "Sai định dạng và quá ngắn" vào cùng một lớp E).
5. **Đảm bảo vét cạn (Exhaustive Partitioning)**: Với mỗi Condition (C), phải xác định được toàn bộ các lớp Valid và các lớp Invalid tương ứng để bao phủ hết mọi khả năng của biến đầu vào.

## How to use it (Workflow)
Khi thực thi skill này, Agent cần làm theo các bước sau:
1. **Phân tích Điều kiện**: Đọc danh sách các Điều kiện (C1, C2...) do người dùng cung cấp. Đảm bảo hiểu rõ ràng buộc của từng điều kiện.
2. **Tạo Lớp Tương Đương (Partitioning)**: 
   - Ứng với mỗi Condition (C), tạo ra các Lớp tương đương (Equivalence Classes - ký hiệu là E).
   - Đánh số thứ tự các lớp E một cách liên tục xuyên suốt toàn bộ bảng (E1, E2, E3, E4, E5...). Không khởi động lại biến đếm E cho mỗi Condition (ví dụ: không dùng C1->E1,E2; C2->E1,E2).
3. **Mô tả chi tiết và Phân loại**:
   - Viết mô tả rõ ràng, cụ thể cho từng lớp E để có thể dễ dàng chọn Test Data (VD: thay vì nói "đúng định dạng", hãy nói "chuỗi chỉ chứa chữ cái a-z").
   - Xác định rõ tính chất của lớp E là Hợp lệ (Valid) hay Không hợp lệ (Invalid).
4. **Xuất kết quả (Output Format)**:
   - Trình bày dưới dạng danh sách tuần tự.
   - Định dạng: `E[STT]: [Mô tả chi tiết] - [Loại (Valid/Invalid)]`
   - Ví dụ:
      - `E1: Password có >= 6 ký tự, Valid`
      - `E2: Password có >= 2 ký tự đặc biệt, Valid`
      - `E3: Password có < 6 ký tự, Invalid`
      - `E4: Password có < 2 ký tự đặc biệt, Invalid`

## AI Behavior Constraints
- **Không sinh Test Case / Test Data**: Dừng lại ở việc tạo bảng Lớp tương đương. Không tự ý tạo Test Case hay dữ liệu cụ thể (như 'abc@gmail.com').
- **Tự động đọc tài liệu (Read Context)**: Bắt buộc sử dụng các tool đọc file (ví dụ `view_file` hoặc tương tự) để tìm và trích xuất danh sách các Điều kiện kiểm thử (Conditions) từ các file báo cáo hiện có trong thư mục workspace hiện tại. **KHÔNG** được đọc tài liệu ở bất kỳ thư mục nào khác ngoài workspace hiện tại (ví dụ: thư mục cha, thư mục anh em, v.v.).
- **Xử lý khi thiếu thông tin**: Nếu tìm khắp thư mục workspace hiện tại mà không có tài liệu hay thông tin về các Điều kiện kiểm thử (Conditions) cho tính năng đó, Agent phải báo lỗi là không tìm thấy, tuyệt đối **KHÔNG** tự ý sinh ra (bịa ra/hallucinate) nội dung các Điều kiện kiểm thử để phân tích.
- **Zero Fluff (Không dài dòng)**: Bỏ qua toàn bộ các lời chào hỏi (như "Chào bạn", "Vâng, tôi sẽ làm") hay các câu kết luận. Đi thẳng vào việc in ra bảng kết quả theo đúng định dạng.
