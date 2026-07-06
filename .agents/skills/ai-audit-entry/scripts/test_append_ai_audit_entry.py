#!/usr/bin/env python3
"""Regression tests for append_ai_audit_entry.py."""

from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path


SCRIPT = Path(__file__).with_name("append_ai_audit_entry.py")


def test_output_file_records_full_contiguous_artifact(tmp_path: Path) -> None:
    tmp_path.mkdir(parents=True, exist_ok=True)
    audit_file = tmp_path / "audit.md"
    artifact = tmp_path / "artifact.md"
    artifact_content = "# Generated Artifact\n\nLine 1\nLine 2\n"
    artifact.write_text(artifact_content, encoding="utf-8")

    result = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--audit-file",
            str(audit_file),
            "--purpose",
            "record generated artifact",
            "--prompt",
            "make an artifact",
            "--output-file",
            str(artifact),
            "--tool-model",
            "Codex / GPT-5",
        ],
        text=True,
        capture_output=True,
        check=False,
    )

    assert result.returncode == 0, result.stderr
    audit_text = audit_file.read_text(encoding="utf-8")
    assert "- Output:\n\n```text\n# Generated Artifact\n\nLine 1\nLine 2\n```" in audit_text


def test_unicode_prompt_and_output_are_preserved_verbatim(tmp_path: Path) -> None:
    tmp_path.mkdir(parents=True, exist_ok=True)
    audit_file = tmp_path / "audit.md"
    prompt = "Cập nhật báo cáo đăng ký tài khoản, giữ nguyên tiếng Việt có dấu."
    output = "Đã tạo: Điều kiện, Kết quả mong đợi, Cần rà soát thủ công."

    result = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--audit-file",
            str(audit_file),
            "--purpose",
            "cập nhật skill tiếng Việt",
            "--prompt",
            prompt,
            "--output",
            output,
            "--tool-model",
            "Codex / GPT-5",
        ],
        text=True,
        capture_output=True,
        check=False,
    )

    assert result.returncode == 0, result.stderr
    audit_text = audit_file.read_text(encoding="utf-8")
    assert f"- Prompt: {prompt}" in audit_text
    assert f"- Output: {output}" in audit_text


def test_report_does_not_create_ai_tool_usage_summary(tmp_path: Path) -> None:
    tmp_path.mkdir(parents=True, exist_ok=True)
    audit_file = tmp_path / "audit.md"

    result = subprocess.run(
        [
            sys.executable,
            str(SCRIPT),
            "--audit-file",
            str(audit_file),
            "--purpose",
            "record one entry",
            "--prompt",
            "make an entry",
            "--output",
            "entry output",
            "--tool-model",
            "Codex / GPT-5",
        ],
        text=True,
        capture_output=True,
        check=False,
    )

    assert result.returncode == 0, result.stderr
    audit_text = audit_file.read_text(encoding="utf-8")
    assert "## AI Tool Usage Summary" not in audit_text
    assert "| Date/Time | Tool/Model | Purpose |" not in audit_text
    assert "## Prompt and Output Log" in audit_text
    assert "### Entry 001" in audit_text


if __name__ == "__main__":
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        test_output_file_records_full_contiguous_artifact(temp_path / "output-file")
        test_unicode_prompt_and_output_are_preserved_verbatim(temp_path / "unicode")
        test_report_does_not_create_ai_tool_usage_summary(temp_path / "no-summary")
