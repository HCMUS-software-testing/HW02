# Báo cáo Nhật ký Tương tác AI (AI Audit Report)

**Tuyên bố:** Em sử dụng các công cụ AI cho các nhiệm vụ sau: lập kế hoạch chiến lược bài tập, thiết kế các Agent Skills có thể tái sử dụng, sinh các ca kiểm thử cho Domain Testing và BVA, soát xét tính căn bản lý thuyết, và phân tích các điểm thiếu sót của AI (AI Gap Analysis).

**Ghi chú về prompt:** Các prompt trong báo cáo audit được ghi dưới dạng tóm tắt/chuẩn hóa từ các tương tác thực tế với AI. Nội dung giữ nguyên mục đích kiểm thử, phạm vi artifact và vai trò human review, nhưng đã được biên tập lại để ngắn gọn, rõ ràng và phù hợp với quy trình Agent Skill của bài nộp.

---

### Nhật ký Tương tác AI 1: Thiết lập Dự án Ban đầu và Lập kế hoạch

- **Tên công cụ AI:** Gemini
- **Ngày và giờ:** 06-07-2026 14:30:00 +07:00
- **Mô tả nhiệm vụ:** Hỗ trợ lập kế hoạch ban đầu cho bài HW02, bao gồm chiến lược làm bài, đề xuất cấu trúc dự án, ý tưởng xây dựng Agent Skills, gợi ý quy trình làm việc với Git và ý tưởng cho biểu mẫu báo cáo.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Bạn là 1 senior QA/QC có kinh nghiệm lâu năm trong lĩnh vực testing. Hãy giúp em lên kế hoạch chi tiết để em có thể thực hiện giải bài tập này một cách hoàn thiện nhất tuân thủ các yêu vụ trong file pdf...
> ```
>
> **Prompt 2:**
>
> ```text
> Hãy dựa trên plan đã được lên, Hãy giúp em thực hiện giai đoạn 1 là chuẩn bị Agent Skills.
> ```
>
> **Prompt 3:**
>
> ```text
> Yêu cầu cập nhật kế hoạch: chia nhỏ Git commits, thêm Traceability Matrix, không nộp các tệp SUT không cần thiết.
> ```

#### 2. Tóm tắt kết quả của AI

- Đề xuất kế hoạch hành động ban đầu gồm nhiều giai đoạn để hoàn thành bài HW02.
- Gợi ý sử dụng các quy trình AI/Agent có thể tái sử dụng cho Domain Testing, Boundary Value Analysis, và trích xuất AI Audit.
- Đề xuất cấu trúc báo cáo cho các tính năng được chọn: FR-04, FR-08, FR-15, và FR-06.
- Gợi ý kiểm soát quy trình như chia nhỏ commit Git, thông tin độ phủ/truy vết, và tránh nộp các tệp SUT không cần thiết.
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

> **Prompt 1:**
>
> ```text
> Em đang trong quá trình làm bài tập kiểm thử Domain + boundary testing... Hãy nhận xét phần chuẩn bị của em, và tiến hành chỉnh sửa để hoàn thiện cho phần plan và agent skill.
> ```
>
> **Prompt 2:**
>
> ```text
> Thứ nhất, Toàn bộ plan, skill đã match requirement hay chưa. Thứ hai, Agent Skill hiện tại đã có thể cover được hết hay chưa. Và cách để em có thể thực hiện được agent skill này là như thế nào (workflow)
> ```
>
> **Prompt 3:**
>
> ```text
> Em cần làm rõ... AI first, human review nghĩa là chúng ta sẽ cho AI tự động chạy kiểm thử web rồi ghi bug hay chỉ dừng lại ở việc sinh test case... theo như plan hay skill thì đã match với phần lí thuyết ở domain testing pdf chưa và đã thoả mãn được ISTQB hay chưa.
> ```
>
> **Prompt 4:**
>
> ```text
> Hãy xuất AI Audit Report theo mẫu audit của bài, chỉ ghi nhận các artifact và quyết định đã được rà soát.
> ```

#### 2. Tóm tắt kết quả của AI

- Đã soát xét các yêu cầu của bài tập HW02 và các tài liệu chính sách làm bài tập.
- Đã soát xét tệp [HW02_Action_Plan.md](./references/development_process/HW02_Action_Plan.md) hiện tại, các tệp Agent Skill và báo cáo AI audit hiện có.
- Viết lại và tinh chỉnh [HW02_Action_Plan.md](./references/development_process/HW02_Action_Plan.md) để bổ sung checklist yêu cầu, phạm vi tính năng, quy trình cho từng feature, định nghĩa hoàn thành (DoD), yêu cầu AI Audit/Critique, yêu cầu Git log, README, xuất PDF và quy tắc đặt tên tệp nộp bài.
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

> **Prompt 1:**
>
> ```text
> Clarify and improve the current Agent Skills so they include methodology/reference basis and strict rules before starting feature testing.
> ```
>
> **Prompt 2:**
>
> ```text
> Update the Agent Skill documentation so the usage workflow is clearer for demo/video preparation.
> ```
>
> **Prompt 3:**
>
> ```text
> Write the skill usage guide in Vietnamese so it is easier to follow during testing and demo recording.
> ```

#### 2. Tóm tắt kết quả của AI

- Cập nhật [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) với phần Cơ sở phương pháp dựa trên bài giảng Domain Testing: biến input/output, lớp tương đương, giá trị đại diện và chuyển giao biên.
- Cập nhật [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) với các quy tắc nghiêm ngặt: tư duy black-box trước, không tự bịa quy tắc ràng buộc, không tự khẳng định kết quả thực tế/bug, các checkpoint bắt buộc, điều kiện đầu vào và đầu ra.
- Cập nhật [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) với phương pháp BVA: các phân hoạch có thứ tự, biên dưới/biên trên, các giá trị min/min-1/min+1/max/max-1/max+1, và giữ giá trị bình thường cho các biến khác.
- Cập nhật [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) với các quy tắc nghiêm ngặt: không tự bịa min/max, không trộn lẫn stress test với BVA chính thống, không tự điền kết quả thực tế, điều kiện đầu vào và đầu ra.
- Cập nhật [audit_extraction/SKILL.md](./.agents/skills/audit_extraction/SKILL.md) để khớp với mẫu AI Audit giản lược sử dụng trong báo cáo chính thức.
- Tạo tệp giới thiệu tiếng Việt [.agents/README.md](./.agents/README.md) để giải thích mục đích, tài liệu tham chiếu lý thuyết, danh sách skill, nguyên tắc kiểm soát, quy trình chạy skill và khuyến nghị demo.
- Tạo tệp [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md) bằng tiếng Việt làm kịch bản quay video demo quy trình Agent Skills.
- Tạo tệp [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md) bằng tiếng Việt làm checklist làm việc cho từng tính năng được chọn.

#### 3. Rà soát và Chỉnh sửa của con người

- Em yêu cầu các Agent Skills phải bao gồm cơ sở phương pháp/tài liệu tham chiếu, không chỉ là các prompt vận hành.
- Em quyết định giữ phần tóm tắt phương pháp bên trong mỗi tệp `SKILL.md` nhưng di chuyển các giải thích chi tiết về cách dùng/demo sang [.agents/README.md](./.agents/README.md), [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md), và [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md).
- Em yêu cầu các tài liệu hướng dẫn viết bằng tiếng Việt để dễ theo dõi và thực hiện trong quá trình kiểm thử thực tế và quay video.

---

### Nhật ký Tương tác AI 4: Đồng bộ Cấu trúc Báo cáo Chính

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 07-07-2026 22:45:00 +07:00
- **Mô tả nhiệm vụ:** Đồng bộ hóa cấu trúc báo cáo với yêu cầu nộp bài của HW02 là báo cáo chính phải bao gồm báo cáo Domain Testing và BVA của toàn bộ 4 tính năng đã chọn.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Re-check the HW02 submission regulation and align the report structure so the feature reports are included in the main report.
> ```
>
> **Prompt 2:**
>
> ```text
> Update the workflow and demo guidance so approved skill outputs are copied into `Main_Report.md`, not treated as separate final feature reports.
> ```

#### 2. Tóm tắt kết quả của AI

- Đọc lại quy định nộp bài HW02 và xác nhận tệp zip yêu cầu phải chứa một báo cáo chính bằng Markdown và PDF, bao gồm báo cáo Domain Testing và BVA.
- Tạo tệp [Main_Report.md](./Main_Report.md) làm khung báo cáo chính chứa các mục cho FR-04, FR-08, FR-15, và FR-06.
- Thêm các phần trong [Main_Report.md](./Main_Report.md) cho tổng quan tính năng, xác định yêu cầu/quy tắc, phân tích Domain Testing, BVA, kết quả thực thi, báo cáo lỗi, AI Gap Analysis, tổng hợp kiểm thử, Agent Skills/video demo, tài liệu tham chiếu và phụ lục.
- Cập nhật [HW02_Action_Plan.md](./references/development_process/HW02_Action_Plan.md) để làm rõ rằng toàn bộ nội dung kiểm thử cuối cùng phải được hợp nhất vào [Main_Report.md](./Main_Report.md).
- Cập nhật [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md) để mỗi đầu ra Domain/BVA được duyệt sẽ được copy vào phần tương ứng của [Main_Report.md](./Main_Report.md).
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

> **Prompt 1:**
>
> ```text
> Review the current reporting preparation and add a bug report template if it is missing.
> ```
>
> **Prompt 2:**
>
> ```text
> Clarify how the detailed bug report template should relate to the bug summary in the main report.
> ```

#### 2. Tóm tắt kết quả của AI

- Tạo tệp [Bug_Report.md](./Bug_Report.md) cho các lỗi được xác nhận.
- Đưa vào các trường thông tin lỗi bắt buộc: Bug ID, tính năng, tiêu đề, mức độ nghiêm trọng, độ ưu tiên, trạng thái, môi trường, người báo cáo, GitHub Issue, ảnh chụp/bằng chứng, tiền điều kiện, các bước tái hiện, kết quả mong đợi, kết quả thực tế, tham chiếu test case, và ghi chú thêm.
- Cập nhật [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md) để tham chiếu đến [Bug_Report.md](./Bug_Report.md) trong bước ghi nhận lỗi.
- Cập nhật [Main_Report.md](./Main_Report.md) để làm rõ rằng báo cáo chính nên chứa tóm tắt lỗi và chi tiết lỗi cuối cùng, trong khi [Bug_Report.md](./Bug_Report.md) dùng để viết chi tiết khi tạo GitHub Issue.

#### 3. Rà soát và Chỉnh sửa của con người

- Em xác nhận rằng báo cáo lỗi phải dựa trên hành vi thực tế đã kiểm chứng trên SUT, không dựa trên dự đoán của AI.
- Em làm rõ rằng [Bug_Report.md](./Bug_Report.md) là biểu mẫu dùng để soạn thảo lỗi chi tiết/GitHub Issue, trong khi [Main_Report.md](./Main_Report.md) vẫn là báo cáo chính thức được nộp.

---

### Nhật ký Tương tác AI 6: Thắt chặt Agent Skill Black-Box và Đồng bộ Tham chiếu

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 08-07-2026 15:46:52 +07:00
- **Mô tả nhiệm vụ:** Kiểm tra lại và thắt chặt các Agent Skills của HW02 để đảm bảo tuân thủ kiểm thử hộp đen (black-box) cho Domain Testing/BVA, đồng bộ với các tệp yêu cầu/lý thuyết được cung cấp và bổ sung tệp tham chiếu có thể truy vết.

#### 1. Các Prompt đã sử dụng

> **Prompt:**
>
> ```text
> Review and update the current HW02 Agent Skills as a senior QA/QC. Ensure the Domain Testing and BVA skills are strictly black-box: they must use only requirement/context, public API/UI behavior, and observable SUT responses to design context, equivalence classes, boundaries, expected results, or test cases. Cross-check the skills against the attached requirement and theory files: [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf), [___2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf), [04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf), [23127205.pdf](./references/23127205.pdf), and [ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf). Redesign the skills in Vietnamese using the canonical structure `.agents/skills/[skill_name]/SKILL.md` with a `references/` folder for methodology and report-style evidence. Update the workflow/demo documentation so it matches the final skill structure. Do not include meta discussion in the audit; only record changes that create, modify, or validate final assignment artifacts.
> ```

#### 2. Tóm tắt kết quả của AI / Sản phẩm được tạo ra

- Đã đối chiếu các Agent Skills hiện tại với yêu cầu bài tập ([2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf)), chính sách làm bài ([\_\_\_2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf)), bài giảng Domain Testing ([04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf)), mẫu báo cáo ([23127205.pdf](./references/23127205.pdf)) và tài liệu ISTQB CT-AI ([ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf)).
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
- Loại bỏ các tệp lớn không cần thiết bị sao chép nhầm vào thư mục skill, chỉ giữ lại các tệp tham chiếu ngắn gọn, cô đọng.

#### 3. Rà soát và Chỉnh sửa của con người

- Em đã đặt câu hỏi liệu thiết kế skill trước đây có thực sự là hộp đen hay không khi phạm vi dữ liệu đầu vào chưa được giới hạn đủ rõ.
- Em làm rõ rằng ngữ cảnh của Domain Testing và BVA phải đến từ tài liệu yêu cầu, API spec công khai, giao diện UI và hành vi thực tế quan sát được của SUT.
- Em yêu cầu viết các Agent Skills và tài liệu hướng dẫn bằng tiếng Việt để phục vụ tốt nhất cho việc quay video và chạy test.
- Em yêu cầu mỗi skill có một thư mục `references/` để dễ dàng truy vết lý thuyết trong buổi vấn đáp bảo vệ bài tập.
- Em đồng ý với cấu trúc chuẩn gồm một thư mục cho mỗi skill, bên trong chứa `SKILL.md` và chi tiết `references/` cô đọng.

---

### Nhật ký Tương tác AI 7: Soát xét Độ phủ Yêu cầu Trước Kiểm thử

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 08-07-2026 16:23:07 +07:00
- **Mô tả nhiệm vụ:** Trước khi bắt đầu kiểm thử chi tiết từng tính năng, rà soát lại độ phủ yêu cầu của bài tập và cập nhật các sản phẩm chuẩn bị để đảm bảo repository có đầy đủ báo cáo chính, README, khung AI Critique, Git log, Agent Skills và biểu mẫu quy trình.

#### 1. Các Prompt đã sử dụng

> **Prompt:**
>
> ```text
> Before starting feature testing, carefully check each requirement in [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf) against the current HW02 repository. Identify any missing or outdated preparation artifacts, then update the necessary files so the project is ready for feature-level Domain Testing and BVA. Keep the Domain/BVA workflow aligned with the sample [23127205.pdf](./references/23127205.pdf) and do not create actual test results or bugs before SUT execution.
> ```

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
- Tạo tệp [./AI_Critique.md](./AI_Critique.md) làm khung bài viết critique để điền sau khi test xong.
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

> **Prompt:**
>
> ```text
> Em muốn tối ưu hóa cấu trúc báo cáo Domain Testing và BVA trong `Main_Report.md` cùng bộ Agent Skills (`.agents/skills/`). Cụ thể: 1) Chuyển đổi các bước thiết kế test (xác định Input/Output, Condition, và EP) từ dạng danh sách liệt kê sang dạng bảng (Table) có thêm cột giải thích chi tiết (Rationale) bằng tiếng Việt; 2) Thêm cột 'Giải thích nguồn gốc biên (Rationale)' vào bảng BVA Step 2; 3) Cập nhật đồng bộ toàn bộ đường dẫn và kịch bản demo liên quan sau khi em di chuyển `AI_Audit_Report.md` và `AI_Critique.md` ra thư mục gốc `HW02`.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Tái cấu trúc [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) để hướng dẫn AI xuất các bảng biểu Markdown thay vì danh sách liệt kê ở các bước 1, 2, 3 của Domain Testing, đi kèm các cột giải thích chi tiết Rationale.
- Tái cấu trúc [bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) để bổ sung yêu cầu cột Rationale giải thích biên cho bảng Step 2.
- Cấu trúc lại báo cáo [Main_Report.md](./Main_Report.md):
  - Mục 3 (Methodology): Bổ sung cơ sở lý thuyết của việc dùng bảng và Rationale.
  - Mục 4.2 (FR-04 Domain Testing): Chuyển đổi toàn bộ Step 1, 2, 3 sang dạng bảng tiếng Việt và điền đầy đủ nội dung giải thích (Rationale) nghiệp vụ của SUT.
  - Mục 4.3 (FR-04 BVA): Thiết kế bảng Step 1 và Step 2 BVA tiếng Việt có giải thích nguồn gốc biên, đồng thời sinh 6 kịch bản kiểm thử biên (TC01 đến TC06) ở Step 3 có phủ các mã biên và để trống cột kết quả thực tế.
  - Mục 5, 6, 7 (FR-08, FR-15, FR-06): Dọn dẹp nội dung nháp trùng lặp, xây dựng các khung bảng rỗng dạng `TODO` để chuẩn bị kiểm thử cho các feature tiếp theo.
- Cập nhật đồng bộ các đường dẫn tệp tin báo cáo ([./AI_Audit_Report.md](./AI_Audit_Report.md), [./AI_Critique.md](./AI_Critique.md) ở thư mục gốc) và định dạng bảng mới trong các tệp hướng dẫn [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md), [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md), và [README.md](./README.md).

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

> **Prompt 1:**
>
> ```text
> Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`. Dùng context FR-04 Personal Profile Management trong `HW02/Feature_Contexts.md`. Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
> ```
>
> **Prompt 2:**
>
> ```text
> OK. Tiếp tục Step 2: xác định Condition cho FR-04. Giữ đúng nguyên tắc black-box, chỉ dùng requirement/context/API/UI public behavior và không tự kết luận actual result hoặc bug.
> ```
>
> **Prompt 3:**
>
> ```text
> OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP) cho FR-04. Mỗi EP phải liên kết với condition tương ứng và phân biệt rõ valid/invalid.
> ```
>
> **Prompt 4:**
>
> ```text
> OK. Tiếp tục Step 4: xác định Test Case cho FR-04. Bảng test case phải có mã `FR04-DOM-TCxx`, input cụ thể, expected result, các cột `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` để TODO, và coverage EP.
> ```
>
> **Prompt 5:**
>
> ```text
> Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`. Dùng Domain Testing output đã được review cho FR-04. Chỉ thực hiện Step 1: xác định input/output có thể áp dụng BVA.
> ```
>
> **Prompt 6:**
>
> ```text
> OK. Tiếp tục Step 2: xác định biên và cận biên cho FR-04. Không tự tạo boundary nếu không có căn cứ black-box; ghi rõ rationale cho từng boundary.
> ```
>
> **Prompt 7:**
>
> ```text
> OK. Tiếp tục Step 3: xác định BVA Test Case cho FR-04. Bảng test case phải có mã `FR04-BVA-TCxx`, giá trị biên được test, expected result, actual/status/evidence để TODO, và coverage mã biên.
> ```

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

- Em xác nhận phạm vi FR-04 là black-box: chỉ dựa trên requirement, context feature, API/UI behavior quan sát được hoặc cần verify.
- Em yêu cầu đổi thuật ngữ từ `Test Data` sang `Test Case` để khớp cách trình bày trong báo cáo chính.
- Em yêu cầu đưa `Kết quả thực tế`, `Trạng thái`, và `Bug ID / Evidence` vào chung bảng test case thay vì tách thành bảng execution riêng.
- Em yêu cầu không viết bug report chi tiết trong `Main_Report.md`; nếu phát hiện bug sau khi execute, dòng test case chỉ ghi `Bug ID / Evidence` và bug chi tiết nằm ở artifact bug report riêng.
- Em giữ các actual result/status ở trạng thái `TODO` cho đến khi tự execute FR-04 trên SUT và xác nhận kết quả thực tế.

---

### Nhật ký Tương tác AI 10: Tinh chỉnh Test Case, Tái cấu trúc Gap Analysis, Đồng bộ Báo cáo Lỗi và Thiết lập GitHub Issues

- **Tên công cụ AI:** Antigravity / Gemini 3.5 Flash
- **Ngày và giờ:** 08-07-2026 23:02:00 +07:00
- **Mô tả nhiệm vụ:** Thực hiện tinh chỉnh các test case Domain/BVA cho FR-04 (sắp xếp Valid lên trước, tinh gọn ánh xạ phân hoạch đơn lỗi, định dạng N/A thành chuỗi nháy kép rỗng), tái cấu trúc phần AI Gap Analysis theo 3 khía cạnh (Prompt Quality, AI Limits, Inherent Complexity), đồng thời tích hợp và dọn dẹp các tệp báo cáo lỗi (BUG) sang bảng tổng hợp duy nhất tại Bug_Report.md, thiết lập GitHub Issue template và cập nhật tài liệu tham chiếu từ định dạng .md sang .pdf.

#### 1. Các Prompt đã sử dụng

> **Prompt:**
>
> ```text
> Review and optimize the FR-04 Domain/BVA test tables in Main_Report.md: 1) Sort all valid test cases to the top, followed by invalid ones; 2) Simplify equivalence partition (EP) mappings for invalid test cases to isolate only the targeted invalid class; 3) Standardize all 'N/A' or empty parameters to double quotes '\"\"'; 4) Remove the 'Phủ các lớp EP' column from all BVA tables. Additionally, rewrite Section 4.4 AI Gap Analysis in Main_Report.md into a structured analysis based on 3 core dimensions: Prompt Quality, AI Tool Limitations, and Inherent Complexity. Finally, consolidate all found bugs into a single master summary and detail table inside Bug_Report.md, create a pure Vietnamese GitHub Issue template in .github/ISSUE_TEMPLATE/bug_report.md, and convert all .md references of the assignment documents to .pdf across all report and skill files.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Cập nhật [Main_Report.md](./Main_Report.md): Sắp xếp các ca kiểm thử hợp lệ lên đầu ở cả hai bảng Domain Testing và BVA, chuẩn hóa cột EP cho các ca lỗi đơn lẻ chỉ ghi nhận phân hoạch lỗi chính, loại bỏ cột EP trong toàn bộ các bảng BVA, thay thế `N/A` và `Không gửi field` bằng `""`. Tái cấu trúc Section 4.4 AI Gap Analysis thành bài viết phân tích 3 khía cạnh (Chất lượng Prompt, Giới hạn công cụ AI, Độ phức tạp nội tại của chức năng) thay vì chỉ liệt kê danh sách bug đơn thuần.
- Cập nhật [Bug_Report.md](./Bug_Report.md): Chuyển đổi thành tệp báo cáo lỗi tổng thể gồm bảng tổng hợp các lỗi phát hiện ở đầu và các mục báo cáo chi tiết từng lỗi ở dưới bằng tiếng Việt thuần túy, có tích hợp liên kết neo nội bộ.
- Tạo tệp [.github/ISSUE_TEMPLATE/bug_report.md](./.github/ISSUE_TEMPLATE/bug_report.md) làm biểu mẫu báo cáo lỗi chuẩn tiếng Việt trên GitHub.
- Tạo tệp [GitHub_Issues_Guide.md](./GitHub_Issues_Guide.md) chứa sẵn tiêu đề và nội dung Markdown của 5 lỗi để copy-paste trực tiếp lên GitHub Issues, kèm đường dẫn ảnh bằng chứng screenshots cụ thể.
- Lưu trữ script thực thi kiểm thử FR-04 tại [test_fr04.js](./references/execution_scripts/test_fr04.js) để làm evidence kỹ thuật cho các kết quả API/UI quan sát được.
- Xóa bỏ các tệp báo cáo lỗi đơn lẻ `BUG_FR04_*.md` ở thư mục gốc để làm sạch repository.
- Cập nhật toàn bộ các tham chiếu tài liệu môn học từ đuôi `.md` sang `.pdf` trong [AI_Audit_Report.md](./AI_Audit_Report.md), [Main_Report.md](./Main_Report.md) và các tệp cấu hình của bộ kỹ năng trong thư mục `.agents/skills/`.

#### 3. Rà soát và Chỉnh sửa của con người

- Em yêu cầu các lớp lỗi của single fault test case chỉ ghi nhận lớp lỗi chính để cô lập lỗi theo đúng kỹ thuật kiểm thử.
- Em yêu cầu tái cấu trúc mục AI Gap Analysis để giải thích rõ nguyên nhân khoảng cách kỹ thuật thay vì chỉ liệt kê lỗi của ứng dụng.
- Em yêu cầu loại bỏ toàn bộ biểu tượng emoji và các dịch nghĩa tiếng Anh trong các tệp biểu mẫu báo cáo lỗi và hướng dẫn issue để đảm bảo tính nhất quán của ngôn ngữ tiếng Việt.
- Em yêu cầu chuyển ngữ 100% các tiêu đề (Title) của các Issue sang tiếng Việt để người đọc dễ theo dõi.
- Em đã kiểm tra và xác nhận cấu trúc bảng tổng hợp lỗi và việc dọn dẹp các tệp tin lẻ đã hoàn tất chính xác trước khi thực hiện commit.

### Nhật ký Tương tác AI 11: Thiết kế Domain Testing và BVA cho FR-08 (Checkout)

- **Tên công cụ AI:** Antigravity / Gemini 3.5 Flash
- **Ngày và giờ:** 09-07-2026 01:12:00 +07:00
- **Mô tả nhiệm vụ:** Thiết kế kiểm thử phân hoạch tương đương (Equivalent Partitioning / Domain Testing) và phân tích giá trị biên (Boundary Value Analysis / BVA) cho tính năng FR-08: Checkout theo hướng black-box, và cập nhật kết quả vào báo cáo chính.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`. Dùng context FR-08: Checkout trong `HW02/Feature_Contexts.md`. Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
> ```
>
> **Prompt 2:**
>
> ```text
> OK. Tiếp tục Step 2: xác định Condition cho FR-08. Giữ đúng nguyên tắc black-box, chỉ dùng requirement/context/API/UI public behavior và không tự kết luận actual result hoặc bug.
> ```
>
> **Prompt 3:**
>
> ```text
> OK. Tiếp tục Step 3: xác định miền phân hoạch tương đương (EP) cho FR-08. Mỗi EP phải liên kết với condition tương ứng và phân biệt rõ valid/invalid.
> ```
>
> **Prompt 4:**
>
> ```text
> OK. Tiếp tục Step 4: xác định Test Case cho FR-08. Bảng test case phải có mã `FR08-DOM-TCxx`, input cụ thể, expected result, các cột `Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence` để TODO, và coverage EP.
> ```
>
> **Prompt 5:**
>
> ```text
> Đọc và làm theo `HW02/.agents/skills/bva_testing/SKILL.md`. Dùng Domain Testing output đã được duyệt và context FR-08: Checkout trong `HW02/Feature_Contexts.md`. Chỉ thực hiện Step 1. Chưa xác định giá trị biên chi tiết và chưa sinh BVA Test Case.
> ```
>
> **Prompt 6:**
>
> ```text
> OK. Tiếp tục Step 2: xác định giá trị biên và cận biên.
> ```
>
> **Prompt 7:**
>
> ```text
> OK. Tiếp tục Step 3: xác định BVA Test Case.
> ```
>
> **Prompt 8:**
>
> ```text
> Tôi đồng ý cập nhật các nội dung đã duyệt của Step 1, Step 2 và Step 3 vào Main_Report.md.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Tạo phần Domain Testing / EP của FR-08 trong tệp [Main_Report.md](./Main_Report.md) gồm:
  - Step 1: Xác định 14 tham số/biến đầu vào, đầu ra và trạng thái liên quan đến checkout.
  - Step 2: Xác định 14 điều kiện kiểm thử `C1` đến `C14`.
  - Step 3: Phân chia 29 miền phân hoạch tương đương `E1` đến `E29` cho các điều kiện.
  - Step 4: Thiết kế 14 test case Domain Testing `FR08-DOM-TC01` đến `FR08-DOM-TC14`.
- Tạo phần BVA cho FR-08 trong tệp [Main_Report.md](./Main_Report.md) gồm:
  - Step 1: Xác định 10 tham số và đánh giá khả năng áp dụng BVA, lựa chọn 6 tham số số/độ dài/tiền tệ làm đối tượng cho BVA.
  - Step 2: Xác định chi tiết giá trị biên, cận biên dưới/trên ngoài và trong cho 6 tham số trên (`FR08-BVA-B01` đến `FR08-BVA-B06`).
  - Step 3: Thiết kế 18 BVA Test Case tương ứng phủ các giá trị biên (`FR08-BVA-TC01` đến `FR08-BVA-TC18`).
- Các cột thực thi (`Kết quả thực tế`, `Trạng thái`, `Bug ID / Evidence`) ở cả hai bảng đều ở trạng thái `TODO` theo đúng quy tắc hộp đen.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên rà soát các biến đầu vào và đầu ra, yêu cầu thêm biến `request_body_completeness` ở phần Domain Testing để kiểm thử cấu trúc body của API checkout.
- Sinh viên yêu cầu kiểm chứng hành vi thực tế của API SUT đối với các giá trị dị biệt như empty cart hoặc sai lệch `total_amount` bằng script thử nghiệm [test_fr08_checkout.js](./references/execution_scripts/test_fr08_checkout.js) trước khi chốt kết quả mong đợi.
- Sinh viên kiểm duyệt và đồng ý từng bước của quy trình trước khi cho phép AI cập nhật vào tệp báo cáo chính.
- Các cột kết quả thực thi và trạng thái được giữ ở `TODO` cho đến khi thực hiện chạy trực tiếp trên ứng dụng.

---

### Nhật ký Tương tác AI 12: Kiểm thử thực tế, hoàn thiện BVA và Báo cáo lỗi cho FR-15 (Product Management CRUD)

- **Tên công cụ AI:** Antigravity / Gemini 3.5 Flash
- **Ngày và giờ:** 09-07-2026 16:10:00 +07:00
- **Mô tả nhiệm vụ:** Hỗ trợ lập danh sách ca kiểm thử black-box, viết và chạy script test tự động bằng Node.js để gọi các API công khai của Product CRUD (FR-15), hoàn thiện báo cáo BVA và Domain Testing trong Main_Report.md, cập nhật danh sách lỗi phát hiện vào Bug_Report.md.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Hãy giúp tôi xây dựng script để kiểm thử các test case FR15 qua API công khai, tìm bug thực tế, đồng thời hoàn thiện BVA cho FR15 - Product Management.
> ```
>
> **Prompt 2:**
>
> ```text
> Thực hiện cập nhật BVA cho FR-15 trong Main_Report.md dựa trên dữ liệu thực tế thu được từ file test_fr15.js.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Tạo script test tự động [test_fr15.js](./references/execution_scripts/test_fr15.js) để gọi trực tiếp các API Product CRUD (GET, POST, PUT, DELETE) với các kịch bản kiểm thử phân quyền, BVA, và Domain testing.
- Cập nhật [Main_Report.md](./Main_Report.md):
  - Điền kết quả thực tế cho 14 test case Domain Testing của FR-15 (`FR15-DOM-TC01` đến `FR15-DOM-TC14`).
  - Thiết lập bảng BVA Step 1, Step 2 và Step 3 gồm 10 test case BVA (`FR15-BVA-TC01` đến `FR15-BVA-TC10`) phủ các giá trị biên của name length, price và category_id.
  - Viết phần 6.4 AI Gap Analysis cho FR-15 phân tích nguyên nhân khoảng cách giữa lý thuyết thiết kế kiểm thử và thực tế thực thi.
- Cập nhật [Bug_Report.md](./Bug_Report.md):
  - Thêm 4 lỗi mới (`BUG-FR15-01` đến `BUG-FR15-04`) vào bảng tổng hợp danh sách lỗi và viết báo cáo lỗi chi tiết của từng bug này.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên xác nhận cách ghi nhận kết quả phải dựa trên hành vi quan sát được khi gọi API công khai và thao tác trên giao diện, đúng định hướng black-box của bài.
- Sinh viên rà soát các kết quả thực tế thu được từ script kiểm thử tự động, đối chiếu với expected result để gán trạng thái Passed/Failed cho các test case và liên kết chúng đến các mã lỗi tương ứng.
- Sinh viên kiểm duyệt nội dung phân tích khoảng cách AI (AI Gap Analysis), bổ sung lý do về giới hạn của thiết kế test ban đầu khi chưa execute trực tiếp trên SUT.

---

### Nhật ký Tương tác AI 13: Thiết kế Domain Testing cho FR-15 theo Agent Skill

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 09-07-2026 18:30:00 +07:00
- **Mô tả nhiệm vụ:** Sử dụng Agent Skill Domain Testing để thiết kế từng bước phân tích miền cho FR-15 Product Management CRUD dựa trên context trong `Feature_Contexts.md`, sau đó cập nhật nội dung được duyệt vào báo cáo chính.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Đọc và làm theo `HW02/.agents/skills/domain_testing/SKILL.md`. Dùng context FR15 Product management CRUD trong `HW02/Feature_Contexts.md`. Chỉ thực hiện Step 1: xác định Input và Output. Chưa tạo Condition, EP hoặc bảng Test Case.
> ```
>
> **Prompt 2:**
>
> ```text
> Step 2: xác định Condition cho FR-15.
> ```
>
> **Prompt 3:**
>
> ```text
> Step 3: xác định miền phân hoạch tương đương (EP).
> ```
>
> **Prompt 4:**
>
> ```text
> OK. Tiếp tục Step 4: xác định Test Case.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Đọc và tuân thủ [domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) trước khi thiết kế test.
- Cập nhật phần FR-15 Domain Testing trong [Main_Report.md](./Main_Report.md):
  - Step 1: xác định input/output/state cho Product CRUD như `auth_state`, `crud_operation`, `product_id`, `name`, `price`, `description`, `imageUrl`, `category_id`, trạng thái category list, target product và các output/error tương ứng.
  - Step 2: xác định các condition nghiệp vụ và trạng thái quan sát được cho create/update/delete.
  - Step 3: chia miền phân hoạch tương đương hợp lệ/không hợp lệ cho phân quyền, ID sản phẩm, dữ liệu body, category và kết quả product list/detail.
  - Step 4: thiết kế bảng test case Domain Testing `FR15-DOM-TC01` đến `FR15-DOM-TC19`, bao gồm cả ca kiểm tra update isolation ở API và bug giao diện Web Admin.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên yêu cầu thực hiện đúng từng bước, không sinh Condition/EP/Test Case trước khi được duyệt.
- Sinh viên bổ sung các bug thực tế quan sát được sau khi execute, gồm `name` dài hơn 255 vẫn được chấp nhận, thiếu `price` vẫn được chấp nhận, `category_id` ngoài danh sách vẫn được chấp nhận, và bug UI update làm đổi tên các product khác.
- Sinh viên yêu cầu giữ phân biệt giữa lỗi API và lỗi giao diện để tránh gộp sai root cause.

---

### Nhật ký Tương tác AI 14: Hoàn thiện Script Kiểm thử, BVA, Bug Report và AI Gap cho FR-15

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 09-07-2026 19:20:00 +07:00
- **Mô tả nhiệm vụ:** Hoàn thiện script kiểm thử FR-15, cập nhật Domain/BVA test result, bổ sung bug report, và rà soát lại AI Gap Analysis để phản ánh chi tiết khoảng cách giữa thiết kế AI ban đầu và hành vi thực tế của SUT.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Hãy xây dựng script kiểm thử tự động cho các test case FR-15 qua API công khai, ghi nhận kết quả thực tế và hỗ trợ xác định bug.
> ```
>
> **Prompt 2:**
>
> ```text
> Dựa trên Domain Testing FR-15 đã được duyệt, hãy hoàn thiện phần BVA, Bug Report và AI Gap Analysis trong các artifact tương ứng.
> ```
>
> **Prompt 3:**
>
> ```text
> Rà soát lại FR-15 để phát hiện test case còn thiếu, bug còn thiếu, và cập nhật AI Gap Analysis chi tiết hơn dựa trên kết quả thực thi.
> ```
>
> **Prompt 4:**
>
> ```text
> Bổ sung bug giao diện Web Admin: sau khi cập nhật thành công một product, tên của các product khác trên giao diện cũng bị thay đổi.
> ```
>
> **Prompt 5:**
>
> ```text
> Bổ sung các bug validation FR-15 đã quan sát được: `name` dài hơn 255 ký tự vẫn được chấp nhận, thiếu `price` vẫn được chấp nhận, và `category_id` ngoài danh sách category vẫn được chấp nhận.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Cập nhật script [test_fr15.js](./references/execution_scripts/test_fr15.js) để kiểm thử các test case Domain Testing và BVA của FR-15 qua API Product CRUD.
- Cập nhật [Main_Report.md](./Main_Report.md):
  - Bổ sung thêm các test case còn thiếu cho FR-15, nâng tổng số test case được thiết kế/thực thi lên 30.
  - Cập nhật kết quả thực tế, trạng thái Pass/Fail và liên kết `BUG-FR15-01` đến `BUG-FR15-05`.
  - Bổ sung các BVA case quan trọng cho `name` length 254/255/256, `price=-1/0/1/2`, missing required fields và category không tồn tại.
  - Cập nhật summary của FR-15 thành 30 designed, 30 executed, 10 passed, 20 failed, 5 confirmed bugs.
- Cập nhật [Bug_Report.md](./Bug_Report.md):
  - Mở rộng `BUG-FR15-02` để bao phủ thiếu field bắt buộc, `name` rỗng/quá dài, `price=0`, `price=-1`, sai kiểu dữ liệu.
  - Bổ sung `BUG-FR15-05` cho lỗi Web Admin update một product làm đổi tên các product khác.
- Cập nhật phần `6.4 AI Gap Analysis` của FR-15 để nêu rõ các behavior thực tế của SUT, tác động đến test suite, và rủi ro còn lại.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên cung cấp thêm bug quan sát thủ công trên giao diện Web Admin, giúp tách lỗi UI state/rendering khỏi API update isolation.
- Sinh viên yêu cầu kiểm tra lại các bug validation đã thật sự được ghi nhận trong bug report hay chưa.
- Sinh viên yêu cầu AI Gap Analysis phải chi tiết hơn, không chỉ liệt kê lỗi mà cần giải thích vì sao AI ban đầu bỏ sót hoặc đánh giá chưa đủ.
- Sinh viên xác nhận các lỗi thực tế phải dựa trên kết quả execute hoặc quan sát giao diện, không được AI tự bịa.

---

### Nhật ký Tương tác AI 15: Rà soát AI Gap cho FR-04, FR-08 và Chuẩn hóa Feature Overview/Bug Report FR-15

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 09-07-2026 20:15:00 +07:00
- **Mô tả nhiệm vụ:** Rà soát chất lượng AI Gap Analysis cho FR-04/FR-08, sửa lỗi trùng section FR-08, cập nhật Feature Overview của FR-15 theo format thống nhất, và chuẩn hóa bug report FR-15 theo template của các feature trước.

#### 1. Các Prompt đã sử dụng

> **Prompt 1:**
>
> ```text
> Rà soát chất lượng AI Gap Analysis hiện tại và cho biết phần nào cần chỉnh để phù hợp với yêu cầu bài.
> ```
>
> **Prompt 2:**
>
> ```text
> Đánh giá AI Gap Analysis của FR-04 và FR-08, đảm bảo nội dung đủ chi tiết và đúng mục tiêu phản ánh khoảng cách AI.
> ```
>
> **Prompt 3:**
>
> ```text
> Cập nhật AI Gap Analysis để chi tiết hơn, đặc biệt với FR-08 và các behavior thực tế quan sát được.
> ```
>
> **Prompt 4:**
>
> ```text
> Cập nhật Feature Overview cho FR-15.
> ```
>
> **Prompt 5:**
>
> ```text
> Điều chỉnh Feature Overview của FR-15 để dùng cùng cấu trúc với FR-04 và FR-08.
> ```
>
> **Prompt 6:**
>
> ```text
> Cập nhật Bug Report Template cho FR-15, bổ sung điều kiện tiên quyết liên quan đến quyền Admin cho các bug cần bối cảnh Admin.
> ```
>
> **Prompt 7:**
>
> ```text
> Chuẩn hóa các bug report FR-15 theo cùng template trình bày với các bug của FR-04 và FR-08.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Cập nhật [Main_Report.md](./Main_Report.md):
  - Xóa section FR-08 bị trùng và giữ lại section FR-08 đầy đủ hơn.
  - Viết lại `### 5.4 AI Gap Analysis` cho FR-08 chi tiết hơn, gồm gap do prompt/context, AI assumption, thiếu UI/API interaction test, hậu điều kiện sau checkout, SUT-specific behavior, human review correction và bài học prompt sau.
  - Chuyển `### 6.1 Feature Overview` của FR-15 về đúng format giống FR-04/FR-08: đoạn mô tả ngắn và bảng `Mục / Nội dung`.
- Cập nhật [Bug_Report.md](./Bug_Report.md):
  - Bổ sung điều kiện tiên quyết có Admin hợp lệ cho các bug FR-15 liên quan validation/reference/not found/UI.
  - Chỉnh lại toàn bộ `BUG-FR15-01` đến `BUG-FR15-05` theo format giống FR-04/FR-08: mô tả lỗi, điều kiện tiên quyết, các bước tái hiện, kết quả mong đợi, kết quả thực tế, test case đối chiếu, môi trường và bằng chứng.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên nhận xét phần overview FR-15 không nên lệch style so với các phần trước, yêu cầu sửa về cùng khuôn mẫu.
- Sinh viên chỉ ra bug report FR-15 cần có precondition Admin rõ ràng để người đọc hiểu bối cảnh tái hiện lỗi.
- Sinh viên yêu cầu precondition không nên viết dài theo kiểu phân tích, mà phải giống template bug report của FR-04/FR-08.
- Sinh viên chấp thuận việc giữ FR-04 AI Gap như hiện tại và tập trung làm FR-08/FR-15 chi tiết hơn.

---

### Nhật ký Tương tác AI 16: Phân loại Screenshot theo Feature và Cập nhật Evidence trong Bug Report

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 09-07-2026 21:00:00 +07:00
- **Mô tả nhiệm vụ:** Tổ chức lại ảnh bằng chứng trong thư mục screenshots theo từng feature và cập nhật link ảnh trong Bug Report để mỗi bug có evidence rõ ràng.

#### 1. Các Prompt đã sử dụng

> **Prompt:**
>
> ```text
> Cập nhật ảnh bằng chứng trong Bug Report và tổ chức thư mục screenshots theo từng feature để dễ đối chiếu.
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Tạo cấu trúc thư mục screenshot theo feature:
  - [screenshots/FR04](./screenshots/FR04)
  - [screenshots/FR08](./screenshots/FR08)
  - [screenshots/FR15](./screenshots/FR15)
- Di chuyển ảnh bằng chứng theo prefix bug ID tương ứng (`BUG-FR04-*`, `BUG-FR08-*`, `BUG-FR15-*`).
- Cập nhật [Bug_Report.md](./Bug_Report.md):
  - Đổi toàn bộ link ảnh FR-04 sang `./screenshots/FR04/...`.
  - Bổ sung ảnh minh chứng cho từng bug FR-08 (`BUG-FR08-01` đến `BUG-FR08-06`).
  - Bổ sung ảnh minh chứng cho từng bug FR-15 (`BUG-FR15-01` đến `BUG-FR15-05`).
- Kiểm tra link ảnh trong Markdown: tổng cộng 38 link ảnh được tham chiếu và không thiếu file ảnh nào.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên yêu cầu ảnh screenshot phải được phân theo từng feature để dễ đọc và dễ đối chiếu khi nộp bài.
- Sinh viên yêu cầu bug report phải cập nhật ảnh trong từng mục bug report, không chỉ để ảnh rời trong thư mục.
- AI chỉ di chuyển và liên kết các ảnh đã có trong workspace, không tự tạo hoặc bịa ảnh bằng chứng.

---

### Nhật ký Tương tác AI 17: Hoàn thiện FR-06 Mobile, Evidence và Test Summary

- **Tên công cụ AI:** Codex / ChatGPT
- **Ngày và giờ:** 09-07-2026 22:30:00 +07:00
- **Mô tả nhiệm vụ:** Hoàn thiện phần FR-06 Mobile Product Detail View trong báo cáo chính, cập nhật kết quả thực thi, tổ chức ảnh bằng chứng theo bug, loại bỏ các test case không phù hợp phạm vi black-box execution và đồng bộ Test Summary.

#### 1. Các Prompt đã sử dụng

> **Prompt:**
>
> ```text
> Hãy đóng vai trò là một Chuyên gia Kiểm thử Phần mềm (Senior QA/QC) và hỗ trợ tôi thực hiện kiểm thử hộp đen (black-box) cho tính năng FR-06 Mobile Product Detail View trên ứng dụng di động Expo:
> 1. Thiết lập cấu hình ứng dụng di động frontend trỏ về địa chỉ IP backend 172.20.10.13. Đọc hiểu yêu cầu nghiệp vụ của FR-06 từ tài liệu README của eshop-sut để xác định các quy tắc nghiệp vụ.
> 2. Rà soát danh sách test case thiết kế cho FR-06. Tiến hành loại bỏ các test case không phù hợp với phương pháp black-box (như deep link, network throttling hoặc đọc mã nguồn) để tập trung vào 10 test case cốt lõi kiểm chứng trực quan được trên giao diện mobile (ảnh sản phẩm, tên, giá, mô tả, danh mục, breadcrumb và số lượng quantity >= 1).
> 3. Thực thi trực tiếp trên ứng dụng di động, ghi nhận kết quả thực tế (Actual Result) cho từng ca kiểm thử. Tổ chức lưu trữ ảnh chụp màn hình bằng chứng lỗi trong thư mục screenshots/FR06 và đặt tên tệp đồng bộ theo ID lỗi (BUG-FR06-xx-xx.png).
> 4. Tổng hợp báo cáo chi tiết cho 4 lỗi được xác nhận (lỗi không hiện category, chấp nhận quantity = 0, chấp nhận quantity số thập phân, thiếu breadcrumb) vào Bug_Report.md và đồng bộ hóa Test Summary tổng thể trên báo cáo chính (90 test cases, 23 passed, 67 failed, 20 bugs).
> ```

#### 2. Phản hồi của AI / Sản phẩm được tạo ra

- Đọc lại yêu cầu FR-06 trong `eshop-sut/README.md` và đối chiếu với mobile app để hoàn thiện phần Domain Testing/BVA của FR-06 trong [Main_Report.md](./Main_Report.md).
- Cấu hình mobile frontend trỏ về API backend theo IP LAN được cung cấp (`172.20.10.13`) để có thể chạy Expo web và quan sát hành vi mobile.
- Thực hiện kiểm thử mobile product detail và ghi nhận các lỗi thực tế:
  - `BUG-FR06-01`: màn hình detail không hiển thị category.
  - `BUG-FR06-02`: quantity dưới tối thiểu vẫn được thêm vào giỏ.
  - `BUG-FR06-03`: quantity không phải số nguyên vẫn được thêm vào giỏ.
  - `BUG-FR06-04`: màn hình detail thiếu breadcrumb/navigation context.
- Capture và tổ chức ảnh bằng chứng trong [screenshots/FR06](./screenshots/FR06), đổi tên ảnh theo mã bug thống nhất như `BUG-FR06-01-01.png`, `BUG-FR06-02-01.png`, `BUG-FR06-03-01.png`, `BUG-FR06-04-01.png`.
- Cập nhật [Bug_Report.md](./Bug_Report.md):
  - Bổ sung bảng tổng hợp và báo cáo chi tiết cho `BUG-FR06-01` đến `BUG-FR06-04`.
  - Cập nhật đường dẫn ảnh bằng chứng FR-06 theo cấu trúc thư mục và tên file mới.
  - Loại bỏ các bug FR-06 trùng hoặc không đủ căn cứ black-box (`BUG-FR06-05`, `BUG-FR06-06`, `BUG-FR06-07`).
- Cập nhật [Main_Report.md](./Main_Report.md):
  - Điền actual output, trạng thái Pass/Fail và evidence cho các test case FR-06 có thể execute trực tiếp từ mobile UI.
  - Loại bỏ các test case FR-06 cần deep link, proxy/network throttling, dữ liệu seed đặc biệt hoặc suy luận từ source code để tránh trộn black-box execution với white-box/environment test.
  - Cập nhật `7.4 AI Gap Analysis` để giải thích rõ vì sao các ý tưởng test này được xem là exploratory/out of execution scope.
  - Cập nhật `Test Summary`: FR-06 còn 10 designed/executed test case, 5 passed, 5 failed, 0 blocked, 0 not executed, 4 confirmed bugs; tổng toàn bài là 90 designed, 90 executed, 23 passed, 67 failed, 0 blocked, 0 not executed, 20 confirmed bugs.

#### 3. Rà soát và Chỉnh sửa của con người

- Sinh viên cung cấp IP LAN của máy chạy backend để AI cấu hình mobile frontend và chạy kiểm thử trên môi trường thực tế.
- Sinh viên yêu cầu capture cả trạng thái trước và sau khi badge giỏ hàng xuất hiện để chứng minh add-to-cart feedback.
- Sinh viên yêu cầu bỏ các bug bị trùng hoặc không đủ phù hợp black-box để danh sách lỗi FR-06 gọn và có căn cứ hơn.
- Sinh viên yêu cầu đổi tên ảnh trong thư mục FR-06 theo từng bug để evidence đồng bộ với Bug Report.
- Sinh viên rà soát lại các test case chưa execute và quyết định loại bỏ những case cần đọc source code, deep link, proxy hoặc dữ liệu seed đặc biệt khỏi bảng execution thay vì giữ `Blocked`.
- Sinh viên yêu cầu cập nhật Test Summary để phản ánh trạng thái cuối cùng không còn blocked/not executed.
