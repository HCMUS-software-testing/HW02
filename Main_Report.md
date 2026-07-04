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
