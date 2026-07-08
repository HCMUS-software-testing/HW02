# FR-03: Đặt lại mật khẩu Mobile - Bước 2 Reset Password - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-03: Forgot password and password reset (two steps)` / `FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)` - Mobile Bước 2 đặt lại mật khẩu |
| SUT | EShop - Mobile App React Native/Expo và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool D Mobile App và yêu cầu Domain Testing/BVA; `eshop-sut/README.md` mục `FR-01: Đăng ký tài khoản`, `FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`, `FR-20: Tính năng Mobile`, `FR-21: Tiêu chuẩn Giao diện Chung`, `FR-22: Form Requirements`, `SEC-07`; `eshop-sut/api_specification.md` mục `1.4 Đặt lại mật khẩu` |
| Giao diện/API tham chiếu | Mobile App màn hình `Đặt lại mật khẩu` Bước 2; endpoint `POST /api/reset-password`; body JSON `{"email":"test@domain.com","resetToken":"123456","newPassword":"NewPassword123!"}` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho OTP, email gắn với OTP, mật khẩu mới mạnh, xác nhận mật khẩu mới trên Mobile, Step Indicator Bước 2, reset thành công và khả năng đăng nhập bằng mật khẩu mới. |
| Ngoài phạm vi | Không kiểm thử cơ chế hash mật khẩu, database, mã nguồn triển khai, gửi email thật, chính sách khóa tài khoản khi đăng nhập sai, hoặc kiểm thử UI nâng cao ngoài yêu cầu form/mobile đã nêu. |
| Giả định/ràng buộc thiếu | `E_registered` là email đã đăng ký đã yêu cầu OTP ở Bước 1. `OTP_E` là OTP 6 chữ số quan sát được từ Mobile/API sau `POST /api/forgot-password` cho `E_registered`. `E_other_registered` là email đã đăng ký khác dùng để kiểm tra OTP không dùng được cho email khác. API specification không nêu status code/body thành công hoặc lỗi cho `POST /api/reset-password` và không có trường `confirmPassword`; vì vậy kiểm tra xác nhận mật khẩu là oracle của Mobile UI, còn API trực tiếp không thể kiểm trường này nếu contract không thay đổi. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Mobile/API/Postman. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `email` | Email gắn với OTP đã yêu cầu ở Bước 1; API `POST /api/reset-password` yêu cầu trường này. |
| Đầu vào | `resetToken`/OTP | OTP 6 chữ số người dùng nhập ở Bước 2; phải khớp OTP đã sinh cho đúng email. |
| Đầu vào | `newPassword` | Mật khẩu mới; phải tuân thủ rule mật khẩu mạnh của FR-01. |
| Đầu vào | `confirmNewPassword` | Xác nhận mật khẩu mới trên Mobile; phải khớp `newPassword`. |
| Đầu vào | Thao tác gửi reset | Người dùng bấm nút đặt lại mật khẩu trên Mobile; API tương ứng là `POST /api/reset-password`. |
| Đầu ra | Reset thành công | Mật khẩu tài khoản được đổi; người dùng có thể đăng nhập bằng mật khẩu mới. |
| Đầu ra | Phản hồi lỗi | Với OTP/email/password/confirm không hợp lệ, hệ thống từ chối reset và không đổi mật khẩu. |
| Đầu ra | Step Indicator | Mobile hiển thị rõ đang ở Bước 2 của luồng 2 bước. |
| Đầu ra | Hiệu lực OTP sau sử dụng | Theo SEC-07, OTP phải vô hiệu hóa sau khi dùng. |
| Đầu ra | Hiển thị form an toàn | Các trường bắt buộc có ký hiệu `*`; trường mật khẩu mới và xác nhận mật khẩu mới không hiển thị rõ. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `email` | `email` phải được cung cấp cho API reset hoặc được Mobile giữ từ Bước 1. |
| C2 | `email` | `email` phải đúng định dạng email. |
| C3 | `email` | `email` phải là email đã đăng ký. |
| C4 | `resetToken`/OTP | OTP phải được cung cấp, không được rỗng. |
| C5 | `resetToken`/OTP | OTP phải gồm đúng 6 chữ số. |
| C6 | `resetToken`/OTP | OTP phải khớp OTP đã sinh ở Bước 1. |
| C7 | `resetToken`/OTP và `email` | OTP chỉ hợp lệ cho email đã yêu cầu, không dùng được cho email khác. |
| C8 | `newPassword` | `newPassword` phải được cung cấp, không được rỗng. |
| C9 | `newPassword` | `newPassword` có độ dài tối thiểu 8 ký tự. |
| C10 | `newPassword` | `newPassword` có ít nhất 1 chữ hoa. |
| C11 | `newPassword` | `newPassword` có ít nhất 1 chữ thường. |
| C12 | `newPassword` | `newPassword` có ít nhất 1 chữ số. |
| C13 | `newPassword` | `newPassword` có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C14 | `confirmNewPassword` | `confirmNewPassword` phải được cung cấp trên Mobile. |
| C15 | `confirmNewPassword` | `confirmNewPassword` phải khớp toàn bộ với `newPassword`. |
| C16 | Step Indicator | Mobile phải hiển thị Step Indicator rõ ràng cho Bước 2 của luồng 2 bước. |
| C17 | Reset thành công | Sau reset hợp lệ, đăng nhập bằng `newPassword` phải thành công. |
| C18 | Phản hồi lỗi | Nếu bất kỳ dữ liệu reset nào không hợp lệ, mật khẩu cũ không được bị thay đổi sang giá trị không hợp lệ. |
| C19 | Hiệu lực OTP sau sử dụng | OTP đã dùng thành công phải bị vô hiệu hóa, không dùng lại được. |
| C20 | Giao diện form | Các trường bắt buộc ở Bước 2 gồm OTP, mật khẩu mới và xác nhận mật khẩu mới phải có ký hiệu `*` bên cạnh nhãn. |
| C21 | Giao diện form | Trường mật khẩu mới và xác nhận mật khẩu mới phải là trường mật khẩu, không hiển thị rõ nội dung nhập. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `email` | Email hợp lệ, đã đăng ký và đã yêu cầu OTP ở Bước 1. | Có | `E_registered = test@eshop.com` | Được xét reset với OTP đúng và mật khẩu mới hợp lệ. |
| EC02 | `email` | Thiếu email hoặc email rỗng trong API reset. | Không | Body thiếu `email` hoặc `email=""` | Từ chối reset; mật khẩu không đổi. |
| EC03 | `email` | Email sai định dạng. | Không | `email="plain-text-email"` | Từ chối reset. |
| EC04 | `email` | Email đúng định dạng nhưng chưa đăng ký. | Không | `E_unregistered = notfound-fr03@example.com` | Từ chối reset. |
| EC05 | `resetToken`/OTP | OTP đúng, 6 chữ số, được sinh cho `E_registered`. | Có | `OTP_E` quan sát từ Bước 1 | Cho phép reset nếu mật khẩu và confirm hợp lệ. |
| EC06 | `resetToken`/OTP | Thiếu OTP hoặc OTP rỗng. | Không | `resetToken=""` | Từ chối reset; không đổi mật khẩu. |
| EC07 | `resetToken`/OTP | OTP không gồm đúng 6 chữ số. | Không | `12345`, `1234567`, `12A456` | Từ chối reset. |
| EC08 | `resetToken`/OTP | OTP 6 chữ số nhưng không khớp OTP đã sinh. | Không | `000000` khi `OTP_E` khác `000000` | Từ chối reset. |
| EC09 | `resetToken`/OTP và `email` | OTP đúng nhưng dùng với email khác email đã yêu cầu. | Không | `email=E_other_registered`, `resetToken=OTP_E` | Từ chối reset vì OTP chỉ hợp lệ cho email đã yêu cầu. |
| EC10 | `newPassword` | Mật khẩu mới mạnh, thỏa tất cả rule FR-01. | Có | `NewPass1!` | Có thể đặt làm mật khẩu mới. |
| EC11 | `newPassword` | Mật khẩu mới rỗng hoặc thiếu trường. | Không | `newPassword=""` | Từ chối reset. |
| EC12 | `newPassword` | Mật khẩu mới ngắn hơn 8 ký tự. | Không | `Aa1!aaa` (7 ký tự) | Từ chối reset. |
| EC13 | `newPassword` | Mật khẩu mới thiếu chữ hoa. | Không | `newpass1!` | Từ chối reset. |
| EC14 | `newPassword` | Mật khẩu mới thiếu chữ thường. | Không | `NEWPASS1!` | Từ chối reset. |
| EC15 | `newPassword` | Mật khẩu mới thiếu chữ số. | Không | `NewPass!!` | Từ chối reset. |
| EC16 | `newPassword` | Mật khẩu mới thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `NewPass12` | Từ chối reset. |
| EC17 | `newPassword` | Mật khẩu có ký tự đặc biệt ngoài tập cho phép nhưng không có ký tự nào trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `NewPass1#` | Từ chối nếu đặc tả được hiểu là chỉ chấp nhận tập ký tự đặc biệt đã liệt kê. |
| EC18 | `confirmNewPassword` | Confirm được cung cấp và khớp toàn bộ với `newPassword`. | Có | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass1!"` | Mobile cho phép gửi reset. |
| EC19 | `confirmNewPassword` | Confirm rỗng hoặc thiếu. | Không | `confirmNewPassword=""` | Mobile từ chối trước khi gọi API; API contract không kiểm trường này vì không nhận confirm. |
| EC20 | `confirmNewPassword` | Confirm khác `newPassword`. | Không | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass2!"` | Mobile từ chối; không được reset mật khẩu. |
| EC21 | Step Indicator | Step Indicator Bước 2 hiển thị rõ ràng. | Có | `Bước 2 / 2` hoặc nội dung tương đương | Người dùng nhận biết đang ở bước đặt lại mật khẩu. |
| EC22 | Step Indicator | Step Indicator thiếu hoặc hiển thị sai bước. | Không | Không có chỉ báo, hoặc hiển thị `Bước 1 / 2` khi đang nhập OTP/password | Không đạt FR-03/FR-22 cho form nhiều bước. |
| EC23 | Reset thành công | Reset hợp lệ đổi mật khẩu và đăng nhập bằng mật khẩu mới được. | Có | Reset `E_registered` với `OTP_E` và `NewPass1!` | Sau reset, đăng nhập bằng `NewPass1!` thành công. |
| EC24 | Phản hồi lỗi | Input không hợp lệ không làm thay đổi mật khẩu. | Có | OTP sai hoặc password yếu | Không đăng nhập được bằng password yếu/sai đã bị từ chối; tài khoản không bị đổi sang giá trị không hợp lệ. |
| EC25 | Hiệu lực OTP sau sử dụng | OTP đã dùng thành công không dùng lại được. | Có | Dùng lại `OTP_E` sau lần reset thành công | Request reset lần hai với cùng OTP bị từ chối. |
| EC26 | Hiệu lực OTP sau sử dụng | OTP đã dùng vẫn reset được lần nữa. | Không | Dùng lại `OTP_E` thành công | Không đạt SEC-07 vì OTP phải vô hiệu hóa sau khi dùng. |
| EC27 | Giao diện form | Các trường bắt buộc ở Bước 2 có ký hiệu `*`. | Có | Nhãn `OTP *`, `Mật khẩu mới *`, `Xác nhận mật khẩu mới *` hoặc tương đương | Đạt FR-22 cho trường bắt buộc. |
| EC28 | Giao diện form | Một hoặc nhiều trường bắt buộc ở Bước 2 thiếu ký hiệu `*`. | Không | Nhãn `OTP`, `Mật khẩu mới`, `Xác nhận mật khẩu mới` không có `*` | Không đạt FR-22. |
| EC29 | Giao diện form | Trường mật khẩu mới và xác nhận mật khẩu mới che nội dung nhập. | Có | Nội dung nhập hiển thị dạng ký tự che hoặc không hiển thị rõ | Đạt FR-22 cho trường mật khẩu. |
| EC30 | Giao diện form | Trường mật khẩu mới hoặc xác nhận mật khẩu mới hiển thị rõ nội dung nhập. | Không | Nhập `NewPass1!` và thấy rõ chuỗi này trên màn hình | Không đạt FR-22. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR03-MOB-RESET-001 | Reset mật khẩu thành công với OTP và mật khẩu mới hợp lệ. | Tiền điều kiện: đã lấy `OTP_E` cho `E_registered = test@eshop.com`. Mobile: nhập `OTP_E`, `newPassword="NewPass1!"`, `confirmNewPassword="NewPass1!"`, bấm đặt lại. API: `POST /api/reset-password` body `{"email":"test@eshop.com","resetToken":"OTP_E","newPassword":"NewPass1!"}`. | EC01, EC05, EC10, EC18, EC21, EC23 | Mobile: hiển thị Step Indicator Bước 2, reset thành công và điều hướng/thông báo phù hợp; đăng nhập lại bằng `NewPass1!` thành công. API: contract chưa nêu status/body thành công; request được xem là đạt khi phản hồi thành công theo SUT và đăng nhập bằng `NewPass1!` thành công. |  |  |
| EP-FR03-MOB-RESET-002 | Từ chối khi thiếu email trong API reset. | API: body `{"resetToken":"OTP_E","newPassword":"NewPass1!"}`. Mobile: nếu email được giữ từ Bước 1 thì không có đường nhập thiếu email; ghi `N/A` cho Mobile nếu không thao tác được. | EC02, EC05, EC10, EC18, EC24 | Mobile: không áp dụng nếu UI không cho mất email từ luồng Bước 1. API: contract chưa nêu status/body lỗi; kỳ vọng trả lỗi và không đổi mật khẩu. |  |  |
| EP-FR03-MOB-RESET-003 | Từ chối email sai định dạng. | API dùng `email="plain-text-email"`, `resetToken=OTP_E`, `newPassword="NewPass1!"`. | EC03, EC05, EC10, EC24 | Mobile: nếu UI không cho sửa email ở Bước 2 thì không áp dụng. API: từ chối reset; mật khẩu của `E_registered` không đổi bởi request sai email. |  |  |
| EP-FR03-MOB-RESET-004 | Từ chối email chưa đăng ký. | API dùng `email=E_unregistered`, `resetToken=OTP_E`, `newPassword="NewPass1!"`. | EC04, EC05, EC10, EC24 | Mobile/API: không reset tài khoản không tồn tại; không có đăng nhập mới nào được tạo từ request này. |  |  |
| EP-FR03-MOB-RESET-005 | Từ chối khi OTP rỗng. | Mobile/API: `resetToken=""`, password và confirm hợp lệ. | EC01, EC06, EC10, EC18, EC24 | Mobile: hiển thị lỗi trên nút submit hoặc vùng form, không gọi API thành công và không đổi mật khẩu. API: trả lỗi theo contract thực tế; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-006 | Từ chối OTP sai độ dài hoặc không phải số. | Mobile/API: thử `resetToken="12345"` hoặc `resetToken="12A456"` với password hợp lệ. | EC01, EC07, EC10, EC18, EC24 | Mobile: từ chối OTP không đúng 6 chữ số. API: contract chưa nêu status/body lỗi; kỳ vọng không reset mật khẩu. |  |  |
| EP-FR03-MOB-RESET-007 | Từ chối OTP 6 chữ số nhưng không khớp. | Mobile/API: `resetToken="000000"` khi `OTP_E` khác `000000`, password hợp lệ. | EC01, EC08, EC10, EC18, EC24 | Mobile/API: báo lỗi OTP không hợp lệ hoặc reset thất bại; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-008 | Từ chối OTP của email khác. | Tiền điều kiện: `OTP_E` được sinh cho `E_registered`; dùng `email=E_other_registered` với `resetToken=OTP_E`, password hợp lệ. | EC05, EC09, EC10, EC18, EC24 | Mobile: nếu UI giữ email từ Bước 1 thì cần tạo luồng test bằng API hoặc đổi tài khoản qua Bước 1 khác. API: từ chối reset vì OTP không thuộc email này; mật khẩu của `E_other_registered` không đổi. |  |  |
| EP-FR03-MOB-RESET-009 | Từ chối khi mật khẩu mới rỗng. | Mobile/API: `newPassword=""`, OTP đúng; Mobile confirm rỗng hoặc giữ confirm hợp lệ nếu có thể. | EC01, EC05, EC11, EC24 | Mobile: báo lỗi mật khẩu bắt buộc, không reset. API: contract chưa nêu lỗi; kỳ vọng không đổi mật khẩu. |  |  |
| EP-FR03-MOB-RESET-010 | Từ chối mật khẩu mới ngắn hơn 8 ký tự. | `newPassword="Aa1!aaa"` (7 ký tự), confirm khớp, OTP đúng. | EC01, EC05, EC12, EC18, EC24 | Mobile/API: từ chối vì mật khẩu dưới 8 ký tự; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-011 | Từ chối mật khẩu thiếu chữ hoa. | `newPassword="newpass1!"`, confirm khớp, OTP đúng. | EC01, EC05, EC13, EC18, EC24 | Mobile/API: từ chối vì thiếu chữ hoa; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-012 | Từ chối mật khẩu thiếu chữ thường. | `newPassword="NEWPASS1!"`, confirm khớp, OTP đúng. | EC01, EC05, EC14, EC18, EC24 | Mobile/API: từ chối vì thiếu chữ thường; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-013 | Từ chối mật khẩu thiếu chữ số. | `newPassword="NewPass!!"`, confirm khớp, OTP đúng. | EC01, EC05, EC15, EC18, EC24 | Mobile/API: từ chối vì thiếu chữ số; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-014 | Từ chối mật khẩu thiếu ký tự đặc biệt trong tập cho phép. | `newPassword="NewPass12"`, confirm khớp, OTP đúng. | EC01, EC05, EC16, EC18, EC24 | Mobile/API: từ chối vì thiếu ký tự đặc biệt `@`, `$`, `!`, `%`, `*`, `?`, `&`; mật khẩu không đổi. |  |  |
| EP-FR03-MOB-RESET-015 | Rà soát mật khẩu có ký tự đặc biệt ngoài tập liệt kê. | `newPassword="NewPass1#"`, confirm khớp, OTP đúng. | EC01, EC05, EC17, EC18, EC24 | Mobile/API: theo cách hiểu chặt của README, từ chối vì `#` không thuộc tập ký tự đặc biệt đã liệt kê; nếu SUT chấp nhận, cần người học review oracle với giảng viên/tài liệu. |  |  |
| EP-FR03-MOB-RESET-016 | Từ chối khi confirm rỗng trên Mobile. | Mobile: OTP đúng, `newPassword="NewPass1!"`, `confirmNewPassword=""`. API: không có trường confirm trong contract. | EC01, EC05, EC10, EC19, EC24 | Mobile: từ chối trước khi reset, hiển thị lỗi xác nhận mật khẩu bắt buộc, không đổi mật khẩu. API: không kiểm chứng được `confirmNewPassword` vì contract `POST /api/reset-password` không nhận trường này; đây là gap giữa UI rule và API contract. |  |  |
| EP-FR03-MOB-RESET-017 | Từ chối khi confirm không khớp mật khẩu mới. | Mobile: OTP đúng, `newPassword="NewPass1!"`, `confirmNewPassword="NewPass2!"`. | EC01, EC05, EC10, EC20, EC24 | Mobile: từ chối, hiển thị lỗi hai trường mật khẩu không khớp và không gọi API reset thành công. API: không kiểm chứng được confirm qua contract hiện tại. |  |  |
| EP-FR03-MOB-RESET-018 | Kiểm tra Step Indicator Bước 2. | Sau khi lấy OTP hợp lệ, chuyển sang màn hình nhập OTP/password. | EC21, EC22 | Mobile: chỉ báo bước hiển thị rõ đang ở Bước 2 của 2. API: không áp dụng kiểm chứng UI. |  |  |
| EP-FR03-MOB-RESET-019 | OTP đã dùng không được dùng lại. | Tiền điều kiện: reset thành công một lần bằng `OTP_E`; sau đó gọi reset lần nữa với cùng `OTP_E` và một password hợp lệ khác `Another1!`. | EC01, EC05, EC10, EC18, EC25, EC26 | Mobile/API: lần dùng lại OTP phải bị từ chối; tài khoản không được đổi sang `Another1!`. Nếu dùng lại OTP vẫn thành công thì không đạt SEC-07. |  |  |
| EP-FR03-MOB-RESET-020 | Kiểm tra dấu bắt buộc và che nội dung mật khẩu ở Bước 2. | Mở màn hình Bước 2; quan sát nhãn OTP, mật khẩu mới, xác nhận mật khẩu mới; nhập thử `NewPass1!` vào hai trường mật khẩu. | EC27, EC28, EC29, EC30 | Mobile: cả ba trường bắt buộc có ký hiệu `*`; nội dung nhập ở hai trường mật khẩu không hiển thị rõ. API: không áp dụng vì đây là yêu cầu hiển thị form. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `resetToken`/OTP | Độ dài chuỗi số | Có | FR-03 yêu cầu OTP 6 chữ số; đây là biên độ dài rõ ràng. |
| `newPassword` | Độ dài chuỗi | Có | FR-01 áp dụng cho mật khẩu mới: tối thiểu 8 ký tự. |
| `confirmNewPassword` so với `newPassword` | Quan hệ bằng nhau giữa hai chuỗi | Có | Có quan hệ cross-field phải khớp; dùng các giá trị khớp, khác 1 ký tự, thiếu 1 ký tự, dư 1 ký tự so với password. |
| `email` | Chuỗi định dạng/membership | Không | Tài liệu yêu cầu đúng định dạng và đã đăng ký, nhưng không nêu độ dài min/max; phù hợp EP hơn BVA. |
| Thành phần chữ hoa/chữ thường/chữ số/ký tự đặc biệt | Điều kiện có/không có | Không | Đây là must-be/membership condition, không phải miền có thứ tự. |
| Thời hạn OTP | Thời gian | Không | SEC-07 yêu cầu OTP có thời hạn nhưng tài liệu không nêu TTL cụ thể; không thể xác định biên ngày/giây. |
| Dấu `*` và che nội dung mật khẩu | Trạng thái UI | Không | Đây là điều kiện có/không theo FR-22, không có biên liên tục. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `resetToken`/OTP | Đúng 6 chữ số | `length=5`, `length=6`, `length=7`; thêm kiểm tra ký tự không phải số |
| `newPassword` | Tối thiểu 8 ký tự | `length=7`: `Aa1!aaa`; `length=8`: `Aa1!aaaa`; `length=9`: `Aa1!aaaaa` |
| `confirmNewPassword` | Phải khớp toàn bộ `newPassword` | `khớp toàn bộ`: `NewPass1!`; `khác 1 ký tự`: `NewPass2!`; `thiếu 1 ký tự`: `NewPass1`; `dư 1 ký tự`: `NewPass1!!` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR03-MOB-RESET-001 | `resetToken`/OTP | `length=5` | `resetToken="12345"`, `newPassword="NewPass1!"`, confirm khớp, email hợp lệ. | Mobile: từ chối OTP không đủ 6 chữ số, không reset. API: contract chưa nêu status/body lỗi; kỳ vọng không đổi mật khẩu. |  |  |
| BV-FR03-MOB-RESET-002 | `resetToken`/OTP | `length=6` | `resetToken=OTP_E` gồm 6 chữ số sinh cho `E_registered`, `newPassword="NewPass1!"`, confirm khớp. | Mobile: reset thành công nếu OTP khớp và password hợp lệ. API: phản hồi thành công theo SUT; đăng nhập bằng `NewPass1!` thành công. |  |  |
| BV-FR03-MOB-RESET-003 | `resetToken`/OTP | `length=7` | `resetToken="1234567"`, `newPassword="NewPass1!"`, confirm khớp, email hợp lệ. | Mobile/API: từ chối OTP dài hơn 6 chữ số; mật khẩu không đổi. |  |  |
| BV-FR03-MOB-RESET-004 | `resetToken`/OTP | Ký tự không phải số | `resetToken="12A456"`, `newPassword="NewPass1!"`, confirm khớp. | Mobile/API: từ chối OTP không phải 6 chữ số; mật khẩu không đổi. |  |  |
| BV-FR03-MOB-RESET-005 | `newPassword` | `min-1`, length `7` | `newPassword="Aa1!aaa"`, `confirmNewPassword="Aa1!aaa"`, OTP đúng. | Mobile/API: từ chối vì mật khẩu dưới 8 ký tự; không đổi mật khẩu. |  |  |
| BV-FR03-MOB-RESET-006 | `newPassword` | `min`, length `8` | `newPassword="Aa1!aaaa"`, `confirmNewPassword="Aa1!aaaa"`, OTP đúng. | Mobile/API: chấp nhận độ dài tối thiểu nếu các rule chữ hoa, chữ thường, chữ số, ký tự đặc biệt đều đạt; đăng nhập bằng mật khẩu mới thành công. |  |  |
| BV-FR03-MOB-RESET-007 | `newPassword` | `min+1`, length `9` | `newPassword="Aa1!aaaaa"`, `confirmNewPassword="Aa1!aaaaa"`, OTP đúng. | Mobile/API: chấp nhận mật khẩu dài hơn min và đủ rule; đăng nhập bằng mật khẩu mới thành công. |  |  |
| BV-FR03-MOB-RESET-008 | `confirmNewPassword` | Khớp toàn bộ | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass1!"`, OTP đúng. | Mobile: cho phép gửi reset. API: không nhận confirm; reset thành công phụ thuộc `email`, `resetToken`, `newPassword`. |  |  |
| BV-FR03-MOB-RESET-009 | `confirmNewPassword` | Khác 1 ký tự | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass2!"`, OTP đúng. | Mobile: từ chối vì hai mật khẩu không khớp; không gọi API reset thành công. API: không kiểm chứng được confirm qua contract hiện tại. |  |  |
| BV-FR03-MOB-RESET-010 | `confirmNewPassword` | Thiếu 1 ký tự | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass1"`, OTP đúng. | Mobile: từ chối vì confirm thiếu 1 ký tự so với password; không reset. API: không kiểm chứng được confirm qua contract hiện tại. |  |  |
| BV-FR03-MOB-RESET-011 | `confirmNewPassword` | Dư 1 ký tự | `newPassword="NewPass1!"`, `confirmNewPassword="NewPass1!!"`, OTP đúng. | Mobile: từ chối vì confirm dư 1 ký tự so với password; không reset. API: không kiểm chứng được confirm qua contract hiện tại. |  |  |

## 5. Ghi chú rủi ro

- API specification của `POST /api/reset-password` không mô tả status code/body cho cả thành công lẫn thất bại; khi thực thi cần ghi response thực tế và xác nhận bằng đăng nhập sau reset.
- API contract không có `confirmPassword`, trong khi README yêu cầu người dùng nhập `Xác nhận mật khẩu mới`. Vì vậy mismatch confirm là testcase Mobile UI; API trực tiếp không thể kiểm trường này nếu không có contract bổ sung.
- SEC-07 yêu cầu OTP có thời hạn, nhưng không nêu thời lượng cụ thể; artifact không tạo BVA thời gian hết hạn, chỉ thêm testcase OTP không được dùng lại sau khi reset thành công.
- Tập ký tự đặc biệt của mật khẩu được README liệt kê là `@`, `$`, `!`, `%`, `*`, `?`, `&`; testcase `NewPass1#` cần người học review thủ công nếu giảng viên hiểu danh sách này là ví dụ thay vì tập cho phép đóng.
- Sau testcase reset thành công, mật khẩu của tài khoản test có thể thay đổi; cần chuẩn bị tài khoản riêng hoặc reset lại trạng thái dữ liệu trước khi chạy các testcase khác.
