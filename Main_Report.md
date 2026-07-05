# Báo cáo HW02 Domain Testing

## Thông tin sinh viên

- **Họ và tên:** Lê Mai Hoài Bảo
- **MSSV:** 23127326

## Báo cáo kiểm thử miền (Domain testing)

### Pool A: FR-02: Đăng nhập & Khóa tài khoản

#### Bước 1: Xác định các biến Input và Output (I/O Variables)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các biến vào/ra của tính năng **FR-02: Đăng nhập & Khóa tài khoản**, em đã thực hiện các bước phân tích sau:
1.  **Phân tích đặc tả nghiệp vụ (Specification Analysis):** Đọc kỹ tài liệu đặc tả yêu cầu hệ thống [README.md](./eshop-sut/README.md), chức năng này yêu cầu người dùng nhập `email` và `password` qua form giao diện. Đồng thời, nghiệp vụ có yêu cầu nâng cao: ghi nhận số lần đăng nhập sai liên tiếp và tạm khóa tài khoản 30 giây nếu đăng nhập sai liên tiếp từ 3 lần trở lên.
2.  **Xác định biến đầu vào trực tiếp (Direct Inputs):** Hai trường người dùng tương tác trực tiếp là `email` (chuỗi ký tự, có validate HTML5 format trên UI) và `password` (chuỗi ký tự ẩn).
3.  **Xác định biến đầu vào trạng thái (System State Inputs):** Do logic khóa tài khoản phụ thuộc vào lịch sử đăng nhập trước đó và thời gian khóa, hệ thống bắt buộc phải lưu trữ trạng thái: số lần đăng nhập sai liên tiếp trước đó (`consecutive_failed_logins`) và trạng thái khóa của người dùng (`lockout_state` / thời gian trôi qua kể từ lúc bị khóa). Đây chính là các tham số đầu vào ẩn quyết định luồng xử lý tiếp theo của ứng dụng.
4.  **Xác định biến đầu ra (Outputs):** Ở mức API, hệ thống trả về mã trạng thái HTTP (`http_status_code`) và dữ liệu JSON (`api_response_payload` chứa token khi thành công hoặc thông báo lỗi bảo mật chung khi thất bại). Ở mức giao diện, hệ thống hiển thị thông điệp lỗi (`ui_message`) trên nút submit và thực hiện hành động điều hướng hoặc vô hiệu hóa form (`ui_action`).

##### 1. Các biến đầu vào (Input Variables)


Bao gồm các biến do người dùng nhập trực tiếp từ giao diện/API (Direct Inputs) và các biến trạng thái hệ thống đóng vai trò làm tham số đầu vào cho logic xử lý (System State Inputs):

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `email` | Direct Input | String | - Chuỗi ký tự.<br>- Phải sử dụng `type="email"` (validate HTML5 format, e.g., `user@domain.com`). | Địa chỉ email dùng để đăng nhập. |
| **2** | `password` | Direct Input | String | - Chuỗi ký tự.<br>- Không hiển thị rõ trên giao diện (`type="password"`). | Mật khẩu dùng để đăng nhập. |
| **3** | `consecutive_failed_logins` | State Input | Integer | - Số nguyên không âm (`>= 0`).<br>- Tăng thêm 1 sau mỗi lần đăng nhập thất bại.<br>- Đặt lại về 0 khi đăng nhập thành công. | Số lần đăng nhập sai liên tiếp của tài khoản. |
| **4** | `lockout_state` | State Input | Enum | - Trạng thái: Đang bị tạm khóa (Locked) hoặc Đang hoạt động (Active).<br>- Thời gian khóa: 30 giây (môi trường demo) nếu đăng nhập sai liên tiếp `>= 3` lần. | Trạng thái tạm khóa của tài khoản và thời gian đếm ngược (nếu bị khóa). |

##### 2. Các biến đầu ra (Output Variables)

Bao gồm các phản hồi từ hệ thống (API Outputs) và thay đổi trạng thái/giao diện người dùng (UI Outputs):

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `http_status_code` | API Output | Integer | - `200 OK` (Đăng nhập thành công).<br>- `400 Bad Request` / `401 Unauthorized` / `403 Forbidden` (Đăng nhập thất bại / Tài khoản đang bị khóa). | Mã trạng thái HTTP trả về từ backend API. |
| **2** | `api_response_payload` | API Output | JSON Object | - Thành công: Trả về chuỗi JWT `token` và thông tin đối tượng `user` (id, name, email, role).<br>- Thất bại: Trả về thông báo lỗi phù hợp (không tiết lộ chi tiết nguyên nhân đăng nhập sai để bảo mật). | Nội dung JSON phản hồi từ API. |
| **3** | `ui_message` | UI Output | String | - Thành công: Không hiển thị lỗi.<br>- Thất bại: Hiển thị thông báo lỗi phù hợp **trên** nút submit. | Thông điệp thông báo hiển thị trên giao diện người dùng. |
| **4** | `ui_action` | UI Output | Enum | - `Redirect`: Chuyển hướng người dùng sang trang tương ứng và lưu trữ JWT Token phía client.<br>- `Lock`: Vô hiệu hóa nút Đăng nhập và hiển thị thời gian chờ (30 giây) nếu tài khoản bị tạm khóa. | Hành động điều hướng và cập nhật trạng thái giao diện phía client. |

#### Bước 2: Phân hoạch tương đương (Equivalence Partitioning)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để thực hiện kỹ thuật Phân hoạch tương đương cho tính năng **FR-02: Đăng nhập & Khóa tài khoản**, em đã áp dụng các bước có hệ thống sau:
1.  **Phân tích điều kiện đầu vào/đầu ra:** Dựa trên danh sách các biến đã xác định ở Bước 1, em tiến hành phân tích các điều kiện ràng buộc đối với từng biến dựa trên tài liệu đặc tả hệ thống.
2.  **Xác định các lớp tương đương Valid (EC hợp lệ) và Invalid (EC không hợp lệ) từ bên ngoài:**
    *   *Đối với Email:* Phân hoạch dựa trên sự tồn tại của email trong CSDL (hợp lệ/không tồn tại) và tính hợp lệ về mặt định dạng chuỗi (định dạng email chuẩn so với sai định dạng hoặc để trống).
    *   *Đối với Mật khẩu:* Phân hoạch dựa trên độ trùng khớp thông tin mật khẩu của tài khoản (mật khẩu đúng so với mật khẩu sai hoặc để trống).
    *   *Đối với consecutive_failed_logins (Số lần đăng nhập sai liên tiếp):* Phân hoạch dựa trên điều kiện kích hoạt trạng thái bị khóa của hệ thống. Vì đây là kiểm thử hộp đen thuần túy ở đầu vào (không can thiệp sửa trực tiếp DB), nên số lần sai ban đầu chỉ có thể là các số nguyên phi âm hợp lệ từ bên ngoài: nằm trong khoảng đăng nhập bình thường `[0, 2]` (Valid) và đạt tới ngưỡng khóa `>= 3` (Invalid).
    *   *Đối với lockout_state (Trạng thái khóa và thời gian chờ):* Phân hoạch dựa trên việc tài khoản có đang trong thời gian phạt tạm khóa (đang khóa trong khoảng 30s) hay đang hoạt động bình thường.
    *   *Đối với biến đầu ra (Outputs):* Phân hoạch dựa trên mã HTTP trả về, cấu trúc dữ liệu phản hồi (JSON chứa token/lỗi), và hành vi giao diện UI (hiển thị lỗi, khóa form đăng nhập hoặc chuyển hướng trang).
3.  **Lựa chọn giá trị đại diện (Representatives):** Với mỗi lớp tương đương được phân hoạch, em chọn ra một giá trị đại diện cụ thể (ví dụ: `test@eshop.com` cho email tồn tại, `WrongPassword!` cho mật khẩu sai, số lần sai = 1 cho trường hợp bình thường).
4.  **Thiết kế tập Test Cases tối thiểu:** Áp dụng nguyên tắc kết hợp các lớp tương đương:
    *   *Đăng nhập thành công (TC01):* Kết hợp tất cả các lớp tương đương hợp lệ (**Valid**) của mọi biến đầu vào để kiểm tra luồng chính của hệ thống trong 1 test case duy nhất.
    *   *Kiểm thử các lớp lỗi (TC02 đến TC07):* Đối với các lớp không hợp lệ (**Invalid**), em thiết kế mỗi test case chỉ chứa duy nhất **một** lớp không hợp lệ kết hợp với các lớp hợp lệ khác. Nguyên tắc này giúp cô lập lỗi (isolation) và tránh hiện tượng che giấu lỗi (error masking).
    *   *Các kịch bản tích hợp & bảo mật nâng cao (TC08 đến TC10):* Bổ sung các kịch bản kiểm thử API trực tiếp, race condition concurrent và phiên làm việc để tăng độ bao phủ kiểm thử.

##### 1. Các biến đầu vào (Input Variables)

| Mã lớp | Biến đầu vào | Phân loại lớp | Lớp tương đương | Mô tả / Ý nghĩa kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `email` | **Valid** | Định dạng email hợp lệ và tồn tại trong CSDL | Đăng nhập bằng tài khoản có thực (ví dụ: `test@eshop.com`). |
| **EC02** | `email` | **Invalid** | Định dạng email hợp lệ nhưng không tồn tại trong CSDL | Đăng nhập bằng tài khoản không tồn tại (ví dụ: `nonexistent@eshop.com`). |
| **EC03** | `email` | **Invalid** | Định dạng email không hợp lệ | Nhập thiếu ký tự `@`, thiếu tên miền (ví dụ: `invalid-email.com`). |
| **EC04** | `email` | **Invalid** | Chuỗi rỗng | Bỏ trống email. |
| **EC05** | `password` | **Valid** | Trùng khớp với mật khẩu được lưu trong CSDL của email đó | Mật khẩu chính xác. |
| **EC06** | `password` | **Invalid** | Không trùng khớp với mật khẩu được lưu trong CSDL của email đó | Mật khẩu không chính xác. |
| **EC07** | `password` | **Invalid** | Chuỗi rỗng | Bỏ trống mật khẩu. |
| **EC08** | `consecutive_failed_logins` | **Valid** | Số nguyên nằm trong khoảng `[0, 2]` | Tài khoản đang hoạt động bình thường, chưa bị khóa. |
| **EC09** | `consecutive_failed_logins` | **Invalid** | Số nguyên `>= 3` | Tài khoản đang ở trạng thái bị tạm khóa do trước đó đã sai liên tiếp từ 3 lần trở lên. |
| **EC10** | `lockout_state` | **Valid** | Tài khoản không bị khóa (Active) hoặc thời gian khóa đã hết (`t > 30` giây) | Người dùng có thể tiến hành đăng nhập bình thường. |
| **EC11** | `lockout_state` | **Invalid** | Tài khoản đang bị khóa và thời gian trôi qua `0 <= t <= 30` giây | Tài khoản đang trong thời gian phạt khóa 30 giây, mọi thao tác login đều bị chặn. |

##### 2. Các biến đầu ra (Output Variables)

| Mã lớp | Biến đầu ra | Phân loại lớp | Lớp tương đương | Ý nghĩa phản hồi |
| :---: | :--- | :---: | :--- | :--- |
| **EC12** | `http_status_code` | **Valid (Success)** | `200 OK` | Đăng nhập thành công. |
| **EC13** | `http_status_code` | **Invalid (Failure)** | `400 Bad Request` hoặc `401 Unauthorized` | Đăng nhập thất bại do sai tài khoản/mật khẩu hoặc lỗi định dạng. |
| **EC14** | `http_status_code` | **Invalid (Failure)** | `403 Forbidden` | Đăng nhập thất bại do tài khoản đang bị tạm khóa. |
| **EC15** | `api_response_payload` | **Valid (Success)** | JSON chứa JWT `token` và thông tin `user` (id, name, email, role) | Trả về thông tin đăng nhập thành công. |
| **EC16** | `api_response_payload` | **Invalid (Failure)** | JSON chứa thông báo lỗi bảo mật chung | Phản hồi lỗi không tiết lộ chi tiết nguyên nhân đăng nhập sai. |
| **EC17** | `ui_message` | **Valid (Success)** | Trống (không hiển thị lỗi) | Giao diện ở trạng thái bình thường. |
| **EC18** | `ui_message` | **Invalid (Failure)** | Chuỗi thông báo lỗi hiển thị **trên** nút submit | Giao diện hiển thị thông báo lỗi tương ứng với hành động thất bại. |
| **EC19** | `ui_action` | **Valid (Success)** | `Redirect` sang trang chủ | Client lưu token và thực hiện điều hướng trang. |
| **EC20** | `ui_action` | **Invalid (Failure)** | Giữ nguyên màn hình đăng nhập | Cho phép người dùng nhập lại thông tin. |
| **EC21** | `ui_action` | **Invalid (Failure)** | `Lock` form đăng nhập và đếm ngược 30 giây | Vô hiệu hóa nút Đăng nhập và bắt đầu đếm ngược thời gian khóa. |

---

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
| **EC08** | `consecutive_failed_logins` | Valid | `1` | Số lần sai nằm trong khoảng hợp lệ trước khi khóa. |
| **EC09** | `consecutive_failed_logins` | Invalid | `3` | Số lần đăng nhập sai vượt ngưỡng cho phép (tài khoản đã bị khóa). |
| **EC10** | `lockout_state` | Valid | Không khóa (Active) | Tài khoản ở trạng thái bình thường. |
| **EC11** | `lockout_state` | Invalid | Đang bị khóa (Locked, ví dụ: vừa khóa được 15 giây) | Tài khoản đang bị tạm khóa. |

##### 2. Thiết kế tập Test Cases phân hoạch tương đương (Equivalence Partitioning Test Cases)

Tập test cases tối thiểu dưới đây được thiết kế nhằm bao phủ toàn bộ các lớp tương đương đã phân hoạch ở Bước 2 (áp dụng nguyên tắc kết hợp các lớp Valid và kiểm thử riêng lẻ từng lớp Invalid):

| Mã TC | Tên Test Case | Lớp tương đương phủ | Điều kiện tiền đề (Preconditions) | email | password | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Đăng nhập thành công | EC01, EC05, EC08, EC10, EC12, EC15, EC17, EC19 | Tài khoản đã đăng nhập sai 1 lần trước đó | `test@eshop.com` | `Test1234!` | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI / Client: Lưu trữ thành công JWT Token phía client để sử dụng cho các yêu cầu có xác thực. | - HTTP Code: `200 OK`<br>- Response: Trả về thành công JWT `token` và `user`, tuy nhiên đối tượng `user` bị lộ mật khẩu chưa mã hóa `"password": "Test1234!"` và các trường nội bộ.<br>- UI / Client: Lưu token thành công phía client. | **Fail** |
| **TC02** | Đăng nhập thất bại do email không tồn tại | EC02, EC13, EC16, EC18, EC20 | Không có (tài khoản chưa tồn tại) | `nonexistent@eshop.com` | `Test1234!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi bảo mật chung, không phân biệt nguyên nhân.<br>- UI: Hiển thị thông báo lỗi chung (không tiết lộ chi tiết nguyên nhân lỗi như "tài khoản không tồn tại" để tránh dò tài khoản). | - HTTP Code: `401 Unauthorized`<br>- Response: `{"error": "Invalid email or password"}`<br>- UI: Hiển thị lỗi đăng nhập thất bại. | **Pass** |
| **TC03** | Đăng nhập thất bại do sai định dạng email | EC03, EC13, EC16, EC18, EC20 | Không có | `invalid-email.com` | `Test1234!` | - UI: Trình duyệt chặn submit ngay tại client do HTML5 validation (yêu cầu nhập đúng định dạng email), không gửi request lên server. | - UI: Không chặn submit tại client, gửi request thành công lên server.<br>- HTTP Code: `401 Unauthorized`<br>- Response: `{"error": "Invalid email or password"}` | **Fail** |
| **TC04** | Đăng nhập thất bại do bỏ trống email | EC04, EC13, EC16, EC18, EC20 | Không có | `""` | `Test1234!` | - UI: Trình duyệt chặn submit ngay tại client do thuộc tính `required` (hiển thị tooltip yêu cầu nhập trường này), không gửi request lên server. | - UI: Trình duyệt chặn submit thành công, hiển thị tooltip thông báo lỗi "Please fill out this field". Không gửi request lên server. | **Pass** |
| **TC05** | Đăng nhập thất bại do sai mật khẩu | EC06, EC13, EC16, EC18, EC20 | Tài khoản đã đăng nhập sai 1 lần trước đó | `test@eshop.com` | `WrongPassword!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi bảo mật chung, không phân biệt nguyên nhân.<br>- UI: Hiển thị thông báo lỗi chung (không tiết lộ chi tiết nguyên nhân lỗi như "sai mật khẩu"). | - HTTP Code: `401 Unauthorized`<br>- Response: `{"error": "Invalid email or password"}`<br>- UI: Hiển thị lỗi đăng nhập thất bại. | **Pass** |
| **TC06** | Đăng nhập thất bại do bỏ trống mật khẩu | EC07, EC13, EC16, EC18, EC20 | Tài khoản hoạt động bình thường, chưa bị khóa | `test@eshop.com` | `""` | - UI: Trình duyệt chặn submit ngay tại client do thuộc tính `required` (hiển thị tooltip yêu cầu nhập trường này), không gửi request lên server. | - UI: Trình duyệt chặn submit thành công, hiển thị tooltip thông báo yêu cầu điền mật khẩu. Không gửi request lên server. | **Pass** |
| **TC07** | Đăng nhập khi số lần sai vượt ngưỡng (tài khoản khóa) | EC09, EC11, EC14, EC16, EC18, EC21 | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó (đang trong thời gian tạm khóa 30 giây, ví dụ đã trôi qua 15 giây) | `test@eshop.com` | `Test1234!` | - HTTP Code: `403 Forbidden`<br>- Response: JSON chứa thông báo lỗi thích hợp về việc tài khoản bị khóa.<br>- UI: Hiển thị thông báo lỗi thích hợp báo tài khoản bị khóa. | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`<br>- UI: Hiển thị thông báo lỗi báo tài khoản bị khóa. | **Pass** |
| **TC08** | Kiểm thử Brute-force song song (Race Condition) | EC09, EC14, EC21 (concurrency) | Tài khoản hoạt động bình thường, chưa từng đăng nhập sai | `test@eshop.com` | `WrongPassword!` | - Gửi đồng thời 5 request đăng nhập sai trong cùng 1 mili giây qua API.<br>- Backend khóa dòng, khóa tài khoản ngay lập tức và trả về `403 Forbidden` ở các request từ lần 3 trở đi. | - Kết quả nhận được: Cả 5 request đều lọt qua bộ kiểm tra và trả về `401 Unauthorized` cùng lúc, không request nào bị chặn `403 Forbidden` trong loạt gửi song song.<br>- Tài khoản chỉ bị khóa sau khi toàn bộ loạt request này thực thi xong. | **Fail** |
| **TC09** | Kiểm tra JWT token cũ sau khi tài khoản bị khóa ở session khác | EC09, EC11, EC14 (token check) | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó trên thiết bị khác (đang bị tạm khóa) | `test@eshop.com` | (Sử dụng JWT Token cũ) | Dùng token cũ của Thiết bị A gọi API `/api/users/me` sau khi Thiết bị B đã khóa tài khoản. Hệ thống trả về `401 Unauthorized` hoặc `403 Forbidden`. | - HTTP Code: `200 OK`<br>- Response: Trả về thành công thông tin user cá nhân chứa mật khẩu gốc lộ diện (`password: "Test1234!"`), không vô hiệu hóa token cũ của tài khoản bị khóa. | **Fail** |
| **TC10** | Gửi định dạng email sai trực tiếp qua Backend API | EC03, EC13, EC16 | Không có | `notanemail` | `Test1234!` | Dùng Postman/cURL gửi trực tiếp request POST đến `/api/login` vượt qua Frontend. Backend trả về `400 Bad Request` hoặc `401 Unauthorized` kèm lỗi định dạng email. | - HTTP Code: `401 Unauthorized`<br>- Response: `{"error": "Invalid email or password"}`. Backend không validate định dạng email mà vẫn chạy truy vấn tìm kiếm trong DB và trả về lỗi đăng nhập sai chung. | **Fail** |


---

#### Bước 4: Phân tích giá trị biên (Boundary Value Analysis - BVA)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các giá trị biên nhạy cảm của tính năng **FR-02: Đăng nhập & Khóa tài khoản**, em đã thực hiện phân tích theo các bước sau:
1.  **Xác định các biến có tính thứ tự hoặc khoảng số:** Trong các biến đầu vào đã xác định ở Bước 1, có 2 biến dạng số/thời gian liên tục là số lần đăng nhập sai liên tiếp (`consecutive_failed_logins`) và thời gian khóa tài khoản $t$ (tính bằng giây).
2.  **Xác định các điểm biên (Boundaries) cho từng biến:**
    *   *Số lần đăng nhập sai:* Nghiệp vụ quy định tài khoản bị khóa nếu đăng nhập sai từ 3 lần trở lên. Điều này có nghĩa là khoảng giá trị cho phép người dùng đăng nhập bình thường là `[0, 2]`. Do đó, biên dưới là $LB = 0$ (chưa sai lần nào) và biên trên là $UB = 2$ (số lần sai tối đa trước khi bị khóa ở lần tiếp theo).
    *   *Thời gian khóa tài khoản:* Nghiệp vụ quy định tài khoản bị tạm khóa trong 30 giây. Điều này có nghĩa là khoảng thời gian phạt khóa tài khoản là `[0, 30]` giây. Do đó, biên dưới là $LB = 0s$ (thời điểm vừa bị khóa) và biên trên là $UB = 30s$ (giây cuối cùng trước khi hết hạn khóa).
3.  **Lựa chọn các điểm kiểm thử biên nhạy cảm:** Với mỗi khoảng giá trị, em áp dụng nguyên tắc kiểm thử biên tiêu chuẩn gồm $LB$ (biên dưới), $UB$ (biên trên), các giá trị ngay sát ngoài biên dưới ($LB-1$), sát ngoài biên trên ($UB+1$), sát trong biên dưới ($LB+1$) và sát trong biên trên ($UB-1$) để tạo ra các test cases kiểm thử biên tương ứng. *Lưu ý: Các giá trị biên không thể kích hoạt từ các giao thức đầu vào công khai như bộ đếm âm ($LB-1 = -1$) hay thời gian âm ($LB-1 = -1s$) chỉ được ghi nhận dưới góc độ phân tích lý thuyết, nhưng không thiết kế test case trong bảng kiểm thử hộp đen thực tế do nguyên tắc không can thiệp chỉnh sửa trực tiếp Database.*

##### 1. Phân tích giá trị biên của các biến số/khoảng số

*   **Biến `consecutive_failed_logins` (Khoảng hợp lệ trước khi bị khóa: `[0, 2]`):**
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

| Mã TC | Tên Test Case | Biên kiểm thử | Điều kiện tiền đề (Preconditions) | email | password | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-BVA-01** | Đăng nhập khi chưa từng sai lần nào | Biên dưới $LB = 0$ của `consecutive_failed_logins` | Tài khoản chưa từng đăng nhập sai trước đó | `test@eshop.com` | `Test1234!` | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI / Client: Lưu trữ thành công JWT Token phía client để sử dụng cho các yêu cầu có xác thực. | - HTTP Code: `200 OK`<br>- Response: Đăng nhập thành công, trả về JWT token và thông tin user.<br>- UI / Client: Lưu token thành công phía client. | **Pass** |
| **TC-BVA-02** | Đăng nhập sai lần đầu tiên | Biên dưới $LB = 0$ của `consecutive_failed_logins` với mật khẩu sai | Tài khoản chưa từng đăng nhập sai trước đó | `test@eshop.com` | `WrongPassword!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi bảo mật chung. | - HTTP Code: `401 Unauthorized`<br>- Response: `{"error": "Invalid email or password"}`. | **Pass** |
| **TC-BVA-03** | Đăng nhập sai lần thứ 3 (trực tiếp gây khóa) | Biên trên $UB = 2$ của `consecutive_failed_logins` với mật khẩu sai | Tài khoản đã đăng nhập sai 2 lần liên tiếp trước đó | `test@eshop.com` | `WrongPassword!` | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi bảo mật chung.<br>- Hệ thống tự động chuyển sang trạng thái bị tạm khóa (các lần đăng nhập tiếp theo trong vòng 30s sẽ bị từ chối với mã 403). | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`. Tài khoản đã bị khóa từ trước đó (bị khóa sớm sau lần sai thứ 2) nên request này bị chặn ngay lập tức. | **Fail** |
| **TC-BVA-04** | Đăng nhập ngay khi vừa bị khóa | Biên dưới $LB = 0s$ của thời gian khóa $t$ | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó (vừa mới bị khóa, $t = 0$ giây) | `test@eshop.com` | `Test1234!` | - HTTP Code: `403 Forbidden`<br>- Response: JSON chứa thông báo lỗi thích hợp về việc tài khoản bị khóa.<br>- UI: Hiển thị thông báo lỗi thích hợp báo tài khoản bị khóa. | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.<br>- UI / Thực tế: Nhập sai 3 lần (lần 3 bị chặn 403 do khóa từ lần 2), đăng nhập đúng ngay sau đó bị chặn thành công bằng mã 403 ở giây thứ 0. | **Pass** |
| **TC-BVA-05** | Đăng nhập khi đang bị khóa | Giá trị lân cận biên dưới $LB+1 = 1s$ của thời gian khóa $t$ | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó (đang trong thời gian khóa, $t = 1$ giây) | `test@eshop.com` | `Test1234!` | - HTTP Code: `403 Forbidden`<br>- Response: JSON chứa thông báo lỗi thích hợp về việc tài khoản bị khóa.<br>- UI: Hiển thị thông báo lỗi thích hợp báo tài khoản bị khóa. | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.<br>- UI / Thực tế: Đăng nhập đúng ở giây thứ 1 bị chặn thành công bằng mã 403. | **Pass** |
| **TC-BVA-06** | Đăng nhập tại thời điểm giây thứ 30 của khóa | Biên trên $UB = 30s$ của thời gian khóa $t$ | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó (đang trong thời gian khóa, $t = 30$ giây) | `test@eshop.com` | `Test1234!` | - HTTP Code: `403 Forbidden`<br>- Response: JSON chứa thông báo lỗi thích hợp về việc tài khoản bị khóa.<br>- UI: Hiển thị thông báo lỗi thích hợp báo tài khoản bị khóa. | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.<br>- UI / Thực tế: Đăng nhập đúng ở giây thứ 30 bị chặn thành công bằng mã 403 (tài khoản vẫn đang bị khóa). | **Pass** |
| **TC-BVA-07** | Đăng nhập thành công ngay khi vừa hết hạn khóa | Giá trị lân cận biên trên $UB+1 = 31s$ của thời gian khóa $t$ | Tài khoản đã đăng nhập sai 3 lần liên tiếp trước đó (vừa hết thời gian tạm khóa 30 giây, $t = 31$ giây) | `test@eshop.com` | `Test1234!` | - HTTP Code: `200 OK`<br>- Response: JSON chứa JWT `token` & thông tin `user`.<br>- UI / Client: Lưu trữ thành công JWT Token phía client để sử dụng cho các yêu cầu có xác thực. | - HTTP Code: `403 Forbidden`<br>- Response: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.<br>- UI / Thực tế: Đăng nhập đúng tại giây thứ 31 bị từ chối bằng mã 403, tài khoản vẫn tiếp tục bị khóa (không tự động mở khóa sau 30 giây như đặc tả). | **Fail** |

#### Bước 5: Phân tích khoảng trống AI (AI Gap Analysis)

##### 1. Các kịch bản/lỗi kiểm thử mà AI đã bỏ sót
*   **Đồng thời brute-force (Race Condition):** AI bỏ sót kịch bản người dùng gửi liên tiếp nhiều request đăng nhập sai trong cùng một thời điểm rất ngắn (concurrency). Nếu hệ thống không khóa bản ghi (row lock) khi ghi nhận số lần sai vào database, số lần đăng nhập sai liên tiếp (`consecutive_failed_logins`) có thể bị tính toán sai, dẫn đến việc tài khoản không bị khóa sau 3 lần sai.
*   **Vô hiệu hóa phiên làm việc (Session/Token Invalidation):** AI chưa đề xuất kiểm thử xem JWT token cũ đã được cấp từ trước có bị vô hiệu hóa ngay lập tức khi tài khoản bị khóa ở một phiên khác hay không.

##### 2. Các sự nhầm lẫn, ảo giác và thiếu sót của AI trong quá trình thiết kế (AI Critique)
*   **Nhầm lẫn giữa Kiểm thử Hộp đen (Black-box) và Hộp xám/Hộp trắng (Grey-box/White-box):**
    *   *Ảo giác kiểm tra trực tiếp Database ở Expected Output:* Trong các phiên thảo luận ban đầu, AI liên tục đưa các câu lệnh kiểm tra dữ liệu trực tiếp trong Database (ví dụ: yêu cầu kiểm tra trường `login_attempts` trong database sau khi test case chạy xong) vào cột **Kết quả mong đợi (Expected Output)**. Điều này vi phạm nguyên lý hộp đen vì các trường này nằm ẩn trong CSDL và chỉ có thể được kiểm chứng gián tiếp thông qua các hành vi giao diện hoặc API bên ngoài.
    *   *Đề xuất test case can thiệp DB trực tiếp:* AI đề xuất các test case âm phi thực tế như thiết lập bộ đếm sai thành `-1` hay `"two"` trong database trước khi chạy test, vốn không thể thực hiện được thông qua các giao diện UI/API công khai của người dùng cuối.
*   **Nhầm lẫn về vai trò của biến đầu vào (Inputs) và Trạng thái hệ thống (Preconditions):**
    *   AI sử dụng các tên biến kỹ thuật tương tự tên cột trong Database như `failed_login_attempts` và `lockout_status` rồi xếp chúng vào cột biến đầu vào (Input Variables). Việc này gây hiểu nhầm rằng tester có thể nhập các giá trị này trực tiếp từ form đăng nhập. Trên thực tế, chúng là **Trạng thái hệ thống (System State)**, cần được mô hình hóa dưới dạng **Điều kiện tiền đề (Preconditions)**.
*   **Xu hướng bị ảnh hưởng bởi code cài đặt thực tế (Implementation Bias):**
    *   AI đưa chính xác các chuỗi JSON lỗi cụ thể của backend như `{"error": "Invalid email or password"}` hay `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}` vào cột Kết quả mong đợi (Expected Output) thay vì mô tả yêu cầu nghiệp vụ chung từ đặc tả.

##### 3. Giải thích nguyên nhân AI gặp các hạn chế trên
*   **Hạn chế của công cụ AI (Limitations of the AI tool itself):** AI thực hiện kiểm thử hộp đen tĩnh dựa trên văn bản đặc tả. Nó không tự chạy mã nguồn SUT hoặc mô phỏng môi trường động. Vì vậy, các khía cạnh kỹ thuật như xử lý bất đồng bộ (concurrency), tranh chấp tài nguyên (race conditions), hay các lỗ hổng bảo mật nâng cao nằm ngoài khả năng suy luận mặc định của AI.
*   **Độ phức tạp nội tại của tính năng (Inherent complexity of the feature under test):** FR-02 nhìn bên ngoài giao diện rất đơn giản (chỉ có form Email và Password), nhưng phía sau backend là sự kết hợp phức tạp giữa quản lý trạng thái và cơ chế xác thực không lưu trạng thái (stateless JWT token). AI có xu hướng tập trung vào các luồng chức năng bề nổi (functional UI flows) mà bỏ qua các logic bảo mật phi chức năng (non-functional security logic).
*   **Chất lượng của dữ liệu đầu vào (Prompt Quality):** Các prompt ban đầu chỉ yêu cầu AI đọc tài liệu đặc tả chung mà chưa cung cấp ngữ cảnh về môi trường triển khai thực tế, các yêu cầu kiểm thử phi chức năng hay các tiêu chuẩn an toàn thông tin (như OWASP). Điều này khiến AI chỉ tập trung tối ưu hóa các phân vùng giá trị biên của email/password theo nghiệp vụ thông thường mà bỏ qua các trường hợp biên của bảo mật hệ thống.

---

### Pool B: FR-09: Mã Giảm Giá (Coupon)

#### Bước 1: Xác định các biến Input và Output (I/O Variables)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các biến vào/ra của tính năng **FR-09: Mã Giảm Giá (Coupon)**, em đã thực hiện các bước phân tích sau:
1.  **Phân tích đặc tả nghiệp vụ (Specification Analysis):** Đọc kỹ tài liệu đặc tả yêu cầu hệ thống [README.md](./eshop-sut/README.md). Chức năng này yêu cầu hệ thống áp dụng mã giảm giá khi người dùng nhập mã tại bước Checkout dựa trên 5 điều kiện (C1 đến C5) đồng thời thỏa mãn. Có 2 loại giảm giá là theo phần trăm (`percent`) và cố định (`fixed`).
2.  **Xác định biến đầu vào trực tiếp (Direct Inputs):** Các tham số người dùng nhập trực tiếp hoặc gửi qua API body của endpoint `POST /api/apply-coupon` bao gồm: mã giảm giá (`code`), tổng số tiền đơn hàng gốc (`total_amount`), ID người dùng áp dụng mã (`user_id`), và Token JWT xác thực trong header (`jwt_token` / `Authorization`).
3.  **Xác định biến đầu vào trạng thái (System State Inputs):** Trạng thái của mã giảm giá trong hệ thống bao gồm hoạt động hay không (`coupon_state`), ngày hết hạn (`coupon_expiration`), và lịch sử sử dụng của người dùng (`user_coupon_usage`). Các biến này không thể nhập trực tiếp qua form UI của client mà được lưu trữ trong CSDL và dùng làm **Điều kiện tiền đề (Preconditions)** cho các kịch bản kiểm thử.
4.  **Xác định biến đầu ra (Outputs):** Ở mức API, backend trả về mã trạng thái HTTP (`http_status_code`), số tiền được giảm (`discount_amount`), và số tiền cuối cùng phải trả (`final_amount`). Ở mức UI, giao diện hiển thị thông báo kết quả (`ui_message`) và thực hiện hành động cập nhật giá trị hiển thị hoặc báo lỗi (`ui_action`).

##### 1. Các biến đầu vào (Input Variables)

Dưới đây là danh sách các biến đầu vào của chức năng:

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `code` | Direct Input | String | Ký tự chữ và số, không chứa ký tự đặc biệt, không trống | Mã giảm giá do người dùng nhập vào. |
| **2** | `total_amount` | Direct Input | Integer | Số nguyên dương >= 0 | Tổng tiền đơn hàng trước khi giảm giá. |
| **3** | `user_id` | Direct Input | Integer | Số nguyên dương > 0 | ID của người dùng áp dụng mã giảm giá. |
| **4** | `jwt_token` | Direct Input | String | Định dạng chuỗi JWT hợp lệ | Token xác thực truyền qua header `Authorization`. |
| **5** | `coupon_state` | State Input | Enum | Active (`is_active = 1`) / Inactive (`is_active = 0`) / Không tồn tại | Trạng thái hoạt động của mã trong DB — **Dùng làm Precondition**. |
| **6** | `coupon_expiration` | State Input | DateTime | Ngày cụ thể (`expired_at`) | Hạn sử dụng của mã — **Dùng làm Precondition**. |
| **7** | `user_coupon_usage` | State Input | Integer | Số nguyên không âm (>= 0) | Số lần người dùng đã sử dụng mã này — **Dùng làm Precondition**. |

##### 2. Các biến đầu ra (Output Variables)

Dưới đây là danh sách các biến đầu ra phản hồi từ hệ thống:

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `http_status_code` | API Output | Integer | `200` (Thành công) / `400`, `401`, `403`, `404` (Thất bại) | Mã phản hồi HTTP từ server. |
| **2** | `discount_amount` | API Output | Integer | Số nguyên không âm (>= 0) | Số tiền được giảm giá dựa trên công thức tính. |
| **3** | `final_amount` | API Output | Integer | Số nguyên không âm (>= 0) | Số tiền cuối cùng sau giảm giá. |
| **4** | `ui_message` | UI Output | String | Thông báo thành công hoặc thông báo lỗi nghiệp vụ chi tiết | Cảnh báo hoặc thông điệp phản hồi hiển thị cho người dùng. |
| **5** | `ui_action` | UI Output | Enum | Render giá mới / Hiển thị lỗi và giữ nguyên giá cũ | Phản ứng hành vi của giao diện thanh toán. |

---

#### Bước 2: Phân hoạch tương đương (Equivalence Partitioning)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để thực hiện phân hoạch tương đương cho tính năng **FR-09: Mã Giảm Giá (Coupon)**, em đã áp dụng quy trình sau:
1.  **Xác định các điều kiện nghiệp vụ:** Phân tích 5 điều kiện (C1 đến C5) cùng với 2 loại coupon (phần trăm và cố định).
2.  **Chia nhóm các lớp tương đương:** Mỗi điều kiện ràng buộc được chia thành một lớp hợp lệ (Valid EC) đại diện cho việc thỏa mãn điều kiện và các lớp không hợp lệ (Invalid EC) đại diện cho các cách vi phạm khác nhau.
3.  **Đánh số liên tục các lớp tương đương (EC):** Đánh số tiếp nối từ lớp `EC21` của tính năng trước đó. Cụ thể, các lớp đầu vào được đánh số từ `EC22` đến `EC41`, và các lớp đầu ra được đánh số từ `EC42` đến `EC52`.
4.  **Lựa chọn giá trị đại diện và thiết kế Test Cases:** Mỗi kịch bản chỉ kiểm tra một nguyên nhân lỗi duy nhất (một Invalid EC) kết hợp với các EC hợp lệ còn lại để tránh che giấu lỗi.

##### 1. Các biến đầu vào (Input Variables)

| Mã lớp | Biến đầu vào | Phân loại lớp | Lớp tương đương | Mô tả / Ý nghĩa kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC22** | `code` | **Valid** | Mã tồn tại trong hệ thống và đang hoạt động | Kiểm tra mã hợp lệ như `SAVE10`, `BIGBUY`, `VIP100`. |
| **EC23** | `code` | **Invalid** | Mã không tồn tại trong hệ thống | Nhập mã sai chính tả hoặc ngẫu nhiên. |
| **EC24** | `code` | **Invalid** | Mã tồn tại nhưng ở trạng thái ngưng hoạt động | Mã có `is_active = 0` trong database. |
| **EC25** | `code` | **Invalid** | Chuỗi rỗng | Bỏ trống không nhập mã giảm giá. |
| **EC26** | `total_amount` | **Valid** | Lớn hơn hoặc bằng ngưỡng tối thiểu (`min_order_amount`) | Thỏa mãn điều kiện C3 về giá trị đơn hàng. |
| **EC27** | `total_amount` | **Invalid** | Nhỏ hơn ngưỡng tối thiểu (`min_order_amount`) | Vi phạm điều kiện C3. |
| **EC28** | `total_amount` | **Invalid** | Số âm hoặc bằng 0 | Giá trị đơn hàng không hợp lệ. |
| **EC29** | `total_amount` | **Invalid** | Không truyền hoặc truyền sai kiểu dữ liệu | Gửi giá trị không phải số nguyên. |
| **EC30** | `user_id` | **Valid** | Trùng khớp với người dùng đang đăng nhập và có thực | Áp dụng mã cho chính chủ tài khoản. |
| **EC31** | `user_id` | **Invalid** | Khác với người dùng được mã hóa trong JWT Token | Cố tình giả mạo hoặc áp dụng mã cho user khác. |
| **EC32** | `user_id` | **Invalid** | Không tồn tại trong CSDL hoặc không hợp lệ | `user_id` âm, bằng 0, hoặc quá lớn. |
| **EC33** | `user_id` | **Invalid** | Chuỗi rỗng hoặc không truyền | Thiếu trường thông tin bắt buộc. |
| **EC34** | `jwt_token` | **Valid** | Token hợp lệ, chưa hết hạn | Người dùng đã đăng nhập hợp lệ (C4). |
| **EC35** | `jwt_token` | **Invalid** | Token không hợp lệ, hết hạn hoặc không truyền | Người dùng chưa đăng nhập hoặc token giả. |
| **EC36** | `coupon_state` | **Valid** | Trạng thái đang hoạt động (`is_active = 1`) | Đáp ứng điều kiện C1 về trạng thái coupon. |
| **EC37** | `coupon_state` | **Invalid** | Trạng thái bị vô hiệu hóa (`is_active = 0`) | Coupon bị tạm khóa/ngưng hoạt động bởi admin. |
| **EC38** | `coupon_expiration` | **Valid** | Ngày hiện tại nhỏ hơn ngày hết hạn (`expired_at`) | Coupon vẫn còn trong hạn sử dụng (C2). |
| **EC39** | `coupon_expiration` | **Invalid** | Ngày hiện tại lớn hơn hoặc bằng ngày hết hạn (`expired_at`) | Coupon đã hết hạn sử dụng. |
| **EC40** | `user_coupon_usage` | **Valid** | Số lần đã dùng < giới hạn tối đa (`max_uses_per_user`) | Người dùng còn lượt sử dụng coupon này (C5). |
| **EC41** | `user_coupon_usage` | **Invalid** | Số lần đã dùng >= giới hạn tối đa (`max_uses_per_user`) | Người dùng đã dùng hết số lần tối đa cho phép. |

##### 2. Các biến đầu ra (Output Variables)

| Mã lớp | Biến đầu ra | Phân loại lớp | Lớp tương đương | Ý nghĩa phản hồi |
| :---: | :--- | :---: | :--- | :--- |
| **EC42** | `http_status_code` | **Valid (Success)** | `200 OK` | Áp dụng mã giảm giá thành công. |
| **EC43** | `http_status_code` | **Invalid (Failure)** | `400 Bad Request` | Lỗi nghiệp vụ (hết hạn, thiếu tiền tối thiểu, hết lượt dùng) hoặc sai định dạng. |
| **EC44** | `http_status_code` | **Invalid (Failure)** | `401 Unauthorized` | Không có quyền hoặc token hết hạn/không hợp lệ. |
| **EC45** | `http_status_code` | **Invalid (Failure)** | `403 Forbidden` | Từ chối áp dụng mã do sai lệch ID người dùng. |
| **EC46** | `http_status_code` | **Invalid (Failure)** | `404 Not Found` | Không tìm thấy mã giảm giá trong hệ thống. |
| **EC47** | `discount_amount` & `final_amount` | **Valid (Success)** | Số tiền giảm và số tiền cuối tính chính xác | Áp dụng đúng công thức chiết khấu phần trăm hoặc giá cố định. |
| **EC48** | `discount_amount` & `final_amount` | **Invalid (Failure)** | `discount_amount = 0`, `final_amount` giữ nguyên giá trị đơn hàng | Không thực hiện giảm trừ tiền. |
| **EC49** | `ui_message` | **Valid (Success)** | Hiển thị thông báo áp dụng mã thành công | Xác nhận mã giảm giá hợp lệ. |
| **EC50** | `ui_message` | **Invalid (Failure)** | Hiển thị thông báo lỗi chi tiết tương ứng | Báo lỗi đúng nguyên nhân (ví dụ: mã hết hạn, chưa đủ ngưỡng tối thiểu,...). |
| **EC51** | `ui_action` | **Valid (Success)** | Cập nhật số tiền hiển thị trên giao diện thanh toán | Giao diện hiển thị giá sau giảm. |
| **EC52** | `ui_action` | **Invalid (Failure)** | Hiển thị thông báo lỗi, giữ nguyên giá cũ | Chặn việc áp dụng giảm giá trên UI. |

---

#### Bước 3: Lựa chọn giá trị đại diện (Selecting Representatives)

##### 1. Bảng giá trị đại diện cho các lớp tương đương

| Mã lớp | Biến tương ứng | Loại lớp | Giá trị đại diện | Ý nghĩa / Ghi chú kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC22** | `code` | Valid | `SAVE10` | Mã giảm giá đang hoạt động và hợp lệ trong CSDL. |
| **EC23** | `code` | Invalid | `NOTFOUND` | Mã giảm giá không tồn tại trong hệ thống. |
| **EC24** | `code` | Invalid | `SAVE10` (nhưng DB có `is_active = 0`) | Mã giảm giá bị ngưng hoạt động. |
| **EC25** | `code` | Invalid | `""` | Bỏ trống mã giảm giá. |
| **EC26** | `total_amount` | Valid | `500000` | Tổng tiền lớn hơn ngưỡng tối thiểu `300000` của mã `SAVE10`. |
| **EC27** | `total_amount` | Invalid | `200000` | Tổng tiền nhỏ hơn ngưỡng tối thiểu `300000` của mã `SAVE10`. |
| **EC28** | `total_amount` | Invalid | `-50000` | Số tiền âm không hợp lệ. |
| **EC29** | `total_amount` | Invalid | `"five_hundred"` (hoặc bỏ trống) | Sai kiểu dữ liệu truyền lên. |
| **EC30** | `user_id` | Valid | `1` | ID của người dùng thực hiện yêu cầu (khớp với JWT token). |
| **EC31** | `user_id` | Invalid | `2` | ID người dùng khác với thông tin trong token của user 1. |
| **EC32** | `user_id` | Invalid | `9999` | ID người dùng không tồn tại trong hệ thống. |
| **EC33** | `user_id` | Invalid | `""` (hoặc bỏ trống) | Bỏ trống trường `user_id`. |
| **EC34** | `jwt_token` | Valid | Token hợp lệ của User 1 | Người dùng đã đăng nhập. |
| **EC35** | `jwt_token` | Invalid | Token sai/hết hạn hoặc thiếu header | Người dùng chưa đăng nhập hoặc phiên làm việc hết hạn. |
| **EC36** | `coupon_state` | Valid | `is_active = 1` | Mã giảm giá đang kích hoạt. |
| **EC37** | `coupon_state` | Invalid | `is_active = 0` | Mã giảm giá bị vô hiệu hóa. |
| **EC38** | `coupon_expiration` | Valid | Hạn dùng `2099-12-31` | Mã giảm giá còn hạn sử dụng. |
| **EC39** | `coupon_expiration` | Invalid | `EXPIRED` (hạn dùng `2020-01-01`) | Mã giảm giá đã hết hạn sử dụng. |
| **EC40** | `user_coupon_usage` | Valid | Đã dùng 0 lần | Còn lượt sử dụng (giới hạn tối đa là 1). |
| **EC41** | `user_coupon_usage` | Invalid | Đã dùng 1 lần | Hết lượt sử dụng (giới hạn tối đa là 1). |

##### 2. Thiết kế tập Test Cases phân hoạch tương đương (Equivalence Partitioning Test Cases)

| Mã TC | Tên Test Case | Lớp tương đương phủ | Điều kiện tiền đề (Preconditions) | code | total_amount | user_id | jwt_token | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Áp dụng thành công coupon loại `percent` | EC22, EC26, EC30, EC34, EC36, EC38, EC40, EC42, EC47, EC49, EC51 | Mã `SAVE10` đang hoạt động, còn hạn, giới hạn 1 lần/người. Người dùng chưa từng sử dụng mã này. | `SAVE10` | `500000` | `1` | Token hợp lệ User 1 | - HTTP Code: `200 OK`<br>- Response: JSON chứa `discount_amount` = 50,000 và `final_amount` = 450,000.<br>- UI: Hiển thị giá đã giảm và thông báo áp dụng thành công. | | |
| **TC02** | Áp dụng thành công coupon loại `fixed` | EC22, EC26, EC30, EC34, EC36, EC38, EC40, EC42, EC47, EC49, EC51 | Mã `BIGBUY` (giảm 50,000đ, tối thiểu 500,000đ) đang hoạt động, còn hạn. Người dùng chưa từng sử dụng mã này. | `BIGBUY` | `600000` | `1` | Token hợp lệ User 1 | - HTTP Code: `200 OK`<br>- Response: JSON chứa `discount_amount` = 50,000 và `final_amount` = 550,000.<br>- UI: Hiển thị giá đã giảm và thông báo áp dụng thành công. | | |
| **TC03** | Áp dụng thất bại - Mã giảm giá không tồn tại | EC23, EC46, EC48, EC50, EC52 | Người dùng đăng nhập bình thường. | `NOTFOUND` | `500000` | `1` | Token hợp lệ User 1 | - HTTP Code: `404 Not Found`<br>- Response: JSON chứa thông báo lỗi không tìm thấy coupon.<br>- UI: Hiển thị thông báo "Mã không tồn tại". | | |
| **TC04** | Áp dụng thất bại - Mã giảm giá bị ngưng hoạt động | EC24, EC37, EC43, EC48, EC50, EC52 | Mã `SAVE10` đã bị chuyển trạng thái hoạt động sang `is_active = 0` trong CSDL. | `SAVE10` | `500000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON chứa thông báo lỗi coupon ngưng hoạt động.<br>- UI: Hiển thị thông báo "Mã giảm giá đang không hoạt động". | | |
| **TC05** | Áp dụng thất bại - Bỏ trống mã giảm giá | EC25, EC43, EC48, EC50, EC52 | Người dùng đăng nhập bình thường. | `""` | `500000` | `1` | Token hợp lệ User 1 | - UI: Hiển thị lỗi hoặc chặn gửi request.<br>- HTTP Code (nếu gửi trực tiếp API): `400 Bad Request` chứa thông báo mã giảm giá là bắt buộc. | | |
| **TC06** | Áp dụng thất bại - Tổng tiền đơn hàng chưa đạt ngưỡng tối thiểu | EC27, EC43, EC48, EC50, EC52 | Mã `SAVE10` yêu cầu tối thiểu 300,000đ. Người dùng chưa dùng mã này. | `SAVE10` | `200000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON chứa thông báo lỗi đơn hàng không đủ giá trị tối thiểu.<br>- UI: Hiển thị thông báo "Giá trị đơn hàng tối thiểu chưa đạt". | | |
| **TC07** | Áp dụng thất bại - Số tiền đơn hàng âm | EC28, EC43, EC48, EC50, EC52 | Người dùng đăng nhập bình thường. | `SAVE10` | `-50000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON chứa thông báo lỗi số tiền không hợp lệ.<br>- UI: Không cho phép gửi hoặc hiển thị lỗi số tiền không hợp lệ. | | |
| **TC08** | Áp dụng thất bại - Định dạng số tiền sai kiểu dữ liệu | EC29, EC43, EC48, EC50, EC52 | Người dùng đăng nhập bình thường. | `SAVE10` | `"five_hundred"` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request` hoặc `422 Unprocessable Entity`<br>- Response: JSON chứa thông báo lỗi định dạng dữ liệu.<br>- UI: Chặn gửi hoặc báo lỗi nhập liệu. | | |
| **TC09** | Áp dụng thất bại - Người dùng giả mạo `user_id` trong body | EC31, EC45, EC48, EC50, EC52 | Gửi trực tiếp qua backend API, thay thế `user_id` trong body khác với ID lưu trong JWT Token. | `SAVE10` | `500000` | `2` | Token hợp lệ User 1 | - HTTP Code: `403 Forbidden`<br>- Response: JSON thông báo từ chối quyền truy cập hoặc lỗi bảo mật.<br>- UI: Hiển thị lỗi tương ứng hoặc không cho phép áp dụng. | | |
| **TC10** | Áp dụng thất bại - `user_id` không tồn tại | EC32, EC43, EC48, EC50, EC52 | Người dùng đăng nhập bình thường nhưng truyền ID không có thực. | `SAVE10` | `500000` | `9999` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request` hoặc `404 Not Found`<br>- Response: JSON báo người dùng không tồn tại. | | |
| **TC11** | Áp dụng thất bại - Chưa đăng nhập hoặc token hết hạn | EC35, EC44, EC48, EC50, EC52 | Người dùng chưa đăng nhập hoặc token đã bị sửa đổi/hết hạn. | `SAVE10` | `500000` | `1` | Token không hợp lệ hoặc thiếu | - HTTP Code: `401 Unauthorized`<br>- Response: JSON chứa thông báo lỗi chưa xác thực.<br>- UI: Hiển thị yêu cầu đăng nhập hoặc chuyển hướng về trang login. | | |
| **TC12** | Áp dụng thất bại - Mã giảm giá hết hạn | EC39, EC43, EC48, EC50, EC52 | Mã `EXPIRED` có hạn dùng `2020-01-01` (đã hết hạn so với hiện tại). | `EXPIRED` | `200000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON chứa thông báo mã đã hết hạn.<br>- UI: Hiển thị thông báo "Mã giảm giá đã hết hạn sử dụng". | | |
| **TC13** | Áp dụng thất bại - Người dùng đã dùng hết lượt cho phép | EC41, EC43, EC48, EC50, EC52 | Mã `SAVE10` giới hạn 1 lần sử dụng/người. Người dùng 1 đã có 1 đơn hàng trước đó áp dụng mã này thành công. | `SAVE10` | `500000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON chứa thông báo người dùng đã dùng hết lượt.<br>- UI: Hiển thị thông báo "Bạn đã sử dụng hết lượt cho phép đối với mã này". | | |
| **TC14** | Kiểm thử Race Condition - Đồng thời áp dụng mã giới hạn 1 lần | EC41, EC43, EC48 (concurrency) | Mã `SAVE10` giới hạn 1 lần. Người dùng chưa từng sử dụng. | `SAVE10` | `500000` | `1` | Token hợp lệ User 1 | - Gửi đồng thời 2 request áp dụng mã trong cùng 1ms.<br>- Chỉ có đúng 1 request được chấp nhận (`200 OK`), request còn lại bị từ chối (`400 Bad Request`). | | |

---

#### Bước 4: Phân tích giá trị biên (Boundary Value Analysis - BVA)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các giá trị biên nhạy cảm của tính năng **FR-09: Mã Giảm Giá (Coupon)**, em đã thực hiện phân tích theo các bước sau:
1.  **Xác định các biến có tính thứ tự hoặc khoảng số:**
    - `total_amount` (Tổng tiền đơn hàng): Có các ngưỡng biên nhạy cảm so với ngưỡng tối thiểu `min_order_amount` của từng mã giảm giá.
    - `user_coupon_usage` (Số lần người dùng đã sử dụng mã): Có giới hạn tối đa là `max_uses_per_user`.
2.  **Xác định các điểm biên (Boundaries) cho từng biến:**
    - So với mã `SAVE10` có `min_order_amount = 300,000` VND:
      - Biên dưới hợp lệ: $LB = 300,000$ VND.
      - Sát trên biên dưới hợp lệ: $LB+1 = 300,001$ VND.
      - Sát dưới biên dưới không hợp lệ: $LB-1 = 299,999$ VND.
    - So với mã `VIP100` có `max_uses_per_user = 2`:
      - Số lần đã dùng tối đa hợp lệ để vẫn còn dùng được tiếp: $UB = 1$ lần (vì số lần dùng tiếp theo sẽ là lần thứ 2, đạt mức tối đa).
      - Số lần đã dùng bắt đầu không còn lượt: $UB+1 = 2$ lần (đã dùng hết lượt, không thể dùng tiếp).
3.  **Thiết kế các kịch bản kiểm thử biên tương ứng.**

##### 1. Phân tích giá trị biên của các biến số/khoảng số

*   **Biến `total_amount` so với ngưỡng tối thiểu `min_order_amount = 300,000` VND của mã `SAVE10`:**
    - $LB = 300,000$ VND: Tổng tiền tối thiểu vừa đủ để áp dụng mã giảm giá.
    - $LB+1 = 300,001$ VND: Tổng tiền lớn hơn ngưỡng tối thiểu một đơn vị nhỏ nhất.
    - $LB-1 = 299,999$ VND: Tổng tiền nhỏ hơn ngưỡng tối thiểu một đơn vị nhỏ nhất (không đủ điều kiện).

*   **Biến `user_coupon_usage` so với giới hạn `max_uses_per_user = 2` của mã `VIP100`:**
    - $usage = 0$: Người dùng chưa từng sử dụng, còn nguyên 2 lượt.
    - $usage = 1$ (Điểm biên $UB$ để còn lượt): Người dùng đã dùng 1 lần, vẫn còn 1 lượt nữa.
    - $usage = 2$ (Điểm biên $UB+1$ để hết lượt): Người dùng đã dùng 2 lần, không còn lượt nào để sử dụng.

##### 2. Thiết kế tập Test Cases giá trị biên (Boundary Value Test Cases)

| Mã TC | Tên Test Case | Biên kiểm thử | Điều kiện tiền đề (Preconditions) | code | total_amount | user_id | jwt_token | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-BVA-01** | Áp dụng khi tổng tiền bằng đúng ngưỡng tối thiểu | $total\_amount = LB$ ($300,000$) của mã `SAVE10` | Mã `SAVE10` hoạt động, còn hạn. Người dùng chưa từng dùng mã. | `SAVE10` | `300000` | `1` | Token hợp lệ User 1 | - HTTP Code: `200 OK`<br>- Response: JSON chứa `discount_amount` = 30,000 và `final_amount` = 270,000.<br>- UI: Hiển thị giá mới đã áp dụng. | | |
| **TC-BVA-02** | Áp dụng khi tổng tiền sát dưới ngưỡng tối thiểu | $total\_amount = LB-1$ ($299,999$) của mã `SAVE10` | Mã `SAVE10` hoạt động, còn hạn. Người dùng chưa từng dùng mã. | `SAVE10` | `299999` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON báo lỗi trị giá đơn hàng tối thiểu chưa đạt.<br>- UI: Báo lỗi không đủ điều kiện đơn hàng tối thiểu. | | |
| **TC-BVA-03** | Áp dụng khi tổng tiền sát trên ngưỡng tối thiểu | $total\_amount = LB+1$ ($300,001$) của mã `SAVE10` | Mã `SAVE10` hoạt động, còn hạn. Người dùng chưa từng dùng mã. | `SAVE10` | `300001` | `1` | Token hợp lệ User 1 | - HTTP Code: `200 OK`<br>- Response: JSON chứa `discount_amount` = 30,000 và `final_amount` = 270,001.<br>- UI: Hiển thị giá mới đã áp dụng. | | |
| **TC-BVA-04** | Áp dụng mã khi người dùng đã sử dụng 1 lần (vẫn còn lượt) | $usage = 1$ của mã `VIP100` (giới hạn tối đa 2 lần) | Mã `VIP100` hoạt động, còn hạn. Người dùng đã từng dùng mã này 1 lần. | `VIP100` | `300000` | `1` | Token hợp lệ User 1 | - HTTP Code: `200 OK`<br>- Response: JSON chứa `discount_amount` = 100,000 và `final_amount` = 200,000.<br>- UI: Hiển thị giảm giá thành công lần 2. | | |
| **TC-BVA-05** | Áp dụng mã khi người dùng đã sử dụng 2 lần (hết lượt) | $usage = 2$ của mã `VIP100` (giới hạn tối đa 2 lần) | Mã `VIP100` hoạt động, còn hạn. Người dùng đã từng dùng mã này 2 lần. | `VIP100` | `300000` | `1` | Token hợp lệ User 1 | - HTTP Code: `400 Bad Request`<br>- Response: JSON báo lỗi đã dùng hết số lần tối đa.<br>- UI: Hiển thị lỗi đã hết lượt dùng. | | |

---

#### Bước 5: Phân tích khoảng trống AI (AI Gap Analysis)

##### 1. Các kịch bản/lỗi kiểm thử mà AI đã bỏ sót
*   **Race Condition khi gửi đồng thời nhiều request áp dụng mã (Double Apply):** AI khi đọc tài liệu tĩnh thường bỏ qua kịch bản người dùng nhấp đúp nhanh hoặc dùng script gửi đồng thời nhiều yêu cầu áp dụng mã giảm giá (ví dụ gửi 2 request trong cùng 1ms cho mã có giới hạn 1 lần sử dụng). Nếu hệ thống thiếu cơ chế khóa dòng hoặc transaction rollback thích hợp ở backend, người dùng có thể lách luật để được giảm giá nhiều lần.
*   **Bypass kiểm tra ngưỡng tối thiểu tại bước tạo đơn hàng (Checkout bypass):** Một lỗi logic nghiệp vụ nghiêm trọng mà AI ít khi nghĩ tới là: Người dùng thêm sản phẩm vào giỏ để tổng tiền đạt 300,000 VND, áp dụng mã `SAVE10` thành công. Sau đó, họ xóa bớt sản phẩm trong giỏ hàng để tổng tiền giảm xuống còn 100,000 VND rồi tiến hành tạo đơn hàng. Nếu backend không re-validate lại các điều kiện mã coupon tại thời điểm tạo đơn hàng (Order Creation API), mã giảm giá vẫn được áp dụng trái phép.
*   **Bất đồng bộ múi giờ (Timezone discrepancies):** AI thường không thiết kế các test case cho sự chênh lệch múi giờ giữa client và server. Ví dụ: coupon hết hạn vào lúc `2026-07-05 23:59:59` theo múi giờ GMT+7, nhưng server chạy GMT+0 hoặc client điều chỉnh giờ hệ thống để cố tình áp dụng mã đã hết hạn.

##### 2. Các sự nhầm lẫn, ảo giác và thiếu sót của AI trong quá trình thiết kế (AI Critique)
*   **Nhầm lẫn System State thành Direct Input:** AI có xu hướng liệt kê `user_coupon_usage` (số lần đã dùng mã của user) hay `coupon_expiration` (trạng thái hết hạn) vào cột Input của bảng test case, yêu cầu người dùng phải truyền các giá trị này trong request body. Trên thực tế, đây là trạng thái hệ thống cần truy vấn từ DB, do đó bắt buộc phải nằm ở cột Preconditions.
*   **Lỗi ảo giác về kiểm chứng trực tiếp Database (Grey-box Bias):** AI đề xuất Expected Output chứa việc kiểm tra dữ liệu trực tiếp trong CSDL (ví dụ: "Kiểm tra bảng `coupon_usages` có thêm dòng mới"). Điều này vi phạm nguyên tắc kiểm thử hộp đen tĩnh khi chỉ được phép quan sát hành vi thông qua HTTP response hoặc UI.
*   **Xu hướng thiên vị cài đặt cụ thể (Implementation Bias):** AI định nghĩa chi tiết các chuỗi thông báo lỗi JSON (ví dụ: `{"status": "error", "message": "Min amount not reached"}`) vào Expected Output thay vì mô tả hành vi nghiệp vụ ở mức tổng quát. Điều này khiến bộ test case dễ bị lỗi thời nếu định dạng API thay thế chuỗi thông báo lỗi.

##### 3. Giải thích nguyên nhân AI gặp các hạn chế trên
*   **Thiếu khả năng thực thi và kiểm nghiệm động:** AI chỉ làm việc trên tài liệu đặc tả dạng văn bản và suy luận tĩnh. Do đó, AI không thể tự động nhận thức được các vấn đề phát sinh trong môi trường chạy thực tế như độ trễ mạng, xử lý đa luồng bất đồng bộ (concurrency), hay xung đột tranh chấp ghi dữ liệu.
*   **Thiếu tư duy tấn công bảo mật (Security Threat Modeling):** AI thường chỉ tập trung tối ưu hóa các luồng đi bình thường (Happy Path) và các lỗi nhập liệu đơn giản trên form, mà không chủ động đặt giả thuyết về việc người dùng cố tình thay đổi tham số request gửi trực tiếp qua Postman/cURL để qua mặt hệ thống.





