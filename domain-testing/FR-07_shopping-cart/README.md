# FR-07: Giỏ hàng - Domain Testing

Thư mục này chia `FR-07: Shopping cart` thành các chức năng nhỏ theo hành vi quan sát được để thiết kế Domain Testing dễ rà soát và thực thi độc lập.

| Sub-feature | File | Observable behavior | Scope boundary |
| --- | --- | --- | --- |
| Thêm vào giỏ hàng | `FR-07_shopping-cart_add-to-cart_domain_testing.md` | Thêm sản phẩm từ chi tiết sản phẩm vào giỏ; thêm trùng thì tăng số lượng. | Không bao gồm hiển thị toàn bộ giỏ, chỉnh số lượng trong giỏ, xóa item, checkout. |
| Hiển thị danh sách sản phẩm / Lấy giỏ hàng | `FR-07_shopping-cart_get-cart-product-list_domain_testing.md` | Màn hình giỏ và `GET /api/cart` hiển thị/trả danh sách sản phẩm, tổng cộng và trạng thái giỏ trống. | Không bao gồm thao tác thêm, cập nhật, xóa hoặc điều hướng khỏi giỏ. |
| Cập nhật số lượng trong giỏ hàng | `FR-07_shopping-cart_update-cart-quantity_domain_testing.md` | Người dùng bấm nút `+/-` trên dòng sản phẩm để thay đổi số lượng và quan sát lại thành tiền/tổng cộng. | Chỉ kiểm thử chỉnh số lượng từ màn hình giỏ; không kiểm thử thêm mới sản phẩm hay xóa item bằng nút xóa. |
| Xóa sản phẩm trong giỏ hàng | `FR-07_shopping-cart_remove-cart-product_domain_testing.md` | Người dùng bấm `Xóa sản phẩm`, xử lý dialog xác nhận, và quan sát giỏ sau khi xác nhận/hủy. | Chỉ kiểm thử xóa item trong giỏ; không kiểm thử checkout hoặc xóa sản phẩm khỏi catalog. |
| Tiếp tục mua hàng từ giỏ hàng | `FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md` | Người dùng bấm `Tiếp tục mua sắm` từ màn hình giỏ và được đưa về trang chủ. | Chỉ kiểm thử điều hướng khỏi giỏ; không kiểm thử tìm kiếm, thêm sản phẩm hoặc checkout sau điều hướng. |

## Nguồn đặc tả black-box dùng chung

- `requirements/2026.HW02.Domain Testing_En.md`: mục Pool B `FR-07: Shopping cart`.
- `eshop-sut/README.md`: mục `FR-07: Giỏ hàng (Shopping Cart)`, `FR-21`, `FR-23`, `FR-24`.
- `eshop-sut/api_specification.md`: mục `4. Giỏ hàng & Đơn hàng`, đặc biệt `GET /api/cart` và `POST /api/cart`.

Không sử dụng mã nguồn triển khai, database nội bộ hoặc route/service implementation làm oracle.

## Dữ liệu và biến dùng chung

- `A_id`, `N_A`, `X`: id, tên và đơn giá của sản phẩm A quan sát được từ UI/API black-box.
- `B_id`, `N_B`, `Y`: id, tên và đơn giá của sản phẩm B quan sát được từ UI/API black-box.
- `valid_user_token`: JWT token hợp lệ của user test sau khi đăng nhập.
- Các testcase cần có sản phẩm trong giỏ nên dựng tiền điều kiện qua UI: đăng nhập, mở chi tiết sản phẩm, nhập số lượng hợp lệ, bấm `Thêm vào giỏ hàng`, rồi vào màn hình `Giỏ hàng`.

## Ghi chú traceability

Các artifact con cùng truy vết về `FR-07: Giỏ hàng`. Trong API specification hiện chỉ có `GET /api/cart` và `POST /api/cart`; không có endpoint cập nhật số lượng, xóa sản phẩm hoặc tiếp tục mua sắm được mô tả riêng. Vì vậy các artifact liên quan đến thao tác trong giỏ ưu tiên oracle trên Web UI và chỉ dùng `GET /api/cart` như bước đối chiếu trạng thái nếu API body thực tế đủ dữ liệu.
