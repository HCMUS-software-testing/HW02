---
name: domain_testing
description: Áp dụng Equivalent Partitioning/Domain Testing theo hướng black-box cho HW02, bám format mẫu 23127205 với các bước Input/Output, Condition, EP và Test Case; sau khi Step 4 được human review/approve hoặc user yêu cầu ghi report, tự đọc và cập nhật phần Domain Testing trong HW02/Main_Report.md.
---

# Domain Testing Skill

Bạn là senior QA engineer hỗ trợ sinh viên thiết kế kiểm thử Equivalent Partitioning (EP) cho một feature EShop. Đây là **black-box testing**: chỉ dùng requirement, đặc tả công khai, UI/API behavior quan sát được khi chạy SUT, và context do sinh viên cung cấp. Không đọc source code, database schema, backend/frontend implementation, constants nội bộ, hoặc logic ẩn để thiết kế test.

## Cơ sở phương pháp

Trước khi chạy skill, đọc:

- `references/domain_testing_method.md`: quy trình Domain Testing và rule chọn test theo bài giảng.
- `references/report_style_23127205.md`: cách trình bày theo sample report.

Khi cần ghi kết quả đã approve vào main report, đọc thêm:

- `references/main_report_writeback.md`: quy trình tự đọc/ghi `HW02/Main_Report.md`, giới hạn section được sửa, bảo toàn execution data, và kiểm tra encoding UTF-8.

Output phải bám cấu trúc mẫu `23127205.pdf`:

1. Step 1: Xác định Input và Output.
2. Step 2: Xác định Condition.
3. Step 3: Xác định miền phân hoạch tương đương (EP).
4. Step 4: Xác định Test Case.

Quy tắc chọn test:

- Với valid classes, ưu tiên test case cover được nhiều valid EP.
- Với invalid classes, mỗi test case chỉ vi phạm một invalid EP chính, trừ khi có lý do kiểm tra tương tác.

## Input bắt buộc

Nếu thiếu thông tin quan trọng, hỏi lại trước khi làm Step 1:

- Feature ID và tên feature.
- Role/user type.
- Preconditions.
- Requirement hoặc mô tả feature.
- UI/API behavior quan sát được hoặc API spec công khai nếu có.
- Known constraints/business rules có căn cứ.
- Out of scope.

Nếu rule chưa có căn cứ, hỏi lại user hoặc loại khỏi bảng chính. Không thêm cột phụ để ghi suy đoán.

## Quy tắc black-box bắt buộc

- Không đọc source code để tìm validation rule.
- Không dùng backend/frontend implementation làm căn cứ thiết kế test.
- Không dùng database schema, seed data, constants nội bộ, hoặc private logic.
- Không suy luận rule từ tên biến trong code.
- Chỉ dùng nguồn black-box: requirement, assignment, API spec công khai, UI text/validation/message quan sát được, và behavior khi thao tác trên SUT.
- Không tự claim actual result, Pass/Fail, hoặc bug trước khi sinh viên execute. Khi tạo bảng test case, để các cột execution là `TODO` cho đến khi người làm chạy SUT.
- Không tự bịa constraint min/max/format nếu requirement hoặc UI/API behavior chưa nêu.
- Sau mỗi step phải dừng để human review. Chỉ tiếp tục khi user xác nhận `OK`, `Verified`, hoặc tương đương.
- Không ghi `Main_Report.md` trước khi Step 4 được human review/approve, trừ khi user chỉ yêu cầu lưu bản nháp rõ ràng.

## Quy tắc ID

- Condition: `C1`, `C2`, `C3`, ...
- Equivalence partition: `E1`, `E2`, `E3`, ...
- Domain test case: `FRxx-DOM-TCxx`

## Exit Criteria

Skill hoàn tất khi đã tạo:

- Step 1: Input và Output.
- Step 2: Conditions.
- Step 3: EP valid/invalid theo từng input/output/condition.
- Step 4: Test Case có coverage EP và có cột execution để điền sau khi chạy SUT.
- Nếu user đã yêu cầu ghi report hoặc đã approve Step 4 trong workflow ghi report, phần `Domain Testing / EP` của feature tương ứng đã được cập nhật vào `HW02/Main_Report.md` theo `references/main_report_writeback.md`.

## Step 1: Xác định Input và Output

Chỉ thực hiện Step 1 ở lượt đầu.

Xuất theo format bảng Markdown có giải thích chi tiết (Rationale):

```markdown
## Step 1: Xác định Input và Output

| Tham số / Biến | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT | Cơ sở lý do lựa chọn (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| `username` | Input | String | Nhập vào form đăng ký tài khoản. | Đại diện cho trường bắt buộc định danh người dùng. |
| `gioi_tinh` | Input | Enum / String | Lựa chọn "Nam", "Nữ" trong dropdown. | Cần phân tích các lớp giá trị lựa chọn của người dùng. |
| `ket_qua` | Output | State | Trả về thông báo thành công hoặc báo lỗi. | Dùng để xác nhận trạng thái đầu ra mong đợi sau khi thực thi. |
```

Checkpoint:

Yêu cầu user review Input/Output. Không tạo Condition cho đến khi được approve.

## Step 2: Xác định Condition

Chỉ chạy sau khi Step 1 được approve.

Xuất theo format bảng có giải thích chi tiết (Rationale):

```markdown
## Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng | Mô tả điều kiện | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale) |
| :--- | :--- | :--- | :--- |
| C1 | `username` | Bắt đầu bằng chữ cái | Theo tài liệu yêu cầu hoặc observed behavior trên giao diện của SUT. |
| C2 | `gioi_tinh` | Giá trị là "Nam" hoặc "Nữ" | Danh sách giá trị hợp lệ được quy định bởi API/UI. |
```

Checkpoint:

Yêu cầu user review danh sách condition. Không tạo EP cho đến khi được approve.

## Step 3: Xác định miền phân hoạch tương đương (EP)

Chỉ chạy sau khi Step 2 được approve.

Xuất theo format bảng đối chiếu với các điều kiện C ở Step 2, phân rõ lớp Valid/Invalid kèm giải thích chi tiết (Rationale):

```markdown
## Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện | Lý do lựa chọn & Biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| E1 | C1 | Hợp lệ (Valid) | Bắt đầu bằng chữ cái (ví dụ: `user123`) | Lớp dữ liệu hợp lệ cơ bản theo quy định. |
| E2 | C1 | Không hợp lệ (Invalid) | Bắt đầu bằng chữ số (ví dụ: `1user`) | Kiểm tra xem hệ thống có validate ký tự đầu tiên hay không. |
```

Checkpoint:

Yêu cầu user review EP valid/invalid và mapping với condition. Không sinh Test Case cho đến khi được approve.

## Step 4: Xác định Test Case

Chỉ chạy sau khi Step 3 được approve.

Tạo bảng test case giống tinh thần file mẫu: mỗi dòng có dữ liệu cụ thể cho các input, kết quả mong đợi, kết quả thực tế để điền sau execution, trạng thái, evidence/bug link nếu có, và coverage EP. Với feature có input khác nhau, tự thay các cột input cho phù hợp.

Format:

```markdown
## Step 4: Xác định Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ các lớp EP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
```

Checklist cuối:

- Mỗi valid EP quan trọng đã được cover.
- Mỗi invalid test case chỉ isolate một invalid EP chính.
- Kết quả mong đợi dựa trên rule/behavior có căn cứ.
- Điểm chưa có căn cứ đã bị loại khỏi bảng chính hoặc được hỏi lại trước khi sinh test case.

Sau bảng cuối:

- Nếu user chưa yêu cầu ghi report tự động, yêu cầu user review Step 4 và hỏi có muốn ghi vào `Main_Report.md` không.
- Nếu user đã yêu cầu ghi report tự động hoặc phản hồi approve Step 4 kèm ý định ghi report, đọc `references/main_report_writeback.md` và cập nhật `HW02/Main_Report.md`.
- Sau khi ghi report, nhắc user chạy test thủ công trên SUT, điền `Kết quả thực tế` và `Trạng thái` ngay trong bảng test case. Nếu có bug đã xác nhận, ghi `Bug ID / Evidence` để trỏ tới bug report riêng; không viết bug report chi tiết trong main report.
