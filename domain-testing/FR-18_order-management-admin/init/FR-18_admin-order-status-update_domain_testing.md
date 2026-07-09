# FR-18: Quản lý Đơn hàng Admin - Cập nhật trạng thái đơn hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-18: Order management (admin)` / `FR-18: Quản lý Đơn hàng (Admin)` - Cập nhật trạng thái đơn hàng |
| SUT | EShop - Web Admin và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool C; `eshop-sut/README.md` mục `FR-10: Trạng thái Đơn hàng (Order State Machine)`, `FR-12: Kiểm soát truy cập`, `FR-18: Quản lý Đơn hàng (Admin)`; `eshop-sut/api_specification.md` mục `6.2 Quản lý Đơn hàng (Toàn hệ thống)` |
| Giao diện/API tham chiếu | Màn hình Web Admin `Quản lý Đơn hàng`; endpoint `PUT /api/admin/orders/:id/status`; body JSON `{"status": "confirmed"}`; các trạng thái `pending`, `confirmed`, `shipping`, `delivered`, `canceled` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho admin chuyển trạng thái đơn hàng theo state machine: `pending -> confirmed`, `pending -> canceled`, `confirmed -> shipping`, `confirmed -> canceled`, `shipping -> delivered`; `delivered` và `canceled` là trạng thái kết thúc. |
| Ngoài phạm vi | Không kiểm thử user tự hủy đơn qua `PUT /api/orders/:id/cancel`, tạo đơn/checkout, dashboard doanh thu, thông báo email, database, hoặc mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | API specification liệt kê endpoint và tập giá trị `status`, nhưng không nêu status code/body thành công hoặc lỗi. README có điểm cần rà soát: sơ đồ FR-10 không vẽ chuyển `shipping -> canceled`, trong khi câu "Khi đơn hàng đã ở trạng thái `shipping`, User không được phép tự hủy — chỉ Admin mới có thể thao tác" có thể gây hiểu khác nhau. Artifact này lấy sơ đồ state machine làm oracle chính: admin từ `shipping` chỉ chuyển hợp lệ sang `delivered`; `shipping -> canceled` được đánh dấu là điểm cần review thủ công. Các order id như `O_pending` là biến quan sát/chuẩn bị từ dữ liệu black-box, không phải id cố định. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Web/API/Postman. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Header xác thực cho API admin; Web tương ứng với phiên đăng nhập admin. |
| Đầu vào | `role` trong token | FR-12 yêu cầu `role = 'admin'` cho API `/api/admin/*`. |
| Đầu vào | `order_id` path parameter | Định danh đơn hàng trong `PUT /api/admin/orders/:id/status`; phải trỏ tới đơn tồn tại. |
| Đầu vào | Trạng thái hiện tại của đơn | Một trong `pending`, `confirmed`, `shipping`, `delivered`, `canceled`, dùng để xét chuyển đổi hợp lệ. |
| Đầu vào | `status` trong body | Trạng thái đích admin muốn cập nhật; API spec nêu tập giá trị `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. |
| Đầu ra | Trạng thái đơn sau cập nhật | Nếu chuyển đổi hợp lệ, trạng thái đơn thay đổi sang trạng thái đích và được phản ánh khi xem lại danh sách/chi tiết. |
| Đầu ra | Phản hồi lỗi | Nếu xác thực/phân quyền sai, đơn không tồn tại, trạng thái đích thiếu/sai, hoặc chuyển đổi không hợp lệ thì hệ thống từ chối và không thay đổi trạng thái đơn. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | Request phải có header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ. |
| C3 | `role` trong token | Token phải thuộc tài khoản có `role = 'admin'`. |
| C4 | `order_id` | `order_id` phải xác định một đơn hàng tồn tại. |
| C5 | `status` body | Body phải có trường `status`. |
| C6 | `status` body | `status` phải thuộc tập `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. |
| C7 | Chuyển đổi trạng thái | Từ `pending` được chuyển sang `confirmed`. |
| C8 | Chuyển đổi trạng thái | Từ `pending` được chuyển sang `canceled`. |
| C9 | Chuyển đổi trạng thái | Từ `confirmed` được chuyển sang `shipping`. |
| C10 | Chuyển đổi trạng thái | Từ `confirmed` được chuyển sang `canceled`. |
| C11 | Chuyển đổi trạng thái | Từ `shipping` được chuyển sang `delivered`. |
| C12 | Chuyển đổi trạng thái | `delivered` là trạng thái kết thúc, không được chuyển sang trạng thái khác. |
| C13 | Chuyển đổi trạng thái | `canceled` là trạng thái kết thúc, không được chuyển sang trạng thái khác. |
| C14 | Chuyển đổi trạng thái | Mọi chuyển đổi không có trong state machine phải trả lỗi phù hợp. |
| C15 | Trạng thái đơn sau cập nhật | Chuyển đổi hợp lệ phải được phản ánh khi xem lại danh sách/chi tiết đơn hàng. |
| C16 | Phản hồi lỗi | Chuyển đổi bị từ chối không được làm thay đổi trạng thái hiện tại của đơn. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token + `role` | Token hợp lệ của admin. | Có | `Authorization: Bearer <valid_admin_token>` | Cho phép thực hiện cập nhật trạng thái nếu dữ liệu và state transition hợp lệ. |
| EC02 | `Authorization` token | Thiếu token. | Không | Không gửi header | Từ chối request; trạng thái đơn không đổi. |
| EC03 | `Authorization` token | Token sai/hết hạn/không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối request; trạng thái đơn không đổi. |
| EC04 | `role` | Token hợp lệ nhưng không phải admin. | Không | Token của `test@eshop.com` | Từ chối request vì thiếu quyền admin. |
| EC05 | `order_id` | `order_id` tồn tại và quan sát được. | Có | `O_pending` hoặc `O_confirmed` | Có thể xét chuyển trạng thái cho đơn tương ứng. |
| EC06 | `order_id` | `order_id` không tồn tại hoặc không quan sát được. | Không | `O_missing` | Từ chối request; không tạo/cập nhật đơn không tồn tại. |
| EC07 | `status` body | Body có `status` thuộc tập được API spec liệt kê. | Có | `status="confirmed"` | Được xét tiếp theo state machine. |
| EC08 | `status` body | Body thiếu trường `status`. | Không | `{}` | Từ chối request; trạng thái đơn không đổi. |
| EC09 | `status` body | `status` nằm ngoài tập hợp lệ. | Không | `status="returned"` | Từ chối request; trạng thái đơn không đổi. |
| EC10 | Chuyển đổi trạng thái | `pending -> confirmed`. | Có | `O_pending`, target `confirmed` | Cập nhật thành `confirmed`. |
| EC11 | Chuyển đổi trạng thái | `pending -> canceled`. | Có | `O_pending`, target `canceled` | Cập nhật thành `canceled`. |
| EC12 | Chuyển đổi trạng thái | `confirmed -> shipping`. | Có | `O_confirmed`, target `shipping` | Cập nhật thành `shipping`. |
| EC13 | Chuyển đổi trạng thái | `confirmed -> canceled`. | Có | `O_confirmed`, target `canceled` | Cập nhật thành `canceled`. |
| EC14 | Chuyển đổi trạng thái | `shipping -> delivered`. | Có | `O_shipping`, target `delivered` | Cập nhật thành `delivered`. |
| EC15 | Chuyển đổi trạng thái | Bỏ qua bước trong state machine. | Không | `pending -> shipping` hoặc `confirmed -> delivered` | Từ chối vì không đúng state machine. |
| EC16 | Chuyển đổi trạng thái | Đi lùi trạng thái. | Không | `confirmed -> pending` hoặc `shipping -> confirmed` | Từ chối vì không đúng state machine. |
| EC17 | Chuyển đổi trạng thái | Cập nhật về cùng trạng thái hiện tại. | Không | `pending -> pending` | Không có chuyển đổi trong state machine; cần từ chối hoặc xử lý như không thay đổi theo thiết kế, ghi nhận actual khi chạy. |
| EC18 | Chuyển đổi trạng thái | Từ `shipping` sang `canceled`. | Không | `O_shipping`, target `canceled` | Theo sơ đồ FR-10, chuyển đổi này không được vẽ; artifact kỳ vọng từ chối và ghi chú rủi ro mơ hồ. |
| EC19 | Chuyển đổi trạng thái | `delivered` chuyển sang bất kỳ trạng thái khác. | Không | `O_delivered`, target `shipping` | Từ chối vì `delivered` là final state; trạng thái không đổi. |
| EC20 | Chuyển đổi trạng thái | `canceled` chuyển sang bất kỳ trạng thái khác. | Không | `O_canceled`, target `confirmed` | Từ chối vì `canceled` là final state; trạng thái không đổi. |
| EC21 | Trạng thái đơn sau cập nhật | Chuyển đổi hợp lệ được lưu và quan sát lại đúng. | Có | Sau `pending -> confirmed`, xem lại thấy `confirmed` | Web/API phản ánh trạng thái mới. |
| EC22 | Phản hồi lỗi | Chuyển đổi không hợp lệ không làm đổi trạng thái. | Có | Thử `pending -> shipping`, xem lại vẫn `pending` | Web/API trả lỗi phù hợp; trạng thái ban đầu giữ nguyên. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR18-STATUS-001 | Admin xác nhận đơn `pending`. | Tiền điều kiện: đơn `O_pending` đang có `status=pending`. Web: chọn thao tác xác nhận. API: `PUT /api/admin/orders/O_pending/status` với admin token và body `{"status":"confirmed"}`. | EC01, EC05, EC07, EC10, EC21 | Web: đơn chuyển sang trạng thái `confirmed` và danh sách/chi tiết phản ánh trạng thái mới. API: contract chưa nêu status/body; request hợp lệ thành công theo SUT và lần đọc lại đơn/danh sách thấy `status=confirmed`. |  |  |
| EP-FR18-STATUS-002 | Admin hủy đơn `pending`. | `O_pending` có `status=pending`; gửi target `canceled`. | EC01, EC05, EC07, EC11, EC21 | Web: đơn chuyển thành `canceled` và không còn hành động chuyển tiếp hợp lệ. API: contract chưa nêu status/body; request hợp lệ thành công theo SUT và lần đọc lại thấy `status=canceled`. |  |  |
| EP-FR18-STATUS-003 | Admin chuyển `confirmed` sang `shipping`. | `O_confirmed` có `status=confirmed`; gửi target `shipping`. | EC01, EC05, EC07, EC12, EC21 | Web: đơn chuyển thành `shipping` và trạng thái mới quan sát được khi xem lại. API: contract chưa nêu status/body; request hợp lệ thành công theo SUT và lần đọc lại thấy `status=shipping`. |  |  |
| EP-FR18-STATUS-004 | Admin hủy đơn `confirmed`. | `O_confirmed` có `status=confirmed`; gửi target `canceled`. | EC01, EC05, EC07, EC13, EC21 | Web: đơn chuyển thành `canceled`; sau đó đơn là final state. API: contract chưa nêu status/body; request hợp lệ thành công theo SUT và lần đọc lại thấy `status=canceled`. |  |  |
| EP-FR18-STATUS-005 | Admin hoàn tất đơn `shipping`. | `O_shipping` có `status=shipping`; gửi target `delivered`. | EC01, EC05, EC07, EC14, EC21 | Web: đơn chuyển thành `delivered`; sau đó đơn là final state và không được chuyển tiếp. API: contract chưa nêu status/body; request hợp lệ thành công theo SUT và lần đọc lại thấy `status=delivered`. |  |  |
| EP-FR18-STATUS-006 | Từ chối khi thiếu token. | Gọi `PUT /api/admin/orders/O_pending/status` không gửi `Authorization`, body `{"status":"confirmed"}`. | EC02, EC05, EC07, EC22 | Web: không cho thao tác khi chưa đăng nhập admin. API: trả lỗi xác thực `4xx` theo contract thực tế; `O_pending` vẫn là `pending`. |  |  |
| EP-FR18-STATUS-007 | Từ chối khi token không hợp lệ. | Gọi endpoint bằng `Authorization: Bearer invalid.token`, body hợp lệ. | EC03, EC05, EC07, EC22 | API: trả lỗi xác thực `4xx`; trạng thái đơn không đổi. |  |  |
| EP-FR18-STATUS-008 | Từ chối user thường cập nhật trạng thái admin. | Dùng token user thường gọi `PUT /api/admin/orders/O_pending/status` với body `{"status":"confirmed"}`. | EC04, EC05, EC07, EC22 | Web: user thường không thao tác được chức năng cập nhật trạng thái admin. API: trả lỗi phân quyền `4xx` theo contract thực tế; trạng thái đơn không đổi. |  |  |
| EP-FR18-STATUS-009 | Từ chối đơn không tồn tại. | Admin token hợp lệ; gọi `PUT /api/admin/orders/O_missing/status` với body `{"status":"confirmed"}`. | EC01, EC06, EC07, EC22 | API/Web không được tạo mới hoặc cập nhật đơn không tồn tại; trả lỗi phù hợp theo contract thực tế. |  |  |
| EP-FR18-STATUS-010 | Từ chối body thiếu `status`. | `O_pending` tồn tại; admin token hợp lệ; body `{}`. | EC01, EC05, EC08, EC22 | Web: không gửi thao tác thiếu trạng thái hoặc hiển thị lỗi phù hợp nếu UI cho phép. API: trả lỗi theo contract thực tế vì thiếu trạng thái đích; `O_pending` vẫn là `pending`. |  |  |
| EP-FR18-STATUS-011 | Từ chối `status` ngoài tập hợp lệ. | `O_pending` tồn tại; body `{"status":"returned"}`. | EC01, EC05, EC09, EC22 | Web: không có lựa chọn trạng thái ngoài tập hợp lệ hoặc hiển thị lỗi nếu thao tác xảy ra. API: trả lỗi theo contract thực tế vì `status` không thuộc tập API spec; trạng thái đơn không đổi. |  |  |
| EP-FR18-STATUS-012 | Từ chối bỏ qua bước `pending -> shipping`. | `O_pending` có `status=pending`; gửi target `shipping`. | EC01, EC05, EC07, EC15, EC22 | Web: không cho thao tác bỏ qua bước hoặc hiển thị lỗi chuyển đổi không hợp lệ. API: trả lỗi chuyển đổi không hợp lệ theo contract thực tế; `O_pending` vẫn là `pending`. |  |  |
| EP-FR18-STATUS-013 | Từ chối bỏ qua bước `confirmed -> delivered`. | `O_confirmed` có `status=confirmed`; gửi target `delivered`. | EC01, EC05, EC07, EC15, EC22 | Web: không cho thao tác bỏ qua `shipping` hoặc hiển thị lỗi chuyển đổi không hợp lệ. API: trả lỗi chuyển đổi không hợp lệ theo contract thực tế; `O_confirmed` vẫn là `confirmed`. |  |  |
| EP-FR18-STATUS-014 | Từ chối đi lùi trạng thái. | `O_confirmed` có `status=confirmed`; gửi target `pending`. | EC01, EC05, EC07, EC16, EC22 | Web: không cho thao tác đi lùi hoặc hiển thị lỗi chuyển đổi không hợp lệ. API: trả lỗi theo contract thực tế; trạng thái không đổi. |  |  |
| EP-FR18-STATUS-015 | Từ chối cập nhật về cùng trạng thái. | `O_pending` có `status=pending`; gửi target `pending`. | EC01, EC05, EC07, EC17, EC22 | Web: không được coi là chuyển đổi hợp lệ theo sơ đồ; trạng thái vẫn `pending`. API: kỳ vọng trả lỗi/no-op không đổi trạng thái; nếu API trả thành công, cần người học review theo oracle bài vì contract chưa nêu trường hợp này. |  |  |
| EP-FR18-STATUS-016 | Rà soát trường hợp mơ hồ `shipping -> canceled`. | `O_shipping` có `status=shipping`; gửi target `canceled`. | EC01, EC05, EC07, EC18, EC22 | Theo sơ đồ FR-10, Web/API phải từ chối và giữ `shipping`; ghi nhận actual để review vì README có câu mơ hồ về quyền admin khi đơn đang `shipping`. |  |  |
| EP-FR18-STATUS-017 | Từ chối chuyển từ final state `delivered`. | `O_delivered` có `status=delivered`; gửi target `shipping` hoặc `canceled`. | EC01, EC05, EC07, EC19, EC22 | Web: không cho chuyển tiếp từ `delivered` hoặc hiển thị lỗi phù hợp. API: trả lỗi theo contract thực tế; `O_delivered` vẫn là `delivered`. |  |  |
| EP-FR18-STATUS-018 | Từ chối chuyển từ final state `canceled`. | `O_canceled` có `status=canceled`; gửi target `confirmed`. | EC01, EC05, EC07, EC20, EC22 | Web: không cho chuyển tiếp từ `canceled` hoặc hiển thị lỗi phù hợp. API: trả lỗi theo contract thực tế; `O_canceled` vẫn là `canceled`. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| Trạng thái hiện tại và trạng thái đích | State machine có thứ tự chuyển tiếp | Có | FR-10 định nghĩa chuỗi chuyển trạng thái và final states; có thể kiểm các biên ở cạnh hợp lệ, bước bị bỏ qua, và ranh giới trước/sau final state. |
| `status` body | Finite set | Không | Tập giá trị hợp lệ là enum; membership được kiểm bằng EP. |
| `order_id` | Định danh | Không | API không nêu miền số/min/max cho id; id chỉ cần tồn tại trong dữ liệu black-box. |
| `Authorization` token | Chuỗi/token | Không | Không có biên độ dài/thứ tự được đặc tả; chỉ có xác thực/phân quyền. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Cạnh đầu state machine | Chuyển hợp lệ đầu tiên so với bỏ qua bước đầu | `pending -> confirmed` hợp lệ; `pending -> shipping` không hợp lệ vì bỏ qua `confirmed` |
| Cạnh giữa state machine | Chuyển hợp lệ giữa vòng đời so với bỏ qua bước kế tiếp | `confirmed -> shipping` hợp lệ; `confirmed -> delivered` không hợp lệ vì bỏ qua `shipping` |
| Cạnh trước final `delivered` | Trước final và sau final | `shipping -> delivered` hợp lệ; `delivered -> shipping` không hợp lệ vì `delivered` là final state |
| Cạnh vào final `canceled` | Vào final và ra khỏi final | `pending -> canceled`/`confirmed -> canceled` hợp lệ; `canceled -> confirmed` không hợp lệ vì `canceled` là final state |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR18-STATUS-001 | State machine | Cạnh đầu hợp lệ | `O_pending`: cập nhật `pending -> confirmed` bằng admin token. | Web: cập nhật thành `confirmed`; đọc lại thấy trạng thái mới. API: request thành công theo SUT và lần đọc lại thấy `status=confirmed`. |  |  |
| BV-FR18-STATUS-002 | State machine | Bỏ qua cạnh đầu | `O_pending`: cập nhật `pending -> shipping`. | Web: từ chối thao tác hoặc hiển thị lỗi; đọc lại vẫn `pending`. API: trả lỗi theo contract thực tế; đọc lại vẫn `pending`. |  |  |
| BV-FR18-STATUS-003 | State machine | Cạnh giữa hợp lệ | `O_confirmed`: cập nhật `confirmed -> shipping`. | Web: cập nhật thành `shipping`; đọc lại thấy trạng thái mới. API: request thành công theo SUT và lần đọc lại thấy `status=shipping`. |  |  |
| BV-FR18-STATUS-004 | State machine | Bỏ qua cạnh giữa | `O_confirmed`: cập nhật `confirmed -> delivered`. | Web: từ chối thao tác hoặc hiển thị lỗi; đọc lại vẫn `confirmed`. API: trả lỗi theo contract thực tế; đọc lại vẫn `confirmed`. |  |  |
| BV-FR18-STATUS-005 | State machine | Cạnh trước final `delivered` | `O_shipping`: cập nhật `shipping -> delivered`. | Web: cập nhật thành `delivered`; đọc lại thấy trạng thái mới. API: request thành công theo SUT và lần đọc lại thấy `status=delivered`. |  |  |
| BV-FR18-STATUS-006 | State machine | Sau final `delivered` | `O_delivered`: cập nhật `delivered -> shipping`. | Web: từ chối vì `delivered` là final state; đọc lại vẫn `delivered`. API: trả lỗi theo contract thực tế; đọc lại vẫn `delivered`. |  |  |
| BV-FR18-STATUS-007 | State machine | Cạnh vào final `canceled` | `O_pending` hoặc `O_confirmed`: cập nhật sang `canceled`. | Web: cập nhật thành `canceled`; đơn trở thành final state. API: request thành công theo SUT và lần đọc lại thấy `status=canceled`. |  |  |
| BV-FR18-STATUS-008 | State machine | Sau final `canceled` | `O_canceled`: cập nhật `canceled -> confirmed`. | Web: từ chối vì `canceled` là final state; đọc lại vẫn `canceled`. API: trả lỗi theo contract thực tế; đọc lại vẫn `canceled`. |  |  |

## 5. Ghi chú rủi ro

- API specification chưa mô tả status code/body cho cập nhật trạng thái thành công hoặc lỗi; khi thực thi cần ghi response thực tế và luôn đọc lại đơn/danh sách để xác nhận trạng thái sau request.
- Có điểm mơ hồ giữa sơ đồ FR-10 và câu mô tả quyền admin khi đơn đang `shipping`. Artifact này ưu tiên sơ đồ: `shipping -> delivered` là chuyển đổi hợp lệ; `shipping -> canceled` cần người học review thủ công sau khi đối chiếu yêu cầu môn học/giảng viên.
- Các order id như `O_pending`, `O_confirmed`, `O_shipping`, `O_delivered`, `O_canceled` phải được chuẩn bị hoặc quan sát qua UI/API black-box; không dùng id cố định nếu tài liệu không cung cấp.
- Trường hợp cập nhật về cùng trạng thái hiện tại không được vẽ trong state machine; artifact kỳ vọng không xem là chuyển đổi hợp lệ, nhưng tester nên ghi actual để quyết định phân loại bug hay gap đặc tả.
