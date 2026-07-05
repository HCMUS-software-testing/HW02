---
name: domain-testing
description: >
  Skill thực hiện kiểm thử miền (Domain Testing) tự động cho một tính năng của hệ thống EShop.
  Kích hoạt khi user yêu cầu "Thực hiện domain testing với Pool X: FR-XX" hoặc các biến thể
  tương đương như "domain testing FR-XX", "kiểm thử miền Pool X", "làm domain testing FR-XX".
  Skill sẽ đọc đặc tả, phân tích theo EP+BVA, và ghi kết quả vào Main_Report.md, README.md,
  AI_Audit_Report.md.
---

# Skill: Domain Testing Automation

Bạn vừa nhận lệnh thực hiện Domain Testing cho một tính năng của hệ thống EShop. Hãy thực hiện **tuần tự** theo quy trình dưới đây mà **không bỏ qua bất kỳ bước nào**.

---

## BƯỚC 0: Xác định thông tin đầu vào

Từ lệnh của user, trích xuất:
- **`POOL_LABEL`**: Tên Pool (ví dụ: "Pool A", "Pool B", "Pool C", "Pool D")
- **`FEATURE_ID`**: Mã tính năng (ví dụ: "FR-02", "FR-03", "FR-09")

Tra cứu thông tin tính năng trong:
- `eshop-sut/README.md` — Đặc tả yêu cầu nghiệp vụ
- `eshop-sut/api_specification.md` — Đặc tả API

> **⛔ QUY TẮC BẤT KHẢ XÂM PHẠM**: TUYỆT ĐỐI KHÔNG đọc bất kỳ file nào trong thư mục `eshop-sut/backend/`, `eshop-sut/frontend-web/`, `eshop-sut/frontend-admin/`, `eshop-sut/frontend-mobile/`. Đây là kiểm thử hộp đen — chỉ dựa vào đặc tả.

---

## BƯỚC 1: Phân tích đặc tả và Xác định I/O Variables

Đọc kỹ phần đặc tả của `FEATURE_ID` trong `eshop-sut/README.md` và `eshop-sut/api_specification.md`.

Phân tích và liệt kê:

### 1a. Biến đầu vào (Input Variables)

Phân loại thành 2 nhóm:

**Direct Inputs** — Người dùng nhập trực tiếp qua form UI hoặc API body:
- Tên biến (dạng `snake_case`)
- Kiểu dữ liệu
- Ràng buộc từ đặc tả

**System State Inputs** — Trạng thái hệ thống ảnh hưởng tới luồng xử lý:
- Đây là các biến **không thể nhập trực tiếp** qua form (ví dụ: bộ đếm lần sai, trạng thái khóa, vai trò user, số lần đã dùng coupon)
- Chúng sẽ trở thành **Preconditions** trong bảng test case, không phải cột Input

### 1b. Biến đầu ra (Output Variables)

**API Outputs**:
- HTTP status codes (theo từng kịch bản)
- Cấu trúc JSON response

**UI Outputs**:
- Thông báo hiển thị trên giao diện
- Hành động điều hướng / thay đổi trạng thái UI

### Viết phần Bước 1

Tạo nội dung Bước 1 theo template trong `references/report_template.md`, bao gồm:
- Đoạn "Giải thích chi tiết từng bước" (4 điểm bullet)
- Bảng Input Variables
- Bảng Output Variables

---

## BƯỚC 2: Phân hoạch tương đương (Equivalence Partitioning)

Dựa trên phương pháp trong `references/methodology.md`:

### 2a. Phân tích EC cho từng biến Input

Với mỗi biến Direct Input:
- Xác định **lớp Valid**: Giá trị hợp lệ theo đặc tả
- Xác định **lớp(các) Invalid**: Các loại vi phạm khác nhau (sai format, rỗng, ngoài khoảng, không tồn tại, v.v.)
- Mỗi loại vi phạm là **1 lớp Invalid riêng biệt**

Với mỗi biến System State Input:
- Xác định **lớp Valid** (trạng thái cho phép tiếp tục flow bình thường)
- Xác định **lớp Invalid** (trạng thái gây chặn hoặc rẽ nhánh lỗi)

### 2b. Phân tích EC cho biến Output

Với mỗi biến Output:
- Lớp **Valid (Success)**: Phản hồi khi tất cả input hợp lệ
- Lớp **Invalid (Failure)**: Các loại phản hồi lỗi khác nhau

### 2c. Đánh số EC

Đánh số **liên tục từ EC01** cho cả bảng Input và Output, không reset.

---

## BƯỚC 3: Thiết kế EP Test Cases

### 3a. Bảng giá trị đại diện

Với mỗi EC, chọn **1 giá trị đại diện cụ thể**:
- EC Valid: Giá trị điển hình hợp lệ
- EC Invalid: Giá trị đặc trưng cho loại lỗi đó

### 3b. Thiết kế Test Cases

Áp dụng nguyên tắc:
1. **TC01 (Valid)**: 1 test case duy nhất kết hợp TẤT CẢ EC Valid
2. **TC02, TC03, ... (Invalid)**: Mỗi TC chỉ có **đúng 1 EC Invalid** + các EC Valid còn lại
3. **TC bổ sung (Integration/Security)**: Các kịch bản nâng cao như concurrent requests, session invalidation, bypass validation, nếu đặc tả gợi ý các yêu cầu bảo mật

### ⚠️ Quy tắc bất buộc cho cột Expected Output
- Mô tả **theo yêu cầu nghiệp vụ**, không phải chuỗi JSON implementation
- ✅ Đúng: `- HTTP Code: 401 Unauthorized<br>- Response: JSON thông báo lỗi bảo mật chung, không phân biệt nguyên nhân`
- ❌ Sai: `{"error": "Invalid email or password"}`

### ⚠️ Quy tắc bắt buộc cho cột Actual Output và Pass/Fail
- **LUÔN ĐỂ TRỐNG** — ghi `| |` (một khoảng trắng)
- Không được điền bất kỳ giá trị nào

---

## BƯỚC 4: Phân tích giá trị biên (Boundary Value Analysis)

### 4a. Xác định biến có khoảng số

Chỉ áp dụng BVA cho các biến có **tính thứ tự số hoặc thời gian**:
- Bộ đếm (số nguyên)
- Thời gian (giây, ngày)
- Độ dài chuỗi (nếu có ràng buộc min/max)
- Giá trị tiền tệ (min_order_amount, discount_value, price)
- Số lượng (quantity)

### 4b. Xác định biên cho từng biến

Với mỗi biến, xác định:
- **Khoảng giá trị hợp lệ** `[LB, UB]`
- Các điểm biên: `LB`, `LB+1`, `LB-1`, `UB`, `UB-1`, `UB+1`
- Nếu `LB-1` hoặc `UB+1` không thể đạt qua giao diện công khai: ghi chú phân tích lý thuyết nhưng KHÔNG thiết kế test case

### 4c. Thiết kế BVA Test Cases

Thiết kế test case cho mỗi điểm biên đáng kiểm thử, đặt tên `TC-BVA-01`, `TC-BVA-02`, ...

---

## BƯỚC 5: AI Gap Analysis

Phân tích và viết 3 mục:

### 5a. Kịch bản bị bỏ sót
Liệt kê các kịch bản mà AI (khi phân tích thuần túy từ đặc tả văn bản) thường bỏ qua:
- Các kịch bản **concurrency / race condition** (nếu feature liên quan đến ghi dữ liệu đồng thời)
- Các kịch bản **bypass validation** (gửi trực tiếp qua API bỏ qua frontend)
- Các kịch bản **session/token edge cases**
- Các kịch bản **atomic transaction** (all-or-nothing, rollback)
- Kịch bản **chaining/dependency** giữa các điều kiện

### 5b. AI Critique
Phân tích các loại lỗi điển hình AI thường mắc phải với feature này:
- Nhầm Black-box với White-box/Grey-box (đề xuất kiểm tra DB trực tiếp)
- Nhầm System State thành Direct Input
- Implementation Bias (dùng chuỗi response cụ thể thay vì mô tả nghiệp vụ)
- Bỏ qua các ràng buộc bảo mật từ SEC-xx

### 5c. Nguyên nhân
Giải thích tại sao AI gặp các hạn chế trên (giới hạn công cụ, độ phức tạp tính năng, chất lượng prompt).

---

## BƯỚC 6: Ghi vào các file

Tuân thủ chính xác quy tắc trong `references/file_update_rules.md`.

### 6a. Append vào `Main_Report.md`

Thêm dấu ngăn cách `---` và toàn bộ nội dung 5 bước vào cuối file.

**Kiểm tra lại trước khi ghi**:
- [ ] Cột Actual Output TẤT CẢ các bảng TC đều trống
- [ ] Cột Pass/Fail TẤT CẢ các bảng TC đều trống  
- [ ] Expected Output dùng ngôn ngữ nghiệp vụ, không phải chuỗi JSON cụ thể
- [ ] System State Variables nằm ở cột Preconditions, không phải cột Input

### 6b. Cập nhật `README.md`

Cập nhật 2 sections:
1. **Bảng Self-Assessment (Section 2)**: Điền điểm tự đánh giá cho Pool vừa hoàn thành
2. **Test Summary (Section 3)**: Cập nhật thống kê (số lượng TC thiết kế; các cột Pass/Fail/Executed đặt = 0 vì chưa thực thi)

### 6c. Append vào `AI_Audit_Report.md`

Thêm 1 Prompt Log tổng hợp vào cuối file theo format trong `references/file_update_rules.md`.
- Đánh số tiếp theo sau prompt cuối cùng hiện có
- Thời gian: Lấy từ metadata của cuộc hội thoại hiện tại
- Tên AI: Ghi model đang dùng (ví dụ: Claude Sonnet 4.5, Gemini 2.5 Flash)

---

## KIỂM TRA CUỐI

Sau khi ghi xong, xác nhận với user:
- Số lượng EC đã định nghĩa
- Số lượng EP Test Cases (TC01 → TCxx)
- Số lượng BVA Test Cases (TC-BVA-01 → TC-BVA-xx)
- Các file đã được cập nhật

---

## TÀI LIỆU THAM CHIẾU

- `references/methodology.md` — Phương pháp EP + BVA chi tiết
- `references/report_template.md` — Template cấu trúc bảng chuẩn
- `references/file_update_rules.md` — Quy tắc ghi vào từng file
- `examples/fr02_completed.md` — Ví dụ gold-standard FR-02 đã hoàn thành
