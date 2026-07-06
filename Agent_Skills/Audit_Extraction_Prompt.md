# Agent Skill: AI Audit Extraction

Mục đích của Agent Skill này là giúp bạn tự động hóa việc trích xuất và định dạng nhật ký sử dụng AI sau mỗi phiên làm việc. Bài tập yêu cầu phải ghi nhận: Tên công cụ AI, Ngày giờ, Prompt của bạn và Output của AI. Kỹ năng này sẽ giúp bạn tạo báo cáo nhanh chóng.

## 🚀 Hướng dẫn sử dụng:
Sau khi bạn kết thúc việc dùng AI để phân tích và sinh Test Case cho 1 Feature (Ví dụ làm xong FR-04), bạn dán câu Prompt dưới đây vào cùng phiên chat đó để AI tự động tổng hợp lại mọi thứ.

---

### 🟢 Prompt Yêu Cầu Trích Xuất (Gửi cho AI vào cuối cuộc trò chuyện):

**Copy đoạn Prompt sau gửi cho AI:**

```text
Act as a technical writer. I need to document our interaction for my "AI Audit Report". 

**Your Task:**
Review the entire conversation we just had about testing this feature. Extract and summarize the interaction into the following strictly formatted Markdown template:

### AI Interaction Log
* **Name of the AI tool:** [e.g., ChatGPT / Gemini Pro / Claude 3.5 Sonnet]
* **Date and time:** [Insert Current Date & Time based on your system]
* **Task description:** [Briefly describe what we accomplished, e.g., Generating Domain Testing cases for FR-04]

#### 1. Prompts Used
[List or summarize the exact main prompts I provided to you during this session. Use bullet points or code blocks for clarity.]

#### 2. AI Output Summary
[Provide a concise summary of what you generated in response to my prompts. You do not need to copy the entire test case tables, just a high-level summary of the outputs provided.]

Please output ONLY the Markdown formatted text above.
```
