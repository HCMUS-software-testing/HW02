# Agent Skill: Boundary Value Analysis (BVA)

Mục đích của bộ Prompt này là hướng dẫn AI thực hiện kỹ thuật phân tích giá trị biên (BVA) theo chuẩn ISTQB. Tương tự như Domain Testing, bạn phải làm theo từng bước để kiểm soát AI.

## 🚀 Hướng dẫn sử dụng:
Gửi Step 1 -> Sửa/Chốt kết quả -> Gửi Step 2 -> Sửa/Chốt kết quả.

---

### 🟢 Bước 1 (Step 1): Xác định các biến có tính chất biên và tìm Giá trị biên

**Copy đoạn Prompt sau gửi cho AI:**

```text
Act as a Senior Software QA Engineer. I need to apply Boundary Value Analysis (BVA) based on ISTQB standards for the following feature of an e-commerce website:

[👉 ĐIỀN MÔ TẢ TÍNH NĂNG VÀ ĐIỀU KIỆN (VÍ DỤ: PASSWORD 8-20 KÝ TỰ, GIÁ > 0, v.v.) VÀO ĐÂY]

**Your Task (Step 1):**
1. Identify all input variables that have defined boundaries (e.g., numeric ranges, string lengths, dates, list sizes, order amounts).
2. For each variable, explicitly identify the exact boundary values. Use the 2-value or 3-value boundary approach appropriately.
3. Explicitly state the Minimum, Minimum-1 (if applicable), Nominal (in-range), Maximum, and Maximum+1 values.

Output this in a clear Markdown table.
Do NOT generate test cases yet. We will do this step-by-step.
```

---

### 🔴 Bước 2 (Step 2): Sinh Test Case cho các Giá trị biên

*Sau khi chốt các mốc giá trị biên, gửi tiếp lệnh sau:*

**Copy đoạn Prompt sau gửi cho AI:**

```text
Perfect. Now that we have identified the exact boundary values for each variable, let's move to test case generation.

**Your Task (Step 2):**
Generate detailed test cases focusing specifically on these boundaries. 
Important Rule: When testing the boundary of one variable, you MUST keep all other variables at valid, nominal values (to isolate the boundary behavior).

For each test case, include:
- Test Case ID
- Test Case Summary (e.g., "Test lower boundary: Password length = 8")
- Pre-conditions
- Test Steps
- Test Data (The exact boundary value to be inputted)
- Expected Result

Output as a clean Markdown table.
```
