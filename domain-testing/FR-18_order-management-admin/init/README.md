# FR-18: Quản lý Đơn hàng Admin - Domain Testing

Thư mục này chia `FR-18: Order management (admin)` thành các chức năng nhỏ để thiết kế Domain Testing dễ rà soát:

| File | Chức năng nhỏ | Giao diện/API chính |
| --- | --- | --- |
| `FR-18_admin-order-list_domain_testing.md` | Admin xem toàn bộ đơn hàng của tất cả người dùng. | Web Admin `Quản lý Đơn hàng`; `GET /api/admin/orders` |
| `FR-18_admin-order-status-update_domain_testing.md` | Admin cập nhật trạng thái đơn hàng theo state machine của `FR-10`. | Web Admin thao tác trạng thái; `PUT /api/admin/orders/:id/status` |
| `FR-18_admin-shipping-address-safe-display_domain_testing.md` | Địa chỉ giao hàng trong quản lý đơn hàng được hiển thị an toàn, không render HTML. | Web Admin `Quản lý Đơn hàng`; dữ liệu `shipping_address` trong đơn hàng |

Các artifact được thiết kế từ nguồn black-box: `requirements/2026.HW02.Domain Testing_En.md`, `eshop-sut/README.md`, và `eshop-sut/api_specification.md`. Không sử dụng mã nguồn triển khai làm oracle.

