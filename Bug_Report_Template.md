# Danh sách báo cáo lỗi - EShop SUT (HW02)

Tài liệu này tổng hợp các lỗi (bug) phát hiện được trong quá trình kiểm thử các tính năng đã thực thi trên hệ thống EShop SUT. Phần đầu là bảng tổng hợp danh sách lỗi, phần sau cung cấp chi tiết từng lỗi để đối chiếu. Chi tiết và bằng chứng hình ảnh/API cụ thể của từng lỗi cũng được quản lý trên mục GitHub Issues nếu đã tạo.

---

## 1. Bảng tổng hợp danh sách lỗi

| Mã lỗi                                                                                                              | Tính năng | Tiêu đề lỗi                                                                                       | Độ nghiêm trọng | Độ ưu tiên | Trạng thái | Test Case đối chiếu                                   | GitHub Issue Link                                               |
| :------------------------------------------------------------------------------------------------------------------ | :-------- | :------------------------------------------------------------------------------------------------ | :-------------- | :--------- | :--------- | :---------------------------------------------------- | :-------------------------------------------------------------- |
| [BUG-FR04-01](#bug-fr04-01-leo-thang-dac-quyen-qua-mass-assignment)                                                 | FR-04     | Leo thang đặc quyền qua thuộc tính role khi cập nhật thông tin cá nhân                            | Critical        | High       | Open       | FR04-DOM-TC08                                         | [#24](https://github.com/HCMUS-software-testing/HW02/issues/24) |
| [BUG-FR04-02](#bug-fr04-02-mat-du-lieu-khi-cap-nhat-mot-phan-data-loss-on-partial-update)                           | FR-04     | Mất dữ liệu - Cập nhật thiếu trường khi cập nhật thông tin cá nhân sẽ ghi đè giá trị cũ bằng NULL | High            | High       | Open       | FR04-DOM-TC07                                         | [#25](https://github.com/HCMUS-software-testing/HW02/issues/25) |
| [BUG-FR04-03](#bug-fr04-03-thieu-kiem-tra-du-lieu-dau-vao-lack-of-input-validation)                                 | FR-04     | Thiếu kiểm duyệt dữ liệu đầu vào khi cập nhật thông tin cá nhân                                   | Medium          | Medium     | Open       | FR04-DOM-TC09, TC10, TC11, TC12, BVA-TC04, TC05, TC06 | [#26](https://github.com/HCMUS-software-testing/HW02/issues/26) |
| [BUG-FR04-04](#bug-fr04-04-lo-lot-thong-tin-nhay-cam-sensitive-data-exposure)                                       | FR-04     | Lộ lọt thông tin người dùng nhạy cảm khi lấy thông tin cá nhân                                    | High            | High       | Open       | FR04-DOM-TC01                                         | [#27](https://github.com/HCMUS-software-testing/HW02/issues/27) |
| [BUG-FR04-05](#bug-fr04-05-loi-dinh-dang-regex-o-frontend-chan-so-dien-thoai-hop-le)                                | FR-04     | Giao diện người dùng chặn cập nhật các số điện thoại Việt Nam hợp lệ bắt đầu bằng số 0            | High            | High       | Open       | FR04-DOM-TC02, BVA-TC03                               | [#28](https://github.com/HCMUS-software-testing/HW02/issues/28) |
| [BUG-FR08-01](#bug-fr08-01-checkout-khong-xoa-gio-hang-sau-khi-thanh-toan-thanh-cong)                               | FR-08     | Checkout không xóa giỏ hàng sau khi thanh toán thành công                                             | High            | High       | Open       | FR08-DOM-TC01, TC13, TC14                             | Chưa tạo                                                        |
| [BUG-FR08-02](#bug-fr08-02-backend-tin-total_amount-tu-client-va-tao-order-voi-tong-tien-khong-hop-le)              | FR-08     | Backend tin `total_amount` từ client và tạo order với tổng tiền không hợp lệ                       | Critical        | High       | Open       | FR08-DOM-TC05, TC06, TC07, TC08, TC09                 | Chưa tạo                                                        |
| [BUG-FR08-03](#bug-fr08-03-backend-khong-kiem-tra-shipping_address-khi-checkout)                                    | FR-08     | Backend không kiểm tra `shipping_address` khi checkout                                             | Medium          | Medium     | Open       | FR08-DOM-TC10, TC11, TC12                             | Chưa tạo                                                        |
| [BUG-FR08-04](#bug-fr08-04-o-nhap-tong-tien-thanh-toan-tren-giao-dien-checkout-cho-phep-nguoi-dung-tu-do-chinh-sua) | FR-08     | Ô nhập Tổng tiền thanh toán trên giao diện Checkout cho phép người dùng tự do chỉnh sửa           | High            | High       | Open       | FR08-DOM-TC06                                         | Chưa tạo                                                        |
| [BUG-FR08-05](#bug-fr08-05-backend-api-cart-va-checkout-chap-nhan-san-pham-co-so-luong-hoac-don-gia-bang-0)         | FR-08     | Backend API cart và checkout chấp nhận sản phẩm có số lượng hoặc đơn giá bằng 0                       | High            | High       | Open       | FR08-BVA-TC10, FR08-BVA-TC16                          | Chưa tạo                                                        |
| [BUG-FR08-06](#bug-fr08-06-he-thong-cho-phep-dat-hang-checkout-voi-gio-hang-rong)                                   | FR-08     | Hệ thống cho phép đặt hàng (checkout) với giỏ hàng rỗng                                               | High            | High       | Open       | FR08-DOM-TC04, FR08-BVA-TC13                          | Chưa tạo                                                        |
---

## 2. Chi tiết từng lỗi (Report)

### BUG-FR04-01: Leo thang đặc quyền qua Mass Assignment

#### Mô tả lỗi

Hệ thống API backend chấp nhận thuộc tính `role: "admin"` truyền lên từ client trong thân hàm request (request body) của phương thức PUT cập nhật hồ sơ, dẫn tới việc một tài khoản khách hàng thông thường có thể tự nâng quyền lên Quản trị viên (admin).

#### Điều kiện tiên quyết

- Người dùng đã đăng ký tài khoản thành công với vai trò ban đầu mặc định là `user`.
- Đã đăng nhập và có JWT Token hợp lệ để gọi API.

#### Các bước tái hiện

1. Gửi request `PUT /api/users/me` với header `Authorization: Bearer <token>` và body request chứa trường `role`:
   ```json
   {
     "name": "Nguyen Van A",
     "shipping_address": "123 Le Loi, Q1, TP.HCM",
     "phone": "0912345678",
     "role": "admin"
   }
   ```
2. Gọi lại request `GET /api/users/me` sử dụng token của tài khoản này để lấy thông tin hồ sơ hiện tại.

#### Kết quả mong đợi

- Hệ thống chỉ cập nhật các thông tin cơ bản được cho phép (`name`, `shipping_address`, `phone`), và bỏ qua trường `role` không hợp lệ hoặc từ chối request.
- Quyền hạn tài khoản trong cơ sở dữ liệu phải được giữ nguyên là `user`.

#### Kết quả thực tế

- API trả về mã trạng thái `200 OK` (thông điệp: `"Profile updated"`).
- Khi gọi GET kiểm tra, trường `role` của tài khoản này đã bị thay đổi thành `"admin"`.

#### Test Case đối chiếu

- **Mã Test Case:** FR04-DOM-TC08
- **Phương pháp thiết kế:** Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client / Node.js
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng và ảnh chụp màn hình

- Minh chứng 1: Gửi request PUT chứa thuộc tính role admin
  ![Gửi request PUT chứa thuộc tính role admin](./screenshots/BUG-FR04-01-01.png)
- Minh chứng 2: Kết quả GET profile hiển thị tài khoản đã bị nâng lên admin
  ![Kết quả GET profile hiển thị tài khoản đã bị nâng lên admin](./screenshots/BUG-FR04-01-02.png)

---

### BUG-FR04-02: Mất dữ liệu khi cập nhật một phần (Data Loss on Partial Update)

#### Mô tả lỗi

Khi thực hiện cập nhật hồ sơ cá nhân qua phương thức PUT, nếu client không truyền đầy đủ tất cả các trường (ví dụ thiếu trường `phone`), API backend sẽ ghi đè giá trị của trường bị thiếu thành `NULL` trong database, làm mất dữ liệu đã có trước đó của người dùng.

#### Điều kiện tiên quyết

- Tài khoản đã đăng nhập và đã điền đầy đủ dữ liệu thông tin cá nhân ban đầu (`name`, `shipping_address`, `phone`).

#### Các bước tái hiện

1. Gửi request `PUT /api/users/me` chỉ chứa thông tin tên và địa chỉ (bỏ trống/không gửi trường `phone`):
   ```json
   {
     "name": "Nguyen Van A New",
     "shipping_address": "123 Le Loi, Q1, TP.HCM"
   }
   ```
2. Gọi request `GET /api/users/me` để lấy thông tin hồ sơ cá nhân hiện tại.

#### Kết quả mong đợi

- Các trường thông tin không được gửi lên trong body request PUT phải được giữ nguyên giá trị cũ trong cơ sở dữ liệu (Partial Update an sau).

#### Kết quả thực tế

- API trả về mã trạng thái `200 OK` cập nhật thành công.
- Tuy nhiên, dữ liệu trường `phone` trong database đã bị ghi đè thành `null`.

#### Test Case đối chiếu

- **Mã Test Case:** FR04-DOM-TC07
- **Phương pháp thiết kế:** Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client / Node.js
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng và ảnh chụp màn hình

- Minh chứng 1: Gửi request PUT khuyết trường phone khiến API backend cập nhật thành công
  ![Gửi request PUT khuyết trường phone](./screenshots/BUG-FR04-02-01.png)
- Minh chứng 2: Kết quả GET profile cho thấy trường phone đã bị ghi đè thành null
  ![Kết quả GET profile hiển thị phone bị null](./screenshots/BUG-FR04-02-02.png)

---

### BUG-FR04-03: Thiếu kiểm tra dữ liệu đầu vào (Lack of Input Validation)

#### Mô tả lỗi

API backend `PUT /api/users/me` hoàn toàn thiếu cơ chế kiểm tra tính hợp lệ dữ liệu đầu vào. Hệ thống chấp nhận lưu chuỗi rỗng cho các trường bắt buộc như `name`, `shipping_address`, `phone` và lưu các giá trị không đúng định dạng số điện thoại (ví dụ: chữ cái `abc-phone`) vào cơ sở dữ liệu.

#### Điều kiện tiên quyết

- Khách hàng đã đăng nhập và có JWT Token hợp lệ để gọi API.

#### Các bước tái hiện

1. Gửi request `PUT /api/users/me` chứa dữ liệu rỗng và sai định dạng:
   ```json
   {
     "name": "",
     "shipping_address": "",
     "phone": "abc-phone"
   }
   ```
2. Thực hiện request `GET /api/users/me` để kiểm tra thông tin hồ sơ vừa lưu.

#### Kết quả mong đợi

- API backend phải kiểm tra dữ liệu đầu vào, từ chối cập nhật và trả về lỗi `400 Bad Request` cùng danh sách thông điệp lỗi cụ thể khi các trường bắt buộc bị rỗng hoặc sai định dạng.

#### Kết quả thực tế

- API vẫn trả về mã trạng thái `200 OK` (thông điệp: `"Profile updated"`).
- Cơ sở dữ liệu ghi nhận thành công chuỗi rỗng cho tên, địa chỉ và lưu chuỗi ký tự chữ `"abc-phone"` làm số điện thoại.

#### Test Case đối chiếu

- **Mã Test Case:** FR04-DOM-TC09, FR04-DOM-TC10, FR04-DOM-TC11, FR04-DOM-TC12, FR04-BVA-TC04, FR04-BVA-TC05, FR04-BVA-TC06
- **Phương pháp thiết kế:** Domain Testing & Boundary Value Analysis

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client / Node.js
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng và ảnh chụp màn hình

- Minh chứng 1: Gửi request PUT chứa thông tin rỗng và sai định dạng phone
  ![Gửi request PUT chứa dữ liệu không hợp lệ](./screenshots/BUG-FR04-03-01.png)
- Minh chứng 2: Kết quả GET profile cho thấy thông tin không hợp lệ được lưu thành công
  ![Kết quả GET profile chứa dữ liệu không hợp lệ](./screenshots/BUG-FR04-03-02.png)

---

### BUG-FR04-04: Lộ lọt thông tin nhạy cảm (Sensitive Data Exposure)

#### Mô tả lỗi

Khi người dùng xem thông tin cá nhân của mình, API backend trả về cả các trường dữ liệu nhạy cảm hoặc mang tính bảo mật nội bộ trong JSON response, gây rủi ro an toàn thông tin nghiêm trọng.

#### Điều kiện tiên quyết

- Người dùng đã đăng ký và đăng nhập thành công vào hệ thống.

#### Các bước tái hiện

1. Đăng nhập để nhận JWT Token.
2. Gửi request `GET /api/users/me` kèm header authorization.
3. Phân tích cấu trúc JSON response nhận về từ server.

#### Kết quả mong đợi

- Response chỉ trả về các thông tin hồ sơ cơ bản cần thiết: `id`, `name`, `email`, `shipping_address`, `phone`.
- Tuyệt đối không được chứa mật khẩu (bằng mọi hình thức mã hóa/hash) và các thông tin nội bộ của hệ thống như bộ đếm đăng nhập sai, reset token.

#### Kết quả thực tế

- JSON response trả về chứa đầy đủ các trường: `"password"` (chứa mật khẩu mã hóa bcrypt hash của người dùng), `"reset_token"`, `"login_attempts"`, `"locked_until"`.

#### Test Case đối chiếu

- **Mã Test Case:** FR04-DOM-TC01
- **Phương pháp thiết kế:** Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client / Node.js
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng và ảnh chụp màn hình

- Minh chứng 1: Response của API GET profile để lộ các trường nhạy cảm như password hash và reset token
  ![Lộ lọt thông tin nhạy cảm trong response](./screenshots/BUG-FR04-04-01.png)

---

### BUG-FR04-05: Lỗi định dạng Regex ở Frontend chặn số điện thoại hợp lệ

#### Mô tả lỗi

Trên giao diện Frontend (Web Client), biểu thức chính quy (Regex) dùng để kiểm tra tính hợp lệ của số điện thoại được định nghĩa sai quy tắc logic (`/^[1-9][0-9]{8,9}$/`). Điều này dẫn tới việc ngăn chặn toàn bộ số điện thoại Việt Nam bắt đầu bằng số `0` cập nhật hồ sơ cá nhân.

Hành vi này đồng thời làm phát sinh lỗi liên đới:

1. Nếu người dùng chỉ muốn cập nhật tên hoặc địa chỉ (giữ nguyên số điện thoại bắt đầu bằng 0), hệ thống vẫn báo lỗi số điện thoại không hợp lệ và ép người dùng phải sửa số điện thoại mới cho cập nhật.
2. Ép người dùng nhập số điện thoại không bắt đầu bằng số 0 (ví dụ `1234567890`) thì mới cho lưu.

#### Điều kiện tiên quyết

- Người dùng truy cập và cập nhật thông tin cá nhân trên trang Profile của giao diện Web.

#### Các bước tái hiện

1. Đi tới trang cá nhân (Profile) trên giao diện Web.
2. Nhập số điện thoại Việt Nam hợp lệ bắt đầu bằng số 0 (ví dụ: `0912345678`).
3. Click vào nút "Cập nhật".

#### Kết quả mong đợi

- Hệ thống chấp nhận số điện thoại bắt đầu bằng số 0 hợp lệ và cập nhật thành công mà không hiển thị cảnh báo chặn.

#### Kết quả thực tế

- Trình duyệt hiển thị thông báo alert: _"Số điện thoại không hợp lệ. Vui lòng nhập đúng 9-10 chữ số."_ và chặn toàn bộ tiến trình cập nhật tên hoặc địa chỉ của người dùng.

#### Test Case đối chiếu

- **Mã Test Case:** FR04-DOM-TC02, FR04-BVA-TC03
- **Phương pháp thiết kế:** Domain Testing & Boundary Value Analysis (Exploratory)

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Google Chrome / Web Frontend
- **Môi trường chạy:** SUT frontend-web (port 5173)

#### Bằng chứng và ảnh chụp màn hình

- Minh chứng 1: Nhập số điện thoại bắt đầu bằng số 0 hợp lệ và bị Frontend báo lỗi alert
  ![Frontend chặn cập nhật số điện thoại hợp lệ](./screenshots/BUG-FR04-05-01.png)
- Minh chứng 2: Hệ thống chỉ chấp nhận lưu khi người dùng nhập số điện thoại không bắt đầu bằng số 0
  ![Frontend bắt buộc nhập số điện thoại không có số 0 đầu](./screenshots/BUG-FR04-05-02.png)

---

### BUG-FR08-01: Checkout không xóa giỏ hàng sau khi thanh toán thành công

#### Mô tả lỗi

Theo đặc tả nghiệp vụ, sau khi người dùng tiến hành thanh toán thành công (checkout), giỏ hàng hiện tại phải được xóa sạch (clear cart) để người dùng có thể mua sắm đơn hàng mới. Tuy nhiên, sau khi nhận phản hồi checkout thành công từ API backend, giỏ hàng của người dùng vẫn giữ nguyên các sản phẩm cũ.

#### Điều kiện tiên quyết

- Người dùng đã đăng nhập và có JWT Token hợp lệ.
- Giỏ hàng hiện tại có sản phẩm nominal `{ id: 1, price: 100000, quantity: 2 }`.

#### Các bước tái hiện

1. Gửi request `POST http://localhost:3000/api/cart` kèm header `Authorization: Bearer <token>` để thêm sản phẩm vào giỏ hàng:
   ```json
   {
     "id": 1,
     "name": "Sample Product",
     "price": 100000,
     "quantity": 2
   }
   ```
2. Gửi request `POST http://localhost:3000/api/checkout` kèm header `Authorization: Bearer <token>` để tiến hành checkout:
   ```json
   {
     "total_amount": 200000,
     "shipping_address": "123 Le Loi, TP.HCM"
   }
   ```
3. Gửi request `GET http://localhost:3000/api/cart` kèm header `Authorization: Bearer <token>` để kiểm tra danh sách sản phẩm trong giỏ hàng.

#### Kết quả mong đợi

- Sau khi checkout thành công, giỏ hàng của người dùng phải được xóa trống (trả về danh sách rỗng `[]` khi gọi GET).

#### Kết quả thực tế

- API trả về mã trạng thái `200 OK` (Checkout thành công và tạo order), nhưng khi gọi GET `/api/cart` danh sách sản phẩm cũ vẫn tồn tại nguyên vẹn.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-DOM-TC01, FR08-DOM-TC13, FR08-DOM-TC14, FR08-BVA-TC02, FR08-BVA-TC05, FR08-BVA-TC06, FR08-BVA-TC08, FR08-BVA-TC09, FR08-BVA-TC11, FR08-BVA-TC12, FR08-BVA-TC14, FR08-BVA-TC15, FR08-BVA-TC17, FR08-BVA-TC18
- **Phương pháp thiết kế:** Domain Testing & Boundary Value Analysis

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng

- Response trả về thành công `200 OK` cho request checkout, nhưng khi gửi request GET `/api/cart` sau đó, danh sách giỏ hàng vẫn trả về danh sách các sản phẩm trước đó thay vì giỏ hàng trống `[]`.

---

### BUG-FR08-02: Backend tin `total_amount` từ client và tạo order với tổng tiền không hợp lệ

#### Mô tả lỗi

FR-08 yêu cầu backend phải tự tính lại tổng tiền từ giỏ hàng và không chấp nhận `total_amount` do client gửi lên. Thực tế backend lưu trực tiếp mọi giá trị `total_amount` trong request, bao gồm thiếu field, lệch cart total, `0`, số âm và chuỗi không phải số.

#### Điều kiện tiên quyết

- Người dùng đã đăng nhập.
- Cart có sản phẩm nominal `{ price: 100000, quantity: 2 }`, tổng đúng là `200000`.

#### Các bước tái hiện

1. Gửi request `POST http://localhost:3000/api/cart` kèm header `Authorization: Bearer <token>` để thêm sản phẩm nominal vào giỏ hàng:

   ```json
   {
     "id": 1,
     "name": "Sample Product",
     "price": 100000,
     "quantity": 2
   }
   ```

2. Gửi request `POST http://localhost:3000/api/checkout` kèm header `Authorization: Bearer <token>` với một giá trị `total_amount` không hợp lệ (ví dụ gửi số âm `-1` thay vì số tiền đúng `200000`):

   ```json
   {
     "total_amount": -1,
     "shipping_address": "123 Le Loi, TP.HCM"
   }
   ```

   _(Lưu ý: Lỗi tương tự xảy ra khi gửi các giá trị không hợp lệ khác như `0`, `"abc"`, lệch tiền giỏ hàng, hoặc bỏ trống hoàn toàn trường `total_amount`)._

3. Gửi request `GET http://localhost:3000/api/orders/my-orders` kèm header `Authorization: Bearer <token>` để xem thông tin đơn hàng vừa được tạo.

#### Kết quả mong đợi

- Backend phải tự tính lại tổng tiền từ cart hoặc từ chối request không hợp lệ.
- Không được tạo order với tổng tiền `null`, sai lệch, `0`, âm hoặc sai kiểu.

#### Kết quả thực tế

- API đều trả `200 OK` và tạo order.
- Order được lưu với `total_amount=null`, `100000`, `0`, `-1`, hoặc `"abc"` đúng như client gửi.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-DOM-TC05, FR08-DOM-TC06, FR08-DOM-TC07, FR08-DOM-TC08, FR08-DOM-TC09
- **Phương pháp thiết kế:** Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng

- API trả về `200 OK` cho tất cả các trường hợp gửi giá trị `total_amount` sai lệch. Danh sách đơn hàng (`GET /api/orders/my-orders`) hiển thị đơn hàng đã được lưu thành công với các tổng tiền không hợp lệ tương ứng.

---

### BUG-FR08-03: Backend không kiểm tra `shipping_address` khi checkout

#### Mô tả lỗi

API checkout không kiểm tra trường địa chỉ giao hàng. Hệ thống vẫn tạo order khi thiếu `shipping_address`, địa chỉ rỗng hoặc chỉ gồm khoảng trắng.

#### Điều kiện tiên quyết

- Người dùng đã đăng nhập.
- Cart có sản phẩm nominal.

#### Các bước tái hiện

1. Gửi request `POST http://localhost:3000/api/cart` kèm header `Authorization: Bearer <token>` để thêm sản phẩm nominal vào giỏ:

   ```json
   {
     "id": 1,
     "name": "Sample Product",
     "price": 100000,
     "quantity": 2
   }
   ```

2. Gửi request `POST http://localhost:3000/api/checkout` kèm header `Authorization: Bearer <token>` với trường `shipping_address` để rỗng `""`:

   ```json
   {
     "total_amount": 200000,
     "shipping_address": ""
   }
   ```

   _(Lưu ý: Lỗi tương tự xảy ra khi gửi địa chỉ chỉ chứa khoảng trắng `"   "` hoặc khuyết hoàn toàn trường `shipping_address`)._

3. Gửi request `GET http://localhost:3000/api/orders/my-orders` kèm header `Authorization: Bearer <token>` để xem thông tin đơn hàng vừa được tạo.

#### Kết quả mong đợi

- Hệ thống phải trả validation error và không tạo order khi địa chỉ giao hàng bị thiếu hoặc không có nội dung.

#### Kết quả thực tế

- API trả `200 OK` và tạo order với `shipping_address=null`, `""`, hoặc `"   "`.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-DOM-TC10, FR08-DOM-TC11, FR08-DOM-TC12
- **Phương pháp thiết kế:** Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng

- API chấp nhận tạo đơn hàng thành công với mã `200 OK`. Khi truy vấn lại thông tin đơn hàng, trường `shipping_address` lưu các giá trị `null`, `""` hoặc `"   "`.

---

### BUG-FR08-04: Ô nhập Tổng tiền thanh toán trên giao diện Checkout cho phép người dùng tự do chỉnh sửa

#### Mô tả lỗi

Trên màn hình xác nhận thanh toán (Checkout), số tiền "Tổng tiền thanh toán" hiển thị dưới dạng ô nhập dữ liệu cho phép người dùng tự do thay đổi (chỉnh sửa số tiền). Điều này vi phạm quy tắc nghiệp vụ vì tổng tiền thanh toán phải là giá trị cố định được tính toán tự động từ giỏ hàng và chỉ hiển thị dưới dạng chỉ đọc (read-only).

#### Điều kiện tiên quyết

- Người dùng truy cập trang Checkout trên Web Frontend.
- Giỏ hàng hiện đang có sản phẩm.

#### Các bước tái hiện

1. Truy cập trang giỏ hàng `http://localhost:5173/cart`, thêm sản phẩm bất kỳ vào giỏ hàng.
2. Bấm nút "Tiến hành thanh toán" để chuyển hướng tới màn hình Checkout (`http://localhost:5173/checkout`).
3. Tại trường "Tổng tiền thanh toán (VND)", click chuột vào ô nhập và thử thay đổi số tiền (ví dụ nhập số tiền bất kỳ như `100` thay vì giá trị mặc định của giỏ hàng).

#### Kết quả mong đợi

- Tổng tiền thanh toán phải được hiển thị dưới dạng văn bản tĩnh hoặc ô nhập chỉ đọc (read-only), người dùng không thể chỉnh sửa hay nhập số khác.

#### Kết quả thực tế

- Ô nhập tiền cho phép người dùng tự do thay đổi, xóa, hoặc gõ một số tiền bất kỳ.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-DOM-TC06
- **Phương pháp thiết kế:** Giao diện Web / Domain Testing

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Google Chrome / Firefox
- **Môi trường chạy:** SUT frontend-web (port 5173)

#### Bằng chứng

- Trường hiển thị Tổng tiền thanh toán trên giao diện Checkout được định nghĩa bằng thẻ input số hoạt động bình thường, cho phép nhập liệu tự do.

---

### BUG-FR08-05: Backend API cart và checkout chấp nhận sản phẩm có số lượng hoặc đơn giá bằng 0

#### Mô tả lỗi

API backend không kiểm duyệt thông tin sản phẩm khi thêm vào giỏ hàng (`POST /api/cart`) và khi tiến hành đặt hàng. Hệ thống chấp nhận sản phẩm có số lượng bằng 0 (`quantity: 0`) hoặc đơn giá bằng 0 (`price: 0`) và cho phép hoàn tất đơn hàng với tổng thanh toán bằng 0đ mà không đưa ra bất kỳ cảnh báo hay validation error nào.

#### Điều kiện tiên quyết

- Người dùng đã đăng nhập và có JWT Token hợp lệ để gọi API.

#### Các bước tái hiện

1. Gửi request `POST http://localhost:3000/api/cart` kèm header `Authorization: Bearer <token>` để thêm sản phẩm không hợp lệ (số lượng bằng 0 và đơn giá bằng 0đ) vào giỏ hàng:

   ```json
   {
     "id": 1,
     "name": "Invalid Product",
     "price": 0,
     "quantity": 0
   }
   ```

2. Gửi request `POST http://localhost:3000/api/checkout` kèm header `Authorization: Bearer <token>` để tiến hành đặt hàng:

   ```json
   {
     "total_amount": 0,
     "shipping_address": "123 Le Loi, TP.HCM"
   }
   ```

   _(Lưu ý: Lỗi tương tự xảy ra khi sản phẩm có số lượng = 0 nhưng đơn giá > 0, hoặc đơn giá = 0 nhưng số lượng > 0)._

#### Kết quả mong đợi

- API `POST /api/cart` phải từ chối thêm sản phẩm có số lượng hoặc đơn giá không hợp lệ và trả về lỗi `400 Bad Request`.
- API `POST /api/checkout` phải kiểm tra tính hợp lệ của các sản phẩm trong giỏ và từ chối tạo đơn hàng.

#### Kết quả thực tế

- Cả hai API đều hoạt động thành công và trả về mã trạng thái `200 OK`.
- Đơn hàng được tạo thành công trong DB với tổng tiền bằng 0đ chứa các sản phẩm có số lượng/đơn giá bằng 0.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-BVA-TC10, FR08-BVA-TC16
- **Phương pháp thiết kế:** Boundary Value Analysis

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng

- Phản hồi `200 OK` nhận được từ API giỏ hàng khi gửi request thêm sản phẩm có số lượng/đơn giá bằng 0. Gọi API checkout thành công và tạo đơn hàng có tổng giá trị bằng 0đ thành công.

---

### BUG-FR08-06: Hệ thống cho phép đặt hàng (checkout) với giỏ hàng rỗng

#### Mô tả lỗi

Quy trình nghiệp vụ mua sắm yêu cầu giỏ hàng của khách hàng phải chứa ít nhất một sản phẩm hợp lệ mới được phép thực hiện thanh toán (checkout). Tuy nhiên, API backend checkout chấp nhận việc gửi yêu cầu thanh toán khi giỏ hàng rỗng, tạo đơn hàng thành công trong cơ sở dữ liệu với tổng tiền bằng 0đ.

#### Điều kiện tiên quyết

- Người dùng đã đăng nhập và có JWT Token hợp lệ.
- Giỏ hàng của người dùng hiện đang trống (0 sản phẩm).

#### Các bước tái hiện

1. Gửi trực tiếp request `POST http://localhost:3000/api/checkout` kèm header `Authorization: Bearer <token>` với thông tin thanh toán:
   ```json
   {
     "total_amount": 0,
     "shipping_address": "123 Le Loi, TP.HCM"
   }
   ```
2. Gửi request `GET http://localhost:3000/api/orders/my-orders` kèm header `Authorization: Bearer <token>` để kiểm tra danh sách đơn hàng đã mua.

#### Kết quả mong đợi

- Backend phải kiểm tra trạng thái giỏ hàng trước khi tạo order, từ chối yêu cầu checkout của giỏ hàng rỗng và trả về lỗi `400 Bad Request`.

#### Kết quả thực tế

- API trả về `200 OK` (thông điệp: `"Checkout successful"`) và tạo thành công một đơn hàng mới có `total_amount = 0` trong cơ sở dữ liệu.

#### Test Case đối chiếu

- **Mã Test Case:** FR08-DOM-TC04, FR08-BVA-TC13
- **Phương pháp thiết kế:** Domain Testing & Boundary Value Analysis

#### Môi trường

- **Hệ điều hành:** Windows 11
- **Trình duyệt / Công cụ:** Postman / API Client
- **Môi trường chạy:** SUT local server (port 3000)

#### Bằng chứng

- Phản hồi `200 OK` nhận được từ API checkout với request thanh toán giỏ hàng rỗng, tạo đơn hàng mới có tổng giá trị bằng 0đ thành công.
