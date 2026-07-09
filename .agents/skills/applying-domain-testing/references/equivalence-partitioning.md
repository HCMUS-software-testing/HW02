# Equivalence Partitioning

Use this sub-skill when the task asks for equivalence partitioning, equivalence classes, EP test cases, valid/invalid classes, or the EP part of a full Domain Testing artifact.

## Core Rule

Base EP on black-box specifications: identify input/output variables, identify equivalence classes from input/output conditions, choose at least one representative for each class, combine valid classes where possible, and isolate one invalid class per invalid test. Do not read implementation code to infer hidden rules.

Before creating equivalence classes, split each requirement into atomic conditions. One condition should express one check only: required/non-empty, type, format, range, length, membership set, uniqueness, state, or one cross-field relationship. Keep conditions atomic even when one condition may imply another during execution; record the coverage relationship in classes or test cases instead of hiding the weaker condition.

Partition each atomic input/output condition into classes that should be treated the same by the SUT. Keep classes minimal but behaviorally meaningful. Split a class when the specification, API contract, UI rule, acceptance criteria, business rule, or documented observable behavior says values should be handled differently.

## Workflow

1. Identify all inputs and outputs relevant to the function.
2. Convert each rule into atomic conditions. Include type, required/optional, format, range, length, membership set, uniqueness, state, and cross-field constraints as separate rows in section 2.2.
3. Do not merge conditions because they look redundant. For example, keep `email không rỗng` separate from `email đúng định dạng`, and keep `password không rỗng` separate from `password có độ dài tối thiểu 8 ký tự`. If a representative value for one invalid class also violates another condition, state that relationship in sections 2.3/2.4 and add a cleaner representative when needed.
4. Create equivalence classes:
   - For a range: one valid class, one lower-than-min invalid class, and one higher-than-max invalid class.
   - For a finite set with distinct behavior: one valid class per meaningful value plus invalid class(es).
   - For a must-be rule: one valid class and one invalid class.
   - For a required/non-empty rule: one non-empty valid class and one empty/missing invalid class.
   - For uniqueness or state: one class for available state and one for conflicting state.
   - For cross-field constraints: one class for satisfied relationship and one or more invalid relationship classes.
5. Number classes as `EC01`, `EC02`, etc. Include input/output, class description, valid/invalid status, representative value, and expected result. Use concrete representative values only when the specification or user-provided setup supplies them; otherwise use a defined variable tied to observable setup data, for example `price=X` where `X` is the unit price observed for the selected product.
6. Design EP test cases:
   - Cover as many valid classes as possible in one valid test.
   - For invalid tests, isolate exactly one invalid class while all unrelated inputs use nominal valid values.
   - Add interaction tests only when a cross-field condition is the target.
7. Trace every EP test case to the covered `ECxx` values.

## Output Sections

## 2. Phân hoạch tương đương

### 2.1. Đầu vào và đầu ra

| Loại      | Tên         | Mô tả                              |
| ---------- | ------------ | ------------------------------------ |
| Đầu vào | `<input>`  | `<ý nghĩa/nguồn quy tắc>`      |
| Đầu ra   | `<output>` | `<thành công/lỗi/trạng thái>` |

### 2.2. Điều kiện

List atomic conditions. Do not combine required/non-empty, type, format, range, length, membership, uniqueness, state, or cross-field checks into one row.

| Mã | Đầu vào/Đầu ra | Điều kiện   |
| --- | ------------------- | -------------- |
| C1  | `<field>`         | `<quy tắc>` |

### 2.3. Lớp tương đương

| EC   | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ?  | Giá trị đại diện | Kết quả mong đợi       |
| ---- | ------------------- | --------------------- | ---------- | --------------------- | -------------------------- |
| EC01 | `<field>`         | `<mô tả lớp>`    | Có/Không | `<giá trị>`       | `<kết quả mong đợi>` |

### 2.4. Ca kiểm thử EP

| TC   | Mục tiêu                                 | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi       |
| ---- | ------------------------------------------ | -------------------- | --------------------- | -------------------------- |
| TC01 | `<trọng tâm hợp lệ/không hợp lệ>` | `<giá trị>`      | EC01, EC02            | `<kết quả mong đợi>` |

## Quality Checks

- Every input and output from the function appears in section 2.1.
- Section 2.2 conditions are atomic and match the parent skill's section 2.2 rule.
- Every condition has at least one valid or invalid `ECxx`.
- Each invalid EP test isolates one invalid class unless explicitly documenting an interaction test.
- No condition is merged merely because another condition is stricter or often fails first during execution.
- Expected results are observable through UI text, API status/body, database state, or documented system state.
- EP is black-box: expected behavior comes from specifications, not source code or implementation internals.
- Representative values do not invent hidden system data; unspecified runtime values such as prices, balances, stock, ids, or generated totals are symbolic (`X`, `Y`, `X + Y`) unless provided by the black-box specification or user.
- Use Vietnamese with full accents, while preserving field names, endpoint names, codes, and quoted source text verbatim.
