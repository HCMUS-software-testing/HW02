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

#### Test data

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

#### Test data

### Boundary Value Analysis (BVA)

# 3. Test Summary Report
