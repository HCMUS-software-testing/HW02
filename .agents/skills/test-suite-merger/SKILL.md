---
name: test-suite-merger
description: Đọc các bảng Test Data của EP và BVA trong tài liệu, sau đó loại bỏ trùng lặp và gộp chúng lại thành một Bảng Test Execution (Final Test Suite) duy nhất, đảm bảo độ phủ 100% EP và BVA.
---

# Bảng Tổng hợp Test Case (Test Suite Merger)

## When to use this skill
- Sử dụng khi người dùng yêu cầu gộp hoặc tổng hợp các Test Case từ 2 phương pháp EP (Equivalence Partitioning) và BVA (Boundary Value Analysis) thành một bảng duy nhất để chuẩn bị thực thi (Test Execution).
- Lệnh kích hoạt ví dụ: `test-suite-merger [Tên tính năng]`.
- Agent bắt buộc phải tự động đọc file tài liệu (ví dụ: `report.md`) để trích xuất cả bảng Test Data EP và Test Data BVA làm đầu vào phân tích.

## Core Principles (Quy tắc cốt lõi về nghiệp vụ)
1. **Nguyên lý Bao phủ (Coverage Principle):** Giá trị biên (BVA) thực chất là các trường hợp đặc biệt nằm bên trong Lớp tương đương (EP). BVA test case hoàn toàn có thể "đại diện" và phủ luôn cho EP test case.
2. **Quy tắc xử lý Invalid (Báo lỗi):**
   - **Giữ nguyên:** Mang toàn bộ các Test Case Invalid của cả EP (vd: lỗi định dạng, email rỗng...) và BVA (vd: độ dài ngắn hơn min, dài hơn max...) vào bảng mới.
   - **Tuyệt đối KHÔNG GỘP INVALID:** Mỗi dòng Invalid trong bảng mới chỉ được kiểm tra 1 nguyên nhân gây lỗi duy nhất (1 giá trị biên Invalid hoặc 1 lớp tương đương Invalid).
3. **Quy tắc xử lý Valid (Khử trùng lặp - Deduplication):**
   - **Thay thế EP bằng BVA:** Nếu một lớp tương đương Valid của EP (vd: E1: độ dài >= 8) đã có các test case biên Valid của BVA sinh ra từ nó (vd: B1: 8 ký tự, B3: 9 ký tự), thì **BỎ QUA/XÓA** test case chung chung của EP đó.
   - **Giữ lại 100% BVA:** Đưa toàn bộ các test case Valid của BVA vào bảng mới.
   - **Bảo lưu EP độc lập:** Các lớp EP Valid KHÔNG có liên quan đến biên định lượng (ví dụ: "Email chưa tồn tại", "Có quyền Admin") thì phải **GIỮ LẠI** nguyên vẹn như một dòng riêng biệt trong Test Suite.

## AI Behavior Constraints
- **Tự động đọc tài liệu (Read Context):** Bắt buộc phải tìm và đọc các bảng Test Data EP và BVA có sẵn của Feature đó trong workspace. Không tự ý sinh test data mới nếu tài liệu đã có.
- **Zero Fluff:** Không giải thích dài dòng, không chào hỏi. In trực tiếp ra bảng Markdown của Final Test Suite.

## Output Format
- Các cột tiêu chuẩn bắt buộc: `Test Case ID` | `Mục tiêu` | `Đầu vào` | `Các bước thực hiện` | `Kết quả mong đợi` | `Thực tế` | `Verdict` |
- **Đầu vào:** Ghi rõ các giá trị cụ thể của tất cả các biến đầu vào vào chung một cột này.
- **Actual Result / Verdict:** Để trống để tester tự điền sau khi thực hiện kiểm thử.
