# HW02 - Domain Testing Main Report

## 1. Thông tin bài nộp

| Thuộc tính | Nội dung |
| --- | --- |
| Mã bài tập | HW02 - Domain Testing |
| Hệ thống kiểm thử | EShop - Vietnamese e-commerce demo application |
| Họ tên | Lê TRung Kiên |
| MSSV | 23127075 |
| Thư mục bài nộp | `23127075_HW02_AI_DomainTesting_100/` |
| Báo cáo chính | `report/main.md` |
| Kỹ thuật áp dụng | Domain Testing, Equivalence Partitioning, Boundary Value Analysis |
| Trạng thái | Đã tổng hợp artifact Markdown/PDF, bug report và nội dung GitHub Issues |

## 2. Phạm vi feature đã chọn

| Pool | Feature | Phạm vi kiểm thử chính | Artifact |
| --- | --- | --- | --- |
| Pool A | FR-01 - Account registration | Đăng ký tài khoản trên Web/API, điều kiện dữ liệu tài khoản và mật khẩu | [Xem chi tiết](#fr-01---account-registration) |
| Pool B | FR-07 - Shopping cart | Thêm, xem, cập nhật, xóa sản phẩm và tiếp tục mua sắm từ giỏ hàng | [Xem chi tiết](#fr-07---shopping-cart) |
| Pool C | FR-18 - Order management (admin) | Danh sách đơn hàng, cập nhật trạng thái, hiển thị an toàn địa chỉ giao hàng | [Xem chi tiết](#fr-18---order-management-admin) |
| Pool D | FR-03 - Forgot password and password reset (Mobile) | Gửi OTP quên mật khẩu và đặt lại mật khẩu trên Mobile/API | [Xem chi tiết](#fr-03---reset-password-mobile) |

## 3. Cách đọc báo cáo

Mỗi artifact domain testing bên dưới đã bao gồm đầy đủ các phần phân tích:

- Chức năng kiểm thử, phạm vi, giả định và trạng thái thực thi.
- Phân hoạch tương đương: đầu vào/đầu ra, điều kiện, lớp tương đương và ca kiểm thử EP.
- Phân tích giá trị biên: miền có thể phân tích biên, giá trị biên/cận biên và ca kiểm thử BVA.
- Ghi chú rủi ro hoặc điểm mơ hồ cần rà soát thủ công.

Các đường dẫn trong báo cáo này là đường dẫn tương đối từ thư mục `report/`.

## 4. Bảng traceability theo yêu cầu HW02

| Yêu cầu trong `requirements/2026.HW02.Domain Testing_En.md` | Artifact đáp ứng |
| --- | --- |
| Chọn 4 feature, mỗi pool 1 feature | [Phạm vi feature đã chọn](#2-phạm-vi-feature-đã-chọn) |
| Domain Testing cho từng feature | Các file Markdown trong [FR-01](#fr-01---account-registration), [FR-07](#fr-07---shopping-cart), [FR-18](#fr-18---order-management-admin), [FR-03](#fr-03---reset-password-mobile) |
| Boundary Value Analysis cho từng feature | Section `## 3. Phân tích giá trị biên` trong từng artifact domain testing |
| Bug reporting trong Markdown | [bug_report.md](bug_report.md) |
| Nội dung để tạo GitHub Issues | [gh_issues.md](gh_issues.md) |
| AI Critique 200-300 words | [ai_critique.md](ai_critique.md) |
| AI Audit Report mandatory appendix | [ai_audit_report.md](ai_audit_report.md) |

## 5. Tổng quan artifact và lỗi phát hiện

| Feature | Số artifact domain testing | Lỗi đã ghi nhận | Khoảng BUG ID |
| --- | ---: | ---: | --- |
| FR-01 - Account registration | 1 | 6 | `BUG-FR01-01` - `BUG-FR01-06` |
| FR-03 - Reset password mobile | 2 | 4 | `BUG-FR03-01` - `BUG-FR03-04` |
| FR-07 - Shopping cart | 5 | 11 | `BUG-FR07-01` - `BUG-FR07-11` |
| FR-18 - Order management admin | 3 | 3 | `BUG-FR18-01` - `BUG-FR18-03` |
| **Tổng cộng** | **11** | **24** | `BUG-FR01-01` - `BUG-FR03-04` |

## 6. Domain Testing Artifacts

### FR-01 - Account Registration

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Đăng ký tài khoản | [FR-01_account_registration_domain_testing.md](../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md) | [FR-01_account_registration_domain_testing.pdf](../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.pdf) | `BUG-FR01-01` - `BUG-FR01-06` |

### FR-03 - Reset Password Mobile

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Mobile forgot password - request OTP | [FR-03_mobile-forgot-password-request-otp_domain_testing.md](../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.md) | [FR-03_mobile-forgot-password-request-otp_domain_testing.pdf](../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.pdf) | `BUG-FR03-01`, `BUG-FR03-02` |
| Mobile reset password | [FR-03_mobile-reset-password_domain_testing.md](../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md) | [FR-03_mobile-reset-password_domain_testing.pdf](../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.pdf) | `BUG-FR03-03`, `BUG-FR03-04` |

### FR-07 - Shopping Cart

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Add to cart | [FR-07_shopping-cart_add-to-cart_domain_testing.md](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md) | [FR-07_shopping-cart_add-to-cart_domain_testing.pdf](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.pdf) | `BUG-FR07-01` - `BUG-FR07-04` |
| Update cart quantity | [FR-07_shopping-cart_update-cart-quantity_domain_testing.md](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.md) | [FR-07_shopping-cart_update-cart-quantity_domain_testing.pdf](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.pdf) | `BUG-FR07-05`, `BUG-FR07-06` |
| Remove cart product | [FR-07_shopping-cart_remove-cart-product_domain_testing.md](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.md) | [FR-07_shopping-cart_remove-cart-product_domain_testing.pdf](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.pdf) | `BUG-FR07-09`, `BUG-FR07-10` |
| Get cart product list | [FR-07_shopping-cart_get-cart-product-list_domain_testing.md](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md) | [FR-07_shopping-cart_get-cart-product-list_domain_testing.pdf](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.pdf) | `BUG-FR07-06` - `BUG-FR07-08` |
| Continue shopping from cart | [FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md) | [FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.pdf](../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.pdf) | `BUG-FR07-11` |

### FR-18 - Order Management Admin

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Admin order list | [FR-18_admin-order-list_domain_testing.md](../domain-testing/FR-18_order-management-admin/FR-18_admin-order-list_domain_testing.md) | [FR-18_admin-order-list_domain_testing.pdf](../domain-testing/FR-18_order-management-admin/FR-18_admin-order-list_domain_testing.pdf) | `BUG-FR18-01` |
| Admin order status update | [FR-18_admin-order-status-update_domain_testing.md](../domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.md) | [FR-18_admin-order-status-update_domain_testing.pdf](../domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.pdf) | `BUG-FR18-02` |
| Admin shipping address safe display | [FR-18_admin-shipping-address-safe-display_domain_testing.md](../domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.md) | [FR-18_admin-shipping-address-safe-display_domain_testing.pdf](../domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.pdf) | `BUG-FR18-03` |

## 7. Báo cáo lỗi và GitHub Issues

| Artifact | Đường dẫn | Nội dung |
| --- | --- | --- |
| Báo cáo lỗi Markdown | [bug_report.md](bug_report.md) | Tóm tắt và chi tiết 24 lỗi phát hiện từ các ca Domain Testing/BVA đã thực thi. |
| Nội dung GitHub Issues | [gh_issues.md](gh_issues.md) | Tiêu đề và nội dung Markdown cho từng GitHub issue, tương ứng `BUG-FR01-01` đến `BUG-FR03-04`. |

## 8. Phụ lục bắt buộc

| Phụ lục | Đường dẫn | Ghi chú |
| --- | --- | --- |
| AI Critique | [ai_critique.md](ai_critique.md) | Đoạn critique 200-300 từ theo yêu cầu HW02. |
| AI Audit Report | [ai_audit_report.md](ai_audit_report.md) | Phụ lục bắt buộc theo đề bài; file này chỉ được dẫn link từ báo cáo chính. |

## 9. Ghi chú hoàn thiện

- Các artifact domain testing đã có bản Markdown và PDF để đưa vào gói nộp.
- Bug report đã có bản tổng hợp Markdown và file nội dung issue để đăng lên GitHub Issues.
- Khi xuất bản nộp cuối, cần xuất `report/main.md` sang PDF để đáp ứng yêu cầu `Main report (Markdown + PDF)`.
- Nếu GitHub Issues đã được tạo thật, cập nhật lại trường `Vấn đề GitHub` trong [bug_report.md](bug_report.md) bằng link issue tương ứng.
