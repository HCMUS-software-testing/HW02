# Boundary Value Analysis Method Reference

Nguồn chính: `04_Domain Testing.pdf`.

## Mục tiêu

Boundary Value Analysis tập trung vào rủi ro lỗi tại hoặc gần ranh giới của equivalence classes. Theo bài giảng, lỗi điều kiện so sánh như `<`, `<=`, nhầm boundary hoặc transposition error thường dễ bị phát hiện tại boundary.

## Khi nào áp dụng BVA

Chỉ áp dụng với biến có miền có thứ tự hoặc constraint rõ ràng, ví dụ:

- Numeric range.
- String length.
- Quantity.
- Monetary amount.
- Date/time.
- List size.
- State limit.
- ID existence nếu có ranh giới/trạng thái rõ.

Không áp dụng formal BVA nếu không có boundary có căn cứ. Nếu muốn thử stress/exploratory value, tách riêng khỏi formal BVA và không đưa vào bảng chính.

## Giá trị cần chọn

Với một miền có lower boundary và upper boundary:

- `min-1`
- `min`
- `min+1`
- nominal valid value
- `max-1`
- `max`
- `max+1`

Nếu chỉ có một phía boundary, chỉ chọn quanh phía đó và ghi rõ phía còn lại không có explicit boundary.

## Nguyên tắc thiết kế BVA test cases

- Mỗi test case tập trung vào một boundary chính.
- Các biến không phải target giữ ở nominal valid value.
- Kết quả mong đợi phải phân biệt valid boundary với invalid outside-boundary.
- Boundary phải có căn cứ từ requirement, API spec công khai, UI validation/message, hoặc behavior quan sát được khi chạy SUT.
- Không đọc source code để lấy min/max, regex, enum, constants hoặc validation logic.
