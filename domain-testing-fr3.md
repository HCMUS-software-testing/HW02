
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
