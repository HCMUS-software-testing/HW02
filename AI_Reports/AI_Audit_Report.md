# AI Audit Report

**Declaration:** I use AI tools for the following tasks: Planning the homework strategy, creating reusable Agent Skills (prompts), generating test cases (Domain Testing & BVA), and analyzing gaps.

---

### AI Interaction Log 1: Project Setup & Agent Skills Creation
* **Name of the AI tool:** Gemini (acting as Senior QA/QC)
* **Date and time:** 2026-07-06
* **Task description:** Generating detailed Action Plan, Project Structure, Agent Skills (Domain Testing, BVA, Audit), and Report Templates.

#### 1. Prompts Used
* "Bạn là 1 senior QA/QC có kinh nghiệm lâu năm trong lĩnh vực testing. Hãy giúp tôi lên kế hoạch chi tiết để tôi có thể thực hiện giải bài tập này một cách hoàn thiện nhất tuân thủ các yêu cầu trong file pdf..."
* "Hãy dựa trên plan đã được lên, Hãy giúp tôi thực hiện giai đoạn 1 là chuẩn bị Agent Skills."
* Yêu cầu cập nhật kế hoạch: chia nhỏ Git commits, thêm Traceability Matrix, không nén source code.

#### 2. AI Output Summary
* Generated `HW02_Action_Plan.md` outlining a 6-stage testing strategy.
* Created reusable AI prompt templates (`Domain_Testing_Prompt.md`, `BVA_Prompt.md`, `Audit_Extraction_Prompt.md`) inside the `Agent_Skills` directory.
* Created structured Markdown test report templates for FR-04, FR-08, FR-15, and FR-06.
