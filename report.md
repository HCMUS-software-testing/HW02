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
**Bước 1: Yêu cầu OTP (Quên mật khẩu)**

| Test Case ID | Email | Output | Covered Classes |
| --- | --- | --- | --- |
| TC1 | *(Nhập đúng email đã đăng ký)* | Hệ thống gửi OTP thành công và chuyển sang giao diện Bước 2 | E1, E4 |
| TC2 | `user_validgmail.com` | Hệ thống báo lỗi định dạng email không hợp lệ | E2 |
| TC3 | *(Để trống)* | Hệ thống báo lỗi không được để trống trường email | E3 |
| TC4 | *(Nhập email chưa được đăng ký)* | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống | E5 |

**Bước 2: Đặt lại mật khẩu**

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

### Boundary Value Analysis (BVA)

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
    - E3: Tên danh mục không bị để trống - Valid
    - E4: Tên danh mục bị để trống - Invalid
- Xóa danh mục: 
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
- Xem chi tiết danh mục:
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
#### Test data

### Boundary Value Analysis (BVA)

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

### Boundary Value Analysis (BVA)

# 3. Test Summary Report
