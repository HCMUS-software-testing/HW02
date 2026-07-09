# FR-07: Giỏ hàng - Tiếp tục mua hàng từ giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` - Tiếp tục mua hàng từ giỏ hàng |
| SUT | EShop - Frontend Web |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-05: Xem danh sách & Tìm kiếm sản phẩm`, `FR-07: Giỏ hàng (Shopping Cart)`, `FR-23: Navigation Requirements` |
| Giao diện/API tham chiếu | Màn hình Giỏ hàng; nút `Tiếp tục mua sắm`; trang chủ/product grid; navbar/breadcrumb |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho hành vi bấm `Tiếp tục mua sắm` từ màn hình giỏ hàng để quay về trang chủ, áp dụng khi giỏ trống hoặc có sản phẩm. |
| Ngoài phạm vi | Không kiểm thử thêm sản phẩm sau khi quay về trang chủ, tìm kiếm sản phẩm, hiển thị chi tiết sản phẩm, checkout, API cart, database hoặc mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | Tài liệu yêu cầu có nút `Tiếp tục mua sắm` để quay về trang chủ nhưng không nêu path URL chính xác; artifact xem kết quả đúng là người dùng được điều hướng tới trang chủ hiển thị danh sách sản phẩm dạng grid theo FR-05. Đây là chức năng Web-only; API specification không có endpoint tương ứng. |
| Trạng thái thực thi | Đã ghi nhận kết quả thực tế theo kịch bản black-box qua Web UI. Đây là chức năng điều hướng Web-only; không dùng API cart để kết luận nút `Tiếp tục mua sắm`. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | Trạng thái màn hình giỏ hàng | Người dùng đang ở màn hình Giỏ hàng, có thể là giỏ trống hoặc giỏ có sản phẩm. |
| Đầu vào | Nút `Tiếp tục mua sắm` | Control điều hướng từ giỏ hàng về trang chủ. |
| Đầu vào | Hành động người dùng | Người dùng bấm nút `Tiếp tục mua sắm`. |
| Đầu ra | Điều hướng về trang chủ | Web chuyển khỏi màn hình giỏ hàng về trang chủ/product grid. |
| Đầu ra | Trạng thái trang chủ | Trang chủ hiển thị danh sách sản phẩm dạng lưới hoặc trạng thái loading/empty phù hợp theo FR-05. |
| Đầu ra | Trạng thái điều hướng | Navbar/breadcrumb không còn thể hiện người dùng đang ở trang Giỏ hàng sau khi điều hướng về trang chủ. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | Trạng thái màn hình giỏ hàng | Nút `Tiếp tục mua sắm` phải có trên màn hình Giỏ hàng theo FR-07. |
| C2 | Trạng thái màn hình giỏ hàng | Nút `Tiếp tục mua sắm` phải dùng được khi giỏ trống. |
| C3 | Trạng thái màn hình giỏ hàng | Nút `Tiếp tục mua sắm` phải dùng được khi giỏ có sản phẩm. |
| C4 | Nút `Tiếp tục mua sắm` | Nhãn nút phải thể hiện đúng ý nghĩa tiếp tục mua sắm. |
| C5 | Hành động người dùng | Khi bấm nút, hệ thống phải điều hướng về trang chủ. |
| C6 | Trạng thái trang chủ | Trang chủ sau điều hướng phải hiển thị product grid hoặc trạng thái tải/empty state phù hợp của FR-05. |
| C7 | Trạng thái điều hướng | Sau điều hướng, trạng thái active/highlight của navbar không được còn ở trang Giỏ hàng. |
| C8 | Trạng thái giỏ hàng | Điều hướng tiếp tục mua sắm không được tự xóa hoặc sửa các item đang có trong giỏ. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | Trạng thái màn hình giỏ hàng | Đang ở màn hình giỏ hàng trống và có nút `Tiếp tục mua sắm`. | Có | Giỏ trống, thấy empty state và nút `Tiếp tục mua sắm` | Người dùng có thể dùng nút để quay về trang chủ. |
| EC02 | Trạng thái màn hình giỏ hàng | Đang ở màn hình giỏ hàng có sản phẩm và có nút `Tiếp tục mua sắm`. | Có | Giỏ có A `price=X`, thấy nút `Tiếp tục mua sắm` | Người dùng có thể dùng nút để quay về trang chủ mà không mất item. |
| EC03 | Trạng thái màn hình giỏ hàng | Thiếu nút `Tiếp tục mua sắm` trên màn hình giỏ hàng. | Không | Không tìm thấy nút/link tương ứng | Không đạt FR-07 vì người dùng không có đường quay về trang chủ từ giỏ bằng nút này. |
| EC04 | Nút `Tiếp tục mua sắm` | Nhãn nút đúng hoặc tương đương rõ nghĩa với yêu cầu. | Có | `Tiếp tục mua sắm` | Nút có ý nghĩa đúng với requirement. |
| EC05 | Nút `Tiếp tục mua sắm` | Nhãn nút sai/mơ hồ. | Không | `Quay lại`, `Checkout`, hoặc nhãn không liên quan | Không đạt nếu người dùng không nhận biết đây là thao tác tiếp tục mua sắm. |
| EC06 | Hành động người dùng | Bấm nút điều hướng về trang chủ. | Có | Click `Tiếp tục mua sắm` | Web chuyển tới trang chủ/product listing. |
| EC07 | Hành động người dùng | Bấm nút nhưng vẫn ở giỏ hoặc đi sai trang. | Không | Click xong vẫn ở `/cart` hoặc chuyển checkout/login không phù hợp | Không đạt vì FR-07 yêu cầu quay về trang chủ. |
| EC08 | Trạng thái trang chủ | Trang chủ hiển thị danh sách sản phẩm dạng grid hoặc trạng thái loading/empty phù hợp. | Có | Sau click thấy product grid | Điều hướng đưa user tới trải nghiệm mua sắm tiếp theo. |
| EC09 | Trạng thái trang chủ | Trang sau điều hướng lỗi/trống/mất nội dung không phù hợp. | Không | Trang trắng, lỗi 404, hoặc không có nội dung mua sắm | Không đạt vì không hỗ trợ tiếp tục mua hàng. |
| EC10 | Trạng thái điều hướng | Navbar/breadcrumb phản ánh đã rời khỏi giỏ hàng. | Có | Trang chủ được active/highlight, breadcrumb giỏ không còn là ngữ cảnh chính | Điều hướng nhất quán với FR-23. |
| EC11 | Trạng thái điều hướng | Navbar/breadcrumb vẫn thể hiện đang ở Giỏ hàng sau khi về trang chủ. | Không | Product grid hiển thị nhưng `Giỏ hàng` vẫn active | Không đạt yêu cầu navigation consistency. |
| EC12 | Trạng thái giỏ hàng | Điều hướng không làm thay đổi dữ liệu giỏ. | Có | Trước click có A `quantity=1`; quay lại giỏ vẫn có A | Nút chỉ điều hướng, không xóa/sửa giỏ. |
| EC13 | Trạng thái giỏ hàng | Điều hướng làm mất hoặc sửa item trong giỏ. | Không | Trước click có A, quay lại giỏ bị rỗng | Không đạt vì tiếp tục mua sắm không phải thao tác xóa/cập nhật giỏ. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-CONTINUE-001 | Tiếp tục mua sắm từ giỏ trống. | Tiền điều kiện: user ở màn hình Giỏ hàng trống. Bấm `Tiếp tục mua sắm`. | EC01, EC04, EC06, EC08, EC10 | Web: có nút `Tiếp tục mua sắm`; sau khi bấm, Web chuyển về trang chủ/product grid hoặc trạng thái loading/empty phù hợp của danh sách sản phẩm; `Giỏ hàng` không còn là trang active. API: không áp dụng vì đây là điều hướng Web-only. | Web: ở giỏ trống có link `Tiếp tục mua sắm`; sau khi bấm, trình duyệt chuyển về `/`, là trang chủ/product listing. Navbar không còn đánh dấu `Giỏ hàng` là active; không thấy breadcrumb riêng trên trang chủ. | Có |
| EP-FR07-CONTINUE-002 | Tiếp tục mua sắm từ giỏ có sản phẩm. | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X`. Từ màn hình giỏ bấm `Tiếp tục mua sắm`. | EC02, EC04, EC06, EC08, EC10, EC12 | Web: chuyển về trang chủ/product grid; khi quay lại giỏ, A vẫn còn với `quantity=1`, `price=X`; nút không tự xóa/sửa giỏ. API: không áp dụng vì đây là điều hướng Web-only. | Web: khi giỏ có sản phẩm, control hiển thị là `← Mua tiếp` chứ không phải `Tiếp tục mua sắm`; bấm control này chuyển về `/` và không làm thay đổi item trong giỏ của phiên hiện tại. | Không |
| EP-FR07-CONTINUE-003 | Phát hiện thiếu nút tiếp tục mua sắm. | Mở màn hình Giỏ hàng ở trạng thái trống và có sản phẩm. | EC03 | Web: testcase đạt chỉ khi có control `Tiếp tục mua sắm` ở màn hình giỏ. Nếu thiếu ở một trong hai trạng thái cần ghi nhận không đạt FR-07. API: không áp dụng. | Empty cart có `Tiếp tục mua sắm`; non-empty cart chỉ có `← Mua tiếp`. | Không |
| EP-FR07-CONTINUE-004 | Phát hiện nhãn nút sai/mơ hồ. | Mở màn hình giỏ, quan sát nhãn control quay về mua sắm. | EC04, EC05 | Web: nhãn nên là `Tiếp tục mua sắm` hoặc tương đương rõ nghĩa; nếu nhãn khiến người dùng nhầm với checkout, quay lại tùy ý, hoặc thao tác khác thì không đạt. API: không áp dụng. | Empty state nhãn đúng `Tiếp tục mua sắm`; non-empty nhãn `← Mua tiếp` là tương đương ý nghĩa nhưng không đúng literal yêu cầu. | Có |
| EP-FR07-CONTINUE-005 | Phát hiện điều hướng sai trang. | Từ giỏ hàng bấm nút `Tiếp tục mua sắm`. | EC06, EC07, EC08, EC09 | Web: phải về trang chủ/product listing. Nếu vẫn ở giỏ, chuyển sang checkout, login không có lý do, 404, hoặc trang trắng thì không đạt. API: không áp dụng. | Web: ở cả trạng thái giỏ trống và có sản phẩm, control quay về mua sắm đều đưa người dùng về `/`, là trang Home/product listing. | Có |
| EP-FR07-CONTINUE-006 | Phát hiện navigation state sai sau điều hướng. | Bấm `Tiếp tục mua sắm` từ giỏ có hoặc không có sản phẩm; quan sát navbar/breadcrumb sau khi về trang chủ. | EC10, EC11 | Web: trạng thái active/highlight phải phù hợp với trang chủ; không được giữ highlight/breadcrumb như đang ở Giỏ hàng. API: không áp dụng. | Web: sau khi bấm `Tiếp tục mua sắm` ở giỏ trống hoặc `← Mua tiếp` ở giỏ có sản phẩm, trình duyệt về `/`; navbar không còn đánh dấu `Giỏ hàng` là active. Không thấy breadcrumb riêng trên trang chủ. | Có |
| EP-FR07-CONTINUE-007 | Phát hiện nút điều hướng làm mất dữ liệu giỏ. | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X`. Bấm `Tiếp tục mua sắm`, sau đó mở lại giỏ. | EC02, EC12, EC13 | Web: A vẫn còn trong giỏ với số lượng và giá trị như trước; nếu giỏ bị xóa hoặc số lượng thay đổi thì không đạt. API: không áp dụng vì dữ liệu cần kiểm là trạng thái Web UI sau điều hướng. | Web: trong cùng phiên, bấm quay về mua sắm rồi mở lại giỏ thì A vẫn còn với số lượng ban đầu. Nếu tải lại trang, dữ liệu giỏ của phiên hiện tại bị mất. | Có |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| Số dòng sản phẩm trong giỏ khi bấm nút | Số lượng/count | Có | Nút cần hoạt động ở biên giỏ trống (`0`) và giỏ có dữ liệu (`1`, `2`) để đảm bảo không phụ thuộc sai vào trạng thái item. |
| Số lần bấm nút | Số lần thao tác | Không | Đặc tả không nêu quy tắc debounce, idempotency hoặc xử lý double-click. |
| URL/path trang chủ | Chuỗi/route | Không | Không có miền thứ tự hoặc biên; kiểm theo membership/đích điều hướng trong EP. |
| Trạng thái login/token | Trạng thái | Không | Điều hướng Web này không có biên numeric; nếu có login thì thuộc EP. |
| Dữ liệu giỏ sau điều hướng | Số lượng/count | Có | Có thể đối chiếu biên `0`, `1`, `2` item để đảm bảo nút không xóa/sửa giỏ. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Số dòng sản phẩm trong giỏ khi bấm nút | Rỗng/có dữ liệu/nhiều dòng | `0 item`, `1 item`, `2 item` |
| Dữ liệu giỏ sau điều hướng | Không đổi theo số dòng ban đầu | `0 item -> 0 item`, `1 item A -> 1 item A`, `2 item A,B -> 2 item A,B` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-CONTINUE-001 | Số dòng sản phẩm trong giỏ | `0 item` | User ở giỏ trống, bấm `Tiếp tục mua sắm`. | Web: chuyển về trang chủ/product grid hoặc trạng thái loading/empty phù hợp; không còn active ở Giỏ hàng. API: không áp dụng. | Empty cart có link `Tiếp tục mua sắm` trỏ `/`. | Có |
| BV-FR07-CONTINUE-002 | Số dòng sản phẩm trong giỏ | `1 item` | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X`; bấm `Tiếp tục mua sắm`, rồi mở lại giỏ. | Web: chuyển về trang chủ; khi quay lại giỏ, A vẫn còn với `quantity=1`, `price=X`. API: không áp dụng vì đây là điều hướng Web-only. | Web: ở giỏ có 1 item, control là `← Mua tiếp`; bấm vào chuyển về `/` và khi quay lại giỏ trong cùng phiên thì item vẫn còn. Nhãn không đúng literal `Tiếp tục mua sắm`. | Không |
| BV-FR07-CONTINUE-003 | Số dòng sản phẩm trong giỏ | `2 item` | Tiền điều kiện qua UI: giỏ có A `quantity=1`, `price=X` và B `quantity=1`, `price=Y`; bấm `Tiếp tục mua sắm`, rồi mở lại giỏ. | Web: chuyển về trang chủ; khi quay lại giỏ, A và B vẫn còn, tổng cộng vẫn `X + Y`. API: không áp dụng vì đây là điều hướng Web-only. | Web: ở giỏ có 2 item, control là `← Mua tiếp`; bấm vào chuyển về `/` và A+B vẫn còn khi quay lại trong cùng phiên. Nhãn không đúng literal `Tiếp tục mua sắm`. | Không |
| BV-FR07-CONTINUE-004 | Dữ liệu giỏ sau điều hướng | `1 item -> 1 item` | Giỏ có A; bấm `Tiếp tục mua sắm`; quay lại giỏ bằng navbar/breadcrumb nếu có. | Web: điều hướng không xóa/sửa A. API: không áp dụng vì đây là điều hướng Web-only. | Web: sau khi quay về mua sắm rồi mở lại giỏ trong cùng phiên, A vẫn còn. | Có |
| BV-FR07-CONTINUE-005 | Dữ liệu giỏ sau điều hướng | `2 item -> 2 item` | Giỏ có A+B; bấm `Tiếp tục mua sắm`; quay lại giỏ. | Web: điều hướng không xóa/sửa A hoặc B. API: không áp dụng vì đây là điều hướng Web-only. | Web: sau khi quay về mua sắm rồi mở lại giỏ trong cùng phiên, A+B vẫn còn. | Có |

## 5. Ghi chú rủi ro

- Tài liệu không nêu URL/path chính xác của trang chủ; khi thực thi, sinh viên cần validate bằng nội dung trang chủ/product grid theo FR-05 thay vì chỉ dựa vào path.
- Đây là chức năng Web-only; API specification không có endpoint cho nút `Tiếp tục mua sắm`.
- Tài liệu không nói nút có bắt buộc xuất hiện trong empty state và non-empty state hay không, nhưng FR-07 nói có nút trong giỏ hàng; artifact kiểm cả hai trạng thái để tránh bỏ sót UI.
- Điều hướng không phải thao tác thay đổi giỏ; nếu giỏ bị xóa/sửa sau khi bấm nút, cần ghi nhận lỗi hoặc rủi ro.
- Các testcase cần sản phẩm trong giỏ nên dựng tiền điều kiện qua UI; giá dùng biến `X`/`Y` quan sát từ UI, không bịa giá cố định.
