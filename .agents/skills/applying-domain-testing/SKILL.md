---
name: applying-domain-testing
description: Use when designing black-box Domain Testing, equivalence partitioning, equivalence classes, boundary value analysis, or EP/BVA test cases from project-feature specifications for a function, API endpoint, form, feature, or input-validation rule.
---

# Applying Domain Testing

## Overview

Use this parent skill to coordinate Domain Testing for one project-feature at a time. Domain Testing is a black-box testing technique: derive tests from specifications and observable expected behavior, not from implementation code.

Domain Testing includes Equivalence Partitioning (EP) and Boundary Value Analysis (BVA). It treats a large input/output domain as stratified samples: partition the domain into behaviorally meaningful equivalence classes, then use boundary values as strong representatives for ordered domains.

## Expected Input

Use the project-feature as the unit of work. The user may provide a project name, feature name or ID, requirement text, UI rules, API contract, acceptance criteria, business rules, or test objective.

If specifications are incomplete, ask for the missing rule when it blocks analysis; otherwise record the gap as an assumption. Do not read or inspect source code, database implementation, validators, routes, services, or other implementation internals to infer hidden behavior.

## Built-In Domain Testing Method

Use this method directly so the skill is portable across repositories:

1. Identify input and output variables from the specification.
2. Identify equivalence classes for each input and output condition.
3. Choose a best representative value for each equivalence class.
4. For ordered fields, use boundary values as the best representatives.

For EP, divide the possible values of each field into sub-domains whose expected results should be the same. Two tests belong to the same equivalence class when their expected result is the same. Valid equivalence classes represent valid inputs or outputs; invalid equivalence classes represent invalid inputs or outputs.

For BVA, apply boundary analysis only where the specification defines a meaningful ordered domain such as number, length, date/time, quantity, count, money, pagination, or a documented threshold. Do not force BVA onto unordered categories, booleans, or free text without a specified boundary.

Use these partitioning rules:

- Range condition: one valid class, one below-min invalid class, and one above-max invalid class.
- Finite set with distinct behavior: one valid class per meaningful value and at least one invalid class.
- Must-be condition: one valid class and one invalid class.
- Required/non-empty condition: one present/non-empty valid class and one missing/empty invalid class.
- Cross-field condition: one valid relationship class and one or more invalid relationship classes.

When selecting test cases, choose at least one representative from each equivalence class. Combine valid classes where possible. For invalid EP tests, isolate one invalid class per test while keeping unrelated inputs nominal and valid.

When a representative or expected value depends on runtime system data that is not specified by the black-box sources, do not invent a concrete value. Use a clearly defined symbolic variable instead, such as `X` for the observed unit price of product A, `Y` for product B, `2X` for a line total, or `2X + Y` for a cart total. State in assumptions or test data that the tester must observe `X`/`Y` from the UI/API during setup. Keep concrete values only when they come from the specification, the user-provided test data, or a documented boundary.

Write final Domain Testing artifacts in Vietnamese with full accents and UTF-8-safe characters unless the user explicitly requests another language. Keep technical identifiers, API paths, field names, status codes, file names, and test IDs unchanged.

## Sub-Skills

Load the relevant sub-skill before producing detailed analysis:

| User request | Required sub-skill |
| --- | --- |
| Equivalence partitioning, equivalence classes, EP, valid/invalid classes | Read [Equivalence Partitioning](references/equivalence-partitioning.md) |
| Boundary value analysis, BVA, boundary values, min/max, ordered domains | Read [Boundary Value Analysis](references/boundary-value-analysis.md) |
| Full domain testing, EP and BVA, or unspecified domain testing | Read both sub-skills, then combine their outputs in the format below |

## Workflow

1. Confirm the project-feature, specification source, scope, assumptions, and missing constraints in the `## 1. Chức năng kiểm thử` table. Do not invent hidden requirements; mark unclear points as assumptions.
2. Use only black-box sources: requirement/specification text, user-provided UI rules, API contract, acceptance criteria, business rules, and documented observable behavior. Do not read implementation code or derive expectations from code.
3. Identify every input and output from the specification.
4. Read the EP sub-skill and produce sections A1-A4. In A2, split requirements into atomic input/output conditions before deriving equivalence classes.
5. Read the BVA sub-skill and produce sections B1-B3 when the request includes BVA or full domain testing.
6. Choose representative test data from the specification or observable setup data. If a value such as price, stock, account balance, catalog id, or server-generated amount is not available from black-box context, define it as a variable (`X`, `Y`, etc.) and express expected calculations symbolically.
7. Trace every test case back to `ECxx` or a named boundary. For executable testcase tables, include blank `Kết quả thực tế` and `Đạt` columns so the student can fill them after running tests. When the same testcase is intended to be executed through both UI/web and API/Postman, the `Kết quả mong đợi` cell must explicitly include both observable outcomes, labeled `Web:` and `API:`; include the expected API status code/body when specified, or state the documented contract gap when the API cannot check a UI-only field such as `confirmPassword`. Mark not-executed tests honestly if execution is outside scope.
8. Add only risk notes supported by the specification or observed ambiguity. Do not write an `AI gap analysis` section because the user will fill that part manually.

## Language and Encoding

- Use Vietnamese for headings, descriptions, assumptions, expected results, notes, and analysis.
- Preserve original language for quoted requirements, exact UI/API messages, code identifiers, usernames, emails, URLs, commands, and evidence paths.
- Use proper Vietnamese accents such as `Đăng ký tài khoản`, `Điều kiện`, `Kết quả mong đợi`, and `Cần rà soát thủ công`.
- Save Markdown artifacts as UTF-8. Do not replace Vietnamese characters with mojibake or ASCII fallbacks such as `Dang ky tai khoan` unless the source text itself is ASCII.
- If writing an audit entry, follow the audit skill's rule: prompt and output in each audit entry remain verbatim in their original language, not translated.

## Output Format

Use this Vietnamese structure for final artifacts. If the user requests only EP or only BVA, include section 1, the requested analysis section, and section 5.

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | `<tên project hoặc hệ thống>` |
| Feature | `<mã và tên feature>` |
| SUT | `<tên hệ thống/module>` |
| Specification tham chiếu | `<requirement, API contract, UI rule, acceptance criteria, hoặc business rule>` |
| Giao diện/API tham chiếu | `<màn hình, endpoint, hàm, hoặc luồng liên quan>` |
| Phạm vi kiểm thử | `<phạm vi áp dụng domain testing>` |
| Ngoài phạm vi | `<những phần không kiểm thử trong artifact này>` |
| Giả định/ràng buộc thiếu | `<điểm chưa rõ từ requirement; đánh dấu là giả định>` |
| Trạng thái thực thi | `<đã thực thi/chưa thực thi/cần bổ sung Kết quả thực tế và Đạt>` |

### A. Phân hoạch tương đương

Use the Equivalence Partitioning sub-skill for sections A1-A4.

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `<input>` | `<ý nghĩa/nguồn quy tắc>` |
| Đầu ra | `<output>` | `<thành công/lỗi/trạng thái>` |

#### A2. Điều kiện

List atomic conditions. One row should express one check only: required/non-empty, type, format, min length, max length, membership set, uniqueness, state, or one cross-field relationship. Do not combine conditions just because one may imply another during execution. If a stricter rule makes a weaker rule redundant for test-case design, keep both rows in A2 and mention the coverage relationship in A3/A4 instead of hiding the weaker condition.

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `<field>` | `<quy tắc>` |

Example:

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `email` | `email` không được rỗng. |
| C2 | `email` | `email` phải đúng định dạng `user@domain.com`. |
| C3 | `password` | `password` không được rỗng. |
| C4 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C5 | `password` | `password` có ít nhất 1 chữ hoa. |
| C6 | `password` | `password` có ít nhất 1 chữ thường. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `<field>` | `<mô tả lớp>` | Có/Không | `<giá trị>` | `<kết quả mong đợi>` |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| TC01 | `<trọng tâm hợp lệ/không hợp lệ>` | `<giá trị>` | EC01, EC02 | `Web: <kết quả mong đợi trên giao diện>. API: <status/body hoặc lỗi API mong đợi>.` |  |  |

### B. Phân tích giá trị biên

Use the Boundary Value Analysis sub-skill for sections B1-B3.

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `<field/output>` | `<số/độ dài/ngày/số lượng/khác>` | Có/Không | `<vì sao có hoặc không có biên>` |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `<field>` | `<min/max/độ dài/ngày/số lượng>` | `<min-1, min, min+1...>` |

For cross-field equality relationships such as `confirmPassword` matching `password`, do not invent unrelated length boundaries. In B2, list the relationship values as `khớp toàn bộ`, `khác 1 ký tự`, `thiếu 1 ký tự`, and `dư 1 ký tự so với password`; keep required/non-empty length boundaries separate, for example `length=0` and `length=1`.

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV01 | `<field>` | `<min-1/min/min+1>` | `<giá trị>` | `Web: <kết quả mong đợi trên giao diện>. API: <status/body hoặc lỗi API mong đợi>.` |  |  |

## 5. Ghi chú rủi ro

- `<rủi ro, điểm mơ hồ, hoặc giới hạn cần người học rà soát thủ công>`
- Không viết phần `AI gap analysis` trong artifact; phần đó để user tự điền.

## Quality Checks

- Read every required sub-skill before writing the related section.
- Treat Domain Testing as black-box testing: EP and BVA must be derived from specifications, not source code.
- Use the built-in Domain Testing method in this skill; do not depend on repo-local reference files.
- The artifact clearly identifies the input project-feature.
- Values not supplied by the black-box specification or user-provided setup are not invented; they are represented with defined variables such as `X`/`Y` and tied to observable setup data.
- Every input and output from the function appears in A1 unless the user requested BVA-only and the field is irrelevant to BVA.
- A2 conditions are atomic; do not merge required/non-empty, format, length, membership, uniqueness, state, and cross-field relationship checks into the same row.
- Every condition has at least one valid or invalid `ECxx` when EP is in scope, or is explicitly covered by a representative `ECxx` that states the related condition IDs.
- A4 and B3 testcase tables include `Kết quả thực tế` and `Đạt` as the final two columns, left blank during design unless the user explicitly provides execution results.
- If testcase execution scope includes both UI/web and API/Postman, every A4 and B3 `Kết quả mong đợi` value includes both `Web:` and `API:` outcomes; API expected results mention status code/body when the contract specifies them.
- BVA is applied only to continuous, numeric, date, length, count, or otherwise ordered domains.
- Boundary dates state the reference date explicitly.
- Expected results are observable, not vague phrases like "works correctly".
- The final artifact uses `## 1. Chức năng kiểm thử`, not `## 1. Chức năng dưới kiểm thử`.
- Section 5 is `## 5. Ghi chú rủi ro`; do not generate an `AI gap analysis` section.
