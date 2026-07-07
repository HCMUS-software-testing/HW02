# FR-07: Shopping cart - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` |
| SUT | EShop - Frontend Web, Frontend Mobile, Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-07: Giỏ hàng (Shopping Cart)`, `FR-06: Xem chi tiết sản phẩm`, `FR-21: Tiêu chuẩn Giao diện Chung`; `eshop-sut/api_specification.md` mục `4. Giỏ hàng & Đơn hàng`, `4.1 Lấy giỏ hàng`, `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình Giỏ hàng; luồng Thêm vào giỏ hàng từ chi tiết sản phẩm; endpoint `GET /api/cart`; endpoint `POST /api/cart` với body gồm `id`, `name`, `price`, `quantity`; header `Authorization: Bearer <token>` theo API specification |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử Domain Testing gồm phân hoạch tương đương và phân tích giá trị biên cho hành vi giỏ hàng: xem giỏ hàng, thêm sản phẩm, cộng dồn sản phẩm trùng, tăng/giảm số lượng, xóa sản phẩm có xác nhận, tổng tiền, nhãn tổng tiền, trạng thái giỏ trống và điều hướng tiếp tục mua sắm. Oracle chính là đặc tả README/API, không dựa trên mã nguồn triển khai. |
| Ngoài phạm vi | Không kiểm thử thanh toán FR-08, mã giảm giá FR-09, trạng thái đơn hàng, quản trị sản phẩm, tồn kho, bảo mật lưu trữ phía client, hiệu năng, đồng bộ đa thiết bị, hoặc triển khai database. |
| Giả định/ràng buộc thiếu | API specification không mô tả endpoint cập nhật số lượng hoặc xóa sản phẩm khỏi giỏ, trong khi FR-07 yêu cầu nút `+/-` và `Xóa sản phẩm`; artifact thiết kế theo hành vi quan sát được trên UI và ghi rủi ro cho phần API thiếu contract. FR-07 không nêu số lượng tối đa, số dòng tối đa, giới hạn giá trị `price`, hành vi khi bấm `-` tại `quantity=1`, hay thông báo lỗi/status code cụ thể. Dựa trên FR-06, số lượng đưa vào giỏ được giả định là số nguyên dương, tối thiểu 1. Dữ liệu sản phẩm hợp lệ được giả định là sản phẩm có trong danh sách/chi tiết sản phẩm của hệ thống. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung actual result, status, và evidence path sau khi chạy kiểm thử. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Token JWT gửi qua header `Authorization: Bearer <token>` khi gọi API giỏ hàng theo API specification. |
| Đầu vào | Trạng thái giỏ hàng hiện tại | Giỏ hàng có thể rỗng, có một dòng sản phẩm, có nhiều dòng sản phẩm, hoặc đã có sẵn sản phẩm trùng với sản phẩm sắp thêm. |
| Đầu vào | `id` | Mã sản phẩm trong body `POST /api/cart`; dùng để nhận diện sản phẩm và quyết định cộng dồn khi thêm cùng sản phẩm. |
| Đầu vào | `name` | Tên sản phẩm trong body `POST /api/cart` và cột `Sản phẩm` trên giao diện giỏ hàng. |
| Đầu vào | `price` | Đơn giá sản phẩm trong body `POST /api/cart`; dùng hiển thị cột `Đơn giá` và tính thành tiền/tổng tiền. |
| Đầu vào | `quantity` | Số lượng sản phẩm thêm vào giỏ hoặc số lượng đang hiển thị trong dòng giỏ hàng; theo FR-06, chỉ nhận số nguyên dương, tối thiểu 1. |
| Đầu vào | Hành động `+` | Người dùng tăng số lượng của một dòng sản phẩm trong giỏ hàng. |
| Đầu vào | Hành động `-` | Người dùng giảm số lượng của một dòng sản phẩm trong giỏ hàng. |
| Đầu vào | Hành động `Xóa sản phẩm` | Người dùng yêu cầu xóa một dòng sản phẩm khỏi giỏ hàng. |
| Đầu vào | Quyết định trong dialog xác nhận | Người dùng xác nhận hoặc hủy thao tác xóa sản phẩm. |
| Đầu vào | Hành động `Tiếp tục mua sắm` | Người dùng quay về trang chủ từ màn hình giỏ hàng. |
| Đầu ra | Danh sách sản phẩm trong giỏ | Khi giỏ không rỗng, hiển thị các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. |
| Đầu ra | Dòng sản phẩm trong giỏ | Mỗi sản phẩm khác nhau hiển thị một dòng; thêm cùng sản phẩm chỉ tăng số lượng, không tạo dòng mới. |
| Đầu ra | `Thành tiền` | Giá trị mỗi dòng bằng `Đơn giá × Số lượng`, hiển thị tiền tệ theo FR-21. |
| Đầu ra | Tổng tiền | Tổng các `Thành tiền`, hiển thị với nhãn chính xác `"Tổng cộng"`. |
| Đầu ra | Dialog xác nhận xóa | Hệ thống hiển thị dialog xác nhận trước khi xóa sản phẩm. |
| Đầu ra | Trạng thái giỏ hàng trống | Khi không có sản phẩm, hiển thị hình minh họa và thông báo rõ ràng. |
| Đầu ra | Điều hướng về trang chủ | Khi bấm `Tiếp tục mua sắm`, người dùng được đưa về trang chủ. |
| Đầu ra | Phản hồi lỗi/từ chối | Với token không hợp lệ hoặc dữ liệu giỏ hàng không hợp lệ, hệ thống từ chối thao tác, không cập nhật giỏ hàng sai. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | API giỏ hàng yêu cầu header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ để truy cập `GET /api/cart` và `POST /api/cart`. |
| C3 | Trạng thái giỏ hàng hiện tại | Khi giỏ hàng rỗng, giao diện phải hiển thị trạng thái giỏ trống. |
| C4 | Trạng thái giỏ hàng hiện tại | Khi giỏ hàng không rỗng, giao diện phải hiển thị danh sách sản phẩm trong giỏ. |
| C5 | Danh sách sản phẩm trong giỏ | Danh sách phải có các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. |
| C6 | `id` | Sản phẩm thêm vào giỏ phải có `id` theo body `POST /api/cart`. |
| C7 | `name` | Sản phẩm thêm vào giỏ phải có `name` để hiển thị ở cột `Sản phẩm`. |
| C8 | `price` | Sản phẩm thêm vào giỏ phải có `price` để hiển thị `Đơn giá` và tính tiền. |
| C9 | `quantity` | `quantity` phải là số nguyên. |
| C10 | `quantity` | `quantity` phải là số nguyên dương. |
| C11 | `quantity` | `quantity` tối thiểu là 1 theo FR-06. |
| C12 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm chưa có trong giỏ tạo một dòng sản phẩm mới. |
| C13 | Trạng thái sản phẩm trong giỏ | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng của dòng hiện có, không tạo dòng mới. |
| C14 | Hành động `+` | Bấm `+` phải tăng số lượng sản phẩm trong dòng giỏ hàng. |
| C15 | Hành động `-` | Bấm `-` phải giảm số lượng khi số lượng hiện tại lớn hơn 1. |
| C16 | Hành động `-` | Số lượng không được giảm xuống dưới 1; nếu muốn loại bỏ sản phẩm, người dùng phải dùng thao tác xóa theo giả định từ FR-07. |
| C17 | Hành động `Xóa sản phẩm` | Bấm `Xóa sản phẩm` phải hiển thị dialog xác nhận trước khi thực hiện xóa. |
| C18 | Quyết định trong dialog xác nhận | Nếu người dùng xác nhận xóa, sản phẩm bị xóa khỏi giỏ. |
| C19 | Quyết định trong dialog xác nhận | Nếu người dùng hủy dialog, sản phẩm vẫn còn trong giỏ và số lượng không đổi. |
| C20 | `Thành tiền` | `Thành tiền` của từng dòng phải bằng `Đơn giá × Số lượng`. |
| C21 | Tổng tiền | Tổng tiền phải bằng tổng tất cả `Thành tiền` trong giỏ. |
| C22 | Tổng tiền | Nhãn tổng tiền phải hiển thị chính xác là `"Tổng cộng"`. |
| C23 | Hiển thị tiền tệ | Giá tiền phải dùng ký hiệu `₫` và định dạng phân cách hàng nghìn theo FR-21. |
| C24 | Trạng thái giỏ hàng trống | Giỏ hàng trống phải có hình minh họa. |
| C25 | Trạng thái giỏ hàng trống | Giỏ hàng trống phải có thông báo rõ ràng. |
| C26 | Hành động `Tiếp tục mua sắm` | Bấm `Tiếp tục mua sắm` phải quay về trang chủ. |
| C27 | Phản hồi lỗi/từ chối | Với dữ liệu thêm vào giỏ không hợp lệ, hệ thống phải từ chối cập nhật giỏ hàng. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token | Header `Authorization` có token JWT hợp lệ. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép gọi `GET /api/cart` và `POST /api/cart`. |
| EC02 | `Authorization` token | Thiếu header `Authorization`. | Không | Không gửi header | Từ chối truy cập API giỏ hàng; không trả/cập nhật giỏ hàng cho người dùng. |
| EC03 | `Authorization` token | Header có token sai định dạng hoặc không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối truy cập API giỏ hàng; không trả/cập nhật giỏ hàng cho người dùng. |
| EC04 | Trạng thái giỏ hàng hiện tại | Giỏ hàng rỗng. | Có | Không có dòng sản phẩm | Hiển thị hình minh họa và thông báo giỏ hàng trống rõ ràng. |
| EC05 | Trạng thái giỏ hàng hiện tại | Giỏ hàng có một hoặc nhiều sản phẩm. | Có | 2 dòng: `id=1`, `id=2` | Hiển thị danh sách sản phẩm với đủ cột theo FR-07. |
| EC06 | Danh sách sản phẩm trong giỏ | Danh sách hiển thị đủ cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. | Có | Bảng giỏ hàng đủ 5 cột | Người dùng quan sát được đầy đủ thông tin và thao tác giỏ hàng. |
| EC07 | Danh sách sản phẩm trong giỏ | Danh sách thiếu một hoặc nhiều cột bắt buộc. | Không | Thiếu cột `Thành tiền` | Không đạt FR-07; cần ghi nhận lỗi giao diện. |
| EC08 | `id` | Body thêm giỏ có `id` của sản phẩm hợp lệ. | Có | `id=1` | Chấp nhận định danh sản phẩm để tạo/cập nhật dòng giỏ hàng. |
| EC09 | `id` | Body thêm giỏ thiếu `id`. | Không | Không có `id` | Từ chối thêm vào giỏ; không tạo dòng sản phẩm không định danh. |
| EC10 | `id` | `id` không thuộc sản phẩm hợp lệ trong hệ thống. | Không | `id=999999` | Từ chối thêm vào giỏ theo giả định sản phẩm phải tồn tại; không cập nhật giỏ hàng. |
| EC11 | `name` | Body thêm giỏ có `name` không rỗng. | Có | `name="Sản phẩm A"` | Chấp nhận tên sản phẩm để hiển thị trong giỏ. |
| EC12 | `name` | Body thêm giỏ thiếu hoặc rỗng `name`. | Không | `name=""` | Từ chối thêm vào giỏ; không hiển thị dòng sản phẩm thiếu tên. |
| EC13 | `price` | Body thêm giỏ có `price` là đơn giá hợp lệ của sản phẩm. | Có | `price=100000` | Chấp nhận đơn giá để hiển thị và tính tiền. |
| EC14 | `price` | Body thêm giỏ thiếu `price`. | Không | Không có `price` | Từ chối thêm vào giỏ; không thể tính `Thành tiền`. |
| EC15 | `price` | `price` không phải số. | Không | `price="100000"` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng bằng dữ liệu giá sai kiểu. |
| EC16 | `quantity` | `quantity` là số nguyên dương, tối thiểu 1. | Có | `quantity=2` | Chấp nhận số lượng; thêm/cập nhật giỏ hàng. |
| EC17 | `quantity` | `quantity` thiếu. | Không | Không có `quantity` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC18 | `quantity` | `quantity` không phải số nguyên. | Không | `quantity=1.5` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC19 | `quantity` | `quantity` bằng 0. | Không | `quantity=0` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC20 | `quantity` | `quantity` là số âm. | Không | `quantity=-1` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC21 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm chưa có trong giỏ. | Có | Giỏ chưa có `id=1`, thêm `id=1, quantity=2` | Tạo một dòng mới cho sản phẩm `id=1` với số lượng 2. |
| EC22 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm đã có trong giỏ. | Có | Giỏ đã có `id=1, quantity=2`, thêm `id=1, quantity=3` | Dòng `id=1` có số lượng mới là 5; không tạo dòng trùng. |
| EC23 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm khác với sản phẩm đang có trong giỏ. | Có | Giỏ có `id=1`, thêm `id=2` | Tạo thêm dòng mới cho `id=2`; dòng `id=1` giữ nguyên. |
| EC24 | Hành động `+` | Bấm `+` trên dòng sản phẩm hợp lệ. | Có | `quantity=2`, bấm `+` | Số lượng tăng lên 3; `Thành tiền` và tổng tiền được tính lại. |
| EC25 | Hành động `-` | Bấm `-` khi số lượng hiện tại lớn hơn 1. | Có | `quantity=2`, bấm `-` | Số lượng giảm xuống 1; `Thành tiền` và tổng tiền được tính lại. |
| EC26 | Hành động `-` | Bấm `-` khi số lượng hiện tại bằng 1. | Không | `quantity=1`, bấm `-` | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa dùng thao tác xóa có xác nhận. |
| EC27 | Hành động `Xóa sản phẩm` | Bấm xóa và hệ thống hiển thị dialog xác nhận trước khi xóa. | Có | Bấm `Xóa sản phẩm` trên dòng `id=1` | Dialog xác nhận xuất hiện; chưa xóa sản phẩm trước khi người dùng quyết định. |
| EC28 | Quyết định trong dialog xác nhận | Người dùng xác nhận xóa. | Có | Chọn xác nhận trong dialog | Dòng sản phẩm bị xóa khỏi giỏ; tổng tiền được tính lại; nếu hết sản phẩm thì hiển thị giỏ trống. |
| EC29 | Quyết định trong dialog xác nhận | Người dùng hủy xóa. | Có | Chọn hủy trong dialog | Dòng sản phẩm vẫn còn trong giỏ; số lượng và tổng tiền không đổi. |
| EC30 | Dialog xác nhận xóa | Xóa sản phẩm không có dialog xác nhận. | Không | Bấm xóa và sản phẩm biến mất ngay | Không đạt FR-07; cần ghi nhận lỗi vì thiếu xác nhận trước khi thực hiện. |
| EC31 | `Thành tiền` | `Thành tiền` đúng bằng `Đơn giá × Số lượng`. | Có | `price=100000`, `quantity=2`, `Thành tiền=200000` | Hiển thị thành tiền chính xác, có định dạng tiền tệ. |
| EC32 | `Thành tiền` | `Thành tiền` khác `Đơn giá × Số lượng`. | Không | `price=100000`, `quantity=2`, `Thành tiền=100000` | Không đạt yêu cầu tính tiền; cần ghi nhận lỗi. |
| EC33 | Tổng tiền | Tổng tiền đúng bằng tổng các `Thành tiền`. | Có | `200000 + 150000 = 350000` | Hiển thị tổng tiền chính xác. |
| EC34 | Tổng tiền | Tổng tiền khác tổng các `Thành tiền`. | Không | Thành tiền `200000` và `150000`, tổng hiển thị `200000` | Không đạt yêu cầu tính tổng; cần ghi nhận lỗi. |
| EC35 | Tổng tiền | Nhãn tổng tiền chính xác là `"Tổng cộng"`. | Có | Label `"Tổng cộng"` | Đạt FR-07 về nhãn tổng tiền. |
| EC36 | Tổng tiền | Nhãn tổng tiền sai, ví dụ `"Tổng tạm tính"`. | Không | Label `"Tổng tạm tính"` | Không đạt FR-07; cần ghi nhận lỗi nhãn. |
| EC37 | Hiển thị tiền tệ | Giá tiền dùng ký hiệu `₫` và phân cách hàng nghìn. | Có | `100.000 ₫` | Đạt FR-21 về đơn vị tiền. |
| EC38 | Hiển thị tiền tệ | Giá tiền thiếu ký hiệu `₫` hoặc thiếu phân cách hàng nghìn. | Không | `100000` | Không đạt FR-21; cần ghi nhận lỗi hiển thị tiền tệ. |
| EC39 | Trạng thái giỏ hàng trống | Giỏ trống có hình minh họa và thông báo rõ ràng. | Có | Hình minh họa + text `Giỏ hàng trống` | Người dùng hiểu giỏ hàng hiện không có sản phẩm. |
| EC40 | Trạng thái giỏ hàng trống | Giỏ trống thiếu hình minh họa. | Không | Chỉ hiển thị text | Không đạt FR-07; cần ghi nhận thiếu hình minh họa. |
| EC41 | Trạng thái giỏ hàng trống | Giỏ trống thiếu thông báo rõ ràng. | Không | Chỉ hiển thị vùng trống/hình không có text | Không đạt FR-07; cần ghi nhận thiếu thông báo. |
| EC42 | Hành động `Tiếp tục mua sắm` | Bấm `Tiếp tục mua sắm`. | Có | Click button trên trang giỏ hàng | Điều hướng về trang chủ. |
| EC43 | Hành động `Tiếp tục mua sắm` | Button `Tiếp tục mua sắm` thiếu hoặc không điều hướng về trang chủ. | Không | Không có button hoặc click không đổi trang | Không đạt FR-07; cần ghi nhận lỗi điều hướng. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR07-001 | Truy cập API giỏ hàng với token hợp lệ. | `GET /api/cart`; `Authorization: Bearer <valid_user_token>` | EC01 | API cho phép truy cập giỏ hàng của user đang đăng nhập. |
| EP-FR07-002 | Từ chối API giỏ hàng khi thiếu token. | `GET /api/cart`; không gửi header `Authorization` | EC02 | API từ chối truy cập; không trả giỏ hàng người dùng. |
| EP-FR07-003 | Từ chối API giỏ hàng khi token không hợp lệ. | `GET /api/cart`; `Authorization: Bearer invalid.token` | EC03 | API từ chối truy cập; không trả giỏ hàng người dùng. |
| EP-FR07-004 | Hiển thị giỏ hàng trống đúng yêu cầu. | User hợp lệ có giỏ hàng rỗng; mở màn hình Giỏ hàng | EC04, EC39 | Giao diện hiển thị hình minh họa và thông báo giỏ hàng trống rõ ràng. |
| EP-FR07-005 | Hiển thị giỏ hàng không rỗng với đủ cột bắt buộc. | Giỏ có `id=1, name="Sản phẩm A", price=100000, quantity=2` | EC05, EC06, EC31, EC33, EC35, EC37 | Bảng giỏ hàng có đủ cột; thành tiền `200.000 ₫`; tổng tiền nhãn `"Tổng cộng"` và giá trị `200.000 ₫`. |
| EP-FR07-006 | Phát hiện danh sách giỏ hàng thiếu cột bắt buộc. | Giỏ không rỗng nhưng UI thiếu cột `Thành tiền` | EC07 | Không đạt FR-07; ghi nhận lỗi giao diện thiếu cột bắt buộc. |
| EP-FR07-007 | Thêm sản phẩm hợp lệ chưa có trong giỏ. | `POST /api/cart`; token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}`; giỏ chưa có `id=1` | EC01, EC08, EC11, EC13, EC16, EC21 | Giỏ tạo một dòng `id=1` với số lượng 2; thành tiền và tổng tiền được tính đúng. |
| EP-FR07-008 | Từ chối thêm sản phẩm khi thiếu `id`. | Body `{"name":"Sản phẩm A","price":100000,"quantity":2}` | EC09 | Từ chối thêm vào giỏ; không tạo dòng sản phẩm không định danh. |
| EP-FR07-009 | Từ chối thêm sản phẩm với `id` không hợp lệ. | Body `{"id":999999,"name":"Sản phẩm không tồn tại","price":100000,"quantity":2}` | EC10 | Từ chối thêm vào giỏ theo giả định sản phẩm phải tồn tại; giỏ hàng không đổi. |
| EP-FR07-010 | Từ chối thêm sản phẩm khi thiếu/rỗng `name`. | Body `{"id":1,"name":"","price":100000,"quantity":2}` | EC12 | Từ chối thêm vào giỏ; không hiển thị dòng sản phẩm thiếu tên. |
| EP-FR07-011 | Từ chối thêm sản phẩm khi thiếu `price`. | Body `{"id":1,"name":"Sản phẩm A","quantity":2}` | EC14 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-012 | Từ chối thêm sản phẩm khi `price` sai kiểu. | Body `{"id":1,"name":"Sản phẩm A","price":"100000","quantity":2}` | EC15 | Từ chối thêm vào giỏ; không tính tiền bằng dữ liệu giá sai kiểu. |
| EP-FR07-013 | Từ chối thêm sản phẩm khi thiếu `quantity`. | Body `{"id":1,"name":"Sản phẩm A","price":100000}` | EC17 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-014 | Từ chối thêm sản phẩm khi `quantity` không nguyên. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1.5}` | EC18 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-015 | Từ chối thêm sản phẩm khi `quantity=0`. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}` | EC19 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-016 | Từ chối thêm sản phẩm khi `quantity` âm. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":-1}` | EC20 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-017 | Thêm cùng sản phẩm phải cộng dồn số lượng, không tạo dòng mới. | Giỏ đã có `id=1, quantity=2`; thêm body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":3}` | EC22 | Giỏ vẫn chỉ có một dòng `id=1`; số lượng thành 5; thành tiền `500.000 ₫`. |
| EP-FR07-018 | Thêm sản phẩm khác tạo dòng mới và giữ dòng cũ. | Giỏ có `id=1, quantity=2`; thêm body `{"id":2,"name":"Sản phẩm B","price":150000,"quantity":1}` | EC23 | Giỏ có hai dòng `id=1` và `id=2`; dòng cũ giữ nguyên; tổng tiền được tính lại. |
| EP-FR07-019 | Tăng số lượng bằng nút `+`. | Giỏ có dòng `id=1, price=100000, quantity=2`; bấm `+` | EC24, EC31, EC33 | Số lượng thành 3; thành tiền `300.000 ₫`; tổng tiền cập nhật tương ứng. |
| EP-FR07-020 | Giảm số lượng bằng nút `-` khi số lượng lớn hơn 1. | Giỏ có dòng `id=1, price=100000, quantity=2`; bấm `-` | EC25, EC31, EC33 | Số lượng thành 1; thành tiền `100.000 ₫`; tổng tiền cập nhật tương ứng. |
| EP-FR07-021 | Không cho số lượng giảm dưới 1 bằng nút `-`. | Giỏ có dòng `id=1, quantity=1`; bấm `-` | EC26 | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa qua thao tác xóa có xác nhận. |
| EP-FR07-022 | Xóa sản phẩm phải hiển thị dialog trước khi thực hiện. | Giỏ có `id=1`; bấm `Xóa sản phẩm` | EC27 | Dialog xác nhận xuất hiện; sản phẩm chưa bị xóa trước khi người dùng xác nhận. |
| EP-FR07-023 | Xác nhận xóa sản phẩm. | Sau `EP-FR07-022`, chọn xác nhận trong dialog | EC28 | Dòng sản phẩm bị xóa; tổng tiền cập nhật; nếu giỏ hết sản phẩm thì hiển thị trạng thái giỏ trống. |
| EP-FR07-024 | Hủy xóa sản phẩm. | Sau `EP-FR07-022`, chọn hủy trong dialog | EC29 | Dòng sản phẩm vẫn còn; số lượng và tổng tiền không đổi. |
| EP-FR07-025 | Phát hiện lỗi xóa không có dialog xác nhận. | Bấm `Xóa sản phẩm` và dòng bị xóa ngay | EC30 | Không đạt FR-07; ghi nhận lỗi thiếu dialog xác nhận. |
| EP-FR07-026 | Kiểm tra sai lệch `Thành tiền`. | Giỏ có `price=100000`, `quantity=2`, UI hiển thị `Thành tiền=100.000 ₫` | EC32 | Không đạt yêu cầu tính tiền; ghi nhận lỗi vì thành tiền phải là `200.000 ₫`. |
| EP-FR07-027 | Kiểm tra sai lệch tổng tiền. | Giỏ có thành tiền `200.000 ₫` và `150.000 ₫`, UI hiển thị tổng `200.000 ₫` | EC34 | Không đạt yêu cầu tính tổng; ghi nhận lỗi vì tổng phải là `350.000 ₫`. |
| EP-FR07-028 | Kiểm tra nhãn tổng tiền chính xác. | Giỏ không rỗng, quan sát vùng tổng tiền | EC35 | Nhãn hiển thị chính xác `"Tổng cộng"`. |
| EP-FR07-029 | Phát hiện nhãn tổng tiền sai. | Giỏ không rỗng, UI hiển thị nhãn `"Tổng tạm tính"` | EC36 | Không đạt FR-07; ghi nhận lỗi nhãn tổng tiền. |
| EP-FR07-030 | Kiểm tra định dạng tiền tệ hợp lệ. | `price=100000`, `quantity=2`; quan sát `Đơn giá`, `Thành tiền`, tổng tiền | EC37 | Các giá trị tiền dùng ký hiệu `₫` và phân cách hàng nghìn, ví dụ `100.000 ₫`, `200.000 ₫`. |
| EP-FR07-031 | Phát hiện định dạng tiền tệ sai. | UI hiển thị `100000` thay vì `100.000 ₫` | EC38 | Không đạt FR-21; ghi nhận lỗi hiển thị tiền tệ. |
| EP-FR07-032 | Phát hiện giỏ trống thiếu hình minh họa. | User hợp lệ có giỏ rỗng; UI chỉ có text, không có hình | EC40 | Không đạt FR-07; ghi nhận thiếu hình minh họa cho giỏ trống. |
| EP-FR07-033 | Phát hiện giỏ trống thiếu thông báo rõ ràng. | User hợp lệ có giỏ rỗng; UI chỉ hiển thị hình/vùng trống không có text rõ nghĩa | EC41 | Không đạt FR-07; ghi nhận thiếu thông báo rõ ràng. |
| EP-FR07-034 | Điều hướng về trang chủ bằng `Tiếp tục mua sắm`. | Mở giỏ hàng; bấm `Tiếp tục mua sắm` | EC42 | Người dùng được điều hướng về trang chủ. |
| EP-FR07-035 | Phát hiện thiếu/hỏng `Tiếp tục mua sắm`. | Màn hình giỏ hàng thiếu button hoặc bấm button không về trang chủ | EC43 | Không đạt FR-07; ghi nhận lỗi điều hướng. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `Authorization` token | Trạng thái hợp lệ/không hợp lệ | Không | Token là trạng thái xác thực rời rạc; phù hợp EP hơn BVA. |
| Trạng thái giỏ hàng hiện tại | Số dòng sản phẩm trong giỏ | Có, giới hạn ở biên rỗng/không rỗng | FR-07 có hành vi khác nhau giữa giỏ trống và giỏ không rỗng; biên quan trọng là `item_count=0` sang `item_count=1`. Không có số dòng tối đa được đặc tả. |
| `id` | Định danh/membership | Không | `id` là định danh sản phẩm; đặc tả không nêu miền số hoặc ngưỡng min/max cho `id`. |
| `name` | Chuỗi hiển thị | Không | FR-07/API chỉ yêu cầu có `name` trong body mẫu và hiển thị ở cột `Sản phẩm`; không nêu độ dài min/max riêng cho giỏ hàng. |
| `price` | Số tiền | Không | FR-07 dùng `price` để hiển thị/tính tiền nhưng không nêu giới hạn hợp lệ, min/max, hoặc ngưỡng giá cho giỏ hàng. |
| `quantity` | Số lượng | Có | FR-06 quy định số lượng là số nguyên dương, tối thiểu 1; FR-07 có nút `+/-` nên biên `quantity=1` là biên quan trọng. Không có biên tối đa được đặc tả. |
| Hành động `+` | Thay đổi số lượng | Có, theo số lượng sau thao tác | Bấm `+` chuyển số lượng từ `n` sang `n+1`; cần kiểm quanh biên tối thiểu 1. |
| Hành động `-` | Thay đổi số lượng | Có, theo số lượng trước/sau thao tác | Bấm `-` có rủi ro tại `quantity=1`; số lượng không được xuống 0 hoặc âm theo giả định từ yêu cầu số nguyên dương. |
| `Thành tiền` | Công thức số tiền | Có, theo biên số lượng | `Thành tiền = Đơn giá × Số lượng`; khi `quantity` ở biên 1/2, thành tiền và tổng tiền phải cập nhật đúng. |
| Tổng tiền | Tổng các dòng | Có, theo số dòng và số lượng | Tổng tiền phụ thuộc số dòng trong giỏ và số lượng từng dòng; biên `item_count=0`, `item_count=1`, `item_count=2` có ý nghĩa quan sát được. |
| Dialog xác nhận xóa | Trạng thái UI | Không | Xác nhận/hủy là trạng thái rời rạc; phù hợp EP hơn BVA. |
| Nhãn `"Tổng cộng"` | Chuỗi cố định | Không | Đây là điều kiện must-be chuỗi chính xác, không phải miền liên tục. |
| Trạng thái giỏ trống | Trạng thái UI | Không | Hình minh họa/thông báo là điều kiện hiện diện rời rạc. |
| Hành động `Tiếp tục mua sắm` | Điều hướng | Không | Điều hướng đúng/sai là trạng thái rời rạc. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Trạng thái giỏ hàng hiện tại | Biên số dòng sản phẩm: rỗng sang không rỗng. | `item_count=0`; `item_count=1`; `item_count=2`. |
| `quantity` khi thêm vào giỏ | Biên tối thiểu: số nguyên dương, tối thiểu 1. | `quantity=0` (`min-1`); `quantity=1` (`min`); `quantity=2` (`min+1`). |
| `quantity` kiểu số nguyên | Biên quanh tính nguyên của số lượng. | `quantity=1.5` (không nguyên); `quantity=1` (nguyên hợp lệ); `quantity=2` (nguyên hợp lệ). |
| Hành động `+` | Tăng số lượng quanh biên tối thiểu. | Trước thao tác `quantity=1`, sau `+` là `2`; trước thao tác `quantity=2`, sau `+` là `3`. |
| Hành động `-` | Giảm số lượng quanh biên tối thiểu. | Trước thao tác `quantity=2`, sau `-` là `1`; trước thao tác `quantity=1`, sau `-` không được là `0` hoặc âm. |
| `Thành tiền` | Công thức tại biên số lượng. | Với `price=100000`: `quantity=1` thì `Thành tiền=100000`; `quantity=2` thì `Thành tiền=200000`. |
| Tổng tiền | Tổng tại biên số dòng. | `item_count=0` thì tổng không có dòng sản phẩm; `item_count=1` tổng bằng thành tiền dòng đó; `item_count=2` tổng bằng tổng hai thành tiền. |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR07-001 | Trạng thái giỏ hàng hiện tại | `item_count=0` | User hợp lệ có giỏ hàng rỗng; mở màn hình Giỏ hàng | Hiển thị trạng thái giỏ trống với hình minh họa và thông báo rõ ràng; không hiển thị dòng sản phẩm. |
| BV-FR07-002 | Trạng thái giỏ hàng hiện tại | `item_count=1` | Giỏ có 1 dòng: `id=1`, `price=100000`, `quantity=1` | Hiển thị bảng giỏ hàng đủ cột; tổng tiền bằng thành tiền của dòng duy nhất, nhãn `"Tổng cộng"`. |
| BV-FR07-003 | Trạng thái giỏ hàng hiện tại | `item_count=2` | Giỏ có 2 dòng: `id=1`, `price=100000`, `quantity=1`; `id=2`, `price=150000`, `quantity=1` | Hiển thị 2 dòng riêng biệt; tổng tiền `250.000 ₫`. |
| BV-FR07-004 | `quantity` khi thêm vào giỏ | `min-1`, `quantity=0` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}` | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| BV-FR07-005 | `quantity` khi thêm vào giỏ | `min`, `quantity=1` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1}` | Chấp nhận thêm vào giỏ nếu sản phẩm hợp lệ; dòng giỏ hàng có số lượng 1; thành tiền `100.000 ₫`. |
| BV-FR07-006 | `quantity` khi thêm vào giỏ | `min+1`, `quantity=2` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}` | Chấp nhận thêm vào giỏ nếu sản phẩm hợp lệ; dòng giỏ hàng có số lượng 2; thành tiền `200.000 ₫`. |
| BV-FR07-007 | `quantity` kiểu số nguyên | Không nguyên sát miền hợp lệ | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1.5}` | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| BV-FR07-008 | Hành động `+` | Từ `quantity=1` lên `2` | Giỏ có dòng `id=1`, `price=100000`, `quantity=1`; bấm `+` | Số lượng thành 2; thành tiền `200.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-009 | Hành động `+` | Từ `quantity=2` lên `3` | Giỏ có dòng `id=1`, `price=100000`, `quantity=2`; bấm `+` | Số lượng thành 3; thành tiền `300.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-010 | Hành động `-` | Từ `quantity=2` về `1` | Giỏ có dòng `id=1`, `price=100000`, `quantity=2`; bấm `-` | Số lượng thành 1; thành tiền `100.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-011 | Hành động `-` | Tại biên `quantity=1` | Giỏ có dòng `id=1`, `price=100000`, `quantity=1`; bấm `-` | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa dùng dialog xác nhận xóa. |
| BV-FR07-012 | `Thành tiền` | Công thức tại `quantity=1` | Dòng giỏ hàng `price=100000`, `quantity=1` | `Thành tiền` hiển thị `100.000 ₫`; tổng tiền chứa giá trị này. |
| BV-FR07-013 | `Thành tiền` | Công thức tại `quantity=2` | Dòng giỏ hàng `price=100000`, `quantity=2` | `Thành tiền` hiển thị `200.000 ₫`; tổng tiền chứa giá trị này. |
| BV-FR07-014 | Tổng tiền | `item_count=1` | Giỏ có 1 dòng `price=100000`, `quantity=2` | Tổng tiền hiển thị `200.000 ₫` với nhãn `"Tổng cộng"`. |
| BV-FR07-015 | Tổng tiền | `item_count=2` | Giỏ có dòng 1 `price=100000`, `quantity=2`; dòng 2 `price=150000`, `quantity=1` | Tổng tiền hiển thị `350.000 ₫` với nhãn `"Tổng cộng"`. |
| BV-FR07-016 | Cộng dồn sản phẩm trùng | Số lượng sau cộng dồn quanh biên | Giỏ đã có `id=1`, `quantity=1`; thêm lại `id=1`, `quantity=1` | Không tạo dòng mới; dòng `id=1` có số lượng 2; thành tiền và tổng tiền cập nhật đúng. |

## 5. Ghi chú rủi ro

- `eshop-sut/api_specification.md` chỉ mô tả `GET /api/cart` và `POST /api/cart`; không mô tả endpoint/API contract cho cập nhật số lượng bằng `+/-` hoặc xóa sản phẩm. Khi thực thi cần xác định các thao tác này kiểm qua UI, API ẩn, hay thiếu đặc tả API.
- FR-07 không nêu hành vi khi bấm `-` tại `quantity=1`. Artifact giả định số lượng không được xuống dưới 1 và việc loại bỏ sản phẩm phải đi qua `Xóa sản phẩm` có dialog xác nhận; cần rà soát thủ công khi thực thi.
- FR-07 không nêu số lượng tối đa, số dòng tối đa trong giỏ, giới hạn giá trị `price`, hoặc xử lý tồn kho, nên artifact không tạo ca BVA cho biên tối đa.
- API `POST /api/cart` nhận cả `name` và `price` từ client theo specification, nhưng yêu cầu nghiệp vụ không nói backend phải đối chiếu lại với catalog. Artifact chỉ ghi expected result ở mức black-box: sản phẩm hợp lệ được thêm và tiền được tính đúng; rủi ro chỉnh sửa `price/name` phía client cần được đánh giá thêm nếu nằm trong mục tiêu bảo mật.
- API specification không nêu status code/thông báo lỗi cụ thể cho token sai hoặc dữ liệu giỏ hàng không hợp lệ, nên expected result của ca lỗi chỉ khẳng định hành vi nghiệp vụ: từ chối thao tác và không cập nhật giỏ hàng sai.
- Các ca kiểm thử trong artifact này đang ở trạng thái thiết kế; khi thực thi cần bổ sung actual result, status, và evidence path theo yêu cầu báo cáo.
