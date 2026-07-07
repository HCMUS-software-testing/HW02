# AI Audit Report

**Declaration:** I use AI tools for the following tasks: planning the homework strategy, designing reusable Agent Skills, generating test cases for Domain Testing and BVA, reviewing theory alignment, and analyzing AI gaps.

---

### AI Interaction Log 1: Initial Project Setup and Planning

- **Name of the AI tool:** Gemini
- **Date and time:** 2026-07-06
- **Task description:** Initial planning support for HW02, including homework strategy, proposed project structure, Agent Skill ideas, Git workflow suggestions, and report template ideas.

#### 1. Prompts Used

- "Bạn là 1 senior QA/QC có kinh nghiệm lâu năm trong lĩnh vực testing. Hãy giúp tôi lên kế hoạch chi tiết để tôi có thể thực hiện giải bài tập này một cách hoàn thiện nhất tuân thủ các yêu cầu trong file pdf..."
- "Hãy dựa trên plan đã được lên, Hãy giúp tôi thực hiện giai đoạn 1 là chuẩn bị Agent Skills."
- "Yêu cầu cập nhật kế hoạch: chia nhỏ Git commits, thêm Traceability Matrix, không nén source code."

#### 2. AI Output Summary

- Proposed an initial multi-stage action plan for completing HW02.
- Suggested using reusable AI/Agent workflows for Domain Testing, Boundary Value Analysis, and AI Audit extraction.
- Suggested report structures for the selected features: FR-04, FR-08, FR-15, and FR-06.
- Suggested process controls such as smaller Git commits, traceability/coverage information, and avoiding submission of unnecessary SUT source code.
- Note: some early supporting/prompt-pack ideas from this phase were later removed or superseded by the native `.agents/skills` structure.

#### 3. Human Review and Corrections

- I reviewed the initial planning artifacts again in a later Codex session.
- I clarified that the final Agent Skills should focus on native skill files under `.agents/skills`.
- I treated any files no longer present in the final repository as historical preparation notes, not final submission artifacts.

---

### AI Interaction Log 2: Preparation Review, Agent Skill Refinement, and Theory Alignment

- **Name of the AI tool:** Codex / ChatGPT
- **Date and time:** 2026-07-07, Asia/Saigon
- **Task description:** Review the HW02 preparation, align the action plan and Agent Skills with assignment requirements, clarify the AI-first workflow, and verify alignment with Domain Testing theory and ISTQB CT-AI guidance.

#### 1. Prompts Used

- "Tôi đang trong quá trình làm bài tập kiểm thử Domain + boundary testing... Hãy nhận xét phần chuẩn bị của tôi, và tiến hành chỉnh sửa để hoàn thiện cho phần plan và agent skill."
- "Thứ nhất, Toàn bộ plan, skill đã match requirement hay chưa. Thứ hai, Agent Skill hiện tại đã có thể cover được hết hay chưa. Và cách để tôi có thể thực hiện được agent skill này là như thế nào (workflow)"
- "Tôi cần làm rõ... AI first, human review nghĩa là chúng ta sẽ cho AI tự động chạy kiểm thử web rồi ghi bug hay chỉ dừng lại ở việc sinh test case... theo như plan hay skill thì đã match với phần lí thuyết ở domain testing pdf chưa và đã thoả mãn được ISTQB hay chưa."
- "ok hãy xuất AI audit giúp tôi"

#### 2. AI Output Summary

- Reviewed the HW02 assignment requirements and homework policy documents.
- Reviewed the existing `HW02_Action_Plan.md`, native Agent Skill files, and existing AI audit report.
- Rewrote and refined `HW02_Action_Plan.md` to include a requirement checklist, feature scope, per-feature workflow, Definition of Done, AI Audit/Critique requirements, Git log requirements, README requirements, PDF export, and zip submission rules.
- Refined native Agent Skills under `.agents/skills`: `domain_testing/SKILL.md`, `bva_testing/SKILL.md`, and `audit_extraction/SKILL.md`.
- Added stricter Agent Skill workflow rules: required inputs, step-by-step execution, mandatory human checkpoints, stable traceability IDs, anti-hallucination rules, and report-ready Markdown output schemas.
- Clarified that the real Agent Skills should be treated as the files under `HW02/.agents/skills`.
- Explained that AI-first does not require AI to automatically execute the web/mobile application. The recommended workflow is: AI designs test analysis and candidate test cases, the student reviews them, then the student verifies actual results on the SUT and logs confirmed bugs.
- Compared the workflow with the Domain Testing lecture and aligned the skill structure with the lecture steps: identify input/output variables, identify equivalence classes, choose representative values, and apply Boundary Value Analysis.
- Compared the workflow with ISTQB CT-AI guidance and positioned the AI usage as AI-assisted test case generation with human control over expected results and bug confirmation.
- Created an AI Audit Report entry for the preparation and Agent Skill refinement work.

#### 3. Human Review and Corrections

- I clarified that the repository is located at `HW2/HW02`.
- I clarified that submitted Agent Skills should be under `.agents/skills`, not under a separate prompt-pack folder.
- I challenged whether AI-first means fully automated UI testing. The final interpretation was corrected to: AI supports test design first; human review and actual SUT verification remain required.
- I requested theory alignment against the Domain Testing lecture and ISTQB CT-AI syllabus before proceeding.
- I corrected the audit content so it only references final relevant artifacts and does not treat removed prompt-pack/supporting files as final submission artifacts.
