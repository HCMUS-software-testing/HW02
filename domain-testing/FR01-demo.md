# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop - HW02 Domain Testing |
| Feature | FR-01: Đăng ký tài khoản (Account registration) |
| SUT | EShop `frontend-web` và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool A; `eshop-sut/README.md` mục FR-01, FR-21, FR-22; `eshop-sut/api_specification.md` mục 1.1 Đăng ký tài khoản |
| Giao diện/API tham chiếu | Màn hình Đăng ký tài khoản trên Frontend Web; `POST /api/register` với body JSON `name`, `email`, `password` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho dữ liệu đăng ký tài khoản mới: Họ Tên, Email, Mật khẩu, Xác nhận mật khẩu, kết quả thành công/lỗi quan sát được trên Web và API |
| Ngoài phạm vi | Đăng nhập sau đăng ký, gửi email xác thực, phân quyền sau đăng ký, bảo mật lưu mật khẩu, kiểm thử database nội bộ, kiểm thử mã nguồn implementation |
| Giả định/ràng buộc thiếu | Requirement yêu cầu trường `confirmPassword` trên giao diện nhưng API contract `POST /api/register` không có trường này; vì vậy các ca lệch xác nhận mật khẩu chỉ kiểm trực tiếp qua Web, còn API được ghi nhận là khoảng trống hợp đồng. Tài liệu không đặc tả mã lỗi/body khi đăng ký thất bại; kỳ vọng tối thiểu là hệ thống từ chối đăng ký, không trả phản hồi thành công và không tạo tài khoản. Email hợp lệ mới dùng biến `U = fr01_<timestamp>@domain.com`. Email đã tồn tại dùng tài khoản mặc định `test@eshop.com` từ README. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Web/API |

## 2. Phân hoạch tương đương

### 2.1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ Tên người dùng; là trường bắt buộc theo FR-01 và nhãn bắt buộc phải có `*` theo FR-22 |
| Đầu vào | `email` | Email đăng ký; bắt buộc, đúng định dạng `user@domain.com`, duy nhất trong hệ thống, Web dùng `type="email"` theo FR-22 |
| Đầu vào | `password` | Mật khẩu; bắt buộc, dùng `type="password"`, tối thiểu 8 ký tự và có đủ chữ hoa, chữ thường, chữ số, ký tự đặc biệt trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&` |
| Đầu vào | `confirmPassword` | Xác nhận mật khẩu trên Web; bắt buộc và phải khớp với `password` |
| Đầu ra | Kết quả Web thành công | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập |
| Đầu ra | Kết quả API thành công | `POST /api/register` trả `200 OK` với body dạng `{"message": "User registered successfully", "id": <id>}` |
| Đầu ra | Kết quả lỗi | Hệ thống từ chối đăng ký, hiển thị/thông báo lỗi phù hợp, không tạo tài khoản mới |

### 2.2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` phải được cung cấp. |
| C2 | `name` | `name` không được rỗng. |
| C3 | `email` | `email` phải được cung cấp. |
| C4 | `email` | `email` không được rỗng. |
| C5 | `email` | `email` phải đúng định dạng `user@domain.com`. |
| C6 | `email` | `email` phải là duy nhất trong hệ thống. |
| C7 | `email` | Trường email trên Web phải dùng `type="email"`. |
| C8 | `password` | `password` phải được cung cấp. |
| C9 | `password` | `password` không được rỗng. |
| C10 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C11 | `password` | `password` có ít nhất 1 chữ hoa. |
| C12 | `password` | `password` có ít nhất 1 chữ thường. |
| C13 | `password` | `password` có ít nhất 1 chữ số. |
| C14 | `password` | `password` có ít nhất 1 ký tự đặc biệt trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C15 | `password` | Trường mật khẩu trên Web phải dùng `type="password"`. |
| C16 | `confirmPassword` | `confirmPassword` phải được cung cấp trên Web. |
| C17 | `confirmPassword` | `confirmPassword` không được rỗng trên Web. |
| C18 | `confirmPassword` | `confirmPassword` phải khớp chính xác với `password`. |
| C19 | Kết quả Web thành công | Sau đăng ký thành công, Web chuyển người dùng tới trang Đăng nhập. |
| C20 | Kết quả API thành công | API thành công trả `200 OK` và body có `message = "User registered successfully"` cùng `id`. |
| C21 | Kết quả lỗi | Với dữ liệu không hợp lệ, hệ thống từ chối đăng ký và không tạo tài khoản mới. |

### 2.3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | `name` được cung cấp và không rỗng | Có | `Nguyen Van A` | Trường `name` hợp lệ |
| EC02 | `name` | Thiếu trường `name` | Không | Không gửi `name` | Từ chối đăng ký |
| EC03 | `name` | `name` rỗng | Không | `""` | Từ chối đăng ký |
| EC04 | `email` | `email` được cung cấp, không rỗng, đúng định dạng và chưa tồn tại | Có | `U = fr01_<timestamp>@domain.com` | Trường `email` hợp lệ |
| EC05 | `email` | Thiếu trường `email` | Không | Không gửi `email` | Từ chối đăng ký |
| EC06 | `email` | `email` rỗng | Không | `""` | Từ chối đăng ký |
| EC07 | `email` | `email` sai định dạng | Không | `fr01_invalid_email` | Từ chối đăng ký |
| EC08 | `email` | `email` đã tồn tại trong hệ thống | Không | `test@eshop.com` | Từ chối đăng ký vì email không duy nhất |
| EC09 | Web email field | Trường email dùng `type="email"` | Có | HTML input type là `email` | Trình duyệt/Web hỗ trợ validate định dạng email |
| EC10 | Web email field | Trường email không dùng `type="email"` | Không | HTML input type khác `email` | Không đạt yêu cầu giao diện FR-22 |
| EC11 | `password` | `password` được cung cấp, không rỗng, dài >= 8 và đủ chữ hoa, chữ thường, chữ số, ký tự đặc biệt hợp lệ | Có | `Password123!` | Trường `password` hợp lệ |
| EC12 | `password` | Thiếu trường `password` | Không | Không gửi `password` | Từ chối đăng ký |
| EC13 | `password` | `password` rỗng | Không | `""` | Từ chối đăng ký |
| EC14 | `password` | `password` ngắn hơn 8 ký tự | Không | `Pass1!a` (7 ký tự) | Từ chối đăng ký |
| EC15 | `password` | `password` thiếu chữ hoa | Không | `password123!` | Từ chối đăng ký |
| EC16 | `password` | `password` thiếu chữ thường | Không | `PASSWORD123!` | Từ chối đăng ký |
| EC17 | `password` | `password` thiếu chữ số | Không | `Password!` | Từ chối đăng ký |
| EC18 | `password` | `password` thiếu ký tự đặc biệt trong tập được nêu | Không | `Password123` | Từ chối đăng ký |
| EC19 | Web password field | Trường mật khẩu dùng `type="password"` | Có | HTML input type là `password` | Mật khẩu không hiển thị rõ |
| EC20 | Web password field | Trường mật khẩu không dùng `type="password"` | Không | HTML input type khác `password` | Không đạt yêu cầu giao diện FR-22 |
| EC21 | `confirmPassword` | `confirmPassword` được cung cấp, không rỗng và khớp với `password` | Có | `Password123!` | Xác nhận mật khẩu hợp lệ |
| EC22 | `confirmPassword` | Thiếu trường `confirmPassword` trên Web | Không | Không nhập/gửi `confirmPassword` | Web từ chối đăng ký |
| EC23 | `confirmPassword` | `confirmPassword` rỗng trên Web | Không | `""` | Web từ chối đăng ký |
| EC24 | `confirmPassword` | `confirmPassword` khác `password` | Không | `Password123?` khi `password = Password123!` | Web từ chối đăng ký vì hai mật khẩu không khớp |
| EC25 | Kết quả Web thành công | Đăng ký với toàn bộ dữ liệu hợp lệ | Có | `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123!` | Web chuyển tới trang Đăng nhập |
| EC26 | Kết quả API thành công | `POST /api/register` với body hợp lệ theo API | Có | `{"name":"Nguyen Van A","email":U,"password":"Password123!"}` | API trả `200 OK`, `message = "User registered successfully"`, có `id` |
| EC27 | Kết quả lỗi | Bất kỳ điều kiện bắt buộc/format/uniqueness/password/confirm nào không thỏa | Không | Một trường không hợp lệ, các trường khác hợp lệ | Không tạo tài khoản và có phản hồi lỗi quan sát được |

### 2.4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| TC01 | Đăng ký thành công với dữ liệu hợp lệ | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123!`. API: `{"name":"Nguyen Van A","email":U,"password":"Password123!"}` | EC01, EC04, EC09, EC11, EC19, EC21, EC25, EC26 | Web: đăng ký thành công và chuyển tới trang Đăng nhập. API: trả `200 OK`, body có `message = "User registered successfully"` và `id`. |  |  |
| TC02 | Từ chối khi thiếu `name` | Web/API giữ các trường khác hợp lệ, bỏ trống hoặc không gửi `name`; `email=U`, `password=Password123!`, `confirmPassword=Password123!` | EC02, EC27 | Web: hiển thị lỗi trường Họ Tên bắt buộc, không chuyển trang. API: tài liệu không đặc tả mã lỗi/body; kỳ vọng tối thiểu là không trả success `200 OK` với `User registered successfully` và không tạo tài khoản. |  |  |
| TC03 | Từ chối khi `name` rỗng | `name=""`, `email=U`, `password=Password123!`, `confirmPassword=Password123!` | EC03, EC27 | Web: hiển thị lỗi Họ Tên không được rỗng. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC04 | Từ chối khi thiếu `email` | `name=Nguyen Van A`, bỏ trống hoặc không gửi `email`, `password=Password123!`, `confirmPassword=Password123!` | EC05, EC27 | Web: hiển thị lỗi Email bắt buộc. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC05 | Từ chối khi `email` rỗng | `name=Nguyen Van A`, `email=""`, `password=Password123!`, `confirmPassword=Password123!` | EC06, EC27 | Web: hiển thị lỗi Email không được rỗng. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC06 | Từ chối email sai định dạng | `name=Nguyen Van A`, `email=fr01_invalid_email`, `password=Password123!`, `confirmPassword=Password123!` | EC07, EC27 | Web: trường `type="email"` hoặc validation form chặn/hiển thị lỗi định dạng email. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC07 | Từ chối email đã tồn tại | `name=Nguyen Van A`, `email=test@eshop.com`, `password=Password123!`, `confirmPassword=Password123!` | EC08, EC27 | Web: hiển thị lỗi email đã tồn tại hoặc lỗi phù hợp về uniqueness. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản trùng email. |  |  |
| TC08 | Kiểm tra thuộc tính input email trên Web | Mở màn hình Đăng ký và kiểm tra trường Email | EC09, EC10 | Web: trường Email phải là `type="email"`; nếu không phải `email` thì không đạt FR-22. API: không áp dụng vì đây là yêu cầu UI-only. |  |  |
| TC09 | Từ chối khi thiếu `password` | `name=Nguyen Van A`, `email=U`, bỏ trống hoặc không gửi `password`, `confirmPassword=Password123!` | EC12, EC27 | Web: hiển thị lỗi Mật khẩu bắt buộc. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC10 | Từ chối khi `password` rỗng | `name=Nguyen Van A`, `email=U`, `password=""`, `confirmPassword=""` | EC13, EC23, EC27 | Web: hiển thị lỗi mật khẩu không được rỗng; trường xác nhận cũng không hợp lệ nếu để rỗng. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC11 | Từ chối password ngắn hơn 8 ký tự | `name=Nguyen Van A`, `email=U`, `password=Pass1!a`, `confirmPassword=Pass1!a` | EC14, EC27 | Web: hiển thị lỗi mật khẩu tối thiểu 8 ký tự. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC12 | Từ chối password thiếu chữ hoa | `name=Nguyen Van A`, `email=U`, `password=password123!`, `confirmPassword=password123!` | EC15, EC27 | Web: hiển thị lỗi mật khẩu phải có ít nhất 1 chữ hoa. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC13 | Từ chối password thiếu chữ thường | `name=Nguyen Van A`, `email=U`, `password=PASSWORD123!`, `confirmPassword=PASSWORD123!` | EC16, EC27 | Web: hiển thị lỗi mật khẩu phải có ít nhất 1 chữ thường. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC14 | Từ chối password thiếu chữ số | `name=Nguyen Van A`, `email=U`, `password=Password!`, `confirmPassword=Password!` | EC17, EC27 | Web: hiển thị lỗi mật khẩu phải có ít nhất 1 chữ số. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC15 | Từ chối password thiếu ký tự đặc biệt | `name=Nguyen Van A`, `email=U`, `password=Password123`, `confirmPassword=Password123` | EC18, EC27 | Web: hiển thị lỗi mật khẩu phải có ít nhất 1 ký tự đặc biệt thuộc tập được nêu. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| TC16 | Kiểm tra thuộc tính input password trên Web | Mở màn hình Đăng ký và kiểm tra trường Mật khẩu | EC19, EC20 | Web: trường Mật khẩu phải là `type="password"`; nếu không phải `password` thì không đạt FR-22. API: không áp dụng vì đây là yêu cầu UI-only. |  |  |
| TC17 | Từ chối khi thiếu `confirmPassword` trên Web | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, không nhập/gửi `confirmPassword` | EC22, EC27 | Web: hiển thị lỗi Xác nhận mật khẩu bắt buộc, không gửi đăng ký thành công. API: `POST /api/register` không có `confirmPassword` trong contract nên không kiểm trực tiếp được điều kiện này qua API. |  |  |
| TC18 | Từ chối khi `confirmPassword` rỗng trên Web | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=""` | EC23, EC27 | Web: hiển thị lỗi Xác nhận mật khẩu không được rỗng. API: contract không có `confirmPassword`, đây là khoảng trống hợp đồng API so với FR-01. |  |  |
| TC19 | Từ chối khi `confirmPassword` không khớp | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123?` | EC24, EC27 | Web: hiển thị lỗi hai trường mật khẩu không khớp và không chuyển tới trang Đăng nhập. API: contract không có `confirmPassword`, đây là khoảng trống hợp đồng API so với FR-01. |  |  |

## 3. Phân tích giá trị biên

### 3.1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi bắt buộc/non-empty | Có | Requirement yêu cầu cung cấp Họ Tên; có biên rỗng/không rỗng, nhưng không có min length cụ thể ngoài non-empty và không có max length. |
| `email` | Định dạng chuỗi và uniqueness | Có một phần | Có biên rỗng/không rỗng cho trường bắt buộc; định dạng email và uniqueness là miền phân loại nên chủ yếu kiểm bằng EP. |
| `password` | Độ dài chuỗi và thành phần ký tự | Có | Requirement có biên rõ ràng: tối thiểu 8 ký tự. Thành phần chữ hoa/thường/số/ký tự đặc biệt là điều kiện phân loại, không phải miền liên tục. |
| `confirmPassword` | Độ dài chuỗi bắt buộc và quan hệ bằng nhau với `password` | Có | Có biên rỗng/không rỗng cho trường bắt buộc và biên quan hệ `khớp`, `khác 1 ký tự`, `thiếu 1 ký tự`, `dư 1 ký tự` so với `password`. |
| Kết quả Web thành công | Trạng thái/điều hướng | Không | Kết quả chuyển trang là trạng thái rời rạc, không có miền liên tục. |
| Kết quả API thành công | Status/body | Không | API success contract là trạng thái rời rạc `200 OK` và JSON body, không có biên số/độ dài được đặc tả. |

### 3.2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `name` | Bắt buộc, không rỗng | `length = 0` với `""`; `length = 1` với `"A"` |
| `email` | Bắt buộc, không rỗng | `length = 0` với `""`; `length > 0` và đúng định dạng với `a@b.com` |
| `password` | Độ dài tối thiểu 8 ký tự | `length = 7` với `Pass1!a`; `length = 8` với `Pass1!ab`; `length = 9` với `Pass1!abc` |
| `confirmPassword` | Bắt buộc, không rỗng | `length = 0` với `""`; `length = 1` với `"P"` |
| `confirmPassword` | Quan hệ bằng nhau với `password = Password123!` | `khớp toàn bộ` với `Password123!`; `khác 1 ký tự` với `Password123?`; `thiếu 1 ký tự` với `Password123`; `dư 1 ký tự so với password` với `Password123!!` |

### 3.3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV01 | `name` | `length = 0` | `name=""`, `email=U`, `password=Password123!`, `confirmPassword=Password123!` | Web: hiển thị lỗi Họ Tên không được rỗng. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| BV02 | `name` | `length = 1` | `name=A`, `email=U`, `password=Password123!`, `confirmPassword=Password123!` | Web: vì tài liệu không quy định độ dài tối thiểu lớn hơn 1, dữ liệu được chấp nhận và chuyển tới trang Đăng nhập. API: trả `200 OK`, body có `message = "User registered successfully"` và `id`. |  |  |
| BV03 | `email` | `length = 0` | `name=Nguyen Van A`, `email=""`, `password=Password123!`, `confirmPassword=Password123!` | Web: hiển thị lỗi Email không được rỗng. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| BV04 | `email` | Không rỗng và đúng định dạng ngắn | `name=Nguyen Van A`, `email=a@b.com`, `password=Password123!`, `confirmPassword=Password123!` | Web: nếu email chưa tồn tại, đăng ký thành công và chuyển tới trang Đăng nhập. API: trả `200 OK`, body có `message = "User registered successfully"` và `id`. |  |  |
| BV05 | `password` | `length = 7` (min - 1) | `name=Nguyen Van A`, `email=U`, `password=Pass1!a`, `confirmPassword=Pass1!a` | Web: hiển thị lỗi mật khẩu tối thiểu 8 ký tự. API: contract không đặc tả lỗi; kỳ vọng tối thiểu là từ chối đăng ký và không tạo tài khoản. |  |  |
| BV06 | `password` | `length = 8` (min) | `name=Nguyen Van A`, `email=U`, `password=Pass1!ab`, `confirmPassword=Pass1!ab` | Web: mật khẩu đạt biên tối thiểu và các thành phần bắt buộc, đăng ký thành công, chuyển tới trang Đăng nhập. API: trả `200 OK`, body có `message = "User registered successfully"` và `id`. |  |  |
| BV07 | `password` | `length = 9` (min + 1) | `name=Nguyen Van A`, `email=U`, `password=Pass1!abc`, `confirmPassword=Pass1!abc` | Web: đăng ký thành công và chuyển tới trang Đăng nhập. API: trả `200 OK`, body có `message = "User registered successfully"` và `id`. |  |  |
| BV08 | `confirmPassword` | `length = 0` | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=""` | Web: hiển thị lỗi Xác nhận mật khẩu không được rỗng. API: không kiểm trực tiếp được vì contract `POST /api/register` không có `confirmPassword`. |  |  |
| BV09 | `confirmPassword` | `length = 1`, không khớp password | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=P` | Web: hiển thị lỗi hai trường mật khẩu không khớp. API: không kiểm trực tiếp được vì contract `POST /api/register` không có `confirmPassword`. |  |  |
| BV10 | `confirmPassword` | Khớp toàn bộ với `password` | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123!` | Web: xác nhận mật khẩu hợp lệ; nếu các trường khác hợp lệ và email chưa tồn tại, chuyển tới trang Đăng nhập. API: không kiểm trực tiếp `confirmPassword`; kiểm API thành công bằng body hợp lệ không có `confirmPassword` theo contract. |  |  |
| BV11 | `confirmPassword` | Khác 1 ký tự so với `password` | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123?` | Web: hiển thị lỗi hai trường mật khẩu không khớp. API: không kiểm trực tiếp được vì contract `POST /api/register` không có `confirmPassword`. |  |  |
| BV12 | `confirmPassword` | Thiếu 1 ký tự so với `password` | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123` | Web: hiển thị lỗi hai trường mật khẩu không khớp. API: không kiểm trực tiếp được vì contract `POST /api/register` không có `confirmPassword`. |  |  |
| BV13 | `confirmPassword` | Dư 1 ký tự so với `password` | Web: `name=Nguyen Van A`, `email=U`, `password=Password123!`, `confirmPassword=Password123!!` | Web: hiển thị lỗi hai trường mật khẩu không khớp. API: không kiểm trực tiếp được vì contract `POST /api/register` không có `confirmPassword`. |  |  |

## 4. Ghi chú rủi ro

- API specification chỉ mô tả phản hồi thành công của `POST /api/register`, không mô tả mã lỗi/body cho các trường hợp invalid. Khi thực thi, cần ghi nhận status/body thực tế và đối chiếu với yêu cầu nghiệp vụ "từ chối đăng ký".
- FR-01 yêu cầu `confirmPassword`, nhưng API contract không có trường này. Đây là rủi ro lệch hợp đồng giữa UI requirement và API contract; kiểm thử API độc lập không xác minh được điều kiện hai mật khẩu khớp.
- Requirement liệt kê tập ký tự đặc biệt `@`, `$`, `!`, `%`, `*`, `?`, `&` nhưng không nói rõ đây là tập duy nhất được chấp nhận hay chỉ là ví dụ. Các ca trong artifact xem tập này là tập được yêu cầu; người học cần rà soát thủ công khi viết bug report.
- Tài liệu không quy định độ dài tối đa cho `name`, `email`, `password`; không áp dụng BVA cho max length nếu không có đặc tả bổ sung.
- Các email dùng `U = fr01_<timestamp>@domain.com` phải khác nhau giữa các ca thành công để tránh thất bại do uniqueness từ lần chạy trước.
