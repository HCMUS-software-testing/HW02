# Báo cáo Nhật ký Tương tác AI (AI Audit Report)

**Tuyên bố:** Em sử dụng các công cụ AI cho các nhiệm vụ sau: lập kế hoạch chiến lược bài tập, thiết kế các Agent Skills có thể tái sử dụng, sinh các ca kiểm thử cho Domain Testing và BVA, soát xét tính căn bản lý thuyết, và phân tích các điểm thiếu sót của AI (AI Gap Analysis).

---

### Nhật ký Tương tác AI 1: Thiết lập Dự án Ban đầu và Lập kế hoạch

- **Tên công cụ AI:** Gemini
- **Ngày và giờ:** 06-07-2026 14:30:00 +07:00
- **Mô tả nhiệm vụ:** Hỗ trợ lập kế hoạch ban đầu cho bài HW02, bao gồm chiến lược làm bài, đề xuất cấu trúc dự án, ý tưởng xây dựng Agent Skills, gợi ý quy trình làm việc với Git và ý tưởng cho biểu mẫu báo cáo.

#### 1. Các Prompt đã sử dụng

- "Bạn là 1 senior QA/QC có kinh nghiệm lâu năm trong lĩnh vực testing. Hãy giúp em lên kế hoạch chi tiết để em có thể thực hiện giải bài tập này một cách hoàn thiện nhất tuân thủ các yêu vụ trong file pdf..."
- "Hãy dựa trên plan đã được lên, Hãy giúp em thực hiện giai đoạn 1 là chuẩn bị Agent Skills."
- "Yêu cầu cập nhật kế hoạch: chia nhỏ Git commits, thêm Traceability Matrix, không nén source code."

#### 2. Tóm tắt kết quả của AI

- Đề xuất kế hoạch hành động ban đầu gồm nhiều giai đoạn để hoàn thành bài HW02.
- Gợi ý sử dụng các quy trình AI/Agent có thể tái sử dụng cho Domain Testing, Boundary Value Analysis, và trích xuất AI Audit.
- Đề xuất cấu trúc báo cáo cho các tính năng được chọn: FR-04, FR-08, FR-15, và FR-06.
- Gợi ý kiểm soát quy trình như chia nhỏ commit Git, thông tin độ phủ/truy vết, và tránh nộp mã nguồn không cần thiết của SUT.
- Lưu ý: Một số ý tưởng ban đầu về bộ prompt hỗ trợ đã được thay thế bằng cấu trúc kỹ năng gốc `.agents/skills`.

#### 3. Rà soát và Chỉnh sửa của con người

- Em đã xem lại tài liệu lập kế hoạch ban đầu trong phiên làm việc sau đó.
- Em đã làm rõ rằng các Agent Skills cuối cùng nên tập trung vào các tệp skill gốc nằm trong thư mục [./.agents/skills](./.agents/skills).
- Em coi bất kỳ tệp nào không còn xuất hiện trong repository cuối cùng là tài liệu chuẩn bị lịch sử, không phải sản phẩm nộp bài chính thức.

---

### Nhật ký Tương tác AI 2: Đánh giá Chuẩn bị, Tinh chỉnh Agent Skill và Đối chiếu Lý thuyết

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 07-07-2026 22:00:00 +07:00
- **Mô tả nhiệm vụ:** Xem xét quá trình chuẩn bị HW02, đối chiếu kế hoạch hành động và Agent Skills với các yêu cầu của bài tập, làm rõ quy trình AI-first và xác minh tính tương thích với lý thuyết Domain Testing và hướng dẫn ISTQB CT-AI.

#### 1. Các Prompt đã sử dụng

- "Em đang trong quá trình làm bài tập kiểm thử Domain + boundary testing... Hãy nhận xét phần chuẩn bị của em, và tiến hành chỉnh sửa để hoàn thiện cho phần plan và agent skill."
- "Thứ nhất, Toàn bộ plan, skill đã match requirement hay chưa. Thứ hai, Agent Skill hiện tại đã có thể cover được hết hay chưa. Và cách để em có thể thực hiện được agent skill này là như thế nào (workflow)"
- "Em cần làm rõ... AI first, human review nghĩa là chúng ta sẽ cho AI tự động chạy kiểm thử web rồi ghi bug hay chỉ dừng lại ở việc sinh test case... theo như plan hay skill thì đã match với phần lí thuyết ở domain testing pdf chưa và đã thoả mãn được ISTQB hay chưa."
- "ok hãy xuất AI audit giúp em"

#### 2. Tóm tắt kết quả của AI

- Đã soát xét các yêu cầu của bài tập HW02 và các tài liệu chính sách làm bài tập.
- Đã soát xét tệp [HW02_Action_Plan.md](./HW02_Action_Plan.md) hiện tại, các tệp Agent Skill và báo cáo AI audit hiện có.
- Viết lại và tinh chỉnh [HW02_Action_Plan.md](./HW02_Action_Plan.md) để bổ sung checklist yêu cầu, phạm vi tính năng, quy trình cho từng feature, định nghĩa hoàn thành (DoD), yêu cầu AI Audit/Critique, yêu cầu Git log, README, xuất PDF và quy tắc đặt tên tệp nộp bài.
- Tinh chỉnh các Agent Skills gốc trong thư mục [./.agents/skills](./.agents/skills): [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md), [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md), và [audit_extraction/SKILL.md](./.agents/skills/audit_extraction/SKILL.md).
- Thêm các quy tắc quy trình Agent Skill nghiêm ngặt hơn: dữ liệu đầu vào bắt buộc, thực thi từng bước, các checkpoint phê duyệt bắt buộc của con người, mã ID truy vết ổn định, quy tắc chống ảo tưởng và định dạng đầu ra Markdown sẵn sàng cho báo cáo.
- Làm rõ rằng các Agent Skills thực sự phải được đặt tại tệp [./.agents/skills](./.agents/skills).
- Giải thích rằng AI-first không yêu cầu AI tự động chạy ứng dụng web/mobile. Quy trình khuyến nghị là: AI thiết kế phân tích và các ca kiểm thử đề xuất, sinh viên rà soát chỉnh sửa, sau đó sinh viên thực thi trên SUT và xác nhận kết quả thực tế để báo cáo lỗi.
- So sánh quy trình với bài giảng Domain Testing và đối chiếu cấu trúc skill với các bước lý thuyết: xác định biến input/output, xác định lớp tương đương, chọn giá trị đại diện và áp dụng BVA.
- So sánh quy trình với tài liệu ISTQB CT-AI và định vị việc sử dụng AI là hỗ trợ sinh test case dưới sự kiểm soát kết quả mong đợi và xác nhận lỗi của con người.
- Tạo một mục nhật ký AI Audit Report cho công việc chuẩn bị và tinh chỉnh Agent Skill.

#### 3. Rà soát và Chỉnh sửa của con người

- Em làm rõ rằng repository chính là thư mục `./HW02`.
- Em làm rõ rằng các Agent Skills nộp bài phải nằm ở [./.agents/skills](./.agents/skills), không phải trong một thư mục prompt-pack riêng lẻ.
- Em đã đặt câu hỏi liệu AI-first có nghĩa là tự động hóa kiểm thử giao diện hoàn toàn hay không. Cách hiểu cuối cùng đã được điều chỉnh: AI hỗ trợ thiết kế kiểm thử trước; việc rà soát của con người và xác thực thực tế trên SUT vẫn là bắt buộc.
- Em yêu cầu đối chiếu lý thuyết với bài giảng Domain Testing và syllabus ISTQB CT-AI trước khi tiếp tục.
- Em đã sửa nội dung audit để nó chỉ tham chiếu đến các sản phẩm cuối cùng có liên quan và không coi các tệp nháp đã xóa là sản phẩm nộp bài chính thức.

---

### Nhật ký Tương tác AI 3: Cơ sở Phương pháp Agent Skill, Tài liệu Tham chiếu và Hướng dẫn Sử dụng

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 07-07-2026 22:30:00 +07:00
- **Mô tả nhiệm vụ:** Tăng cường tính phương pháp luận cho các Agent Skills gốc với cơ sở lý thuyết, các quy tắc thực thi nghiêm ngặt hơn, và tài liệu hướng dẫn sử dụng/demo bằng tiếng Việt trước khi áp dụng vào kiểm thử tính năng thực tế.

#### 1. Các Prompt đã sử dụng

- "Clarify and improve the current Agent Skills so they include methodology/reference basis and strict rules before starting feature testing."
- "Update the Agent Skill documentation so the usage workflow is clearer for demo/video preparation."
- "Write the skill usage guide in Vietnamese so it is easier to follow during testing and demo recording."

#### 2. Tóm tắt kết quả của AI

- Cập nhật [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) với phần Cơ sở phương pháp dựa trên bài giảng Domain Testing: biến input/output, lớp tương đương, giá trị đại diện và chuyển giao biên.
- Cập nhật [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) với các quy tắc nghiêm ngặt: tư duy black-box trước, không tự bịa quy tắc ràng buộc, không tự khẳng định kết quả thực tế/bug, các checkpoint bắt buộc, điều kiện đầu vào và đầu ra.
- Cập nhật [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) với phương pháp BVA: các phân hoạch có thứ tự, biên dưới/biên trên, các giá trị min/min-1/min+1/max/max-1/max+1, và giữ giá trị bình thường cho các biến khác.
- Cập nhật [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) với các quy tắc nghiêm ngặt: không tự bịa min/max, không trộn lẫn stress test với BVA chính thống, không tự điền kết quả thực tế, điều kiện đầu vào và đầu ra.
- Cập nhật [audit_extraction/SKILL.md](./.agents/skills/audit_extraction/SKILL.md) để khớp với mẫu AI Audit giản lược sử dụng trong báo cáo chính thức.
- Tạo tệp giới thiệu tiếng Việt [.agents/README.md](./.agents/README.md) để giải thích mục đích, tài liệu tham chiếu lý thuyết, danh sách skill, nguyên tắc kiểm soát, quy trình chạy skill và khuyến nghị demo.
- Tạo tệp [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) bằng tiếng Việt làm kịch bản quay video demo quy trình Agent Skills.
- Tạo tệp [HW02_FR_Workflow.md](./HW02_FR_Workflow.md) bằng tiếng Việt làm checklist làm việc cho từng tính năng được chọn.

#### 3. Rà soát và Chỉnh sửa của con người

- Em yêu cầu các Agent Skills phải bao gồm cơ sở phương pháp/tài liệu tham chiếu, không chỉ là các prompt vận hành.
- Em quyết định giữ phần tóm tắt phương pháp bên trong mỗi tệp `SKILL.md` nhưng di chuyển các giải thích chi tiết về cách dùng/demo sang [.agents/README.md](./.agents/README.md), [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md), và [HW02_FR_Workflow.md](./HW02_FR_Workflow.md).
- Em yêu cầu các tài liệu hướng dẫn viết bằng tiếng Việt để dễ theo dõi và thực hiện trong quá trình kiểm thử thực tế và quay video.

---

### Nhật ký Tương tác AI 4: Đồng bộ Cấu trúc Báo cáo Chính

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 07-07-2026 22:45:00 +07:00
- **Mô tả nhiệm vụ:** Đồng bộ hóa cấu trúc báo cáo với yêu cầu nộp bài của HW02 là báo cáo chính phải bao gồm báo cáo Domain Testing và BVA của toàn bộ 4 tính năng đã chọn.

#### 1. Các Prompt đã sử dụng

- "Re-check the HW02 submission regulation and align the report structure so the feature reports are included in the main report."
- "Update the workflow and demo guidance so approved skill outputs are copied into `Main_Report.md`, not treated as separate final feature reports."

#### 2. Tóm tắt kết quả của AI

- Đọc lại quy định nộp bài HW02 và xác nhận tệp zip yêu cầu phải chứa một báo cáo chính bằng Markdown và PDF, bao gồm báo cáo Domain Testing và BVA.
- Tạo tệp [Main_Report.md](./Main_Report.md) làm khung báo cáo chính chứa các mục cho FR-04, FR-08, FR-15, và FR-06.
- Thêm các phần trong [Main_Report.md](./Main_Report.md) cho tổng quan tính năng, xác định yêu cầu/quy tắc, phân tích Domain Testing, BVA, kết quả thực thi, báo cáo lỗi, AI Gap Analysis, tổng hợp kiểm thử, Agent Skills/video demo, tài liệu tham chiếu và phụ lục.
- Cập nhật [HW02_Action_Plan.md](./HW02_Action_Plan.md) để làm rõ rằng toàn bộ nội dung kiểm thử cuối cùng phải được hợp nhất vào [Main_Report.md](./Main_Report.md).
- Cập nhật [HW02_FR_Workflow.md](./HW02_FR_Workflow.md) để mỗi đầu ra Domain/BVA được duyệt sẽ được copy vào phần tương ứng của [Main_Report.md](./Main_Report.md).
- Cập nhật [.agents/README.md](./.agents/README.md) và [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) để phần demo trỏ đến [Main_Report.md](./Main_Report.md) làm điểm đến của báo cáo.

#### 3. Rà soát và Chỉnh sửa của con người

- Em đã chỉnh sửa cách hiểu trước đây rằng các tệp báo cáo riêng lẻ cho từng tính năng là sản phẩm nộp bài chính.
- Em làm rõ rằng các thư mục tính năng riêng lẻ có thể được giữ lại làm bản nháp/tài liệu hỗ trợ, nhưng nội dung báo cáo chính thức phải nằm trong [Main_Report.md](./Main_Report.md).
- Em yêu cầu quy trình và hướng dẫn demo phản ánh cấu trúc nộp bài này trước khi bắt đầu kiểm thử tính năng thực tế.

---

### Nhật ký Tương tác AI 5: Chuẩn bị Biểu mẫu Báo cáo Lỗi (Bug Report Template)

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 07-07-2026 22:46:44 +07:00
- **Mô tả nhiệm vụ:** Chuẩn bị biểu mẫu báo cáo lỗi có thể tái sử dụng và liên kết nó với quy trình báo cáo lỗi của HW02.

#### 1. Các Prompt đã sử dụng

- "Review the current reporting preparation and add a bug report template if it is missing."
- "Clarify how the detailed bug report template should relate to the bug summary in the main report."

#### 2. Tóm tắt kết quả của AI

- Tạo tệp [Bug_Report_Template.md](./Bug_Report_Template.md) cho các lỗi được xác nhận.
- Đưa vào các trường thông tin lỗi bắt buộc: Bug ID, tính năng, tiêu đề, mức độ nghiêm trọng, độ ưu tiên, trạng thái, môi trường, người báo cáo, GitHub Issue, ảnh chụp/bằng chứng, tiền điều kiện, các bước tái hiện, kết quả mong đợi, kết quả thực tế, tham chiếu test case, và ghi chú thêm.
- Cập nhật [HW02_FR_Workflow.md](./HW02_FR_Workflow.md) để tham chiếu đến [Bug_Report_Template.md](./Bug_Report_Template.md) trong bước ghi nhận lỗi.
- Cập nhật [Main_Report.md](./Main_Report.md) để làm rõ rằng báo cáo chính nên chứa tóm tắt lỗi và chi tiết lỗi cuối cùng, trong khi [Bug_Report_Template.md](./Bug_Report_Template.md) dùng để viết chi tiết khi tạo GitHub Issue.

#### 3. Rà soát và Chỉnh sửa của con người

- Em xác nhận rằng báo cáo lỗi phải dựa trên hành vi thực tế đã kiểm chứng trên SUT, không dựa trên dự đoán của AI.
- Em làm rõ rằng [Bug_Report_Template.md](./Bug_Report_Template.md) là biểu mẫu dùng để soạn thảo lỗi chi tiết/GitHub Issue, trong khi [Main_Report.md](./Main_Report.md) vẫn là báo cáo chính thức được nộp.

---

### Nhật ký Tương tác AI 6: Thắt chặt Agent Skill Black-Box và Đồng bộ Tham chiếu

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 08-07-2026 15:46:52 +07:00
- **Mô tả nhiệm vụ:** Kiểm tra lại và thắt chặt các Agent Skills của HW02 để đảm bảo tuân thủ kiểm thử hộp đen (black-box) cho Domain Testing/BVA, đồng bộ với các tệp yêu cầu/lý thuyết được cung cấp và bổ sung tệp tham chiếu có thể truy vết.

#### 1. Các Prompt đã sử dụng

- "Review and update the current HW02 Agent Skills as a senior QA/QC. Ensure the Domain Testing and BVA skills are strictly black-box: they must not read or use source code, backend/frontend implementation, database schema, internal constants, or hidden logic to design context, equivalence classes, boundaries, expected results, or test cases. Cross-check the skills against the attached requirement and theory files: [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf), [___2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf), [04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf), [23127205.pdf](./references/23127205.pdf), and [ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf). Redesign the skills in Vietnamese using the canonical structure `.agents/skills/[skill_name]/SKILL.md` with a `references/` folder for methodology and report-style evidence. Update the workflow/demo documentation so it matches the final skill structure. Do not include meta discussion in the audit; only record changes that create, modify, or validate final assignment artifacts."

#### 2. Tóm tắt kết quả của AI / Sản phẩm được tạo ra

- Đã đối chiếu các Agent Skills hiện tại với yêu cầu bài tập ([2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf)), chính sách làm bài ([___2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf)), bài giảng Domain Testing ([04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf)), mẫu báo cáo ([23127205.pdf](./references/23127205.pdf)) và tài liệu ISTQB CT-AI ([ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf)).
- Xác nhận Domain Testing và BVA trong bài này phải được thiết kế theo dạng hộp đen hoàn toàn.
- Cập nhật [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) bằng tiếng Việt với các quy tắc black-box chặt chẽ, dữ liệu đầu vào bắt buộc, các checkpoint từng bước, mã ID ổn định và kết quả Test Data/Test Cases cuối cùng.
- Cập nhật [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) bằng tiếng Việt với quy tắc biên black-box, không tự bịa giá trị min/max, thiết kế test đơn lỗi tại biên và các checkpoint rà soát.
- Cập nhật [audit_extraction/SKILL.md](./.agents/skills/audit_extraction/SKILL.md) để các mục audit hiển thị rõ ràng thông tin: công cụ AI, ngày giờ, prompt, phản hồi của AI và rà soát của con người.
- Thêm các tệp tham chiếu phương pháp:
  - [.agents/skills/domain_testing/references/domain_testing_method.md](./.agents/skills/domain_testing/references/domain_testing_method.md)
  - [.agents/skills/domain_testing/references/report_style_23127205.md](./.agents/skills/domain_testing/references/report_style_23127205.md)
  - [.agents/skills/bva_testing/references/bva_method.md](./.agents/skills/bva_testing/references/bva_method.md)
  - [.agents/skills/audit_extraction/references/hw02_audit_requirements.md](./.agents/skills/audit_extraction/references/hw02_audit_requirements.md)
- Cập nhật [.agents/README.md](./.agents/README.md) để ghi nhận các tệp tham chiếu và cấu trúc skill mới.
- Cập nhật [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) để kịch bản video demo trỏ đến các tệp tham chiếu thực tế.
- Loại bỏ các tệp tài liệu tham khảo/mã nguồn lớn bị sao chép nhầm vào thư mục skill, chỉ giữ lại các tệp tham chiếu ngắn gọn, cô đọng.

#### 3. Rà soát và Chỉnh sửa của con người

- Em đã đặt câu hỏi liệu thiết kế skill trước đây có thực sự là hộp đen hay không khi nó vẫn cho phép hoặc ngụ ý đọc mã nguồn.
- Em làm rõ rằng ngữ cảnh của Domain Testing và BVA phải đến từ tài liệu yêu cầu, API spec công khai, giao diện UI và hành vi thực tế của SUT, không lấy từ mã nguồn.
- Em yêu cầu viết các Agent Skills và tài liệu hướng dẫn bằng tiếng Việt để phục vụ tốt nhất cho việc quay video và chạy test.
- Em yêu cầu mỗi skill có một thư mục `references/` để dễ dàng truy vết lý thuyết trong buổi vấn đáp bảo vệ bài tập.
- Em đồng ý với cấu trúc chuẩn gồm một thư mục cho mỗi skill, bên trong chứa `SKILL.md` và chi tiết `references/` cô đọng.

---

### Nhật ký Tương tác AI 7: Soát xét Độ phủ Yêu cầu Trước Kiểm thử

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 08-07-2026 16:23:07 +07:00
- **Mô tả nhiệm vụ:** Trước khi bắt đầu kiểm thử chi tiết từng tính năng, rà soát lại độ phủ yêu cầu của bài tập và cập nhật các sản phẩm chuẩn bị để đảm bảo repository có đầy đủ báo cáo chính, README, khung AI Critique, Git log, Agent Skills và biểu mẫu quy trình.

#### 1. Các Prompt đã sử dụng

- "Before starting feature testing, carefully check each requirement in [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf) against the current HW02 repository. Identify any missing or outdated preparation artifacts, then update the necessary files so the project is ready for feature-level Domain Testing and BVA. Keep the Domain/BVA workflow aligned with the sample [23127205.pdf](./references/23127205.pdf) and do not create actual test results or bugs before SUT execution."

#### 2. Tóm tắt kết quả của AI / Sản phẩm được tạo ra

- Rà soát độ phủ yêu cầu: 4 tính năng đã chọn, Domain Testing, BVA, AI gap analysis, báo cáo lỗi, Agent Skills, AI Audit, AI Critique, Git commit log, README tự đánh giá/tóm tắt test, link video demo, báo cáo dạng Markdown/PDF, và cấu trúc thư mục zip nộp bài.
- Cập nhật [Main_Report.md](./Main_Report.md) để các tính năng đã chọn tuân thủ đúng cấu trúc các bước của EP/BVA:
  - Domain Step 1: Input và Output.
  - Domain Step 2: Condition.
  - Domain Step 3: EP.
  - Domain Step 4: Test Data.
  - BVA Step 1: các mục tiêu định lượng/liên tục.
  - BVA Step 2: xác định biên và cận biên.
  - BVA Step 3: BVA Test Data.
- Loại bỏ các phần không còn phù hợp trong [Main_Report.md](./Main_Report.md) cũ (như ma trận tổ hợp và giá trị đại diện riêng rẽ).
- Cập nhật [README.md](./README.md) với các placeholder thông tin sinh viên, bảng tính năng đã chọn, bảng tự đánh giá, bảng tóm tắt kết quả test, link video demo, và checklist các sản phẩm nộp bài bắt buộc.
- Tạo tệp `AI_Reports/AI_Critique.md` (sau đó được di chuyển ra thư mục gốc [./AI_Critique.md](./AI_Critique.md)) làm khung bài viết critique để điền sau khi test xong.
- Tạo tệp [git_commit_log.txt](./git_commit_log.txt) làm khung và ghi hướng dẫn xuất log commit Git trước khi nộp bài.
- Xác nhận các Agent Skills đã sẵn sàng trong [./.agents/skills](./.agents/skills).

#### 3. Rà soát và Chỉnh sửa của con người

- Em yêu cầu kiểm tra kỹ từng mục yêu cầu của đề bài trước khi bắt đầu chạy thử nghiệm tính năng.
- Em yêu cầu quy trình và báo cáo mẫu phải thống nhất hoàn toàn với phong cách trình bày trong [23127205.pdf](./references/23127205.pdf).
- Em xác nhận rằng các thông tin về kết quả chạy test thực tế, báo cáo lỗi, ảnh bằng chứng, bài phê bình AI cuối cùng, xuất PDF, xuất log Git và các liên kết video sẽ được hoàn thiện sau khi thực hiện chạy thử trên SUT.

---

### Nhật ký Tương tác AI 8: Tái cấu trúc Định dạng Bảng và Nâng cao Giải thích Nghiệp vụ

- **Tên công cụ AI:** Antigravity / Gemini 3.5 Flash
- **Ngày và giờ:** 08-07-2026 17:13:00 +07:00
- **Mô tả nhiệm vụ:** Tái cấu trúc cách trình bày các bước của Domain Testing và BVA trong `Main_Report.md` từ định dạng danh sách (bullet list) sang định dạng bảng (Table) có cột giải thích lý do nghiệp vụ (Rationale) chi tiết bằng tiếng Việt, đồng thời cập nhật đồng bộ Agent Skills, Hướng dẫn quy trình, và kịch bản video demo.

#### 1. Các Prompt đã sử dụng

- "Em muốn tối ưu hóa cấu trúc báo cáo Domain Testing và BVA trong `Main_Report.md` cùng bộ Agent Skills (`.agents/skills/`). Cụ thể: 1) Chuyển đổi các bước thiết kế test (xác định Input/Output, Condition, và EP) từ dạng danh sách liệt kê sang dạng bảng (Table) có thêm cột giải thích chi tiết (Rationale) bằng tiếng Việt; 2) Thêm cột 'Giải thích nguồn gốc biên (Rationale)' vào bảng BVA Step 2; 3) Cập nhật đồng bộ toàn bộ đường dẫn và kịch bản demo liên quan sau khi em di chuyển `AI_Audit_Report.md` và `AI_Critique.md` ra thư mục gốc `HW02`."

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Tái cấu trúc [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) để hướng dẫn AI xuất các bảng biểu Markdown thay vì danh sách liệt kê ở các bước 1, 2, 3 của Domain Testing, đi kèm các cột giải thích chi tiết Rationale.
- Tái cấu trúc [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) để bổ sung yêu cầu cột Rationale giải thích biên cho bảng Step 2.
- Cấu trúc lại báo cáo [Main_Report.md](./Main_Report.md):
  - Mục 3 (Methodology): Bổ sung cơ sở lý thuyết của việc dùng bảng và Rationale.
  - Mục 4.2 (FR-04 Domain Testing): Chuyển đổi toàn bộ Step 1, 2, 3 sang dạng bảng tiếng Việt và điền đầy đủ nội dung giải thích (Rationale) nghiệp vụ của SUT.
  - Mục 4.3 (FR-04 BVA): Thiết kế bảng Step 1 và Step 2 BVA tiếng Việt có giải thích nguồn gốc biên, đồng thời sinh 6 kịch bản kiểm thử biên (TC01 đến TC06) ở Step 3 có phủ các mã biên và để trống cột kết quả thực tế.
  - Mục 5, 6, 7 (FR-08, FR-15, FR-06): Dọn dẹp nội dung nháp trùng lặp, xây dựng các khung bảng rỗng dạng `TODO` để chuẩn bị kiểm thử cho các feature tiếp theo.
- Cập nhật đồng bộ các đường dẫn tệp tin báo cáo ([./AI_Audit_Report.md](./AI_Audit_Report.md), [./AI_Critique.md](./AI_Critique.md) ở thư mục gốc) và định dạng bảng mới trong các tệp hướng dẫn [HW02_FR_Workflow.md](./HW02_FR_Workflow.md), [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md), và [README.md](./README.md).

#### 3. Rà soát và Chỉnh sửa của con người

- Em đã bắt đầu một phiên thảo luận `/grill-me` để xác định cấu trúc cột của từng bảng (nhập/xuất, mã điều kiện, mã phân hoạch, và cột rationale giải thích).
- Em yêu cầu toàn bộ tiêu đề và nội dung bảng biểu trong Main Report phải được viết bằng tiếng Việt để đồng bộ với ngôn ngữ nộp bài.
- Em đã rà soát và phê duyệt Bản kế hoạch thực hiện (Implementation Plan) trước khi AI tiến hành sửa đổi hàng loạt tệp tin.

---

### Nhật ký Tương tác AI 9: Thiết kế Domain Testing và BVA cho FR-04

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 08-07-2026 20:08:07 +07:00
- **Mô tả nhiệm vụ:** Sử dụng AI để hỗ trợ thiết kế phân tích Domain Testing và Boundary Value Analysis cho tính năng FR-04 Personal Profile Management theo hướng black-box, sau đó đưa kết quả đã review vào `Main_Report.md`.

#### 1. Các Prompt đã sử dụng

- "Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`. Dùng context FR-04 Personal Profile Management trong `HW02/Feature_Contexts.md`. Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case."
- "OK. Tiếp tục Step 2: xác định Condition cho FR-04. Giữ đúng nguyên tắc black-box, không đọc source code và không tự kết luận actual result hoặc bug."
- "OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP) cho FR-04. Mỗi EP phải liên kết với condition tương ứng và phân biệt rõ valid/invalid."
- "OK. Tiếp tục Step 4: xác định Test Case cho FR-04. Bảng test case phải có mã `FR04-DOM-TCxx`, input cụ thể, expected result, các cột `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` để TODO, và coverage EP."
- "Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`. Dùng Domain Testing output đã được review cho FR-04. Chỉ thực hiện Step 1: xác định input/output có thể áp dụng BVA."
- "OK. Tiếp tục Step 2: xác định biên và cận biên cho FR-04. Không tự tạo boundary nếu không có căn cứ black-box; ghi rõ rationale cho từng boundary."
- "OK. Tiếp tục Step 3: xác định BVA Test Case cho FR-04. Bảng test case phải có mã `FR04-BVA-TCxx`, giá trị biên được test, expected result, actual/status/evidence để TODO, và coverage mã biên."

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- AI tạo phần FR-04 trong [Main_Report.md](./Main_Report.md) theo cấu trúc Domain Testing gồm 4 bước:
  - Step 1: xác định input/output/state chính của tính năng profile.
  - Step 2: xác định các condition `C1` đến `C16`.
  - Step 3: xác định các equivalence partitions `E1` đến `E18`.
  - Step 4: tạo 11 test case Domain Testing `FR04-DOM-TC01` đến `FR04-DOM-TC11`.
- AI tạo phần BVA cho FR-04 trong [Main_Report.md](./Main_Report.md) gồm:
  - Step 1: xác định các biến có thể áp dụng BVA như độ dài `name`, độ dài `shipping_address`, và độ dài `phone`.
  - Step 2: xác định 2 nhóm boundary chính `FR04-BVA-B01` và `FR04-BVA-B02` kèm rationale.
  - Step 3: tạo 6 test case BVA `FR04-BVA-TC01` đến `FR04-BVA-TC06`.
- Các bảng test case đã có sẵn cột `Kết quả thực tế`, `Trạng thái`, và `Bug ID / Evidence`, nhưng vẫn để `TODO` vì chưa execute trên SUT.
- Không có bug nào được AI tự xác nhận trong bước này.

#### 3. Rà soát và Chỉnh sửa của con người

- Em xác nhận phạm vi FR-04 là black-box: chỉ dựa trên requirement, context feature, API/UI behavior quan sát được hoặc cần verify; không dùng source code để thiết kế test.
- Em yêu cầu đổi thuật ngữ từ `Test Data` sang `Test Case` để khớp cách trình bày trong báo cáo chính.
- Em yêu cầu đưa `Kết quả thực tế`, `Trạng thái`, và `Bug ID / Evidence` vào chung bảng test case thay vì tách thành bảng execution riêng.
- Em yêu cầu không viết bug report chi tiết trong `Main_Report.md`; nếu phát hiện bug sau khi execute, dòng test case chỉ ghi `Bug ID / Evidence` và bug chi tiết nằm ở artifact bug report riêng.
- Em giữ các actual result/status ở trạng thái `TODO` cho đến khi tự execute FR-04 trên SUT và xác nhận kết quả thực tế.

---

### Nhật ký Tương tác AI 10: Tinh chỉnh Test Case, Tái cấu trúc Gap Analysis, Đồng bộ Báo cáo Lỗi và Thiết lập GitHub Issues

- **Tên công cụ AI:** Antigravity / Gemini 3.5 Flash
- **Ngày và giờ:** 08-07-2026 23:02:00 +07:00
- **Mô tả nhiệm vụ:** Thực hiện tinh chỉnh các test case Domain/BVA cho FR-04 (sắp xếp Valid lên trước, tinh gọn ánh xạ phân hoạch đơn lỗi, định dạng N/A thành chuỗi nháy kép rỗng), tái cấu trúc phần AI Gap Analysis theo 3 khía cạnh (Prompt Quality, AI Limits, Inherent Complexity), đồng thời tích hợp và dọn dẹp các tệp báo cáo lỗi (BUG) sang bảng tổng hợp duy nhất tại Bug_Report_Template.md, thiết lập GitHub Issue template và cập nhật tài liệu tham chiếu từ định dạng .md sang .pdf.

#### 1. Các Prompt đã sử dụng

- "Review and optimize the FR-04 Domain/BVA test tables in Main_Report.md: 1) Sort all valid test cases to the top, followed by invalid ones; 2) Simplify equivalence partition (EP) mappings for invalid test cases to isolate only the targeted invalid class; 3) Standardize all 'N/A' or empty parameters to double quotes '\"\"'; 4) Remove the 'Phủ các lớp EP' column from all BVA tables. Additionally, rewrite Section 4.4 AI Gap Analysis in Main_Report.md into a structured analysis based on 3 core dimensions: Prompt Quality, AI Tool Limitations, and Inherent Complexity. Finally, consolidate all found bugs into a single master summary and detail table inside Bug_Report_Template.md, create a pure Vietnamese GitHub Issue template in .github/ISSUE_TEMPLATE/bug_report.md, and convert all .md references of the assignment documents to .pdf across all report and skill files."

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Cập nhật [Main_Report.md](./Main_Report.md): Sắp xếp các ca kiểm thử hợp lệ lên đầu ở cả hai bảng Domain Testing và BVA, chuẩn hóa cột EP cho các ca lỗi đơn lẻ chỉ ghi nhận phân hoạch lỗi chính, loại bỏ cột EP trong toàn bộ các bảng BVA, thay thế `N/A` và `Không gửi field` bằng `""`. Tái cấu trúc Section 4.4 AI Gap Analysis thành bài viết phân tích 3 khía cạnh (Chất lượng Prompt, Giới hạn công cụ AI, Độ phức tạp nội tại của chức năng) thay vì chỉ liệt kê danh sách bug đơn thuần.
- Cập nhật [Bug_Report_Template.md](./Bug_Report_Template.md): Chuyển đổi thành tệp báo cáo lỗi tổng thể gồm bảng tổng hợp các lỗi phát hiện ở đầu và các mục báo cáo chi tiết từng lỗi ở dưới bằng tiếng Việt thuần túy, có tích hợp liên kết neo nội bộ.
- Tạo tệp [.github/ISSUE_TEMPLATE/bug_report.md](./.github/ISSUE_TEMPLATE/bug_report.md) làm biểu mẫu báo cáo lỗi chuẩn tiếng Việt trên GitHub.
- Tạo tệp [GitHub_Issues_Guide.md](./GitHub_Issues_Guide.md) chứa sẵn tiêu đề và nội dung Markdown của 5 lỗi để copy-paste trực tiếp lên GitHub Issues, kèm đường dẫn ảnh bằng chứng screenshots cụ thể.
- Xóa bỏ các tệp báo cáo lỗi đơn lẻ `BUG_FR04_*.md` ở thư mục gốc để làm sạch repository.
- Cập nhật toàn bộ các tham chiếu tài liệu môn học từ đuôi `.md` sang `.pdf` trong [AI_Audit_Report.md](./AI_Audit_Report.md), [Main_Report.md](./Main_Report.md) và các tệp cấu hình của bộ kỹ năng trong thư mục `.agents/skills/`.

#### 3. Rà soát và Chỉnh sửa của con người

- Em yêu cầu các lớp lỗi của single fault test case chỉ ghi nhận lớp lỗi chính để cô lập lỗi theo đúng kỹ thuật kiểm thử.
- Em yêu cầu tái cấu trúc mục AI Gap Analysis để giải thích rõ nguyên nhân khoảng cách kỹ thuật thay vì chỉ liệt kê lỗi của ứng dụng.
- Em yêu cầu loại bỏ toàn bộ biểu tượng emoji và các dịch nghĩa tiếng Anh trong các tệp biểu mẫu báo cáo lỗi và hướng dẫn issue để đảm bảo tính nhất quán của ngôn ngữ tiếng Việt.
- Em yêu cầu chuyển ngữ 100% các tiêu đề (Title) của các Issue sang tiếng Việt để người đọc dễ theo dõi.
- Em đã kiểm tra và xác nhận cấu trúc bảng tổng hợp lỗi và việc dọn dẹp các tệp tin lẻ đã hoàn tất chính xác trước khi thực hiện commit.
