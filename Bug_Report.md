# Báo cáo Lỗi (Bug Report) - HW02

## Thông tin sinh viên
- **Họ và tên:** Lê Mai Hoài Bảo
- **MSSV:** 23127326

---

## 1. Danh sách lỗi tổng hợp (Bug List)

Dưới đây là danh sách các lỗi phát hiện được đối với tính năng **FR-02: Đăng nhập & Khóa tài khoản** dựa trên việc chạy thực tế và đối chiếu hành vi của hệ thống (ở mức Giao diện UI và API phản hồi) với tài liệu đặc tả yêu cầu (Kiểm thử hộp đen - Black-box testing):

| Mã Bug | Tên lỗi (Bug Name) | Mã TC phát hiện | Mô tả hành vi lỗi quan sát | Độ nghiêm trọng (Severity) | Trạng thái |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **BUG-FR02-01** | Tài khoản bị tạm khóa sớm sau 2 lần đăng nhập sai liên tiếp (lần thứ 3 bị chặn) | `TC05`, `TC-BVA-02`, `TC-BVA-03` | Tài khoản bị khóa ngay sau 2 lần đăng nhập sai liên tiếp (lần thứ 3 bị chặn 403), trong khi đặc tả yêu cầu sai từ 3 lần liên tiếp mới khóa (lần thứ 4 mới bị chặn 403). | **High** | Open |
| **BUG-FR02-02** | Tài khoản không tự động mở khóa sau 30 giây như đặc tả | `TC-BVA-07` | Khi tài khoản bị tạm khóa, tài khoản vẫn tiếp tục bị khóa và không tự động mở khóa sau thời hạn 30 giây như quy định của đặc tả. | **High** | Open |
| **BUG-FR02-03** | API đăng nhập thành công trả về trường mật khẩu dưới dạng văn bản rõ (plaintext) | `TC01`, `TC-BVA-01` | Payload phản hồi của API khi đăng nhập thành công chứa thuộc tính mật khẩu người dùng, gây nguy cơ rò rỉ dữ liệu nhạy cảm. | **Critical** | Open |
| **BUG-FR02-04** | Trường Email trên giao diện Web và Admin không kiểm tra định dạng HTML5 ở client | `TC03` | Trường Email đăng nhập sử dụng thẻ input có type="text" thay vì type="email", cho phép gửi dữ liệu email sai định dạng lên backend. | **High** | Open |
| **BUG-FR02-05** | Hệ thống không vô hiệu hóa phiên làm việc (JWT Token) cũ khi tài khoản bị tạm khóa | `TC09` | JWT Token cũ đã cấp từ trước vẫn có quyền gọi API lấy dữ liệu nhạy cảm bình thường ngay cả khi tài khoản đã bị khóa ở session khác. | **Critical** | Open |
| **BUG-FR02-06** | Backend API đăng nhập không kiểm tra định dạng email trước khi truy vấn cơ sở dữ liệu | `TC10` | API `/api/login` cho phép gửi định dạng email sai bất kỳ lên server và thực hiện câu lệnh SQL SELECT trực tiếp mà không chặn sớm. | **Medium** | Open |
| **BUG-FR02-07** | Lỗ hổng Race Condition cho phép gửi song song nhiều request vượt cơ chế khóa | `TC08` | Khi gửi 5 request đăng nhập sai đồng thời qua API trong 1ms, tất cả đều được xử lý thành công (trả về 401) thay vì bị chặn từ lần 3. | **High** | Open |

---

## 2. Chi tiết các lỗi (Detailed Bug Descriptions)

### BUG-FR02-01: Tài khoản bị tạm khóa sớm sau 2 lần đăng nhập sai liên tiếp (lần thứ 3 bị chặn)

*   **Mô tả lỗi:** Theo đặc tả yêu cầu, tài khoản chỉ bị tạm khóa khi đăng nhập sai từ 3 lần trở lên liên tiếp (tức lần nhập sai thứ 3 vẫn trả về lỗi đăng nhập thường, và lần đăng nhập thứ 4 mới bị chặn). Tuy nhiên trên thực tế, người dùng bị chặn đăng nhập ngay từ lần đăng nhập thứ 3 (chỉ mới đăng nhập sai 2 lần trước đó).
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Nhập đúng email đăng ký và mật khẩu **sai**, bấm nút Đăng nhập $\rightarrow$ Hệ thống báo lỗi *"Invalid email or password"*. (Lần sai thứ 1)
    2.  Nhập đúng email đăng ký và mật khẩu **sai**, bấm nút Đăng nhập $\rightarrow$ Hệ thống báo lỗi *"Invalid email or password"*. (Lần sai thứ 2)
    3.  Nhập đúng email đăng ký và mật khẩu **đúng/sai**, bấm nút Đăng nhập $\rightarrow$ Hệ thống lập tức trả về lỗi *"Tài khoản đã bị khóa. Vui lòng thử lại sau."* và mã HTTP 403. (Lần thứ 3)
*   **Kết quả mong đợi (Expected Output):** 
    *   Lần thứ 1 và 2: Trả về mã lỗi đăng nhập không chính xác `401 Unauthorized`.
    *   Lần thứ 3: Tiếp tục trả về mã lỗi đăng nhập không chính xác `401 Unauthorized` (vì đây là lần sai thứ 3, chưa bị chặn trước đó).
    *   Lần thứ 4: Hệ thống mới chặn đăng nhập với mã `403 Forbidden` do tài khoản đã bị tạm khóa.
*   **Kết quả thực tế (Actual Output):** Tài khoản đã bị khóa ngay sau lần nhập sai thứ 2. Do đó, đến lần thứ 3 (khi bấm Đăng nhập), hệ thống đã chặn ngay lập tức và trả về mã lỗi `403 Forbidden` cùng thông báo khóa tài khoản.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #1](https://github.com/HCMUS-software-testing/HW02/issues/1)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-01](screenshots/BUG-FR02-01.png)

---
 
### BUG-FR02-02: Tài khoản không tự động mở khóa sau 30 giây như đặc tả
 
*   **Mô tả lỗi:** Đặc tả quy định trong môi trường demo, thời gian tạm khóa tài khoản khi nhập sai là 30 giây. Nhưng khi bị khóa, tài khoản vẫn tiếp tục bị giữ ở trạng thái khóa và không tự động mở lại sau 30 giây.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Thực hiện đăng nhập sai liên tiếp cho đến khi tài khoản kích hoạt trạng thái bị khóa.
    2.  Chờ 40 giây (lớn hơn thời gian khóa 30 giây quy định).
    3.  Nhập địa chỉ email và mật khẩu **chính xác**, bấm nút Đăng nhập.
*   **Kết quả mong đợi (Expected Output):** Đăng nhập thành công và nhận JWT Token phía client vì đã hết thời gian khóa 30 giây theo đặc tả.
*   **Kết quả thực tế (Actual Output):** Đăng nhập thất bại, hệ thống vẫn trả về thông báo lỗi báo tài khoản đang bị khóa (tài khoản không tự động mở khóa sau 30 giây).
*   **Đường dẫn GitHub Issue:** [GitHub Issue #2](https://github.com/HCMUS-software-testing/HW02/issues/2)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-02](screenshots/BUG-FR02-02-1.png) ![Screenshot BUG-FR02-02](screenshots/BUG-FR02-02-2.png)

---

### BUG-FR02-03: API đăng nhập thành công trả về trường mật khẩu dưới dạng văn bản rõ (plaintext)

*   **Mô tả lỗi:** Khi người dùng gửi yêu cầu đăng nhập thành công, dữ liệu phản hồi (JSON response) trả về từ backend API chứa cả thông tin mật khẩu của tài khoản ở định dạng văn bản thô rõ ràng, vi phạm nguyên tắc an toàn thông tin cơ bản.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Sử dụng công cụ Postman/cURL hoặc kiểm tra tab Network trên trình duyệt, gửi request POST tới `/api/login` với email và mật khẩu chính xác.
    2.  Quan sát cấu trúc dữ liệu JSON phản hồi ở body của response `200 OK`.
*   **Kết quả mong đợi (Expected Output):** JSON phản hồi chứa JWT token và thông tin cơ bản của user như `id`, `name`, `email`, `role`. Tuyệt đối không được chứa trường `password` hoặc `reset_token`.
*   **Kết quả thực tế (Actual Output):** Dữ liệu JSON phản hồi chứa thuộc tính `"password": "Test1234!"` hiển thị rõ ràng mật khẩu plaintext của tài khoản.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #3](https://github.com/HCMUS-software-testing/HW02/issues/3)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-03](screenshots/BUG-FR02-03.png)

---

### BUG-FR02-04: Trường Email trên giao diện Web và Admin không kiểm tra định dạng HTML5 ở client

*   **Mô tả lỗi:** Theo đặc tả nghiệp vụ, trường email của biểu mẫu đăng nhập bắt buộc phải dùng `type="email"` để thực hiện kiểm tra (validate) định dạng email theo chuẩn HTML5. Tuy nhiên, trên giao diện Web và Admin, trường Email sử dụng `type="text"`, cho phép người dùng bấm gửi dữ liệu sai định dạng (thiếu ký tự `@`, tên miền...) lên server mà không bị chặn lại ở trình duyệt.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Mở màn hình Đăng nhập của Web (hoặc Admin).
    2.  Nhập địa chỉ email sai định dạng: `invalid-email.com` vào trường Email.
    3.  Nhập mật khẩu bất kỳ và nhấn Đăng nhập.
*   **Kết quả mong đợi (Expected Output):** Trình duyệt tự động chặn lại và hiển thị cảnh báo lỗi định dạng của trường email (HTML5 validation), không gửi request lên backend API.
*   **Kết quả thực tế (Actual Output):** Form đăng nhập cho phép submit thành công, gửi thẳng request POST `/api/login` có email sai định dạng lên backend và nhận về phản hồi lỗi `401 Unauthorized` từ server.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #4](https://github.com/HCMUS-software-testing/HW02/issues/4)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-04](screenshots/BUG-FR02-04.png)

---

### BUG-FR02-05: Hệ thống không vô hiệu hóa phiên làm việc (JWT Token) cũ khi tài khoản bị tạm khóa

*   **Mô tả lỗi:** Khi tài khoản bị tạm khóa (do có các hoạt động đăng nhập sai liên tiếp ở session khác), hệ thống không thực hiện thu hồi hoặc vô hiệu hóa các JWT Token cũ đã cấp từ trước của tài khoản đó. Người dùng/kẻ tấn công đang nắm giữ token cũ này vẫn có thể thực hiện thành công các truy vấn có xác thực để lấy thông tin nhạy cảm.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Đăng ký tài khoản mới và thực hiện đăng nhập thành công ở Thiết bị A để lấy JWT Token hợp lệ.
    2.  Ở Thiết bị B, thực hiện đăng nhập sai 2 lần liên tiếp để đưa tài khoản vào trạng thái tạm khóa.
    3.  Ở Thiết bị A, sử dụng JWT Token đã lấy ở bước 1 để gửi request `GET /api/users/me` (đây là endpoint yêu cầu xác thực).
*   **Kết quả mong đợi (Expected Output):** Server từ chối request và trả về mã lỗi `401 Unauthorized` hoặc `403 Forbidden` vì tài khoản tương ứng đang bị khóa.
*   **Kết quả thực tế (Actual Output):** Backend API vẫn trả về `200 OK` kèm theo toàn bộ thông tin cá nhân và mật khẩu chưa mã hóa của tài khoản, bất chấp việc tài khoản này đang bị khóa trong CSDL.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #5](https://github.com/HCMUS-software-testing/HW02/issues/5)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-05](screenshots/BUG-FR02-05-1.png) ![Screenshot BUG-FR02-05](screenshots/BUG-FR02-05-2.png)

---

### BUG-FR02-06: Backend API đăng nhập không kiểm tra định dạng email trước khi truy vấn cơ sở dữ liệu

*   **Mô tả lỗi:** Endpoint `/api/login` ở backend không kiểm tra tính hợp lệ của định dạng email đầu vào mà trực tiếp sử dụng chuỗi nhận được để thực hiện câu lệnh SQL tìm kiếm tài khoản. Điều này làm lãng phí tài nguyên xử lý của cơ sở dữ liệu đối với các truy vấn rác hoặc sai định dạng.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Dùng Postman hoặc cURL gửi trực tiếp request POST tới `http://localhost:3000/api/login` với body: `{"email": "notanemail", "password": "Test1234!"}`.
    2.  Kiểm tra response trả về từ server.
*   **Kết quả mong đợi (Expected Output):** Server từ chối nhanh và trả về mã lỗi `400 Bad Request` hoặc `401 Unauthorized` kèm mô tả lỗi email sai định dạng, không cần thực hiện truy vấn xuống CSDL SQLite.
*   **Kết quả thực tế (Actual Output):** Server không validate định dạng email, vẫn cho chạy câu lệnh truy vấn SQL SELECT để tìm chuỗi `'notanemail'`, sau đó trả về lỗi đăng nhập sai thông tin chung `401 Unauthorized`.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #6](https://github.com/HCMUS-software-testing/HW02/issues/6)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-06](screenshots/BUG-FR02-06.png)

---

### BUG-FR02-07: Lỗ hổng Race Condition cho phép gửi song song nhiều request vượt cơ chế khóa

*   **Mô tả lỗi:** Do backend không thực hiện cơ chế khóa bản ghi (row locking) hoặc xử lý giao dịch đồng thời (atomic transactions) khi kiểm tra và cập nhật trạng thái đăng nhập sai của tài khoản trong CSDL SQLite. Người dùng/kẻ tấn công có thể gửi song song nhiều request đăng nhập cùng lúc để bypass (vượt qua) bộ lọc kiểm tra khóa.
*   **Các bước tái hiện (Steps to Reproduce):**
    1.  Sử dụng kịch bản Node.js `scratch_test_race.js` gửi đồng thời 5 request đăng nhập sai mật khẩu của cùng 1 tài khoản trong cùng 1 mili giây.
    2.  Quan sát mã phản hồi HTTP trả về từ server cho cả 5 request.
*   **Kết quả mong đợi (Expected Output):** Hệ thống chỉ cho phép tối đa 2 request đầu tiên trả về `401 Unauthorized` (vì ngưỡng khóa là 3 lần sai). Các request thứ 3, 4, 5 phải bị chặn và trả về `403 Forbidden`.
*   **Kết quả thực tế (Actual Output):** Cả 5 request song song đều trả về mã lỗi `401 Unauthorized` cùng lúc và không có request nào bị chặn bằng mã `403 Forbidden` trong loạt gửi song song đó. Tài khoản chỉ bị khóa sau khi loạt request này đã thực thi xong.
*   **Đường dẫn GitHub Issue:** [GitHub Issue #7](https://github.com/HCMUS-software-testing/HW02/issues/7)
*   **Ảnh chụp minh họa (Bug Screenshot):** ![Screenshot BUG-FR02-07](screenshots/BUG-FR02-07-1.png) ![Screenshot BUG-FR02-07](screenshots/BUG-FR02-07-2.png)

