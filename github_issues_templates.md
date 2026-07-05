# Mẫu GitHub Issues - HW02
Dưới đây là các tiêu đề và nội dung Markdown đã được biên soạn sẵn cho cả 7 lỗi (Bugs) phát hiện được. Bạn chỉ cần sao chép (copy) và dán (paste) trực tiếp vào trang tạo Issue mới trên GitHub của nhóm bạn, sau đó kéo thả hình ảnh chụp màn hình tương ứng vào mục `[Ảnh chụp minh họa]`.
---
## ISSUE #1: BUG-FR02-01
*   **Tiêu đề Issue (Title):** `[BUG-FR02-01] Tài khoản bị tạm khóa sớm sau 2 lần đăng nhập sai liên tiếp (lần thứ 3 bị chặn)`
*   **Nhãn (Labels):** `bug`, `high-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Theo đặc tả yêu cầu ở tính năng `FR-02`, tài khoản chỉ bị tạm khóa khi đăng nhập sai từ 3 lần trở lên liên tiếp (lần thứ 3 nhập sai vẫn trả về thông báo lỗi sai mật khẩu thông thường `401`, lần đăng nhập thứ 4 mới bị chặn bằng mã `403`).
Tuy nhiên, trên thực tế, người dùng bị chặn đăng nhập ngay từ lần đăng nhập thứ 3 (chỉ mới đăng nhập sai 2 lần trước đó).
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Truy cập màn hình đăng nhập hoặc sử dụng công cụ gửi request API đăng nhập.
2. **Lần 1:** Nhập đúng email đăng ký, mật khẩu **SAI** -> Nhấp Đăng nhập (Nhận mã HTTP `401 Unauthorized`).
3. **Lần 2:** Nhập đúng email đăng ký, mật khẩu **SAI** -> Nhấp Đăng nhập (Nhận mã HTTP `401 Unauthorized`).
4. **Lần 3:** Nhập đúng email đăng ký, mật khẩu **ĐÚNG** (hoặc SAI) -> Nhấp Đăng nhập.
### 🎯 Kết quả mong đợi (Expected Output)
* Lần 1 và 2: Trả về mã lỗi đăng nhập không chính xác `401 Unauthorized`.
* Lần 3: Tiếp tục trả về mã lỗi đăng nhập không chính xác `401 Unauthorized` (vì đây là lần sai thứ 3, chưa bị chặn trước đó).
* Lần 4: Hệ thống mới chặn đăng nhập với mã `403 Forbidden` do tài khoản đã bị tạm khóa.
### 🚫 Kết quả thực tế (Actual Output)
Tài khoản bị khóa ngay sau lần nhập sai thứ 2. Do đó ở lần thứ 3, hệ thống lập tức chặn đăng nhập và trả về mã lỗi `403 Forbidden` kèm thông báo: `{"error": "Tài khoản đã bị khóa. Vui lòng thử lại sau."}`.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #2: BUG-FR02-02
*   **Tiêu đề Issue (Title):** `[BUG-FR02-02] Tài khoản không tự động mở khóa sau 30 giây như đặc tả`
*   **Nhãn (Labels):** `bug`, `high-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Đặc tả quy định trong môi trường demo, thời gian tạm khóa tài khoản khi nhập sai là 30 giây. Nhưng khi bị khóa, tài khoản vẫn tiếp tục bị giữ ở trạng thái khóa và không tự động mở lại sau 30 giây.
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Thực hiện đăng nhập sai liên tiếp cho đến khi tài khoản kích hoạt trạng thái bị khóa.
2. Chờ 40 giây (lớn hơn thời gian khóa 30 giây quy định).
3. Nhập địa chỉ email và mật khẩu **chính xác**, bấm nút Đăng nhập.
### 🎯 Kết quả mong đợi (Expected Output)
Đăng nhập thành công và nhận JWT Token phía client vì đã hết thời gian khóa 30 giây theo đặc tả.
### 🚫 Kết quả thực tế (Actual Output)
Đăng nhập thất bại, hệ thống vẫn trả về thông báo lỗi báo tài khoản đang bị khóa (tài khoản không tự động mở khóa sau 30 giây). Tester phải chờ 3 phút (180 giây) mới có thể đăng nhập lại thành công.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #3: BUG-FR02-03
*   **Tiêu đề Issue (Title):** `[BUG-FR02-03] API đăng nhập thành công trả về trường mật khẩu dưới dạng văn bản rõ (plaintext)`
*   **Nhãn (Labels):** `bug`, `security`, `critical-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Khi người dùng gửi yêu cầu đăng nhập thành công, dữ liệu phản hồi (JSON response) trả về từ backend API chứa cả thông tin mật khẩu của tài khoản ở định dạng văn bản thô rõ ràng, vi phạm nghiêm trọng nguyên tắc an toàn thông tin (lộ lọt thông tin nhạy cảm).
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Sử dụng công cụ Postman/cURL hoặc kiểm tra tab Network trên trình duyệt.
2. Gửi request POST tới `/api/login` với email và mật khẩu chính xác.
3. Quan sát cấu trúc dữ liệu JSON phản hồi ở body của response `200 OK`.
### 🎯 Kết quả mong đợi (Expected Output)
JSON phản hồi chứa JWT token và thông tin cơ bản của user như `id`, `name`, `email`, `role`. Tuyệt đối không được chứa trường `password` hoặc `reset_token`.
### 🚫 Kết quả thực tế (Actual Output)
Dữ liệu JSON phản hồi chứa thuộc tính `"password": "Test1234!"` hiển thị rõ mật khẩu plaintext của tài khoản.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #4: BUG-FR02-04
*   **Tiêu đề Issue (Title):** `[BUG-FR02-04] Trường Email trên giao diện Web và Admin không kiểm tra định dạng HTML5 ở client`
*   **Nhãn (Labels):** `bug`, `high-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Theo đặc tả nghiệp vụ, trường email của biểu mẫu đăng nhập bắt buộc phải dùng `type="email"` để thực hiện kiểm tra (validate) định dạng email theo chuẩn HTML5. Tuy nhiên trên giao diện Web và Admin, trường Email sử dụng `type="text"`, cho phép người dùng bấm gửi dữ liệu sai định dạng lên server mà không bị chặn lại ở trình duyệt.
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Mở màn hình Đăng nhập của Web (hoặc Admin).
2. Nhập địa chỉ email sai định dạng: `invalid-email.com` vào trường Email.
3. Nhập mật khẩu bất kỳ và nhấn Đăng nhập.
### 🎯 Kết quả mong đợi (Expected Output)
Trình duyệt tự động chặn lại và hiển thị cảnh báo lỗi định dạng của trường email (HTML5 validation), không gửi request lên backend API.
### 🚫 Kết quả thực tế (Actual Output)
Form đăng nhập cho phép submit thành công, gửi thẳng request POST `/api/login` có email sai định dạng lên backend và nhận về phản hồi lỗi `401 Unauthorized` từ server.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Frontend/Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #5: BUG-FR02-05
*   **Tiêu đề Issue (Title):** `[BUG-FR02-05] Hệ thống không vô hiệu hóa phiên làm việc (JWT Token) cũ khi tài khoản bị tạm khóa`
*   **Nhãn (Labels):** `bug`, `security`, `critical-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Khi tài khoản bị tạm khóa (do có các hoạt động đăng nhập sai liên tiếp ở session khác), hệ thống không thực hiện thu hồi hoặc vô hiệu hóa các JWT Token cũ đã cấp từ trước của tài khoản đó. Người dùng/kẻ tấn công đang nắm giữ token cũ này vẫn có thể thực hiện thành công các truy vấn có xác thực để lấy thông tin nhạy cảm.
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Đăng ký tài khoản mới và thực hiện đăng nhập thành công ở Thiết bị A để lấy JWT Token hợp lệ.
2. Ở Thiết bị B, thực hiện đăng nhập sai 2 lần liên tiếp để đưa tài khoản vào trạng thái tạm khóa.
3. Ở Thiết bị A, sử dụng JWT Token đã lấy ở bước 1 để gửi request `GET /api/users/me` (endpoint yêu cầu xác thực).
### 🎯 Kết quả mong đợi (Expected Output)
Server từ chối request và trả về mã lỗi `401 Unauthorized` hoặc `403 Forbidden` vì tài khoản tương ứng đang bị khóa.
### 🚫 Kết quả thực tế (Actual Output)
Backend API vẫn trả về `200 OK` kèm theo toàn bộ thông tin cá nhân và mật khẩu chưa mã hóa của tài khoản, bất chấp việc tài khoản này đang bị khóa trong CSDL.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #6: BUG-FR02-06
*   **Tiêu đề Issue (Title):** `[BUG-FR02-06] Backend API đăng nhập không kiểm tra định dạng email trước khi truy vấn cơ sở dữ liệu`
*   **Nhãn (Labels):** `bug`, `medium-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Endpoint `/api/login` ở backend không kiểm tra tính hợp lệ của định dạng email đầu vào mà trực tiếp sử dụng chuỗi nhận được để thực hiện câu lệnh SQL tìm kiếm tài khoản. Điều này làm lãng phí tài nguyên xử lý của cơ sở dữ liệu đối với các truy vấn rác hoặc sai định dạng.
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Dùng Postman hoặc cURL gửi trực tiếp request POST tới `http://localhost:3000/api/login` với body: `{"email": "notanemail", "password": "Test1234!"}`.
2. Kiểm tra response trả về từ server.
### 🎯 Kết quả mong đợi (Expected Output)
Server từ chối nhanh và trả về mã lỗi `400 Bad Request` hoặc `401 Unauthorized` kèm mô tả lỗi email sai định dạng, không cần thực hiện truy vấn xuống CSDL SQLite.
### 🚫 Kết quả thực tế (Actual Output)
Server không validate định dạng email, vẫn cho chạy câu lệnh truy vấn SQL SELECT để tìm chuỗi `'notanemail'`, sau đó trả về lỗi đăng nhập sai thông tin chung `401 Unauthorized`.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
---
## ISSUE #7: BUG-FR02-07
*   **Tiêu đề Issue (Title):** `[BUG-FR02-07] Lỗ hổng Race Condition cho phép gửi song song nhiều request vượt cơ chế khóa`
*   **Nhãn (Labels):** `bug`, `security`, `high-severity`
### Nội dung Issue (Body):
```markdown
### 📝 Mô tả lỗi
Do backend không thực hiện cơ chế khóa bản ghi (row locking) hoặc xử lý giao dịch đồng thời (atomic transactions) khi kiểm tra và cập nhật trạng thái đăng nhập sai của tài khoản trong CSDL SQLite. Người dùng/kẻ tấn công có thể gửi song song nhiều request đăng nhập cùng lúc để bypass (vượt qua) bộ lọc kiểm tra khóa.
### 🛠️ Các bước tái hiện (Steps to Reproduce)
1. Sử dụng kịch bản Node.js `scratch_test_race.js` gửi đồng thời 5 request đăng nhập sai mật khẩu của cùng 1 tài khoản trong cùng 1 mili giây.
2. Quan sát mã phản hồi HTTP trả về từ server cho cả 5 request.
### 🎯 Kết quả mong đợi (Expected Output)
Hệ thống chỉ cho phép tối đa 2 request đầu tiên trả về `401 Unauthorized` (vì ngưỡng khóa là 3 lần sai). Các request thứ 3, 4, 5 phải bị chặn và trả về `403 Forbidden`.
### 🚫 Kết quả thực tế (Actual Output)
Cả 5 request song song đều trả về mã lỗi `401 Unauthorized` cùng lúc và không có request nào bị chặn bằng mã `403 Forbidden` trong loạt gửi song song đó. Tài khoản chỉ bị khóa sau khi loạt request này đã thực thi xong.
### 💻 Môi trường kiểm thử
* **OS:** macOS
* **SUT Backend:** http://localhost:3000
### 📸 Ảnh chụp minh họa (Bug Screenshot)
[Kéo thả ảnh chụp màn hình kiểm thử tại đây]
```
