# Workflow thực hiện từng feature cho HW02

Áp dụng workflow này cho từng feature đã chọn:

- FR-04 Personal profile management
- FR-08 Checkout
- FR-15 Product management CRUD
- FR-06 Mobile product detail view

Mục tiêu là dùng AI trước để sinh phân tích kiểm thử có cấu trúc, sau đó human review và verify trên SUT trước khi ghi actual result hoặc bug.

Context dùng sẵn cho 4 feature nằm trong `Feature_Contexts.md`. Khi bắt đầu một feature, copy đúng block context của feature đó vào prompt thay vì tự viết lại từ đầu.

## Cách hiểu đúng về Agent Skill và Context

Agent Skill trong bài này là các file hướng dẫn nằm ở `.agents/skills/*/SKILL.md`. Skill không tự động chạy SUT, không tự động biết context của từng feature, và không đảm bảo tự đọc được toàn bộ repo nếu tool/chat session không có quyền truy cập file.

Vì vậy khi prompt, luôn làm rõ 2 thứ:

1. Agent phải đọc/follow skill nào.
2. Agent phải dùng feature context nào.

Nếu đang dùng Codex hoặc agent có quyền đọc workspace, có thể reference file path:

```text
Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`.
Dùng context FR-04 trong `HW02/Feature_Contexts.md`.

Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
```

Nếu agent báo không đọc được file, dùng fallback:

```text
Em sẽ paste trực tiếp nội dung skill và context của feature.

[Paste nội dung từ HW02/.agents/skills/domain_testing/SKILL.md]

[Paste context FR-04 từ HW02/Feature_Contexts.md]

Hãy làm đúng theo skill. Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
```

Không nên để AI tự tạo context từ đầu. Vì Domain Testing và BVA trong bài này là black-box testing, context chỉ được lấy từ requirement, API spec công khai, README/spec công khai nếu được xem như tài liệu yêu cầu, UI quan sát được, và behavior khi chạy SUT. Không yêu cầu AI đọc source code backend/frontend để thiết kế test.

## 0. Mở một AI session mới cho từng feature

Khuyến nghị chia session:

```text
Session 1: FR-04 Domain Testing + BVA
Session 2: FR-08 Domain Testing + BVA
Session 3: FR-15 Domain Testing + BVA
Session 4: FR-06 Domain Testing + BVA
```

Mỗi session chỉ nên làm một feature để AI không trộn business rules giữa các feature và AI Audit dễ ghi hơn.

## 1. Chuẩn bị Feature Context

Trước khi gọi Agent Skill, chuẩn bị context tối thiểu:

```text
Feature ID:
Feature name:
Pool:
Surface: Web / Admin / Mobile / API
User role:
Preconditions:
Relevant UI behavior:
Relevant API endpoint/body:
Known constraints/business rules:
Out of scope:
```

Nếu dùng 4 feature đã chọn của bài này, ưu tiên lấy context đã chuẩn bị trong `Feature_Contexts.md` rồi chỉnh lại theo quan sát thực tế trên SUT nếu cần.

Ví dụ cho FR-04:

```text
Feature ID: FR-04
Feature name: Personal profile management
Pool: A
Surface: Web/API
User role: Logged-in customer
Preconditions: User has a valid account and token
Relevant API endpoint/body:
PUT /api/users/me
{
  "name": "Nguyen Van A",
  "shipping_address": "123 Le Loi, Q1, TP.HCM",
  "phone": "0912345678"
}
Known constraints/business rules:
- User must be authenticated.
- User can update name, shipping_address, and phone.
Out of scope:
- Password change
- Admin user management
```

## 2. Chạy `domain_testing` Skill

Prompt bắt đầu:

```text
Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`.

[Paste context feature đã chuẩn bị ở đây]

Chỉ thực hiện Step 1: xác định Input và Output.
Chưa tạo Condition, EP hoặc bảng Test Case.
```

Output mong đợi:

- Bảng Input và Output với các cột: `Tham số / Biến` | `Loại (Input/Output/State)` | `Kiểu dữ liệu & Định dạng` | `Mô tả & Hành vi trên SUT` | `Cơ sở lý do lựa chọn (Rationale)`.

Checklist review:

- AI đã xác định đủ input chính chưa?
- Output có quan sát được hoặc kiểm chứng được không?
- Có input/output nào bị suy đoán từ source code không?

Nếu cần sửa:

```text
Revise Step 1 with these corrections:
- [Correction 1]
- [Correction 2]

Do not continue to Step 2 yet.
```

Nếu Step 1 ổn:

```text
OK. Tiếp tục Step 2: xác định Condition.
```

## 3. Sinh và review Domain Condition, EP và Test Case

Sau khi Step 2 được duyệt:

```text
OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP).
```

Sau khi Step 3 được duyệt:

```text
OK. Tiếp tục Step 4: xác định Test Case.
```

Output mong đợi:

- Step 2: Bảng Điều kiện (Condition) với các cột: `Mã điều kiện (ID)` | `Tham số tương ứng` | `Mô tả điều kiện` | `Cơ sở lý thuyết / Luật nghiệp vụ (Rationale)`.
- Step 3: Bảng Phân hoạch tương đương (EP) với các cột: `Mã phân hoạch (ID)` | `Mã điều kiện đối chiếu` | `Loại phân hoạch (Hợp lệ / Không hợp lệ)` | `Mô tả phân hoạch & Giá trị đại diện` | `Lý do lựa chọn & Biên (Rationale)`.
- Step 4: Bảng Test Case dùng ID `FRxx-DOM-TCxx`, phủ các lớp EP, có cột execution `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` để điền sau.
- Test hợp lệ có thể kết hợp nhiều valid EP; test không hợp lệ chỉ vi phạm một invalid EP chính.

Checklist review:

- Mỗi valid EP đã xuất hiện trong ít nhất một test case chưa?
- Mỗi invalid test case có isolate một invalid EP không?
- Test case có cụ thể và execute được không?
- Kết quả mong đợi có thực tế với UI/API không?
- Nếu có test interaction đặc biệt, lý do có rõ không?

Nếu cần sửa:

```text
Sửa Step 4 với các chỉnh sửa sau:
- [Chỉnh sửa 1]
- [Chỉnh sửa 2]

Chưa tự điền actual result nếu chưa execute trên SUT.
```

Copy phần Domain analysis và test cases đã duyệt vào section feature tương ứng trong `Main_Report.md`. Nếu bạn vẫn giữ file nháp theo feature, có thể update thêm `FRxx_*/Test_Report.md` như supporting material, nhưng không dùng nó thay main report.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft]
git commit -m "Add Domain Testing analysis for FR-xx"
```

## 4. Chạy `bva_testing` Skill

Prompt bắt đầu:

```text
Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`.

Dùng Domain Testing output đã được duyệt và context feature bên dưới:

[Paste lại context feature nếu cần]

Chỉ thực hiện Step 1: xác định biến có thể áp dụng BVA.
Chưa xác định giá trị biên chi tiết và chưa sinh BVA Test Case.
```

Output mong đợi:

- Step 1: Bảng danh sách các tham số có tính chất định lượng/số lượng/độ dài để áp dụng BVA.
- Step 2: Bảng Biên và cận biên với các cột: `Mã biên` | `Tham số` | `Cận dưới ngoài biên` | `Biên dưới` | `Cận dưới trong biên` | `Giá trị bình thường` | `Cận trên trong biên` | `Biên trên` | `Cận trên ngoài biên` | `Giải thích nguồn gốc biên (Rationale)`.
- Step 3: Bảng BVA Test Case dùng ID `FRxx-BVA-TCxx`.

Checklist review:

- Boundary có thật và có căn cứ không?
- AI có tự bịa min/max không?
- One-sided boundaries có được ghi rõ không?
- String length, amount, quantity, ID, date, list size, state limits đã được cân nhắc chưa?
- Exploratory stress values có bị trộn với formal BVA không?

Nếu cần sửa:

```text
Sửa bảng boundary với các chỉnh sửa sau:
- [Chỉnh sửa 1]
- [Chỉnh sửa 2]

Chưa sinh BVA Test Case.
```

Nếu ổn:

```text
OK. Tiếp tục Step 2: xác định giá trị biên và cận biên.
```

Nếu Step 2 đã được duyệt:

```text
OK. Tiếp tục Step 3: xác định BVA Test Case.
```

## 5. Review BVA Test Case

Output mong đợi:

| Cột bắt buộc | Ý nghĩa |
| :--- | :--- |
| Mã test case | Dùng `FRxx-BVA-TCxx` |
| Các input của feature | Giá trị cụ thể dùng để execute |
| Giá trị biên được test | Giá trị biên đang test |
| Kết quả mong đợi | Valid/invalid behavior |
| Kết quả thực tế | Để `TODO` cho đến khi execute |
| Trạng thái | Để `TODO` cho đến khi execute |
| Bug ID / Evidence | Link/evidence nếu test fail và có bug report riêng |
| Phủ mã biên | Link tới boundary ID tương ứng |

Checklist review:

- Mỗi test có chỉ thay đổi một boundary variable không?
- Các biến còn lại có giữ nominal/valid không?
- Boundary values có chính xác không?
- Kết quả mong đợi có rõ không?
- Test dựa trên điểm chưa chắc chắn có bị loại khỏi formal BVA không?

Copy phần BVA analysis và test cases đã duyệt vào section feature tương ứng trong `Main_Report.md`.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft]
git commit -m "Add BVA analysis for FR-xx"
```

## 6. Execute Domain Testing trên SUT

Sau khi Domain Testing Step 4 đã được review, chạy các test case `FRxx-DOM-TCxx` trên SUT.

Ghi kết quả trực tiếp vào các cột `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` trong bảng Domain Test Case của feature tương ứng trong `Main_Report.md`.

Với mỗi test case, ghi:

- Status: Pass / Fail / Blocked / Not Executed
- Actual result
- Screenshot nếu fail
- Bug ID hoặc GitHub Issue link nếu có

Nguyên tắc execution:

- Không đánh dấu bug chỉ vì AI dự đoán.
- Phải verify behavior trên SUT thật.
- Nếu expected result chưa chắc chắn, chưa ghi vào bảng chính; verify trước khi dùng.
- Nếu UI và API khác behavior, ghi cả hai observation.

## 7. Execute BVA trên SUT

Sau khi BVA Step 3 đã được review, chạy các test case `FRxx-BVA-TCxx` trên SUT.

Ghi kết quả trực tiếp vào các cột `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` trong bảng BVA Test Case của feature tương ứng trong `Main_Report.md`.

Nguyên tắc execution:

- Chỉ thực thi các BVA test case có boundary có căn cứ.
- Khi test một boundary variable, giữ các biến khác ở giá trị valid/nominal.
- Actual result và Pass/Fail của BVA không được trộn vào bảng Domain Testing.
- Bug phát hiện từ BVA phải được ghi chi tiết trong bug report riêng; trong `Main_Report.md` chỉ điền `Bug ID / Evidence` ở dòng test case tương ứng.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft] [screenshots if any]
git commit -m "Execute tests and document results for FR-xx"
```

## 8. Log bugs

Với mỗi confirmed bug:

1. Tạo bug report riêng theo `Bug_Report_Template.md`.
2. Tạo GitHub Issue nếu requirement yêu cầu.
3. Attach screenshot/evidence.
4. Link Bug ID/GitHub Issue/evidence vào cột `Bug ID / Evidence` của test case tương ứng trong `Main_Report.md`.

Bug report fields tối thiểu:

```text
Bug ID:
Title:
Feature:
Severity:
Mức ưu tiên:
Environment:
Preconditions:
Steps to reproduce:
Kết quả mong đợi:
Actual result:
Screenshot/evidence:
GitHub Issue link:
```

Bạn có thể copy format chi tiết từ:

```text
Bug_Report_Template.md
```

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft] [screenshots]
git commit -m "Log confirmed bugs for FR-xx"
```

## 9. Viết AI Gap Analysis

Viết section này sau khi execute, không viết trước.

Template ngắn:

```text
What AI missed:
- ...

Why AI missed it:
- Weak prompt / missing context / AI suy luận thiếu căn cứ / SUT-specific behavior / feature complexity

Human correction:
- ...

Additional test cases or bugs added manually:
- ...
```

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft]
git commit -m "Add AI gap analysis for FR-xx"
```

## 10. Chạy `audit_extraction` Skill

Chạy ở cuối session của feature.

Prompt:

```text
Đọc và làm theo `HW02/.agents/skills/audit_extraction/SKILL.md`.

Tạo một AI Audit Report entry cho session FR-xx Domain Testing và BVA.

Không đưa các câu hỏi meta về workflow hoặc format audit vào log, trừ khi chúng trực tiếp làm thay đổi artifact cuối cùng.
```

Copy audit log vào:

```text
HW02/AI_Audit_Report.md
```

Commit gợi ý:

```text
git add AI_Audit_Report.md
git commit -m "Add AI audit log for FR-xx"
```

## 11. Lặp lại cho feature tiếp theo

Trước khi qua feature mới:

- Mở AI session mới.
- Chỉ paste context của feature mới.
- Không reuse rule từ feature trước nếu không có căn cứ rõ ràng.
- Giữ test case IDs theo đúng feature.

## Quick Prompt Set

### Domain Step 1

```text
Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`.
Dùng context [FR-xx - Tên feature] trong `HW02/Feature_Contexts.md`.

Nếu không đọc được file, hãy yêu cầu em paste nội dung skill và context feature.

Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
```

### Domain Step 2

```text
OK. Tiếp tục Step 2: xác định Condition.
```

### Domain Step 3

```text
OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP).
```

### Domain Step 4

```text
OK. Tiếp tục Step 4: xác định Test Case.
```

### BVA Step 1

```text
Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`.
Dùng Domain Testing output đã được duyệt và context [FR-xx - Tên feature] trong `HW02/Feature_Contexts.md`.

Nếu không đọc được file, hãy yêu cầu em paste nội dung skill, Domain Testing output đã duyệt, và context feature.

Chỉ thực hiện Step 1. Chưa xác định giá trị biên chi tiết và chưa sinh BVA Test Case.
```

### BVA Step 2

```text
OK. Tiếp tục Step 2: xác định giá trị biên và cận biên.
```

### BVA Step 3

```text
OK. Tiếp tục Step 3: xác định BVA Test Case.
```

### Audit

```text
Đọc và làm theo `HW02/.agents/skills/audit_extraction/SKILL.md`.
Tạo audit entry cho session Domain Testing và BVA của [FR-xx].
Không đưa các câu hỏi meta về workflow vào audit nếu chúng không tạo/sửa artifact cuối cùng.
```
