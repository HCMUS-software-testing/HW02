---
name: bva-boundary-generator
description: Từ danh sách các Lớp tương đương (Equivalence Classes) hoặc Điều kiện kiểm thử (Test Conditions) có tính chất định lượng, phân tích và xác định các Giá trị biên (Boundary Values) bao gồm các điểm trên biên và kế cận biên dựa trên lý thuyết Phân tích giá trị biên (Boundary Value Analysis).
---

# Xác định Giá trị biên (Boundary Value Generator)

## When to use this skill
- Sử dụng khi người dùng yêu cầu phân tích giá trị biên (Boundary Value Analysis) cho một tính năng (feature) đã được trích xuất Điều kiện kiểm thử (Test Conditions) hoặc Lớp tương đương (Equivalence Classes) liên quan đến các giá trị định lượng (ví dụ: độ dài chuỗi, khoảng giá trị số, ngày tháng, kích thước file...).
- Lệnh kích hoạt ví dụ: `bva-boundary-generator [Tên tính năng]`.
- Chú ý: Lệnh gọi skill sẽ KHÔNG truyền trực tiếp danh sách vào câu lệnh. Agent bắt buộc phải TỰ ĐỘNG đọc file tài liệu (ví dụ: `report.md`) của feature đó để lấy danh sách làm đầu vào phân tích.

## Core Principles (Quy tắc cốt lõi)
Dựa theo lý thuyết chuẩn của Phân tích giá trị biên (Boundary Value Analysis):
1. **Chỉ áp dụng cho miền giá trị định lượng (Quantitative Data/Ordered Sets)**: Chỉ phân tích biên cho các dữ liệu có thể đo lường hoặc có thứ tự (số, ngày tháng, độ dài chuỗi). Bỏ qua các điều kiện mang tính chất định tính (boolean, enum không có thứ tự).
2. **Xác định các điểm biên (Boundary points)**: Tùy theo kiểu dữ liệu, các điểm biên cần phân tích gồm:
   - Với phân tích 2 giá trị (2-value BVA): Biên (Boundary) và Kế cận ngoài biên (Just outside boundary). Thường là min, min-1, max, max+1.
   - Với phân tích 3 giá trị (3-value BVA): Biên (Boundary), Kế cận trong (Just inside) và Kế cận ngoài (Just outside). Thường là min-1, min, min+1, max-1, max, max+1.
3. **Phân loại Valid/Invalid**: Mỗi giá trị biên phải được chỉ định rõ ràng là Hợp lệ (Valid) hay Không hợp lệ (Invalid).
4. **Không phân vùng theo Trạng thái UI hay Kết quả**: Tương tự như EP, chỉ tập trung vào Input Domain.

## How to use it (Workflow)
Khi thực thi skill này, Agent cần làm theo các bước sau:
1. **Phân tích Điều kiện/Lớp tương đương**: Đọc danh sách các Điều kiện (C) hoặc Lớp tương đương (E) do người dùng cung cấp. Lọc ra các điều kiện/lớp có tính chất định lượng.
2. **Tạo Giá trị biên (Boundary Values)**: 
   - Ứng với mỗi Condition (C) hoặc Equivalence Class (E) định lượng, xác định các Giá trị biên (Boundary Values - ký hiệu là B).
   - Đánh số thứ tự các giá trị B một cách liên tục xuyên suốt (B1, B2, B3, B4...).
3. **Mô tả chi tiết và Phân loại**:
   - Ghi rõ giá trị cụ thể hoặc mô tả công thức tính giá trị đó (VD: "Độ dài chuỗi = 5", "Giá trị số = 100", "Ngày = 01/01/2000").
   - Xác định rõ loại biên (min, min-1, min+1, max, max-1, max+1).
   - Xác định rõ tính chất của giá trị B là Hợp lệ (Valid) hay Không hợp lệ (Invalid).
4. **Xuất kết quả (Output Format)**:
   - Trình bày dưới dạng danh sách tuần tự.
   - Định dạng: `B[STT] ([Loại biên]): [Giá trị hoặc Mô tả chi tiết] - [Loại (Valid/Invalid)]`
   - Ví dụ:
      - `B1 (min): Password có độ dài 6 ký tự - Valid`
      - `B2 (min-1): Password có độ dài 5 ký tự - Invalid`

## AI Behavior Constraints
- **Không sinh Test Case hoàn chỉnh**: Chỉ dừng ở việc xác định các giá trị biên. Không tự ý tạo Test Case hoặc kết hợp các biên lại với nhau.
- **Tự động đọc tài liệu (Read Context)**: Bắt buộc sử dụng tool đọc file để tìm và trích xuất danh sách Conditions/Classes từ workspace hiện tại. KHÔNG đọc file ngoài workspace.
- **Xử lý khi thiếu thông tin**: Nếu không có thông tin, báo lỗi. Tuyệt đối KHÔNG bịa ra dữ liệu.
- **Zero Fluff**: In kết quả trực tiếp, không có lời chào hỏi hay dẫn nhập thừa.
