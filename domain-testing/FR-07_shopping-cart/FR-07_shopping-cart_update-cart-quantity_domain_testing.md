# FR-07: Giỏ hàng - Cập nhật số lượng trong giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` - Cập nhật số lượng trong giỏ hàng |
| SUT | EShop - Frontend Web và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-07: Giỏ hàng (Shopping Cart)`, `FR-21: Tiêu chuẩn Giao diện Chung`, `FR-23: Navigation Requirements`; `eshop-sut/api_specification.md` mục `4.1 Lấy giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình Giỏ hàng với cột `Số lượng` và nút `+/-`; endpoint Postman đối chiếu trạng thái `GET /api/cart`; header `Authorization: Bearer <token>` chỉ áp dụng khi gọi API bằng Postman |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho hành vi thay đổi số lượng của một sản phẩm đã có trong giỏ bằng nút `+/-`, bao gồm cập nhật số lượng, thành tiền từng dòng, tổng cộng và không cho giỏ hợp lệ có số lượng nhỏ hơn `1`. |
| Ngoài phạm vi | Không kiểm thử thêm sản phẩm vào giỏ, xóa sản phẩm bằng nút xóa, checkout, coupon, cập nhật tồn kho, bảo mật JWT chuyên sâu, database hoặc mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | API specification không mô tả endpoint cập nhật số lượng trong giỏ; artifact xem thao tác cập nhật là Web UI chính. Khi quan sát trên Web UI, tester mở màn hình giỏ và thao tác giao diện, không gửi thủ công bearer token. Nếu dùng `GET /api/cart` bằng Postman để đối chiếu API thì request phải có `Authorization: Bearer <valid_user_token>` và chỉ phản ánh giỏ API, không mặc định phản ánh dữ liệu vừa thêm/chỉnh qua UI. Tài liệu không nêu giới hạn tối đa `quantity`, tồn kho hoặc hành vi chính xác khi bấm `-` tại `quantity=1`; artifact giả định giỏ hợp lệ không được hiển thị item có `quantity=0` hoặc âm. Giá sản phẩm không được bịa; `X` là đơn giá sản phẩm A quan sát từ UI/API black-box khi dựng tiền điều kiện. |
| Trạng thái thực thi | Đã ghi nhận kết quả thực tế theo kịch bản black-box qua Web UI và request API. Các kết quả Web mô tả hành vi quan sát được trên giao diện; các kết quả API ghi status code và body response thực tế. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | Trạng thái đăng nhập / `Authorization` token | Trên Web UI, tester thao tác trong phiên giao diện; khi đối chiếu bằng Postman/API thì `GET /api/cart` dùng header `Authorization: Bearer <token>`. |
| Đầu vào | Item trong giỏ | Sản phẩm A đã có trong giỏ, với `id=A_id`, `name=N_A`, `price=X`, `quantity=q` được dựng qua UI. |
| Đầu vào | Thao tác cập nhật số lượng | Người dùng bấm nút `+` hoặc `-` tại dòng sản phẩm trong màn hình giỏ. |
| Đầu vào | Số lượng hiện tại | Số lượng trước thao tác, ví dụ `q=1` hoặc `q=2`; miền hợp lệ tối thiểu là `1`. |
| Đầu ra | Số lượng sau cập nhật | Dòng sản phẩm hiển thị số lượng mới tương ứng với thao tác hợp lệ. |
| Đầu ra | Thành tiền của dòng | `Thành tiền` của dòng bằng `Đơn giá × Số lượng` sau cập nhật. |
| Đầu ra | Tổng cộng | Tổng tiền hiển thị nhãn `Tổng cộng` và giá trị bằng tổng thành tiền các dòng. |
| Đầu ra | Trạng thái lỗi/không đổi | Với thao tác không hợp lệ hoặc chưa đăng nhập, giỏ không được cập nhật sai. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | Trạng thái đăng nhập / `Authorization` token | Người dùng phải đăng nhập để chỉnh giỏ hàng của chính mình. |
| C2 | Trạng thái đăng nhập / `Authorization` token | Token dùng để đối chiếu Postman/API bằng `GET /api/cart` phải hợp lệ. |
| C3 | Item trong giỏ | Phải có ít nhất một sản phẩm hợp lệ trong giỏ trước khi cập nhật số lượng. |
| C4 | Thao tác cập nhật số lượng | Nút `+` phải tăng số lượng của đúng dòng sản phẩm được thao tác. |
| C5 | Thao tác cập nhật số lượng | Nút `-` phải giảm số lượng của đúng dòng sản phẩm được thao tác khi số lượng hiện tại lớn hơn `1`. |
| C6 | Số lượng hiện tại | Số lượng hợp lệ trong giỏ là số nguyên dương, tối thiểu `1`. |
| C7 | Số lượng sau cập nhật | Sau thao tác hợp lệ, số lượng hiển thị phải khớp với số lượng mới. |
| C8 | Thành tiền của dòng | `Thành tiền` phải bằng `Đơn giá × Số lượng` sau cập nhật. |
| C9 | Tổng cộng | Tổng tiền phải hiển thị với nhãn chính xác `Tổng cộng`. |
| C10 | Tổng cộng | Giá trị `Tổng cộng` phải bằng tổng `Thành tiền` của các dòng sau cập nhật. |
| C11 | Trạng thái lỗi/không đổi | Khi thao tác không hợp lệ hoặc xác thực không hợp lệ, hệ thống không được tạo số lượng `0`, âm, không phải số nguyên, hoặc cập nhật nhầm dòng. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | Trạng thái đăng nhập / `Authorization` token | User đã đăng nhập và có token hợp lệ. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép xem và chỉnh giỏ hàng của user tương ứng. |
| EC02 | Trạng thái đăng nhập / `Authorization` token | User chưa đăng nhập hoặc thiếu token khi đối chiếu API. | Không | Không đăng nhập; không gửi header `Authorization` | Không cho chỉnh giỏ riêng tư; API `GET /api/cart` trả lỗi xác thực theo contract thực tế. |
| EC03 | Trạng thái đăng nhập / `Authorization` token | Token sai/hết hạn/không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối truy cập/đối chiếu giỏ; trạng thái giỏ của user hợp lệ không bị thay đổi bởi request sai token. |
| EC04 | Item trong giỏ | Giỏ có sản phẩm A hợp lệ để chỉnh số lượng. | Có | A trong giỏ: `price=X`, `quantity=1` | Hiển thị dòng A với cột `Số lượng` và nút `+/-`. |
| EC05 | Item trong giỏ | Giỏ trống hoặc không có dòng sản phẩm để chỉnh. | Không | Giỏ rỗng | Không có dòng item để bấm `+/-`; Web hiển thị trạng thái giỏ trống thay vì cho cập nhật số lượng. |
| EC06 | Thao tác cập nhật số lượng | Bấm `+` trên dòng A. | Có | A `quantity=1`, bấm `+` | Chỉ dòng A tăng lên `quantity=2`; các dòng khác giữ nguyên. |
| EC07 | Thao tác cập nhật số lượng | Bấm `-` trên dòng A khi `quantity>1`. | Có | A `quantity=2`, bấm `-` | Chỉ dòng A giảm còn `quantity=1`; các dòng khác giữ nguyên. |
| EC08 | Thao tác cập nhật số lượng | Bấm `-` khi A đang ở số lượng tối thiểu `1`. | Không | A `quantity=1`, bấm `-` | Giỏ không được hiển thị A với `quantity=0` hoặc âm; UI nên chặn thao tác, giữ `quantity=1`, hoặc yêu cầu dùng chức năng xóa riêng. |
| EC09 | Số lượng sau cập nhật | Số lượng sau thao tác là số nguyên dương. | Có | `quantity=2` | Số lượng mới được hiển thị và lưu ở trạng thái giỏ. |
| EC10 | Số lượng sau cập nhật | Số lượng sau thao tác không hợp lệ. | Không | `quantity=0`, `quantity=-1`, `quantity=1.5` | Không đạt FR-07/FR-06 vì giỏ hợp lệ không được chứa số lượng không phải số nguyên dương. |
| EC11 | Thành tiền của dòng | Thành tiền được tính đúng sau cập nhật. | Có | `price=X`, `quantity=2`, `Thành tiền=2X` | Dòng A hiển thị thành tiền đúng theo số lượng mới. |
| EC12 | Thành tiền của dòng | Thành tiền không đổi hoặc tính sai sau cập nhật. | Không | Bấm `+` từ `1` lên `2` nhưng `Thành tiền=X` | Không đạt vì thành tiền phải theo `Đơn giá × Số lượng`. |
| EC13 | Tổng cộng | Nhãn tổng tiền là `Tổng cộng`. | Có | Label `Tổng cộng` | Web hiển thị đúng nhãn theo FR-07. |
| EC14 | Tổng cộng | Nhãn tổng tiền sai. | Không | Label `Tổng tạm tính` hoặc `Tổng tạm thời` | Không đạt FR-07 vì nhãn phải là `Tổng cộng`. |
| EC15 | Tổng cộng | Giá trị tổng cộng đúng sau cập nhật. | Có | Giỏ có A `quantity=2`, `price=X`, tổng `2X` | Tổng cộng bằng tổng thành tiền của các dòng. |
| EC16 | Tổng cộng | Giá trị tổng cộng sai sau cập nhật. | Không | A tăng lên `2` nhưng tổng vẫn `X` | Không đạt vì tổng cộng không phản ánh trạng thái giỏ mới. |
| EC17 | Trạng thái lỗi/không đổi | Cập nhật đúng dòng được thao tác. | Có | Giỏ có A và B, bấm `+` trên A | A tăng số lượng; B giữ nguyên. |
| EC18 | Trạng thái lỗi/không đổi | Cập nhật nhầm dòng hoặc làm mất dòng khác. | Không | Bấm `+` trên A nhưng B thay đổi hoặc biến mất | Không đạt vì thao tác phải áp dụng cho đúng item. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-UPDQTY-001 | Tăng số lượng một sản phẩm trong giỏ. | Tiền điều kiện qua UI: đăng nhập user hợp lệ, thêm sản phẩm A vào giỏ với `quantity=1`, `price=X`. Mở giỏ, bấm `+` tại dòng A. | EC01, EC04, EC06, EC09, EC11, EC13, EC15, EC17 | Web: dòng A hiển thị `quantity=2`, `Thành tiền=2X`, nhãn `Tổng cộng` đúng và tổng cộng là `2X`; không tạo dòng A mới. API: không có endpoint update documented; nếu đối chiếu bằng Postman/API thì `GET /api/cart` phải có bearer token và chỉ phản ánh giỏ API. | Web: trong dòng sản phẩm không có nút `+` để tăng số lượng, nên không thực hiện được thao tác. API specification không có endpoint cập nhật số lượng. | Không |
| EP-FR07-UPDQTY-002 | Giảm số lượng khi số lượng hiện tại lớn hơn 1. | Tiền điều kiện qua UI: đăng nhập, thêm A vào giỏ để có `quantity=2`, `price=X`. Mở giỏ, bấm `-` tại dòng A. | EC01, EC04, EC07, EC09, EC11, EC13, EC15, EC17 | Web: dòng A giảm còn `quantity=1`, `Thành tiền=X`, `Tổng cộng=X`; không xóa dòng A. API: nếu đối chiếu bằng Postman/API thì `GET /api/cart` phải có bearer token và chỉ phản ánh giỏ API. | Web: trong dòng sản phẩm không có nút `-` để giảm số lượng. API không có endpoint cập nhật số lượng. | Không |
| EP-FR07-UPDQTY-003 | Không cho giảm dưới số lượng tối thiểu. | Tiền điều kiện qua UI: A đang có `quantity=1`, `price=X`. Bấm `-` tại dòng A. | EC01, EC04, EC08, EC10, EC11, EC15 | Web: không hiển thị A với `quantity=0` hoặc âm; nếu muốn xóa phải dùng chức năng `Xóa sản phẩm` riêng. Thành tiền/tổng cộng không được thành `0` cho một item vẫn còn trong giỏ. API: nếu đối chiếu bằng Postman/API thì `GET /api/cart` có bearer token không được trả A `quantity=0` hoặc âm trong giỏ API hợp lệ. | Không có nút `-` trong cart nên không thể thực hiện luồng giảm. Tuy nhiên API thêm cart chấp nhận và lưu `quantity=0`/`-1`, nên trạng thái giỏ API có thể chứa quantity không hợp lệ. | Không |
| EP-FR07-UPDQTY-004 | Không có item thì không thể cập nhật số lượng. | Tiền điều kiện: user đăng nhập có giỏ trống. Mở giỏ hàng. | EC01, EC05 | Web: hiển thị trạng thái giỏ trống rõ ràng, không có nút `+/-` gắn với dòng sản phẩm giả. API: `GET /api/cart` trả giỏ rỗng hoặc cấu trúc tương đương. | Web empty state không có nút `+/-` giả; API với token hợp lệ trả `200 []`. | Có |
| EP-FR07-UPDQTY-005 | Không cho user chưa đăng nhập chỉnh giỏ. | Web: chưa đăng nhập rồi truy cập giỏ nếu UI cho phép. Postman: gọi `GET /api/cart` không có bearer token để kiểm xác thực API. | EC02, EC05 | Web: nếu yêu cầu giỏ riêng tư thì nên yêu cầu đăng nhập hoặc không hiển thị giỏ riêng tư để chỉnh; ghi nhận riêng nếu UI vẫn cho xem giỏ phiên hiện tại. API: trả lỗi xác thực khi thiếu bearer token. | Postman `GET /api/cart` không token trả `401 Unauthorized`. Web vẫn có thể xem giỏ của phiên hiện tại khi chưa đăng nhập, nhưng cũng không có nút chỉnh số lượng. | Không |
| EP-FR07-UPDQTY-006 | Không đối chiếu được giỏ với token sai. | Postman: gọi `GET /api/cart` với `Authorization: Bearer invalid.token`; trên Web mô phỏng phiên hết hạn nếu có thể. | EC03 | API: từ chối truy cập giỏ; không cập nhật dữ liệu giỏ của user hợp lệ. Web UI được ghi nhận theo phiên giao diện riêng. | Postman `GET /api/cart` token sai trả `403 Forbidden`. | Có |
| EP-FR07-UPDQTY-007 | Cập nhật đúng dòng khi giỏ có nhiều sản phẩm. | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X` và B `quantity=1`, `price=Y`. Bấm `+` tại dòng A. | EC01, EC04, EC06, EC09, EC11, EC15, EC17, EC18 | Web: A thành `quantity=2`, `Thành tiền=2X`; B vẫn `quantity=1`, `Thành tiền=Y`; `Tổng cộng=2X + Y`. API: nếu đối chiếu bằng Postman/API thì `GET /api/cart` phải có bearer token và body chỉ phản ánh giỏ API. | Không có nút `+` trong Web Cart và không có API update, nên không thể cập nhật dòng A. | Không |
| EP-FR07-UPDQTY-008 | Phát hiện thành tiền/tổng cộng không cập nhật sau thao tác hợp lệ. | Tiền điều kiện qua UI: A `quantity=1`, `price=X`. Bấm `+`, quan sát `Thành tiền` và `Tổng cộng`. | EC11, EC12, EC15, EC16 | Web: testcase chỉ đạt khi cả `Thành tiền=2X` và `Tổng cộng=2X` sau khi tăng. Nếu số lượng đổi nhưng tiền không đổi hoặc nhãn tổng sai thì không đạt. API: chỉ đối chiếu được nếu `GET /api/cart` trả đủ `price`/`quantity`/total. | Không có thao tác tăng số lượng trong cart; ngoài ra nhãn tổng tiền trong Web là `Tổng tạm tính`, không phải `Tổng cộng`. | Không |
| EP-FR07-UPDQTY-009 | Phát hiện nhãn tổng tiền sai trên màn hình cập nhật số lượng. | Tiền điều kiện qua UI: giỏ có ít nhất một sản phẩm. Mở giỏ và thực hiện bấm `+` hoặc `-` hợp lệ. | EC13, EC14 | Web: nhãn phải là chính xác `Tổng cộng`; nếu là `Tổng tạm tính`, `Tổng tạm thời` hoặc nhãn khác thì không đạt. API: đây là kiểm tra Web-only. | Web hiển thị nhãn `Tổng tạm tính:` thay vì `Tổng cộng`. | Không |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `quantity` hiện tại của item | Số lượng/count | Có | FR-06 nêu số lượng tối thiểu là `1`; FR-07 có nút `+/-` để chỉnh số lượng. |
| `quantity` sau cập nhật | Số lượng/count | Có | Giỏ hợp lệ phải giữ số lượng nguyên dương; cần kiểm quanh biên dưới `1`. |
| Số dòng sản phẩm trong giỏ | Số lượng/count | Có | Cần kiểm thao tác với giỏ trống, một dòng và nhiều dòng để phát hiện cập nhật nhầm dòng. |
| `Đơn giá` | Tiền/số | Không | Tài liệu không nêu min/max đơn giá trong giỏ; dùng `X`/`Y` quan sát từ UI/API. |
| `Thành tiền` | Tiền/số tính toán | Có | Giá trị phụ thuộc biên `quantity`: `X`, `2X`. |
| `Tổng cộng` | Tiền/số tính toán | Có | Giá trị phụ thuộc số dòng và số lượng sau cập nhật. |
| Token xác thực | Chuỗi/token | Không | Token chỉ có lớp hợp lệ/không hợp lệ, không có biên độ dài/thứ tự được đặc tả. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `quantity` hiện tại/sau cập nhật | Tối thiểu `1`; không có tối đa được đặc tả | `quantity=0` là dưới min, `quantity=1` là min, `quantity=2` là min+1 |
| Số dòng sản phẩm trong giỏ | Rỗng/có dữ liệu/nhiều dòng | `0 item`, `1 item`, `2 item` |
| `Thành tiền` | `Đơn giá × Số lượng` quanh biên số lượng | Với `price=X`: `quantity=1 -> X`, `quantity=2 -> 2X`; `quantity=0` không hợp lệ trong giỏ hợp lệ |
| `Tổng cộng` | Tổng thành tiền quanh số dòng và số lượng | `1 item A quantity=1 -> X`; `1 item A quantity=2 -> 2X`; `2 item A,B -> 2X + Y` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-UPDQTY-001 | `quantity` | `min-1`, cố đưa về `quantity=0` | Tiền điều kiện qua UI: A `quantity=1`, `price=X`; bấm `-`. | Web: không hiển thị item A với `quantity=0` hoặc âm; hoặc chặn nút `-` tại min, hoặc giữ `quantity=1`, hoặc yêu cầu dùng xóa sản phẩm riêng. API: nếu đối chiếu bằng Postman/API thì `GET /api/cart` có bearer token không được có A `quantity=0` hoặc âm trong giỏ API hợp lệ. | Web không có nút `-`; API thêm cart chấp nhận và trả item `quantity=0`/`-1` nếu client gửi. | Không |
| BV-FR07-UPDQTY-002 | `quantity` | `min`, `quantity=1` | Tiền điều kiện qua UI: A trong giỏ `quantity=1`, `price=X`. | Web: số lượng hiển thị `1`, thành tiền `X`, tổng cộng `X`; nút `+/-` hiển thị theo yêu cầu FR-07. API: `GET /api/cart` có item A `quantity=1` nếu body đủ dữ liệu. | Web/API hiển thị/trả `quantity=1` khi item tồn tại, nhưng Web không có nút `+/-` và nhãn tổng là `Tổng tạm tính`. | Không |
| BV-FR07-UPDQTY-003 | `quantity` | `min+1`, tăng lên `quantity=2` | Từ A `quantity=1`, bấm `+`. | Web: số lượng thành `2`, thành tiền `2X`, tổng cộng `2X`. API: `GET /api/cart` sau thao tác phản ánh `quantity=2` nếu body đủ dữ liệu. | Không có nút `+`; không có API update quantity. | Không |
| BV-FR07-UPDQTY-004 | `quantity` | Từ `min+1` giảm về `min` | Tiền điều kiện qua UI: A `quantity=2`, `price=X`; bấm `-`. | Web: số lượng giảm còn `1`, thành tiền `X`, tổng cộng `X`; item không bị xóa. API: `GET /api/cart` phản ánh `quantity=1` nếu body đủ dữ liệu. | Không có nút `-`; không có API update quantity. | Không |
| BV-FR07-UPDQTY-005 | Số dòng sản phẩm trong giỏ | `0 item` | User đăng nhập có giỏ trống, mở màn hình giỏ. | Web: không có dòng để chỉnh số lượng, hiển thị trạng thái giỏ trống. API: `GET /api/cart` trả danh sách rỗng hoặc cấu trúc giỏ trống tương đương. | Web không có dòng/nút chỉnh khi rỗng; API trả `200 []`. | Có |
| BV-FR07-UPDQTY-006 | Số dòng sản phẩm trong giỏ | `1 item` | Tiền điều kiện qua UI: giỏ có A `quantity=1`, bấm `+`. | Web: cập nhật đúng dòng A, thành tiền/tổng cộng theo `2X`. API: `GET /api/cart` cho phép đối chiếu A nếu body đủ dữ liệu. | Web có thể hiển thị 1 item, nhưng không có nút `+` để cập nhật. | Không |
| BV-FR07-UPDQTY-007 | Số dòng sản phẩm trong giỏ | `2 item` | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X` và B `quantity=1`, `price=Y`; bấm `+` trên A. | Web: A thành `2`, B vẫn `1`, tổng cộng `2X + Y`; không làm mất hoặc cập nhật nhầm B. API: `GET /api/cart` cho phép đối chiếu nếu body đủ dữ liệu. | Không có nút `+` để cập nhật đúng dòng trong giỏ nhiều sản phẩm. | Không |
| BV-FR07-UPDQTY-008 | `Thành tiền` | Tính toán tại `quantity=1` | A trong giỏ `quantity=1`, `price=X`. | Web: `Thành tiền=X`; API: nếu trả `line_total` thì là `X`, nếu chỉ trả `price`/`quantity` thì tester tính được `X`. | Web hiển thị `Thành tiền=X` đúng theo đơn giá quan sát và số lượng. API trả `price` và `quantity`, không trả `line_total`. | Có |
| BV-FR07-UPDQTY-009 | `Thành tiền` | Tính toán tại `quantity=2` | A trong giỏ `quantity=1`, `price=X`; bấm `+`. | Web: `Thành tiền=2X`; API: nếu trả `line_total` thì là `2X`, nếu chỉ trả `price`/`quantity` thì tester tính được `2X`. | Nếu item đã có `quantity=2`, Web tính `2X`; nhưng thao tác bấm `+` không tồn tại nên không đạt luồng cập nhật. | Không |
| BV-FR07-UPDQTY-010 | `Tổng cộng` | Tổng tại một dòng sau tăng | A `quantity=1`, `price=X`; bấm `+`. | Web: nhãn `Tổng cộng`, giá trị `2X`; API: nếu trả total thì là `2X`, nếu không thì danh sách item phải cho phép tính ra `2X`. | Không có nút `+`; nhãn tổng là `Tổng tạm tính`; API không trả total. | Không |
| BV-FR07-UPDQTY-011 | `Tổng cộng` | Tổng tại nhiều dòng sau tăng | A `quantity=1`, `price=X`; B `quantity=1`, `price=Y`; bấm `+` trên A. | Web: nhãn `Tổng cộng`, giá trị `2X + Y`. API: nếu trả total thì là `2X + Y`, nếu không thì danh sách item phải cho phép tính ra `2X + Y`. | Không có nút `+`; nhãn tổng là `Tổng tạm tính`; API không có endpoint update/total. | Không |

## 5. Ghi chú rủi ro

- API specification chưa mô tả endpoint cập nhật số lượng trong giỏ; khi thực thi cần ghi rõ thao tác nào chỉ kiểm được qua Web. `GET /api/cart` chỉ là bước đối chiếu Postman/API có bearer token, không phải bước bắt buộc để quan sát giỏ vừa thao tác bằng Web UI.
- Tài liệu không nêu tồn kho hoặc giới hạn tối đa số lượng; không tạo BVA cho max quantity.
- Hành vi tại `quantity=1` khi bấm `-` chưa được nêu chi tiết; oracle tối thiểu là giỏ hợp lệ không được chứa số lượng `0` hoặc âm, còn việc UI disable nút, giữ nguyên số lượng hay yêu cầu dùng nút xóa cần sinh viên validate trên UI.
- Giá sản phẩm phải lấy từ UI/API black-box làm `X`/`Y`; không dùng giá cố định nếu không có trong đặc tả.
- Các tiền điều kiện có sản phẩm trong giỏ nên dựng qua UI để tránh bịa product id, giá hoặc tồn kho ngoài dữ liệu quan sát được.
