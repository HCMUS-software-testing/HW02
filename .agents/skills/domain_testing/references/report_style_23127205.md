# Report Style Reference From 23127205

Nguồn tham khảo: `23127205.pdf`.

File này chỉ dùng để định hướng cách trình bày, không dùng làm nguồn business rule cho HW02.

## Style nên giữ

- Trình bày theo từng feature hoặc từng chức năng.
- Domain Testing có các phần rõ ràng:
  - Step 1: xác định Input và Output.
  - Step 2: xác định Condition.
  - Step 3: xác định miền phân hoạch tương đương (EP).
  - Step 4: xác định Test Data.
- Test Data và Test Case nên nằm chung trong bảng cuối. `Test Data` là dữ liệu cụ thể bên trong test case, không phải artifact riêng.
- Mỗi test case nên có coverage tới equivalence classes.
- Với invalid cases, ưu tiên single fault: một test case chỉ vi phạm một invalid class chính.

## Mapping đề xuất cho HW02

| Phần trong Main Report | Nội dung |
| :--- | :--- |
| Input/Output/State | Các biến và trạng thái quan sát được |
| Condition | Các điều kiện C1, C2, C3... |
| EP | Các lớp hợp lệ/không hợp lệ E1, E2, E3... |
| Test Data | Dữ liệu cụ thể, kết quả mong đợi, phủ các lớp EP |

## Không được làm

- Không copy business rule từ sample sang EShop.
- Không dùng sample như requirement.
- Không thêm Scenario ID nếu bài làm không cần.
- Không tạo `Test Data ID` riêng nếu bảng test case đã có cột `Test Data`.
- Không thêm `Source`, `Notes`, hoặc `Ghi chú` vào bảng chính nếu không được yêu cầu.
