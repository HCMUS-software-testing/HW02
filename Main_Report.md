# Báo cáo HW02 Domain Testing

## Thông tin sinh viên

- **Họ và tên:** Lê Mai Hoài Bảo
- **MSSV:** 23127326

## Báo cáo kiểm thử miền (Domain testing)

### Pool A: FR-02: Đăng nhập & Khóa tài khoản

#### Bước 1: Xác định các biến Input và Output (I/O Variables)

##### 1. Các biến đầu vào (Input Variables)

Bao gồm các biến do người dùng nhập trực tiếp từ giao diện/API (Direct Inputs) và các biến trạng thái hệ thống đóng vai trò làm tham số đầu vào cho logic xử lý (System State Inputs):

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `email` | Direct Input | String | - Chuỗi ký tự.<br>- Phải sử dụng `type="email"` (validate HTML5 format, e.g., `user@domain.com`). | Địa chỉ email dùng để đăng nhập. |
| **2** | `password` | Direct Input | String | - Chuỗi ký tự.<br>- Không hiển thị rõ trên giao diện (`type="password"`). | Mật khẩu dùng để đăng nhập. |
| **3** | `failed_login_attempts` | State Input | Integer | - Số nguyên không âm (`>= 0`).<br>- Tăng lên 1 đơn vị sau mỗi lần đăng nhập sai.<br>- Đặt lại về 0 khi đăng nhập thành công. | Bộ đếm số lần đăng nhập sai liên tiếp của tài khoản. |
| **4** | `lockout_status` | State Input | Boolean / Enum | - Trạng thái: Đang bị khóa (Locked) hoặc Đang hoạt động (Active).<br>- Thời gian khóa: 30 giây (môi trường demo) nếu đăng nhập sai liên tiếp `>= 3` lần. | Trạng thái tạm khóa của tài khoản và thời gian đếm ngược (nếu bị khóa). |

##### 2. Các biến đầu ra (Output Variables)

Bao gồm các phản hồi từ hệ thống (API Outputs) và thay đổi trạng thái/giao diện người dùng (UI Outputs):

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `http_status_code` | API Output | Integer | - `200 OK` (Đăng nhập thành công).<br>- `400 Bad Request` / `401 Unauthorized` / `403 Forbidden` (Đăng nhập thất bại / Tài khoản đang bị khóa). | Mã trạng thái HTTP trả về từ backend API. |
| **2** | `api_response_payload` | API Output | JSON Object | - Thành công: Trả về chuỗi JWT `token` và thông tin đối tượng `user` (id, name, email, role).<br>- Thất bại: Trả về thông báo lỗi phù hợp (không tiết lộ chi tiết nguyên nhân đăng nhập sai để bảo mật). | Nội dung JSON phản hồi từ API. |
| **3** | `ui_message` | UI Output | String | - Thành công: Không hiển thị lỗi.<br>- Thất bại: Hiển thị thông báo lỗi phù hợp **trên** nút submit. | Thông điệp thông báo hiển thị trên giao diện người dùng. |
| **4** | `ui_action` | UI Output | Enum | - `Redirect`: Chuyển hướng người dùng sang trang tương ứng và lưu trữ JWT Token phía client.<br>- `Lock`: Vô hiệu hóa nút Đăng nhập và hiển thị thời gian chờ (30 giây) nếu tài khoản bị tạm khóa. | Hành động điều hướng và cập nhật trạng thái giao diện phía client. |

#### Bước 2: Phân hoạch tương đương (Equivalence Partitioning)

##### 1. Các biến đầu vào (Input Variables)

| Mã lớp | Biến đầu vào | Phân loại lớp | Lớp tương đương | Mô tả / Ý nghĩa kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `email` | **Valid** | Định dạng email hợp lệ và tồn tại trong CSDL | Đăng nhập bằng tài khoản có thực (ví dụ: `test@eshop.com`). |
| **EC02** | `email` | **Invalid** | Định dạng email hợp lệ nhưng không tồn tại trong CSDL | Đăng nhập bằng tài khoản không tồn tại (ví dụ: `notfound@eshop.com`). |
| **EC03** | `email` | **Invalid** | Định dạng email không hợp lệ | Nhập thiếu ký tự `@`, thiếu tên miền (ví dụ: `test`, `test@`, `@domain.com`). |
| **EC04** | `email` | **Invalid** | Chuỗi rỗng hoặc chỉ chứa khoảng trắng | Không nhập email hoặc chỉ nhập toàn dấu cách. |
| **EC05** | `password` | **Valid** | Trùng khớp với mật khẩu được lưu trong CSDL của email đó | Mật khẩu chính xác. |
| **EC06** | `password` | **Invalid** | Không trùng khớp với mật khẩu được lưu trong CSDL của email đó | Mật khẩu không chính xác. |
| **EC07** | `password` | **Invalid** | Chuỗi rỗng hoặc chỉ chứa khoảng trắng | Không nhập mật khẩu hoặc chỉ nhập toàn dấu cách. |
| **EC08** | `failed_login_attempts` | **Valid** | Số nguyên nằm trong khoảng `[0, 2]` | Tài khoản đang hoạt động bình thường, chưa bị khóa. |
| **EC09** | `failed_login_attempts` | **Invalid** | Số nguyên `>= 3` | Tài khoản đang ở trạng thái bị tạm khóa do trước đó đã sai liên tiếp từ 3 lần trở lên. |
| **EC10** | `failed_login_attempts` | **Invalid** | Số nguyên `< 0` | Trạng thái lỗi bộ đếm phía hệ thống. |
| **EC11** | `failed_login_attempts` | **Invalid** | Không phải kiểu số nguyên (String, Float, Null, v.v.) | Trạng thái lỗi kiểu dữ liệu bộ đếm phía hệ thống. |
| **EC12** | `lockout_status` | **Valid** | Tài khoản không bị khóa (Active) hoặc thời gian khóa đã hết (`t > 30` giây) | Người dùng có thể tiến hành đăng nhập bình thường. |
| **EC13** | `lockout_status` | **Invalid** | Tài khoản đang bị khóa và thời gian trôi qua `0 <= t <= 30` giây | Tài khoản đang trong thời gian phạt khóa 30 giây, mọi thao tác login đều bị chặn. |
| **EC14** | `lockout_status` | **Invalid** | Thời gian khóa không hợp lệ (`t < 0` giây) | Trạng thái lỗi logic thời gian của hệ thống. |

##### 2. Các biến đầu ra (Output Variables)

| Mã lớp | Biến đầu ra | Phân loại lớp | Lớp tương đương | Ý nghĩa phản hồi |
| :---: | :--- | :---: | :--- | :--- |
| **EC15** | `http_status_code` | **Valid (Success)** | `200 OK` | Đăng nhập thành công. |
| **EC16** | `http_status_code` | **Invalid (Failure)** | `400 Bad Request` hoặc `401 Unauthorized` | Đăng nhập thất bại do sai tài khoản/mật khẩu hoặc lỗi định dạng yêu cầu. |
| **EC17** | `http_status_code` | **Invalid (Failure)** | `403 Forbidden` | Đăng nhập thất bại do tài khoản đang bị tạm khóa. |
| **EC18** | `api_response_payload` | **Valid (Success)** | JSON chứa JWT `token` và thông tin `user` (id, name, email, role) | Trả về thông tin đăng nhập thành công. |
| **EC19** | `api_response_payload` | **Invalid (Failure)** | JSON chứa thông báo lỗi bảo mật chung | Phản hồi lỗi không tiết lộ chi tiết nguyên nhân đăng nhập sai để tránh brute-force. |
| **EC20** | `ui_message` | **Valid (Success)** | Trống (không hiển thị lỗi) | Giao diện ở trạng thái bình thường. |
| **EC21** | `ui_message` | **Invalid (Failure)** | Chuỗi thông báo lỗi hiển thị **trên** nút submit | Giao diện hiển thị thông báo lỗi tương ứng với hành động thất bại. |
| **EC22** | `ui_action` | **Valid (Success)** | `Redirect` sang trang chủ | Client lưu token và thực hiện điều hướng trang. |
| **EC23** | `ui_action` | **Invalid (Failure)** | Giữ nguyên màn hình đăng nhập | Cho phép người dùng nhập lại thông tin. |
| **EC24** | `ui_action` | **Invalid (Failure)** | `Lock` form đăng nhập và đếm ngược 30 giây | Vô hiệu hóa nút Đăng nhập và bắt đầu đếm ngược thời gian khóa. |

#### Bước 3: Lựa chọn giá trị đại diện (Selecting Representatives)

##### 1. Bảng giá trị đại diện cho các lớp tương đương

| Mã lớp | Biến tương ứng | Loại lớp | Giá trị đại diện | Ý nghĩa / Ghi chú kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `email` | Valid | `test@eshop.com` | Tài khoản tồn tại trong hệ thống. |
| **EC02** | `email` | Invalid | `nonexistent@eshop.com` | Tài khoản không tồn tại. |
| **EC03** | `email` | Invalid | `invalid-email.com` | Sai định dạng email. |
| **EC04** | `email` | Invalid | `""` (Chuỗi rỗng) | Bỏ trống email. |
| **EC05** | `password` | Valid | `Test1234!` | Mật khẩu trùng khớp. |
| **EC06** | `password` | Invalid | `WrongPassword!` | Mật khẩu không trùng khớp. |
| **EC07** | `password` | Invalid | `""` (Chuỗi rỗng) | Bỏ trống mật khẩu. |
| **EC08** | `failed_login_attempts` | Valid | `1` | Số lần sai nằm trong khoảng hợp lệ trước khi khóa. |
| **EC09** | `failed_login_attempts` | Invalid | `3` | Số lần đăng nhập sai vượt ngưỡng cho phép (tài khoản đã bị khóa). |
| **EC10** | `failed_login_attempts` | Invalid | `-1` | Số lần sai là số âm (không hợp lệ). |
| **EC11** | `failed_login_attempts` | Invalid | `"two"` | Sai kiểu dữ liệu. |
| **EC12** | `lockout_status` | Valid | Không khóa (Active) | Tài khoản ở trạng thái bình thường. |
| **EC13** | `lockout_status` | Invalid | Đang bị khóa (Locked, ví dụ: vừa khóa được 15 giây) | Tài khoản đang bị tạm khóa. |
| **EC14** | `lockout_status` | Invalid | Thời gian khóa âm (ví dụ: -1 giây) | Giá trị không hợp lệ của trạng thái khóa. |

##### 2. Thiết kế tập Test Cases phân hoạch tương đương (Equivalence Partitioning Test Cases)

Tập test cases tối thiểu dưới đây được thiết kế nhằm bao phủ toàn bộ các lớp tương đương đã phân hoạch ở Bước 2 (áp dụng nguyên tắc kết hợp các lớp Valid và kiểm thử riêng lẻ từng lớp Invalid):

| Mã TC | Tên Test Case | Lớp tương đương phủ | email | password | failed_login_attempts | lockout_status | Kết quả mong đợi (Expected Output) |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **TC01** | Đăng nhập thành công | EC01, EC05, EC08, EC12, EC15, EC18, EC20, EC22 | `test@eshop.com` | `Test1234!` | `1` | Active | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI: Chuyển hướng sang trang chủ. |
| **TC02** | Đăng nhập thất bại do email không tồn tại | EC02, EC16, EC19, EC21, EC23 | `nonexistent@eshop.com` | `Test1234!` | `1` | Active | - HTTP Code: `401 Unauthorized`<br>- Response: Thông báo lỗi bảo mật chung.<br>- UI: Hiển thị lỗi trên nút submit, số lần sai tăng lên. |
| **TC03** | Đăng nhập thất bại do sai định dạng email | EC03, EC16, EC19, EC21, EC23 | `invalid-email.com` | `Test1234!` | `1` | Active | - UI: Block ngay tại client do HTML5 validate hoặc trả về HTTP `400 Bad Request` từ API. |
| **TC04** | Đăng nhập thất bại do bỏ trống email | EC04, EC16, EC19, EC21, EC23 | `""` | `Test1234!` | `1` | Active | - UI: Yêu cầu nhập email hoặc trả về HTTP `400 Bad Request`. |
| **TC05** | Đăng nhập thất bại do sai mật khẩu | EC06, EC16, EC19, EC21, EC23 | `test@eshop.com` | `WrongPassword!` | `1` | Active | - HTTP Code: `401 Unauthorized`<br>- UI: Thông báo lỗi trên nút submit, số lần sai tăng lên. |
| **TC06** | Đăng nhập thất bại do bỏ trống mật khẩu | EC07, EC16, EC19, EC21, EC23 | `test@eshop.com` | `""` | `1` | Active | - UI: Yêu cầu nhập mật khẩu hoặc trả về HTTP `400 Bad Request`. |
| **TC07** | Đăng nhập khi số lần sai vượt ngưỡng (tài khoản khóa) | EC09, EC17, EC19, EC21, EC24 | `test@eshop.com` | `Test1234!` | `3` | Locked ($t = 15s$) | - HTTP Code: `403 Forbidden`<br>- Response: Tài khoản đang bị khóa.<br>- UI: Block submit và hiển thị bộ đếm ngược. |
| **TC08** | Đăng nhập với số lần sai âm (lỗi hệ thống) | EC10, EC16 | `test@eshop.com` | `Test1234!` | `-1` | Active | - HTTP Code: `400 Bad Request` hoặc báo lỗi hệ thống. |
| **TC09** | Đăng nhập với số lần sai sai kiểu dữ liệu | EC11, EC16 | `test@eshop.com` | `Test1234!` | `"two"` | Active | - HTTP Code: `400 Bad Request` hoặc báo lỗi hệ thống. |
| **TC10** | Đăng nhập khi tài khoản có thời gian khóa âm (lỗi hệ thống) | EC14, EC16 | `test@eshop.com` | `Test1234!` | `3` | Locked ($t = -1s$) | - HTTP Code: `400 Bad Request` hoặc báo lỗi hệ thống. |

---

#### Bước 4: Phân tích giá trị biên (Boundary Value Analysis - BVA)

Đối với các biến có thứ tự/khoảng số (như số lần đăng nhập sai liên tiếp và thời gian khóa tài khoản), lỗi thường có xác suất xảy ra cao nhất tại các điểm biên. Ta tiến hành xác định các biên nhạy cảm ($LB, UB, LB-1, LB+1, UB-1, UB+1$) và thiết kế tập kịch bản kiểm thử giá trị biên bổ sung.

##### 1. Phân tích giá trị biên của các biến số/khoảng số

*   **Biến `failed_login_attempts` (Khoảng hợp lệ trước khi bị khóa: `[0, 2]`):**
    *   $LB = 0$: Số lần đăng nhập sai tối thiểu (chưa từng sai).
    *   $LB+1 = 1$: Đăng nhập sai 1 lần.
    *   $UB = 2$: Số lần đăng nhập sai tối đa trước khi bị khóa ở lần tiếp theo.
    *   $UB+1 = 3$: Đăng nhập sai 3 lần, tài khoản chính thức bị khóa.
    *   $LB-1 = -1$: Giá trị âm không hợp lệ.

*   **Biến thời gian khóa $t$ (giây) (Khoảng thời gian bị khóa: `[0, 30]`):**
    *   $LB = 0s$: Vừa mới bắt đầu bị khóa.
    *   $LB+1 = 1s$: Đang bị khóa (thời gian trôi qua cực tiểu).
    *   $UB = 30s$: Thời điểm kết thúc khóa 30 giây.
    *   $UB+1 = 31s$: Vừa hết thời gian khóa (tài khoản tự động mở khóa).
    *   $LB-1 = -1s$: Giá trị thời gian âm không hợp lệ.

##### 2. Thiết kế tập Test Cases giá trị biên (Boundary Value Test Cases)

Để kiểm chứng tính đúng đắn của hệ thống tại các điểm biên nhạy cảm này, ta thực hiện các kịch bản kiểm thử sau:

| Mã TC | Tên Test Case | Biên kiểm thử | email | password | failed_login_attempts | lockout_status | Kết quả mong đợi (Expected Output) |
| :---: | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **TC-BVA-01** | Đăng nhập khi chưa từng sai lần nào | Biên dưới $LB = 0$ của `failed_login_attempts` | `test@eshop.com` | `Test1234!` | **`0`** | Active | - HTTP Code: `200 OK`<br>- Đăng nhập thành công. |
| **TC-BVA-02** | Đăng nhập sai lần đầu tiên | Biên dưới $LB = 0$ của `failed_login_attempts` với mật khẩu sai | `test@eshop.com` | `WrongPassword!` | **`0`** | Active | - HTTP Code: `401 Unauthorized`<br>- Số lần sai tăng lên `1`. |
| **TC-BVA-03** | Đăng nhập sai lần thứ 3 (trực tiếp gây khóa) | Biên trên $UB = 2$ của `failed_login_attempts` với mật khẩu sai | `test@eshop.com` | `WrongPassword!` | **`2`** | Active | - HTTP Code: `401`/`403`<br>- Tài khoản bị tạm khóa 30s, số lần sai tăng lên `3`. |
| **TC-BVA-04** | Đăng nhập ngay khi vừa bị khóa | Biên dưới $LB = 0s$ của thời gian khóa $t$ | `test@eshop.com` | `Test1234!` | `3` | **Locked ($t = 0s$)** | - HTTP Code: `403 Forbidden`<br>- Bị chặn đăng nhập. |
| **TC-BVA-05** | Đăng nhập khi đang bị khóa | Giá trị lân cận biên dưới $LB+1 = 1s$ của thời gian khóa $t$ | `test@eshop.com` | `Test1234!` | `3` | **Locked ($t = 1s$)** | - HTTP Code: `403 Forbidden`<br>- Bị chặn đăng nhập. |
| **TC-BVA-06** | Đăng nhập tại thời điểm giây thứ 30 của khóa | Biên trên $UB = 30s$ của thời gian khóa $t$ | `test@eshop.com` | `Test1234!` | `3` | **Locked ($t = 30s$)** | - HTTP Code: `403 Forbidden` (Vẫn bị khóa hoặc mở khóa tùy cách so sánh biên của backend). |
| **TC-BVA-07** | Đăng nhập thành công ngay khi vừa hết hạn khóa | Giá trị lân cận biên trên $UB+1 = 31s$ của thời gian khóa $t$ | `test@eshop.com` | `Test1234!` | `3` | **Locked ($t = 31s$ -> Active)** | - HTTP Code: `200 OK`<br>- Đăng nhập thành công. |

