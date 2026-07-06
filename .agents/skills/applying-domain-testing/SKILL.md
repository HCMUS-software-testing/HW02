---
name: applying-domain-testing
description: Use when designing Domain Testing, equivalence partitioning, equivalence classes, boundary value analysis, or EP/BVA test cases for a single function, API endpoint, form, feature, or input-validation rule.
---

# Applying Domain Testing

## Overview

Use this parent skill to coordinate Domain Testing for one function at a time. Domain Testing treats a large input/output domain as stratified samples: use Equivalence Partitioning (EP) to identify behaviorally meaningful classes, then use Boundary Value Analysis (BVA) for ordered domains with boundaries.

Base the testing method on the repo-root reference `references/04_Domain Testing.md`. If this skill and the reference appear to differ, follow the reference's sequence: identify input/output variables, identify equivalence classes from input/output conditions, choose representatives, then use boundary values as representatives for ordered fields.

Write final Domain Testing artifacts in Vietnamese with full accents and UTF-8-safe characters unless the user explicitly requests another language. Keep technical identifiers, API paths, field names, status codes, file names, and test IDs unchanged.

## Sub-Skills

Load the relevant sub-skill before producing detailed analysis:

| User request | Required sub-skill |
| --- | --- |
| Equivalence partitioning, equivalence classes, EP, valid/invalid classes | Read [Equivalence Partitioning](references/equivalence-partitioning.md) |
| Boundary value analysis, BVA, boundary values, min/max, ordered domains | Read [Boundary Value Analysis](references/boundary-value-analysis.md) |
| Full domain testing, EP and BVA, or unspecified domain testing | Read both sub-skills, then combine their outputs in the format below |

## Workflow

1. Read repo-root `references/04_Domain Testing.md` when available and use it as the method oracle for Domain Testing, EP, and BVA.
2. State the test function, scope, assumptions, and missing constraints in the `## 1. Chức năng kiểm thử` table. Do not invent hidden requirements; mark unclear points as assumptions.
3. Identify every input and output from the specification, code, API contract, or UI behavior.
4. Read the EP sub-skill and produce sections A1-A4. In A2, split requirements into atomic input/output conditions before deriving equivalence classes.
5. Read the BVA sub-skill and produce sections B1-B3 when the request includes BVA or full domain testing.
6. Trace every test case back to `ECxx` or a named boundary. Mark not-executed tests honestly if execution is outside scope.
7. Add only risk notes supported by requirements, specification, code, or observed ambiguity. Do not write an `AI gap analysis` section because the user will fill that part manually.

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
| Pool | `<pool hoặc nhóm chức năng>` |
| Feature | `<mã và tên feature>` |
| SUT | `<tên hệ thống/module>` |
| Giao diện/API tham chiếu | `<màn hình, endpoint, hàm, hoặc luồng liên quan>` |
| Phạm vi kiểm thử | `<phạm vi áp dụng domain testing>` |
| Ngoài phạm vi | `<những phần không kiểm thử trong artifact này>` |
| Giả định/ràng buộc thiếu | `<điểm chưa rõ từ requirement; đánh dấu là giả định>` |
| Trạng thái thực thi | `<đã thực thi/chưa thực thi/cần bổ sung actual result>` |

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

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| TC01 | `<trọng tâm hợp lệ/không hợp lệ>` | `<giá trị>` | EC01, EC02 | `<kết quả mong đợi>` |

### B. Phân tích giá trị biên

Use the Boundary Value Analysis sub-skill for sections B1-B3.

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `<field/output>` | `<số/độ dài/ngày/số lượng/khác>` | Có/Không | `<vì sao có hoặc không có biên>` |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `<field>` | `<min/max/độ dài/ngày/số lượng>` | `<min-1, min, min+1...>` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV01 | `<field>` | `<min-1/min/min+1>` | `<giá trị>` | `<kết quả mong đợi>` |

## 5. Ghi chú rủi ro

- `<rủi ro, điểm mơ hồ, hoặc giới hạn cần người học rà soát thủ công>`
- Không viết phần `AI gap analysis` trong artifact; phần đó để user tự điền.

## Quality Checks

- Read every required sub-skill before writing the related section.
- Use repo-root `references/04_Domain Testing.md` as the method reference when it is available in the repo.
- Every input and output from the function appears in A1 unless the user requested BVA-only and the field is irrelevant to BVA.
- A2 conditions are atomic; do not merge required/non-empty, format, length, membership, uniqueness, state, and cross-field relationship checks into the same row.
- Every condition has at least one valid or invalid `ECxx` when EP is in scope, or is explicitly covered by a representative `ECxx` that states the related condition IDs.
- BVA is applied only to continuous, numeric, date, length, count, or otherwise ordered domains.
- Boundary dates state the reference date explicitly.
- Expected results are observable, not vague phrases like "works correctly".
- The final artifact uses `## 1. Chức năng kiểm thử`, not `## 1. Chức năng dưới kiểm thử`.
- Section 5 is `## 5. Ghi chú rủi ro`; do not generate an `AI gap analysis` section.
