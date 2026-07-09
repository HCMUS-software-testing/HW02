# Báo cáo lỗi

## Tóm tắt

| Mã lỗi | Tiêu đề lỗi | Mô tả lỗi | Mã chức năng | Độ nghiêm trọng | Ngày ghi nhận | Trạng thái |
| ------ | ----------- | --------- | ------------ | ---------------- | ------------- | ---------- |
| BUG-FR01-01 | Biểu mẫu đăng ký không có trường xác nhận mật khẩu | Biểu mẫu đăng ký tài khoản trên frontend-web không hiển thị trường xác nhận mật khẩu, nên người dùng không thể nhập lại mật khẩu để kiểm tra lỗi gõ sai trước khi tạo tài khoản. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-FR01-02 | Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt | Quy tắc kiểm tra mật khẩu dùng Regex yêu cầu có khoảng trắng `\s` nhưng lại không cho phép ký tự đặc biệt như `!`, khiến mật khẩu đúng yêu cầu đặc tả bị từ chối và mật khẩu có khoảng trắng được chấp nhận. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-FR01-03 | API backend đăng ký không kiểm tra điều kiện dữ liệu nhập | Điểm cuối đăng ký cho phép gọi trực tiếp bằng Postman và tạo tài khoản dù dữ liệu không thỏa điều kiện kiểm tra như email sai định dạng, mật khẩu yếu hoặc thiếu trường bắt buộc. | FR-01 | Cao | 2026-07-08 | Đang mở |
| BUG-FR01-04 | Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký | Biểu mẫu đăng ký chấp nhận trường họ tên chỉ gồm khoảng trắng, nên tài khoản có tên không hợp lệ vẫn có thể được gửi đăng ký. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-FR01-05 | Biểu mẫu đăng ký cho phép email sai định dạng | Biểu mẫu đăng ký trên frontend-web vẫn cho tạo tài khoản với các email sai định dạng như thiếu local-part, thiếu ký tự `@`, có nhiều hơn một `@`, thiếu domain hoặc thiếu phần mở rộng domain. | FR-01 | Cao | 2026-07-08 | Đang mở |
| BUG-FR01-06 | Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại | Chức năng đăng ký không chặn email đã tồn tại trong hệ thống, nên người dùng có thể tạo tài khoản trùng email qua giao diện web và API. | FR-01 | Cao | 2026-07-08 | Đang mở |
| BUG-FR07-01 | Thêm sản phẩm vào giỏ trên Web không ổn định và thiếu phản hồi badge | Lần bấm đầu tiên vào `Thêm vào giỏ hàng` chưa thêm sản phẩm; sau khi thêm thành công không thấy badge giỏ hàng trên navbar cập nhật. | FR-07 | Trung bình | 2026-07-09 | Đang mở |
| BUG-FR07-02 | Thêm cùng sản phẩm tạo nhiều dòng trùng thay vì tăng số lượng | Khi thêm cùng một sản phẩm nhiều lần, Web và API tạo các dòng trùng `id` thay vì gộp thành một dòng và tăng `quantity`. | FR-07 | Cao | 2026-07-09 | Đang mở |
| BUG-FR07-03 | API thêm vào giỏ chấp nhận sản phẩm thiếu hoặc không thuộc catalog | `POST /api/cart` vẫn trả thành công và lưu item khi body thiếu trường hoặc dùng sản phẩm giả/không nhất quán với catalog. | FR-07 | Cao | 2026-07-09 | Đang mở |
| BUG-FR07-04 | Hệ thống cho phép số lượng giỏ hàng không hợp lệ | Web/API chấp nhận `quantity` thiếu, bằng `0`, âm hoặc không phải số nguyên, khiến giỏ có dữ liệu số lượng không hợp lệ. | FR-07 | Cao | 2026-07-09 | Đang mở |
| BUG-FR07-05 | Giỏ hàng không có nút tăng/giảm số lượng sản phẩm | Màn hình giỏ hàng không hiển thị nút `+/-`, nên người dùng không thể cập nhật số lượng trong giỏ theo yêu cầu FR-07. | FR-07 | Cao | 2026-07-09 | Đang mở |
| BUG-FR07-06 | Màn hình giỏ hàng dùng nhãn/cột không đúng đặc tả | Web dùng cột `Giá` thay vì `Đơn giá` và nhãn `Tổng tạm tính` thay vì `Tổng cộng`, làm sai nội dung hiển thị bắt buộc của giỏ hàng. | FR-07 | Thấp | 2026-07-09 | Đang mở |
| BUG-FR07-07 | Giỏ hàng thêm qua Web không đồng bộ với API `GET /api/cart` | Sau khi thêm sản phẩm qua Web UI, `GET /api/cart` với bearer token hợp lệ vẫn trả `200 []`, không phản ánh dữ liệu giỏ đang thấy trên Web. | FR-07 | Trung bình | 2026-07-09 | Đang mở |
| BUG-FR07-08 | Dữ liệu giỏ hàng trên Web bị mất sau khi tải lại trang | Trang giỏ hàng không giữ nguyên danh sách sản phẩm sau khi reload; các item đã thêm trong phiên hiện tại bị mất. | FR-07 | Cao | 2026-07-09 | Đang mở |
| BUG-FR07-09 | Xóa sản phẩm khỏi giỏ không có dialog xác nhận | Bấm `Xóa` làm item biến mất ngay, không có dialog xác nhận/hủy nên người dùng không thể hủy thao tác xóa nhầm. | FR-07 | Trung bình | 2026-07-09 | Đang mở |
| BUG-FR07-10 | Trạng thái giỏ trống thiếu hình minh họa | Empty state của giỏ hàng chỉ hiển thị thông báo/link và thiếu hình minh họa như oracle kiểm thử yêu cầu. | FR-07 | Thấp | 2026-07-09 | Đang mở |
| BUG-FR07-11 | Nút tiếp tục mua sắm không thống nhất ở giỏ có sản phẩm | Khi giỏ có sản phẩm, control quay về mua sắm hiển thị `← Mua tiếp` thay vì nhãn `Tiếp tục mua sắm` như yêu cầu FR-07. | FR-07 | Thấp | 2026-07-09 | Đang mở |
| BUG-FR18-01 | API quản lý đơn hàng admin không kiểm quyền `role=admin` | Các endpoint admin order chỉ kiểm token hợp lệ nhưng không kiểm role, nên user thường vẫn có thể xem danh sách đơn hàng toàn hệ thống và cập nhật trạng thái đơn hàng qua API admin. | FR-18 | Cao | 2026-07-09 | Đang mở |
| BUG-FR18-02 | Đơn đã hủy vẫn có thể chuyển sang đã giao | Trạng thái `canceled` không được bảo toàn như final state: Web Admin vẫn có nút đánh dấu đã giao cho đơn đã hủy và API chấp nhận cập nhật `canceled -> delivered`. | FR-18 | Cao | 2026-07-09 | Đang mở |
| BUG-FR18-03 | Web Admin render địa chỉ giao hàng bằng HTML không an toàn | Cột địa chỉ giao hàng trong quản lý đơn hàng dùng HTML thô để hiển thị `shipping_address`, khiến payload HTML/script hoặc ký tự đặc biệt không được escape an toàn. | FR-18 | Cao | 2026-07-09 | Đang mở |
| BUG-FR03-01 | OTP quên mật khẩu Mobile chỉ có 4 chữ số thay vì 6 chữ số | API `POST /api/forgot-password` sinh `resetToken` 4 chữ số và Mobile hiển thị nhãn `Mã OTP (4 số)`, không đúng yêu cầu OTP 6 chữ số của FR-03/SEC-07. | FR-03 | Cao | 2026-07-09 | Đang mở |
| BUG-FR03-02 | Luồng quên mật khẩu Mobile thiếu các thành phần UI bắt buộc | Mobile không hiển thị Step Indicator cho Bước 1/Bước 2, thiếu nút `Quay lại đăng nhập` ở Bước 1 và thiếu ký hiệu `*` cho các trường bắt buộc. | FR-03 | Trung bình | 2026-07-09 | Đang mở |
| BUG-FR03-03 | Bước đặt lại mật khẩu Mobile không có trường xác nhận mật khẩu mới | Màn hình Bước 2 chỉ có OTP và mật khẩu mới, không có `confirmNewPassword`, nên người dùng không thể xác nhận mật khẩu mới hoặc phát hiện lỗi nhập không khớp trước khi reset. | FR-03 | Cao | 2026-07-09 | Đang mở |
| BUG-FR03-04 | API đặt lại mật khẩu không kiểm tra độ mạnh mật khẩu mới | `POST /api/reset-password` chấp nhận đổi mật khẩu sang giá trị rỗng hoặc mật khẩu yếu như ngắn hơn 8 ký tự, thiếu chữ hoa, chữ thường, chữ số hoặc ký tự đặc biệt. | FR-03 | Cao | 2026-07-09 | Đang mở |
| BUG-FR03-05 | Mobile không hiển thị OTP demo sau khi lấy OTP | Sau khi gửi yêu cầu lấy OTP hợp lệ, Mobile chỉ hiển thị thông báo chung và không hiển thị OTP demo trực tiếp trên màn hình, khiến tester/người dùng không quan sát được mã OTP để tiếp tục Bước 2. | FR-03 | Cao | 2026-07-09 | Đang mở |

## Chi tiết lỗi

### BUG-FR01-01 - Biểu mẫu đăng ký không có trường xác nhận mật khẩu

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-01
- Tiêu đề lỗi: Biểu mẫu đăng ký không có trường xác nhận mật khẩu
- Mô tả lỗi: Biểu mẫu đăng ký tài khoản trên frontend-web không hiển thị trường xác nhận mật khẩu, nên người dùng không thể nhập lại mật khẩu để kiểm tra lỗi gõ sai trước khi tạo tài khoản.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - `EP-FR01-001`, `EP-FR01-019`, `EP-FR01-020`, `BV-FR01-021` đến `BV-FR01-026`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Người dùng truy cập được màn hình đăng ký tài khoản của ứng dụng web khách hàng.

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Chạy frontend-web của dự án.
3. Mở ứng dụng web khách hàng trên trình duyệt.
4. Điều hướng đến biểu mẫu đăng ký tài khoản.
5. Quan sát các trường nhập liệu trên biểu mẫu đăng ký.

#### Kết quả mong đợi

Biểu mẫu đăng ký cần có trường xác nhận mật khẩu để người dùng nhập lại mật khẩu, giúp phát hiện lỗi gõ sai mật khẩu trước khi tạo tài khoản.

#### Kết quả thực tế

Biểu mẫu đăng ký không hiển thị trường xác nhận mật khẩu.

#### Ghi chú

Lỗi được phát hiện sau khi cài đặt dự án, chạy backend và frontend-web, sau đó vào biểu mẫu đăng ký và quan sát giao diện.

### BUG-FR01-02 - Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-02
- Tiêu đề lỗi: Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt
- Mô tả lỗi: Quy tắc kiểm tra mật khẩu dùng Regex yêu cầu có khoảng trắng `\s` nhưng lại không cho phép ký tự đặc biệt như `!`, khiến mật khẩu đúng yêu cầu đặc tả bị từ chối và mật khẩu có khoảng trắng được chấp nhận.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; kiểm tra quy tắc kiểm tra mật khẩu mạnh trên biểu mẫu đăng ký.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - `EP-FR01-001`, `EP-FR01-021` đến `EP-FR01-026`, `BV-FR01-007`, `BV-FR01-008`, `BV-FR01-019`, `BV-FR01-020`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Người dùng truy cập được màn hình đăng ký tài khoản của ứng dụng web khách hàng.
- Quy tắc kiểm tra mật khẩu mạnh đang sử dụng Regex:

```js
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\s)[A-Za-z\d\s]{8,}$/
```

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Chạy frontend-web của dự án.
3. Mở ứng dụng web khách hàng trên trình duyệt.
4. Điều hướng đến biểu mẫu đăng ký tài khoản.
5. Nhập mật khẩu có chữ hoa, chữ thường, chữ số và ký tự đặc biệt, ví dụ `Abcdef1!`.
6. Quan sát kết quả kiểm tra mật khẩu.
7. Nhập mật khẩu có chữ hoa, chữ thường, chữ số và khoảng trắng, ví dụ `Abcdef1 `.
8. Quan sát kết quả kiểm tra mật khẩu.

#### Kết quả mong đợi

Mật khẩu mạnh nên chấp nhận ký tự đặc biệt phổ biến như `!@#$%` và không nên bắt buộc người dùng phải nhập khoảng trắng trong mật khẩu.

#### Kết quả thực tế

Regex hiện tại yêu cầu mật khẩu phải có ít nhất một ký tự khoảng trắng `\s`, đồng thời chỉ cho phép chữ cái, chữ số và khoảng trắng trong tập `[A-Za-z\d\s]`. Vì vậy mật khẩu như `Abcdef1!` bị từ chối, trong khi mật khẩu như `Abcdef1 ` lại hợp lệ.

#### Ghi chú

Regex đang dùng `(?=.*\s)` thay vì kiểm tra ký tự đặc biệt, và phần danh sách ký tự cho phép `[A-Za-z\d\s]{8,}` loại bỏ các ký tự đặc biệt thường được yêu cầu trong mật khẩu mạnh.

### BUG-FR01-03 - API backend đăng ký không kiểm tra điều kiện dữ liệu nhập

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-03
- Tiêu đề lỗi: API backend đăng ký không kiểm tra điều kiện dữ liệu nhập
- Mô tả lỗi: Điểm cuối đăng ký cho phép gọi trực tiếp bằng Postman và tạo tài khoản dù dữ liệu không thỏa điều kiện kiểm tra như email sai định dạng, mật khẩu yếu hoặc thiếu trường bắt buộc.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend đã được cài đặt/chạy; kiểm thử API đăng ký trực tiếp bằng Postman.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - `EP-FR01-003` đến `EP-FR01-020`, `BV-FR01-004`, `BV-FR01-006`, `BV-FR01-009`, `BV-FR01-012`, `BV-FR01-015`, `BV-FR01-018`, `BV-FR01-021` đến `BV-FR01-026`; `artifacts/test-results/fr01_api_domain_test_results.md`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Công cụ Postman hoặc công cụ gửi yêu cầu HTTP tương đương đã sẵn sàng.
- Xác định được điểm cuối API dùng để đăng ký tài khoản.

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Mở Postman.
3. Gửi yêu cầu đăng ký tài khoản trực tiếp đến API đăng ký.
4. Nhập dữ liệu không thỏa điều kiện kiểm tra của biểu mẫu đăng ký, ví dụ email sai định dạng, mật khẩu yếu, thiếu trường bắt buộc hoặc giá trị không hợp lệ.
5. Gửi yêu cầu và quan sát phản hồi từ backend.

#### Kết quả mong đợi

Backend phải kiểm tra lại toàn bộ điều kiện dữ liệu nhập quan trọng của chức năng đăng ký, bao gồm trường bắt buộc, định dạng email, độ dài/độ mạnh mật khẩu và các giá trị không hợp lệ. Yêu cầu không thỏa điều kiện phải bị từ chối với mã lỗi và thông báo phù hợp.

#### Kết quả thực tế

Khi đăng ký tài khoản qua API bằng Postman, backend không kiểm tra các điều kiện dữ liệu nhập tương ứng. Các điều kiện kiểm tra có thể bị bỏ qua nếu người dùng không thao tác qua frontend. Kết quả thực thi FR-01 qua API cho thấy nhiều ca kiểm thử mong đợi bị từ chối nhưng vẫn nhận `200 OK` và phần thân phản hồi `{"message":"User registered successfully","id":...}`.

#### Ghi chú

Việc kiểm tra chỉ ở frontend là không đủ vì kiểm tra phía client có thể bị bỏ qua bằng cách gọi API trực tiếp. Backend cần là lớp kiểm tra cuối cùng trước khi tạo tài khoản.

### BUG-FR01-04 - Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-04
- Tiêu đề lỗi: Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký
- Mô tả lỗi: Biểu mẫu đăng ký chấp nhận trường họ tên chỉ gồm khoảng trắng, nên tài khoản có tên không hợp lệ vẫn có thể được gửi đăng ký.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - testcase `EP-FR01-004`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Người dùng truy cập được màn hình đăng ký tài khoản của ứng dụng web khách hàng.

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Chạy frontend-web của dự án.
3. Mở ứng dụng web khách hàng trên trình duyệt.
4. Điều hướng đến biểu mẫu đăng ký tài khoản.
5. Nhập trường họ tên chỉ gồm khoảng trắng, ví dụ .
6. Nhập email hợp lệ chưa tồn tại.
7. Nhập mật khẩu thỏa điều kiện hiện tại của biểu mẫu.
8. Bấm nút đăng ký và quan sát kết quả.

#### Kết quả mong đợi

Biểu mẫu đăng ký phải từ chối giá trị họ tên chỉ gồm khoảng trắng, hiển thị lỗi họ tên không hợp lệ hoặc họ tên bắt buộc, và không tạo tài khoản mới.

#### Kết quả thực tế

Trường họ tên chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký, hệ thống tiếp tục xử lý đăng ký thay vì chặn dữ liệu không hợp lệ.

#### Ghi chú

Trường họ tên cần được loại bỏ khoảng trắng ở đầu/cuối hoặc kiểm tra để đảm bảo người dùng nhập dữ liệu có ký tự thực sự, không chỉ là khoảng trắng.

### BUG-FR01-05 - Biểu mẫu đăng ký cho phép email sai định dạng

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-05
- Tiêu đề lỗi: Biểu mẫu đăng ký cho phép email sai định dạng
- Mô tả lỗi: Biểu mẫu đăng ký trên frontend-web vẫn cho tạo tài khoản với các email sai định dạng như thiếu local-part, thiếu ký tự `@`, có nhiều hơn một `@`, thiếu domain hoặc thiếu phần mở rộng domain.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - các testcase `EP-FR01-006` đến `EP-FR01-010`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Người dùng truy cập được màn hình đăng ký tài khoản của ứng dụng web khách hàng.
- Sử dụng email chưa tồn tại để loại trừ lỗi trùng email khỏi kết quả kiểm thử.

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Chạy frontend-web của dự án.
3. Mở ứng dụng web khách hàng trên trình duyệt.
4. Điều hướng đến biểu mẫu đăng ký tài khoản.
5. Nhập họ tên hợp lệ.
6. Nhập một email sai định dạng, ví dụ `@example.com`, `fr01.example.com`, `fr01@@example.com`, `fr01@` hoặc `fr01@example`.
7. Nhập mật khẩu hợp lệ theo điều kiện hiện tại của biểu mẫu.
8. Bấm nút đăng ký và quan sát kết quả.

#### Kết quả mong đợi

Biểu mẫu đăng ký phải từ chối email sai định dạng, hiển thị lỗi định dạng email phù hợp và không tạo tài khoản mới.

#### Kết quả thực tế

Các testcase `EP-FR01-006` đến `EP-FR01-010` cho thấy frontend-web vẫn cho đăng ký và tạo tài khoản với email sai định dạng. API cũng trả `Status: 200`, có message đăng ký thành công và tạo tài khoản mới cho các email sai định dạng này.

#### Ghi chú

Lỗi này khác với BUG-FR01-03 ở phạm vi giao diện: người dùng thao tác trực tiếp trên frontend-web vẫn có thể gửi và tạo tài khoản với email không hợp lệ, không chỉ khi gọi API trực tiếp bằng Postman.

### BUG-FR01-06 - Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại

#### Thông tin lỗi

- Mã lỗi: BUG-FR01-06
- Tiêu đề lỗi: Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại
- Mô tả lỗi: Chức năng đăng ký không chặn email đã tồn tại trong hệ thống, nên người dùng có thể tạo tài khoản trùng email qua giao diện web và API.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; kiểm thử đăng ký với email đã tồn tại trong hệ thống.
- Bằng chứng: `../domain-testing/FR-01_account_registration_domain_testing/FR-01_account_registration_domain_testing.md` - testcase `EP-FR01-011`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Trong hệ thống đã có tài khoản sử dụng email `test@eshop.com` hoặc một email xác định khác để kiểm thử trùng lặp.
- Người dùng truy cập được màn hình đăng ký tài khoản của ứng dụng web khách hàng.

#### Các bước tái hiện

1. Chạy backend của dự án.
2. Chạy frontend-web của dự án.
3. Mở ứng dụng web khách hàng trên trình duyệt.
4. Điều hướng đến biểu mẫu đăng ký tài khoản.
5. Nhập họ tên hợp lệ.
6. Nhập email đã tồn tại, ví dụ `test@eshop.com`.
7. Nhập mật khẩu hợp lệ theo điều kiện hiện tại của biểu mẫu.
8. Bấm nút đăng ký và quan sát kết quả trên giao diện.
9. Gửi yêu cầu đăng ký tương tự qua Postman đến `POST /api/register` và quan sát phản hồi API.

#### Kết quả mong đợi

Hệ thống phải từ chối đăng ký bằng email đã tồn tại, hiển thị hoặc trả lỗi email đã được sử dụng, và không tạo thêm tài khoản mới.

#### Kết quả thực tế

Testcase `EP-FR01-011` cho thấy frontend-web vẫn cho đăng ký và tạo tài khoản với email đã tồn tại. API cũng trả `Status: 200`, có message đăng ký thành công và tạo tài khoản mới.

#### Ghi chú

Email là định danh tài khoản theo đặc tả FR-01, vì vậy backend cần kiểm tra tính duy nhất trước khi ghi dữ liệu; frontend-web cũng cần hiển thị lỗi phù hợp cho người dùng.

### BUG-FR07-01 - Thêm sản phẩm vào giỏ trên Web không ổn định và thiếu phản hồi badge

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-01
- Tiêu đề lỗi: Thêm sản phẩm vào giỏ trên Web không ổn định và thiếu phản hồi badge
- Mô tả lỗi: Lần bấm đầu tiên vào `Thêm vào giỏ hàng` chưa thêm sản phẩm; sau khi thêm thành công không thấy badge giỏ hàng trên navbar cập nhật.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Thêm vào giỏ hàng
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; kiểm thử thao tác thêm sản phẩm vào giỏ trên ứng dụng web khách hàng.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md` - các testcase `EP-FR07-ADDCART-001`, `EP-FR07-ADDCART-002`, `EP-FR07-ADDCART-012`, `BV-FR07-ADDCART-002` đến `BV-FR07-ADDCART-004`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Frontend-web đã được cài đặt và chạy thành công.
- Người dùng mở được trang chi tiết sản phẩm trên ứng dụng web khách hàng.
- Giỏ hàng ban đầu rỗng hoặc có trạng thái biết trước để quan sát badge.

#### Các bước tái hiện

1. Mở frontend-web trên trình duyệt.
2. Chọn một sản phẩm hợp lệ, ví dụ sản phẩm A.
3. Nhập `quantity=1`.
4. Bấm `Thêm vào giỏ hàng` một lần.
5. Quan sát phản hồi trên nút, badge giỏ hàng trên navbar và màn hình giỏ hàng.
6. Nếu sản phẩm chưa xuất hiện, bấm `Thêm vào giỏ hàng` lần thứ hai và quan sát lại.

#### Kết quả mong đợi

Ngay sau một lần bấm hợp lệ, Web phải thêm sản phẩm vào giỏ, hiển thị phản hồi trực quan rõ ràng và cập nhật badge giỏ hàng theo số lượng mới.

#### Kết quả thực tế

Lần bấm đầu tiên chưa thêm sản phẩm vào giỏ. Lần bấm thứ hai mới hiển thị trạng thái `Đã thêm` tạm thời và sản phẩm xuất hiện trong giỏ, nhưng không thấy badge navbar cập nhật.

#### Ghi chú

Lỗi ảnh hưởng khả năng nhận biết thao tác thành công của người dùng và có thể khiến người dùng bấm lặp lại, dẫn đến dữ liệu giỏ hàng sai.

### BUG-FR07-02 - Thêm cùng sản phẩm tạo nhiều dòng trùng thay vì tăng số lượng

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-02
- Tiêu đề lỗi: Thêm cùng sản phẩm tạo nhiều dòng trùng thay vì tăng số lượng
- Mô tả lỗi: Khi thêm cùng một sản phẩm nhiều lần, Web và API tạo các dòng trùng `id` thay vì gộp thành một dòng và tăng `quantity`.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Thêm vào giỏ hàng / Hiển thị danh sách sản phẩm
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend, frontend-web và công cụ Postman/curl đã sẵn sàng để kiểm thử Web/API.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md` - `EP-FR07-ADDCART-003`, `BV-FR07-ADDCART-005`, `BV-FR07-ADDCART-007`; `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - `EP-FR07-GETCART-004`, `BV-FR07-GETCART-008`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Có một sản phẩm A hợp lệ quan sát được trên UI/API.
- Có bearer token hợp lệ nếu kiểm thử bằng Postman.

#### Các bước tái hiện

1. Đảm bảo giỏ hàng rỗng hoặc không có sản phẩm A.
2. Thêm sản phẩm A vào giỏ với `quantity=1`.
3. Thêm lại chính sản phẩm A với `quantity=1`.
4. Mở màn hình giỏ hàng trên Web và quan sát số dòng sản phẩm.
5. Với API, gọi `POST /api/cart` hai lần cho cùng A, sau đó gọi `GET /api/cart` với bearer token hợp lệ.

#### Kết quả mong đợi

Giỏ hàng chỉ có một dòng cho sản phẩm A, `quantity` tăng thành `2`, `Thành tiền=2X` và tổng cộng phản ánh số lượng mới.

#### Kết quả thực tế

Web hiển thị 2 dòng trùng khi thêm cùng sản phẩm. API sau 2 lần `POST` cùng A trả 2 object cùng `id=1`, mỗi object có `quantity=1`.

#### Ghi chú

Lỗi này làm sai mô hình giỏ hàng và ảnh hưởng các phép tính số lượng, thành tiền, tổng cộng, checkout về sau.

### BUG-FR07-03 - API thêm vào giỏ chấp nhận sản phẩm thiếu hoặc không thuộc catalog

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-03
- Tiêu đề lỗi: API thêm vào giỏ chấp nhận sản phẩm thiếu hoặc không thuộc catalog
- Mô tả lỗi: `POST /api/cart` vẫn trả thành công và lưu item khi body thiếu trường hoặc dùng sản phẩm giả/không nhất quán với catalog.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Thêm vào giỏ hàng qua API
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend đã chạy; kiểm thử API bằng Postman hoặc công cụ gửi HTTP tương đương.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md` - các testcase `EP-FR07-ADDCART-007`, `EP-FR07-ADDCART-008`.

#### Điều kiện tiên quyết

- Backend đã chạy thành công.
- Có bearer token hợp lệ của user test.
- Xác định được endpoint `POST /api/cart` và `GET /api/cart`.

#### Các bước tái hiện

1. Gửi `POST /api/cart` với bearer token hợp lệ nhưng body thiếu dữ liệu, ví dụ `{"id":1}`.
2. Gọi `GET /api/cart` bằng cùng bearer token để đọc lại giỏ.
3. Gửi tiếp `POST /api/cart` với sản phẩm không thuộc catalog, ví dụ `{"id":999,"name":"Ghost Product","price":12345,"quantity":1}`.
4. Gọi `GET /api/cart` và quan sát dữ liệu giỏ.

#### Kết quả mong đợi

API phải từ chối item thiếu trường bắt buộc, item không tồn tại trong catalog hoặc dữ liệu product không nhất quán; giỏ không được thay đổi.

#### Kết quả thực tế

API trả `200 {"message":"Added to cart"}` cho body thiếu field và lưu object thiếu dữ liệu. API cũng chấp nhận `id=999`, `name="Ghost Product"` và lưu item giả vào giỏ.

#### Ghi chú

Backend cần kiểm tra dữ liệu sản phẩm dựa trên catalog hợp lệ thay vì tin toàn bộ payload từ client.

### BUG-FR07-04 - Hệ thống cho phép số lượng giỏ hàng không hợp lệ

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-04
- Tiêu đề lỗi: Hệ thống cho phép số lượng giỏ hàng không hợp lệ
- Mô tả lỗi: Web/API chấp nhận `quantity` thiếu, bằng `0`, âm hoặc không phải số nguyên, khiến giỏ có dữ liệu số lượng không hợp lệ.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Thêm vào giỏ hàng / Cập nhật số lượng
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend, frontend-web và Postman/curl đã sẵn sàng.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_add-to-cart_domain_testing.md` - `EP-FR07-ADDCART-009` đến `EP-FR07-ADDCART-011`, `BV-FR07-ADDCART-001`; `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.md` - `EP-FR07-UPDQTY-003`, `BV-FR07-UPDQTY-001`.

#### Điều kiện tiên quyết

- Backend đã chạy thành công.
- Frontend-web đã chạy thành công.
- Có sản phẩm A hợp lệ và bearer token hợp lệ để kiểm thử API.

#### Các bước tái hiện

1. Gửi `POST /api/cart` với sản phẩm A nhưng thiếu `quantity`.
2. Gửi `POST /api/cart` với `quantity=0`.
3. Gửi `POST /api/cart` với `quantity=-1`.
4. Gửi `POST /api/cart` với `quantity="abc"` hoặc `quantity=1.5`.
5. Gọi `GET /api/cart` để kiểm tra dữ liệu đã lưu.
6. Trên Web, thử nhập giá trị rỗng, `0`, số âm hoặc số không nguyên vào ô số lượng trước khi thêm vào giỏ.

#### Kết quả mong đợi

Hệ thống phải chỉ chấp nhận số nguyên dương, tối thiểu là `1`; các giá trị thiếu, `0`, âm hoặc không phải số nguyên phải bị từ chối và không làm thay đổi giỏ.

#### Kết quả thực tế

API trả `200` và lưu item thiếu `quantity`, `quantity=0`, `quantity=-1` hoặc `"quantity":"abc"`. Web cho phép để trống/nhập `0`/số âm; với `1.5` hệ thống nhận thành `1`, còn chuỗi không số dẫn tới số lượng không hợp lệ trong giỏ.

#### Ghi chú

Lỗi này có thể làm sai thành tiền, tổng tiền, tồn kho và quy trình đặt hàng.

### BUG-FR07-05 - Giỏ hàng không có nút tăng/giảm số lượng sản phẩm

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-05
- Tiêu đề lỗi: Giỏ hàng không có nút tăng/giảm số lượng sản phẩm
- Mô tả lỗi: Màn hình giỏ hàng không hiển thị nút `+/-`, nên người dùng không thể cập nhật số lượng trong giỏ theo yêu cầu FR-07.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Cập nhật số lượng trong giỏ
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã chạy; kiểm thử màn hình giỏ hàng trên Web UI.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.md` - `EP-FR07-UPDQTY-001`, `EP-FR07-UPDQTY-002`, `EP-FR07-UPDQTY-007`, `BV-FR07-UPDQTY-003`, `BV-FR07-UPDQTY-004`, `BV-FR07-UPDQTY-006`, `BV-FR07-UPDQTY-007`; `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - `EP-FR07-GETCART-002`, `EP-FR07-GETCART-007`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Giỏ hàng trên Web có ít nhất một sản phẩm.

#### Các bước tái hiện

1. Thêm sản phẩm A vào giỏ hàng.
2. Mở màn hình giỏ hàng.
3. Quan sát cột số lượng của dòng sản phẩm A.
4. Tìm nút `+` để tăng số lượng và nút `-` để giảm số lượng.

#### Kết quả mong đợi

Mỗi dòng sản phẩm trong giỏ cần có điều khiển `+/-` để người dùng tăng hoặc giảm số lượng. Sau thao tác hợp lệ, số lượng, thành tiền và tổng cộng phải cập nhật theo trạng thái mới.

#### Kết quả thực tế

Trong dòng sản phẩm không có nút `+` hoặc `-`, nên không thể thực hiện luồng tăng/giảm số lượng từ màn hình giỏ. API specification cũng không có endpoint cập nhật số lượng để đối chiếu qua API.

#### Ghi chú

Đây là thiếu sót chức năng chính của FR-07, không chỉ là lỗi hiển thị.

### BUG-FR07-06 - Màn hình giỏ hàng dùng nhãn/cột không đúng đặc tả

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-06
- Tiêu đề lỗi: Màn hình giỏ hàng dùng nhãn/cột không đúng đặc tả
- Mô tả lỗi: Web dùng cột `Giá` thay vì `Đơn giá` và nhãn `Tổng tạm tính` thay vì `Tổng cộng`, làm sai nội dung hiển thị bắt buộc của giỏ hàng.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Hiển thị danh sách sản phẩm / Tổng cộng
- Độ nghiêm trọng: Thấp
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã chạy; giỏ hàng có ít nhất một sản phẩm.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - `EP-FR07-GETCART-002`, `EP-FR07-GETCART-003`, `EP-FR07-GETCART-007`, `EP-FR07-GETCART-009`, `EP-FR07-GETCART-010`, `BV-FR07-GETCART-002`, `BV-FR07-GETCART-003`, `BV-FR07-GETCART-010`, `BV-FR07-GETCART-011`; `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_update-cart-quantity_domain_testing.md` - `EP-FR07-UPDQTY-009`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Giỏ hàng có ít nhất một sản phẩm.

#### Các bước tái hiện

1. Mở màn hình giỏ hàng.
2. Quan sát tiêu đề các cột trong bảng sản phẩm.
3. Quan sát nhãn tổng tiền phía cuối giỏ hàng.

#### Kết quả mong đợi

Màn hình giỏ hàng cần hiển thị đúng các nội dung theo FR-07, gồm cột `Đơn giá` và nhãn tổng tiền `Tổng cộng`.

#### Kết quả thực tế

Web hiển thị cột `Giá` thay vì `Đơn giá`, và hiển thị nhãn `Tổng tạm tính:` thay vì `Tổng cộng`.

#### Ghi chú

Giá trị tiền có thể được tính đúng trong một số testcase, nhưng nhãn không đúng đặc tả gây sai lệch yêu cầu hiển thị.

### BUG-FR07-07 - Giỏ hàng thêm qua Web không đồng bộ với API `GET /api/cart`

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-07
- Tiêu đề lỗi: Giỏ hàng thêm qua Web không đồng bộ với API `GET /api/cart`
- Mô tả lỗi: Sau khi thêm sản phẩm qua Web UI, `GET /api/cart` với bearer token hợp lệ vẫn trả `200 []`, không phản ánh dữ liệu giỏ đang thấy trên Web.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Hiển thị danh sách sản phẩm / API `GET /api/cart`
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend, frontend-web và Postman/curl đã sẵn sàng.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - `EP-FR07-GETCART-002` đến `EP-FR07-GETCART-004`, `EP-FR07-GETCART-007`, `EP-FR07-GETCART-008`, `EP-FR07-GETCART-010`, `BV-FR07-GETCART-002` đến `BV-FR07-GETCART-008`, `BV-FR07-GETCART-010`, `BV-FR07-GETCART-011`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Có user hợp lệ và bearer token hợp lệ.
- Người dùng đã đăng nhập hoặc có thể thêm sản phẩm vào giỏ trên Web.

#### Các bước tái hiện

1. Trên Web UI, thêm một sản phẩm hợp lệ vào giỏ.
2. Mở màn hình giỏ hàng và xác nhận sản phẩm đang xuất hiện trên Web.
3. Gọi `GET /api/cart` bằng bearer token hợp lệ của user test.
4. So sánh dữ liệu API với dữ liệu đang hiển thị trên Web.

#### Kết quả mong đợi

API `GET /api/cart` phải trả dữ liệu giỏ tương ứng với giỏ của user hợp lệ, hoặc hệ thống phải có contract rõ ràng về việc Web dùng giỏ phiên riêng không đồng bộ với API.

#### Kết quả thực tế

Sau khi thêm bằng UI và thấy sản phẩm trên Web, Postman gọi `GET /api/cart` với bearer token hợp lệ vẫn trả `200 []`, không có item để đối chiếu.

#### Ghi chú

README của artifact ghi nhận dữ liệu thêm qua Web không mặc định đồng bộ với API, nhưng đây vẫn là rủi ro/bug chức năng nếu FR-07 yêu cầu giỏ hàng của user được quản lý nhất quán giữa Web và API.

### BUG-FR07-08 - Dữ liệu giỏ hàng trên Web bị mất sau khi tải lại trang

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-08
- Tiêu đề lỗi: Dữ liệu giỏ hàng trên Web bị mất sau khi tải lại trang
- Mô tả lỗi: Trang giỏ hàng không giữ nguyên danh sách sản phẩm sau khi reload; các item đã thêm trong phiên hiện tại bị mất.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Hiển thị danh sách sản phẩm
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã chạy; kiểm thử bằng trình duyệt.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - testcase `EP-FR07-GETCART-011`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Trang giỏ hàng Web đang có ít nhất một sản phẩm.

#### Các bước tái hiện

1. Thêm một sản phẩm hợp lệ vào giỏ trên Web.
2. Mở màn hình giỏ hàng và xác nhận item đang hiển thị.
3. Tải lại trang trình duyệt.
4. Quan sát lại danh sách sản phẩm trong giỏ.

#### Kết quả mong đợi

Danh sách sản phẩm trong trang giỏ hàng phải giữ nguyên sau khi tải lại trang.

#### Kết quả thực tế

Sau khi tải lại trang, danh sách sản phẩm đã thêm trong giỏ của phiên hiện tại bị mất.

#### Ghi chú

Lỗi này có thể làm người dùng mất toàn bộ tiến trình mua hàng trước khi checkout.

### BUG-FR07-09 - Xóa sản phẩm khỏi giỏ không có dialog xác nhận

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-09
- Tiêu đề lỗi: Xóa sản phẩm khỏi giỏ không có dialog xác nhận
- Mô tả lỗi: Bấm `Xóa` làm item biến mất ngay, không có dialog xác nhận/hủy nên người dùng không thể hủy thao tác xóa nhầm.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Xóa sản phẩm trong giỏ
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã chạy; giỏ hàng có ít nhất một sản phẩm.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.md` - `EP-FR07-REMOVE-001` đến `EP-FR07-REMOVE-005`, `EP-FR07-REMOVE-009`, `BV-FR07-REMOVE-002` đến `BV-FR07-REMOVE-005`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Giỏ hàng có một hoặc nhiều sản phẩm.

#### Các bước tái hiện

1. Mở màn hình giỏ hàng có sản phẩm A.
2. Bấm nút `Xóa` ở dòng sản phẩm A.
3. Quan sát xem có dialog xác nhận/hủy xuất hiện trước khi xóa không.
4. Với giỏ nhiều sản phẩm, thử bấm `Xóa` ở một dòng cụ thể và quan sát kết quả.

#### Kết quả mong đợi

Web phải hiển thị dialog xác nhận trước khi xóa. Nếu người dùng hủy, item vẫn phải còn trong giỏ; nếu xác nhận, chỉ item được chọn bị xóa và tổng cộng cập nhật.

#### Kết quả thực tế

Không xuất hiện dialog xác nhận/hủy. Khi bấm `Xóa`, item bị xóa ngay; người dùng không có cơ hội hủy thao tác.

#### Ghi chú

Trong các testcase nhiều item, Web xóa đúng dòng và cập nhật tổng, nhưng luồng vẫn không đạt vì thiếu bước xác nhận bắt buộc.

### BUG-FR07-10 - Trạng thái giỏ trống thiếu hình minh họa

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-10
- Tiêu đề lỗi: Trạng thái giỏ trống thiếu hình minh họa
- Mô tả lỗi: Empty state của giỏ hàng chỉ hiển thị thông báo/link và thiếu hình minh họa như oracle kiểm thử yêu cầu.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Trạng thái giỏ trống
- Độ nghiêm trọng: Thấp
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-web đã chạy; kiểm thử màn hình giỏ hàng khi không có sản phẩm.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_get-cart-product-list_domain_testing.md` - `EP-FR07-GETCART-001`, `BV-FR07-GETCART-001`; `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_remove-cart-product_domain_testing.md` - `EP-FR07-REMOVE-001`, `EP-FR07-REMOVE-006`, `BV-FR07-REMOVE-001`, `BV-FR07-REMOVE-002`, `BV-FR07-REMOVE-004`.

#### Điều kiện tiên quyết

- Backend và frontend-web đã chạy thành công.
- Giỏ hàng của người dùng đang rỗng hoặc vừa xóa item cuối cùng.

#### Các bước tái hiện

1. Mở màn hình giỏ hàng khi giỏ rỗng.
2. Quan sát nội dung empty state.
3. Nếu giỏ có một item, xóa item cuối cùng và quan sát empty state sau xóa.

#### Kết quả mong đợi

Màn hình giỏ trống cần có trạng thái rõ ràng, gồm thông báo và hình minh họa theo oracle kiểm thử.

#### Kết quả thực tế

Web chỉ hiển thị text `Giỏ hàng của bạn đang trống` và link `Tiếp tục mua sắm`, không có hình minh họa.

#### Ghi chú

Lỗi mức thấp vì không làm sai dữ liệu giỏ hàng, nhưng làm thiếu nội dung UI được ghi trong testcase.

### BUG-FR07-11 - Nút tiếp tục mua sắm không thống nhất ở giỏ có sản phẩm

#### Thông tin lỗi

- Mã lỗi: BUG-FR07-11
- Tiêu đề lỗi: Nút tiếp tục mua sắm không thống nhất ở giỏ có sản phẩm
- Mô tả lỗi: Khi giỏ có sản phẩm, control quay về mua sắm hiển thị `← Mua tiếp` thay vì nhãn `Tiếp tục mua sắm` như yêu cầu FR-07.
- Mã chức năng: FR-07
- Chức năng: Giỏ hàng - Tiếp tục mua sắm
- Độ nghiêm trọng: Thấp
- Ngày ghi nhận: 2026-07-09
- Môi trường: Frontend-web đã chạy; kiểm thử điều hướng từ màn hình giỏ hàng.
- Bằng chứng: `../domain-testing/FR-07_shopping-cart/FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md` - `EP-FR07-CONTINUE-002`, `EP-FR07-CONTINUE-003`, `BV-FR07-CONTINUE-002`, `BV-FR07-CONTINUE-003`.

#### Điều kiện tiên quyết

- Frontend-web đã chạy thành công.
- Giỏ hàng có ít nhất một sản phẩm.

#### Các bước tái hiện

1. Thêm một sản phẩm vào giỏ hàng trên Web.
2. Mở màn hình giỏ hàng.
3. Quan sát control quay về trang mua sắm.
4. Bấm control này và quan sát điều hướng.

#### Kết quả mong đợi

Màn hình giỏ hàng phải có nút hoặc link `Tiếp tục mua sắm` để người dùng quay về trang chủ/product listing.

#### Kết quả thực tế

Khi giỏ có sản phẩm, control hiển thị là `← Mua tiếp`. Điều hướng vẫn về `/` và không làm thay đổi item trong giỏ, nhưng nhãn không đúng literal `Tiếp tục mua sắm`.

#### Ghi chú

Các testcase ghi nhận `← Mua tiếp` vẫn tương đương về ý nghĩa và điều hướng đúng, nên lỗi được xếp mức thấp.

### BUG-FR18-01 - API quản lý đơn hàng admin không kiểm quyền `role=admin`

#### Thông tin lỗi

- Mã lỗi: BUG-FR18-01
- Tiêu đề lỗi: API quản lý đơn hàng admin không kiểm quyền `role=admin`
- Mô tả lỗi: Các endpoint admin order chỉ kiểm token hợp lệ nhưng không kiểm role, nên user thường vẫn có thể xem danh sách đơn hàng toàn hệ thống và cập nhật trạng thái đơn hàng qua API admin.
- Mã chức năng: FR-18
- Chức năng: Quản lý Đơn hàng Admin - Xem toàn bộ đơn hàng / Cập nhật trạng thái đơn hàng
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-admin đã chạy; kiểm thử API bằng cURL/Postman-style trên `http://localhost:3000`.
- Bằng chứng: `../domain-testing/FR-18_order-management-admin/FR-18_admin-order-list_domain_testing.md` - `EP-FR18-LIST-006`; `../domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.md` - `EP-FR18-STATUS-008`; `../domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.md` - `EP-FR18-ADDR-006`; `artifacts/test-results/FR18_order_management_admin_api_evidence.txt`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Có token hợp lệ của một tài khoản user thường, ví dụ `test@eshop.com`.
- Có ít nhất một đơn hàng quan sát được nếu kiểm thử cập nhật trạng thái.

#### Các bước tái hiện

1. Đăng nhập bằng tài khoản user thường để lấy bearer token hợp lệ.
2. Gọi `GET /api/admin/orders` với header `Authorization: Bearer <valid_user_token>`.
3. Quan sát response danh sách đơn hàng admin.
4. Chọn một đơn đang ở trạng thái có thể chuyển đổi, ví dụ `pending`.
5. Gọi `PUT /api/admin/orders/:id/status` với token user thường và body `{"status":"confirmed"}`.
6. Đọc lại danh sách đơn hàng để kiểm tra trạng thái sau cập nhật.

#### Kết quả mong đợi

Mọi API `/api/admin/*` phải yêu cầu JWT hợp lệ và `role = 'admin'`. Token user thường phải bị từ chối với lỗi phân quyền `4xx`, không được trả dữ liệu đơn hàng toàn hệ thống và không được làm thay đổi trạng thái đơn.

#### Kết quả thực tế

`GET /api/admin/orders` bằng token user thường trả `200` thay vì lỗi phân quyền. `PUT /api/admin/orders/:id/status` bằng token user thường trả `200 {"message":"Order status updated"}` và đọc lại thấy đơn đã đổi từ `pending` sang `confirmed`.

#### Ghi chú

Frontend-admin có thể chặn user thường khi đăng nhập qua form, nhưng backend vẫn là lớp bảo vệ bắt buộc cho API admin vì người dùng có thể gọi API trực tiếp.

### BUG-FR18-02 - Đơn đã hủy vẫn có thể chuyển sang đã giao

#### Thông tin lỗi

- Mã lỗi: BUG-FR18-02
- Tiêu đề lỗi: Đơn đã hủy vẫn có thể chuyển sang đã giao
- Mô tả lỗi: Trạng thái `canceled` không được bảo toàn như final state: Web Admin vẫn có nút đánh dấu đã giao cho đơn đã hủy và API chấp nhận cập nhật `canceled -> delivered`.
- Mã chức năng: FR-18
- Chức năng: Quản lý Đơn hàng Admin - Cập nhật trạng thái đơn hàng
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-admin đã chạy; kiểm thử Web Admin và API trạng thái đơn hàng.
- Bằng chứng: `../domain-testing/FR-18_order-management-admin/FR-18_admin-order-status-update_domain_testing.md` - `EP-FR18-STATUS-018`, `BV-FR18-STATUS-008`; `artifacts/test-results/FR18_order_management_admin_api_evidence.txt`.

#### Điều kiện tiên quyết

- Backend và frontend-admin đã chạy thành công.
- Có token admin hợp lệ.
- Có một đơn hàng đang ở trạng thái `canceled`.

#### Các bước tái hiện

1. Đăng nhập Web Admin bằng tài khoản admin.
2. Mở màn hình `Quản lý Đơn hàng` và quan sát dòng đơn có `status=canceled`.
3. Kiểm tra các nút thao tác trạng thái đang hiển thị cho đơn đã hủy.
4. Gọi API `PUT /api/admin/orders/:id/status` cho đơn đã hủy với body `{"status":"delivered"}`.
5. Gọi lại `GET /api/admin/orders` hoặc quan sát Web Admin để kiểm tra trạng thái sau cập nhật.

#### Kết quả mong đợi

Theo state machine FR-10, `canceled` là trạng thái kết thúc. Web Admin không được hiển thị thao tác chuyển tiếp cho đơn đã hủy, API phải từ chối mọi chuyển đổi rời khỏi `canceled`, và trạng thái đơn phải giữ nguyên `canceled`.

#### Kết quả thực tế

API từ chối `canceled -> confirmed` nhưng lại chấp nhận `canceled -> delivered` với `200`, sau đó đọc lại thấy đơn chuyển sang `delivered`. Web Admin cũng hiển thị nút `Đánh dấu Đã giao` khi đơn đang có `status === "canceled"`.

#### Ghi chú

Lỗi này làm sai state machine và có thể khiến đơn đã hủy bị ghi nhận như đã giao, ảnh hưởng trực tiếp đến vận hành đơn hàng và báo cáo.

### BUG-FR18-03 - Web Admin render địa chỉ giao hàng bằng HTML không an toàn

#### Thông tin lỗi

- Mã lỗi: BUG-FR18-03
- Tiêu đề lỗi: Web Admin render địa chỉ giao hàng bằng HTML không an toàn
- Mô tả lỗi: Cột địa chỉ giao hàng trong quản lý đơn hàng dùng HTML thô để hiển thị `shipping_address`, khiến payload HTML/script hoặc ký tự đặc biệt không được escape an toàn.
- Mã chức năng: FR-18
- Chức năng: Quản lý Đơn hàng Admin - Hiển thị an toàn địa chỉ giao hàng
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và frontend-admin đã chạy; dữ liệu đơn hàng được tạo qua luồng checkout với `shipping_address` chứa HTML/script/ký tự đặc biệt.
- Bằng chứng: `../domain-testing/FR-18_order-management-admin/FR-18_admin-shipping-address-safe-display_domain_testing.md` - `EP-FR18-ADDR-003`, `EP-FR18-ADDR-004`; `artifacts/test-results/FR18_order_management_admin_api_evidence.txt`.

#### Điều kiện tiên quyết

- Backend và frontend-admin đã chạy thành công.
- Có token admin hợp lệ.
- Có đơn hàng được tạo với `shipping_address` chứa payload như `<img src=x onerror=alert(1)>` hoặc ký tự đặc biệt như `Apt "5" & <Gate A>`.

#### Các bước tái hiện

1. Tạo đơn hàng qua luồng checkout với `shipping_address="<img src=x onerror=alert(1)>"`.
2. Đăng nhập Web Admin bằng tài khoản admin.
3. Mở màn hình `Quản lý Đơn hàng`.
4. Quan sát cột địa chỉ giao hàng của đơn vừa tạo.
5. Lặp lại với địa chỉ có ký tự đặc biệt, ví dụ `Apt "5" & <Gate A>`.

#### Kết quả mong đợi

Web Admin phải hiển thị `shipping_address` như văn bản an toàn, escape các ký tự HTML đặc biệt, không tạo node HTML từ dữ liệu người dùng và không thực thi JavaScript/event handler.

#### Kết quả thực tế

API trả nguyên chuỗi payload trong `shipping_address`. Web Admin đưa giá trị này vào HTML thô bằng `dangerouslySetInnerHTML`, nên payload như `<img src=x onerror=alert(1)>` có thể được trình duyệt phân tích thành phần tử HTML/event handler thay vì hiển thị như văn bản an toàn; chuỗi `Apt "5" & <Gate A>` cũng có nguy cơ bị phân tích như markup.

#### Ghi chú

Đây là lỗi bảo mật hiển thị dữ liệu do người dùng nhập. API trả chuỗi không tự chứng minh lỗi render, nhưng artifact FR-18 ghi nhận UI Web Admin dùng HTML thô để hiển thị cột địa chỉ giao hàng.

### BUG-FR03-01 - OTP quên mật khẩu Mobile chỉ có 4 chữ số thay vì 6 chữ số

#### Thông tin lỗi

- Mã lỗi: BUG-FR03-01
- Tiêu đề lỗi: OTP quên mật khẩu Mobile chỉ có 4 chữ số thay vì 6 chữ số
- Mô tả lỗi: API `POST /api/forgot-password` sinh `resetToken` 4 chữ số và Mobile hiển thị nhãn `Mã OTP (4 số)`, không đúng yêu cầu OTP 6 chữ số của FR-03/SEC-07.
- Mã chức năng: FR-03
- Chức năng: Quên mật khẩu Mobile - Lấy OTP / Đặt lại mật khẩu
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và Mobile App đã chạy; kiểm thử API bằng Postman-style trên `http://127.0.0.1:3000` và quan sát luồng Mobile.
- Bằng chứng: `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.md` - `EP-FR03-MOB-FORGOT-001`, `EP-FR03-MOB-FORGOT-005`, `BV-FR03-MOB-FORGOT-001`, `BV-FR03-MOB-FORGOT-002`; `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md` - `EP-FR03-MOB-RESET-001`, `EP-FR03-MOB-RESET-006`, `BV-FR03-MOB-RESET-001`, `BV-FR03-MOB-RESET-002`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Mobile App đã chạy và có thể gọi API backend.
- Có tài khoản đã đăng ký, ví dụ `test@eshop.com`.

#### Các bước tái hiện

1. Mở luồng `Quên mật khẩu` trên Mobile hoặc gọi API `POST /api/forgot-password`.
2. Gửi yêu cầu lấy OTP với body `{"email":"test@eshop.com"}`.
3. Quan sát `resetToken` trong API response.
4. Chuyển sang màn hình nhập OTP/password trên Mobile.
5. Quan sát nhãn trường OTP.

#### Kết quả mong đợi

Theo FR-03/SEC-07, OTP phải là mã gồm đúng 6 chữ số. Mobile phải hướng dẫn người dùng nhập OTP 6 chữ số, và API success phải trả `resetToken` đúng 6 ký tự số trong môi trường demo.

#### Kết quả thực tế

API trả `200 OK` nhưng `resetToken` chỉ có 4 chữ số, ví dụ `"6295"` hoặc `"3816"`. Mobile Bước 2 hiển thị nhãn `Mã OTP (4 số)`, nhất quán với hành vi 4 chữ số nhưng sai yêu cầu OTP 6 chữ số.

#### Ghi chú

Các testcase cũng ghi nhận Mobile không hiển thị OTP demo trực tiếp trên màn hình sau khi lấy OTP; API vẫn có trường `resetToken`, nhưng độ dài token không đạt biên 6 chữ số.

### BUG-FR03-02 - Luồng quên mật khẩu Mobile thiếu các thành phần UI bắt buộc

#### Thông tin lỗi

- Mã lỗi: BUG-FR03-02
- Tiêu đề lỗi: Luồng quên mật khẩu Mobile thiếu các thành phần UI bắt buộc
- Mô tả lỗi: Mobile không hiển thị Step Indicator cho Bước 1/Bước 2, thiếu nút `Quay lại đăng nhập` ở Bước 1 và thiếu ký hiệu `*` cho các trường bắt buộc.
- Mã chức năng: FR-03
- Chức năng: Quên mật khẩu Mobile - Giao diện luồng 2 bước
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-09
- Môi trường: Mobile App đã chạy; quan sát màn hình `Quên mật khẩu` Bước 1 và màn hình đặt lại mật khẩu Bước 2.
- Bằng chứng: `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.md` - `EP-FR03-MOB-FORGOT-001`, `EP-FR03-MOB-FORGOT-006`, `EP-FR03-MOB-FORGOT-007`, `EP-FR03-MOB-FORGOT-008`; `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md` - `EP-FR03-MOB-RESET-001`, `EP-FR03-MOB-RESET-018`, `EP-FR03-MOB-RESET-020`.

#### Điều kiện tiên quyết

- Mobile App đã chạy thành công.
- Người dùng mở được màn hình `Quên mật khẩu`.
- Có thể chuyển sang màn hình nhập OTP/password sau khi yêu cầu OTP.

#### Các bước tái hiện

1. Mở màn hình `Quên mật khẩu` Bước 1 trên Mobile.
2. Quan sát tiêu đề, nhãn email, Step Indicator và nút điều hướng về đăng nhập.
3. Gửi yêu cầu lấy OTP hợp lệ để chuyển sang Bước 2.
4. Quan sát Step Indicator, nhãn OTP và nhãn mật khẩu mới ở Bước 2.

#### Kết quả mong đợi

Mobile phải thể hiện rõ luồng 2 bước bằng Step Indicator, ví dụ `Bước 1 / 2` và `Bước 2 / 2`. Bước 1 phải có nút `Quay lại đăng nhập`. Các trường bắt buộc như email, OTP, mật khẩu mới và xác nhận mật khẩu mới phải có ký hiệu `*` theo FR-22.

#### Kết quả thực tế

Bước 1 chỉ hiển thị tiêu đề `Quên Mật Khẩu`, nhãn `Nhập Email của bạn` và nút `Lấy mã OTP`; không có Step Indicator, không có nút `Quay lại đăng nhập`, và nhãn email không có `*`. Bước 2 không có Step Indicator; nhãn `Mã OTP (4 số)` và `Mật khẩu mới` không có ký hiệu `*`.

#### Ghi chú

Đây là nhóm lỗi UI/UX và form requirement của luồng Mobile; API không có endpoint để kiểm các thành phần hiển thị này.

### BUG-FR03-03 - Bước đặt lại mật khẩu Mobile không có trường xác nhận mật khẩu mới

#### Thông tin lỗi

- Mã lỗi: BUG-FR03-03
- Tiêu đề lỗi: Bước đặt lại mật khẩu Mobile không có trường xác nhận mật khẩu mới
- Mô tả lỗi: Màn hình Bước 2 chỉ có OTP và mật khẩu mới, không có `confirmNewPassword`, nên người dùng không thể xác nhận mật khẩu mới hoặc phát hiện lỗi nhập không khớp trước khi reset.
- Mã chức năng: FR-03
- Chức năng: Đặt lại mật khẩu Mobile - Xác nhận mật khẩu mới
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Mobile App đã chạy; kiểm thử màn hình đặt lại mật khẩu Bước 2 sau khi lấy OTP.
- Bằng chứng: `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md` - `EP-FR03-MOB-RESET-001`, `EP-FR03-MOB-RESET-016`, `EP-FR03-MOB-RESET-017`, `EP-FR03-MOB-RESET-020`, `BV-FR03-MOB-RESET-008`, `BV-FR03-MOB-RESET-009`, `BV-FR03-MOB-RESET-010`, `BV-FR03-MOB-RESET-011`.

#### Điều kiện tiên quyết

- Backend và Mobile App đã chạy thành công.
- Có tài khoản đã đăng ký và đã lấy OTP qua Bước 1.
- Mobile đang ở màn hình nhập OTP và mật khẩu mới.

#### Các bước tái hiện

1. Trên Mobile, mở luồng `Quên mật khẩu`.
2. Gửi email đã đăng ký để lấy OTP.
3. Chuyển sang màn hình đặt lại mật khẩu Bước 2.
4. Quan sát các trường nhập liệu trên màn hình.
5. Thử nhập tình huống confirm rỗng, confirm khác mật khẩu mới, confirm thiếu hoặc dư một ký tự.

#### Kết quả mong đợi

Bước 2 phải có trường `Xác nhận mật khẩu mới` hoặc `confirmNewPassword`. Mobile phải yêu cầu người dùng nhập confirm, kiểm tra confirm khớp toàn bộ với `newPassword`, và từ chối reset khi confirm rỗng hoặc không khớp.

#### Kết quả thực tế

Mobile Bước 2 không có trường `confirmNewPassword`, nên không thể nhập confirm rỗng, confirm mismatch, confirm thiếu 1 ký tự hoặc dư 1 ký tự để hệ thống validate. API `POST /api/reset-password` cũng không có field riêng cho confirm trong contract.

#### Ghi chú

Lỗi này làm mất lớp phòng tránh nhập sai mật khẩu mới ở phía người dùng. API không nhận confirm có thể là giới hạn contract, nhưng Mobile UI vẫn phải đáp ứng yêu cầu form xác nhận mật khẩu mới.

### BUG-FR03-04 - API đặt lại mật khẩu không kiểm tra độ mạnh mật khẩu mới

#### Thông tin lỗi

- Mã lỗi: BUG-FR03-04
- Tiêu đề lỗi: API đặt lại mật khẩu không kiểm tra độ mạnh mật khẩu mới
- Mô tả lỗi: `POST /api/reset-password` chấp nhận đổi mật khẩu sang giá trị rỗng hoặc mật khẩu yếu như ngắn hơn 8 ký tự, thiếu chữ hoa, chữ thường, chữ số hoặc ký tự đặc biệt.
- Mã chức năng: FR-03
- Chức năng: Đặt lại mật khẩu Mobile - API reset password
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend đã chạy; kiểm thử API bằng Postman-style trên `http://127.0.0.1:3000`, xác nhận bằng đăng nhập sau reset.
- Bằng chứng: `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-reset-password_domain_testing.md` - `EP-FR03-MOB-RESET-009`, `EP-FR03-MOB-RESET-010`, `EP-FR03-MOB-RESET-011`, `EP-FR03-MOB-RESET-012`, `EP-FR03-MOB-RESET-013`, `EP-FR03-MOB-RESET-014`, `BV-FR03-MOB-RESET-005`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Có tài khoản đã đăng ký, ví dụ `test@eshop.com`.
- Có OTP hợp lệ cho tài khoản này sau khi gọi `POST /api/forgot-password`.

#### Các bước tái hiện

1. Gọi `POST /api/forgot-password` với email đã đăng ký để lấy OTP.
2. Gọi `POST /api/reset-password` với OTP đúng và `newPassword=""`.
3. Thử lại với các mật khẩu yếu như `Aa1!aaa`, `newpass1!`, `NEWPASS1!`, `NewPass!!` hoặc `NewPass12`.
4. Sau mỗi lần reset trả thành công, gọi API đăng nhập bằng mật khẩu yếu vừa đặt.

#### Kết quả mong đợi

API reset password phải áp dụng cùng rule mật khẩu mạnh của FR-01: mật khẩu mới không được rỗng, tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ký tự đặc biệt hợp lệ. Các mật khẩu yếu phải bị từ chối và tài khoản không được đổi sang giá trị không hợp lệ.

#### Kết quả thực tế

API trả `200 OK` `{"message":"Password reset successfully"}` cho mật khẩu rỗng và nhiều mật khẩu yếu. Sau đó đăng nhập bằng các mật khẩu này vẫn trả `200 OK`, chứng minh mật khẩu tài khoản đã bị đổi sang giá trị không đạt rule.

#### Ghi chú

Mobile có regex chặn một số mật khẩu yếu trước khi gọi API, nhưng backend vẫn là lớp kiểm soát bắt buộc vì người dùng có thể gọi API trực tiếp bằng Postman hoặc công cụ HTTP khác.

### BUG-FR03-05 - Mobile không hiển thị OTP demo sau khi lấy OTP

#### Thông tin lỗi

- Mã lỗi: BUG-FR03-05
- Tiêu đề lỗi: Mobile không hiển thị OTP demo sau khi lấy OTP
- Mô tả lỗi: Sau khi gửi yêu cầu lấy OTP hợp lệ, Mobile chỉ hiển thị thông báo chung và không hiển thị OTP demo trực tiếp trên màn hình, khiến tester/người dùng không quan sát được mã OTP để tiếp tục Bước 2.
- Mã chức năng: FR-03
- Chức năng: Quên mật khẩu Mobile - Bước 1 lấy OTP
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-09
- Môi trường: Backend và Mobile App đã chạy; kiểm thử luồng `Quên mật khẩu` trên Mobile với email đã đăng ký.
- Bằng chứng: `../domain-testing/FR-03_reset-password-mobile/FR-03_mobile-forgot-password-request-otp_domain_testing.md` - `EP-FR03-MOB-FORGOT-005`, `BV-FR03-MOB-FORGOT-001`.

#### Điều kiện tiên quyết

- Backend đã được cài đặt và chạy thành công.
- Mobile App đã chạy và có thể gọi API backend.
- Có tài khoản đã đăng ký, ví dụ `test@eshop.com`.

#### Các bước tái hiện

1. Mở màn hình `Quên mật khẩu` trên Mobile.
2. Nhập email đã đăng ký, ví dụ `test@eshop.com`.
3. Bấm nút `Lấy mã OTP`.
4. Quan sát nội dung hiển thị trên màn hình Mobile sau khi yêu cầu thành công.

#### Kết quả mong đợi

Trong môi trường demo, Mobile phải hiển thị trực tiếp OTP trên màn hình sau khi gửi yêu cầu hợp lệ, để tester/người dùng có thể quan sát mã OTP và nhập ở Bước 2.

#### Kết quả thực tế

Mobile chỉ hiển thị thông báo chung `Nếu email tồn tại trong hệ thống...` sau khi lấy OTP, không hiển thị OTP demo trực tiếp trên màn hình. API response có `resetToken`, nhưng OTP không xuất hiện trên giao diện Mobile.

#### Ghi chú

Lỗi này khác với BUG-FR03-01: BUG-FR03-01 tập trung vào độ dài OTP 4 chữ số thay vì 6 chữ số, còn lỗi này tập trung vào việc giao diện Mobile không hiển thị OTP demo để người dùng/tester tiếp tục luồng đặt lại mật khẩu.
