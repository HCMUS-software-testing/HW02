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

When the AI output is a single generated file, report, template, code file, Markdown artifact, or other contiguous artifact, prefer `--output-file path/to/artifact` instead of `--output`. This copies the full file content verbatim into the audit entry and prevents accidental summaries.

Keep these fields as manual placeholders because the student will complete them:

- `Human Review/Corrections`: `[Manual by user]`
- `Final Use in Submission`: `[Manual by user]`

Do not create or maintain an `AI Tool Usage Summary` table. Record audit evidence only in the detailed `Prompt and Output Log` entries.

## Language and Encoding

Use Vietnamese with full accents for new audit metadata that the AI writes itself, such as `Purpose`, brief factual notes, or non-verbatim summaries, unless the user explicitly requests another language.

For each audit entry, keep `Prompt` and `Output` in their original language and exact wording. Do not translate, normalize, remove accents, add accents, rewrite, or correct character encoding in those two fields. This preserves the original AI interaction as audit evidence.

Write and read the audit report as UTF-8. If using `--output-file`, the script copies that file as UTF-8 verbatim into the `Output` field.

## Entry Guidance

Use concise, factual text. Do not include private chain-of-thought, hidden policy, or long command outputs. Mention files changed or artifacts created when relevant.

`Prompt` must be copied 100% from the user's prompt for that session. Do not paraphrase, translate, normalize spelling, add missing accents, correct typos, shorten, or combine it with interpretation.

`Output` must be the full AI-generated output when that output can be captured as one contiguous artifact. This may be the final answer text, generated file content, code, Markdown, command text, or any other artifact created by AI. Copy it exactly instead of describing it. If the output is a generated file in the workspace, use `--output-file` so the exact content is recorded. Do not summarize a single generated Markdown/report/code artifact merely because it is long. Summarize only when the output spans multiple unrelated artifacts/sections, cannot be quoted as one coherent contiguous block, or is genuinely too large for the audit report after human judgment. When summarizing, keep it factual and mention the affected files or artifacts.

Always record the clearest available tool and model/version in `Tool/Model`. Use `--tool-model` when known, for example `GPT-5.4`, `GPT-5.5`, or `Claude Sonnet`. If the exact version is not visible, use the tool family plus the most specific known model name instead of a generic value.

If the report file does not exist, create its parent directories and initialize a minimal audit report structure before appending.

The script renumbers existing `### Entry NNN` headings before appending. This keeps numbering contiguous when the student manually removes entries that are not relevant to the homework submission.

The script removes any legacy `AI Tool Usage Summary` section before saving, so old reports do not recreate or retain the summary table.

Do not commit changes unless the user explicitly asks.
