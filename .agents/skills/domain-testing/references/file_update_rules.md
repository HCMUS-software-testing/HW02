# Quy tắc Ghi File — Domain Testing Skill

Tài liệu này quy định chính xác **vị trí append** và **cách cập nhật** từng file khi hoàn thành domain testing cho một feature.

---

## File 1: `Main_Report.md`

### Vị trí ghi
Append **sau dòng cuối cùng** của file `Main_Report.md`, thêm dấu ngăn cách:

```markdown
---

### [POOL_LABEL]: [FEATURE_ID]: [FEATURE_NAME]

#### Bước 1: ...
...
```

### Nội dung cần ghi
Toàn bộ 5 bước theo template trong `report_template.md`:
- Bước 1: Biến I/O
- Bước 2: Equivalence Partitioning (EP)
- Bước 3: Representatives + EP Test Cases
- Bước 4: Boundary Value Analysis (BVA) + BVA Test Cases
- Bước 5: AI Gap Analysis

### ⚠️ Quy tắc bắt buộc
- Cột **"Kết quả thực tế (Actual Output)"** trong tất cả bảng test case: **để trống** (`| |`)
- Cột **"Trạng thái (Pass/Fail)"** trong tất cả bảng test case: **để trống** (`| |`)
- **TUYỆT ĐỐI KHÔNG ĐIỀN** bất kỳ giá trị nào vào 2 cột này

---

## File 2: `README.md`

### Bảng tự đánh giá (Self-Assessment Table) — Section 2
Cập nhật hàng tương ứng với Pool đang thực hiện:
- **Trước khi tạo test case**: Giữ nguyên `*[TBD]*`
- **Sau khi thiết kế xong**: Điền điểm tự đánh giá tạm thời (thường là điểm tối đa vì đã hoàn thành)
- **Ví dụ**: Pool B (Feature B) → cập nhật hàng `**2**`

### Bảng thống kê Test Summary — Section 3
Cập nhật **toàn bộ** các số liệu thống kê sau khi hoàn thành feature mới:

```markdown
*   **Số lượng tính năng kiểm thử (Number of features):** [N] tính năng
*   **Tổng số kịch bản kiểm thử thiết kế (Test cases designed):** [Tổng] kịch bản
    *   *Phân hoạch tương đương (EP):* [N] kịch bản
    *   *Phân tích giá trị biên (BVA):* [N] kịch bản
*   **Số lượng kịch bản đã thực thi (Test cases executed):** [N] kịch bản *(cập nhật sau khi chạy)*
*   **Số lượng kịch bản đạt (Test cases passed):** [N] kịch bản *(cập nhật sau khi chạy)*
*   **Số lượng kịch bản lỗi (Test cases failed):** [N] kịch bản *(cập nhật sau khi chạy)*
*   **Số lượng kịch bản chưa thực thi (Test cases not yet executed):** [N] kịch bản
*   **Số lượng lỗi phát hiện được (Number of bugs):** [N] lỗi *(cập nhật sau khi chạy)*
```

> **Lưu ý**: Khi chỉ thiết kế test case (chưa thực thi), set:
> - "Test cases executed" = 0
> - "Test cases passed" = 0
> - "Test cases failed" = 0  
> - "Test cases not yet executed" = tổng số test cases thiết kế

---

## File 3: `AI_Audit_Report.md`

### Vị trí ghi
Append một Prompt Log mới vào **cuối file** `AI_Audit_Report.md`.

### Format Prompt Log
Đánh số prompt tiếp theo theo thứ tự (Prompt N+1, với N là số prompt hiện có):

```markdown
### Prompt [N]

*   **Công cụ AI sử dụng (Name of AI Tool):** [Tên AI tool, ví dụ: Gemini 2.5 Flash]
*   **Thời gian thực hiện (Date and Time):** [YYYY-MM-DD, HH:MMPM/AM]
*   **Mục đích:** Thực hiện kỹ thuật Domain Testing (EP + BVA) cho tính năng [FEATURE_ID]: [FEATURE_NAME] — bao gồm xác định biến I/O, phân hoạch tương đương, phân tích giá trị biên và AI Gap Analysis.

#### Prompt

\`\`\`text
Thực hiện domain testing với [POOL_LABEL]: [FEATURE_ID]
\`\`\`

#### Output

\`\`\`text
Đã hoàn thành kiểm thử miền cho tính năng [FEATURE_ID]: [FEATURE_NAME].

Kết quả đã được ghi vào Main_Report.md:
- Bước 1: Xác định [N] biến đầu vào và [N] biến đầu ra.
- Bước 2: Phân hoạch [N] lớp tương đương (EC01 đến EC[N]).
- Bước 3: Thiết kế [N] test cases EP (TC01 đến TC[N]).
- Bước 4: Phân tích giá trị biên, thiết kế [N] test cases BVA (TC-BVA-01 đến TC-BVA-[N]).
- Bước 5: AI Gap Analysis — ghi nhận [N] kịch bản bị bỏ sót và [N] vấn đề AI Critique.

README.md, AI_Audit_Report.md và Bug_Report.md đã được cập nhật tương ứng.
\`\`\`

File [Main_Report.md](./Main_Report.md) đã được bổ sung đầy đủ nội dung Domain Testing cho [FEATURE_ID].
```

### ⚠️ Lưu ý
- Thời gian thực hiện: Lấy thời gian thực tế của cuộc hội thoại (từ metadata).
- Tên AI Tool: Ghi theo model đang được sử dụng trong session đó.

---

## File 4: `Bug_Report.md`

### Vị trí ghi
Append vào **cuối file** `Bug_Report.md`, ngay sau nội dung hiện có.

### Nội dung cần ghi (Placeholder)

Giai đoạn thiết kế test case (chưa thực thi), chỉ tạo một placeholder để đánh dấu vị trí:

```markdown
---

## Danh sách lỗi tổng hợp - [FEATURE_ID]: [FEATURE_NAME]

> ⚠️ **Lưu ý:** Các test case cho [FEATURE_ID] chưa được thực thi. Section này sẽ được bổ sung sau khi hoàn thành chạy kiểm thử.

*Sau khi thực thi các test cases trong Main_Report.md (phần [POOL_LABEL]: [FEATURE_ID]) và điền kết quả Actual Output, hãy tổng hợp các test case Fail thành các mục BUG theo format sau:*

| Mã Bug | Tên lỗi (Bug Name) | Mã TC phát hiện | Mô tả hành vi lỗi quan sát | Độ nghiêm trọng (Severity) | Trạng thái |
| :---: | :--- | :---: | :--- | :---: | :---: |
| **BUG-[FEATURE_ID]-01** | *[Tên lỗi]* | *[Mã TC]* | *[Mô tả hành vi]* | *[Critical/High/Medium/Low]* | Open |
```

### Quy tắc sau khi thực thi test

Sau khi đã chạy test và có Actual Output, thực hiện:

> **⚠️ Quy tắc quan trọng: 1 Bug = 1 Lỗi trong hệ thống (root cause), KHÔNG phải 1 TC Fail = 1 Bug.**
> Nhiều TC có thể cùng phát hiện **một bug duy nhất** do cùng nguyên nhân gốc. Ví dụ: BUG-FR02-01 được phát hiện bởi cả TC05, TC-BVA-02, TC-BVA-03 — chỉ tạo **1 mục bug**, ghi tất cả mã TC vào cột "Mã TC phát hiện".

**Quy trình phân tích**:
1. Liệt kê tất cả các TC có trạng thái **Fail**
2. **Nhóm các TC Fail** theo nguyên nhân gốc (root cause) — tức là cùng mô tả sai lệch hành vi hệ thống so với đặc tả
3. Mỗi nhóm root cause = **1 mục Bug** duy nhất trong Bug_Report.md
4. Với mỗi Bug, điền đầy đủ theo format:
   - **Mã Bug**: `BUG-[FEATURE_ID]-0X` (số thứ tự tăng dần)
   - **Tên lỗi**: Mô tả ngắn gọn hành vi sai so với đặc tả
   - **Mã TC phát hiện**: Liệt kê TẤT CẢ các mã TC Fail cùng phát hiện bug này (ví dụ: `TC05`, `TC-BVA-02`, `TC-BVA-03`)
   - **Steps to Reproduce**: Các bước tái hiện từ TC điển hình nhất của nhóm
   - **Expected Output**: Lấy từ cột Expected Output của TC tương ứng
   - **Actual Output**: Lấy từ cột Actual Output đã điền sau thực thi
   - **Severity**: Critical / High / Medium / Low
   - **GitHub Issue**: `[GitHub Issue #N](link)`
   - **Screenshot**: `![Screenshot](screenshots/BUG-[FEATURE_ID]-0X.png)`

### ⚠️ Quan trọng
- Bug_Report.md placeholder được tạo ngay **khi thiết kế** (giai đoạn domain testing).
- Nội dung chi tiết các Bug chỉ có thể điền **sau khi thực thi** test cases và quan sát Actual Output.
