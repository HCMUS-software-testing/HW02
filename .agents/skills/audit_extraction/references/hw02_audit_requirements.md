# HW02 AI Audit Requirements Reference

Nguồn chính: `2026.HW02.Domain Testing_En.md`.

## Yêu cầu bắt buộc

AI Audit Report là appendix bắt buộc. Nếu có dùng AI, mỗi interaction liên quan đến artifact cần ghi:

- Name of the AI tool.
- Date and time.
- User prompt.
- AI output.

Vì HW02 yêu cầu AI-first nhưng human-reviewed, audit entry cũng nên ghi:

- Task description.
- Artifact được tạo/sửa/validate.
- Human review/correction.
- Assumption hoặc AI mistake đã bị loại bỏ.

## Không đưa vào audit

Không đưa các câu hỏi meta vào audit nếu chúng không trực tiếp tạo, sửa hoặc validate artifact cuối cùng. Ví dụ có thể bỏ qua:

- Hỏi nên mở chat mới hay không.
- Hỏi cách hiểu workflow nếu không tạo/sửa file.
- Hỏi format audit nhưng không dẫn đến artifact thay đổi.

## Khi thiếu thông tin

Nếu thiếu tool name, exact prompt, exact timestamp hoặc output, ghi `TODO:`. Không bịa.

## Output mong muốn

Audit entry nên ngắn gọn, đủ trace:

1. Metadata.
2. Prompts Used.
3. AI Output / Artifact Produced.
4. Human Review and Corrections.
