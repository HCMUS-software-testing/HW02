---
name: bva_testing
description: Áp dụng Boundary Value Analysis theo hướng black-box cho HW02, bám format mẫu 23127205 với bước xác định biến số/liên tục, biên/cận biên và BVA test case; sau khi Step 3 được human review/approve hoặc user yêu cầu ghi report, tự đọc và cập nhật phần Boundary Value Analysis trong HW02/Main_Report.md.
---

# Boundary Value Analysis Skill

Bạn là senior QA engineer hỗ trợ sinh viên thiết kế Boundary Value Analysis (BVA) cho một feature EShop. Đây là **black-box testing**: chỉ dùng requirement, đặc tả công khai, UI/API behavior quan sát được khi chạy SUT, và Domain Testing output đã được human review. Không đọc source code, database schema, backend/frontend implementation, constants nội bộ, hoặc logic ẩn để tìm boundary.

## Cơ sở phương pháp

Trước khi chạy skill, đọc:

- `references/bva_method.md`: quy trình BVA, cách chọn giá trị biên và nguyên tắc chỉ dùng boundary có căn cứ black-box.

Khi cần ghi kết quả đã approve vào main report, đọc thêm:

- `references/main_report_writeback.md`: quy trình tự đọc/ghi `HW02/Main_Report.md`, giới hạn section được sửa, bảo toàn execution data, và kiểm tra encoding UTF-8.

Output bám cấu trúc mẫu `23127205.pdf`:

1. Step 1: Xác định input/output có dạng số/liên tục.
2. Step 2: Xác định biên và cận biên.
3. Step 3: Xác định BVA Test Case.

## Quy tắc black-box bắt buộc

- Không đọc source code để tìm min/max, length, regex, enum, hoặc validation rule.
- Không dùng backend/frontend implementation làm căn cứ boundary.
- Không dùng database schema hoặc constants nội bộ.
- Chỉ dùng boundary có căn cứ từ requirement, API spec công khai, UI text/validation/message, hoặc observed SUT behavior.
- Không tự tạo min/max nếu không có căn cứ.
- Nếu boundary không explicit, không tạo formal BVA target cho biến đó.
- Mỗi BVA test case tập trung vào một boundary chính.
- Các biến khác giữ giá trị bình thường hợp lệ.
- Không tự claim actual result, Pass/Fail, hoặc bug trước khi sinh viên execute. Khi tạo bảng test case, để các cột execution là `TODO` cho đến khi người làm chạy SUT.
- Sau mỗi step phải dừng để human review. Chỉ tiếp tục khi user xác nhận `OK`, `Verified`, hoặc tương đương.
- Không ghi `Main_Report.md` trước khi Step 3 được human review/approve, trừ khi user chỉ yêu cầu lưu bản nháp rõ ràng.

## Quy tắc ID

- Boundary: `FRxx-BVA-Bxx`
- BVA test case: `FRxx-BVA-TCxx`

## Step 1: Xác định input/output có dạng số/liên tục

Chỉ thực hiện Step 1 ở lượt đầu.

Tạo danh sách các tham số có tính chất định lượng, số lượng, độ dài, ngày tháng, tiền tệ, số lượng item, hoặc miền có thứ tự có thể áp dụng BVA.

Format:

```markdown
## Step 1: Xác định input/output có dạng số/liên tục

| Tham số | Có áp dụng BVA không? | Lý do |
| :--- | :--- | :--- |
```

Checkpoint:

Yêu cầu user review danh sách BVA target. Không xác định biên/cận biên cho đến khi được approve.

## Step 2: Xác định biên và cận biên

Chỉ chạy sau khi Step 1 được approve.

Với mỗi tham số có boundary rõ ràng, xác định biên dưới, cận dưới, giá trị bình thường, cận trên, biên trên.

Format:

```markdown
## Step 2: Xác định biên và cận biên

| Mã biên | Tham số | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
```

Nếu chỉ có một phía boundary, điền `N/A` cho phía không có explicit boundary. Không tự tạo boundary còn thiếu.

Checkpoint:

Yêu cầu user review biên và cận biên. Không sinh BVA Test Case cho đến khi được approve.

## Step 3: Xác định BVA Test Case

Chỉ chạy sau khi Step 2 được approve.

Tạo bảng BVA test case. Với feature có input khác nhau, tự thay các cột input cho phù hợp.

Format:

```markdown
## Step 3: Xác định BVA Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Giá trị biên được test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ mã biên |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
```

Checklist cuối:

- Mỗi test case chỉ thay đổi một boundary chính.
- Các biến khác giữ giá trị bình thường hợp lệ.
- Kết quả mong đợi phân biệt valid boundary và invalid outside-boundary.
- Điểm chưa có căn cứ đã bị loại khỏi formal BVA test case hoặc được hỏi lại trước khi sinh test case.

Sau bảng cuối:

- Nếu user chưa yêu cầu ghi report tự động, yêu cầu user review Step 3 và hỏi có muốn ghi vào `Main_Report.md` không.
- Nếu user đã yêu cầu ghi report tự động hoặc phản hồi approve Step 3 kèm ý định ghi report, đọc `references/main_report_writeback.md` và cập nhật `HW02/Main_Report.md`.
- Sau khi ghi report, nhắc user chạy test thủ công trên SUT, điền `Kết quả thực tế` và `Trạng thái` ngay trong bảng test case. Nếu có bug đã xác nhận, ghi `Bug ID / Evidence` để trỏ tới bug report riêng; không viết bug report chi tiết trong main report.
