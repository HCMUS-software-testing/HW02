# FR-07: Giỏ hàng - Thêm sản phẩm vào giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` - chức năng thêm sản phẩm vào giỏ hàng |
| SUT | EShop - Frontend Web, Frontend Mobile, Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-06: Xem chi tiết sản phẩm`, `FR-07: Giỏ hàng (Shopping Cart)`, `FR-23: Navigation Requirements`, `FR-24: Feedback & State Requirements`; `eshop-sut/api_specification.md` mục `4. Giỏ hàng & Đơn hàng (Cart & Orders)` và `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Nút `"Thêm vào giỏ hàng"` trên màn hình chi tiết sản phẩm; endpoint `POST /api/cart`; header `Authorization: Bearer <token>`; body JSON gồm `id`, `name`, `price`, `quantity` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử Domain Testing cho thao tác thêm sản phẩm vào giỏ hàng qua cả giao diện web và API/Postman: thao tác UI với sản phẩm được chọn, gửi request/API tương ứng, số lượng hợp lệ, phản hồi trực quan sau khi thêm, badge giỏ hàng cập nhật, và quy tắc thêm cùng một sản phẩm thì tăng số lượng thay vì tạo dòng mới. |
| Ngoài phạm vi | Không kiểm thử lấy danh sách giỏ hàng bằng `GET /api/cart`, chỉnh số lượng bằng nút `+/-`, xóa sản phẩm, dialog xác nhận xóa, checkout, coupon, quản lý sản phẩm admin, hoặc kiểm thử bảo mật sâu cho JWT. |
| Giả định/ràng buộc thiếu | API spec không nêu status code/thông báo thành công hoặc lỗi cho `POST /api/cart`. API spec đưa body mẫu có `id`, `name`, `price`, `quantity` nhưng không mô tả kiểu dữ liệu/ràng buộc của `id`, `name`, `price`; artifact giả định các field này là bắt buộc vì xuất hiện trong contract body. README quy định `quantity` ở màn hình chi tiết sản phẩm chỉ nhận số nguyên dương, tối thiểu `1`; không nêu giới hạn tối đa quantity. README không nêu badge là tổng số dòng hay tổng số lượng; artifact giả định badge phản ánh tổng `quantity` sản phẩm trong giỏ vì yêu cầu ghi “badge số lượng sản phẩm trong giỏ”. |
| Trạng thái thực thi | Chưa thực thi; từng testcase được thiết kế để chạy qua cả giao diện web và API/Postman; cần bổ sung `Kết quả thực tế`, `Đạt`, status/body API thực tế và evidence path sau khi chạy kiểm thử. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào API | `Authorization` header | Header `Authorization: Bearer <token>` bắt buộc cho nhóm Cart & Orders theo `api_specification.md`. |
| Đầu vào API | `id` | Mã sản phẩm trong body JSON của `POST /api/cart`. |
| Đầu vào API | `name` | Tên sản phẩm trong body JSON của `POST /api/cart`. |
| Đầu vào API | `price` | Đơn giá sản phẩm trong body JSON của `POST /api/cart`. |
| Đầu vào API/UI | `quantity` | Số lượng thêm vào giỏ; README FR-06 quy định ô số lượng chỉ nhận số nguyên dương, tối thiểu `1`; API body cũng gửi `quantity`. |
| Đầu vào UI | Hành động `"Thêm vào giỏ hàng"` | Người dùng bấm nút thêm vào giỏ từ màn hình chi tiết sản phẩm. |
| Tiền điều kiện / trạng thái dữ liệu | Trạng thái đăng nhập | Người dùng đã đăng nhập và có token hợp lệ để gọi `POST /api/cart`. |
| Tiền điều kiện / trạng thái dữ liệu | Trạng thái giỏ trước khi thêm | Giỏ chưa có sản phẩm được thêm hoặc đã có cùng sản phẩm; trạng thái này quyết định thêm dòng mới hay tăng số lượng. |
| Đầu ra API/UI | Phản hồi thêm vào giỏ | Hệ thống chấp nhận request hợp lệ và cập nhật giỏ hàng của user tương ứng. |
| Đầu ra UI | Phản hồi trực quan | Sau khi bấm thêm vào giỏ, UI hiển thị toast notification hoặc badge cập nhật theo README FR-06/FR-24. |
| Đầu ra UI | Badge giỏ hàng | Link `"Giỏ hàng"` trên navbar hiển thị badge số lượng sản phẩm trong giỏ theo FR-23. |
| Đầu ra trạng thái giỏ | Dòng sản phẩm trong giỏ | Nếu sản phẩm chưa có trong giỏ thì tạo dòng mới; nếu cùng sản phẩm đã có thì tăng số lượng, không tạo dòng mới. |
| Đầu ra lỗi | Phản hồi lỗi xác thực / dữ liệu không hợp lệ | Khi thiếu/sai token hoặc body không hợp lệ, hệ thống từ chối thêm sản phẩm và không cập nhật giỏ hàng. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` header | Request `POST /api/cart` phải có header `Authorization`. |
| C2 | `Authorization` header | Header xác thực phải theo dạng `Bearer <token>`. |
| C3 | `Authorization` header | `<token>` phải là JWT hợp lệ của một user đã đăng nhập. |
| C4 | `id` | Body JSON phải có field `id`. |
| C5 | `id` | `id` phải đại diện cho sản phẩm được thêm vào giỏ. |
| C6 | `name` | Body JSON phải có field `name`. |
| C7 | `name` | `name` không được rỗng khi gửi thông tin sản phẩm vào giỏ. |
| C8 | `price` | Body JSON phải có field `price`. |
| C9 | `price` | `price` phải là giá trị số tiền hợp lệ để tính đơn giá/thành tiền. |
| C10 | `quantity` | Body JSON hoặc ô số lượng UI phải có `quantity`. |
| C11 | `quantity` | `quantity` phải là số nguyên. |
| C12 | `quantity` | `quantity` phải là số nguyên dương, tối thiểu `1`. |
| C13 | Hành động `"Thêm vào giỏ hàng"` | Khi người dùng bấm thêm với dữ liệu hợp lệ, hệ thống phải xử lý thao tác thêm vào giỏ. |
| C14 | Trạng thái giỏ trước khi thêm | Nếu sản phẩm chưa có trong giỏ, hệ thống tạo một dòng sản phẩm mới trong giỏ. |
| C15 | Trạng thái giỏ trước khi thêm | Nếu cùng sản phẩm đã có trong giỏ, hệ thống tăng số lượng của dòng hiện có. |
| C16 | Dòng sản phẩm trong giỏ | Khi thêm cùng một sản phẩm, hệ thống không được tạo dòng mới trùng sản phẩm. |
| C17 | Phản hồi trực quan | Sau khi thêm vào giỏ thành công, UI phải có phản hồi trực quan dạng toast notification hoặc badge cập nhật. |
| C18 | Badge giỏ hàng | Badge trên link `"Giỏ hàng"` phải cập nhật theo số lượng sản phẩm trong giỏ. |
| C19 | Phản hồi lỗi | Khi request thiếu/sai token hoặc body không hợp lệ, giỏ hàng không được cập nhật. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` header | Có header theo dạng `Bearer <token>` và token hợp lệ. | Có | `Authorization: Bearer valid_user_jwt` | Cho phép xử lý request thêm sản phẩm vào giỏ của user tương ứng. |
| EC02 | `Authorization` header | Thiếu header `Authorization`. | Không | Không gửi header | Từ chối thêm vào giỏ; giỏ hàng không thay đổi. |
| EC03 | `Authorization` header | Header không theo dạng `Bearer <token>`. | Không | `Authorization: valid_user_jwt` | Từ chối thêm vào giỏ do sai định dạng xác thực; giỏ hàng không thay đổi. |
| EC04 | `Authorization` header | Token sai/không hợp lệ/hết hạn. | Không | `Authorization: Bearer invalid_or_expired_token` | Từ chối thêm vào giỏ do token không hợp lệ; giỏ hàng không thay đổi. |
| EC05 | `id` | Body có `id` đại diện cho sản phẩm được thêm. | Có | `"id": 1` | Request có đủ mã sản phẩm để thêm vào giỏ. |
| EC06 | `id` | Thiếu field `id`. | Không | Body không có `id` | Từ chối request vì thiếu thông tin sản phẩm bắt buộc; giỏ hàng không thay đổi. |
| EC07 | `id` | `id` không đại diện cho sản phẩm hợp lệ trong ngữ cảnh thêm vào giỏ. | Không | `"id": null` hoặc `"id": "abc"` | Từ chối request vì mã sản phẩm không hợp lệ; giỏ hàng không thay đổi. |
| EC08 | `name` | Body có `name` không rỗng. | Có | `"name": "Sản phẩm A"` | Request có đủ tên sản phẩm để hiển thị trong dòng giỏ hàng. |
| EC09 | `name` | Thiếu field `name`. | Không | Body không có `name` | Từ chối request vì thiếu thông tin sản phẩm bắt buộc; giỏ hàng không thay đổi. |
| EC10 | `name` | `name` rỗng. | Không | `"name": ""` | Từ chối request hoặc không tạo dòng giỏ hàng thiếu tên sản phẩm. |
| EC11 | `price` | Body có `price` là số tiền hợp lệ. | Có | `"price": 100000` | Request có đủ đơn giá để tạo/cập nhật dòng giỏ hàng. |
| EC12 | `price` | Thiếu field `price`. | Không | Body không có `price` | Từ chối request vì thiếu đơn giá; giỏ hàng không thay đổi. |
| EC13 | `price` | `price` không phải số tiền hợp lệ. | Không | `"price": "100000"` hoặc `"price": -1` | Từ chối request hoặc không tạo dòng giỏ hàng có đơn giá không hợp lệ. |
| EC14 | `quantity` | `quantity` là số nguyên dương. | Có | `"quantity": 2` | Chấp nhận số lượng thêm vào giỏ. |
| EC15 | `quantity` | Thiếu field `quantity`. | Không | Body không có `quantity` | Từ chối request vì thiếu số lượng; giỏ hàng không thay đổi. |
| EC16 | `quantity` | `quantity` nhỏ hơn tối thiểu `1`. | Không | `"quantity": 0` | Từ chối request vì số lượng không phải số nguyên dương; giỏ hàng không thay đổi. |
| EC17 | `quantity` | `quantity` không phải số nguyên. | Không | `"quantity": 1.5` | Từ chối request vì số lượng không phải số nguyên; giỏ hàng không thay đổi. |
| EC18 | `quantity` | `quantity` không phải số. | Không | `"quantity": "2"` | Từ chối request vì số lượng không đúng miền số nguyên; giỏ hàng không thay đổi. |
| EC19 | Hành động `"Thêm vào giỏ hàng"` | Người dùng bấm nút thêm với dữ liệu hợp lệ. | Có | Chọn sản phẩm A, quantity `2`, bấm `"Thêm vào giỏ hàng"` | Hệ thống gửi/xử lý thêm vào giỏ và có phản hồi trực quan. |
| EC20 | Trạng thái giỏ trước khi thêm | Sản phẩm chưa có trong giỏ. | Có | Giỏ chưa có `id=1`, thêm `id=1`, `quantity=2` | Giỏ có thêm một dòng mới cho sản phẩm `id=1` với quantity `2`. |
| EC21 | Trạng thái giỏ trước khi thêm | Cùng sản phẩm đã có trong giỏ. | Có | Giỏ có `id=1`, `quantity=1`; thêm `id=1`, `quantity=2` | Dòng `id=1` tăng quantity thành `3`; không tạo dòng mới. |
| EC22 | Dòng sản phẩm trong giỏ | Sau khi thêm cùng sản phẩm, chỉ có một dòng cho sản phẩm đó. | Có | Một dòng `id=1`, `quantity=3` | UI/API giỏ hàng không có dòng trùng sản phẩm `id=1`. |
| EC23 | Dòng sản phẩm trong giỏ | Sau khi thêm cùng sản phẩm, hệ thống tạo dòng trùng sản phẩm. | Không | Hai dòng cùng `id=1` | Không đạt FR-07 vì thêm cùng sản phẩm phải tăng số lượng, không tạo dòng mới. |
| EC24 | Phản hồi trực quan | Thêm thành công có toast notification hoặc badge cập nhật. | Có | Toast `"Đã thêm vào giỏ"` hoặc badge tăng | UI đạt yêu cầu phản hồi sau thao tác thêm vào giỏ. |
| EC25 | Phản hồi trực quan | Thêm thành công nhưng không có phản hồi trực quan. | Không | Không toast, badge không đổi | UI không đạt FR-06/FR-24 vì thiếu phản hồi sau khi thêm. |
| EC26 | Badge giỏ hàng | Badge cập nhật đúng theo số lượng sản phẩm trong giỏ. | Có | Trước badge `1`, thêm `quantity=2`, sau badge `3` | Link `"Giỏ hàng"` hiển thị số lượng mới nhất theo giả định tổng `quantity`. |
| EC27 | Badge giỏ hàng | Badge không cập nhật hoặc cập nhật sai. | Không | Trước badge `1`, sau khi thêm vẫn là `1` | UI không đạt FR-23/FR-24 vì badge không phản ánh số lượng mới. |
| EC28 | Phản hồi lỗi | Request không hợp lệ không làm thay đổi giỏ hàng. | Có | Trước giỏ có 1 dòng; gửi body thiếu `quantity` | Hệ thống từ chối request và giỏ vẫn giữ nguyên như trước. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-ADDCART-001 | Thêm sản phẩm mới vào giỏ với request hợp lệ. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: `POST /api/cart`; `Authorization: Bearer valid_user_jwt`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}`; giỏ chưa có `id=1`. | EC01, EC05, EC08, EC11, EC14, EC20, EC24, EC26 | Web: Hệ thống chấp nhận request; giỏ có một dòng mới `id=1`, `name="Sản phẩm A"`, `price=100000`, `quantity=2`; UI có toast hoặc badge cập nhật; badge tăng thêm `2` theo giả định tổng quantity. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-002 | Thêm cùng một sản phẩm đã có trong giỏ. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ đang có một dòng `id=1`, `quantity=1`; gửi body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}` với token hợp lệ. | EC01, EC05, EC08, EC11, EC14, EC21, EC22, EC24, EC26 | Web: Hệ thống tăng quantity của dòng `id=1` thành `3`; không tạo dòng mới trùng sản phẩm; UI có phản hồi trực quan; badge cập nhật thành `3` nếu trước đó chỉ có sản phẩm này. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-003 | Thêm sản phẩm bằng thao tác UI hợp lệ. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Màn hình chi tiết sản phẩm A; nhập `quantity=2`; bấm `"Thêm vào giỏ hàng"` khi đã đăng nhập. | EC01, EC14, EC19, EC20, EC24, EC26 | Web: UI xử lý thêm vào giỏ; có toast notification hoặc badge cập nhật; sản phẩm A xuất hiện trong giỏ với quantity `2`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-004 | Từ chối thêm vào giỏ khi thiếu header xác thực. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: `POST /api/cart`; không gửi `Authorization`; body hợp lệ. | EC02, EC28 | Web: Hệ thống từ chối request; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-005 | Từ chối thêm vào giỏ khi header sai dạng `Bearer`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: `Authorization: valid_user_jwt`; body hợp lệ. | EC03, EC28 | Web: Hệ thống từ chối request do sai định dạng xác thực; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-006 | Từ chối thêm vào giỏ khi token không hợp lệ/hết hạn. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: `Authorization: Bearer invalid_or_expired_token`; body hợp lệ. | EC04, EC28 | Web: Hệ thống từ chối request; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-007 | Từ chối body thiếu `id`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"name":"Sản phẩm A","price":100000,"quantity":2}`. | EC06, EC28 | Web: Hệ thống không thêm sản phẩm vì thiếu mã sản phẩm; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-008 | Từ chối `id` không hợp lệ. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":null,"name":"Sản phẩm A","price":100000,"quantity":2}`. | EC07, EC28 | Web: Hệ thống không thêm sản phẩm vì `id` không đại diện cho sản phẩm hợp lệ; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-009 | Từ chối body thiếu `name`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"price":100000,"quantity":2}`. | EC09, EC28 | Web: Hệ thống không tạo dòng giỏ hàng thiếu tên sản phẩm; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-010 | Từ chối `name` rỗng. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"","price":100000,"quantity":2}`. | EC10, EC28 | Web: Hệ thống không tạo dòng giỏ hàng có tên rỗng; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-011 | Từ chối body thiếu `price`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","quantity":2}`. | EC12, EC28 | Web: Hệ thống không thêm sản phẩm vì thiếu đơn giá; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-012 | Từ chối `price` không hợp lệ. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":-1,"quantity":2}`. | EC13, EC28 | Web: Hệ thống không tạo dòng giỏ hàng có đơn giá không hợp lệ; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-013 | Từ chối body thiếu `quantity`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000}`. | EC15, EC28 | Web: Hệ thống không thêm sản phẩm vì thiếu số lượng; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-014 | Từ chối `quantity` nhỏ hơn `1`. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}`. | EC16, EC28 | Web: Hệ thống không thêm sản phẩm vì quantity không phải số nguyên dương; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-015 | Từ chối `quantity` không phải số nguyên. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1.5}`. | EC17, EC28 | Web: Hệ thống không thêm sản phẩm vì quantity không phải số nguyên; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-016 | Từ chối `quantity` không phải số. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":"2"}`. | EC18, EC28 | Web: Hệ thống không thêm sản phẩm vì quantity không đúng miền số nguyên; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-017 | Phát hiện lỗi tạo dòng trùng khi thêm cùng sản phẩm. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ đang có một dòng `id=1`, `quantity=1`; thêm `id=1`, `quantity=2`; quan sát giỏ sau thao tác. | EC23 | Web: Test fail nếu giỏ có hai dòng cùng `id=1`; expected là một dòng duy nhất với quantity `3`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-018 | Phát hiện thiếu phản hồi trực quan sau khi thêm thành công. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Thêm sản phẩm hợp lệ qua UI; quan sát toast/badge sau thao tác. | EC25 | Web: UI không đạt FR-06/FR-24 nếu không có toast notification và badge cũng không cập nhật. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| EP-FR07-ADDCART-019 | Phát hiện badge cập nhật sai sau khi thêm thành công. | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Trước thao tác badge `1`; thêm `quantity=2` thành công; quan sát badge. | EC27 | Web: Test fail nếu badge không thành `3` theo giả định badge là tổng quantity. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `Authorization` header | Định dạng/token rời rạc | Không | Token có/không, đúng/sai dạng, hợp lệ/không hợp lệ là các lớp rời rạc; phù hợp EP hơn BVA. |
| `id` | Định danh sản phẩm | Không | API spec chỉ đưa ví dụ `id=1`, không nêu miền min/max hoặc quy tắc biên cho định danh sản phẩm. |
| `name` | Chuỗi | Không | API spec không nêu độ dài tối thiểu/tối đa; chỉ kiểm tra lớp có/thiếu/rỗng bằng EP. |
| `price` | Số tiền | Không | API spec chỉ đưa ví dụ `price=100000`, không nêu min/max hoặc đơn vị nhỏ nhất để phân tích biên một cách đặc tả hóa. |
| `quantity` | Số nguyên/số lượng | Có | README FR-06 nêu rõ ô số lượng chỉ nhận số nguyên dương, tối thiểu `1`; đây là biên dưới có thể kiểm thử. |
| Số dòng của cùng sản phẩm trong giỏ sau khi thêm | Count/trạng thái dữ liệu | Có | FR-07 nêu cùng một sản phẩm thì tăng số lượng, không tạo dòng mới; biên quan trọng là chưa có dòng `0` và đã có một dòng `1`. |
| Badge số lượng giỏ hàng | Count | Có | Badge phải cập nhật theo số lượng sản phẩm trong giỏ; có biên tự nhiên từ giỏ trống/không có sản phẩm đến có sản phẩm. |
| Toast notification / phản hồi trực quan | Trạng thái UI rời rạc | Không | Có/không có phản hồi là miền rời rạc, phù hợp EP. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `quantity` | Tối thiểu là `1` và phải là số nguyên dương | `0` (`min-1`); `1` (`min`); `2` (`min+1`). |
| Số dòng của cùng sản phẩm trong giỏ trước/sau khi thêm | Quy tắc merge dòng sản phẩm | Trước khi thêm có `0` dòng cùng `id` -> sau khi thêm có `1` dòng mới; trước khi thêm có `1` dòng cùng `id` -> sau khi thêm vẫn `1` dòng và tăng quantity; sau khi thêm có `2` dòng cùng `id` là lỗi. |
| Badge số lượng giỏ hàng | Cập nhật theo số lượng sản phẩm trong giỏ | Trước `0`, thêm `quantity=1` -> sau `1`; trước `1`, thêm `quantity=1` -> sau `2`; trước `1`, thêm `quantity=2` -> sau `3`. |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-ADDCART-001 | `quantity` | `min-1 = 0` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: `POST /api/cart`; token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}`. | Web: Hệ thống từ chối request vì quantity không phải số nguyên dương; giỏ hàng không thay đổi. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-002 | `quantity` | `min = 1` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1}`; giỏ chưa có `id=1`. | Web: Hệ thống chấp nhận; giỏ có một dòng `id=1`, quantity `1`; có toast hoặc badge cập nhật. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-003 | `quantity` | `min+1 = 2` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}`; giỏ chưa có `id=1`. | Web: Hệ thống chấp nhận; giỏ có một dòng `id=1`, quantity `2`; có toast hoặc badge cập nhật. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-004 | Số dòng của cùng sản phẩm trong giỏ | Trước khi thêm có `0` dòng cùng `id` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ chưa có `id=1`; thêm `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1}`. | Web: Sau thao tác, giỏ có đúng một dòng mới cho `id=1` với quantity `1`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-005 | Số dòng của cùng sản phẩm trong giỏ | Trước khi thêm có `1` dòng cùng `id` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ có một dòng `id=1`, quantity `1`; thêm `id=1`, quantity `1`. | Web: Sau thao tác, giỏ vẫn có đúng một dòng `id=1`, quantity tăng thành `2`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-006 | Số dòng của cùng sản phẩm trong giỏ | Sau khi thêm có `2` dòng cùng `id` là lỗi | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ có một dòng `id=1`, quantity `1`; thêm `id=1`, quantity `1`; quan sát danh sách giỏ sau thao tác. | Web: Test fail nếu có hai dòng cùng `id=1`; expected là một dòng duy nhất với quantity `2`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-007 | Badge số lượng giỏ hàng | Trước `0`, sau `1` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ trống; thêm `quantity=1` thành công. | Web: Badge link `"Giỏ hàng"` cập nhật từ `0` hoặc trạng thái trống sang `1`. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-008 | Badge số lượng giỏ hàng | Trước `1`, sau `2` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ có tổng quantity `1`; thêm cùng sản phẩm `quantity=1` thành công. | Web: Badge cập nhật thành `2` theo giả định badge là tổng quantity. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |
| BV-FR07-ADDCART-009 | Badge số lượng giỏ hàng | Trước `1`, sau `3` | Web: thực hiện thao tác/thiết lập trạng thái tương ứng trên giao diện với cùng dữ liệu; API/Postman: gửi request hoặc chuẩn bị trạng thái API tương ứng: Giỏ có tổng quantity `1`; thêm `quantity=2` thành công. | Web: Badge cập nhật thành `3` theo giả định badge là tổng quantity. API: `POST /api/cart` trả về phản hồi chấp nhận hoặc từ chối tương ứng với cùng dữ liệu; do API spec không nêu status/body cụ thể, ghi nhận status code/body thực tế và đối chiếu trạng thái giỏ bằng `GET /api/cart` khi cần. |  |  |

## 5. Ghi chú rủi ro

- `Authorization: Bearer <token>` nằm trong `eshop-sut/api_specification.md` mục `4. Giỏ hàng & Đơn hàng (Cart & Orders)`, áp dụng cho `POST /api/cart`.
- API spec không mô tả response body/status code cho `POST /api/cart`, nên expected result không gán cứng mã HTTP; khi thực thi cần ghi actual status/body.
- API spec yêu cầu body có cả `id`, `name`, `price`, `quantity`, nhưng không nói backend phải tự tra cứu `name/price` theo `id` hay tin dữ liệu client gửi. Đây là rủi ro dữ liệu cần rà soát thủ công khi thiết kế test bảo mật/tính toàn vẹn.
- README nêu rõ rule “Thêm cùng một sản phẩm vào giỏ sẽ tăng số lượng, không tạo dòng mới”; vì vậy trạng thái giỏ trước khi thêm được ghi là tiền điều kiện/trạng thái dữ liệu, không phải input API trực tiếp.
- Không có biên tối đa cho `quantity`, số dòng giỏ, hoặc tổng số lượng badge, nên BVA chỉ kiểm biên dưới `quantity=1` và biên trạng thái `0/1` dòng cùng sản phẩm được đặc tả trực tiếp.
- Badge giỏ hàng không được đặc tả là tổng số dòng hay tổng `quantity`; artifact giả định là tổng `quantity` sản phẩm trong giỏ, cần người học xác nhận khi thực thi.
- Không viết phần `AI gap analysis` trong artifact; phần đó để người học tự điền sau khi rà soát và thực thi.
