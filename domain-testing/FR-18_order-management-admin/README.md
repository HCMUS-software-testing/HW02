# FR-18: Quản lý Đơn hàng Admin - Domain Testing

Thư mục này chia `FR-18: Order management (admin)` thành các chức năng nhỏ để thiết kế Domain Testing dễ rà soát:

| File | Chức năng nhỏ | Giao diện/API chính |
| --- | --- | --- |
| `FR-18_admin-order-list_domain_testing.md` | Admin xem toàn bộ đơn hàng của tất cả người dùng. | Web Admin `Quản lý Đơn hàng`; `GET /api/admin/orders` |
| `FR-18_admin-order-status-update_domain_testing.md` | Admin cập nhật trạng thái đơn hàng theo state machine của `FR-10`. | Web Admin thao tác trạng thái; `PUT /api/admin/orders/:id/status` |
| `FR-18_admin-shipping-address-safe-display_domain_testing.md` | Địa chỉ giao hàng trong quản lý đơn hàng được hiển thị an toàn, không render HTML. | Web Admin `Quản lý Đơn hàng`; dữ liệu `shipping_address` trong đơn hàng |

Các artifact được thiết kế từ nguồn black-box: `requirements/2026.HW02.Domain Testing_En.md`, `eshop-sut/README.md`, và `eshop-sut/api_specification.md`. Không sử dụng mã nguồn triển khai làm oracle.

## Trạng thái thực thi

Đã thực thi qua đọc UI Web Admin (`eshop-sut/frontend-admin/src/App.jsx`) và gọi API bằng cURL/Postman-style trên `http://localhost:3000` ngày 2026-07-09. Evidence API được lưu tại `artifacts/test-results/FR18_order_management_admin_api_evidence.txt`.

Tóm tắt lỗi chính quan sát được:

- API `/api/admin/orders` và `/api/admin/orders/:id/status` chỉ kiểm JWT hợp lệ, không kiểm `role = 'admin'`, nên user thường vẫn xem/cập nhật được dữ liệu admin.
- Backend cho phép chuyển `canceled -> delivered`, vi phạm yêu cầu `canceled` là final state.
- Web Admin render `shipping_address` bằng `dangerouslySetInnerHTML`, nên địa chỉ chứa HTML/script không được hiển thị an toàn.
