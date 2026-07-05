# AI Audit Report

> Placeholder only. Log every meaningful AI-assisted step.

## Student Information

- Student name: `Lê Trung Kiên`
- Student ID: `23127075`

## AI Tool Usage Summary

| Date/Time | Tool/Model | Purpose |
| --- | --- | --- |
| 2026-07-05 22:41 +07 | Codex / GPT-5 | Create AI audit skill and repository rule |
| 2026-07-05 22:55 +07 | Codex / GPT-5 | Confirm .agents skill location |
| 2026-07-05 22:58 +07 | Codex / GPT-5 | Convert Domain Testing PDF to Markdown |
| 2026-07-05 23:02 +07 | Codex / GPT-5 | Update AI audit skill renumbering |
| 2026-07-05 23:04 +07 | Codex / GPT-5 | Fix AI audit summary table formatting |
| 2026-07-05 23:07 +07 | Codex / GPT-5 | Require specific AI model in audit log |
| 2026-07-05 23:08 +07 | Codex / GPT-5 | Reduce AI usage summary table to three columns |
| 2026-07-05 23:18 +07 | Codex / GPT-5 | Update registration EP IDs |
| 2026-07-05 23:22 +07 | Codex / GPT-5 | Update AI audit prompt/output rules |
| 2026-07-05 23:27 +07 | Codex / GPT-5 | Fix AI audit summary separator row |
| 2026-07-05 23:31 +07 | Codex / GPT-5 | Clarify full AI output audit rule |
| 2026-07-05 23:50 +07 | Codex / GPT-5 | Create reusable Domain Testing skill for EP and BVA |

## Prompt and Output Log

### Entry 001
- Time: `2026-07-05 22:41 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Add a skill and a rule so each user prompt session appends an entry to the HW02 AI audit report; leave human review and final use fields manual.
- Output Summary: Created repo-local ai-audit-entry skill, added append script, updated AGENTS.md rule, and left manual audit fields as placeholders.
- Human Review/Corrections: The skill is created in the root repo so I moved it into `./.agents`
- Final Use in Submission: `[Manual by user]`

### Entry 002
- Time: `2026-07-05 22:58 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Đưa nội dung references/04_Domain Testing.pdf thành markdown
- Output Summary: Created references/04_Domain Testing.md from the PDF content with headings, bullets, and Markdown tables for examples and test cases.
- Human Review/Corrections: The output is greate and will be used to create the skills for domain testing.
- Final Use in Submission: Not used for submission.

### Entry 003
- Time: `2026-07-05 23:02 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật skill ai audit .agents/skills/ai-audit-entry để luôn đánh số lại phù hợp mỗi khi thêm entry vì user có thể xóa các entry thừa.
- Output Summary: Updated the ai-audit-entry script to renumber existing Entry headings before appending, updated SKILL.md with the behavior and correct script path, and validated the skill.
- Human Review/Corrections: The skill is able to re-number the Entry in AI Audit automatically.
- Final Use in Submission: `[Manual by user]`

### Entry 004
- Time: `2026-07-05 23:07 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật là tool model nhớ thêm bản nào nữa ví dụ gpt 5.5 hay claude sonnet
- Output Summary: Updated the ai-audit-entry skill and script so Tool/Model records the clearest available AI tool and model/version, changed the default to Codex / GPT-5, and normalized existing report entries.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

### Entry 005
- Time: `2026-07-05 23:18 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: User asked to change registration Part A IDs in references/23127075.md from E prefix to EC prefix.
- Output Summary: Updated the Part A test data table so registration equivalent class references use EC01-EC23 consistently with the EP domain table.
- Human Review/Corrections: The output is correct.
- Final Use in Submission: Not used for submission.

### Entry 006
- Time: `2026-07-05 23:31 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Fix the skill ai-audit to give the Ouput of a Entry is the full output of AI (only summarize if too long or not in a single paragraph). The output might be the content of a file, a code,... or any artifact created by AI.
- Output: Updated the AI audit skill so Output means the full AI-generated output or artifact when it is short and contiguous, including final answer text, file content, code, Markdown, command text, or other created artifacts. The script now formats multi-line prompt/output values in fenced blocks and the skill validated successfully. No commit was made.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 007
- Time: `2026-07-05 23:50 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) references/04_Domain Testing.md provide the knowledge about Domain Testing, meanwhile, references/23127075.md provide the example of exercises for Domain Testing to let you know how to do domain testing step by step. Based on two mentioned files, create the skills for domain testing including Equivalence partitioning (EP) and Boundary Value Analysis (BVA) for a single given function. Ensure that this skill (or skilss) is reusable and meets the requirements in requirements/2026.HW02.Domain Testing_En.md section 7. Agent Skill
- Output: Created .agents/skills/applying-domain-testing/SKILL.md and .agents/skills/applying-domain-testing/agents/openai.yaml. The skill provides a reusable workflow and Markdown output templates for applying Domain Testing, Equivalence Partitioning, and Boundary Value Analysis to a single function/API/form/feature. Validated the skill with quick_validate.py; result: Skill is valid. No commit was made.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

## Integrity Notes

- AI-generated content verified against requirements: `[TODO]`
- Manual corrections made: `[TODO]`
- Limitations or risks: `[TODO]`
