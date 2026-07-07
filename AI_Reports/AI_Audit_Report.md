# AI Audit Report

**Declaration:** I use AI tools for the following tasks: planning the homework strategy, designing reusable Agent Skills, generating test cases for Domain Testing and BVA, reviewing theory alignment, and analyzing AI gaps.

---

### AI Interaction Log 1: Initial Project Setup and Planning

- **Name of the AI tool:** Gemini
- **Date and time:** 2026-07-06, TODO: add exact time and timezone if available
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
- **Date and time:** 2026-07-07 22:00:00 +07:00
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

---

### AI Interaction Log 3: Agent Skill Methodology, References, and Usage Guides

- **Name of the AI tool:** Codex / ChatGPT
- **Date and time:** 2026-07-07 22:30:00 +07:00
- **Task description:** Strengthen the native Agent Skills with methodology basis, stricter execution rules, and Vietnamese usage/demo guidance before applying them to real feature testing.

#### 1. Prompts Used

- "Clarify and improve the current Agent Skills so they include methodology/reference basis and strict rules before starting feature testing."
- "Update the Agent Skill documentation so the usage workflow is clearer for demo/video preparation."
- "Write the skill usage guide in Vietnamese so it is easier to follow during testing and demo recording."

#### 2. AI Output Summary

- Updated `.agents/skills/domain_testing/SKILL.md` with a Methodology Basis section based on the Domain Testing lecture: input/output variables, equivalence classes, representative values, and boundary handoff.
- Updated `.agents/skills/domain_testing/SKILL.md` with stricter rules: black-box reasoning first, no invented constraints, no claimed actual results/bugs, mandatory checkpoints, entry criteria, and exit criteria.
- Updated `.agents/skills/bva_testing/SKILL.md` with BVA methodology: ordered equivalence classes, lower/upper boundaries, min/min-1/min+1/max/max+1 values, and nominal values for non-target variables.
- Updated `.agents/skills/bva_testing/SKILL.md` with stricter rules: no invented min/max, no mixing exploratory stress tests with formal BVA, no claimed actual results/bugs, entry criteria, and exit criteria.
- Updated `.agents/skills/audit_extraction/SKILL.md` to match the simplified AI Audit template used in `AI_Reports/AI_Audit_Report.md`.
- Created `.agents/README.md` in Vietnamese to explain the purpose, methodology references, skill list, control principles, per-feature skill flow, and demo recommendation.
- Created `Agent_Skills_Demo_Guide.md` in Vietnamese as a video demo script for showing the Agent Skills workflow.
- Created and localized `HW02_FR_Workflow.md` in Vietnamese as the working checklist for each selected feature.

#### 3. Human Review and Corrections

- I required the Agent Skills to include methodology/reference basis, not only operational prompts.
- I decided to keep the methodology summary inside each `SKILL.md` but move longer usage/demo explanations into `.agents/README.md`, `Agent_Skills_Demo_Guide.md`, and `HW02_FR_Workflow.md`.
- I requested the skill usage guide in Vietnamese so it can be used more naturally during actual testing and video recording.

---

### AI Interaction Log 4: Main Report Structure Alignment

- **Name of the AI tool:** Codex / ChatGPT
- **Date and time:** 2026-07-07 22:45:00 +07:00
- **Task description:** Align the report structure with the HW02 submission requirement that the main report must include the Domain Testing and BVA reports for all selected features.

#### 1. Prompts Used

- "Re-check the HW02 submission regulation and align the report structure so the feature reports are included in the main report."
- "Update the workflow and demo guidance so approved skill outputs are copied into `Main_Report.md`, not treated as separate final feature reports."

#### 2. AI Output Summary

- Re-read the HW02 submission regulation and confirmed that the required zip must contain a main report in Markdown and PDF, including the Domain Testing report and BVA report.
- Created `Main_Report.md` as the required main report template containing sections for FR-04, FR-08, FR-15, and FR-06.
- Added sections in `Main_Report.md` for feature overview, requirement/rule extraction, Domain Testing analysis, BVA, execution results, bug reports, AI Gap Analysis, test summary, bug summary, Agent Skills/demo video, references, and appendices.
- Updated `HW02_Action_Plan.md` to clarify that final testing content must be consolidated into `Main_Report.md`.
- Updated `HW02_FR_Workflow.md` so each approved Domain/BVA output is copied into the relevant feature section of `Main_Report.md`.
- Updated `.agents/README.md` and `Agent_Skills_Demo_Guide.md` so the demo points to `Main_Report.md` as the final report destination.

#### 3. Human Review and Corrections

- I corrected the earlier interpretation that per-feature report files could be the primary final reports.
- I clarified that per-feature folders may remain as working drafts/supporting material, but the final required report content must be inside `Main_Report.md`.
- I requested that the workflow and demo guide reflect this submission structure before starting actual feature testing.

---

### AI Interaction Log 5: Bug Report Template Preparation

- **Name of the AI tool:** Codex / ChatGPT
- **Date and time:** 2026-07-07 22:46:44 +07:00
- **Task description:** Prepare a reusable bug report template and link it with the HW02 reporting workflow.

#### 1. Prompts Used

- "Review the current reporting preparation and add a bug report template if it is missing."
- "Clarify how the detailed bug report template should relate to the bug summary in the main report."

#### 2. AI Output Summary

- Created `Bug_Report_Template.md` for confirmed bugs.
- Included required bug fields: Bug ID, feature, title, severity, priority, status, environment, reporter, GitHub Issue, screenshot/evidence, preconditions, steps to reproduce, expected result, actual result, test case reference, and notes.
- Updated `HW02_FR_Workflow.md` to reference `Bug_Report_Template.md` during the bug logging step.
- Updated `Main_Report.md` to clarify that the main report should contain bug summaries and final bug details, while `Bug_Report_Template.md` can be used to prepare detailed GitHub Issues.

#### 3. Human Review and Corrections

- I confirmed that bug reports must be based on verified SUT behavior, not AI predictions.
- I clarified that `Bug_Report_Template.md` is a reusable form for writing detailed bugs/GitHub Issues, while `Main_Report.md` remains the official submitted report.
