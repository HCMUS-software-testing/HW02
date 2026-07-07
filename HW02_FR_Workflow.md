# Workflow thực hiện từng feature cho HW02

Áp dụng workflow này cho từng feature đã chọn:

- FR-04 Personal profile management
- FR-08 Checkout
- FR-15 Product management CRUD
- FR-06 Mobile product detail view

Mục tiêu là dùng AI trước để sinh phân tích kiểm thử có cấu trúc, sau đó human review và verify trên SUT trước khi ghi actual result hoặc bug.

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
Use the domain_testing skill for the following feature.

[Paste the prepared feature context here]

Start Step 1 only. Do not create the combination matrix or test cases yet.
```

Output mong đợi:

- Feature scope và preconditions
- Input variables
- Output/state variables
- Valid equivalence partitions
- Invalid equivalence partitions
- Output/state equivalence classes
- Assumptions và open questions

Checklist review:

- AI đã xác định đủ input variables chính chưa?
- Có output/state variables chưa, hay chỉ có input fields?
- Valid/invalid partitions có dựa trên SUT hoặc được đánh dấu assumption rõ ràng không?
- Auth/permission/state conditions có được đưa vào khi cần không?
- Các giá trị mơ hồ có được thay bằng constraints cụ thể hoặc assumptions không?

Nếu cần sửa:

```text
Revise Step 1 with these corrections:
- [Correction 1]
- [Correction 2]

Do not continue to Step 2 yet.
```

Nếu Step 1 ổn:

```text
Verified. Continue to Step 2 and create representative values and the combination matrix.
```

## 3. Review Domain Combination Matrix

Output mong đợi:

- Representative values cho từng partition
- Positive scenarios kết hợp valid partitions
- Negative scenarios test một invalid partition tại một thời điểm
- Expected output/state class cho từng scenario

Checklist review:

- Mỗi valid equivalence class đã xuất hiện trong ít nhất một scenario chưa?
- Mỗi invalid scenario có isolate một invalid class không?
- Representative values có cụ thể và execute được không?
- Expected results có thực tế với UI/API không?
- Special interaction scenarios có được justify không?

Nếu cần sửa:

```text
Revise the combination matrix with these corrections:
- [Correction 1]
- [Correction 2]

Do not generate detailed test cases yet.
```

Nếu ổn:

```text
Verified. Continue to Step 3 and generate detailed Domain Testing test cases.
```

## 4. Sinh Domain Test Cases

Output mong đợi:

| Required Field | Notes |
| :--- | :--- |
| Test Case ID | Dùng `FRxx-DOM-TCxx` |
| Scenario ID | Link tới matrix scenario |
| Summary | Ngắn và cụ thể |
| Preconditions | Login/cart/admin state/etc. |
| Steps | Manual steps có thể execute |
| Test Data | Giá trị cụ thể |
| Expected Result | Oracle rõ ràng |
| Priority | High/Medium/Low |

Checklist review:

- Test steps có chạy được trên SUT thật không?
- Test data có cụ thể không?
- Expected result có quan sát được không?
- Có test case bị duplicate cần bỏ không?
- Có missing case nào cần thêm thủ công không?

Copy phần Domain analysis và test cases đã duyệt vào section feature tương ứng trong `Main_Report.md`. Nếu bạn vẫn giữ file nháp theo feature, có thể update thêm `FRxx_*/Test_Report.md` như supporting material, nhưng không dùng nó thay main report.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft]
git commit -m "Add Domain Testing analysis for FR-xx"
```

## 5. Chạy `bva_testing` Skill

Prompt bắt đầu:

```text
Use the bva_testing skill for the same feature.

Use the approved Domain Testing variables and the feature context below:

[Paste feature context again if needed]

Start Step 1 only. Identify boundary variables and boundary values. Do not generate BVA test cases yet.
```

Output mong đợi:

- Boundary variables
- Boundary source: requirement/API/UI/source observation/assumption
- Min-1, min, min+1, nominal, max-1, max, max+1 nếu áp dụng được
- Các biến không phải BVA target và lý do

Checklist review:

- Boundary có thật và có căn cứ không?
- AI có tự bịa min/max không?
- One-sided boundaries có được ghi rõ không?
- String length, amount, quantity, ID, date, list size, state limits đã được cân nhắc chưa?
- Exploratory stress values có bị trộn với formal BVA không?

Nếu cần sửa:

```text
Revise the boundary table with these corrections:
- [Correction 1]
- [Correction 2]

Do not generate BVA test cases yet.
```

Nếu ổn:

```text
Verified. Generate BVA test cases.
```

## 6. Review BVA Test Cases

Output mong đợi:

| Required Field | Notes |
| :--- | :--- |
| Test Case ID | Dùng `FRxx-BVA-TCxx` |
| Boundary ID | Link tới boundary row |
| Summary | Gọi tên exact boundary |
| Preconditions | Setup hợp lệ |
| Steps | Manual steps có thể execute |
| Target Boundary Value | Giá trị biên đang test |
| Nominal Values for Other Variables | Các biến khác giữ valid |
| Expected Result | Valid/invalid behavior |
| Priority | High/Medium/Low |

Checklist review:

- Mỗi test có chỉ thay đổi một boundary variable không?
- Các biến còn lại có giữ nominal/valid không?
- Boundary values có chính xác không?
- Expected results có rõ không?
- Assumption-based tests có được đánh dấu không?

Copy phần BVA analysis và test cases đã duyệt vào section feature tương ứng trong `Main_Report.md`.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft]
git commit -m "Add BVA analysis for FR-xx"
```

## 7. Execute tests trên SUT

Với mỗi test case, ghi:

- Status: Pass / Fail / Blocked / Not Executed
- Actual result
- Screenshot nếu fail
- Bug ID hoặc GitHub Issue link nếu có

Nguyên tắc execution:

- Không đánh dấu bug chỉ vì AI dự đoán.
- Phải verify behavior trên SUT thật.
- Nếu expected result chưa chắc chắn, ghi là assumption và giải thích cách verify.
- Nếu UI và API khác behavior, ghi cả hai observation.

Commit gợi ý:

```text
git add Main_Report.md [optional feature draft] [screenshots if any]
git commit -m "Execute tests and document results for FR-xx"
```

## 8. Log bugs

Với mỗi confirmed bug:

1. Ghi vào section feature tương ứng trong `Main_Report.md`.
2. Tạo GitHub Issue.
3. Attach screenshot/evidence.
4. Link GitHub Issue trong report.

Bug report fields tối thiểu:

```text
Bug ID:
Title:
Feature:
Severity:
Priority:
Environment:
Preconditions:
Steps to reproduce:
Expected result:
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
- Weak prompt / missing context / model assumption / SUT-specific behavior / feature complexity

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
Use the audit_extraction skill for this FR-xx Domain Testing and BVA session.

Create an AI Audit Report entry using the same simplified template:
- Name of AI tool
- Date and time
- Task description
- Prompts Used
- AI Output Summary
- Human Review and Corrections

Do not include meta questions about workflow or audit formatting unless they directly changed the final assignment artifact.
```

Copy audit log vào:

```text
HW02/AI_Reports/AI_Audit_Report.md
```

Commit gợi ý:

```text
git add AI_Reports/AI_Audit_Report.md
git commit -m "Add AI audit log for FR-xx"
```

## 11. Lặp lại cho feature tiếp theo

Trước khi qua feature mới:

- Mở AI session mới.
- Chỉ paste context của feature mới.
- Không reuse assumptions từ feature trước nếu không explicit valid.
- Giữ test case IDs theo đúng feature.

## Quick Prompt Set

### Domain Step 1

```text
Use the domain_testing skill for [FR-xx - Feature Name].

[Feature context]

Start Step 1 only. Do not create the matrix or test cases yet.
```

### Domain Step 2

```text
Verified. Continue to Step 2 and create representative values and the combination matrix.
```

### Domain Step 3

```text
Verified. Continue to Step 3 and generate detailed Domain Testing test cases.
```

### BVA Step 1

```text
Use the bva_testing skill for [FR-xx - Feature Name].

Use the approved Domain Testing variables and this feature context:
[Feature context]

Start Step 1 only. Do not generate BVA test cases yet.
```

### BVA Step 2

```text
Verified. Generate BVA test cases.
```

### Audit

```text
Use the audit_extraction skill for this [FR-xx] Domain Testing and BVA session.
Use the simplified AI Audit template and exclude meta workflow questions.
```
