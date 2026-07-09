# FR-07: Giỏ hàng - Thêm vào giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` - Thêm vào giỏ hàng |
| SUT | EShop - Frontend Web và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-06: Xem chi tiết sản phẩm`, `FR-07: Giỏ hàng (Shopping Cart)`, `FR-23: Navigation Requirements`, `FR-24: Feedback & State Requirements`; `eshop-sut/api_specification.md` mục `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình chi tiết sản phẩm có ô `Số lượng` và nút `Thêm vào giỏ hàng`; navbar badge `Giỏ hàng`; endpoint Postman `POST /api/cart` và `GET /api/cart`; header `Authorization: Bearer <token>` chỉ áp dụng khi gọi API bằng Postman |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho hành vi thêm sản phẩm vào giỏ hàng, bao gồm xác thực user, sản phẩm được chọn, số lượng thêm, phản hồi trực quan, badge giỏ hàng và quy tắc thêm cùng một sản phẩm thì tăng số lượng thay vì tạo dòng mới. |
| Ngoài phạm vi | Không kiểm thử chi tiết danh sách sản phẩm, tìm kiếm sản phẩm, hiển thị toàn bộ màn hình giỏ hàng, tăng/giảm số lượng trong giỏ, xóa sản phẩm, checkout, coupon, tồn kho thực tế, bảo mật JWT chuyên sâu, database hoặc mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | API specification mô tả body `POST /api/cart` gồm `id`, `name`, `price`, `quantity` và yêu cầu token, nhưng không nêu status code/body phản hồi khi thành công hoặc lỗi. Khi test qua Web UI, thao tác bấm `Thêm vào giỏ hàng` và mở màn hình Giỏ hàng được quan sát trực tiếp trên giao diện, không yêu cầu tester gửi thủ công `Authorization: Bearer <token>`. Khi test qua Postman, tester cần gửi bearer token hợp lệ cho `POST /api/cart`; sau đó nếu gọi `GET /api/cart` để đối chiếu thì request `GET` cũng phải gửi bearer token hợp lệ. Tài liệu không cung cấp sẵn danh sách product id, tên, giá hoặc tồn kho; ký hiệu `A_id`, `N_A`, `X` lần lượt là id, tên và đơn giá của sản phẩm A quan sát được từ UI/API black-box trong bước chuẩn bị. Sản phẩm B tương tự dùng `B_id`, `N_B`, `Y`. |
| Trạng thái thực thi | Đã ghi nhận kết quả thực tế theo kịch bản black-box qua Web UI và request API. Các kết quả Web mô tả hành vi quan sát được trên giao diện; các kết quả API ghi status code và body response thực tế. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Header xác thực bắt buộc cho `POST /api/cart` và `GET /api/cart` khi kiểm thử bằng Postman; trên Web UI, tester thao tác qua phiên giao diện và không gửi bearer token thủ công. |
| Đầu vào | Sản phẩm được chọn | Sản phẩm đang hiển thị ở màn hình chi tiết hoặc body API với `id`, `name`, `price`; giá trị cụ thể phải lấy từ dữ liệu quan sát được, ví dụ `A_id`, `N_A`, `X`. |
| Đầu vào | `quantity` | Số lượng cần thêm vào giỏ; FR-06 yêu cầu chỉ nhận số nguyên dương, tối thiểu là `1`. |
| Đầu vào | Trạng thái hiện tại của giỏ | Giỏ chưa có sản phẩm được chọn, đã có cùng sản phẩm, hoặc đã có sản phẩm khác; dùng để kiểm quy tắc gộp dòng/tăng số lượng. |
| Đầu ra | Kết quả thêm vào giỏ | Web hiển thị phản hồi trực quan sau khi bấm `Thêm vào giỏ`; API hoàn tất thao tác thêm theo contract, dù contract chưa mô tả body/status chi tiết. |
| Đầu ra | Trạng thái giỏ sau khi thêm | Giỏ có item mới hoặc tăng `quantity` của item hiện có; cùng một sản phẩm không được tạo dòng mới. |
| Đầu ra | Badge giỏ hàng | Link `Giỏ hàng` trên navbar cập nhật badge số lượng sản phẩm trong giỏ theo FR-23/FR-24. |
| Đầu ra | Phản hồi lỗi | Khi thiếu/sai token, sản phẩm không hợp lệ hoặc `quantity` không hợp lệ, hệ thống từ chối thêm vào giỏ và không làm thay đổi giỏ. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | Yêu cầu `POST /api/cart` phải có header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ và đại diện cho user đang thêm sản phẩm vào giỏ. |
| C3 | Sản phẩm được chọn | Phải có một sản phẩm hợp lệ được chọn từ danh mục/chi tiết sản phẩm quan sát được. |
| C4 | Sản phẩm được chọn | Body API khi kiểm thử trực tiếp phải mang dữ liệu sản phẩm quan sát được gồm `id`, `name`, `price`; không dùng dữ liệu tự bịa ngoài catalog. |
| C5 | `quantity` | `quantity` phải được cung cấp. |
| C6 | `quantity` | `quantity` phải là số nguyên. |
| C7 | `quantity` | `quantity` phải là số dương, tối thiểu `1`. |
| C8 | Trạng thái hiện tại của giỏ | Nếu giỏ chưa có sản phẩm được chọn, thêm thành công tạo một item cho sản phẩm đó. |
| C9 | Trạng thái hiện tại của giỏ | Nếu giỏ đã có cùng sản phẩm, thêm tiếp phải tăng số lượng trên dòng hiện có, không tạo dòng mới. |
| C10 | Trạng thái hiện tại của giỏ | Nếu giỏ đã có sản phẩm khác, thêm sản phẩm mới phải giữ item cũ và thêm item khác tương ứng. |
| C11 | Kết quả thêm vào giỏ | Sau khi thêm thành công qua Web, phải có phản hồi trực quan như toast notification hoặc badge cập nhật. |
| C12 | Badge giỏ hàng | Link `Giỏ hàng` phải hiển thị/cập nhật badge số lượng sản phẩm trong giỏ. |
| C13 | Phản hồi lỗi | Với dữ liệu không hợp lệ hoặc xác thực không hợp lệ, hệ thống không được thêm item mới hoặc tăng số lượng trong giỏ. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token | Header `Authorization` có token hợp lệ của user. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép thực hiện thao tác thêm vào giỏ cho user tương ứng. |
| EC02 | `Authorization` token | Thiếu header `Authorization` khi gọi Postman/API hoặc user chưa đăng nhập khi kiểm theo yêu cầu giỏ riêng tư. | Không | Không gửi header; Web ở trạng thái chưa đăng nhập | Postman/API từ chối thêm vào giỏ bằng lỗi xác thực. Web UI được ghi nhận riêng: nếu giao diện vẫn cho thêm vào giỏ phiên hiện tại khi chưa đăng nhập thì đó là hành vi quan sát qua UI, không phải bằng chứng API không cần token. |
| EC03 | `Authorization` token | Header có token sai/hết hạn/không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối thêm vào giỏ; giỏ không thay đổi. |
| EC04 | Sản phẩm được chọn | Sản phẩm hợp lệ được quan sát từ UI/API black-box. | Có | Sản phẩm A: `id=A_id`, `name=N_A`, `price=X` | Có thể thêm sản phẩm A vào giỏ khi các điều kiện khác hợp lệ. |
| EC05 | Sản phẩm được chọn | Không có sản phẩm được chọn hoặc body API thiếu `id` sản phẩm. | Không | Body thiếu `id`; Web không ở màn hình sản phẩm cụ thể | Không thêm sản phẩm vào giỏ; giỏ không thay đổi. |
| EC06 | Sản phẩm được chọn | Sản phẩm không nằm trong catalog quan sát được hoặc dữ liệu sản phẩm trong body không nhất quán với sản phẩm đã chọn. | Không | `id=Z` không xuất hiện trong danh sách sản phẩm quan sát được, hoặc `id=A_id` nhưng `name=N_B` | Không thêm sản phẩm vào giỏ; cần ghi nhận contract gap nếu API không mô tả lỗi cụ thể. |
| EC07 | `quantity` | `quantity` được cung cấp và là số nguyên dương. | Có | `quantity=1` hoặc `quantity=2` | Số lượng được dùng để tạo mới hoặc cộng vào item trong giỏ. |
| EC08 | `quantity` | Thiếu `quantity`. | Không | Body thiếu `quantity`; Web để trống ô số lượng nếu có thể thao tác | Từ chối thêm vào giỏ; giỏ không thay đổi. |
| EC09 | `quantity` | `quantity` không phải số nguyên. | Không | `quantity=1.5` hoặc `quantity="abc"` | Từ chối thêm vào giỏ vì FR-06 chỉ nhận số nguyên dương. |
| EC10 | `quantity` | `quantity` nhỏ hơn tối thiểu `1`. | Không | `quantity=0` | Từ chối thêm vào giỏ vì số lượng tối thiểu là `1`. |
| EC11 | Trạng thái hiện tại của giỏ | Giỏ chưa có sản phẩm được chọn. | Có | Giỏ rỗng, thêm A với `quantity=1` | Giỏ sau khi thêm có một item A với `quantity=1`, đơn giá quan sát `X`. |
| EC12 | Trạng thái hiện tại của giỏ | Giỏ đã có cùng sản phẩm được chọn. | Có | Giỏ đã có A `quantity=1`, thêm A với `quantity=1` | Giỏ sau khi thêm vẫn chỉ có một dòng A, `quantity=2`; không tạo dòng trùng. |
| EC13 | Trạng thái hiện tại của giỏ | Giỏ đã có sản phẩm khác. | Có | Giỏ đã có A, thêm B với `quantity=1` | Giỏ sau khi thêm có item A và item B riêng biệt. |
| EC14 | Trạng thái hiện tại của giỏ | Cùng một sản phẩm được thêm tiếp nhưng xuất hiện thành nhiều dòng riêng biệt. | Không | Hai dòng đều có `id=A_id`, mỗi dòng `quantity=1` | Không đạt FR-07 vì thêm cùng sản phẩm phải tăng số lượng, không tạo dòng mới. |
| EC15 | Kết quả thêm vào giỏ | Web/API thêm vào giỏ thành công và có thể quan sát được. | Có | Web: bấm `Thêm vào giỏ hàng` cho A. Postman: gọi `POST /api/cart` với body quan sát được và bearer token hợp lệ | Web có toast/badge cập nhật và item xuất hiện khi mở giỏ trên UI; với Postman, `POST /api/cart` thành công và `GET /api/cart` có bearer token sau đó phản ánh item đã thêm. |
| EC16 | Kết quả thêm vào giỏ | Không có phản hồi trực quan sau khi thêm thành công trên Web. | Không | Bấm `Thêm vào giỏ hàng` nhưng không có toast và badge không đổi | Không đạt FR-06/FR-24 vì thiếu phản hồi trực quan. |
| EC17 | Badge giỏ hàng | Badge giỏ hàng cập nhật theo số lượng sản phẩm trong giỏ. | Có | Trước khi thêm badge là `0` hoặc rỗng, sau khi thêm A `quantity=1` badge tăng thêm `1` | Navbar phản ánh đúng số lượng sản phẩm trong giỏ. |
| EC18 | Badge giỏ hàng | Badge không cập nhật hoặc cập nhật sai sau thao tác thêm. | Không | Thêm A `quantity=1` nhưng badge không đổi | Không đạt FR-23/FR-24. |
| EC19 | Phản hồi lỗi | Dữ liệu/xác thực không hợp lệ không làm thay đổi giỏ. | Có | Gửi `quantity=0` cho A khi giỏ đang rỗng | API/Web từ chối thao tác; lần đọc giỏ sau đó vẫn không có A. |
| EC20 | Phản hồi lỗi | Dữ liệu/xác thực không hợp lệ vẫn làm thay đổi giỏ. | Không | Gửi `quantity=0` nhưng giỏ có A `quantity=0` hoặc `quantity=1` | Không đạt vì thao tác lỗi không được thêm/sửa giỏ. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-ADDCART-001 | Thêm một sản phẩm hợp lệ vào giỏ rỗng. | Tiền điều kiện: giỏ rỗng. Quan sát sản phẩm A trên UI/API với `id=A_id`, `name=N_A`, `price=X`. Web: mở chi tiết A, nhập `quantity=1`, bấm `Thêm vào giỏ hàng` và mở Giỏ hàng trên UI. Postman: gọi `POST /api/cart` với bearer token hợp lệ và body `{"id": A_id, "name": N_A, "price": X, "quantity": 1}`, sau đó gọi `GET /api/cart` cũng với bearer token hợp lệ. | EC01, EC04, EC07, EC11, EC15, EC17 | Web: hiển thị phản hồi trực quan sau khi thêm, badge giỏ hàng tăng thêm `1`; khi mở giỏ có một dòng A với `quantity=1`, đơn giá `X`; thao tác Web không yêu cầu tester gửi bearer token thủ công. API: contract chưa nêu status/body cụ thể; thao tác được xem là đạt khi `POST /api/cart` có bearer token trả phản hồi thành công theo SUT và lần `GET /api/cart` có bearer token sau đó có A `quantity=1`. | Web: lần bấm đầu tiên vào `Thêm vào giỏ hàng` chưa thêm sản phẩm vào giỏ; lần bấm thứ hai mới hiển thị trạng thái `Đã thêm` tạm thời và sản phẩm xuất hiện trong giỏ, nhưng không thấy badge navbar cập nhật. Postman: `POST /api/cart` có bearer token trả `200 {"message":"Added to cart"}`; `GET /api/cart` có bearer token trả `[{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"quantity":1}]`. | Không |
| EP-FR07-ADDCART-002 | Thêm một sản phẩm hợp lệ với số lượng lớn hơn 1. | Giỏ rỗng. Quan sát A có `id=A_id`, `name=N_A`, `price=X`. Web: thêm A với `quantity=2` qua UI. Postman: thêm A với `quantity=2` bằng `POST /api/cart` có bearer token và đọc lại bằng `GET /api/cart` có bearer token. | EC01, EC04, EC07, EC11, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `2` hoặc phản ánh tổng số lượng trong giỏ theo thiết kế; giỏ có một dòng A `quantity=2`, thành tiền quan sát được là `2X`; không yêu cầu tester gửi bearer thủ công. API: sau `POST /api/cart` có bearer token, lần `GET /api/cart` có bearer token có A `quantity=2`; nếu API trả line total thì giá trị là `2X`. | Web: sau lần bấm thứ hai, giỏ nhận item với `quantity=2`, nhưng không thấy badge navbar cập nhật. Postman: request `POST` có bearer token với `quantity=2` trả `200 {"message":"Added to cart"}` và `GET` có bearer token sau đó giữ nguyên `quantity=2`. | Không |
| EP-FR07-ADDCART-003 | Thêm cùng một sản phẩm nhiều lần phải tăng số lượng, không tạo dòng mới. | Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`. Web: thêm tiếp A với `quantity=1` qua UI. Postman: gọi tiếp `POST /api/cart` có bearer token rồi `GET /api/cart` có bearer token. | EC01, EC04, EC07, EC12, EC14, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `1`; màn hình giỏ chỉ có một dòng A với `quantity=2`, không có hai dòng cùng `A_id`; thành tiền A là `2X`. API: sau `POST /api/cart` có bearer token, `GET /api/cart` có bearer token chỉ có một item `id=A_id` với `quantity=2`; nếu xuất hiện nhiều item cùng `A_id` thì không đạt. | Web: thêm cùng sản phẩm lần nữa tạo thêm một dòng sản phẩm trùng thay vì gộp số lượng. Postman: sau 2 lần `POST` cùng A có bearer token, `GET /api/cart` có bearer token trả 2 object cùng `id=1`, mỗi object `quantity=1`. | Không |
| EP-FR07-ADDCART-004 | Thêm sản phẩm khác khi giỏ đã có sản phẩm. | Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`. Quan sát B có `id=B_id`, `name=N_B`, `price=Y`. Web: thêm B với `quantity=1` qua UI. Postman: gọi `POST /api/cart` có bearer token rồi `GET /api/cart` có bearer token. | EC01, EC04, EC07, EC13, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `1`; giỏ giữ A và thêm B thành dòng riêng, không làm mất item cũ. API: sau `POST /api/cart` có bearer token, `GET /api/cart` có bearer token có cả A và B với số lượng tương ứng. | Postman sau khi thêm B bằng `POST` có bearer token trả danh sách có A và B, nhưng do bước trước đã thêm trùng A nên body là 3 dòng: A, A, B. Web cũng thêm B và giữ item cũ, nhưng không thấy badge navbar cập nhật. | Không |
| EP-FR07-ADDCART-005 | Từ chối thêm vào giỏ khi chưa đăng nhập/thiếu token. | Web: chưa đăng nhập rồi bấm `Thêm vào giỏ hàng` cho A nếu UI cho phép đến màn hình sản phẩm. Postman: gọi `POST /api/cart` không có header `Authorization`; sau đó gọi `GET /api/cart` với bearer token hợp lệ của user test để xác nhận request lỗi không làm đổi giỏ API. | EC02, EC04, EC07, EC13, EC19 | Web: nếu yêu cầu giỏ riêng tư thì nên yêu cầu đăng nhập hoặc hiển thị lỗi xác thực phù hợp; nếu UI vẫn cho thêm vào giỏ phiên hiện tại thì ghi nhận riêng vì đây không phải request API. API: `POST /api/cart` thiếu token trả lỗi xác thực; `GET /api/cart` với user hợp lệ sau đó không xuất hiện item do request thiếu token tạo ra. | Web: vẫn có thể thêm sản phẩm vào giỏ hiển thị trên phiên hiện tại dù chưa đăng nhập, không thấy yêu cầu đăng nhập trước thao tác. Postman: `POST /api/cart` không token trả `401 {"error":"Unauthorized"}`; `GET /api/cart` với bearer token hợp lệ sau đó vẫn `[]` trong batch invalid. | Không |
| EP-FR07-ADDCART-006 | Từ chối thêm vào giỏ khi token không hợp lệ. | Postman: gọi `POST /api/cart` với `Authorization: Bearer invalid.token` và body hợp lệ của A (`A_id`, `N_A`, `X`, `quantity=1`). | EC03, EC04, EC07, EC13, EC19 | API: trả lỗi xác thực theo contract thực tế; giỏ không thay đổi. Web: nếu phiên giao diện hết hạn, ghi nhận theo hành vi UI riêng. | Postman `POST /api/cart` với bearer token sai trả `403 {"error":"Forbidden"}` và không thêm item. | Có |
| EP-FR07-ADDCART-007 | Từ chối thêm khi không có sản phẩm hợp lệ. | API: gọi `POST /api/cart` với body thiếu `id` hoặc không chọn được sản phẩm cụ thể. Web: cố gắng bấm thêm khi không ở màn hình chi tiết sản phẩm nếu UI có đường thao tác tương ứng. | EC01, EC05, EC07, EC13, EC19 | Web/API: không thêm item mới vào giỏ; hiển thị/trả lỗi phù hợp nếu có. API contract chưa nêu status/body lỗi cụ thể, nên cần ghi lại phản hồi thực tế. | API với token hợp lệ và body thiếu field (`{"id":1}`) trả `200 {"message":"Added to cart"}`; `GET /api/cart` có thêm object thiếu dữ liệu `{"id":1}`. Web chỉ có nút thêm trong trang chi tiết sản phẩm. | Không |
| EP-FR07-ADDCART-008 | Từ chối thêm sản phẩm không thuộc catalog quan sát được hoặc dữ liệu body không nhất quán. | API: dùng token hợp lệ, body có `id=Z` không xuất hiện trong danh sách sản phẩm quan sát được, hoặc `id=A_id` nhưng `name=N_B`; `quantity=1`. | EC01, EC06, EC07, EC13, EC19 | API: không được thêm item không có cơ sở từ catalog quan sát được; giỏ không thay đổi. Nếu contract/API vẫn chấp nhận dữ liệu không nhất quán, ghi nhận rủi ro/bug tùy oracle của bài. | API với `id=999`, `name="Ghost Product"`, `price=12345`, `quantity=1` trả `200 {"message":"Added to cart"}`; `GET /api/cart` chứa item giả này. | Không |
| EP-FR07-ADDCART-009 | Từ chối thêm khi thiếu `quantity`. | API: token hợp lệ, body sản phẩm A quan sát được nhưng thiếu `quantity`. Web: nếu có thể để trống ô số lượng, bấm `Thêm vào giỏ hàng`. | EC01, EC04, EC08, EC13, EC19 | Web/API: từ chối thao tác; giỏ không thay đổi; nếu có lỗi hiển thị thì lỗi phải gần thao tác/ô nhập và không mơ hồ. | API không báo lỗi khi thiếu `quantity`; body thiếu field vẫn trả `200` và được lưu. Web cho phép để trống ô số lượng; sau khi bấm thêm, giỏ nhận item có số lượng không hợp lệ thay vì báo lỗi gần ô nhập. | Không |
| EP-FR07-ADDCART-010 | Từ chối thêm khi `quantity` không phải số nguyên. | Token hợp lệ, sản phẩm A hợp lệ, nhập/gửi `quantity=1.5` hoặc `quantity="abc"`. | EC01, EC04, EC09, EC13, EC19 | Web/API: từ chối thao tác vì chỉ nhận số nguyên dương; giỏ không thay đổi. | API với `quantity="abc"` trả `200 {"message":"Added to cart"}` và `GET /api/cart` chứa `"quantity":"abc"`. Web không hiển thị lỗi rõ ràng cho giá trị không phải số nguyên; với `1.5` hệ thống nhận thành `1`, còn chuỗi không số dẫn tới số lượng không hợp lệ trong giỏ. | Không |
| EP-FR07-ADDCART-011 | Từ chối thêm khi `quantity` nhỏ hơn tối thiểu. | Token hợp lệ, sản phẩm A hợp lệ, nhập/gửi `quantity=0`. | EC01, EC04, EC10, EC13, EC19, EC20 | Web/API: từ chối thao tác vì số lượng tối thiểu là `1`; giỏ không có item A với `quantity=0` và cũng không được âm thầm thêm A với số lượng khác. | API với `quantity=0` trả `200` và `GET /api/cart` chứa A `quantity=0`; API với `quantity=-1` cũng trả `200` và lưu A `quantity=-1`. Web cho phép nhập `0`/số âm và sau thao tác vẫn thêm vào giỏ của phiên hiện tại. | Không |
| EP-FR07-ADDCART-012 | Phát hiện thiếu phản hồi trực quan hoặc badge cập nhật sai sau khi thêm thành công. | Đăng nhập user hợp lệ, giỏ rỗng, thêm A với `quantity=1` qua Web và quan sát toast/badge ngay sau thao tác. | EC01, EC04, EC07, EC15, EC16, EC17, EC18 | Web: testcase đạt chỉ khi có phản hồi trực quan và badge giỏ hàng cập nhật phù hợp sau khi thêm. Nếu item thực sự được thêm nhưng không có toast/badge cập nhật thì không đạt FR-06/FR-23/FR-24. API: không kiểm chứng được phản hồi UI qua `POST /api/cart`; dùng `GET /api/cart` để xác nhận trạng thái giỏ. | Web chỉ đổi text nút thành `Đã thêm` trong khoảng 2 giây sau lần bấm thứ hai; không thấy badge giỏ hàng trên navbar, và lần bấm đầu tiên không có phản hồi thêm thành công. | Không |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `quantity` | Số lượng/count | Có | FR-06 nêu `Số lượng` chỉ nhận số nguyên dương và tối thiểu là `1`; đây là miền có thứ tự với biên dưới rõ ràng. |
| Số lượng hiện có của cùng sản phẩm trong giỏ | Số lượng/count | Có | FR-07 quy định thêm cùng sản phẩm thì tăng số lượng; biên tự nhiên để kiểm là sản phẩm chưa có trong giỏ (`0`) và đã có (`1`). |
| Số dòng sản phẩm trong giỏ sau khi thêm | Số lượng/count | Có | Có thể kiểm biên trạng thái từ giỏ rỗng sang một item, và từ một item sang hai item khi thêm sản phẩm khác. |
| `price`/đơn giá | Tiền/số | Không | Tài liệu không nêu min/max hoặc quy tắc validate giá trong `POST /api/cart`; giá phải lấy từ sản phẩm quan sát được và biểu diễn bằng `X`/`Y`. |
| Product `id` | Định danh | Không | `id` là định danh/membership theo catalog quan sát được, phù hợp EP hơn BVA; không có biên số học được đặc tả. |
| `Authorization` token | Chuỗi/token | Không | Token chỉ có trạng thái hợp lệ/không hợp lệ; không có biên độ dài hoặc thứ tự được đặc tả. |
| Toast/badge | Trạng thái UI | Không | Đây là điều kiện hiển thị/cập nhật, phù hợp EP hơn BVA. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `quantity` | Tối thiểu `1`; không có tối đa được đặc tả | `quantity=0` là dưới min, `quantity=1` là min, `quantity=2` là min+1 |
| Số lượng hiện có của cùng sản phẩm trong giỏ | Chưa có sản phẩm A trong giỏ so với đã có A | `current_quantity(A)=0` trước khi thêm, `current_quantity(A)=1` trước khi thêm, kết quả kỳ vọng lần lượt là `1` và `2` khi thêm `quantity=1` |
| Số dòng sản phẩm trong giỏ sau khi thêm | Rỗng/có dữ liệu và thêm sản phẩm khác | `0 dòng -> 1 dòng` khi thêm A; `1 dòng A -> 1 dòng A` khi thêm lại A; `1 dòng A -> 2 dòng A,B` khi thêm B |
| Thành tiền của item sau khi thêm | Tính theo đơn giá quan sát và `quantity` hợp lệ | Với `price=X`: `quantity=1 -> X`, `quantity=2 -> 2X`; `quantity=0` không được tạo item hợp lệ |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-ADDCART-001 | `quantity` | `min-1`, `quantity=0` | Đăng nhập user hợp lệ; quan sát A có `id=A_id`, `name=N_A`, `price=X`; thử thêm A với `quantity=0` qua Web/API. | Web: từ chối thêm, không có phản hồi thành công sai lệch, badge/giỏ không tăng. API: contract chưa nêu status/body lỗi; sau request, `GET /api/cart` không được có A với `quantity=0` và không được âm thầm thêm A. | API trả `200` và lưu A `quantity=0`. Web cho phép nhập `0` và sau thao tác vẫn thêm item này vào giỏ của phiên hiện tại. | Không |
| BV-FR07-ADDCART-002 | `quantity` | `min`, `quantity=1` | Giỏ rỗng; Web: thêm A với `quantity=1`, `price=X`. Postman: `POST /api/cart` có bearer token, sau đó `GET /api/cart` có bearer token. | Web: có phản hồi trực quan, badge tăng thêm `1`, giỏ có A `quantity=1`, thành tiền `X`. API: sau `POST /api/cart` có bearer token, `GET /api/cart` có bearer token có A `quantity=1`. | Postman đạt phần trạng thái: `POST` có bearer token trả `200`, `GET` có bearer token có A `quantity=1`. Web chỉ thêm ở lần bấm thứ hai và không có badge navbar. | Không |
| BV-FR07-ADDCART-003 | `quantity` | `min+1`, `quantity=2` | Giỏ rỗng; Web: thêm A với `quantity=2`, `price=X`. Postman: `POST /api/cart` có bearer token, sau đó `GET /api/cart` có bearer token. | Web: có phản hồi trực quan, badge phản ánh thêm `2` hoặc tổng số lượng mới; giỏ có A `quantity=2`, thành tiền `2X`. API: sau `POST /api/cart` có bearer token, `GET /api/cart` có bearer token có A `quantity=2`. | Postman và Web đều ghi nhận item với `quantity=2`, nhưng Web vẫn có lỗi lần bấm đầu tiên không thêm và không thấy badge navbar cập nhật. | Không |
| BV-FR07-ADDCART-004 | Số lượng hiện có của cùng sản phẩm | `current_quantity(A)=0` | Giỏ không có A; Web: thêm A với `quantity=1`. Postman: `POST /api/cart` có bearer token, sau đó `GET /api/cart` có bearer token. | Web: giỏ chuyển từ không có A sang một dòng A `quantity=1`; badge tăng thêm `1`. API: `GET /api/cart` có bearer token sau khi `POST` có bearer token có một item A. | Postman từ giỏ rỗng thêm A thành một item A `quantity=1`. Web thêm được ở lần bấm thứ hai nhưng không có badge. | Không |
| BV-FR07-ADDCART-005 | Số lượng hiện có của cùng sản phẩm | `current_quantity(A)=1` | Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`; Web: thêm tiếp A với `quantity=1`. Postman: `POST /api/cart` có bearer token, sau đó `GET /api/cart` có bearer token. | Web: vẫn chỉ một dòng A, `quantity=2`, thành tiền `2X`; badge tăng thêm `1`. API: `GET /api/cart` có bearer token sau khi thêm chỉ có một item `A_id` với `quantity=2`. | Postman/Web đều append dòng mới cho sản phẩm trùng; Postman `GET` có bearer token trả 2 dòng cùng `id=1`, mỗi dòng `quantity=1`. | Không |
| BV-FR07-ADDCART-006 | Số dòng sản phẩm trong giỏ sau khi thêm | `0 dòng -> 1 dòng` | Giỏ rỗng; thêm A với `quantity=1`. | Web/API: giỏ sau thao tác có đúng một item A. | API đạt: `GET` sau thêm A có đúng một item A. Web đạt trạng thái sau lần bấm thứ hai nhưng lần bấm đầu tiên không thêm. | Không |
| BV-FR07-ADDCART-007 | Số dòng sản phẩm trong giỏ sau khi thêm | `1 dòng A -> 1 dòng A` khi thêm trùng | Giỏ đã có một dòng A; thêm lại A với `quantity=1`. | Web/API: số dòng sản phẩm không tăng do trùng sản phẩm; chỉ `quantity` của A tăng lên `2`. | API/Web tăng số dòng lên 2 thay vì gộp quantity. | Không |
| BV-FR07-ADDCART-008 | Số dòng sản phẩm trong giỏ sau khi thêm | `1 dòng A -> 2 dòng A,B` khi thêm sản phẩm khác | Giỏ đã có A; quan sát B có `id=B_id`, `name=N_B`, `price=Y`; thêm B với `quantity=1`. | Web/API: giỏ sau thao tác có hai dòng sản phẩm khác nhau A và B; không làm mất A. | API/Web append được B và giữ A; trong API batch có thêm lỗi còn tồn tại dòng A trùng từ case trước, nhưng hành vi thêm B không làm mất item cũ. | Có |

## 5. Ghi chú rủi ro

- API specification của `POST /api/cart` chưa mô tả status code/body phản hồi thành công hoặc lỗi; khi thực thi bằng Postman cần ghi lại response thực tế và dùng `GET /api/cart` có bearer token để xác nhận trạng thái giỏ sau thao tác.
- Kết quả Web UI và Postman cần ghi riêng: thêm bằng Web UI rồi mở màn hình Giỏ hàng không yêu cầu tester gửi bearer token thủ công; thêm bằng `POST /api/cart` thì cả request `POST` và request `GET /api/cart` đối chiếu sau đó đều cần `Authorization: Bearer <valid_user_token>`.
- Tài liệu không cung cấp product id, tên, giá hoặc tồn kho cụ thể; tester phải lấy sản phẩm hợp lệ từ UI/API black-box rồi dùng biến `A_id`, `N_A`, `X`, `B_id`, `N_B`, `Y` trong dữ liệu kiểm thử.
- Tài liệu không nêu giới hạn tối đa cho `quantity`, stock khả dụng, hoặc cách xử lý khi số lượng vượt tồn kho; BVA chỉ kiểm biên dưới `1` và `min+1`.
- Với Web, phản hồi trực quan có thể là toast notification hoặc badge cập nhật; nếu hệ thống chọn một dạng khác, tester cần đối chiếu xem phản hồi đó có đủ rõ ràng theo FR-06/FR-24 hay không.
- API nhận cả `name` và `price` trong body là rủi ro contract vì client có thể gửi dữ liệu không nhất quán; artifact chỉ nêu testcase black-box để phát hiện, không suy diễn xử lý nội bộ của hệ thống.
