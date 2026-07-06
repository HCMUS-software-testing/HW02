# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` |
| SUT | EShop - customer web app, mobile app, và backend API |
| Giao diện/API tham chiếu | Màn hình `Register` của customer web app/mobile app; endpoint `POST /api/register` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử domain testing và boundary value analysis cho luồng đăng ký tài khoản người dùng mới. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, gửi email, bảo mật lưu mật khẩu, hoặc phân quyền sau đăng ký. |
| Giả định/ràng buộc thiếu | Requirement FR-01 không quy định độ dài tối đa cho họ tên/email/mật khẩu, không quy định chuẩn regex email đầy đủ, không nêu thông điệp lỗi cụ thể, và không mô tả xử lý khoảng trắng. Các giá trị tối đa trong BVA được đánh dấu là giả định cần rà soát. |
| Trạng thái thực thi | Chưa thực thi; artifact này là thiết kế kiểm thử dựa trên requirement và đặc tả quan sát được. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký; bắt buộc theo FR-01. |
| Đầu vào | `email` | Email dùng làm định danh đăng nhập; bắt buộc, đúng định dạng `user@domain.com`, và duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; bắt buộc, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Trường xác nhận mật khẩu; bắt buộc theo FR-01 và phải khớp `password`. |
| Đầu ra | Tạo tài khoản | Bản ghi user mới được tạo khi toàn bộ dữ liệu hợp lệ. |
| Đầu ra | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả về lỗi phù hợp, và không tạo user mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | Bắt buộc có giá trị không rỗng sau khi người dùng nhập. |
| C2 | `name` | Họ tên nên chấp nhận chữ cái tiếng Việt, khoảng trắng giữa các phần tên, và không chỉ gồm khoảng trắng. |
| C3 | `email` | Bắt buộc có giá trị không rỗng. |
| C4 | `email` | Phải có định dạng email hợp lệ dạng `user@domain.com`. |
| C5 | `email` | Phải là duy nhất trong hệ thống. |
| C6 | `password` | Bắt buộc có giá trị không rỗng. |
| C7 | `password` | Độ dài tối thiểu là 8 ký tự. |
| C8 | `password` | Có ít nhất 1 chữ hoa. |
| C9 | `password` | Có ít nhất 1 chữ thường. |
| C10 | `password` | Có ít nhất 1 chữ số. |
| C11 | `password` | Có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C12 | `confirmPassword` | Bắt buộc có giá trị không rỗng. |
| C13 | `confirmPassword` | Phải khớp chính xác với `password`. |
| C14 | Tạo tài khoản | Chỉ tạo user mới khi tất cả đầu vào hợp lệ. |
| C15 | Điều hướng sau đăng ký | Đăng ký thành công chuyển người dùng tới trang Đăng nhập. |
| C16 | Phản hồi lỗi | Với bất kỳ điều kiện không hợp lệ nào, hệ thống trả/hiển thị lỗi phù hợp và không tạo user. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | Họ tên không rỗng, có chữ cái hợp lệ. | Có | `Nguyễn Văn An` | Chấp nhận giá trị họ tên. |
| EC02 | `name` | Họ tên rỗng. | Không | `` | Từ chối đăng ký và báo lỗi họ tên bắt buộc. |
| EC03 | `name` | Họ tên chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký và không tạo user. |
| EC04 | `email` | Email đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận email. |
| EC05 | `email` | Email rỗng. | Không | `` | Từ chối đăng ký và báo lỗi email bắt buộc. |
| EC06 | `email` | Thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC07 | `email` | Thiếu phần local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC08 | `email` | Thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC09 | `email` | Domain không có dấu chấm. | Không | `fr01@example` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC10 | `email` | Email đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký và không tạo user trùng email. |
| EC11 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa123456!` | Chấp nhận mật khẩu. |
| EC12 | `password` | Mật khẩu rỗng. | Không | `` | Từ chối đăng ký và báo lỗi mật khẩu bắt buộc. |
| EC13 | `password` | Mật khẩu ngắn hơn 8 ký tự. | Không | `Aa12!` | Từ chối đăng ký và báo lỗi độ dài tối thiểu. |
| EC14 | `password` | Thiếu chữ hoa. | Không | `aa123456!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC15 | `password` | Thiếu chữ thường. | Không | `AA123456!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC16 | `password` | Thiếu chữ số. | Không | `Aaaaaaaa!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC17 | `password` | Thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `Aa123456` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC18 | `password` | Có ký tự đặc biệt ngoài tập yêu cầu, không có ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa123456#` | Từ chối đăng ký theo tập ký tự đặc biệt đã nêu trong FR-01. |
| EC19 | `confirmPassword` | Xác nhận mật khẩu khớp với mật khẩu. | Có | `Aa123456!` | Chấp nhận xác nhận mật khẩu. |
| EC20 | `confirmPassword` | Xác nhận mật khẩu rỗng. | Không | `` | Từ chối đăng ký và báo lỗi xác nhận mật khẩu bắt buộc. |
| EC21 | `confirmPassword` | Xác nhận mật khẩu không khớp. | Không | `Aa123456?` | Từ chối đăng ký và báo lỗi hai mật khẩu không khớp. |
| EC22 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa123456!`, `confirmPassword=Aa123456!` | Tạo user mới với role mặc định `user`. |
| EC23 | Tạo tài khoản | Ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC24 | Điều hướng sau đăng ký | Đăng ký thành công. | Có | Dữ liệu hợp lệ đầy đủ | Chuyển người dùng tới trang Đăng nhập. |
| EC25 | Phản hồi lỗi | Đăng ký thất bại vì dữ liệu không hợp lệ. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp và giữ người dùng ở màn hình đăng ký. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC01, EC04, EC11, EC19, EC22, EC24 | Tạo user mới, role mặc định `user`, và chuyển tới trang Đăng nhập. |
| EP-FR01-002 | Từ chối khi họ tên rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC02, EC23, EC25 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi họ tên chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC03, EC23, EC25 | Không tạo user; báo lỗi họ tên không hợp lệ. |
| EP-FR01-004 | Từ chối khi email rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC05, EC23, EC25 | Không tạo user; báo lỗi email bắt buộc. |
| EP-FR01-005 | Từ chối email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC06, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC07, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC08, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối email có domain thiếu dấu chấm. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC09, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC10, EC23, EC25 | Không tạo user trùng email; báo lỗi email đã tồn tại. |
| EP-FR01-010 | Từ chối mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=`; `confirmPassword=` | EC12, EC23, EC25 | Không tạo user; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-011 | Từ chối mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa12!`; `confirmPassword=Aa12!` | EC13, EC23, EC25 | Không tạo user; báo lỗi độ dài tối thiểu. |
| EP-FR01-012 | Từ chối mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa123456!`; `confirmPassword=aa123456!` | EC14, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-013 | Từ chối mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA123456!`; `confirmPassword=AA123456!` | EC15, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaaa!`; `confirmPassword=Aaaaaaaa!` | EC16, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối mật khẩu thiếu ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC17, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối mật khẩu chỉ có ký tự đặc biệt ngoài tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa123456#`; `confirmPassword=Aa123456#` | EC18, EC23, EC25 | Không tạo user; báo lỗi ký tự đặc biệt không hợp lệ hoặc mật khẩu yếu. |
| EP-FR01-017 | Từ chối khi xác nhận mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa123456!`; `confirmPassword=` | EC20, EC23, EC25 | Không tạo user; báo lỗi xác nhận mật khẩu bắt buộc. |
| EP-FR01-018 | Từ chối khi xác nhận mật khẩu không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456?` | EC21, EC23, EC25 | Không tạo user; báo lỗi hai mật khẩu không khớp. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, có giới hạn | Requirement chỉ nêu bắt buộc, không nêu độ dài tối đa; có thể kiểm thử biên rỗng/không rỗng và đánh dấu max là giả định nếu cần. |
| `email` | Độ dài chuỗi và cấu trúc chuỗi | Có, có giới hạn | Email có cấu trúc định dạng và trạng thái duy nhất; BVA áp dụng cho rỗng/không rỗng và các điểm sát cấu trúc tối thiểu. |
| `password` | Độ dài chuỗi | Có | Requirement quy định rõ biên tối thiểu 8 ký tự. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, có giới hạn | Có biên rỗng/không rỗng; phần khớp/không khớp là quan hệ tương đương hơn là miền số liên tục. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Kết quả tạo/không tạo là trạng thái rời rạc, phù hợp EP hơn BVA. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Kết quả chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Trạng thái lỗi | Không | Các lỗi là tập trạng thái rời rạc theo từng điều kiện vi phạm. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng sau khi nhập. | `length=0`, `length=1`, giá trị chỉ khoảng trắng |
| `email` | Biên tối thiểu: không được rỗng và phải đạt cấu trúc email tối thiểu có local-part, `@`, domain, dấu chấm, và TLD. | `length=0`, email tối thiểu hợp lệ giả định `a@b.co`, thiếu từng thành phần cấu trúc |
| `email` | Biên trạng thái duy nhất: email chưa tồn tại so với đã tồn tại. | `fr01.unique@example.com`, `test@eshop.com` |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`, `length=8`, `length=9` |
| `password` | Biên thành phần bắt buộc: số lượng tối thiểu mỗi nhóm ký tự là 1. | 0/1 chữ hoa, 0/1 chữ thường, 0/1 chữ số, 0/1 ký tự đặc biệt thuộc tập cho phép |
| `confirmPassword` | Biên tối thiểu: không được rỗng. | `length=0`, `length=8` khi khớp password |
| `confirmPassword` | Biên quan hệ bằng nhau: khớp tuyệt đối với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu hệ thống không có yêu cầu độ dài tối thiểu lớn hơn 1; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; không tạo user. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo user. |
| BV-FR01-005 | `email` | Cấu trúc tối thiểu hợp lệ | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-006 | `email` | Thiếu local-part sát biên | `name=Nguyễn Văn An`; `email=@b.co`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-007 | `email` | Thiếu TLD sau dấu chấm | `name=Nguyễn Văn An`; `email=a@b.`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-008 | `email` | Email chưa tồn tại | `name=Nguyễn Văn An`; `email=fr01.bv.unique@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu toàn bộ input hợp lệ; tạo user mới. |
| BV-FR01-009 | `email` | Email đã tồn tại | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; không tạo user trùng email. |
| BV-FR01-010 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| BV-FR01-011 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự bắt buộc đều có; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-012 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-013 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-014 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-015 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-016 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-017 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa123456!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc; không tạo user. |
| BV-FR01-018 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận xác nhận mật khẩu; tạo user nếu các input khác hợp lệ. |
| BV-FR01-019 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |

## 5. Ghi chú rủi ro

- Requirement chính trong `requirements/2026.HW02.Domain Testing_En.md` chỉ liệt kê `FR-01: Account registration`; chi tiết nghiệp vụ được đối chiếu thêm từ `eshop-sut/README.md` và `eshop-sut/api_specification.md`.
- `eshop-sut/README.md` yêu cầu trường **Xác nhận mật khẩu**, nhưng `POST /api/register` trong `eshop-sut/api_specification.md` chỉ mô tả `name`, `email`, `password`. Cần kiểm tra UI/API khi thực thi để xác nhận đây là thiếu sót triển khai hay thiếu sót tài liệu.
- Customer web form hiện quan sát được dùng input email kiểu `text`; nếu requirement yêu cầu validate email chặt ở UI thì cần kiểm thử cả UI và API trực tiếp.
- Backend hiện quan sát được có thể phụ thuộc ràng buộc database cho email duy nhất; cần xác nhận schema thực tế vì nếu không có `UNIQUE`, ca email trùng có nguy cơ tạo tài khoản trùng.
- Requirement chưa nêu độ dài tối đa cho `name`, `email`, `password`, cũng chưa nêu chính sách trim khoảng trắng, nên các biên tối đa và xử lý whitespace cần người học bổ sung sau khi rà soát.
