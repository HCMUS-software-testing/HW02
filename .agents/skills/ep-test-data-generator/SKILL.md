---
name: ep-test-data-generator
description: Từ danh sách các Lớp tương đương (Equivalence Classes) đầu vào, tự động sinh ra Bảng Test Case và Test Data cụ thể, tuân thủ nguyên tắc tối ưu hóa Test Case (gộp Valid, tách Invalid) của phương pháp Phân vùng tương đương.
---

# Sinh Dữ liệu Test bằng Phân Vùng Tương Đương (EP Test Data Generator)

## When to use this skill
- Sử dụng khi người dùng yêu cầu tạo Bảng Test Case / Dữ liệu Test cho một tính năng dựa trên các Lớp tương đương (Equivalence Classes).
- Lệnh kích hoạt ví dụ: `ep-test-data-generator [Tên tính năng]`.
- Chú ý: Lệnh gọi skill sẽ KHÔNG truyền trực tiếp danh sách Lớp tương đương vào câu lệnh. Agent bắt buộc phải TỰ ĐỘNG đọc file tài liệu (ví dụ: `report.md`) của feature đó để lấy danh sách các Lớp tương đương (E1, E2...) để sinh data.

## Core Principles (Quy tắc cốt lõi)
Dựa theo phương pháp thiết kế Test Case chuẩn của Phân vùng tương đương:
1. **Gộp các lớp Hợp lệ (Combine Valid Classes)**: Để tối ưu hóa số lượng Test Case, cần tạo ra (các) Test Case chứa nhiều lớp Valid nhất có thể (thường gọi là Happy Path). Nếu không có mâu thuẫn về mặt logic, một Test Case có thể bao phủ toàn bộ các lớp Valid của tất cả các biến.
2. **Tách biệt các lớp Không hợp lệ (Isolate Invalid Classes)**: Tuyệt đối KHÔNG gộp nhiều lớp Invalid vào cùng một Test Case. Mỗi Test Case có kết quả thất bại chỉ được sinh ra từ DUY NHẤT MỘT lớp Invalid (các trường dữ liệu khác trong Test Case đó bắt buộc phải sử dụng dữ liệu Valid). Điều này giúp cô lập lỗi (Bug Isolation) một cách chính xác.
3. **Sử dụng Dữ liệu cụ thể (Concrete Data)**: Dữ liệu (Test Data) sinh ra phải là các giá trị thực tế, cụ thể, có thể nhập trực tiếp vào hệ thống. Không dùng mô tả chung chung (Ví dụ: Dùng `john_doe` thay vì `chuỗi chữ cái hợp lệ`).

## How to use it (Workflow)
Khi thực thi skill này, Agent cần làm theo các bước sau:
1. **Phân tích Lớp tương đương**: Đọc danh sách (E1, E2...) và phân loại rõ ràng đâu là Valid, đâu là Invalid dựa theo input.
2. **Thiết kế Test Case Valid**:
   - Tạo Test Case đầu tiên (TC1) gộp toàn bộ các lớp Valid.
   - (Chỉ tạo thêm TC2 Valid nếu các lớp Valid mâu thuẫn với nhau và không thể điền chung vào một bộ data).
3. **Thiết kế Test Case Invalid**:
   - Duyệt qua từng lớp Invalid. Ứng với MỖI lớp Invalid, tạo một Test Case riêng biệt.
   - Nhắc lại: Các dữ liệu đi kèm của các biến khác trong Test Case này phải là Valid.
4. **Xuất kết quả (Output Format)**:
   - Trình bày kết quả dưới dạng Bảng Markdown (Markdown Table).
   - Cấu trúc các cột: `Test Case ID` | `[Tên Biến 1]` | `[Tên Biến 2]` | ... | `Output` | `Covered Classes` |
   - Phân tách dữ liệu: Mỗi biến đầu vào (variable) phải được trình bày ở một cột riêng biệt, KHÔNG gộp chung tất cả vào một cột "Test Data".

## AI Behavior Constraints
- **Không tự thêm tính năng / logic**: Chỉ sinh dữ liệu tập trung đúng vào các Lớp tương đương được cung cấp.
- **Dữ liệu sát thực tế**: Test Data phải trông giống như dữ liệu thực của người dùng (Ví dụ: dùng ngày sinh hợp lý như 15/05/1990).
- **Tự động đọc tài liệu (Read Context)**: Bắt buộc sử dụng các tool đọc file (ví dụ `view_file` hoặc tương tự) để tìm và trích xuất danh sách các Lớp tương đương (Equivalence Classes) từ các file báo cáo hiện có trong thư mục workspace hiện tại. **KHÔNG** được đọc tài liệu ở bất kỳ thư mục nào khác ngoài workspace hiện tại (ví dụ: thư mục cha, thư mục anh em, v.v.).
- **Xử lý khi thiếu thông tin**: Nếu tìm khắp thư mục workspace hiện tại mà không có tài liệu hay thông tin về các Lớp tương đương (Equivalence Classes) cho tính năng đó, Agent phải báo lỗi là không tìm thấy, tuyệt đối **KHÔNG** tự ý sinh ra (bịa ra/hallucinate) nội dung các Lớp tương đương để phân tích.
- **Zero Fluff (Không dài dòng)**: Bỏ qua toàn bộ các lời chào hỏi. Trả về ngay bảng kết quả.
