# Hướng dẫn quay demo Agent Skills

File này dùng như kịch bản ngắn khi quay video demo Agent Skills cho HW02.

## Mục tiêu demo

Chứng minh rằng Agent Skills hướng dẫn AI thực hiện Domain Testing và Boundary Value Analysis theo quy trình **AI-first, human-review**.

Video cần thể hiện:

- Skill có thể tái sử dụng cho nhiều feature.
- Skill bám theo `04_Domain Testing.pdf` và cách trình bày trong `23127205.pdf`.
- AI không sinh toàn bộ kết quả trong một lần.
- Người làm review từng checkpoint trước khi cho AI tiếp tục.
- Output cuối được đưa vào `Main_Report.md` và được ghi lại trong `AI_Audit_Report.md`.

## Feature nên dùng để demo

Nên dùng FR-04: Personal profile management.

Lý do:

- Input rõ: `name`, `shipping_address`, `phone`, authentication state.
- Output/state rõ: profile displayed, update success, validation/unauthorized behavior, unchanged profile.
- Dễ giải thích hơn checkout hoặc admin CRUD.

## Các file nên mở đầu video

Mở lần lượt:

1. `.agents/README.md`
2. `.agents/skills/domain_testing/SKILL.md`
3. `.agents/skills/domain_testing/references/domain_testing_method.md`
4. `.agents/skills/domain_testing/references/report_style_23127205.md`
5. `.agents/skills/bva_testing/SKILL.md`
6. `.agents/skills/bva_testing/references/bva_method.md`
7. `.agents/skills/audit_extraction/SKILL.md`
8. `.agents/skills/audit_extraction/references/hw02_audit_requirements.md`
9. `references/development_process/Feature_Contexts.md`
10. `references/development_process/HW02_FR_Workflow.md`

Câu giải thích ngắn:

```text
Đây là bộ native Agent Skills dùng cho HW02. Skill không tự chạy test và không tự kết luận bug. Skill hướng dẫn AI tạo phân tích Domain Testing/BVA theo từng bước, còn em review output, execute test trên SUT, ghi actual result và confirmed bugs.
```

## Bước demo 1: Chuẩn bị Feature Context

Mở `references/development_process/Feature_Contexts.md`, copy block FR-04.

Câu nên nói:

```text
Em không để AI tự nghĩ context từ đầu. Context được chuẩn bị từ requirement, API spec công khai và UI/SUT behavior quan sát được; không dùng source code để thiết kế test. Điểm nào chưa có căn cứ sẽ không được đưa vào bảng chính cho đến khi được verify.
```

## Bước demo 2: Chạy Domain Testing Step 1

Prompt:

```text
Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`.
Dùng context FR-04 trong `HW02/references/development_process/Feature_Contexts.md`.

Chỉ thực hiện Step 1: xác định Input và Output.
Chưa tạo Condition, EP hoặc bảng Test Case.
```

Nếu AI không đọc được file, dùng fallback:

```text
Em sẽ paste trực tiếp nội dung skill và context của feature.

[Paste nội dung từ HW02/.agents/skills/domain_testing/SKILL.md]

[Paste context FR-04 từ HW02/references/development_process/Feature_Contexts.md]

Hãy làm đúng theo skill. Chỉ thực hiện Step 1.
```

Cần review:

- Bảng Input/Output đã đúng cấu trúc chưa? Có cột Rationale giải thích cơ sở lựa chọn chưa?
- Các biến đầu vào và đầu ra đã được xác định đầy đủ và có căn cứ chưa?
- AI có tự bịa validation rule nào chưa được verify không?

## Bước demo 3: Duyệt Domain Step 1 và chạy Step 2

Prompt:

```text
OK. Tiếp tục Step 2: xác định Condition.
```

Cần review:

- Bảng Điều kiện có cột giải thích luật nghiệp vụ (Rationale) đầy đủ không?
- Condition có được đánh mã C1, C2, C3... rõ ràng và liên kết đúng tham số không?
- Điểm chưa có căn cứ có bị trình bày như requirement không?

## Bước demo 4: Duyệt Domain Step 2 và chạy Step 3

Prompt:

```text
OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP).
```

Cần review:

- Bảng EP có đầy đủ cột Loại phân hoạch (Valid/Invalid), Giá trị đại diện và lý do lựa chọn không?
- Các lớp EP có được đối chiếu chính xác với mã điều kiện C tương ứng không?
- Invalid EP có vi phạm đúng một condition chính để đáp ứng Single Fault không?

## Bước demo 5: Duyệt Domain Step 3 và chạy Step 4

Prompt:

```text
OK. Tiếp tục Step 4: xác định Test Case.
```

Câu nên nói:

```text
Theo bài giảng và file mẫu, bảng cuối của EP được trình bày như bảng Test Case. Với valid classes, AI có thể cover chung để giảm số test; với invalid classes, mỗi test chỉ nên isolate một lỗi chính. Các cột actual/status/evidence chỉ được điền sau khi execute trên SUT.
```

## Bước demo 6: Chạy BVA Step 1

Prompt:

```text
Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`.
Dùng Domain Testing output đã được duyệt và context FR-04 trong `HW02/references/development_process/Feature_Contexts.md`.

Chỉ thực hiện Step 1: xác định biến có thể áp dụng BVA.
Chưa xác định giá trị biên chi tiết và chưa sinh BVA test case.
```

Cần review:

- Boundary candidate có nguồn rõ không?
- Biến nào không áp dụng BVA đã được loại ra với lý do chưa?
- Có boundary nào bị AI tự bịa không?
- Boundary nào chỉ là exploratory, không phải formal BVA?

## Bước demo 7: Duyệt BVA Step 1 và chạy Step 2

Prompt:

```text
OK. Tiếp tục Step 2: xác định giá trị biên và cận biên.
```

Câu nên nói:

```text
BVA chỉ được tạo khi boundary có căn cứ. Nếu không có min/max explicit, skill phải ghi không có biên explicit thay vì tự chọn số. Bảng BVA Step 2 có cột Rationale để làm rõ nguồn gốc của các biên này nhằm tăng tính thuyết phục khi vấn đáp.
```

## Bước demo 8: Duyệt BVA Step 2 và chạy Step 3

Prompt:

```text
OK. Tiếp tục Step 3: xác định BVA Test Case.
```

Câu nên nói:

```text
Khi test một boundary variable, các biến còn lại giữ nominal valid values để cô lập hành vi tại biên.
```

## Bước demo 9: Đưa output vào Main Report

Show nơi output sẽ được đưa vào:

```text
Main_Report.md
```

Câu giải thích:

```text
AI output không được nộp raw. Em review, chỉnh sửa, rồi đưa phần analysis đã duyệt vào section FR-04 của main report.
```

Câu nói thêm khi show template execution:

```text
Phần actual result không được AI tự điền. Sau khi thiết kế xong test cases, em execute Domain test cases và BVA test cases riêng trên SUT, rồi điền `Kết quả thực tế`, `Trạng thái`, và `Bug ID / Evidence` ngay trong bảng test case tương ứng. Bug report chi tiết nằm ở artifact riêng, không viết trong main report.
```

## Bước demo 10: Chạy Audit Extraction

Prompt:

```text
Đọc và làm theo `HW02/.agents/skills/audit_extraction/SKILL.md`.
Tạo audit entry cho session Domain Testing và BVA của FR-04.
Không đưa các câu hỏi meta về workflow vào audit nếu chúng không tạo/sửa artifact cuối cùng.
```

Show nơi audit sẽ được đưa vào:

```text
AI_Audit_Report.md
```

## Bước demo 11: Quay test execution trực tiếp

Phần này dùng để chứng minh rằng actual result và bug không chỉ do AI sinh ra, mà được kiểm chứng trên SUT.

### Option A: Demo API/script execution

Mở thư mục:

```text
references/execution_scripts
```

Giải thích ngắn:

```text
Các script này được lưu trong references vì chúng là evidence kỹ thuật hỗ trợ execution, không phải Agent Skill. Agent Skill tạo test design; script và thao tác SUT dùng để xác nhận actual result.
```

Có thể chạy một script ngắn nhất hoặc dễ giải thích nhất:

```text
node HW02/references/execution_scripts/test_fr04.js
node HW02/references/execution_scripts/test_fr08_checkout.js
node HW02/references/execution_scripts/test_fr15.js
```

Khi quay, chỉ cần show:

- Backend SUT đang chạy.
- Chạy một script.
- Kết quả pass/fail hoặc API response bất thường.
- Dòng test case tương ứng trong `Main_Report.md`.
- Bug tương ứng trong `Bug_Report.md`.

### Option B: Demo UI/mobile execution

Nên chọn FR-06 nếu muốn demo trực quan:

1. Mở mobile app qua Expo Web.
2. Vào danh sách sản phẩm.
3. Chọn `Xem chi tiết`.
4. Show product detail thiếu danh mục hoặc thiếu breadcrumb.
5. Nhập `quantity=0` hoặc `abc`.
6. Bấm `Thêm vào giỏ hàng`.
7. Show badge giỏ hàng vẫn tăng.
8. Mở [Bug_Report.md](./Bug_Report.md) và show `BUG-FR06-02` hoặc `BUG-FR06-03`.
9. Mở [screenshots/FR06](./screenshots/FR06) để show ảnh bằng chứng đã lưu.

Câu nên nói:

```text
Đây là bước execute trực tiếp trên SUT. Kết quả actual được ghi vào Main_Report sau khi quan sát, còn bug chi tiết và ảnh evidence nằm trong Bug_Report_Template và thư mục screenshots.
```

## Câu kết demo

```text
Workflow này thể hiện AI-first testing có human review. AI hỗ trợ sinh Domain Testing và BVA artifacts, nhưng em kiểm soát checkpoint, verify expected results, execute test cases trên SUT và chỉ report bug sau khi xác nhận.
```

## Checklist video

- Show `.agents/README.md`.
- Show `domain_testing/SKILL.md` và `domain_testing/references/`.
- Show `references/development_process/Feature_Contexts.md`.
- Chạy Domain Step 1 only.
- Review hoặc giải thích human review.
- Chỉ chạy Domain Step 2 sau khi approve.
- Chỉ chạy Domain Step 3 sau khi approve.
- Chỉ chạy Domain Step 4 sau khi approve.
- Chạy BVA Step 1 only.
- Review hoặc giải thích human review.
- Chỉ chạy BVA Step 2 sau khi approve.
- Chỉ chạy BVA Step 3 sau khi approve.
- Show output được đưa vào `Main_Report.md`.
- Show các cột execution nằm trong bảng Domain Test Case và BVA Test Case.
- Show một execution script hoặc thao tác UI/mobile trực tiếp trên SUT.
- Show bug report và screenshot evidence tương ứng.
- Chạy hoặc giải thích `audit_extraction`.
- Nói rõ actual execution và bug confirmation do sinh viên thực hiện.
