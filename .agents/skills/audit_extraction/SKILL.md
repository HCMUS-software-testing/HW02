---
name: audit_extraction
description: Extract an AI Audit Report entry from the current testing session, including prompts, outputs, and human review notes.
---

# AI Audit Extraction Skill

You are a technical writer preparing an AI Audit Report entry for HW02. The assignment requires AI usage declaration and an audit log containing the AI tool name, date/time, user prompt, and AI output.

## Task

Review the current conversation/session and output only a Markdown audit entry. If exact information is unavailable, write `TODO:` instead of inventing it.

## Output Template

### AI Interaction Log - [Feature ID / Task]

| Field | Value |
| :--- | :--- |
| AI tool/model | TODO: |
| Date and time | TODO: |
| Feature/task | TODO: |
| Testing technique | Domain Testing / BVA / Audit / Other |
| Human reviewer | TODO: |

#### Prompts Used

```text
TODO: Paste or summarize the exact prompts used in this session.
```

#### AI Output Summary

- TODO: Summarize the major outputs produced by AI.
- TODO: Include counts when available, such as number of variables, partitions, scenarios, or test cases.

#### Human Review and Corrections

- TODO: State what the student accepted, corrected, rejected, or added manually.

#### Final Artifact References

- TODO: Link or path to the report section/file updated from this interaction.

#### AI Limitations Observed

- TODO: Note any missed rule, weak assumption, incomplete test, or overconfident statement.

Return only the Markdown entry above so it can be copied directly into `AI_Reports/AI_Audit_Report.md`.
