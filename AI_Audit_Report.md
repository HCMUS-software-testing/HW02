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
