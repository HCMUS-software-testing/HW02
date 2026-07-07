# Boundary Value Analysis

Use this sub-skill when the task asks for boundary value analysis, BVA, boundary values, min/max testing, ordered domains, or the BVA part of a full Domain Testing artifact.

## Core Rule

Base BVA on black-box specifications: use boundary values as the best representatives for ordered fields because programs are more likely to fail at boundaries. Do not read implementation code to infer hidden min/max, length, date, count, stock, money, or pagination limits.

Apply BVA only to inputs or outputs with meaningful order and boundaries. Do not force BVA onto unordered enums, free-text categories without length rules, boolean values, or membership sets where EP is sufficient.

## Workflow

1. Identify domains that may support BVA:
   - numeric values;
   - string length;
   - dates or times;
   - quantity, count, pagination, stock, or money;
   - ordered states with documented thresholds.
2. Decide explicitly whether BVA applies to each input/output. Record `Có` or `Không` with a reason.
3. Identify boundaries and adjacent values:
   - With both min and max: test `min-1`, `min`, `min+1`, nominal, `max-1`, `max`, `max+1`.
   - With only a minimum: test just outside, on, and just inside the lower boundary.
   - With only a maximum: test just inside, on, and just outside the upper boundary.
   - For length boundaries, use concrete sample strings whose lengths are visible.
   - For cross-field equality relationships such as `confirmPassword` matching `password`, record relationship values as exact match, differs by 1 character, missing 1 character, and adding 1 extra character compared with `password`; do not add arbitrary `length=2` or other length values unless the specification defines that boundary.
   - For dates, state the reference date explicitly.
4. Design BVA test cases. Keep unrelated inputs nominal and valid so the expected result focuses on the boundary under test.
5. Trace every BVA test case to a named boundary such as `password length = 7`, `password length = 8`, or `quantity max+1`.

## Output Sections

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền                                 | Có áp dụng BVA? | Lý do                                   |
| ------------------- | ------------------------------------------- | ------------------ | ---------------------------------------- |
| `<field/output>`  | `<số/độ dài/ngày/số lượng/khác>` | Có/Không         | `<vì sao có hoặc không có biên>` |

#### B2. Xác định biên và giá trị cận biên

| Trường    | Quy tắc biên                            | Giá Trị biên và cận biên |
| ----------- | ----------------------------------------- | ------------------------------ |
| `<field>` | `<min/max/độ dài/ngày/số lượng>` | `<min-1, min, min+1...>`     |

#### B3. Ca kiểm thử BVA

| TC   | Trường    | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi       |
| ---- | ----------- | ------------------------ | -------------------- | -------------------------- |
| BV01 | `<field>` | `<min-1/min/min+1>`    | `<giá trị>`      | `<kết quả mong đợi>` |

## Quality Checks

- BVA includes step B1 before listing values, so the artifact explains why each field is or is not boundary-testable.
- BVA includes step B2 before test cases, so the artifact separates boundary identification from case design.
- Boundary values are concrete and executable, not abstract placeholders.
- Boundary dates include an explicit reference date.
- BVA is not applied to unordered enums or free-form fields without a documented length, range, count, or ordering rule.
- Expected results are observable through UI text, API status/body, database state, or documented system state.
- BVA is black-box: boundaries come from specifications, not source code or implementation internals.
- Use Vietnamese with full accents, while preserving field names, endpoint names, codes, and quoted source text verbatim.
