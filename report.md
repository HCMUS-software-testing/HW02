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

### Equivalence Partitioning
#### Điều kiện:
- Bước 1: 
    - C1: Email đúng định dạng hợp lệ.
    - C2: Email đã được đăng ký trong hệ thống.
- Bước 2:
    - C3: OTP khớp với mã đã được gửi cho email yêu cầu.
    - C4: Mật khẩu mới có độ dài >= 8 ký tự.
    - C5: Mật khẩu mới chứa ít nhất 1 chữ hoa.
    - C6: Mật khẩu mới chứa ít nhất 1 chữ thường.
    - C7: Mật khẩu mới chứa ít nhất 1 chữ số.
    - C8: Mật khẩu mới chứa ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
    - C9: Xác nhận mật khẩu mới khớp hoàn toàn với Mật khẩu mới.

#### Equivalence Classes
- Bước 1: 
    - E1: Chuỗi email đúng định dạng hợp lệ (vd: chứa đủ phần local, ký tự '@' và domain) - Valid
    - E2: Chuỗi email sai định dạng (thiếu '@', thiếu phần local hoặc domain) - Invalid
    - E3: Chuỗi email bị để trống - Invalid
    - E4: Email đã tồn tại trong cơ sở dữ liệu của hệ thống - Valid
    - E5: Email chưa từng được đăng ký trong cơ sở dữ liệu của hệ thống - Invalid
- Bước 2:
    - E6: Mã OTP trùng khớp hoàn toàn với mã đã gửi - Valid
    - E7: Mã OTP không trùng khớp với mã đã gửi - Invalid
    - E8: Mật khẩu mới có độ dài từ 8 ký tự trở lên - Valid
    - E9: Mật khẩu mới có độ dài ít hơn 8 ký tự - Invalid
    - E10: Mật khẩu mới có chứa ít nhất 1 chữ cái in hoa (A-Z) - Valid
    - E11: Mật khẩu mới không chứa bất kỳ chữ cái in hoa nào - Invalid
    - E12: Mật khẩu mới có chứa ít nhất 1 chữ cái in thường (a-z) - Valid
    - E13: Mật khẩu mới không chứa bất kỳ chữ cái in thường nào - Invalid
    - E14: Mật khẩu mới có chứa ít nhất 1 chữ số (0-9) - Valid
    - E15: Mật khẩu mới không chứa bất kỳ chữ số nào - Invalid
    - E16: Mật khẩu mới có chứa ít nhất 1 ký tự đặc biệt thuộc tập hợp (@, $, !, %, *, ?, &) - Valid
    - E17: Mật khẩu mới không chứa bất kỳ ký tự đặc biệt nào thuộc tập hợp cho phép - Invalid
    - E18: Chuỗi ký tự ở Xác nhận mật khẩu mới trùng khớp hoàn toàn với Mật khẩu mới - Valid
    - E19: Chuỗi ký tự ở Xác nhận mật khẩu mới khác với Mật khẩu mới - Invalid

#### Test data
- Bước 1: Yêu cầu OTP (Quên mật khẩu)

| Test Case ID | Email | Output | Covered Classes |
| --- | --- | --- | --- |
| TC1 | *(Nhập đúng email đã đăng ký)* | Hệ thống gửi OTP thành công và chuyển sang giao diện Bước 2 | E1, E4 |
| TC2 | `user_validgmail.com` | Hệ thống báo lỗi định dạng email không hợp lệ | E2 |
| TC3 | *(Để trống)* | Hệ thống báo lỗi không được để trống trường email | E3 |
| TC4 | *(Nhập email chưa được đăng ký)* | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống | E5 |

- Bước 2: Đặt lại mật khẩu

| Test Case ID | OTP | Mật khẩu mới | Xác nhận mật khẩu mới | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- |
| TC1 | *(Nhập đúng mã OTP)* | `StrongP@ss1` | `StrongP@ss1` | Đặt lại mật khẩu thành công và hiển thị thông báo | E6, E8, E10, E12, E14, E16, E18 |
| TC2 | *(Nhập sai mã OTP)* | `StrongP@ss1` | `StrongP@ss1` | Hệ thống báo lỗi mã OTP không hợp lệ hoặc không chính xác | E7 |
| TC3 | *(Nhập đúng mã OTP)* | `P@ss123` | `P@ss123` | Hệ thống báo lỗi mật khẩu mới phải từ 8 ký tự trở lên | E9 |
| TC4 | *(Nhập đúng mã OTP)* | `strongp@ss1` | `strongp@ss1` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | E11 |
| TC5 | *(Nhập đúng mã OTP)* | `STRONGP@SS1` | `STRONGP@SS1` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | E13 |
| TC6 | *(Nhập đúng mã OTP)* | `StrongP@ss` | `StrongP@ss` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | E15 |
| TC7 | *(Nhập đúng mã OTP)* | `StrongPass1` | `StrongPass1` | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt | E17 |
| TC8 | *(Nhập đúng mã OTP)* | `StrongP@ss1` | `WrongP@ss99` | Hệ thống báo lỗi mật khẩu xác nhận không trùng khớp | E19 |

### Boundary Value Analysis (BVA)

#### Xác định biên
- B1 (min): Mật khẩu mới có độ dài 8 ký tự - Valid
- B2 (min-1): Mật khẩu mới có độ dài 7 ký tự - Invalid
- B3 (min+1): Mật khẩu mới có độ dài 9 ký tự - Valid
- B4 (min): Mật khẩu mới chứa 1 chữ cái in hoa - Valid
- B5 (min-1): Mật khẩu mới chứa 0 chữ cái in hoa - Invalid
- B6 (min+1): Mật khẩu mới chứa 2 chữ cái in hoa - Valid
- B7 (min): Mật khẩu mới chứa 1 chữ cái in thường - Valid
- B8 (min-1): Mật khẩu mới chứa 0 chữ cái in thường - Invalid
- B9 (min+1): Mật khẩu mới chứa 2 chữ cái in thường - Valid
- B10 (min): Mật khẩu mới chứa 1 chữ số - Valid
- B11 (min-1): Mật khẩu mới chứa 0 chữ số - Invalid
- B12 (min+1): Mật khẩu mới chứa 2 chữ số - Valid
- B13 (min): Mật khẩu mới chứa 1 ký tự đặc biệt - Valid
- B14 (min-1): Mật khẩu mới chứa 0 ký tự đặc biệt - Invalid
- B15 (min+1): Mật khẩu mới chứa 2 ký tự đặc biệt - Valid

#### Test data
| Test Case ID | OTP | Mật khẩu mới | Xác nhận mật khẩu mới | Output | Covered Boundary Values |
| --- | --- | --- | --- | --- | --- |
| TC1 | `123456` | `Aaaaaaa1!` | `Aaaaaaa1!` | Đặt lại mật khẩu thành công | B1 |
| TC2 | `123456` | `Aaaaaaaa1!` | `Aaaaaaaa1!` | Đặt lại mật khẩu thành công | B3 |
| TC3 | `123456` | `Aaaaaaaaa1!` | `Aaaaaaaaa1!` | Đặt lại mật khẩu thành công | B4 |
| TC4 | `123456` | `AAaaaaaaa1!` | `AAaaaaaaa1!` | Đặt lại mật khẩu thành công | B6 |
| TC5 | `123456` | `AAAAAAAAa1!` | `AAAAAAAAa1!` | Đặt lại mật khẩu thành công | B7 |
| TC6 | `123456` | `AAAAAAAAaa1!` | `AAAAAAAAaa1!` | Đặt lại mật khẩu thành công | B9 |
| TC7 | `123456` | `AAAAAAAAa1!` | `AAAAAAAAa1!` | Đặt lại mật khẩu thành công | B10 |
| TC8 | `123456` | `AAAAAAAAa12!` | `AAAAAAAAa12!` | Đặt lại mật khẩu thành công | B12 |
| TC9 | `123456` | `AAAAAAAAa1!` | `AAAAAAAAa1!` | Đặt lại mật khẩu thành công | B13 |
| TC10 | `123456` | `AAAAAAAAa1!@` | `AAAAAAAAa1!@` | Đặt lại mật khẩu thành công | B15 |
| TC11 | `123456` | `Aaaaaa1!` | `Aaaaaa1!` | Hệ thống báo lỗi mật khẩu mới phải từ 8 ký tự trở lên | B2 |
| TC12 | `123456` | `aaaaaaaa1!` | `aaaaaaaa1!` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | B5 |
| TC13 | `123456` | `AAAAAAAA1!` | `AAAAAAAA1!` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | B8 |
| TC14 | `123456` | `AAAAAAAAa!` | `AAAAAAAAa!` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | B11 |
| TC15 | `123456` | `AAAAAAAAa1` | `AAAAAAAAa1` | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt | B14 |

### Final Test Suite (Test Execution)

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | Kiểm tra yêu cầu OTP thành công với email hợp lệ (E1, E4) | Email: `validuser@gmail.com` (đã đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống gửi OTP thành công và chuyển sang giao diện Bước 2. | | |
| TC2 | Kiểm tra lỗi định dạng email không hợp lệ (E2) | Email: `user_validgmail.com` | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi định dạng email không hợp lệ. | | |
| TC3 | Kiểm tra lỗi bỏ trống email (E3) | Email: *(Để trống)* | 1. Để trống email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi không được để trống trường email. | | |
| TC4 | Kiểm tra lỗi email chưa được đăng ký (E5) | Email: `unknown@gmail.com` (chưa đăng ký) | 1. Nhập email.<br>2. Bấm "Yêu cầu OTP". | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống. | | |
| TC5 | Kiểm tra đặt lại mật khẩu thành công với độ dài tối thiểu 8 ký tự (B1) | OTP: Đúng<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập OTP.<br>2. Nhập MK mới và Xác nhận MK.<br>3. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công và hiển thị thông báo. | | |
| TC6 | Kiểm tra đặt lại mật khẩu thành công với độ dài 9 ký tự (B3) | OTP: Đúng<br>MK mới: `Aaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công và hiển thị thông báo. | | |
| TC7 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ hoa (B4) | OTP: Đúng<br>MK mới: `Aaaaaaaaa1!`<br>Xác nhận MK: `Aaaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC8 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ hoa (B6) | OTP: Đúng<br>MK mới: `AAaaaaaaa1!`<br>Xác nhận MK: `AAaaaaaaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC9 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ thường (B7) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC10 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ thường (B9) | OTP: Đúng<br>MK mới: `AAAAAAAAaa1!`<br>Xác nhận MK: `AAAAAAAAaa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC11 | Kiểm tra đặt lại mật khẩu thành công với 1 chữ số (B10) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC12 | Kiểm tra đặt lại mật khẩu thành công với 2 chữ số (B12) | OTP: Đúng<br>MK mới: `AAAAAAAAa12!`<br>Xác nhận MK: `AAAAAAAAa12!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC13 | Kiểm tra đặt lại mật khẩu thành công với 1 ký tự đặc biệt (B13) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!`<br>Xác nhận MK: `AAAAAAAAa1!` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC14 | Kiểm tra đặt lại mật khẩu thành công với 2 ký tự đặc biệt (B15) | OTP: Đúng<br>MK mới: `AAAAAAAAa1!@`<br>Xác nhận MK: `AAAAAAAAa1!@` | 1. Nhập thông tin hợp lệ.<br>2. Bấm "Đặt lại mật khẩu". | Đặt lại mật khẩu thành công. | | |
| TC15 | Kiểm tra lỗi nhập sai mã OTP (E7) | OTP: Sai mã<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `Aaaaaaa1!` | 1. Nhập OTP sai.<br>2. Nhập MK hợp lệ.<br>3. Bấm "Đặt lại mật khẩu". | Hệ thống báo lỗi mã OTP không hợp lệ hoặc không chính xác. | | |
| TC16 | Kiểm tra lỗi xác nhận mật khẩu không khớp (E19) | OTP: Đúng<br>MK mới: `Aaaaaaa1!`<br>Xác nhận MK: `WrongP@ss99` | 1. Nhập OTP đúng.<br>2. Nhập MK và Xác nhận MK khác nhau.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu xác nhận không trùng khớp. | | |
| TC17 | Kiểm tra lỗi mật khẩu ngắn hơn 8 ký tự (E9, B2) | OTP: Đúng<br>MK mới: `Aaaaaa1!` (7 ký tự)<br>Xác nhận MK: `Aaaaaa1!` | 1. Nhập OTP đúng.<br>2. Nhập MK 7 ký tự.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu mới phải từ 8 ký tự trở lên. | | |
| TC18 | Kiểm tra lỗi mật khẩu thiếu chữ hoa (E11, B5) | OTP: Đúng<br>MK mới: `aaaaaaaa1!`<br>Xác nhận MK: `aaaaaaaa1!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có chữ hoa.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa. | | |
| TC19 | Kiểm tra lỗi mật khẩu thiếu chữ thường (E13, B8) | OTP: Đúng<br>MK mới: `AAAAAAAA1!`<br>Xác nhận MK: `AAAAAAAA1!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có chữ thường.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường. | | |
| TC20 | Kiểm tra lỗi mật khẩu thiếu chữ số (E15, B11) | OTP: Đúng<br>MK mới: `AAAAAAAAa!`<br>Xác nhận MK: `AAAAAAAAa!` | 1. Nhập OTP đúng.<br>2. Nhập MK không có số.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số. | | |
| TC21 | Kiểm tra lỗi mật khẩu thiếu ký tự đặc biệt (E17, B14) | OTP: Đúng<br>MK mới: `AAAAAAAAa1`<br>Xác nhận MK: `AAAAAAAAa1` | 1. Nhập OTP đúng.<br>2. Nhập MK không có KTĐB.<br>3. Bấm "Đặt lại". | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt. | | |

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

### Equivalence Partitioning
#### Điều kiện:
- C1: Chuyển đổi trạng thái từ pending => confirmed khi Admin xác nhận.
- C2: Chuyển đổi trạng thái từ confirmed => shipping khi Admin giao hàng.
- C3: Chuyển đổi trạng thái từ shipping => delivered khi Admin hoàn tất.
- C4: Chuyển đổi trạng thái từ pending => canceled khi User/Admin hủy.
- C5: Chuyển đổi trạng thái từ confirmed => canceled khi User/Admin hủy.
- C6: Chuyển đổi trạng thái từ shipping => canceled khi Admin hủy.
- C7: Đơn hàng ở trạng thái delivered là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.
- C8: Đơn hàng ở trạng thái canceled là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.

#### Equivalence Classes
- E1: Trạng thái hiện tại là pending, người thực hiện là Admin yêu cầu chuyển sang confirmed - Valid
- E2: Trạng thái hiện tại là pending, người thực hiện là User yêu cầu chuyển sang confirmed - Invalid
- E3: Trạng thái hiện tại là confirmed, người thực hiện là Admin yêu cầu chuyển sang shipping - Valid
- E4: Trạng thái hiện tại là confirmed, người thực hiện là User yêu cầu chuyển sang shipping - Invalid
- E5: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang delivered - Valid
- E6: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang delivered - Invalid
- E7: Trạng thái hiện tại là pending, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E8: Trạng thái hiện tại là confirmed, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E9: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang canceled - Valid
- E10: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang canceled - Invalid
- E11: Trạng thái hiện tại là delivered, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid
- E12: Trạng thái hiện tại là canceled, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid


#### Test data
| Test Case ID | Role (Vai trò) | Thao tác | Current State (Trạng thái hiện tại) | Target State (Yêu cầu chuyển) | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | `Admin` | Xác nhận | `pending` | `confirmed` | Đơn hàng chuyển sang `confirmed` thành công | E1 |
| TC2 | `User` | Xác nhận | `pending` | `confirmed` | Báo lỗi không có quyền thay đổi trạng thái | E2 |
| TC3 | `Admin` | Giao hàng | `confirmed` | `shipping` | Đơn hàng chuyển sang `shipping` thành công | E3 |
| TC4 | `User` | Giao hàng | `confirmed` | `shipping` | Báo lỗi không có quyền thay đổi trạng thái | E4 |
| TC5 | `Admin` | Hoàn tất | `shipping` | `delivered` | Đơn hàng chuyển sang `delivered` thành công | E5 |
| TC6 | `User` | Hoàn tất | `shipping` | `delivered` | Báo lỗi không có quyền thay đổi trạng thái | E6 |
| TC7 | `User` | Hủy | `pending` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E7 |
| TC8 | `Admin` | Hủy | `confirmed` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E8 |
| TC9 | `Admin` | Hủy | `shipping` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E9 |
| TC10 | `User` | Hủy | `shipping` | `canceled` | Báo lỗi User không được phép hủy khi đang giao hàng | E10 |
| TC11 | `User` | Hủy | `delivered` | `canceled` | Báo lỗi không thể thay đổi từ trạng thái kết thúc | E11 |

**Ghi chú**: Tính năng này không tồn tại biến dạng số liên tục nên không tồn tại test case trong phần boundary value analysis.

### Test case

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra Admin xác nhận đơn hàng từ `pending` sang `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Xác nhận | Đơn hàng chuyển sang `confirmed` thành công | | |
| TC2 | Kiểm tra User không có quyền xác nhận đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Xác nhận | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Xác nhận | Báo lỗi không có quyền thay đổi trạng thái | | |
| TC3 | Kiểm tra Admin giao hàng từ `confirmed` sang `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Giao hàng | Đơn hàng chuyển sang `shipping` thành công | | |
| TC4 | Kiểm tra User không có quyền giao hàng đối với đơn `confirmed` | Vai trò: `User`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Giao hàng | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Giao hàng | Báo lỗi không có quyền thay đổi trạng thái | | |
| TC5 | Kiểm tra Admin hoàn tất đơn hàng từ `shipping` sang `delivered` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hoàn tất | Đơn hàng chuyển sang `delivered` thành công | | |
| TC6 | Kiểm tra User không có quyền hoàn tất đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hoàn tất | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hoàn tất | Báo lỗi không có quyền thay đổi trạng thái | | |
| TC7 | Kiểm tra User hủy đơn hàng `pending` | Vai trò: `User`<br>Trạng thái hiện tại: `pending`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `pending`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | | |
| TC8 | Kiểm tra Admin hủy đơn hàng `confirmed` | Vai trò: `Admin`<br>Trạng thái hiện tại: `confirmed`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `confirmed`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | | |
| TC9 | Kiểm tra Admin hủy đơn hàng `shipping` | Vai trò: `Admin`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền Admin<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Đơn hàng chuyển sang `canceled` thành công | | |
| TC10 | Kiểm tra User không có quyền hủy đơn hàng `shipping` | Vai trò: `User`<br>Trạng thái hiện tại: `shipping`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `shipping`<br>3. Thực hiện thao tác Hủy | Báo lỗi User không được phép hủy khi đang giao hàng | | |
| TC11 | Kiểm tra không thể hủy đơn hàng từ trạng thái kết thúc | Vai trò: `User`<br>Trạng thái hiện tại: `delivered`<br>Thao tác: Hủy | 1. Đăng nhập với quyền User<br>2. Chọn đơn hàng đang ở trạng thái `delivered`<br>3. Thực hiện thao tác Hủy | Báo lỗi không thể thay đổi từ trạng thái kết thúc | | |

## 2.3 Tính năng 14 - Pool C: Quản lý Danh mục
### Mô tả: 
- Admin có thể Thêm / Xem / Xóa danh mục.
- Tên danh mục là bắt buộc, không được để trống.

### Equivalence Partitioning
#### Điều kiện:
- C1:  Người thực hiện các thao tác (thêm, xóa, xem chi tiết) có vai trò là Admin.
- C2: Tên danh mục không được để trống.

#### Equivalence Classes
- Thêm danh mục: 
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Tên danh mục bị để trống - Invalid
    - E4: Tên danh mục đã tồn tại trong hệ thống - Invalid
    - E5: Tên danh mục chưa tồn tại trong hệ thống - Valid
- Xóa danh mục: 
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Danh mục cần xóa đã tồn tại trong hệ thống - Valid
    - E4: Danh mục cần xóa chưa tồn tại trong hệ thống - Invalid
- Xem chi tiết danh mục:
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Danh mục cần xem đã tồn tại trong hệ thống - Valid
    - E4: Danh mục cần xem chưa tồn tại trong hệ thống - Invalid

#### Test data
- Thêm danh mục

| Test Case ID | Vai trò (Role) | Tên danh mục (Category Name) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(chưa tồn tại)* | Thêm danh mục thành công và hiển thị trên danh sách. | E1, E5 |
| TC2 | `User` | *(chưa tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(Để trống)* | Báo lỗi tên danh mục là bắt buộc, không được để trống. | E3 |
| TC4 | `Admin` | *(đã tồn tại)* | Báo lỗi tên danh mục đã tồn tại trong hệ thống. | E4 |

- Xóa danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(đã tồn tại)* | Xóa danh mục thành công và loại bỏ khỏi hệ thống. | E1, E3 |
| TC2 | `User` | *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục cần xóa. | E4 |

- Xem chi tiết danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(đã tồn tại)* | Hiển thị thông tin chi tiết của danh mục tương ứng. | E1, E3 |
| TC2 | `User` | *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục yêu cầu. | E4 |

**Ghi chú**: Tính năng này không tồn tại biến dạng số liên tục nên không tồn tại test case trong phần boundary value analysis.

### Test case

| Test Case ID | Mục tiêu | Đầu vào | Các bước thực hiện | Kết quả mong đợi | Thực tế | Verdict |
|---|---|---|---|---|---|---|
| TC1 | Kiểm tra Thêm danh mục thành công với quyền Admin (E1, E5) | Vai trò: `Admin`<br>Tên danh mục: Tên mới (chưa tồn tại) | 1. Đăng nhập với quyền Admin<br>2. Nhập tên danh mục hợp lệ<br>3. Bấm Thêm | Thêm danh mục thành công và hiển thị trên danh sách. | | |
| TC2 | Kiểm tra lỗi Thêm danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Tên danh mục: Tên mới (chưa tồn tại) | 1. Đăng nhập với quyền User<br>2. Thử thao tác Thêm danh mục | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | | |
| TC3 | Kiểm tra lỗi Thêm danh mục khi để trống tên (E3) | Vai trò: `Admin`<br>Tên danh mục: *(Để trống)* | 1. Đăng nhập với quyền Admin<br>2. Để trống tên danh mục<br>3. Bấm Thêm | Báo lỗi tên danh mục là bắt buộc, không được để trống. | | |
| TC4 | Kiểm tra lỗi Thêm danh mục với tên đã tồn tại (E4) | Vai trò: `Admin`<br>Tên danh mục: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Nhập tên danh mục đã có trong hệ thống<br>3. Bấm Thêm | Báo lỗi tên danh mục đã tồn tại trong hệ thống. | | |
| TC5 | Kiểm tra Xóa danh mục thành công với quyền Admin (E1, E3) | Vai trò: `Admin`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Chọn một danh mục có sẵn<br>3. Bấm Xóa | Xóa danh mục thành công và loại bỏ khỏi hệ thống. | | |
| TC6 | Kiểm tra lỗi Xóa danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền User<br>2. Thử thao tác Xóa danh mục | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | | |
| TC7 | Kiểm tra lỗi Xóa danh mục không tồn tại (E4) | Vai trò: `Admin`<br>Danh mục mục tiêu: Chưa tồn tại | 1. Đăng nhập với quyền Admin<br>2. Nhập ID/thao tác xóa danh mục không có thực | Báo lỗi không tìm thấy danh mục cần xóa. | | |
| TC8 | Kiểm tra Xem chi tiết danh mục thành công với quyền Admin (E1, E3) | Vai trò: `Admin`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền Admin<br>2. Chọn một danh mục có sẵn<br>3. Bấm Xem chi tiết | Hiển thị thông tin chi tiết của danh mục tương ứng. | | |
| TC9 | Kiểm tra lỗi Xem chi tiết danh mục khi không có quyền Admin (E2) | Vai trò: `User`<br>Danh mục mục tiêu: Đã tồn tại | 1. Đăng nhập với quyền User<br>2. Thử thao tác Xem chi tiết danh mục | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | | |
| TC10 | Kiểm tra lỗi Xem chi tiết danh mục không tồn tại (E4) | Vai trò: `Admin`<br>Danh mục mục tiêu: Chưa tồn tại | 1. Đăng nhập với quyền Admin<br>2. Nhập ID/thao tác xem danh mục không có thực | Báo lỗi không tìm thấy danh mục yêu cầu. | | |


## 2.4 Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản
### Mô tả:
- Người dùng phải cung cấp: Họ Tên, Email, Mật khẩu.
- Email phải có định dạng hợp lệ (user@domain.com) và là duy nhất trong hệ thống.
- Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (@, $, !, %, *, ?, &).
- Phải có trường Xác nhận mật khẩu — hệ thống từ chối nếu hai trường không khớp.
- Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập.

### Equivalence Partitioning
#### Điều kiện:
- C1: Họ tên không được để trống
- C2: Email đúng định dạng hợp lệ (ví dụ: user@domain.com)
- C3: Email là duy nhất trong hệ thống (chưa từng được đăng ký)
- C4: Mật khẩu có độ dài >= 8 ký tự
- C5: Mật khẩu chứa ít nhất 1 chữ hoa
- C6: Mật khẩu chứa ít nhất 1 chữ thường
- C7: Mật khẩu chứa ít nhất 1 chữ số
- C8: Mật khẩu chứa ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &)
- C9: Xác nhận mật khẩu khớp hoàn toàn với trường Mật khẩu

#### Equivalence Classes
- E1: Chuỗi họ tên có chứa ký tự hợp lệ (không bị để trống) - Valid
- E2: Chuỗi họ tên bị để trống (chuỗi rỗng, null hoặc chỉ chứa khoảng trắng) - Invalid
- E3: Chuỗi email đúng định dạng chuẩn (chứa phần local, ký tự '@', và tên miền hợp lệ) - Valid
- E4: Chuỗi email sai định dạng chuẩn (thiếu '@', thiếu tên miền, sai cấu trúc) - Invalid
- E5: Email chưa từng tồn tại trong cơ sở dữ liệu của hệ thống - Valid
- E6: Email đã được đăng ký và tồn tại trong cơ sở dữ liệu của hệ thống - Invalid
- E7: Mật khẩu có độ dài từ 8 ký tự trở lên - Valid
- E8: Mật khẩu có độ dài nhỏ hơn 8 ký tự - Invalid
- E9: Mật khẩu có chứa ít nhất 1 chữ cái in hoa (A-Z) - Valid
- E10: Mật khẩu không chứa bất kỳ chữ cái in hoa nào - Invalid
- E11: Mật khẩu có chứa ít nhất 1 chữ cái in thường (a-z) - Valid
- E12: Mật khẩu không chứa bất kỳ chữ cái in thường nào - Invalid
- E13: Mật khẩu có chứa ít nhất 1 chữ số (0-9) - Valid
- E14: Mật khẩu không chứa bất kỳ chữ số nào - Invalid
- E15: Mật khẩu có chứa ít nhất 1 ký tự đặc biệt thuộc tập hợp quy định (@, $, !, %, *, ?, &) - Valid
- E16: Mật khẩu không chứa bất kỳ ký tự đặc biệt nào thuộc tập hợp quy định - Invalid
- E17: Chuỗi ký tự trong trường Xác nhận mật khẩu trùng khớp hoàn toàn với trường Mật khẩu - Valid
- E18: Chuỗi ký tự trong trường Xác nhận mật khẩu khác biệt (không khớp) với trường Mật khẩu - Invalid

#### Test data
| Test Case ID | Họ tên | Email | Mật khẩu | Xác nhận mật khẩu | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Đăng ký thành công và chuyển tới trang Đăng nhập | E1, E3, E5, E7, E9, E11, E13, E15, E17 |
| TC2 | *(Để trống)* | `newuser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi họ tên không được để trống | E2 |
| TC3 | `Nguyen Van A` | `newusergmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi định dạng email không hợp lệ | E4 |
| TC4 | `Nguyen Van A` | `existeduser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi email đã được đăng ký trong hệ thống | E6 |
| TC5 | `Nguyen Van A` | `newuser@gmail.com` | `P@ss123` | `P@ss123` | Báo lỗi mật khẩu phải có độ dài từ 8 ký tự trở lên | E8 |
| TC6 | `Nguyen Van A` | `newuser@gmail.com` | `strongp@ss1` | `strongp@ss1` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | E10 |
| TC7 | `Nguyen Van A` | `newuser@gmail.com` | `STRONGP@SS1` | `STRONGP@SS1` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | E12 |
| TC8 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss` | `StrongP@ss` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | E14 |
| TC9 | `Nguyen Van A` | `newuser@gmail.com` | `StrongPass1` | `StrongPass1` | Báo lỗi mật khẩu phải chứa ký tự đặc biệt | E16 |
| TC10 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss1` | `WrongP@ss99` | Báo lỗi xác nhận mật khẩu không khớp | E18 |

### Boundary Value Analysis (BVA)

#### Xác định biên
- B1 (min): Mật khẩu có độ dài 8 ký tự - Valid
- B2 (min-1): Mật khẩu có độ dài 7 ký tự - Invalid
- B3 (min+1): Mật khẩu có độ dài 9 ký tự - Valid
- B4 (min): Mật khẩu chứa 1 chữ cái in hoa - Valid
- B5 (min-1): Mật khẩu chứa 0 chữ cái in hoa - Invalid
- B6 (min+1): Mật khẩu chứa 2 chữ cái in hoa - Valid
- B7 (min): Mật khẩu chứa 1 chữ cái in thường - Valid
- B8 (min-1): Mật khẩu chứa 0 chữ cái in thường - Invalid
- B9 (min+1): Mật khẩu chứa 2 chữ cái in thường - Valid
- B10 (min): Mật khẩu chứa 1 chữ số - Valid
- B11 (min-1): Mật khẩu chứa 0 chữ số - Invalid
- B12 (min+1): Mật khẩu chứa 2 chữ số - Valid
- B13 (min): Mật khẩu chứa 1 ký tự đặc biệt - Valid
- B14 (min-1): Mật khẩu chứa 0 ký tự đặc biệt - Invalid
- B15 (min+1): Mật khẩu chứa 2 ký tự đặc biệt - Valid

#### Test data
| Test Case ID | Họ tên | Email | Mật khẩu | Xác nhận mật khẩu | Output | Covered Boundary Values |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | `Nguyen Van A` | `validuser@gmail.com` | `Aaaaaaa1!` | `Aaaaaaa1!` | Đăng ký thành công | B1 |
| TC2 | `Nguyen Van A` | `validuser@gmail.com` | `Aaaaaaaa1!` | `Aaaaaaaa1!` | Đăng ký thành công | B3 |
| TC3 | `Nguyen Van A` | `validuser@gmail.com` | `Aaaaaaaa12!@` | `Aaaaaaaa12!@` | Đăng ký thành công | B4 |
| TC4 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa12!@` | `AAaaaaaa12!@` | Đăng ký thành công | B6 |
| TC5 | `Nguyen Van A` | `validuser@gmail.com` | `AAAAAAAAa1!@` | `AAAAAAAAa1!@` | Đăng ký thành công | B7 |
| TC6 | `Nguyen Van A` | `validuser@gmail.com` | `AAAAAAAAaa1!` | `AAAAAAAAaa1!` | Đăng ký thành công | B9 |
| TC7 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa1!@#` | `AAaaaaaa1!@#` | Đăng ký thành công | B10 |
| TC8 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa12!@` | `AAaaaaaa12!@` | Đăng ký thành công | B12 |
| TC9 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa123!` | `AAaaaaaa123!` | Đăng ký thành công | B13 |
| TC10 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa12!@` | `AAaaaaaa12!@` | Đăng ký thành công | B15 |
| TC11 | `Nguyen Van A` | `validuser@gmail.com` | `Aaaaaa1!` | `Aaaaaa1!` | Hệ thống báo lỗi mật khẩu phải từ 8 ký tự trở lên | B2 |
| TC12 | `Nguyen Van A` | `validuser@gmail.com` | `aaaaaaaa12!@` | `aaaaaaaa12!@` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | B5 |
| TC13 | `Nguyen Van A` | `validuser@gmail.com` | `AAAAAAAA12!@` | `AAAAAAAA12!@` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | B8 |
| TC14 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa!@#$` | `AAaaaaaa!@#$` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | B11 |
| TC15 | `Nguyen Van A` | `validuser@gmail.com` | `AAaaaaaa1234` | `AAaaaaaa1234` | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt | B14 |

# 3. Test Summary Report
