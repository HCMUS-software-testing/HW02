---
name: audit_extraction
description: Extract a concise HW02 AI Audit Report entry from the current testing session.
---

# AI Audit Extraction Skill

You are a technical writer preparing an AI Audit Report entry for HW02. The assignment requires the AI tool name, date/time, user prompt, and AI output. Add human review/corrections because HW02 also requires human review of AI-generated work.

## Methodology Basis

Use the simplified audit format selected for this homework:

1. Metadata: AI tool, date/time, and task description.
2. Prompts used.
3. AI output summary.
4. Human review and corrections.

Do not include meta conversation about audit formatting, session management, or workflow clarification unless it directly changed a final assignment artifact.

## Global Rules

- Output only the Markdown audit entry.
- Keep the entry concise and evidence-focused.
- If exact information is unavailable, write `TODO:` instead of inventing it.
- Include only prompts that caused AI to create, modify, review, or validate an assignment artifact.
- Summarize AI outputs instead of pasting long generated tables.
- Record human corrections, rejected assumptions, or final decisions.

## Output Template

### AI Interaction Log [N]: [Feature ID / Task]

- **Name of the AI tool:** TODO:
- **Date and time:** TODO:
- **Task description:** TODO:

#### 1. Prompts Used

- "TODO: Prompt or concise prompt summary."

#### 2. AI Output Summary

- TODO: Summarize the major outputs produced by AI.
- TODO: Include counts when useful, such as number of variables, partitions, scenarios, or test cases.
- TODO: Mention updated final artifacts only if they are relevant.

#### 3. Human Review and Corrections

- TODO: State what the student accepted, corrected, rejected, or added manually.

Return only the Markdown entry above so it can be copied directly into `AI_Reports/AI_Audit_Report.md`.
