# AI Audit Report

## Interaction 1
**AI Tool:** Gemini 3.1 Pro
**Date and time:** 2026-07-07 19:39:55 +07:00
**Prompt:**
`ep-condition-generator Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`

**Output:**
Dựa trên mô tả yêu cầu của **Tính năng 3 - Quên mật khẩu & Đặt lại mật khẩu (2 bước)** trong file `report.md`, dưới đây là danh sách các điều kiện kiểm thử (Test Conditions) tuân thủ quy tắc Phân vùng tương đương (EP):

- `C1: Email đúng định dạng hợp lệ`
- `C2: Email đã được đăng ký trong hệ thống`
- `C3: OTP bao gồm đúng 6 chữ số`
- `C4: OTP khớp với mã đã được gửi cho email yêu cầu`
- `C5: Mật khẩu mới có độ dài >= 8 ký tự`
- `C6: Mật khẩu mới chứa ít nhất 1 chữ hoa`
- `C7: Mật khẩu mới chứa ít nhất 1 chữ thường`
- `C8: Mật khẩu mới chứa ít nhất 1 chữ số`
- `C9: Mật khẩu mới chứa ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &)`
- `C10: Xác nhận mật khẩu mới khớp hoàn toàn với Mật khẩu mới`

**Giải thích:**
- **C1-C2** tập trung vào trường `Email` ở Bước 1, bao gồm định dạng và trạng thái tồn tại của email.
- **C3-C4** tập trung vào tính hợp lệ của mã `OTP` khi người dùng nhập ở Bước 2.
- **C5-C9** bóc tách ràng buộc nghiệp vụ "mật khẩu mạnh" (FR-01) của trường `Mật khẩu mới` thành từng điều kiện độc lập, giúp cô lập nguyên nhân lỗi nếu có.
- **C10** đánh giá ràng buộc so sánh giữa `Mật khẩu mới` và trường `Xác nhận mật khẩu mới`.

**Nhận xét**
- Không phân tách bước 1, bước 2 -> khó test. C3, C4 bị trùng lặp, đã gộp vào chỉ giữ lại C4

## Interaction 2
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 19:44:15 +07:00
**Prompt:**
`ep-condition-generator Tính năng 10 - Pool B: Trạng thái Đơn hàng`

**Output:**
Dựa trên việc phân tích yêu cầu của Tính năng 10 - Pool B: Trạng thái Đơn hàng trong file `report.md`, tôi đã trích xuất các Điều kiện kiểm thử (Test Conditions) sau:

- **C1**: Vai trò (Role) của người thực hiện thao tác phải hợp lệ (User, Admin).
- **C2**: Trạng thái hiện tại (Current_State) của đơn hàng phải tồn tại và hợp lệ (pending, confirmed, shipping, delivered, canceled).
- **C3**: Hành động chuyển trạng thái sang `confirmed` (từ `pending`) chỉ được phép thực hiện bởi Admin.
- **C4**: Hành động chuyển trạng thái sang `shipping` (từ `confirmed`) chỉ được phép thực hiện bởi Admin.
- **C5**: Hành động chuyển trạng thái sang `delivered` (từ `shipping`) chỉ được phép thực hiện bởi Admin.
- **C6**: Hành động chuyển trạng thái sang `canceled` (từ `pending` hoặc `confirmed`) được phép thực hiện bởi cả User và Admin.
- **C7**: Khi Trạng thái hiện tại là `shipping`, User không được phép thực hiện thao tác chuyển trạng thái (hủy).
- **C8**: Trạng thái `delivered` là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.
- **C9**: Trạng thái `canceled` là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.

**Giải thích:** Các điều kiện trên đã tuân thủ việc tách biệt từng ràng buộc luồng và quyền hạn dựa trên 3 biến đầu vào cốt lõi: Role (vai trò thao tác), Current_State (trạng thái hiện tại) và Hành động (Target_State). Chúng không bị lẫn lộn yếu tố giao diện và không bị gom nhóm vào chung một cụm quá lớn.

**Nhận xét**
- C1 và C2 mô tả điều kiện hợp lệ của dữ liệu đầu vào (Role, Current State) hơn là các quy tắc chuyển trạng thái, nên không mang nhiều giá trị đối với kiểm thử State Transition.
- C7 nên diễn đạt theo quy tắc nghiệp vụ: chỉ Admin được phép hủy đơn khi trạng thái là shipping, thay vì chỉ mô tả trường hợp User không được phép.
- Chưa có condition bao quát yêu cầu "Mọi chuyển đổi không hợp lệ phải trả về lỗi". Nên bổ sung một condition để kiểm tra các chuyển đổi ngoài sơ đồ trạng thái đều bị từ chối và trả về thông báo lỗi phù hợp.
- Các chuyển đổi chỉ mô tả được chuyển bởi ai. Không mô tả chi tiết hành động để chuyển đổi.

## Interaction 3
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 19:55:42 +07:00
**Prompt:**
`eq-condition-generator Tính năng 14 - Pool C: Quản lý Danh mục`

**Output:**
Dựa trên mô tả chức năng trong file `report.md`, các biến đầu vào và ràng buộc nghiệp vụ cho **Tính năng 14 - Quản lý Danh mục** được xác định như sau:

- **Vai trò người dùng**: Yêu cầu quyền thao tác (Admin).
- **Tên danh mục (Category Name)**: Ràng buộc bắt buộc nhập đối với dữ liệu đầu vào.

**Danh sách Điều kiện kiểm thử (Test Conditions):**
- C1: Người dùng có vai trò là Admin.
- C2: Tên danh mục không được để trống.

**Nhận xét:**
- C1 cần nêu chi tiết rằng: Người thực hiện các thao tác (thêm, xóa, xem chi tiết) có vai trò là Admin.

## Interaction 4
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 20:05:30 +07:00
**Prompt:**
`ep-condition-generator Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản`

**Output:**
Dựa trên mô tả chức năng trong file `report.md`, các biến đầu vào và ràng buộc nghiệp vụ cho **Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản** được xác định như sau:

- C1: Email đúng định dạng hợp lệ (ví dụ: user@domain.com)
- C2: Email là duy nhất trong hệ thống (chưa từng được đăng ký)
- C3: Mật khẩu có độ dài >= 8 ký tự
- C4: Mật khẩu chứa ít nhất 1 chữ hoa
- C5: Mật khẩu chứa ít nhất 1 chữ thường
- C6: Mật khẩu chứa ít nhất 1 chữ số
- C7: Mật khẩu chứa ít nhất 1 ký tự đặc biệt (@, $, !, %, *, ?, &)
- C8: Xác nhận mật khẩu khớp hoàn toàn với trường Mật khẩu

**Giải thích:**
- **C1-C2** bóc tách các ràng buộc đối với trường `Email`, bao gồm định dạng và tính duy nhất trong hệ thống.
- **C3-C7** chia nhỏ yêu cầu "mật khẩu mạnh" thành các quy tắc độc lập để đảm bảo mỗi điều kiện chỉ tập trung vào một yếu tố duy nhất (độ dài, chữ hoa, chữ thường, số, ký tự đặc biệt). Điều này giúp cô lập nguyên nhân gây lỗi khi tạo lớp tương đương.
- **C8** kiểm tra ràng buộc logic so sánh giữa hai trường `Mật khẩu` và `Xác nhận mật khẩu`.
- Các yếu tố như "chuyển tới trang Đăng nhập" là kết quả (outcome), không phải input domain nên không được đưa vào điều kiện kiểm thử theo chuẩn EP.

**Nhận xét:**
- Thiếu điều kiện kiểm tra họ tên không được để trống.

## Interaction 5
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 20:32:26 +07:00
**Prompt:**
`equivalence-classes-generator Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`

**Output:**
- E1: Chuỗi email đúng định dạng hợp lệ (vd: chứa đủ phần local, ký tự '@' và domain) - Valid
- E2: Chuỗi email sai định dạng (thiếu '@', thiếu phần local hoặc domain) - Invalid
- E3: Chuỗi email bị để trống - Invalid
- E4: Email đã tồn tại trong cơ sở dữ liệu của hệ thống - Valid
- E5: Email chưa từng được đăng ký trong cơ sở dữ liệu của hệ thống - Invalid
- E6: Mã OTP gồm 6 chữ số và trùng khớp hoàn toàn với mã đã gửi - Valid
- E7: Mã OTP gồm 6 chữ số nhưng không trùng khớp với mã đã gửi - Invalid
- E8: Mã OTP có chứa ký tự không phải là chữ số - Invalid
- E9: Mã OTP có độ dài khác 6 ký tự - Invalid
- E10: Mã OTP bị để trống - Invalid
- E11: Mật khẩu mới có độ dài từ 8 ký tự trở lên - Valid
- E12: Mật khẩu mới có độ dài từ 1 đến 7 ký tự - Invalid
- E13: Mật khẩu mới bị để trống - Invalid
- E14: Mật khẩu mới có chứa ít nhất 1 chữ cái in hoa (A-Z) - Valid
- E15: Mật khẩu mới không chứa bất kỳ chữ cái in hoa nào - Invalid
- E16: Mật khẩu mới có chứa ít nhất 1 chữ cái in thường (a-z) - Valid
- E17: Mật khẩu mới không chứa bất kỳ chữ cái in thường nào - Invalid
- E18: Mật khẩu mới có chứa ít nhất 1 chữ số (0-9) - Valid
- E19: Mật khẩu mới không chứa bất kỳ chữ số nào - Invalid
- E20: Mật khẩu mới có chứa ít nhất 1 ký tự đặc biệt thuộc tập hợp (@, $, !, %, *, ?, &) - Valid
- E21: Mật khẩu mới không chứa bất kỳ ký tự đặc biệt nào thuộc tập hợp cho phép - Invalid
- E22: Chuỗi ký tự ở Xác nhận mật khẩu mới trùng khớp hoàn toàn với Mật khẩu mới - Valid
- E23: Chuỗi ký tự ở Xác nhận mật khẩu mới khác với Mật khẩu mới - Invalid
- E24: Xác nhận mật khẩu mới bị để trống - Invalid

**Nhận xét:**
- E6 - E10 bị trùng lặp dư thừa. Đối với OTP ta chỉ cần xét: mã trùng khớp với mã đã gửi hoặc là mã không trùng khớp. Không cần chia nhỏ thành các trường hợp như vậy.
- E13 - E14 bị trùng lặp dư thừa. Có thể rút gọn thành một trường hợp mật khẩu < 8 ký tự, Invalid
- E23 - E24 bị trùng lặp dư thừa. Có thể rút gọn thành một trường hợp xác nhận mật khẩu không trùng khớp với mật khẩu, Invalid

## Interaction 6
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 20:57:15 +07:00
**Prompt:**
`equivalence-classes-generator Tính năng 10 - Pool B: Trạng thái Đơn hàng`

**Output:**
- E1: Trạng thái hiện tại là pending, người thực hiện là Admin yêu cầu chuyển sang confirmed - Valid
- E2: Trạng thái hiện tại là pending, người thực hiện là User yêu cầu chuyển sang confirmed - Invalid
- E3: Trạng thái hiện tại là confirmed, người thực hiện là Admin yêu cầu chuyển sang shipping - Valid
- E4: Trạng thái hiện tại là confirmed, người thực hiện là User yêu cầu chuyển sang shipping - Invalid
- E5: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang delivered - Valid
- E6: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang delivered - Invalid
- E7: Trạng thái hiện tại là pending, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E8: Trạng thái hiện tại là confirmed, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E9: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang canceled - Valid
- E10: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang canceled - Invalid
- E11: Trạng thái hiện tại là delivered, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid
- E12: Trạng thái hiện tại là canceled, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid

**Nhận xét:**
- Danh sách này đúng đắn và hoàn chỉnh.

## Interaction 7
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 21:11:29 +07:00
**Prompt:**
`equivalence-classes-generator  Tính năng 14 - Pool C: Quản lý Danh mục`

**Output:**
- E1: Người thực hiện các thao tác (thêm, xóa, xem chi tiết) có vai trò là Admin - Valid
- E2: Người thực hiện các thao tác (thêm, xóa, xem chi tiết) không có vai trò là Admin (ví dụ: User, Guest) - Invalid
- E3: Chuỗi tên danh mục có chứa ký tự (không bị để trống) - Valid
- E4: Chuỗi tên danh mục bị để trống (chuỗi rỗng hoặc null) - Invalid

**Nhận xét:**
- Cần phải phân tách riêng biệt 3 trường hợp thêm, xóa, xem chi tiết.
- Thiếu trường hợp thêm danh mục đã tồn tại. Xóa, xem chi tiết danh mục chưa tồn tại. Danh mục có chứa ký tự nên được đổi thành danh mục chưa được thêm vào hệ thống.

## Interaction 8
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 21:14:23 +07:00
**Prompt:**
`equivalence-classes-generator  Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản`

**Output:**
- E1: Chuỗi họ tên có chứa ký tự hợp lệ (không bị để trống) - Valid
- E2: Chuỗi họ tên bị để trống (chuỗi rỗng, null hoặc chỉ chứa khoảng trắng) - Invalid
- E3: Chuỗi email đúng định dạng chuẩn (chứa phần local, ký tự '@', và tên miền hợp lệ) - Valid
- E4: Chuỗi email sai định dạng chuẩn (thiếu '@', thiếu tên miền, sai cấu trúc) - Invalid
- E5: Email chưa từng tồn tại trong cơ sở dữ liệu của hệ thống - Valid
- E6: Email đã được đăng ký và tồn tại trong cơ sở dữ liệu của hệ thống - Invalid
- E7: Mật khẩu có độ dài từ 8 ký tự trở lên - Valid
- E8: Mật khẩu có độ dài nhỏ hơn 8 ký tự - Invalid
- E9: Mật khẩu có chứa ít nhất 1 chữ cái in hoa (A-Z) - Valid
- E10: Mật khẩu không chứa bất kỳ chữ cái in hoa nào - Invalid
- E11: Mật khẩu có chứa ít nhất 1 chữ cái in thường (a-z) - Valid
- E12: Mật khẩu không chứa bất kỳ chữ cái in thường nào - Invalid
- E13: Mật khẩu có chứa ít nhất 1 chữ số (0-9) - Valid
- E14: Mật khẩu không chứa bất kỳ chữ số nào - Invalid
- E15: Mật khẩu có chứa ít nhất 1 ký tự đặc biệt thuộc tập hợp quy định (@, $, !, %, *, ?, &) - Valid
- E16: Mật khẩu không chứa bất kỳ ký tự đặc biệt nào thuộc tập hợp quy định - Invalid
- E17: Chuỗi ký tự trong trường Xác nhận mật khẩu trùng khớp hoàn toàn với trường Mật khẩu - Valid
- E18: Chuỗi ký tự trong trường Xác nhận mật khẩu khác biệt (không khớp) với trường Mật khẩu - Invalid

**Nhận xét**:
- Danh sách equivalence classes này chính xác và không có trường hợp nào bị lặp lại hoặc thiếu.

## Interaction 9
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 21:40:26 +07:00
**Prompt:**
`ep-test-data-generator  Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`

**Output:**
### Bước 1: Yêu cầu OTP (Quên mật khẩu)

| Test Case ID | Email | Output | Covered Classes |
| --- | --- | --- | --- |
| TC1 | `user_valid@gmail.com` | Hệ thống gửi OTP thành công và chuyển sang giao diện Bước 2 | E1, E4 |
| TC2 | `user_validgmail.com` | Hệ thống báo lỗi định dạng email không hợp lệ | E2 |
| TC3 | *(Để trống)* | Hệ thống báo lỗi không được để trống trường email | E3 |
| TC4 | `unregistered@gmail.com` | Hệ thống báo lỗi email chưa được đăng ký trong hệ thống | E5 |

### Bước 2: Đặt lại mật khẩu

| Test Case ID | OTP | Mật khẩu mới | Xác nhận mật khẩu mới | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- |
| TC1 | `123456` | `StrongP@ss1` | `StrongP@ss1` | Đặt lại mật khẩu thành công và hiển thị thông báo | E6, E8, E10, E12, E14, E16, E18 |
| TC2 | `987654` | `StrongP@ss1` | `StrongP@ss1` | Hệ thống báo lỗi mã OTP không hợp lệ hoặc không chính xác | E7 |
| TC3 | `123456` | `P@ss123` | `P@ss123` | Hệ thống báo lỗi mật khẩu mới phải từ 8 ký tự trở lên | E9 |
| TC4 | `123456` | `strongp@ss1` | `strongp@ss1` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | E11 |
| TC5 | `123456` | `STRONGP@SS1` | `STRONGP@SS1` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | E13 |
| TC6 | `123456` | `StrongP@ss` | `StrongP@ss` | Hệ thống báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | E15 |
| TC7 | `123456` | `StrongPass1` | `StrongPass1` | Hệ thống báo lỗi mật khẩu phải chứa ký tự đặc biệt | E17 |
| TC8 | `123456` | `StrongP@ss1` | `WrongP@ss99` | Hệ thống báo lỗi mật khẩu xác nhận không trùng khớp | E19 |

**Nhận xét** Thiếu ghi chú rõ ràng mã OTP nhập đúng hay nhập sai. Thiếu ghi chú rõ ràng về việc nhập email đã được đăng ký hay chưa.

## Interaction 10
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 22:00:22 +07:00
**Prompt:**
`ep-test-data-generator  Tính năng 10 - Pool B: Trạng thái Đơn hàng`

**Output:**
| Test Case ID | Role (Vai trò) | Current State (Trạng thái hiện tại) | Target State (Yêu cầu chuyển) | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- |
| TC1 | `Admin` | `pending` | `confirmed` | Đơn hàng chuyển sang `confirmed` thành công | E1 |
| TC2 | `User` | `pending` | `confirmed` | Báo lỗi không có quyền thay đổi trạng thái | E2 |
| TC3 | `Admin` | `confirmed` | `shipping` | Đơn hàng chuyển sang `shipping` thành công | E3 |
| TC4 | `User` | `confirmed` | `shipping` | Báo lỗi không có quyền thay đổi trạng thái | E4 |
| TC5 | `Admin` | `shipping` | `delivered` | Đơn hàng chuyển sang `delivered` thành công | E5 |
| TC6 | `User` | `shipping` | `delivered` | Báo lỗi không có quyền thay đổi trạng thái | E6 |
| TC7 | `User` | `pending` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E7 |
| TC8 | `Admin` | `confirmed` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E8 |
| TC9 | `Admin` | `shipping` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E9 |
| TC10 | `User` | `shipping` | `canceled` | Báo lỗi User không được phép hủy khi đang giao hàng | E10 |
| TC11 | `User` | `delivered` | `canceled` | Báo lỗi không thể thay đổi từ trạng thái kết thúc | E11 |
| TC12 | `Admin` | `canceled` | `pending` | Báo lỗi không thể thay đổi từ trạng thái kết thúc | E12 |

**Nhận xét**
- Cần bổ sung về thông tin thao tác của đối tượng để hướng tới output như yêu cầu. Bỏ đi TC12 vì không có cách chuyển tới trạng thái Pending.

## Interaction 11
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 22:15:26 +07:00
**Prompt:**
`ep-test-data-generator  Tính năng 14 - Pool C: Quản lý Danh mục`

**Output:**
### Thêm danh mục

| Test Case ID | Vai trò (Role) | Tên danh mục | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | `Điện thoại di động` | Thêm danh mục thành công và hiển thị trên danh sách | E1, E3 |
| TC2 | `User` | `Máy tính xách tay` | Trả về thông báo lỗi từ chối quyền truy cập (Access Denied) | E2 |
| TC3 | `Admin` | *(Để trống)* | Báo lỗi tên danh mục là bắt buộc, không được để trống | E4 |

### Xóa danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC4 | `Admin` | ID: `123` (Có tồn tại) | Xóa danh mục thành công và biến mất khỏi danh sách | E1 |
| TC5 | `User` | ID: `123` (Có tồn tại) | Trả về thông báo lỗi từ chối quyền truy cập (Access Denied) | E2 |

### Xem chi tiết danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC6 | `Admin` | ID: `123` (Có tồn tại) | Hiển thị thông tin chi tiết của danh mục | E1 |
| TC7 | `User` | ID: `123` (Có tồn tại) | Trả về thông báo lỗi từ chối quyền truy cập (Access Denied) | E2 |

**Nhận xét**:
- Thay vì là danh mục mục tiêu để ID ví dụ -> nên để là mã danh mục là có tồn tại hoặc không. Thiếu các 
    

## Interaction 12
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-07 22:21:26 +07:00
**Prompt:**
`ep-test-data-generator Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản`

**Output:**
| Test Case ID | Họ tên | Email | Mật khẩu | Xác nhận mật khẩu | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Đăng ký thành công và chuyển tới trang Đăng nhập | E1, E3, E5, E7, E9, E11, E13, E15, E17 |
| TC2 | *(Để trống)* | `newuser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi họ tên không được để trống | E2 |
| TC3 | `Nguyen Van A` | `newusergmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi định dạng email không hợp lệ | E4 |
| TC4 | `Nguyen Van A` | `existeduser@gmail.com` | `StrongP@ss1` | `StrongP@ss1` | Báo lỗi email đã được đăng ký trong hệ thống | E6 |
| TC5 | `Nguyen Van A` | `newuser@gmail.com` | `P@ss123` | `P@ss123` | Báo lỗi mật khẩu phải có độ dài từ 8 ký tự trở lên | E8 |
| TC6 | `Nguyen Van A` | `newuser@gmail.com` | `strongp@ss1` | `strongp@ss1` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in hoa | E10 |
| TC7 | `Nguyen Van A` | `newuser@gmail.com` | `STRONGP@SS1` | `STRONGP@SS1` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ cái in thường | E12 |
| TC8 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss` | `StrongP@ss` | Báo lỗi mật khẩu phải chứa ít nhất 1 chữ số | E14 |
| TC9 | `Nguyen Van A` | `newuser@gmail.com` | `StrongPass1` | `StrongPass1` | Báo lỗi mật khẩu phải chứa ký tự đặc biệt | E16 |
| TC10 | `Nguyen Van A` | `newuser@gmail.com` | `StrongP@ss1` | `WrongP@ss99` | Báo lỗi xác nhận mật khẩu không khớp | E18 |

**Nhận xét:**
- Bảng test data này hoàn toàn đúng.

## Interaction 13
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-08 15:05:55 +07:00
**Prompt:**
`ep-test-data-generator  Tính năng 14 - Pool C: Quản lý Danh mục`

**Output:**
### Bảng Dữ liệu Kiểm thử (Test Data) bằng Phân vùng tương đương cho Tính năng 14 - Pool C: Quản lý Danh mục

#### 1. Thêm danh mục

| Test Case ID | Vai trò (Role) | Tên danh mục (Category Name) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | `Electronics` *(chưa tồn tại)* | Thêm danh mục thành công và hiển thị trên danh sách. | E1, E5 |
| TC2 | `User` | `Furniture` *(chưa tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(Để trống)* | Báo lỗi tên danh mục là bắt buộc, không được để trống. | E3 |
| TC4 | `Admin` | `Books` *(đã tồn tại)* | Báo lỗi tên danh mục đã tồn tại trong hệ thống. | E4 |

#### 2. Xóa danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | ID: `12` *(đã tồn tại)* | Xóa danh mục thành công và loại bỏ khỏi hệ thống. | E1, E3 |
| TC2 | `User` | ID: `12` *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | ID: `99` *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục cần xóa. | E4 |

#### 3. Xem chi tiết danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | ID: `15` *(đã tồn tại)* | Hiển thị thông tin chi tiết của danh mục tương ứng. | E1, E3 |
| TC2 | `User` | ID: `15` *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | ID: `100` *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục yêu cầu. | E4 |

**Nhận xét**
- Bảng test data này hoàn toàn đúng. Dư thừa ví dụ về ID. Việc danh mục đã tồn tại hay chưa được thể hiện qua mô tả.

## Interaction 14
**AI Tool:** Gemini 3.5 Flash
**Date and time:** 2026-07-08 15:26:59 +07:00
**Prompt:**
`bva-boundary-generator Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)`

**Output:**
- B1 (min): Mã OTP có độ dài 6 chữ số - Valid
- B2 (min-1): Mã OTP có độ dài 5 chữ số - Invalid
- B3 (max+1): Mã OTP có độ dài 7 chữ số - Invalid
- B4 (min): Mật khẩu mới có độ dài 8 ký tự - Valid
- B5 (min-1): Mật khẩu mới có độ dài 7 ký tự - Invalid
- B6 (min): Mật khẩu mới chứa 1 chữ cái in hoa - Valid
- B7 (min-1): Mật khẩu mới chứa 0 chữ cái in hoa - Invalid
- B8 (min): Mật khẩu mới chứa 1 chữ cái in thường - Valid
- B9 (min-1): Mật khẩu mới chứa 0 chữ cái in thường - Invalid
- B10 (min): Mật khẩu mới chứa 1 chữ số - Valid
- B11 (min-1): Mật khẩu mới chứa 0 chữ số - Invalid
- B12 (min): Mật khẩu mới chứa 1 ký tự đặc biệt - Valid
- B13 (min-1): Mật khẩu mới chứa 0 ký tự đặc biệt - Invalid

**Nhận xét**:
- Về mã OTP hoàn toàn sẽ phụ thuộc vào trùng khớp với OTP được sinh ra hay không nên với dữ liệu này không cần xác định giá trị biên.

## Interaction 15
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-08 15:38:54 +07:00
**Prompt:**
`bva-boundary-generator  Tính năng 14 - Pool C: Quản lý Danh mục`

**Output:**
- B1 (min): Tên danh mục có độ dài 1 ký tự - Valid
- B2 (min-1): Tên danh mục có độ dài 0 ký tự (để trống) - Invalid

**Nhận xét:**
- Danh sách này hoàn toàn đúng.

## Interaction 16
**AI Tool:** Gemini 3.1 Pro (Low)
**Date and time:** 2026-07-08 15:42:28 +07:00
**Prompt:**
`bva-boundary-generator Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản`

**Output:**
- B1 (min): Họ tên có độ dài 1 ký tự - Valid
- B2 (min-1): Họ tên có độ dài 0 ký tự (để trống) - Invalid
- B3 (min): Mật khẩu có độ dài 8 ký tự - Valid
- B4 (min-1): Mật khẩu có độ dài 7 ký tự - Invalid
- B5 (min): Mật khẩu chứa 1 chữ cái in hoa - Valid
- B6 (min-1): Mật khẩu chứa 0 chữ cái in hoa - Invalid
- B7 (min): Mật khẩu chứa 1 chữ cái in thường - Valid
- B8 (min-1): Mật khẩu chứa 0 chữ cái in thường - Invalid
- B9 (min): Mật khẩu chứa 1 chữ số - Valid
- B10 (min-1): Mật khẩu chứa 0 chữ số - Invalid
- B11 (min): Mật khẩu chứa 1 ký tự đặc biệt - Valid
- B12 (min-1): Mật khẩu chứa 0 ký tự đặc biệt - Invalid

**Nhận xét:**
- Hoàn toàn chính xác.
