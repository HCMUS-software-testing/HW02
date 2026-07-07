# Hướng dẫn quay demo Agent Skills

File này dùng như một kịch bản ngắn khi quay video demo Agent Skills cho HW02.

## Mục tiêu demo

Chứng minh rằng Agent Skills có thể hướng dẫn AI thực hiện Domain Testing và Boundary Value Analysis theo quy trình **AI-first, human-reviewed**.

Video cần thể hiện được:

- Skill có thể tái sử dụng.
- Skill bám theo methodology của môn học.
- AI không sinh toàn bộ kết quả trong một lần không kiểm soát.
- Sinh viên review từng checkpoint trước khi cho AI tiếp tục.
- Output cuối có thể đưa vào section feature tương ứng trong `Main_Report.md` và AI Audit Report.

## Feature nên dùng để demo

Nên dùng FR-04: Personal profile management.

Lý do:

- Input rõ: `name`, `shipping_address`, `phone`, authentication state.
- Output/state rõ: update success, validation error, unauthorized access, unchanged profile.
- Dễ giải thích hơn checkout hoặc admin CRUD.

## Các file nên mở đầu video

Mở lần lượt:

1. `.agents/README.md`
2. `.agents/skills/domain_testing/SKILL.md`
3. `.agents/skills/bva_testing/SKILL.md`
4. `.agents/skills/audit_extraction/SKILL.md`
5. `HW02_FR_Workflow.md`

Câu giải thích ngắn:

```text
Đây là bộ native Agent Skills dùng cho HW02. Các skill này triển khai workflow Domain Testing và BVA theo bài giảng, có checkpoint bắt buộc để human review. AI sinh phân tích và candidate test cases, còn tôi review output và sau đó tự execute test trên SUT.
```

## Bước demo 1: Chuẩn bị Feature Context

Paste context này vào AI session:

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

## Bước demo 2: Chạy Domain Testing Step 1

Prompt:

```text
Use the domain_testing skill for the following feature.

[Paste the FR-04 feature context]

Start Step 1 only. Do not create the combination matrix or test cases yet.
```

Câu nên nói trong video:

```text
Ở bước này tôi chỉ yêu cầu AI xác định variables và equivalence classes. Tôi chưa cho AI sinh test cases vì cần review phần phân tích trước.
```

Cần review:

- Input variables đã đủ chưa?
- Có output/state classes chưa?
- Valid/invalid partitions có hợp lý không?
- Assumptions có được ghi rõ không?

Ví dụ prompt sửa nếu AI thiếu:

```text
Revise Step 1 with these corrections:
- Add authentication state as an input condition.
- Split phone invalid partitions into empty, non-digit, too short, and too long.
- Mark any unspecified length limits as assumptions.

Do not continue to Step 2 yet.
```

## Bước demo 3: Duyệt Domain Step 1 và chạy Step 2

Prompt:

```text
Verified. Continue to Step 2 and create representative values and the combination matrix.
```

Câu nên nói:

```text
Sau khi Step 1 đã được review, tôi mới cho AI tạo representative values và combination matrix. Với invalid partitions, AI phải áp dụng Single Fault Assumption.
```

Cần review:

- Valid partitions đã được cover chưa?
- Invalid scenarios có test một invalid class tại một thời điểm không?
- Representative values có cụ thể không?
- Expected output/state có quan sát được không?

## Bước demo 4: Duyệt Domain Step 2 và chạy Step 3

Prompt:

```text
Verified. Continue to Step 3 and generate detailed Domain Testing test cases.
```

Câu nên nói:

```text
Output cuối của Domain Testing là bảng candidate test cases. Tôi vẫn phải review và execute các test case này trên SUT trước khi ghi actual results.
```

## Bước demo 5: Chạy BVA Step 1

Prompt:

```text
Use the bva_testing skill for FR-04 - Personal profile management.

Use the approved Domain Testing variables and this feature context:
[Paste the FR-04 feature context]

Start Step 1 only. Do not generate BVA test cases yet.
```

Câu nên nói:

```text
BVA chỉ áp dụng cho các biến có boundary có ý nghĩa. Skill không được tự bịa min/max. Nếu boundary không explicit thì phải ghi là assumption hoặc no explicit boundary found.
```

Cần review:

- Source của boundary có rõ không?
- Có bịa min/max không?
- One-sided boundary có được giải thích không?
- Các biến không phù hợp BVA có được loại ra với lý do không?

## Bước demo 6: Duyệt BVA Step 1 và chạy Step 2

Prompt:

```text
Verified. Generate BVA test cases.
```

Câu nên nói:

```text
Khi test một boundary variable, các biến còn lại phải giữ ở nominal valid values để cô lập hành vi tại biên.
```

## Bước demo 7: Đưa output vào Main Report

Show nơi output sẽ được đưa vào:

```text
Main_Report.md
```

Câu giải thích:

```text
AI output không được nộp raw. Tôi review, chỉnh sửa, rồi đưa phần analysis đã duyệt vào section FR-04 của main report.
```

## Bước demo 8: Chạy Audit Extraction

Prompt:

```text
Use the audit_extraction skill for this FR-04 Domain Testing and BVA session.
Use the simplified AI Audit template and exclude meta workflow questions.
```

Show nơi audit sẽ được đưa vào:

```text
AI_Reports/AI_Audit_Report.md
```

Câu nên nói:

```text
Phần này đáp ứng yêu cầu AI Audit bằng cách ghi lại tool, date/time, prompts, output summary và human corrections.
```

## Câu kết demo

Có thể dùng câu này:

```text
Workflow này thể hiện AI-first testing có human review. AI hỗ trợ sinh Domain Testing và BVA artifacts, nhưng tôi kiểm soát checkpoint, verify expected results, execute test cases trên SUT và chỉ report bug sau khi xác nhận.
```

## Checklist video

- Show `.agents/README.md`.
- Show `domain_testing/SKILL.md` phần Methodology Basis.
- Chạy Domain Step 1 only.
- Thực hiện hoặc giải thích human review.
- Chỉ chạy Domain Step 2 sau khi approve.
- Chỉ chạy Domain Step 3 sau khi approve.
- Chạy BVA Step 1 only.
- Thực hiện hoặc giải thích human review.
- Chỉ chạy BVA Step 2 sau khi approve.
- Show output được đưa vào `Main_Report.md`.
- Chạy hoặc giải thích `audit_extraction`.
- Nói rõ actual execution và bug confirmation do sinh viên thực hiện.
