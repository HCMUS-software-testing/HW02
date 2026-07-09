# HW02 - Kiểm thử Miền và Phân tích Giá trị Biên hỗ trợ bởi AI cho EShop SUT

## Thông tin sinh viên

| Trường thông tin | Giá trị |
| :--- | :--- |
| Mã số sinh viên | 23127205 |
| Họ và tên | Lâm Hữu Khánh |
| Kho chứa mã nguồn (Repository) | `HCMUS-software-testing/HW02` |
| Tệp tin nộp bài | `23127205_HW02_AI_DomainTesting_100.zip` |

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

## Các sản phẩm nộp bài yêu cầu

| Sản phẩm nộp bài | Đường dẫn tệp tin | Trạng thái |
| :--- | :--- | :--- |
| Báo cáo chính (Main report) | [Main_Report.md](./Main_Report.md) | Hoàn thành |
| Báo cáo danh sách lỗi (Bug report) | [Bug_Report.md](./Bug_Report.md) | Hoàn thành |
| Báo cáo nhật ký tương tác AI (AI audit report) | [AI_Audit_Report.md](./AI_Audit_Report.md) | Hoàn thành |
| Báo cáo phê bình AI (AI critique) | [AI_Critique.md](./AI_Critique.md) | Hoàn thành |
| Hướng dẫn demo Agent Skills | [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) | Hoàn thành |
| Gói mã nguồn Agent Skills | [.agents/](./.agents/) | Hoàn thành |
| Mẫu báo cáo lỗi GitHub | [.github/ISSUE_TEMPLATE/bug_report.md](./.github/ISSUE_TEMPLATE/bug_report.md) | Hoàn thành |
| Nhật ký commit Git | [git_commit_log.txt](./git_commit_log.txt) | Hoàn thành |
| Tài liệu và PDF tham khảo | [references/](./references/) | Hoàn thành |
| Bằng chứng ảnh chụp màn hình | [screenshots/](./screenshots/) | Hoàn thành |

## Bộ kỹ năng Agent (Agent Skills)

Các Agent Skills tự định nghĩa được lưu trữ tại thư mục [.agents/skills/](./.agents/skills/). Bộ kỹ năng này hỗ trợ trích xuất ngữ cảnh nghiệp vụ, tự động sinh thiết kế Domain/BVA, lập kế hoạch thực thi, viết báo cáo lỗi, ghi nhật ký tương tác AI và đồng bộ hóa báo cáo cuối cùng. Hướng dẫn sử dụng và kịch bản demo trực tiếp được tài liệu hóa chi tiết tại [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md).

## Script thực thi kiểm thử

Các script hỗ trợ thực thi tự động được lưu trữ tại [references/execution_scripts/](./references/execution_scripts/):

```bash
node HW02/references/execution_scripts/test_fr04.js
node HW02/references/execution_scripts/test_fr08_checkout.js
node HW02/references/execution_scripts/test_fr15.js
```

Các script này chạy với giả định hệ thống backend/frontend của EShop đã được khởi chạy cục bộ theo cấu hình mong đợi. Bằng chứng kiểm thử cho FR-06 trên di động được chụp thủ công từ giao diện ứng dụng di động do các lỗi liên quan chủ yếu là lỗi hiển thị và tương tác giao diện mobile.

## Thứ tự đọc tài liệu soát xét

1. Đọc [Main_Report.md](./Main_Report.md) để xem toàn bộ thiết kế kiểm thử Domain Testing và BVA, kết quả thực thi và tóm tắt kết quả.
2. Đọc [Bug_Report.md](./Bug_Report.md) để kiểm tra danh sách lỗi chi tiết, liên kết issue và ảnh chụp bằng chứng.
3. Đọc [AI_Audit_Report.md](./AI_Audit_Report.md) và [AI_Critique.md](./AI_Critique.md) để đánh giá cách thức AI được sử dụng và rà soát bởi con người.
4. Đọc [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) để chạy thử nghiệm quy trình làm việc với Agent Skills.

## Video minh họa (Demo Video)

| Mô tả Video | Liên kết (Link) |
| :--- | :--- |
| Demo Agent Skills | Đường liên kết sẽ được bổ sung sau khi quay và tải lên ở chế độ không công khai (unlisted) |
| Demo chạy thực tế (tùy chọn) | Được hướng dẫn chi tiết tại [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) |

## Lưu ý

- Kiểm thử Miền (Domain Testing) và BVA được coi là các hoạt động thiết kế ca kiểm thử hộp đen (black-box).
- Kết quả thực tế và trạng thái lỗi được xác nhận dựa trên việc chạy kiểm thử thật trên ứng dụng SUT và thu thập bằng chứng quan sát trực quan.
- Các giả định chỉ dựa trên việc đọc source code và các ca kiểm thử hộp đen trùng lặp đã được loại bỏ khỏi bộ kiểm thử FR-06 cuối cùng.
- Mọi liên kết tài liệu trong báo cáo đều dùng đường dẫn tương đối để đảm bảo gói bài nộp không bị lỗi liên kết sau khi nén zip.
