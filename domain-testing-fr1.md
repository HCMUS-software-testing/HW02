
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