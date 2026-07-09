# FR-18: Quản lý Đơn hàng Admin - Xem toàn bộ đơn hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-18: Order management (admin)` / `FR-18: Quản lý Đơn hàng (Admin)` - Xem toàn bộ đơn hàng |
| SUT | EShop - Web Admin và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool C; `eshop-sut/README.md` mục `FR-12: Kiểm soát truy cập`, `FR-18: Quản lý Đơn hàng (Admin)`, `FR-21: Tiêu chuẩn Giao diện Chung`; `eshop-sut/api_specification.md` mục `6. API Dành cho Admin`, `6.2 Quản lý Đơn hàng (Toàn hệ thống)` |
| Giao diện/API tham chiếu | Màn hình Web Admin `Quản lý Đơn hàng`; endpoint `GET /api/admin/orders`; header `Authorization: Bearer <token>` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho hành vi admin xem danh sách toàn bộ đơn hàng của tất cả người dùng, bao gồm xác thực admin, phạm vi dữ liệu toàn hệ thống, trạng thái danh sách rỗng/có dữ liệu, và dữ liệu cần đủ để quản lý trạng thái đơn hàng. |
| Ngoài phạm vi | Không kiểm thử tạo đơn hàng/checkout, lịch sử đơn hàng của user, dashboard doanh thu, cập nhật trạng thái chi tiết, bảo mật JWT chuyên sâu, database, hoặc mã nguồn triển khai. Hiển thị an toàn `shipping_address` được tách trong file riêng. |
| Giả định/ràng buộc thiếu | API specification chỉ nêu endpoint `GET /api/admin/orders` và yêu cầu token admin, nhưng không mô tả status code/body thành công hoặc lỗi. Artifact giả định request hợp lệ phải trả danh sách đơn hàng quan sát được toàn hệ thống; tester cần dựng dữ liệu bằng các đơn `O_U1`, `O_U2` thuộc ít nhất hai user khác nhau nếu muốn kiểm điều kiện "tất cả người dùng". |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Web/API/Postman. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Header xác thực cho API admin; trên Web tương ứng với phiên đăng nhập admin. |
| Đầu vào | `role` trong token | FR-12 yêu cầu mọi API `/api/admin/*` phải có JWT hợp lệ và `role = 'admin'`. |
| Đầu vào | Tập dữ liệu đơn hàng toàn hệ thống | Tập đơn hàng quan sát được, gồm trường hợp không có đơn, có một đơn, hoặc có đơn của nhiều user. |
| Đầu ra | Danh sách đơn hàng admin | Web/API hiển thị/trả về toàn bộ đơn hàng của tất cả người dùng mà admin được phép quản lý. |
| Đầu ra | Thông tin quản lý trạng thái | Mỗi đơn cần có định danh và trạng thái hiện tại để admin có thể thực hiện chức năng cập nhật trạng thái ở FR-18. |
| Đầu ra | Phản hồi xác thực/phân quyền | Thiếu token, token sai, hoặc user không phải admin phải bị từ chối truy cập dữ liệu admin. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | Request tới `GET /api/admin/orders` phải có header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ. |
| C3 | `role` trong token | Token phải thuộc tài khoản có `role = 'admin'`. |
| C4 | Tập dữ liệu đơn hàng toàn hệ thống | Admin phải xem được đơn hàng của tất cả người dùng, không chỉ đơn của chính admin hoặc một user đang đăng nhập. |
| C5 | Danh sách đơn hàng admin | Khi chưa có đơn hàng, hệ thống phải trả/hiển thị danh sách rỗng hoặc empty state phù hợp, không hiển thị dữ liệu giả. |
| C6 | Danh sách đơn hàng admin | Khi có đơn hàng, hệ thống phải trả/hiển thị các đơn quan sát được trong phạm vi toàn hệ thống. |
| C7 | Thông tin quản lý trạng thái | Mỗi đơn được liệt kê phải có định danh đơn hàng và trạng thái hiện tại để phục vụ thao tác quản lý trạng thái. |
| C8 | Phản hồi xác thực/phân quyền | Request không đủ xác thực/phân quyền không được trả dữ liệu đơn hàng admin. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token + `role` | Token hợp lệ của tài khoản admin. | Có | `Authorization: Bearer <valid_admin_token>` của `admin@eshop.com` | Cho phép truy cập danh sách đơn hàng admin. |
| EC02 | `Authorization` token | Thiếu header `Authorization`. | Không | Không gửi header | Từ chối truy cập; không trả dữ liệu đơn hàng admin. |
| EC03 | `Authorization` token | Token sai, hết hạn, hoặc không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối truy cập; không trả dữ liệu đơn hàng admin. |
| EC04 | `role` | Token hợp lệ nhưng thuộc user thường, không phải admin. | Không | Token của `test@eshop.com` | Từ chối truy cập vì không có `role = 'admin'`. |
| EC05 | Tập dữ liệu đơn hàng toàn hệ thống | Không có đơn hàng nào trong hệ thống. | Có | Tập đơn hàng rỗng | Web hiển thị trạng thái không có dữ liệu phù hợp; API trả danh sách rỗng theo contract thực tế. |
| EC06 | Tập dữ liệu đơn hàng toàn hệ thống | Có đúng một đơn hàng quan sát được. | Có | `O_U1` thuộc user `U1` | Web/API hiển thị/trả đúng một đơn `O_U1`. |
| EC07 | Tập dữ liệu đơn hàng toàn hệ thống | Có nhiều đơn hàng thuộc nhiều user khác nhau. | Có | `O_U1` thuộc `U1`, `O_U2` thuộc `U2` | Web/API hiển thị/trả cả `O_U1` và `O_U2`; không lọc theo một user. |
| EC08 | Danh sách đơn hàng admin | Chỉ hiển thị đơn của một user hoặc thiếu đơn thuộc user khác. | Không | Chỉ có `O_U1`, thiếu `O_U2` dù `O_U2` tồn tại | Không đạt FR-18 vì admin phải xem toàn bộ đơn hàng của tất cả người dùng. |
| EC09 | Thông tin quản lý trạng thái | Mỗi đơn có định danh và trạng thái hiện tại. | Có | `order_id=O_pending`, `status=pending` | Admin có đủ thông tin để nhận diện đơn và chọn thao tác trạng thái phù hợp. |
| EC10 | Thông tin quản lý trạng thái | Đơn thiếu định danh hoặc thiếu trạng thái hiện tại. | Không | Dòng đơn không có `id` hoặc không có `status` | Không đủ dữ liệu để quản lý trạng thái đơn hàng theo FR-18. |
| EC11 | Phản hồi xác thực/phân quyền | Request không hợp lệ không làm lộ dữ liệu admin. | Có | Thiếu token hoặc token user thường | API/Web trả lỗi xác thực/phân quyền; danh sách đơn hàng admin không xuất hiện. |
| EC12 | Phản hồi xác thực/phân quyền | Request không hợp lệ vẫn nhận được dữ liệu admin. | Không | User thường gọi `GET /api/admin/orders` và nhận danh sách đơn | Không đạt FR-12/FR-18. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR18-LIST-001 | Admin xem danh sách khi hệ thống chưa có đơn hàng. | Tiền điều kiện: có token admin hợp lệ; dữ liệu kiểm thử không có đơn hàng hoặc môi trường reset về trạng thái không đơn. Web: mở `Quản lý Đơn hàng`. API: gọi `GET /api/admin/orders` với admin token. | EC01, EC05, EC09 | Web: hiển thị trạng thái danh sách rỗng/empty state phù hợp, không hiển thị dữ liệu giả. API: contract chưa nêu status/body; kỳ vọng nghiệp vụ là request thành công và body biểu diễn danh sách rỗng. |  |  |
| EP-FR18-LIST-002 | Admin xem một đơn hàng hiện có. | Tiền điều kiện: có một đơn `O_U1` thuộc user `U1`. Web/API dùng admin token để mở/gọi danh sách đơn hàng. | EC01, EC06, EC09 | Web: hiển thị đúng một đơn `O_U1` với định danh và trạng thái hiện tại. API: contract chưa nêu status/body; body phải chứa `O_U1` và trạng thái hiện tại đủ để quản lý. |  |  |
| EP-FR18-LIST-003 | Admin xem toàn bộ đơn hàng của nhiều user. | Tiền điều kiện: có ít nhất hai đơn `O_U1` thuộc `U1` và `O_U2` thuộc `U2`. Web/API dùng admin token. | EC01, EC07, EC08, EC09 | Web: danh sách có cả `O_U1` và `O_U2`, không chỉ hiển thị đơn của một user. API: body chứa cả hai đơn; nếu thiếu đơn của user khác thì không đạt FR-18. |  |  |
| EP-FR18-LIST-004 | Từ chối xem danh sách khi thiếu token. | API: gọi `GET /api/admin/orders` không gửi `Authorization`. Web: truy cập Web Admin khi chưa đăng nhập nếu có đường truy cập. | EC02, EC11, EC12 | Web: không hiển thị dữ liệu đơn hàng admin và yêu cầu đăng nhập/chuyển hướng phù hợp. API: trả lỗi xác thực `4xx` theo contract thực tế; không có body danh sách đơn hàng. |  |  |
| EP-FR18-LIST-005 | Từ chối xem danh sách khi token không hợp lệ. | API: gọi `GET /api/admin/orders` với `Authorization: Bearer invalid.token`. | EC03, EC11, EC12 | API: trả lỗi xác thực `4xx` theo contract thực tế; không trả dữ liệu đơn hàng admin. Web: nếu phiên hết hạn, không hiển thị dữ liệu admin. |  |  |
| EP-FR18-LIST-006 | Từ chối xem danh sách bằng tài khoản user thường. | Đăng nhập `test@eshop.com` hoặc user thường khác; gọi `GET /api/admin/orders` bằng token user thường; thử truy cập màn hình Web Admin nếu có thể. | EC04, EC11, EC12 | Web: user thường không truy cập được màn hình/dữ liệu quản lý đơn hàng admin. API: trả lỗi phân quyền `4xx`, không trả danh sách đơn hàng. |  |  |
| EP-FR18-LIST-007 | Phát hiện dòng đơn thiếu dữ liệu quản lý trạng thái. | Admin token hợp lệ; danh sách có đơn `O_pending` nhưng dòng/API item thiếu `id` hoặc thiếu `status`. | EC01, EC07, EC10 | Web/API chỉ đạt khi mỗi đơn có định danh và trạng thái hiện tại. Nếu thiếu `id` hoặc `status`, admin không đủ dữ liệu để cập nhật trạng thái theo FR-18. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| Số lượng đơn hàng trong danh sách | Số lượng/count | Có | Danh sách có biên tự nhiên ở `0` đơn, sau đó `1` đơn và nhiều hơn `1` đơn để kiểm empty state và hiển thị dữ liệu. |
| Số lượng user có đơn xuất hiện trong danh sách | Số lượng/count | Có | FR-18 yêu cầu toàn bộ đơn hàng của tất cả người dùng; biên hữu ích là `1` user và `2` user để phát hiện lỗi chỉ hiển thị một user. |
| `Authorization` token | Chuỗi/token | Không | Token chỉ có lớp hợp lệ/không hợp lệ và role admin/user; không có biên độ dài hoặc thứ tự được đặc tả. |
| `order_id` trong danh sách | Định danh | Không | API không nêu miền số hoặc min/max cho `id`; chỉ cần tồn tại để quản lý trạng thái. |
| `status` trong danh sách | Tập trạng thái | Không | Giá trị trạng thái là finite set/state machine, phù hợp EP và file cập nhật trạng thái hơn BVA trong chức năng xem danh sách. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Số lượng đơn hàng trong danh sách | Biên rỗng/có dữ liệu | `0` đơn, `1` đơn, `2` đơn |
| Số lượng user có đơn trong danh sách | Biên một user/nhiều user | `1` user có đơn, `2` user có đơn |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR18-LIST-001 | Số lượng đơn hàng | `0` đơn | Admin token hợp lệ; môi trường không có đơn hàng. Web/API lấy danh sách đơn hàng admin. | Web: hiển thị danh sách rỗng/empty state phù hợp. API: trả danh sách rỗng theo contract thực tế; không lỗi hệ thống. |  |  |
| BV-FR18-LIST-002 | Số lượng đơn hàng | `1` đơn | Admin token hợp lệ; có đúng một đơn `O_U1`. | Web/API hiển thị/trả đúng một đơn `O_U1`, không nhân đôi hoặc bỏ sót. |  |  |
| BV-FR18-LIST-003 | Số lượng đơn hàng | `2` đơn | Admin token hợp lệ; có hai đơn `O_U1`, `O_U2`. | Web/API hiển thị/trả cả hai đơn. |  |  |
| BV-FR18-LIST-004 | Số lượng user có đơn | `1` user | Có một hoặc nhiều đơn nhưng đều thuộc `U1`. | Web/API hiển thị toàn bộ đơn của `U1`; không lỗi khi chỉ có một user có đơn. |  |  |
| BV-FR18-LIST-005 | Số lượng user có đơn | `2` user | Có `O_U1` thuộc `U1` và `O_U2` thuộc `U2`. | Web/API hiển thị/trả đơn của cả `U1` và `U2`; nếu chỉ hiển thị một user thì không đạt FR-18. |  |  |

## 5. Ghi chú rủi ro

- API specification chưa mô tả status code/body cụ thể cho `GET /api/admin/orders`, nên expected result của API ở ca lỗi chỉ khẳng định mức nghiệp vụ: bị từ chối và không lộ dữ liệu admin.
- README/API spec không nêu đầy đủ schema item đơn hàng trong danh sách admin. Artifact chỉ yêu cầu tối thiểu dữ liệu quan sát cần cho FR-18: định danh đơn hàng, trạng thái hiện tại, và phạm vi toàn hệ thống.
- Để kiểm điều kiện "tất cả người dùng", tester cần chủ động dựng dữ liệu có đơn thuộc ít nhất hai user khác nhau bằng luồng checkout black-box.

