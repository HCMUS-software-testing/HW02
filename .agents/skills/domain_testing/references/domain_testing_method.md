# Domain Testing Method Reference

Nguồn chính: `04_Domain Testing.pdf`.

## Quy trình trong bài giảng

Domain Testing còn được gọi là Equivalence Partitioning / Equivalence Analysis. Ý tưởng chính là chia miền dữ liệu thành các sub-domain hoặc equivalence classes, rồi chọn một số đại diện để kiểm thử.

Quy trình cốt lõi:

1. Xác định Input và Output variables dựa trên specification hoặc behavior quan sát được.
2. Xác định equivalence classes cho từng Input và Output/State condition.
3. Chọn best representative cho từng equivalence class.
4. Với ordered fields hoặc field có boundary rõ ràng, representative tốt thường là boundary values và nên chuyển sang BVA.

## Quy tắc xác định equivalence classes

- Hai test thuộc cùng equivalence class nếu expected result của chúng giống nhau.
- Valid equivalence classes đại diện cho input hợp lệ.
- Invalid equivalence classes đại diện cho input không hợp lệ.
- Nếu có lý do tin rằng các phần tử trong một equivalence class không được xử lý giống nhau, tách class đó thành class nhỏ hơn.

## Quy tắc chọn test case

- Chọn ít nhất một test case từ mỗi equivalence class.
- Với valid classes, chọn test case cover được nhiều valid equivalence classes nhất có thể cho đến khi tất cả valid classes quan trọng đã được cover.
- Với invalid classes, mỗi test case nên cover một và chỉ một invalid class chính để tránh che khuất lỗi.

## Áp dụng cho HW02

- Đây là black-box test design. Không đọc source code để suy ra rule.
- Nếu requirement hoặc UI/API behavior không nêu min/max/format, không tự tạo rule đó trong bảng chính. Hỏi lại user hoặc loại khỏi formal Domain Testing output.
- AI chỉ sinh candidate analysis/test cases. Sinh viên phải review và execute trên SUT trước khi ghi actual result hoặc bug.
