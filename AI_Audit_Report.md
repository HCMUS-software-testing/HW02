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