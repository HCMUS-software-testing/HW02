# Agent Skill: Domain Testing (Equivalence Partitioning)

Mục đích của bộ Prompt này là hướng dẫn AI thực hiện kỹ thuật Domain Testing một cách khoa học, **step-by-step**, đảm bảo đúng nguyên tắc "AI-First Strategy" (không yêu cầu AI làm tuốt luốt một lần mà phải giám sát từng bước).

## 🚀 Hướng dẫn sử dụng:
Bạn hãy copy từng phần Prompt dưới đây và gửi cho AI (ChatGPT/Gemini/Claude...).
**Lưu ý:** Gửi Step 1 -> Đợi AI trả lời -> Bạn đọc và sửa lỗi nếu AI làm sai -> Khi kết quả Step 1 đã chuẩn, mới copy gửi tiếp Step 2.

---

### 🟢 Bước 1 (Step 1): Xác định Biến và Phân vùng Tương đương (Domains)

**Copy đoạn Prompt sau gửi cho AI:**

```text
Act as a Senior Software QA Engineer. I need to apply Domain Testing (Equivalence Partitioning) for the following feature of an e-commerce website:

[👉 ĐIỀN MÔ TẢ TÍNH NĂNG HOẶC COPY REQUIREMENT CỦA SUT VÀO ĐÂY]

**Your Task (Step 1):**
1. Identify all the input variables and constraints for this feature.
2. For each variable, define its Valid Equivalence Partitions (valid domains) and Invalid Equivalence Partitions (invalid domains).
3. List any implicit business rules mentioned.

Please output the result in a clear Markdown table format.
Do NOT generate test cases yet. We will do this step-by-step.
```

---

### 🟡 Bước 2 (Step 2): Thiết lập Ma trận Tổ hợp (Combination Matrix)

*Sau khi AI làm xong Bước 1 và bạn đã xác nhận đúng, hãy gửi tiếp:*

**Copy đoạn Prompt sau gửi cho AI:**

```text
Great job. Now that we have identified the Valid and Invalid domains for each input variable, let's move to Step 2.

**Your Task (Step 2):**
1. Create a logical combination matrix for these domains. 
2. Follow standard testing rules to avoid explosion of test cases:
   - Combine Valid domains of all variables to form positive test scenarios.
   - For Invalid domains, apply the Single Fault Assumption: test one Invalid domain at a time while keeping all other variables at Valid domains (to isolate the defect).
   
Please output a table showing these combinations (Scenario ID, Variables, Expected Outcome - Pass/Fail).
Do NOT generate the detailed test steps yet.
```

---

### 🔴 Bước 3 (Step 3): Sinh Test Case chi tiết

*Sau khi chốt xong bảng tổ hợp, hãy gửi:*

**Copy đoạn Prompt sau gửi cho AI:**

```text
Based on the combination matrix we agreed upon, let's generate the actual test cases.

**Your Task (Step 3):**
Generate detailed, executable test cases for each scenario in the matrix. 
For each test case, you MUST provide:
- Test Case ID
- Test Case Summary (What is being tested)
- Pre-conditions
- Test Steps (Clear, actionable steps)
- Test Data (Choose specific, concrete values representing the domain)
- Expected Result

Output this as a clean Markdown table so I can easily copy it into my final report.
```
