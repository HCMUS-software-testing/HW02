---
name: bva-test-data-generator
description: Từ danh sách các Giá trị biên (Boundary Values) đầu vào, tự động sinh ra Bảng Test Case và Test Data cụ thể theo lý thuyết Phân tích giá trị biên (BVA).
---

# Bảng Test Case bằng Phân tích giá trị biên (BVA Test Data Generator)

## When to use this skill
- Sử dụng khi người dùng yêu cầu tạo Test Case và Test Data cụ thể sau khi đã có danh sách các Giá trị biên (Boundary Values) của một tính năng (feature).
- Lệnh kích hoạt ví dụ: `bva-test-data-generator [Tên tính năng]`.
- Chú ý: Lệnh gọi skill sẽ KHÔNG truyền trực tiếp danh sách các giá trị biên vào câu lệnh. Agent bắt buộc phải TỰ ĐỘNG đọc file tài liệu (ví dụ: `report.md`) của feature đó để lấy danh sách làm đầu vào phân tích.

## Core Principles (Quy tắc cốt lõi)
Dựa theo nguyên tắc thiết kế Test Case của Boundary Value Analysis:
1. **Mỗi giá trị biên Invalid phải nằm trong một Test Case độc lập**: Để tránh lỗi bị che khuất (Defect Masking), tuyệt đối KHÔNG GỘP nhiều giá trị biên Invalid vào cùng một Test Case.
2. **Quy tắc gộp các giá trị biên Valid**: Tuyệt đối KHÔNG gộp nhiều giá trị biên Valid của CÙNG MỘT BIẾN vào chung một Test Case. Chỉ có thể gộp các giá trị biên Valid nếu chúng thuộc về các biến hoàn toàn độc lập với nhau. Tốt nhất nên kiểm tra từng biên Valid (kể cả trên cùng một biến) trong các Test Case riêng biệt, kết hợp với các giá trị trung tâm (nominal).
3. **Cung cấp Test Data thực tế (Concrete Test Data)**: Không viết Test Data dưới dạng mô tả (VD: "Chuỗi 5 ký tự"). Phải cung cấp giá trị dữ liệu cụ thể, có thể nhập được trực tiếp vào hệ thống (VD: "abcde", 100, "2024-01-01").

## How to use it (Workflow)
Khi thực thi skill này, Agent cần làm theo các bước sau:
1. **Phân tích Giá trị biên**: Đọc danh sách các Giá trị biên (B1, B2...) đã được định nghĩa trong file tài liệu.
2. **Tạo Test Case**:
   - Duyệt qua từng Giá trị biên (B).
   - Với mỗi giá trị biên B (nhất là B dạng Invalid), tạo ra ít nhất một Test Case riêng biệt.
   - Các biến khác không nằm trong biên đang xét phải được gán giá trị Valid (Nominal/thông thường) để đảm bảo tính độc lập của lỗi.
3. **Xây dựng Test Data cụ thể**:
   - Biến các mô tả B thành dữ liệu thực tế (Concrete Data).
4. **Xuất kết quả (Output Format)**:
   - Trình bày kết quả dưới dạng Bảng Markdown (Markdown Table).
   - Các cột tiêu chuẩn: `Test Case ID` | `[Tên Biến 1]` | `[Tên Biến 2]` | ... | `Output` | `Covered Boundary Values` |

## AI Behavior Constraints
- **Test Data Cụ Thể**: Phải là giá trị thực tế (VD: "A!b2cd", không phải "Mật khẩu 6 ký tự có chữ và số").
- **Tự động đọc tài liệu (Read Context)**: Bắt buộc sử dụng tool đọc file để tìm và trích xuất danh sách Boundary Values từ workspace hiện tại. KHÔNG bịa ra dữ liệu hoặc tạo cấu trúc ngẫu nhiên.
- **Tuân thủ quy tắc Gộp**: 
  + **ĐỐI VỚI INVALID**: Tối kỵ gộp Invalid. Luôn luôn và tuyệt đối KHÔNG BAO GIỜ được gộp nhiều giá trị biên Invalid (dù là cùng biến hay khác biến) vào chung 1 Test Case. Khi xét 1 biên Invalid, TẤT CẢ các tham số khác BẮT BUỘC phải là Valid thông thường (nominal).
  + **ĐỐI VỚI VALID**: Tuyệt đối KHÔNG gộp nhiều giá trị biên Valid của CÙNG MỘT BIẾN vào chung 1 Test Case. Chỉ gộp Valid khi chúng thuộc các biến hoàn toàn độc lập.
- **Zero Fluff**: Không có lời chào hỏi hay dẫn nhập thừa. In trực tiếp ra bảng Markdown.
