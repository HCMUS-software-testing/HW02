# FR-03: Quên mật khẩu & Đặt lại mật khẩu Mobile - Domain Testing

Thư mục này chia `FR-03: Forgot password and password reset (two steps)` cho phân hệ Mobile thành các chức năng nhỏ để thiết kế Domain Testing dễ rà soát:

| File | Chức năng nhỏ | Giao diện/API chính |
| --- | --- | --- |
| `FR-03_mobile-forgot-password-request-otp_domain_testing.md` | Bước 1: người dùng nhập email đã đăng ký để lấy OTP. | Mobile App màn hình Quên mật khẩu; `POST /api/forgot-password` |
| `FR-03_mobile-reset-password_domain_testing.md` | Bước 2: người dùng nhập OTP, mật khẩu mới và xác nhận mật khẩu mới. | Mobile App màn hình Đặt lại mật khẩu; `POST /api/reset-password` |

Các artifact được thiết kế từ nguồn black-box: `requirements/2026.HW02.Domain Testing_En.md`, `eshop-sut/README.md`, và `eshop-sut/api_specification.md`. Không sử dụng mã nguồn triển khai làm oracle.

