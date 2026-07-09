# HW02 - Domain Testing Main Report

## 1. Thông tin bài nộp

| Thuộc tính | Nội dung |
| --- | --- |
| Mã bài tập | HW02 - Domain Testing |
| Hệ thống kiểm thử | EShop - Vietnamese e-commerce demo application |
| Họ tên | Lê Trung Kiên |
| MSSV | 23127075 |
| Thư mục bài nộp | `23127075_HW02_AI_DomainTesting_100/` |
| Báo cáo chính | `main.md` |
| Kỹ thuật áp dụng | Domain Testing, Equivalence Partitioning, Boundary Value Analysis |
| Trạng thái | Đã tổng hợp báo cáo chính dạng Markdown, các PDF thành phần, artifact Domain Testing, bug report, AI appendix, Agent Skill và ảnh minh chứng GitHub Issues; cần xuất thêm PDF cho `main.md` nếu nộp cuối yêu cầu bản PDF báo cáo chính. |

Các đường dẫn trong báo cáo này là đường dẫn tương đối từ thư mục gốc `23127075_HW02_AI_DomainTesting_100/`.

## 2. Phạm vi feature đã chọn

| Pool | Feature | Phạm vi kiểm thử chính | Artifact |
| --- | --- | --- | --- |
| Pool A | FR-01 - Account registration | Đăng ký tài khoản trên Web/API, điều kiện dữ liệu tài khoản và mật khẩu. | [FR-01](#51-fr-01---account-registration) |
| Pool B | FR-07 - Shopping cart | Thêm, xem, cập nhật, xóa sản phẩm và tiếp tục mua sắm từ giỏ hàng. | [FR-07](#53-fr-07---shopping-cart) |
| Pool C | FR-18 - Order management (admin) | Danh sách đơn hàng, cập nhật trạng thái, hiển thị an toàn địa chỉ giao hàng. | [FR-18](#54-fr-18---order-management-admin) |
| Pool D / Mobile App | FR-03 - Forgot password and password reset (Mobile) | Gửi OTP quên mật khẩu và đặt lại mật khẩu trên Mobile/API. | [FR-03](#52-fr-03---reset-password-mobile) |

## 3. Đối chiếu yêu cầu HW02

| Yêu cầu trong `requirements/2026.HW02.Domain Testing_En.md` | Artifact đáp ứng |
| --- | --- |
| Chọn 4 feature, mỗi pool 1 feature | [Phạm vi feature đã chọn](#2-phạm-vi-feature-đã-chọn) |
| Domain Testing cho từng feature | Các file Markdown trong [Domain Testing Artifacts](#5-domain-testing-artifacts) |
| Boundary Value Analysis cho từng feature | Section `## 3. Phân tích giá trị biên` trong từng artifact Domain Testing |
| Bug reporting trong Markdown | [bug_report.md](bug_report.md) và [bug_report.pdf](bug_report.pdf) |
| Ảnh minh chứng GitHub Issues | Thư mục [github_issues/](github_issues/) |
| AI Critique 200-300 words | [ai_critique.md](ai_critique.md) và [ai_critique.pdf](ai_critique.pdf) |
| AI Audit Report mandatory appendix | [ai_audit_report.md](ai_audit_report.md) và [ai_audit_report.pdf](ai_audit_report.pdf) |
| README self-assessment, test summary, demo video | [README.md](README.md) |
| Agent Skill | [.agents/skills/applying-domain-testing/](.agents/skills/applying-domain-testing/) |

## 4. Tổng hợp kết quả kiểm thử

| Feature | Số artifact Domain Testing | Test case thiết kế | Đã thực thi | Đạt | Không đạt | Lỗi đã ghi nhận |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-01 - Account registration | 1 | 51 | 51 | 2 | 49 | 6 |
| FR-03 - Reset password mobile | 2 | 43 | 43 | 10 | 33 | 5 |
| FR-07 - Shopping cart | 5 | 88 | 88 | 17 | 71 | 11 |
| FR-18 - Order management admin | 3 | 45 | 45 | 38 | 7 | 3 |
| **Tổng cộng** | **11** | **227** | **227** | **67** | **160** | **25** |

Chi tiết self-assessment, test summary và video demo được đặt trong [README.md](README.md).

## 5. Domain Testing Artifacts

Mỗi artifact Domain Testing bao gồm: chức năng kiểm thử, đầu vào/đầu ra, điều kiện, lớp tương đương, ca kiểm thử EP, phân tích BVA, kết quả thực tế, trạng thái đạt/không đạt và ghi chú rủi ro.

### 5.1. FR-01 - Account Registration

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Đăng ký tài khoản | [FR-01_account_registration_domain_testing.md](domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md) | [FR-01_account_registration_domain_testing.pdf](domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.pdf) | `BUG-FR01-01` - `BUG-FR01-06` |

### 5.2. FR-03 - Reset Password Mobile

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Mobile forgot password - request OTP | [FR-03_mobile-forgot-password-request-otp_domain_testing.md](domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.md) | [FR-03_mobile-forgot-password-request-otp_domain_testing.pdf](domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.pdf) | `BUG-FR03-01`, `BUG-FR03-02`, `BUG-FR03-05` |
| Mobile reset password | [FR-03_mobile-reset-password_domain_testing.md](domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md) | [FR-03_mobile-reset-password_domain_testing.pdf](domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.pdf) | `BUG-FR03-03`, `BUG-FR03-04` |

### 5.3. FR-07 - Shopping Cart

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Add to cart | [FR-07_shopping-cart_add-to-cart_domain_testing.md](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md) | [FR-07_shopping-cart_add-to-cart_domain_testing.pdf](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.pdf) | `BUG-FR07-01` - `BUG-FR07-04` |
| Update cart quantity | [FR-07_shopping-cart_update-cart-quantity_domain_testing.md](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.md) | [FR-07_shopping-cart_update-cart-quantity_domain_testing.pdf](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.pdf) | `BUG-FR07-05`, `BUG-FR07-06` |
| Remove cart product | [FR-07_shopping-cart_remove-cart-product_domain_testing.md](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.md) | [FR-07_shopping-cart_remove-cart-product_domain_testing.pdf](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.pdf) | `BUG-FR07-09`, `BUG-FR07-10` |
| Get cart product list | [FR-07_shopping-cart_get-cart-product-list_domain_testing.md](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md) | [FR-07_shopping-cart_get-cart-product-list_domain_testing.pdf](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.pdf) | `BUG-FR07-06` - `BUG-FR07-08` |
| Continue shopping from cart | [FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md) | [FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.pdf](domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.pdf) | `BUG-FR07-11` |

### 5.4. FR-18 - Order Management Admin

| Sub-feature | Markdown | PDF | Bug liên quan |
| --- | --- | --- | --- |
| Admin order list | [FR-18_admin-order-list_domain_testing.md](domain-testing/FR-18_order-management-admin/FR-18_admin-order-list_domain_testing.md) | [FR-18_admin-order-list_domain_testing.pdf](domain-testing/FR-18_order-management-admin/FR-18_admin-order-list_domain_testing.pdf) | `BUG-FR18-01` |
| Admin order status update | [FR-18_admin-order-status-update_domain_testing.md](domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.md) | [FR-18_admin-order-status-update_domain_testing.pdf](domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.pdf) | `BUG-FR18-02` |
| Admin shipping address safe display | [FR-18_admin-shipping-address-safe-display_domain_testing.md](domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.md) | [FR-18_admin-shipping-address-safe-display_domain_testing.pdf](domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.pdf) | `BUG-FR18-03` |

## 6. Báo cáo lỗi và minh chứng GitHub Issues

| Artifact | Đường dẫn | Nội dung |
| --- | --- | --- |
| Bug report Markdown | [bug_report.md](bug_report.md) | Tóm tắt và chi tiết 25 lỗi phát hiện từ các ca Domain Testing/BVA đã thực thi. |
| Bug report PDF | [bug_report.pdf](bug_report.pdf) | Bản PDF của báo cáo lỗi. |
| Ảnh GitHub Issues | [github_issues/image.png](github_issues/image.png), [github_issues/image1.png](github_issues/image1.png), [github_issues/image2.png](github_issues/image2.png) | Ảnh chụp minh chứng các lỗi đã được tạo trên GitHub Issues. |

## 7. Phụ lục AI

| Phụ lục | Markdown | PDF | Ghi chú |
| --- | --- | --- | --- |
| AI Critique | [ai_critique.md](ai_critique.md) | [ai_critique.pdf](ai_critique.pdf) | Đoạn critique 200-300 từ theo yêu cầu HW02. |
| AI Audit Report | [ai_audit_report.md](ai_audit_report.md) | [ai_audit_report.pdf](ai_audit_report.pdf) | Log sử dụng AI bắt buộc theo đề bài. |

## 8. Agent Skill

| Thành phần | Đường dẫn | Vai trò |
| --- | --- | --- |
| Skill chính | [.agents/skills/applying-domain-testing/SKILL.md](.agents/skills/applying-domain-testing/SKILL.md) | Quy trình áp dụng Domain Testing, EP và BVA theo hướng portable. |
| EP reference | [.agents/skills/applying-domain-testing/references/equivalence-partitioning.md](.agents/skills/applying-domain-testing/references/equivalence-partitioning.md) | Hướng dẫn tách điều kiện và lớp tương đương. |
| BVA reference | [.agents/skills/applying-domain-testing/references/boundary-value-analysis.md](.agents/skills/applying-domain-testing/references/boundary-value-analysis.md) | Hướng dẫn xác định miền có biên và ca kiểm thử BVA. |
| Agent metadata | [.agents/skills/applying-domain-testing/agents/openai.yaml](.agents/skills/applying-domain-testing/agents/openai.yaml) | Metadata phục vụ demo/tái sử dụng skill. |

Video demo sử dụng skill được dẫn trong [README.md](README.md).
