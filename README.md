# HW02 - Kiểm thử Miền và Phân tích Giá trị Biên hỗ trợ bởi AI cho EShop SUT

## Thông tin sinh viên

| Trường thông tin | Giá trị |
| :--- | :--- |
| Mã số sinh viên | 23127205 |
| Họ và tên | Lâm Hữu Khánh |
| Kho chứa mã nguồn (Repository) | [HCMUS-software-testing/HW02](https://github.com/HCMUS-software-testing/HW02) |

## Phạm vi thực hiện

Bài nộp này chứa gói báo cáo HW02 cho phương pháp Kiểm thử Miền (Domain Testing) và Phân tích Giá trị Biên (Boundary Value Analysis - BVA) hỗ trợ bởi AI trên EShop SUT. Quy trình thực hiện tuân theo luồng công việc AI-first, human-reviewed (AI đi trước, con người kiểm duyệt): AI và Agent Skills đề xuất thiết kế kiểm thử và phân tích ban đầu; sinh viên rà soát các yêu cầu, thực thi kiểm thử trên SUT, xác nhận kết quả thực tế, ghi lại bằng chứng hình ảnh và báo cáo các lỗi đã phát hiện.

## Các tính năng đã chọn

| Nhóm tính năng (Pool) | Mã tính năng | Tên tính năng | Giao diện / Tầng kiểm thử | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| A | FR-04 | Quản lý hồ sơ cá nhân | Web/API | Hoàn thành |
| B | FR-08 | Thanh toán (Checkout) | Web/API | Hoàn thành |
| C | FR-15 | Quản lý sản phẩm CRUD | Admin Web/API | Hoàn thành |
| D | FR-06 | Xem chi tiết sản phẩm trên di động | Mobile/API | Hoàn thành |

## Tóm tắt kết quả kiểm thử

| Tính năng | Đã thiết kế | Đã thực thi | Đạt (Passed) | Lỗi (Failed) | Bị chặn | Chưa thực thi | Lỗi xác nhận |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-04 | 18 | 18 | 6 | 12 | 0 | 0 | 5 |
| FR-08 | 32 | 32 | 2 | 30 | 0 | 0 | 6 |
| FR-15 | 30 | 30 | 10 | 20 | 0 | 0 | 5 |
| FR-06 | 10 | 10 | 5 | 5 | 0 | 0 | 4 |
| **Tổng cộng** | **90** | **90** | **23** | **67** | **0** | **0** | **20** |

## Lỗi đã xác nhận trên GitHub Issues

| Tính năng | Mã Issue trên GitHub |
| :--- | :--- |
| FR-04 | [#24](https://github.com/HCMUS-software-testing/HW02/issues/24), [#25](https://github.com/HCMUS-software-testing/HW02/issues/25), [#26](https://github.com/HCMUS-software-testing/HW02/issues/26), [#27](https://github.com/HCMUS-software-testing/HW02/issues/27), [#28](https://github.com/HCMUS-software-testing/HW02/issues/28) |
| FR-08 | [#41](https://github.com/HCMUS-software-testing/HW02/issues/41), [#47](https://github.com/HCMUS-software-testing/HW02/issues/47), [#50](https://github.com/HCMUS-software-testing/HW02/issues/50), [#54](https://github.com/HCMUS-software-testing/HW02/issues/54), [#55](https://github.com/HCMUS-software-testing/HW02/issues/55), [#56](https://github.com/HCMUS-software-testing/HW02/issues/56) |
| FR-15 | [#78](https://github.com/HCMUS-software-testing/HW02/issues/78), [#79](https://github.com/HCMUS-software-testing/HW02/issues/79), [#80](https://github.com/HCMUS-software-testing/HW02/issues/80), [#81](https://github.com/HCMUS-software-testing/HW02/issues/81), [#82](https://github.com/HCMUS-software-testing/HW02/issues/82) |
| FR-06 | [#72](https://github.com/HCMUS-software-testing/HW02/issues/72), [#73](https://github.com/HCMUS-software-testing/HW02/issues/73), [#75](https://github.com/HCMUS-software-testing/HW02/issues/75), [#77](https://github.com/HCMUS-software-testing/HW02/issues/77) |

## Bảng tự đánh giá (Self-Assessment)

| STT | Tiêu chí | Điểm tối đa | Điểm tự đánh giá |
| :--- | :--- | :---: | :---: |
| 1 | Tính năng A - FR-04 (Domain + Boundary) | 25 | 25 |
| 2 | Tính năng B - FR-08 (Domain + Boundary) | 25 | 25 |
| 3 | Tính năng C - FR-15 (Domain + Boundary) | 25 | 25 |
| 4 | Tính năng D - FR-06 (Mobile, Domain + Boundary) | 15 | 15 |
| 5 | Bộ kỹ năng Agent (Agent Skills) | 10 | 10 |
| | **Tổng điểm** | **100** | **100** |

## Video minh họa (Demo Video)

- Liên kết video demo quy trình Agent Skills: [https://youtu.be/IsvB-NfZ41s](https://youtu.be/IsvB-NfZ41s)
