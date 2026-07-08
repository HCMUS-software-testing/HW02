# Báo cáo lỗi

## Tóm tắt

| Mã lỗi | Tiêu đề lỗi | Mô tả lỗi | Mã chức năng | Độ nghiêm trọng | Ngày ghi nhận | Trạng thái |
| ------ | ----------- | --------- | ------------ | ---------------- | ------------- | ---------- |
| BUG-001 | Biểu mẫu đăng ký không có trường xác nhận mật khẩu | Biểu mẫu đăng ký tài khoản trên frontend-web không hiển thị trường xác nhận mật khẩu, nên người dùng không thể nhập lại mật khẩu để kiểm tra lỗi gõ sai trước khi tạo tài khoản. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-002 | Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt | Quy tắc kiểm tra mật khẩu dùng Regex yêu cầu có khoảng trắng `\s` nhưng lại không cho phép ký tự đặc biệt như `!`, khiến mật khẩu đúng yêu cầu đặc tả bị từ chối và mật khẩu có khoảng trắng được chấp nhận. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-003 | API backend đăng ký không kiểm tra điều kiện dữ liệu nhập | Điểm cuối đăng ký cho phép gọi trực tiếp bằng Postman và tạo tài khoản dù dữ liệu không thỏa điều kiện kiểm tra như email sai định dạng, mật khẩu yếu hoặc thiếu trường bắt buộc. | FR-01 | Cao | 2026-07-08 | Đang mở |
| BUG-004 | Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký | Biểu mẫu đăng ký chấp nhận trường họ tên chỉ gồm khoảng trắng, nên tài khoản có tên không hợp lệ vẫn có thể được gửi đăng ký. | FR-01 | Trung bình | 2026-07-08 | Đang mở |
| BUG-005 | Biểu mẫu đăng ký cho phép email sai định dạng | Biểu mẫu đăng ký trên frontend-web vẫn cho tạo tài khoản với các email sai định dạng như thiếu local-part, thiếu ký tự `@`, có nhiều hơn một `@`, thiếu domain hoặc thiếu phần mở rộng domain. | FR-01 | Cao | 2026-07-08 | Đang mở |
| BUG-006 | Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại | Chức năng đăng ký không chặn email đã tồn tại trong hệ thống, nên người dùng có thể tạo tài khoản trùng email qua giao diện web và API. | FR-01 | Cao | 2026-07-08 | Đang mở |

## Chi tiết lỗi

### BUG-001 - Biểu mẫu đăng ký không có trường xác nhận mật khẩu

- Mã lỗi: BUG-001
- Tiêu đề lỗi: Biểu mẫu đăng ký không có trường xác nhận mật khẩu
- Mô tả lỗi: Biểu mẫu đăng ký tài khoản trên frontend-web không hiển thị trường xác nhận mật khẩu, nên người dùng không thể nhập lại mật khẩu để kiểm tra lỗi gõ sai trước khi tạo tài khoản.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Vấn đề GitHub: Chưa có
- Bằng chứng: Chưa có

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

### BUG-002 - Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt

- Mã lỗi: BUG-002
- Tiêu đề lỗi: Regex kiểm tra mật khẩu mạnh yêu cầu khoảng trắng và không cho phép ký tự đặc biệt
- Mô tả lỗi: Quy tắc kiểm tra mật khẩu dùng Regex yêu cầu có khoảng trắng `\s` nhưng lại không cho phép ký tự đặc biệt như `!`, khiến mật khẩu đúng yêu cầu đặc tả bị từ chối và mật khẩu có khoảng trắng được chấp nhận.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; kiểm tra quy tắc kiểm tra mật khẩu mạnh trên biểu mẫu đăng ký.
- Vấn đề GitHub: Chưa có
- Bằng chứng: Chưa có

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

### BUG-003 - API backend đăng ký không kiểm tra điều kiện dữ liệu nhập

- Mã lỗi: BUG-003
- Tiêu đề lỗi: API backend đăng ký không kiểm tra điều kiện dữ liệu nhập
- Mô tả lỗi: Điểm cuối đăng ký cho phép gọi trực tiếp bằng Postman và tạo tài khoản dù dữ liệu không thỏa điều kiện kiểm tra như email sai định dạng, mật khẩu yếu hoặc thiếu trường bắt buộc.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend đã được cài đặt/chạy; kiểm thử API đăng ký trực tiếp bằng Postman.
- Vấn đề GitHub: Chưa có
- Bằng chứng: `artifacts/test-results/fr01_api_domain_test_results.md`

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

### BUG-004 - Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký

- Mã lỗi: BUG-004
- Tiêu đề lỗi: Tên người dùng chỉ gồm khoảng trắng vẫn vượt qua biểu mẫu đăng ký
- Mô tả lỗi: Biểu mẫu đăng ký chấp nhận trường họ tên chỉ gồm khoảng trắng, nên tài khoản có tên không hợp lệ vẫn có thể được gửi đăng ký.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Trung bình
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Vấn đề GitHub: Chưa có
- Bằng chứng: Chưa có

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

### BUG-005 - Biểu mẫu đăng ký cho phép email sai định dạng

- Mã lỗi: BUG-005
- Tiêu đề lỗi: Biểu mẫu đăng ký cho phép email sai định dạng
- Mô tả lỗi: Biểu mẫu đăng ký trên frontend-web vẫn cho tạo tài khoản với các email sai định dạng như thiếu local-part, thiếu ký tự `@`, có nhiều hơn một `@`, thiếu domain hoặc thiếu phần mở rộng domain.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; truy cập biểu mẫu đăng ký trên ứng dụng web khách hàng.
- Vấn đề GitHub: Chưa có
- Bằng chứng: `domain-testing/FR-01_account_registration_domain_testing.md` - các testcase `EP-FR01-006` đến `EP-FR01-010`.

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

Lỗi này khác với BUG-003 ở phạm vi giao diện: người dùng thao tác trực tiếp trên frontend-web vẫn có thể gửi và tạo tài khoản với email không hợp lệ, không chỉ khi gọi API trực tiếp bằng Postman.

### BUG-006 - Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại

- Mã lỗi: BUG-006
- Tiêu đề lỗi: Hệ thống cho phép đăng ký tài khoản bằng email đã tồn tại
- Mô tả lỗi: Chức năng đăng ký không chặn email đã tồn tại trong hệ thống, nên người dùng có thể tạo tài khoản trùng email qua giao diện web và API.
- Mã chức năng: FR-01
- Chức năng: Đăng ký tài khoản
- Độ nghiêm trọng: Cao
- Ngày ghi nhận: 2026-07-08
- Trạng thái: Đang mở
- Môi trường: Backend và frontend-web đã được cài đặt/chạy; kiểm thử đăng ký với email đã tồn tại trong hệ thống.
- Vấn đề GitHub: Chưa có
- Bằng chứng: `domain-testing/FR-01_account_registration_domain_testing.md` - testcase `EP-FR01-011`.

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
