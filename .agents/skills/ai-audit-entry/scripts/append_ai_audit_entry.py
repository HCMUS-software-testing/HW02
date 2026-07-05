#!/usr/bin/env python3
"""Append a HW02 AI audit entry to the submission report."""

from __future__ import annotations

import argparse
import re
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


DEFAULT_AUDIT_FILE = Path(
    "23127075_HW02_AI_DomainTesting_100/report/ai_audit_report.md"
)
DEFAULT_TOOL_MODEL = "Codex / GPT-5"
MANUAL_PLACEHOLDER = "[Manual by user]"


def escape_table_cell(value: str) -> str:
    return " ".join(value.strip().split()).replace("|", "\\|")


def markdown_fence(value: str) -> str:
    longest_run = max((len(match.group(0)) for match in re.finditer(r"`+", value)), default=0)
    fence = "`" * max(3, longest_run + 1)
    return f"{fence}text\n{value}\n{fence}"


def format_detail_field(label: str, value: str) -> str:
    stripped = value.strip()
    if "\n" not in stripped:
        return f"- {label}: {stripped}"

    return f"- {label}:\n\n{markdown_fence(stripped)}"


def next_entry_id(text: str) -> str:
    count = len(re.findall(r"^### Entry \d{3}\s*$", text, flags=re.MULTILINE))
    return f"{count + 1:03d}"


def renumber_entries(text: str) -> str:
    """Keep entry numbers contiguous after manual deletions."""
    counter = 0

    def replace_entry(match: re.Match[str]) -> str:
        nonlocal counter
        counter += 1
        return f"### Entry {counter:03d}"

    return re.sub(r"^### Entry \d{3}\s*$", replace_entry, text, flags=re.MULTILINE)


def initial_report() -> str:
    return """# AI Audit Report

## Student Information

- Student name: `Lê Trung Kiên`
- Student ID: `23127075`

## AI Tool Usage Summary

| Date/Time | Tool/Model | Purpose |
| --- | --- | --- |

## Prompt and Output Log

## Integrity Notes

- AI-generated content verified against requirements: `[TODO]`
- Manual corrections made: `[TODO]`
- Limitations or risks: `[TODO]`
"""


def append_entry(
    audit_file: Path,
    purpose: str,
    prompt: str,
    output: str,
    tool_model: str,
) -> None:
    audit_file.parent.mkdir(parents=True, exist_ok=True)
    text = audit_file.read_text(encoding="utf-8") if audit_file.exists() else initial_report()
    text = renumber_entries(text)

    now = datetime.now(ZoneInfo("Asia/Ho_Chi_Minh")).strftime("%Y-%m-%d %H:%M %Z")
    entry_id = next_entry_id(text)

    summary_row = (
        f"| {escape_table_cell(now)} | {escape_table_cell(tool_model)} | "
        f"{escape_table_cell(purpose)} |"
    )
    detail_block = f"""
### Entry {entry_id}
- Time: `{now}`
- Tool/Model: `{tool_model}`
{format_detail_field("Prompt", prompt)}
{format_detail_field("Output", output)}
- Human Review/Corrections: `{MANUAL_PLACEHOLDER}`
- Final Use in Submission: `{MANUAL_PLACEHOLDER}`
"""

    text = insert_summary_row(text, summary_row)
    text = normalize_summary_table(text)
    text = insert_detail_block(text, detail_block)
    audit_file.write_text(text.rstrip() + "\n", encoding="utf-8")


def insert_summary_row(text: str, row: str) -> str:
    placeholder = "| `[TODO]` | `[TODO]` | `[TODO]` | `[TODO]` | `[TODO]` |"
    if placeholder in text:
        return text.replace(placeholder, row, 1)

    short_placeholder = "| `[TODO]` | `[TODO]` | `[TODO]` |"
    if short_placeholder in text:
        return text.replace(short_placeholder, row, 1)

    marker = "## Prompt and Output Log"
    if marker in text:
        return text.replace(marker, row + "\n\n" + marker, 1)

    return text.rstrip() + "\n\n" + row + "\n"


def normalize_summary_table(text: str) -> str:
    """Keep the AI Tool Usage Summary table as Date/Time, Tool/Model, Purpose."""
    start_marker = "## AI Tool Usage Summary"
    end_marker = "## Prompt and Output Log"
    if start_marker not in text or end_marker not in text:
        return text

    before, summary_and_after = text.split(start_marker, 1)
    summary, after = summary_and_after.split(end_marker, 1)
    rows = [
        "| Date/Time | Tool/Model | Purpose |",
        "| --- | --- | --- |",
    ]
    for line in summary.splitlines():
        stripped = line.strip()
        if not stripped.startswith("|"):
            continue
        cells = [cell.strip() for cell in stripped.strip("|").split("|")]
        if len(cells) < 3:
            continue
        is_separator = all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells[:3])
        if cells[0] in {"Date/Time", "`[TODO]`"} or is_separator:
            continue
        rows.append(f"| {cells[0]} | {cells[1]} | {cells[2]} |")

    cleaned_summary = "\n".join(rows)

    return f"{before}{start_marker}\n\n{cleaned_summary}\n\n{end_marker}{after}"


def insert_detail_block(text: str, block: str) -> str:
    todo_markers = [
        """### Entry `[TODO]`

- Time: `[TODO]`
- Tool/Model: `[TODO]`
- Prompt: `[TODO]`
- Output: `[TODO]`
- Human Review/Corrections: `[TODO]`
- Final Use in Submission: `[TODO]`
""",
        """### Entry `[TODO]`

- Time: `[TODO]`
- Tool/Model: `[TODO]`
- Prompt: `[TODO]`
- Output Summary: `[TODO]`
- Human Review/Corrections: `[TODO]`
- Final Use in Submission: `[TODO]`
""",
    ]
    for todo_marker in todo_markers:
        if todo_marker in text:
            return text.replace(todo_marker, block.strip() + "\n", 1)

    marker = "## Integrity Notes"
    if marker in text:
        return text.replace(marker, block.rstrip() + "\n\n" + marker, 1)

    return text.rstrip() + "\n\n" + block.strip() + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--audit-file", type=Path, default=DEFAULT_AUDIT_FILE)
    parser.add_argument("--purpose", required=True)
    parser.add_argument("--prompt", required=True)
    output_group = parser.add_mutually_exclusive_group(required=True)
    output_group.add_argument("--output")
    output_group.add_argument(
        "--output-summary",
        dest="output",
        help="Backward-compatible alias for --output.",
    )
    parser.add_argument(
        "--tool-model",
        default=DEFAULT_TOOL_MODEL,
        help=(
            "AI tool and model/version used, for example "
            "'Codex / GPT-5' or 'Claude Sonnet'."
        ),
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    append_entry(
        audit_file=args.audit_file,
        purpose=args.purpose,
        prompt=args.prompt,
        output=args.output,
        tool_model=args.tool_model,
    )


if __name__ == "__main__":
    main()
