# HW02 AI Domain Testing - README

## 1. Bảng tự đánh giá

| STT | Tiêu chí                            | Điểm tối đa | Điểm tự đánh giá |
| --- | ------------------------------------- | --------------: | ---------------------- |
| 1   | Feature A (Domain + Boundary)         |              25 | 25                     |
| 2   | Feature B (Domain + Boundary)         |              25 | 25                     |
| 3   | Feature C (Domain + Boundary)         |              25 | 25                     |
| 4   | Feature D (Mobile, Domain + Boundary) |              15 | 15                     |
| 5   | Agent Skills                          |              10 | 10                     |
|     | **Tổng cộng**                 |   **100** | **100**          |

## 2. Báo cáo tổng hợp kiểm thử

| Chỉ số                          | Số lượng |
| --------------------------------- | ----------: |
| Số chức năng đã chọn        |           4 |
| Số ca kiểm thử đã thiết kế |         227 |
| Số ca kiểm thử đã thực thi  |         227 |
| Số ca kiểm thử đạt           |          67 |
| Số ca kiểm thử không đạt    |         160 |
| Số ca kiểm thử chưa thực thi |           0 |
| Số lỗi đã báo cáo           |          25 |

## 3. Tổng hợp theo chức năng

| Chức năng           | Phạm vi                                            | Ca kiểm thử đã thiết kế | Đã thực thi |        Đạt |  Không đạt | Chưa thực thi |         Lỗi |
| --------------------- | --------------------------------------------------- | ----------------------------: | -------------: | -----------: | ------------: | --------------: | -----------: |
| FR-01                 | Đăng ký tài khoản                              |                            51 |             51 |            2 |            49 |               0 |            6 |
| FR-03                 | Quên mật khẩu và đặt lại mật khẩu - Mobile |                            43 |             43 |           10 |            33 |               0 |            5 |
| FR-07                 | Giỏ hàng                                          |                            88 |             88 |           17 |            71 |               0 |           11 |
| FR-18                 | Quản lý đơn hàng - Admin                       |                            45 |             45 |           38 |             7 |               0 |            3 |
| **Tổng cộng** |                                                     |                 **227** |  **227** | **67** | **160** |     **0** | **25** |

## 4. Tổng hợp theo tài liệu kiểm thử

| Tài liệu                                                            | Ca kiểm thử | Đạt | Không đạt | Chưa thực thi |
| --------------------------------------------------------------------- | ------------: | ----: | -----------: | --------------: |
| `FR-01_account_registration_domain_testing.md`                      |            51 |     2 |           49 |               0 |
| `FR-03_mobile-forgot-password-request-otp_domain_testing.md`        |            12 |     2 |           10 |               0 |
| `FR-03_mobile-reset-password_domain_testing.md`                     |            31 |     8 |           23 |               0 |
| `FR-07_shopping-cart_add-to-cart_domain_testing.md`                 |            20 |     2 |           18 |               0 |
| `FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md` |            12 |     8 |            4 |               0 |
| `FR-07_shopping-cart_get-cart-product-list_domain_testing.md`       |            22 |     3 |           19 |               0 |
| `FR-07_shopping-cart_remove-cart-product_domain_testing.md`         |            14 |     0 |           14 |               0 |
| `FR-07_shopping-cart_update-cart-quantity_domain_testing.md`        |            20 |     4 |           16 |               0 |
| `FR-18_admin-order-list_domain_testing.md`                          |            12 |    11 |            1 |               0 |
| `FR-18_admin-order-status-update_domain_testing.md`                 |            26 |    23 |            3 |               0 |
| `FR-18_admin-shipping-address-safe-display_domain_testing.md`       |             7 |     4 |            3 |               0 |

## 5. Video demo

Link youtube: [ [Software-Testing] 23127075 - HW02 - Skill Demo ](https://youtu.be/4GJ9WkJUHdk)
