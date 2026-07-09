# Homework 2: Domain Testing
- Họ và tên: Mai Thị Kim Duyên
- MSSV: 23127185
----
# 1. Bảng nhiệm vụ

| STT | Tiêu chí | Điểm | Điểm tự đánh giá |
| --- | --- | --- | --- |
| 1 | Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)  | 25 |  |
| 2 | Tính năng 10 - Pool B: Trạng thái Đơn hàng | 25 |  |
| 3 | Tính năng 14 - Pool C: Quản lý Danh mục (Category CRUD)| 25 |  |
| 4 | Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản | 15 |  |
| 5 | Agent Skills | 10 |  |
| | **Total** | **100** |  |

# 2. Báo cáo chi tiết các tính năng

## 2.1 Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)
### Mô tả:
- Bước 1 — Lấy mã OTP:
    - Người dùng nhập địa chỉ Email đã đăng ký.
    - Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
    - Giao diện phải hiển thị chỉ báo bước (Step Indicator) — ví dụ: "Bước 1 / 2".
    - Có nút Quay lại đăng nhập.
- Bước 2 — Đặt lại mật khẩu:
    - Người dùng nhập OTP, Mật khẩu mới, và Xác nhận mật khẩu mới.
    - Mật khẩu mới phải tuân thủ điều kiện như FR-01. (Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).)
    - Hai trường mật khẩu phải khớp nhau.
    - OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

### Domain Testing
[Xem nội dung](./domain-testing-fr3.md)

### Test Cases

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | Kiểm tra yêu cầu OTP thành công với email hợp lệ (E1, E4) | Email: `ntcong120@gmail.com` (đã đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống gửi OTP (6 chữ số) thành công và chuyển sang giao diện Bước 2. | Hệ thống gửi OTP thành công nhưng mã OTP chỉ có 4 số. Chuyển sang giao diện Bước 2. | FAIL |
| TC2 | Kiểm tra lỗi định dạng email không hợp lệ (E2) | Email: `user_validgmail.com` | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi user không tồn tại. | Hệ thống báo lỗi user không tồn tại.| Pass|
| TC3 | Kiểm tra lỗi bỏ trống email (E3) | Email: *(Để trống)* | 1. Để trống email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi không được để trống trường email. | Hệ thống báo lỗi không được để trống trường email. | Pass | 
| TC4 | Kiểm tra lỗi email chưa được đăng ký (E5) | Email: `unknown@gmail.com` (chưa đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống. | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống. | Pass | 
| TC5 | Kiểm tra đặt lại mật khẩu thành công với độ dài tối thiểu 8 ký tự (B1) | OTP: Đúng<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập OTP.<br>2. Nhập MK mới và Xác nhận MK.<br>3. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL|
| TC6 | Kiểm tra đặt lại mật khẩu thành công với độ dài 9 ký tự (B3) | OTP: Đúng<br>MK mới: `Aaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công và hiển thị thông báo. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC7 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ hoa (B4) | OTP: Đúng<br>MK mới: `Aaaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC8 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ hoa (B6) | OTP: Đúng<br>MK mới: `AAaaaaaaa1!`<br>Xác nhận MK: `AAaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC9 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ thường (B7) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC10 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ thường (B9) | OTP: Đúng<br>MK mới: `AAAAAAAAaa1!`<br>Xác nhận MK: `AAAAAAAAaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC11 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ số (B10) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC12 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ số (B12) | OTP: Đúng<br>MK mới: `AAAAAAAAa12!`<br>Xác nhận MK: `AAAAAAAAa12!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC13 | Kiểm tra đặt lại mật khẩu thành công với 1 ký tự đặc biệt (B13) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC14 | Kiểm tra đặt lại mật khẩu thành công với 2 ký tự đặc biệt (B15) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!@`<br>Xác nhận MK: `AAAAAAAAa1!@` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | FAIL |
| TC15 | Kiểm tra lỗi nhập sai mã OTP (E7) | OTP: Sai mã<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập OTP sai.<br>2. Nhập MK hợp lệ.<br>3. Bấm "Đặt lại mật khẩu". | Hệ thống báo lỗi mã OTP không hợp lệ hoặc không chính xác. | Không có mục nhập xác nhận mật khẩu mới và xác nhận mật khẩu và hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.". Không thông báo lỗi sai OTP | FAIL|
| TC16 | Kiểm tra lỗi xác nhận mật khẩu không khớp (E19) | OTP: Đúng<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `WrongP@ss99` | 1. Nhập OTP đúng.<br>2. Nhập MK và Xác nhận MK khác nhau.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu xác nhận không trùng khớp. | Không có mục nhập xác nhận mật khẩu mới | FAIL |
| TC17 | Kiểm tra lỗi mật khẩu ngắn hơn 8 ký tự (E9, B2) | OTP: Đúng<br>MK mới: `Aaaaaa1!` (7 ký tự)<br>Xác nhận MK: `Aaaaaa1!` | 1. Nhập OTP đúng.<br>2. Nhập MK 7 ký tự.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu mới phải từ 8 ký tự trở lên. | Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | PASS |
| TC18 | Kiểm tra lỗi mật khẩu thiếu chữ hoa (E11, B5) | OTP: Đúng<br>MK mới: `aaaaaaaa1!`<br>Xác nhận MK: `aaaaaaaa1!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có chữ hoa.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa. |  Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | PASS |
| TC19 | Kiểm tra lỗi mật khẩu thiếu chữ thường (E13, B8) | OTP: Đúng<br>MK mới: `AAAAAAAA1!`<br>Xác nhận MK: `AAAAAAAA1!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có chữ thường.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường. |  Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | PASS |
| TC20 | Kiểm tra lỗi mật khẩu thiếu chữ số (E15, B11) | OTP: Đúng<br>MK mới: `AAAAAAAAa!`<br>Xác nhận MK: `AAAAAAAAa!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có số.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số. | Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | PASS |
| TC21 | Kiểm tra lỗi mật khẩu thiếu ký tự đặc biệt (E17, B14) | OTP: Đúng<br>MK mới: `AAAAAAAAa1`<br>Xác nhận MK: `AAAAAAAAa1` | 1. Nhập OTP đúng.<br>2. Nhập MK không có KTĐB.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt. |  Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT." | PASS |

## 2.2 Tính năng 10 - Pool B: Trạng thái Đơn hàng
### Mô tả:
- Đơn hàng có 5 trạng thái và phải tuân theo sơ đồ chuyển đổi sau:
```
                 [Admin xác nhận]          [Admin giao hàng]      [Admin hoàn tất]
  ┌──────────┐ ─────────────────► ┌───────────┐ ──────────────►  ┌──────────┐ ──────────► ┌───────────┐
  │ pending  │                    │ confirmed │                  │ shipping │             │ delivered │
  └──────────┘                    └───────────┘                  └──────────┘             └───────────┘
       │                               │
       │ [User/Admin hủy]              │ [User/Admin hủy]
       ▼                               ▼
  ┌──────────┐                    ┌──────────┐
  │ canceled │                    │ canceled │
  └──────────┘                    └──────────┘
```
- Ràng buộc trạng thái kết thúc (Final States):
    - Trạng thái delivered và canceled là trạng thái kết thúc — không được phép chuyển sang bất kỳ trạng thái nào khác.
    - Khi đơn hàng đã ở trạng thái shipping, User không được phép tự hủy — chỉ Admin mới có thể thao tác.
    - Mọi chuyển đổi không hợp lệ phải trả về lỗi với thông báo phù hợp.

### Domain Testing
[Xem nội dung](./domain-testing-fr10.md)

### Test Cases

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra Admin xác nhận đơn hàng từ `pending` sang `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Xác nhận | Đơn hàng chuyển sang `confirmed` thành công | Đơn hàng chuyển sang Đã xác nhận | PASS |
| TC2 | Kiểm tra User không có quyền xác nhận đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Lấy Token (User): Chọn method POST, URL: http://localhost:3000/api/login, Tab Body (raw > JSON): {"email": "user@...","password": "..."}. Copy chuỗi token. 2. Thực hiện Xác nhận: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng pending). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "confirmed"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công| FAIL |
| TC3 | Kiểm tra Admin giao hàng từ `confirmed` sang `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Giao hàng | Đơn hàng chuyển sang `shipping` thành công | Đơn hàng chuyển sang giao hàng thành công | PASS |
| TC4 | Kiểm tra User không có quyền giao hàng đối với đơn `confirmed` | Vai trò: `User`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Lấy Token (User): Làm tương tự bước 1 của TC2. 2. Thực hiện Hoàn tất: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng shipping). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "shipping"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công| FAIL |
| TC5 | Kiểm tra Admin hoàn tất đơn hàng từ `shipping` sang `delivered` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hoàn tất | Đơn hàng chuyển sang `delivered` thành công | Đơn hàng chuyển sang Đã giao | PASS |
| TC6 | Kiểm tra User không có quyền hoàn tất đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất |1. Lấy Token (User): Làm tương tự bước 1 của TC2. 2. Thực hiện Hoàn tất: Tạo request mới PUT http://localhost:3000/api/admin/orders/{id}/status (id của đơn hàng shipping). Tab Auth > Bearer Token: dán Token của User. Tab Body (raw > JSON): {"status": "delivered"}. Bấm Send. | Báo lỗi không có quyền thay đổi trạng thái | Chuyển đổi thành công | FAIL |
| TC7 | Kiểm tra User hủy đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Đơn hàng chuyển sang đã hủy thành công | PASS |
| TC8 | Kiểm tra Admin hủy đơn hàng `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Đơn hàng chuyển sang đã hủy thành công | PASS |
| TC9 | Kiểm tra Admin hủy đơn hàng `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | Không có nút hủy | FAIL |
| TC10 | Kiểm tra User không có quyền hủy đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Báo lỗi User không được phép hủy khi đang giao hàng | Đơn hàng chuyển sang đã hủy thành công | FAIL |
| TC11 | Kiểm tra không thể hủy đơn hàng từ trạng thái kết thúc | Vai trò: `User`<br>Trạng thái hiện tại: `delivered`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `delivered`<br>3. Thực hiện thao tác Hủy | Báo lỗi không thể thay đổi từ trạng thái kết thúc | Không có nút báo hủy | PASS |

## 2.3 Tính năng 14 - Pool C: Quản lý Danh mục
### Mô tả: 
- Admin có thể Thêm / Xem / Xóa danh mục.
- Tên danh mục là bắt buộc, không được để trống.

### Domain Testing
[Xem nội dung](./domain-testing-fr14.md)

### Test Cases

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra Thêm danh mục thành công với quyền Admin (E1, E5) | Vai trò: `Admin`<br>Tên danh mục: Tên mới (chưa tồn tại) | 1. Đăng nhập với quyền Admin<br>2. Nhập tên danh mục hợp lệ<br>3. Bấm Thêm | Thêm danh mục thành công và hiển thị trên danh sách. | Thêm danh mục thành công và hiển thị trên danh sách. | PASS |
| TC2 | Kiểm tra lỗi Thêm danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Tên danh mục: Tên mới (chưa tồn tại) | 1. Lấy Token (User): Chọn method POST, URL: http://localhost:3000/api/login, Tab Body (raw > JSON): {"email": "user@...","password": "..."}, Copy chuỗi token ở kết quả trả về. 2. Thực hiện Thêm: Tạo request mới POST http://localhost:3000/api/categories, Tab Auth > Bearer Token: dán Token vừa copy, Tab Body (raw > JSON): {"name": "Danh mục mới"}, Bấm Send.| Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | Thêm thành công danh mục | FAIL |
| TC3 | Kiểm tra lỗi Thêm danh mục khi để trống tên (E3) | Vai trò: `Admin`<br>Tên danh mục: *(Để trống)* | 1. Đăng nhập với quyền Admin<br>2. Để trống tên danh mục<br>3. Bấm Thêm | Báo lỗi tên danh mục là bắt buộc, không được để trống. | Thêm thành công danh mục | FAIL |
| TC4 | Kiểm tra lỗi Thêm danh mục với tên đã tồn tại (E4) | Vai trò: `Admin`<br>Tên danh mục: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Nhập tên danh mục đã có trong hệ thống<br>3. Bấm Thêm | Báo lỗi tên danh mục đã tồn tại trong hệ thống. | Thêm danh mục thành công | FAIL |
| TC5 | Kiểm tra Xóa danh mục thành công với quyền Admin (E1, E3) | Vai trò: `Admin`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Chọn một danh mục có sẵn<br>3. Bấm Xóa | Xóa danh mục thành công và loại bỏ khỏi hệ thống. | Xóa thành công danh mục | PASS |
| TC6 | Kiểm tra lỗi Xóa danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Danh mục mục tiêu: Đã tồn tại | 1. Lấy Token (User): Làm tương tự bước 1 của TC2. 2. Thực hiện Xóa: Tạo request mới DELETE http://localhost:3000/api/categories/{id_có_thật}, Tab Auth > Bearer Token: dán Token của User, Bấm Send. | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | Xóa danh mục thành công | FAIL |
| TC7 | Kiểm tra lỗi Xóa danh mục không tồn tại (E4) | Vai trò: `Admin`<br>Danh mục mục tiêu: Chưa tồn tại | 1. Lấy Token (Admin): Chọn method POST, URL: http://localhost:3000/api/login, Tab Body (raw > JSON): {"email": "admin@...","password": "..."}, Copy chuỗi token. 2. Thực hiện Xóa: Tạo request mới DELETE http://localhost:3000/api/categories/99999, Tab Auth > Bearer Token: dán Token của Admin., Bấm Send. | Báo lỗi không tìm thấy danh mục cần xóa. | Thông báo xóa danh mục thành công | FAIL |
| TC8 | Kiểm tra Xem danh mục thành công với quyền Admin (E1, E3) | Vai trò: `Admin`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Chọn danh mục | Hiển thị thông tin danh sách danh mục. | Hiển thị thông tin danh sách danh mục. | PASS |
| TC9 | Kiểm tra lỗi Xem danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Danh mục mục tiêu: Đã tồn tại | 1. Lấy Token (User): Làm tương tự bước 1 của TC2.2. Thực hiện Xem: Tạo request mới GET http://localhost:3000/api/categories, Tab Auth > Bearer Token: dán Token của User, Bấm Send. | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | Xem danh mục thành công | FAIL |


## 2.4 Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản
### Mô tả:
- Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
- Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
- Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
- Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

### Domain Testing
[Xem nội dung](./domain-testing-fr1.md)

### Test Cases

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra đăng ký thành công với mật khẩu 8 ký tự (E1, E3, E5, E17, B1) | Họ tên: `Nguyen Van A`<br>Email: `validuser@gmail.com`<br>MK: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập thông tin hợp lệ với mật khẩu dài 8 ký tự<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC2 | Kiểm tra đăng ký thành công với mật khẩu 9 ký tự (B3) | Họ tên: `Nguyen Van A`<br>Email: `validuser1@gmail.com`<br>MK: `Aaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaa1!` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC3 | Kiểm tra đăng ký thành công với mật khẩu có 1 chữ hoa (B4) | Họ tên: `Nguyen Van A`<br>Email: `validuser2@gmail.com`<br>MK: `Aaaaaaaa12!@`<br>Xác nhận MK: `Aaaaaaaa12!@` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC4 | Kiểm tra đăng ký thành công với mật khẩu có 2 chữ hoa (B6) | Họ tên: `Nguyen Van A`<br>Email: `validuser3@gmail.com`<br>MK: `AAaaaaaa12!@`<br>Xác nhận MK: `AAaaaaaa12!@` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC5 | Kiểm tra đăng ký thành công với mật khẩu có 1 chữ thường (B7) | Họ tên: `Nguyen Van A`<br>Email: `validuser5@gmail.com`<br>MK: `AAAAAAAAa1!@`<br>Xác nhận MK: `AAAAAAAAa1!@` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC6 | Kiểm tra đăng ký thành công với mật khẩu có 2 chữ thường (B9) | Họ tên: `Nguyen Van A`<br>Email: `validuser6@gmail.com`<br>MK: `AAAAAAAAaa1!`<br>Xác nhận MK: `AAAAAAAAaa1!` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC7 | Kiểm tra đăng ký thành công với mật khẩu có 1 chữ số (B10) | Họ tên: `Nguyen Van A`<br>Email: `validuser7@gmail.com`<br>MK: `AAaaaaaa1!@#`<br>Xác nhận MK: `AAaaaaaa1!@#` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC8 | Kiểm tra đăng ký thành công với mật khẩu có 2 chữ số (B12) | Họ tên: `Nguyen Van A`<br>Email: `validuser8@gmail.com`<br>MK: `AAaaaaaa12!@`<br>Xác nhận MK: `AAaaaaaa12!@` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC9 | Kiểm tra đăng ký thành công với mật khẩu có 1 ký tự đặc biệt (B13) | Họ tên: `Nguyen Van A`<br>Email: `validuser9@gmail.com`<br>MK: `AAaaaaaa123!`<br>Xác nhận MK: `AAaaaaaa123!` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC10 | Kiểm tra đăng ký thành công với mật khẩu có 2 ký tự đặc biệt (B15) | Họ tên: `Nguyen Van A`<br>Email: `validuser10@gmail.com`<br>MK: `AAaaaaaa12!@`<br>Xác nhận MK: `AAaaaaaa12!@` | 1. Nhập thông tin hợp lệ<br>2. Bấm Đăng ký | Đăng ký thành công và chuyển tới trang Đăng nhập | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | PASS |
| TC11 | Kiểm tra lỗi để trống họ tên (E2) | Họ tên: *(Để trống)*<br>Email: `validuser4@gmail.com`<br>MK: `StrongP@ss1`<br>Xác nhận MK: `StrongP@ss1` | 1. Nhập thiếu họ tên<br>2. Bấm Đăng ký | Báo lỗi họ tên không được để trống | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | FAIL |
| TC12 | Kiểm tra lỗi định dạng email không hợp lệ (E4) | Họ tên: `Nguyen Van A`<br>Email: `newusergmail.com`<br>MK: `StrongP@ss1`<br>Xác nhận MK: `StrongP@ss1` | 1. Nhập sai định dạng email<br>2. Bấm Đăng ký | Báo lỗi định dạng email không hợp lệ | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | FAIL |
| TC13 | Kiểm tra lỗi email đã đăng ký (E6) | Họ tên: `Nguyen Van B`<br>Email: `existeduser@gmail.com`<br>MK: `StrongP@ss1`<br>Xác nhận MK: `StrongP@ss1` | 1. Nhập email đã tồn tại<br>2. Bấm Đăng ký | Báo lỗi email đã được đăng ký trong hệ thống | Không có ô Xác nhận mật khẩu. Đăng ký thành công và chuyển tới trang Đăng nhập | FAIL|
| TC14 | Kiểm tra lỗi xác nhận mật khẩu không khớp (E18) | Họ tên: `Nguyen Van A`<br>Email: `newuser123@gmail.com`<br>MK: `StrongP@ss1`<br>Xác nhận MK: `WrongP@ss99` | 1. Nhập mật khẩu xác nhận sai lệch<br>2. Bấm Đăng ký | Báo lỗi xác nhận mật khẩu không khớp | Không có ô Xác nhận mật khẩu | FAIL |
| TC15 | Kiểm tra lỗi mật khẩu ngắn hơn 8 ký tự (E8, B2) | Họ tên: `Nguyen Van A`<br>Email: `validuser11@gmail.com`<br>MK: `Aaaaaa1!` (7 ký tự)<br>Xác nhận MK: `Aaaaaa1!` | 1. Nhập mật khẩu dài 7 ký tự<br>2. Bấm Đăng ký | Hệ thống báo lỗi mật khẩu phải từ 8 ký tự trở lên |  Không có ô xác thực mật khẩu. Hệ thống báo lỗi "Mật khẩu quá yếu. Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" | PASS  |
| TC16 | Kiểm tra lỗi mật khẩu thiếu chữ cái in hoa (E10, B5) | Họ tên: `Nguyen Van A`<br>Email: `validuser12@gmail.com`<br>MK: `aaaaaaaa12!@`<br>Xác nhận MK: `aaaaaaaa12!@` | 1. Nhập mật khẩu thiếu chữ hoa<br>2. Bấm Đăng ký | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | Không có ô xác thực mật khẩu. Hệ thống báo lỗi "Mật khẩu quá yếu. Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" | PASS |
| TC17 | Kiểm tra lỗi mật khẩu thiếu chữ cái in thường (E12, B8) | Họ tên: `Nguyen Van A`<br>Email: `validuser13@gmail.com`<br>MK: `AAAAAAAA12!@`<br>Xác nhận MK: `AAAAAAAA12!@` | 1. Nhập mật khẩu thiếu chữ thường<br>2. Bấm Đăng ký | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | Không có ô xác thực mật khẩu. Hệ thống báo lỗi "Mật khẩu quá yếu. Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" | PASS |
| TC18 | Kiểm tra lỗi mật khẩu thiếu chữ số (E14, B11) | Họ tên: `Nguyen Van A`<br>Email: `validuser14@gmail.com`<br>MK: `AAaaaaaa!@#$`<br>Xác nhận MK: `AAaaaaaa!@#$` | 1. Nhập mật khẩu thiếu chữ số<br>2. Bấm Đăng ký | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | Không có ô xác thực mật khẩu. Hệ thống báo lỗi "Mật khẩu quá yếu. Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" | PASS |
| TC19 | Kiểm tra lỗi mật khẩu thiếu ký tự đặc biệt (E16, B14) | Họ tên: `Nguyen Van A`<br>Email: `validuser15@gmail.com`<br>MK: `AAaaaaaa1234`<br>Xác nhận MK: `AAaaaaaa1234` | 1. Nhập mật khẩu thiếu ký tự đặc biệt<br>2. Bấm Đăng ký | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt | Không có ô xác thực mật khẩu. Hệ thống báo lỗi "Mật khẩu quá yếu. Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" | PASS |
