# Tổng quan Agent Skills cho HW02

## Mục đích

Thư mục này chứa các native Agent Skills dùng cho bài HW02. Bộ skill hỗ trợ quy trình kiểm thử theo hướng **AI-first, human-reviewed** cho Domain Testing và Boundary Value Analysis trên EShop SUT.

Các skill này **không phải test automation script**. Chúng không tự chạy web, admin, mobile hay API. Chúng hướng dẫn AI phân tích kỹ thuật kiểm thử và sinh candidate test cases có cấu trúc. Sinh viên vẫn chịu trách nhiệm review output, chạy test trên SUT, xác nhận actual result và log bug.

## Cơ sở phương pháp và tài liệu tham chiếu

| Tài liệu | Cách sử dụng trong bộ skill |
| :--- | :--- |
| HW02 assignment PDF | Xác định deliverables bắt buộc: Domain Testing, BVA, AI Audit, AI Critique, bug report, Git log, README và demo Agent Skill |
| `04_Domain Testing.pdf` | Cung cấp quy trình Domain Testing: xác định input/output variables, equivalence classes, representative values và BVA cho ordered fields |
| Homework policy PDF | Quy định Markdown/PDF submission, Git usage, file naming và compliance |
| ISTQB CT-AI syllabus | Làm rõ AI có thể hỗ trợ test case generation nhưng vẫn cần human review vì có test oracle problem |

## Danh sách skill

| Skill | File | Vai trò |
| :--- | :--- | :--- |
| `domain_testing` | `.agents/skills/domain_testing/SKILL.md` | Sinh phân tích Domain Testing, equivalence partitions, representative values, combination matrix và candidate test cases |
| `bva_testing` | `.agents/skills/bva_testing/SKILL.md` | Sinh phân tích boundary và candidate BVA test cases |
| `audit_extraction` | `.agents/skills/audit_extraction/SKILL.md` | Sinh một AI Audit entry ngắn gọn cho từng feature/session |

## Nguyên tắc kiểm soát

- AI chỉ đề xuất analysis và candidate test cases.
- Sinh viên phải review từng checkpoint trước khi cho AI đi tiếp.
- Sinh viên sửa các biến bị thiếu, assumption yếu, expected result sai hoặc test data không thực tế.
- Sinh viên tự chạy test trên SUT và ghi actual result.
- Bug chỉ được log sau khi đã được người làm kiểm chứng.
- AI Audit phải ghi prompts, output summary và human corrections.

## Quy trình dùng skill cho từng feature

Với mỗi feature đã chọn:

1. Mở một AI session mới cho feature đó.
2. Chuẩn bị feature context: feature ID, tên feature, pool, surface, role, preconditions, UI/API behavior, known rules và out-of-scope notes.
3. Chạy `domain_testing` Step 1.
4. Review variables, partitions, output/state classes, assumptions và open questions.
5. Nếu sai hoặc thiếu, yêu cầu AI sửa Step 1. Nếu ổn, xác nhận `Verified`.
6. Chạy `domain_testing` Step 2.
7. Review representative values và combination matrix.
8. Nếu sai hoặc thiếu, yêu cầu AI sửa Step 2. Nếu ổn, xác nhận `Verified`.
9. Chạy `domain_testing` Step 3.
10. Copy phần Domain Testing đã duyệt vào section feature tương ứng trong `Main_Report.md`.
11. Chạy `bva_testing` Step 1.
12. Review boundary targets và boundary values.
13. Nếu sai hoặc thiếu, yêu cầu AI sửa Step 1. Nếu ổn, xác nhận `Verified`.
14. Chạy `bva_testing` Step 2.
15. Copy phần BVA đã duyệt vào section feature tương ứng trong `Main_Report.md`.
16. Chạy test cases trên SUT.
17. Ghi actual results và confirmed bugs.
18. Chạy `audit_extraction`.
19. Copy audit entry vào `AI_Reports/AI_Audit_Report.md`.
20. Commit phần việc đã hoàn thành.

## Gợi ý demo

Nên dùng FR-04 cho video demo Agent Skills vì feature này gọn và dễ giải thích.

Trong video nên show:

- File tổng quan này.
- `domain_testing` skill và phần Methodology Basis.
- Feature context prompt cho FR-04.
- AI output ở Step 1.
- Human review trước khi cho AI tiếp tục.
- AI output ở Step 2 và Step 3 sau khi được duyệt.
- `bva_testing` skill và boundary table đã review.
- `audit_extraction` skill và audit entry cuối cùng.

Điểm quan trọng khi demo không phải là tự động hóa toàn bộ. Điểm quan trọng là AI đi theo đúng kỹ thuật kiểm thử từng bước và sinh viên kiểm soát các checkpoint.
