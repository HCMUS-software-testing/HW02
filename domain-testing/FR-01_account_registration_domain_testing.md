# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` |
| SUT | EShop - customer web app, mobile app, và backend API |
| Giao diện/API tham chiếu | Màn hình Đăng ký tài khoản; endpoint `POST /api/register`; sau thành công chuyển tới trang Đăng nhập |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử Domain Testing gồm phân hoạch tương đương và phân tích giá trị biên cho luồng người dùng đăng ký tài khoản mới. Oracle chính là `eshop-sut/README.md` và yêu cầu bài tập `requirements/2026.HW02.Domain Testing_En.md`. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, bảo mật lưu mật khẩu, gửi email, phân quyền sau đăng ký, hoặc kiểm thử hiệu năng. |
| Giả định/ràng buộc thiếu | FR-01 không nêu độ dài tối đa cho `name`, `email`, `password`; không nêu regex email đầy đủ; không nêu thông báo lỗi chính xác; không nêu chính sách trim khoảng trắng; API specification chưa liệt kê `confirmPassword` dù README yêu cầu trường Xác nhận mật khẩu. Các điểm này cần người học rà soát khi thực thi. |
| Trạng thái thực thi | Chưa thực thi; artifact này là thiết kế test case dựa trên đặc tả. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký; bắt buộc theo FR-01. |
| Đầu vào | `email` | Email dùng để định danh tài khoản; bắt buộc, đúng định dạng `user@domain.com`, và duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; bắt buộc, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Xác nhận mật khẩu; bắt buộc theo FR-01 và phải khớp chính xác với `password`. |
| Đầu ra | Tạo tài khoản | User mới được tạo khi tất cả đầu vào hợp lệ. |
| Đầu ra | Phản hồi thành công API | API trả phản hồi thành công, ví dụ `{"message": "User registered successfully", "id": 1}` theo API specification. |
| Đầu ra | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả về lỗi phù hợp, và không tạo user mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` không được rỗng. |
| C2 | `name` | `name` không được chỉ gồm khoảng trắng sau khi xử lý như dữ liệu nhập của người dùng. |
| C3 | `email` | `email` không được rỗng. |
| C4 | `email` | `email` phải có local-part trước ký tự `@`. |
| C5 | `email` | `email` phải có đúng ký tự phân tách `@` giữa local-part và domain. |
| C6 | `email` | `email` phải có domain sau ký tự `@`. |
| C7 | `email` | Domain của `email` phải có phần tên miền và phần mở rộng theo dạng `domain.com`. |
| C8 | `email` | `email` phải là duy nhất trong hệ thống. |
| C9 | `password` | `password` không được rỗng. |
| C10 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C11 | `password` | `password` có ít nhất 1 chữ hoa. |
| C12 | `password` | `password` có ít nhất 1 chữ thường. |
| C13 | `password` | `password` có ít nhất 1 chữ số. |
| C14 | `password` | `password` có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C15 | `confirmPassword` | `confirmPassword` không được rỗng. |
| C16 | `confirmPassword` | `confirmPassword` phải khớp chính xác với `password`. |
| C17 | Tạo tài khoản | Chỉ tạo user mới khi toàn bộ đầu vào hợp lệ. |
| C18 | Phản hồi thành công API | Khi đăng ký hợp lệ qua API, phản hồi thành công phải cho biết đăng ký thành công và có định danh user mới. |
| C19 | Điều hướng sau đăng ký | Khi đăng ký hợp lệ qua giao diện, người dùng được chuyển tới trang Đăng nhập. |
| C20 | Phản hồi lỗi | Với bất kỳ điều kiện không hợp lệ nào, hệ thống phải trả/hiển thị lỗi phù hợp và không tạo user mới. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | `name` có giá trị không rỗng và không chỉ gồm khoảng trắng. | Có | `Nguyễn Văn An` | Chấp nhận `name`. |
| EC02 | `name` | `name` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi họ tên bắt buộc. |
| EC03 | `name` | `name` chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký; không tạo user mới. |
| EC04 | `email` | Email đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận `email`. |
| EC05 | `email` | `email` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi email bắt buộc. |
| EC06 | `email` | Email thiếu local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC07 | `email` | Email thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC08 | `email` | Email có nhiều hơn một ký tự `@`. | Không | `fr01@@example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC09 | `email` | Email thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC10 | `email` | Domain không có phần mở rộng theo dạng `domain.com`. | Không | `fr01@example` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC11 | `email` | Email đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký; không tạo user trùng email. |
| EC12 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa12345!` | Chấp nhận `password`. |
| EC13 | `password` | `password` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi mật khẩu bắt buộc. |
| EC14 | `password` | `password` ngắn hơn 8 ký tự. | Không | `Aa12!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EC15 | `password` | `password` thiếu chữ hoa. | Không | `aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC16 | `password` | `password` thiếu chữ thường. | Không | `AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC17 | `password` | `password` thiếu chữ số. | Không | `Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC18 | `password` | `password` thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC19 | `password` | `password` có ký tự đặc biệt ngoài tập yêu cầu nhưng không có ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa12345#` | Từ chối đăng ký theo tập ký tự đặc biệt đã nêu trong FR-01. |
| EC20 | `confirmPassword` | `confirmPassword` không rỗng và khớp chính xác `password`. | Có | `Aa12345!` | Chấp nhận xác nhận mật khẩu. |
| EC21 | `confirmPassword` | `confirmPassword` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc. |
| EC22 | `confirmPassword` | `confirmPassword` không khớp `password`. | Không | `Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp. |
| EC23 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.success@example.com`, `password=Aa12345!`, `confirmPassword=Aa12345!` | Tạo user mới. |
| EC24 | Tạo tài khoản | Có ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC25 | Phản hồi thành công API | Đăng ký hợp lệ qua `POST /api/register`. | Có | Body hợp lệ đầy đủ | API trả phản hồi thành công và có `id` user mới. |
| EC26 | Điều hướng sau đăng ký | Đăng ký hợp lệ qua giao diện. | Có | Dữ liệu hợp lệ đầy đủ | Người dùng được chuyển tới trang Đăng nhập. |
| EC27 | Phản hồi lỗi | Đăng ký thất bại do một điều kiện không hợp lệ. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp; người dùng không được đăng ký thành công. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.success@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC01, EC04, EC12, EC20, EC23, EC25, EC26 | Tạo user mới; API trả thành công; giao diện chuyển tới trang Đăng nhập. |
| EP-FR01-002 | Từ chối khi họ tên rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC02, EC24, EC27 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi họ tên chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC03, EC24, EC27 | Không tạo user; báo lỗi họ tên không hợp lệ. |
| EP-FR01-004 | Từ chối khi email rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC05, EC24, EC27 | Không tạo user; báo lỗi email bắt buộc. |
| EP-FR01-005 | Từ chối khi email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC06, EC24, EC27 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối khi email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC07, EC24, EC27 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối khi email có nhiều hơn một `@`. | `name=Nguyễn Văn An`; `email=fr01@@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC08, EC24, EC27 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối khi email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC09, EC24, EC27 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối khi domain email thiếu phần mở rộng. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC10, EC24, EC27 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-010 | Từ chối khi email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC11, EC24, EC27 | Không tạo user trùng email; báo lỗi email đã tồn tại hoặc lỗi tương đương. |
| EP-FR01-011 | Từ chối khi mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=`; `confirmPassword=Aa12345!` | EC13, EC24, EC27 | Không tạo user; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-012 | Từ chối khi mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa12!`; `confirmPassword=Aa12!` | EC14, EC24, EC27 | Không tạo user; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EP-FR01-013 | Từ chối khi mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | EC15, EC24, EC27 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối khi mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | EC16, EC24, EC27 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối khi mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | EC17, EC24, EC27 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối khi mật khẩu thiếu ký tự đặc biệt thuộc tập cho phép. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC18, EC24, EC27 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-017 | Từ chối khi mật khẩu chỉ có ký tự đặc biệt ngoài tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa12345#`; `confirmPassword=Aa12345#` | EC19, EC24, EC27 | Không tạo user; báo lỗi ký tự đặc biệt không hợp lệ hoặc mật khẩu yếu. |
| EP-FR01-018 | Từ chối khi xác nhận mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa12345!`; `confirmPassword=` | EC21, EC24, EC27 | Không tạo user; báo lỗi xác nhận mật khẩu bắt buộc. |
| EP-FR01-019 | Từ chối khi xác nhận mật khẩu không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | EC22, EC24, EC27 | Không tạo user; báo lỗi hai mật khẩu không khớp. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, giới hạn ở biên tối thiểu | FR-01 yêu cầu bắt buộc nên có biên rỗng/không rỗng; không có biên tối đa được đặc tả. |
| `email` | Độ dài chuỗi và mẫu định dạng | Có, giới hạn ở biên rỗng/không rỗng | Điều kiện bắt buộc có biên rỗng/không rỗng; cấu trúc email và tính duy nhất là miền rời rạc, phù hợp EP hơn BVA. |
| `password` | Độ dài chuỗi và số lượng nhóm ký tự bắt buộc | Có | FR-01 quy định rõ biên độ dài tối thiểu 8 ký tự và yêu cầu ít nhất 1 ký tự cho từng nhóm. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, giới hạn ở biên rỗng/không rỗng | Có biên rỗng/không rỗng; quan hệ khớp/không khớp là quan hệ rời rạc nên được bao phủ chính bằng EP. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Tạo/không tạo là trạng thái rời rạc, không phải miền có thứ tự. |
| Phản hồi thành công API | Trạng thái phản hồi | Không | Phản hồi thành công/thất bại là trạng thái rời rạc. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Tập lỗi theo điều kiện | Không | Các lỗi là tập trạng thái rời rạc, phù hợp EP. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng. | `length=0`, `length=1`; giá trị chỉ khoảng trắng được kiểm riêng vì có thể trông không rỗng nhưng không có nội dung hợp lệ. |
| `email` | Biên tối thiểu: không được rỗng. | `length=0`, email hợp lệ ngắn có đại diện `a@b.co`; các biến thể sai định dạng đã nằm trong EP. |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`, `length=8`, `length=9`. |
| `password` | Biên số lượng chữ hoa tối thiểu là 1. | 0 chữ hoa, 1 chữ hoa. |
| `password` | Biên số lượng chữ thường tối thiểu là 1. | 0 chữ thường, 1 chữ thường. |
| `password` | Biên số lượng chữ số tối thiểu là 1. | 0 chữ số, 1 chữ số. |
| `password` | Biên số lượng ký tự đặc biệt thuộc tập cho phép tối thiểu là 1. | 0 ký tự đặc biệt thuộc tập cho phép, 1 ký tự đặc biệt thuộc tập cho phép. |
| `confirmPassword` | Biên tối thiểu: không được rỗng. | `length=0`, `length=8` khi khớp mật khẩu hợp lệ tối thiểu. |
| `confirmPassword` | Biên quan hệ bằng nhau với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối. |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu hệ thống không có yêu cầu độ dài tối thiểu lớn hơn 1; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; không tạo user. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo user. |
| BV-FR01-005 | `email` | Không rỗng và hợp lệ ngắn | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-006 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự; không tạo user. |
| BV-FR01-007 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu vì đủ 8 ký tự và đủ nhóm ký tự; tạo user nếu email chưa tồn tại. |
| BV-FR01-008 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận mật khẩu; tạo user nếu email chưa tồn tại. |
| BV-FR01-009 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-010 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-011 | `password` | 0 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-012 | `password` | 1 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.onelower@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-013 | `password` | 0 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-014 | `password` | 1 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.onedigit@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-015 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-016 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu email chưa tồn tại. |
| BV-FR01-017 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa12345!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc; không tạo user. |
| BV-FR01-018 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận xác nhận mật khẩu; tạo user nếu các input khác hợp lệ. |
| BV-FR01-019 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |

## 5. Ghi chú rủi ro

- `eshop-sut/README.md` yêu cầu có trường **Xác nhận mật khẩu**, nhưng `eshop-sut/api_specification.md` mô tả `POST /api/register` chỉ nhận `name`, `email`, `password`; khi thực thi cần kiểm tra đây là thiếu trong API spec, thiếu trong UI/API, hay do confirm chỉ được xử lý phía client.
- FR-01 không nêu độ dài tối đa cho `name`, `email`, `password`, nên artifact không tạo BVA cho biên tối đa; người học có thể bổ sung sau khi có ràng buộc cụ thể từ tài liệu hoặc schema.
- FR-01 nêu email hợp lệ dạng `user@domain.com` nhưng không định nghĩa regex đầy đủ; các lớp email sai định dạng trong EP là đại diện cần thiết, không phải danh sách toàn bộ biến thể email sai.
- FR-01 không nêu rõ cách xử lý khoảng trắng đầu/cuối. Các ca `name=   ` và giá trị chỉ khoảng trắng nên được xác nhận khi chạy kiểm thử để phân biệt yêu cầu nghiệp vụ với hành vi triển khai.
- Các ca kiểm thử trong artifact này đang ở trạng thái thiết kế; khi thực thi cần bổ sung actual result, status, và evidence path theo yêu cầu báo cáo của bài tập.
