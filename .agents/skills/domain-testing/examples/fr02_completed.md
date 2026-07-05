# Ví dụ Gold-Standard: FR-02 Đăng nhập & Khóa tài khoản (Pool A)

Đây là ví dụ hoàn chỉnh đã được thực hiện và xác nhận là đúng format. Agent phải sử dụng ví dụ này làm chuẩn tham chiếu khi sinh nội dung cho các feature mới.

**Nguồn**: Trích từ `Main_Report.md` — Pool A: FR-02.

---

## Mẫu Bước 1: Bảng I/O Variables

### Bảng Input Variables (Direct + State)

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `email` | Direct Input | String | Phải dùng `type="email"` (validate HTML5 format) | Địa chỉ email dùng để đăng nhập |
| **2** | `password` | Direct Input | String | Không hiển thị rõ (`type="password"`) | Mật khẩu dùng để đăng nhập |
| **3** | `consecutive_failed_logins` | State Input | Integer | Số nguyên không âm (>= 0), tăng 1 sau mỗi lần sai | Số lần đăng nhập sai liên tiếp — **Dùng làm Precondition** |
| **4** | `lockout_state` | State Input | Enum | Active / Locked (30 giây) | Trạng thái tạm khóa — **Dùng làm Precondition** |

### Bảng Output Variables (API + UI)

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `http_status_code` | API Output | Integer | 200 (thành công) / 400,401,403 (thất bại) | Mã trạng thái HTTP từ backend |
| **2** | `api_response_payload` | API Output | JSON Object | JWT token + user info (thành công) / thông báo lỗi chung (thất bại) | Nội dung JSON phản hồi |
| **3** | `ui_message` | UI Output | String | Trống (thành công) / chuỗi lỗi trên nút submit (thất bại) | Thông báo hiển thị trên UI |
| **4** | `ui_action` | UI Output | Enum | Redirect / Lock (30s countdown) / Giữ màn hình | Hành động điều hướng UI |

---

## Mẫu Bước 2: Equivalence Classes

### Bảng EC Input (ví dụ đúng)

| Mã lớp | Biến đầu vào | Phân loại lớp | Lớp tương đương | Mô tả / Ý nghĩa kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `email` | **Valid** | Định dạng hợp lệ và tồn tại trong CSDL | Email tài khoản có thực |
| **EC02** | `email` | **Invalid** | Định dạng hợp lệ nhưng không tồn tại trong CSDL | Email tài khoản không tồn tại |
| **EC03** | `email` | **Invalid** | Định dạng không hợp lệ | Thiếu `@`, thiếu domain |
| **EC04** | `email` | **Invalid** | Chuỗi rỗng | Bỏ trống email |
| **EC08** | `consecutive_failed_logins` | **Valid** | Số nguyên `[0, 2]` | Tài khoản chưa bị khóa |
| **EC09** | `consecutive_failed_logins` | **Invalid** | Số nguyên `>= 3` | Tài khoản đang bị khóa |

> **Lưu ý pattern quan trọng**: EC08 và EC09 của `consecutive_failed_logins` (System State Input) vẫn được liệt kê trong bảng EC, nhưng khi thiết kế test case, chúng được thể hiện qua cột **Preconditions** chứ không phải cột Input của bảng TC.

---

## Mẫu Bước 3: EP Test Cases (Đúng format)

| Mã TC | Tên Test Case | Lớp EC phủ | Điều kiện tiền đề (Preconditions) | email | password | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Đăng nhập thành công | EC01, EC05, EC08, EC10, EC12, EC15, EC17, EC19 | Tài khoản đã đăng nhập sai 1 lần trước đó | `test@eshop.com` | `Test1234!` | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI / Client: Lưu trữ thành công JWT Token phía client. | | |
| **TC02** | Đăng nhập thất bại — email không tồn tại | EC02, EC13, EC16, EC18, EC20 | Không có | `nonexistent@eshop.com` | `Test1234!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi bảo mật chung, không phân biệt nguyên nhân.<br>- UI: Hiển thị thông báo lỗi chung. | | |

> **Quan sát**: Cột "Kết quả thực tế (Actual Output)" và "Trạng thái (Pass/Fail)" đều **để trống hoàn toàn** — đây là format chuẩn bắt buộc.

---

## Mẫu Bước 4: BVA Test Cases (Đúng format)

### Phân tích biên (ví dụ)

- **`consecutive_failed_logins`** (Khoảng hợp lệ trước khi khóa: `[0, 2]`):
  - $LB = 0$: Chưa từng sai
  - $LB+1 = 1$: Sai 1 lần
  - $UB = 2$: Sai 2 lần (tối đa trước khi khóa)
  - $UB+1 = 3$: Sai 3 lần → tài khoản chính thức bị khóa

### Bảng BVA Test Cases

| Mã TC | Tên Test Case | Biên kiểm thử | Điều kiện tiền đề (Preconditions) | email | password | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-BVA-01** | Đăng nhập khi chưa từng sai | $LB = 0$ của `consecutive_failed_logins` | Chưa từng đăng nhập sai | `test@eshop.com` | `Test1234!` | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI / Client: Lưu token thành công. | | |
| **TC-BVA-03** | Đăng nhập sai lần thứ 3 (gây khóa) | $UB = 2$ của `consecutive_failed_logins` với mật khẩu sai | Đã sai 2 lần liên tiếp | `test@eshop.com` | `WrongPassword!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON thông báo lỗi chung.<br>- Hệ thống chuyển sang trạng thái tạm khóa cho các lần tiếp theo trong 30s. | | |

---

## Mẫu Bước 5: AI Gap Analysis (Đúng format)

### 1. Các kịch bản bị bỏ sót
*   **Race Condition (Brute-force song song):** AI bỏ sót kịch bản gửi đồng thời nhiều request sai mật khẩu trong cùng 1ms. Lỗi concurrency này không thể phát hiện qua UI thông thường.
*   **Session/Token Invalidation:** AI chưa đề xuất kiểm thử JWT token cũ có bị vô hiệu hóa khi tài khoản bị khóa từ phiên khác.

### 2. AI Critique
*   **Nhầm Black-box với Grey-box:** AI đề xuất kiểm tra trực tiếp giá trị trong DB (vi phạm nguyên lý hộp đen).
*   **Nhầm System State thành Direct Input:** AI xếp biến trạng thái (`failed_login_attempts`) vào cột Input thay vì Preconditions.
*   **Implementation Bias:** AI đưa chuỗi JSON cụ thể của implementation vào Expected Output thay vì mô tả nghiệp vụ.

### 3. Nguyên nhân
*   **Hạn chế AI tĩnh:** Không thể mô phỏng môi trường động (concurrency, race condition).
*   **Phức tạp nội tại:** Tính năng đơn giản bên ngoài nhưng phức tạp bên trong (stateless JWT + lockout state).
*   **Prompt chưa bao gồm ngữ cảnh bảo mật (OWASP):** AI chỉ tập trung vào functional flows.
