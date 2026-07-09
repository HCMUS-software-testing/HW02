# FR-03: Quên mật khẩu Mobile - Bước 1 Lấy OTP - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-03: Forgot password and password reset (two steps)` / `FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)` - Mobile Bước 1 lấy OTP |
| SUT | EShop - Mobile App React Native/Expo và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool D Mobile App và yêu cầu Domain Testing/BVA; `eshop-sut/README.md` mục `FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`, `FR-20: Tính năng Mobile`, `FR-21: Tiêu chuẩn Giao diện Chung`, `FR-22: Form Requirements`, `SEC-07`; `eshop-sut/api_specification.md` mục `1.3 Quên mật khẩu (Lấy OTP)` |
| Giao diện/API tham chiếu | Mobile App màn hình `Quên mật khẩu` Bước 1; endpoint `POST /api/forgot-password`; body JSON `{"email": "test@domain.com"}`; phản hồi thành công `200 OK` với `{"message": "Mã đặt lại mật khẩu đã được tạo", "resetToken": "123456"}` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho việc nhập email đã đăng ký, lấy OTP 6 chữ số, hiển thị OTP trong môi trường demo, hiển thị Step Indicator của luồng 2 bước và nút quay lại đăng nhập trên Mobile. |
| Ngoài phạm vi | Không kiểm thử gửi email thật, bảo mật lưu trữ OTP trong database, mã nguồn backend/mobile, đăng nhập sau reset, rule mật khẩu ở Bước 2, accessibility chuyên sâu ngoài các yêu cầu UI đã nêu. |
| Giả định/ràng buộc thiếu | `E_registered` là email đã đăng ký quan sát/chuẩn bị từ black-box, có thể dùng tài khoản mặc định `test@eshop.com`. `E_unregistered` là email đúng định dạng nhưng chưa có tài khoản trong hệ thống. API specification chỉ nêu response thành công cho email hợp lệ, chưa nêu status/body cho email trống, sai định dạng hoặc chưa đăng ký. Mobile dùng cùng backend API qua IP LAN của máy chủ. |
| Trạng thái thực thi | Đã thực thi qua API/Postman-style trên `http://127.0.0.1:3000` ngày 2026-07-09; phần UI Mobile được ghi nhận theo quan sát màn hình/luồng Mobile, API không kiểm chứng được các yêu cầu thuần giao diện. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `email` | Địa chỉ email người dùng nhập ở Bước 1; theo FR-03 phải là email đã đăng ký. |
| Đầu vào | Thao tác gửi yêu cầu OTP | Người dùng bấm nút gửi/lấy OTP trên Mobile; API tương ứng là `POST /api/forgot-password`. |
| Đầu vào | Thao tác quay lại đăng nhập | Người dùng bấm nút `Quay lại đăng nhập` trên Mobile. |
| Đầu ra | OTP/reset token | Mã OTP 6 chữ số ngẫu nhiên được tạo cho email đã đăng ký; demo hiển thị trực tiếp trên màn hình/API trả `resetToken`. |
| Đầu ra | Step Indicator | Giao diện hiển thị chỉ báo bước của luồng 2 bước, ví dụ `Bước 1 / 2`. |
| Đầu ra | Phản hồi thành công | Mobile hiển thị thông báo/OTP và chuyển hoặc cho phép tiếp tục sang Bước 2; API trả `200 OK` với `message` và `resetToken`. |
| Đầu ra | Phản hồi lỗi | Với email không hợp lệ hoặc không đăng ký, hệ thống từ chối tạo OTP và không cho tiếp tục reset. |
| Đầu ra | Điều hướng về đăng nhập | Bấm `Quay lại đăng nhập` đưa người dùng về màn hình đăng nhập. |
| Đầu ra | Dấu trường bắt buộc | Trường email bắt buộc phải có ký hiệu `*` bên cạnh nhãn theo FR-22. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `email` | `email` phải được cung cấp, không được rỗng. |
| C2 | `email` | `email` phải đúng định dạng email, ví dụ `user@domain.com`. |
| C3 | `email` | `email` phải là địa chỉ đã đăng ký trong hệ thống. |
| C4 | OTP/reset token | Khi email hợp lệ và đã đăng ký, hệ thống sinh OTP ngẫu nhiên gồm đúng 6 chữ số. |
| C5 | OTP/reset token | Trong môi trường demo, OTP phải được hiển thị trực tiếp trên màn hình Mobile hoặc trả trong API response để tester quan sát. |
| C6 | Step Indicator | Mobile phải hiển thị Step Indicator rõ ràng cho Bước 1 của luồng 2 bước. |
| C7 | Điều hướng | Mobile phải có nút `Quay lại đăng nhập`. |
| C8 | Điều hướng | Bấm `Quay lại đăng nhập` phải đưa người dùng về màn hình đăng nhập. |
| C9 | Phản hồi lỗi | Với email rỗng, sai định dạng hoặc chưa đăng ký, hệ thống không được sinh OTP dùng được cho reset. |
| C10 | Giao diện form | Trường email bắt buộc phải có ký hiệu `*` bên cạnh nhãn. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `email` | Email được cung cấp, đúng định dạng và đã đăng ký. | Có | `E_registered = test@eshop.com` | Cho phép gửi yêu cầu OTP. |
| EC02 | `email` | Email rỗng hoặc thiếu trường `email`. | Không | Mobile để trống ô email; API body `{}` | Từ chối yêu cầu; không sinh OTP dùng được. |
| EC03 | `email` | Email có chuỗi nhưng sai định dạng. | Không | `plain-text-email` | Từ chối yêu cầu vì không đúng định dạng email. |
| EC04 | `email` | Email đúng định dạng nhưng chưa đăng ký. | Không | `E_unregistered = notfound-fr03@example.com` | Từ chối yêu cầu vì FR-03 yêu cầu email đã đăng ký. |
| EC05 | OTP/reset token | OTP hợp lệ được sinh cho email đã đăng ký và gồm đúng 6 chữ số. | Có | `OTP_E = 123456` quan sát từ response/demo | Có thể dùng OTP này cùng `E_registered` ở Bước 2. |
| EC06 | OTP/reset token | OTP sinh ra không gồm đúng 6 chữ số hoặc chứa ký tự không phải chữ số. | Không | `12345`, `1234567`, `12A456` nếu quan sát được | Không đạt yêu cầu OTP 6 chữ số. |
| EC07 | OTP/reset token | OTP không được hiển thị/trả về trong môi trường demo. | Không | Mobile/API không hiển thị `resetToken` sau yêu cầu hợp lệ | Không đạt FR-03 vì demo phải hiển thị trực tiếp OTP để tester tiếp tục Bước 2. |
| EC08 | Step Indicator | Step Indicator Bước 1 hiển thị rõ ràng. | Có | `Bước 1 / 2` hoặc nội dung tương đương | Người dùng nhận biết đang ở bước đầu của luồng reset mật khẩu. |
| EC09 | Step Indicator | Step Indicator thiếu hoặc hiển thị sai bước. | Không | Không có chỉ báo, hoặc hiển thị `Bước 2 / 2` khi đang nhập email | Không đạt FR-03/FR-22 cho form nhiều bước. |
| EC10 | Nút quay lại đăng nhập | Có nút `Quay lại đăng nhập` và điều hướng đúng. | Có | Bấm nút trên màn hình Bước 1 | Mobile quay về màn hình đăng nhập. |
| EC11 | Nút quay lại đăng nhập | Thiếu nút hoặc bấm nút không về màn hình đăng nhập. | Không | Không thấy nút, hoặc bấm không đổi màn hình | Không đạt FR-03. |
| EC12 | Phản hồi lỗi | Dữ liệu email không hợp lệ không tạo OTP dùng được. | Có | `email=""`, `email="plain-text-email"`, hoặc `E_unregistered` | Mobile/API báo lỗi phù hợp; không cho tiếp tục reset bằng OTP mới. |
| EC13 | Giao diện form | Nhãn email có ký hiệu bắt buộc `*`. | Có | Nhãn `Email *` hoặc tương đương | Đạt FR-22 cho trường bắt buộc. |
| EC14 | Giao diện form | Nhãn email thiếu ký hiệu bắt buộc `*`. | Không | Nhãn chỉ là `Email` | Không đạt FR-22. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR03-MOB-FORGOT-001 | Lấy OTP thành công bằng email đã đăng ký. | Mobile: mở màn hình `Quên mật khẩu`, nhập `E_registered = test@eshop.com`, bấm gửi/lấy OTP. API: `POST /api/forgot-password` với body `{"email":"test@eshop.com"}`. | EC01, EC05, EC08, EC10 | Mobile: hiển thị Step Indicator Bước 1, có nút `Quay lại đăng nhập`, tạo và hiển thị OTP gồm đúng 6 chữ số hoặc cho phép chuyển sang Bước 2 với OTP demo quan sát được. API: trả `200 OK` và body có `message = "Mã đặt lại mật khẩu đã được tạo"` cùng `resetToken` gồm đúng 6 chữ số. | Mobile: màn hình Bước 1 có tiêu đề `Quên Mật Khẩu`, nhãn `Nhập Email của bạn`, nút `Lấy mã OTP`; không thấy Step Indicator Bước 1/2 và không có nút `Quay lại đăng nhập` ở Bước 1. API: `200 OK`, body `{"message":"Mã đặt lại mật khẩu đã được tạo","resetToken":"6295"}`; `resetToken` chỉ có 4 chữ số. | Không |
| EP-FR03-MOB-FORGOT-002 | Từ chối khi email rỗng. | Mobile: để trống email rồi bấm gửi. API: body `{}` hoặc `{"email":""}`. | EC02, EC12 | Mobile: hiển thị lỗi trên nút submit hoặc gần vùng form theo FR-22, không tạo OTP và không chuyển sang Bước 2. API: contract chưa nêu status/body lỗi; kỳ vọng trả lỗi `4xx` hoặc phản hồi lỗi phù hợp, không có `resetToken` dùng được. | API: body `{}` trả `404 Not Found` `{"error":"User not found"}`; body `{"email":""}` cũng trả `404 Not Found` `{"error":"User not found"}`; không có `resetToken`. Mobile: hiển thị alert lỗi theo response, không thấy lỗi inline trên nút submit. | Không |
| EP-FR03-MOB-FORGOT-003 | Từ chối khi email sai định dạng. | Mobile/API dùng `email="plain-text-email"`. | EC03, EC12 | Mobile: từ chối định dạng email, không tạo OTP, không chuyển sang Bước 2. API: contract chưa nêu status/body lỗi; kỳ vọng không trả OTP dùng được cho reset. | API: `404 Not Found`, body `{"error":"User not found"}`; không có `resetToken`. Mobile: không thấy validate định dạng email trước khi gọi API; lỗi hiển thị như alert từ API. | Không |
| EP-FR03-MOB-FORGOT-004 | Từ chối khi email đúng định dạng nhưng chưa đăng ký. | Mobile/API dùng `E_unregistered = notfound-fr03@example.com`, đảm bảo email này chưa có tài khoản trong dữ liệu test. | EC04, EC12 | Mobile: hiển thị lỗi phù hợp, không tạo OTP dùng được và không cho reset mật khẩu tài khoản không tồn tại. API: contract chưa nêu status/body lỗi; kỳ vọng không trả `resetToken` hợp lệ. | API: `404 Not Found`, body `{"error":"User not found"}`; không có `resetToken`. Mobile: hiển thị alert lỗi theo API, không chuyển sang bước reset. | Có |
| EP-FR03-MOB-FORGOT-005 | Kiểm tra OTP demo được hiển thị/trả về. | Thực hiện yêu cầu hợp lệ với `E_registered`, quan sát Mobile và API response. | EC01, EC05, EC07 | Mobile: trong môi trường demo, OTP phải quan sát được trực tiếp trên màn hình để tester nhập ở Bước 2. API: response thành công có trường `resetToken`. Nếu không thấy OTP trên Mobile/API demo thì không đạt FR-03. | API: response thành công có `resetToken`, ví dụ `"6295"`, nhưng chỉ 4 chữ số. Mobile: sau khi lấy OTP chỉ thấy thông báo chung `Nếu email tồn tại trong hệ thống...`, không thấy OTP demo hiển thị trực tiếp trên màn hình. | Không |
| EP-FR03-MOB-FORGOT-006 | Kiểm tra Step Indicator ở Bước 1. | Mở màn hình `Quên mật khẩu` trước và sau khi gửi email hợp lệ. | EC08, EC09 | Mobile: chỉ báo bước hiển thị rõ ràng là Bước 1 của 2 trước khi nhập OTP. API: không áp dụng kiểm chứng UI; ghi `N/A` cho API hoặc chỉ dùng API để tạo OTP. | Mobile: không thấy Step Indicator `Bước 1 / 2` hoặc nội dung tương đương. API endpoint kiểm Step Indicator không tồn tại; đây là yêu cầu UI. | Không |
| EP-FR03-MOB-FORGOT-007 | Kiểm tra nút quay lại đăng nhập. | Trên màn hình Bước 1, bấm `Quay lại đăng nhập`. | EC10, EC11 | Mobile: quay về màn hình đăng nhập. API: không áp dụng vì đây là hành vi điều hướng UI. | Mobile: ở Bước 1 không thấy nút `Quay lại đăng nhập`, nên không thể thực hiện thao tác quay lại từ Bước 1. API endpoint điều hướng Mobile không tồn tại; đây là yêu cầu UI. | Không |
| EP-FR03-MOB-FORGOT-008 | Kiểm tra dấu bắt buộc cho trường email. | Mở màn hình `Quên mật khẩu`, quan sát nhãn trường email. | EC13, EC14 | Mobile: trường email có ký hiệu `*` bên cạnh nhãn vì đây là trường bắt buộc. API: không áp dụng vì đây là yêu cầu hiển thị form. | Mobile: nhãn hiển thị `Nhập Email của bạn`, không có ký hiệu `*`. API endpoint kiểm ký hiệu bắt buộc không tồn tại; đây là yêu cầu UI. | Không |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `email` | Chuỗi định dạng | Không | Tài liệu yêu cầu định dạng email và trạng thái đã đăng ký, nhưng không nêu độ dài min/max hoặc biên ký tự; phù hợp EP hơn BVA. |
| OTP/reset token | Độ dài chuỗi số | Có | FR-03 và SEC-07 yêu cầu OTP gồm tối thiểu/đúng 6 chữ số; API success minh họa `resetToken` 6 chữ số. |
| Step Indicator | Trạng thái UI | Không | Là yêu cầu hiển thị/membership của bước hiện tại, không có miền liên tục. |
| Nút `Quay lại đăng nhập` | Trạng thái UI/điều hướng | Không | Có hoặc không có nút, điều hướng đúng hoặc sai; phù hợp EP. |
| Dấu `*` trường bắt buộc | Trạng thái UI | Không | Đây là điều kiện có/không theo FR-22, không có biên liên tục. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| OTP/reset token | OTP phải gồm đúng 6 chữ số | `length=5` là dưới biên, `length=6` là đúng biên, `length=7` là trên biên; thêm kiểm tra mọi ký tự đều là chữ số `[0-9]` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR03-MOB-FORGOT-001 | OTP/reset token | `length=6` | Gửi yêu cầu OTP hợp lệ cho `E_registered`, quan sát OTP trên Mobile hoặc `resetToken` trong API response. | Mobile: OTP demo hiển thị gồm đúng 6 chữ số. API: `200 OK`, `resetToken` có đúng 6 ký tự và tất cả là chữ số. | API: `200 OK`, `resetToken="6295"` gồm 4 chữ số, không đạt `length=6`. Mobile không hiển thị OTP demo trực tiếp. | Không |
| BV-FR03-MOB-FORGOT-002 | OTP/reset token | `length=5` hoặc ít hơn | Quan sát OTP sinh ra sau yêu cầu hợp lệ; nếu OTP thực tế chỉ có 5 chữ số hoặc ít hơn, ghi lại giá trị. | Mobile: không được hiển thị OTP ngắn hơn 6 chữ số. API: response thành công không được có `resetToken` ngắn hơn 6 chữ số; nếu có thì không đạt FR-03/SEC-07. | API: response thành công có `resetToken="6295"` với `length=4` là dưới biên 6. | Không |
| BV-FR03-MOB-FORGOT-003 | OTP/reset token | `length=7` hoặc nhiều hơn | Quan sát OTP sinh ra sau yêu cầu hợp lệ; nếu OTP thực tế có 7 chữ số hoặc nhiều hơn, ghi lại giá trị. | Mobile: không được hiển thị OTP dài hơn 6 chữ số. API: response thành công không được có `resetToken` dài hơn 6 chữ số; nếu có thì không đạt FR-03. | API: không quan sát thấy token dài hơn 6 trong lần chạy; token thực tế là `6295` với `length=4`. | Có |
| BV-FR03-MOB-FORGOT-004 | OTP/reset token | Thành phần ký tự số | Quan sát OTP sinh ra sau yêu cầu hợp lệ; kiểm tra từng ký tự. | Mobile: OTP chỉ gồm các chữ số `0-9`. API: `resetToken` chỉ gồm các chữ số `0-9`; nếu có chữ cái/ký tự đặc biệt thì không đạt yêu cầu OTP 6 chữ số. | API: `resetToken="6295"` chỉ gồm chữ số `0-9`, nhưng vẫn sai độ dài 6. | Không |

## 5. Ghi chú rủi ro

- API specification chỉ mô tả response thành công của `POST /api/forgot-password`; các lỗi cho email rỗng, sai định dạng hoặc chưa đăng ký chưa có status code/body cụ thể.
- Tài liệu yêu cầu OTP ngẫu nhiên nhưng không cung cấp tiêu chí kiểm chứng tính ngẫu nhiên bằng black-box trong phạm vi bài này; artifact chỉ kiểm được định dạng 6 chữ số và việc OTP quan sát được trong môi trường demo.
- SEC-07 nói OTP phải có thời hạn nhưng không nêu thời lượng hết hạn, nên không thể thiết kế BVA thời gian hết hạn cụ thể cho Bước 1.
- Mobile App chạy qua IP LAN của máy chủ; khi thực thi cần ghi rõ base URL/API environment thực tế trong evidence nếu khác `http://localhost:3000`.
- API actual ngày 2026-07-09 cho thấy endpoint `POST /api/forgot-password` tồn tại nhưng sinh `resetToken` 4 chữ số, không đúng yêu cầu OTP 6 chữ số của FR-03.
- Các yêu cầu Step Indicator, nút quay lại đăng nhập và ký hiệu `*` là yêu cầu UI; API endpoint để kiểm trực tiếp các thành phần UI này không tồn tại.
