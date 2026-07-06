# Test Report - FR-04: Personal Profile Management

## 1. Step-by-step Domain & BVA Analysis

### 1.1. Identify Input/Output Variables
*   **Variable 1:** `[Tên biến, ví dụ: Full Name]` - Kiểu dữ liệu, mô tả...
*   **Variable 2:** `[Tên biến, ví dụ: Date of Birth]` - ...
*   **Variable 3:** `[Tên biến, ví dụ: Phone Number]` - ...

### 1.2. Equivalence Classes (Phân vùng tương đương)
Dựa vào yêu cầu nghiệp vụ, ta phân chia các vùng hợp lệ và không hợp lệ:

| Variable | Valid Classes (Vùng Hợp Lệ) | Invalid Classes (Vùng Không Hợp Lệ) | Reason (Tại sao chọn) |
| :--- | :--- | :--- | :--- |
| **Phone Number** | V1: 10 chữ số, bắt đầu bằng '0' | I1: Chứa chữ cái<br>I2: Độ dài < 10 số<br>I3: Độ dài > 10 số | V1 đáp ứng đúng format VN. I1-I3 vi phạm rule. |
| **...** | ... | ... | ... |

### 1.3. Combination Matrix & Select Representative Values
Để tránh bùng nổ tổ hợp, ta sử dụng chiến lược: 1 Test case chứa toàn bộ Valid classes, và mỗi Invalid class sẽ được test độc lập (Single Fault Assumption).

| Scenario ID | Variable 1 (Phone) | Variable 2 (...) | Expected Outcome |
| :--- | :--- | :--- | :--- |
| SC01 | V1 | V1 | PASS (Cập nhật thành công) |
| SC02 | I1 | V1 | FAIL (Báo lỗi format phone) |

### 1.4. Boundary Value Analysis (BVA)
Xác định các giá trị biên cho các biến có giới hạn cụ thể (ví dụ: Tên dài 2-50 ký tự).

| Variable | Min-1 | Min | Nominal | Max | Max+1 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Name Length** | 1 ký tự | 2 ký tự | 15 ký tự | 50 ký tự | 51 ký tự |

---

## 2. Test Cases (Kết quả từ AI sinh ra)

| Test Case ID | Summary | Pre-conditions | Test Steps | Test Data | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_FR04_001 | Test valid update | User is logged in | 1. Go to Profile<br>2. Fill Data<br>3. Click Save | Phone: 0987654321 | Success message | [ ] |
| TC_FR04_002 | Test Phone length < 10 | User is logged in | ... | Phone: 098765432 | Error message | [ ] |
| ... | ... | ... | ... | ... | ... | ... |

---

## 3. Bug Reports (Nếu có)
*(Nếu phát hiện lỗi trong quá trình thực thi test case, ghi nhận tại đây và cung cấp link tới GitHub Issues)*

*   **Bug 01:** `[Title bug]` - [Link GitHub Issue #1](https://github.com/...)
*   **Bug 02:** `[Title bug]` - [Link GitHub Issue #2](https://github.com/...)

---

## 4. AI Gap Analysis
*(Phân tích xem AI đã làm tốt/chưa tốt điểm nào trong quá trình phân tích tính năng này)*

*   **What AI missed:** AI đã quên mất rule về định dạng email hợp lệ.
*   **Why:** Do trong Prompt ban đầu tôi không cung cấp explicit business rules cho field email. AI có xu hướng áp dụng rule mặc định của chuẩn RFC nhưng SUT này lại dùng regex khác.
