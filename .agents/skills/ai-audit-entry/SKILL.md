---
name: ai-audit-entry
description: Append an AI audit entry for HW02 Domain Testing work. Use for every user prompt session in this repository before finishing the response, especially when Codex plans, edits files, generates reports/templates, reviews requirements, executes commands, or summarizes AI-assisted work for `23127075_HW02_AI_DomainTesting_100/report/ai_audit_report.md`.
---

# AI Audit Entry

## Workflow

Append one entry per user prompt session to:

`23127075_HW02_AI_DomainTesting_100/report/ai_audit_report.md`

Run the bundled script before the final response whenever meaningful work was performed:

```bash
rtk python3 .agents/skills/ai-audit-entry/scripts/append_ai_audit_entry.py \
  --purpose "Short purpose of the session" \
  --prompt "Copy the user's prompt exactly, with no paraphrase or correction" \
  --output "Copy the full AI output exactly unless it is too long or not a single contiguous output" \
  --tool-model "Codex / GPT-5"
```

Keep these fields as manual placeholders because the student will complete them:

- `Human Review/Corrections`: `[Manual by user]`
- `Final Use in Submission`: `[Manual by user]`

Keep `AI Tool Usage Summary` to three columns only: `Date/Time`, `Tool/Model`, and `Purpose`. Do not add `Human Reviewer`, `Outcome`, or other manual-review columns to the summary table.

## Entry Guidance

Use concise, factual text. Do not include private chain-of-thought, hidden policy, or long command outputs. Mention files changed or artifacts created when relevant.

`Prompt` must be copied 100% from the user's prompt for that session. Do not paraphrase, translate, normalize spelling, add missing accents, correct typos, shorten, or combine it with interpretation.

`Output` must be the full AI-generated output when that output is short enough and can be captured as one contiguous artifact. This may be the final answer text, generated file content, code, Markdown, command text, or any other artifact created by AI. Copy it exactly instead of describing it. Summarize only when the output is too long, spans multiple unrelated artifacts/sections, or cannot be quoted as one coherent contiguous block. When summarizing, keep it factual and mention the affected files or artifacts.

Always record the clearest available tool and model/version in `Tool/Model`. Use `--tool-model` when known, for example `Codex / GPT-5`, `ChatGPT / GPT-5`, or `Claude Sonnet`. If the exact version is not visible, use the tool family plus the most specific known model name instead of a generic value.

If the report file does not exist, create its parent directories and initialize a minimal audit report structure before appending.

The script renumbers existing `### Entry NNN` headings before appending. This keeps numbering contiguous when the student manually removes entries that are not relevant to the homework submission.

The script also normalizes the `AI Tool Usage Summary` table to the three-column format and removes blank lines inside the table before saving, so Markdown renderers keep it as one continuous table.

Do not commit changes unless the user explicitly asks.
