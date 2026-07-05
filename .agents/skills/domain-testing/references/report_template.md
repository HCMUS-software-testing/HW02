# Template Cấu trúc Report — Domain Testing

Đây là template chuẩn cho **một tính năng** (Pool X: FR-XX) trong `Main_Report.md`. Agent phải tuân thủ chính xác cấu trúc này.

---

## Cách sử dụng

Khi thực hiện domain testing cho `Pool X: FR-XX`, append toàn bộ nội dung dưới đây vào cuối file `Main_Report.md`, thay thế các placeholder `[POOL_LABEL]`, `[FEATURE_ID]`, `[FEATURE_NAME]`, v.v. bằng giá trị thực tế.

---

## Template

```markdown
### [POOL_LABEL]: [FEATURE_ID]: [FEATURE_NAME]

#### Bước 1: Xác định các biến Input và Output (I/O Variables)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các biến vào/ra của tính năng **[FEATURE_ID]: [FEATURE_NAME]**, em đã thực hiện các bước phân tích sau:
1.  **Phân tích đặc tả nghiệp vụ (Specification Analysis):** [Mô tả nguồn tài liệu và thông tin đặc tả đã đọc.]
2.  **Xác định biến đầu vào trực tiếp (Direct Inputs):** [Liệt kê các biến người dùng nhập trực tiếp.]
3.  **Xác định biến đầu vào trạng thái (System State Inputs):** [Liệt kê các biến trạng thái hệ thống ảnh hưởng tới luồng xử lý, giải thích tại sao chúng là Preconditions.]
4.  **Xác định biến đầu ra (Outputs):** [Mô tả các phản hồi từ API và giao diện UI.]

##### 1. Các biến đầu vào (Input Variables)

[Mô tả tổng quan về danh sách biến đầu vào.]

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `[variable_name]` | [Direct Input / State Input] | [String/Integer/Enum/Boolean] | [Ràng buộc từ đặc tả] | [Mô tả ngắn gọn] |
| **2** | ... | ... | ... | ... | ... |

##### 2. Các biến đầu ra (Output Variables)

[Mô tả tổng quan về danh sách biến đầu ra.]

| STT | Tên biến | Loại biến | Kiểu dữ liệu | Ràng buộc đặc tả / Miền giá trị | Mô tả |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | `[variable_name]` | [API Output / UI Output] | [Integer/JSON Object/String/Enum] | [Ràng buộc từ đặc tả] | [Mô tả ngắn gọn] |
| **2** | ... | ... | ... | ... | ... |

#### Bước 2: Phân hoạch tương đương (Equivalence Partitioning)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để thực hiện kỹ thuật Phân hoạch tương đương cho tính năng **[FEATURE_ID]: [FEATURE_NAME]**, em đã áp dụng các bước có hệ thống sau:
1.  **Phân tích điều kiện đầu vào/đầu ra:** [Mô tả các điều kiện ràng buộc đã phân tích.]
2.  **Xác định các lớp tương đương Valid và Invalid:** [Mô tả nguyên tắc phân hoạch cho từng biến.]
3.  **Lựa chọn giá trị đại diện (Representatives):** [Mô tả cách chọn giá trị đại diện.]
4.  **Thiết kế tập Test Cases tối thiểu:** [Mô tả nguyên tắc thiết kế TC.]

##### 1. Các biến đầu vào (Input Variables)

| Mã lớp | Biến đầu vào | Phân loại lớp | Lớp tương đương | Mô tả / Ý nghĩa kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `[variable_name]` | **Valid** | [Mô tả lớp tương đương] | [Ý nghĩa kiểm thử] |
| **EC02** | `[variable_name]` | **Invalid** | [Mô tả lớp tương đương] | [Ý nghĩa kiểm thử] |
| ... | ... | ... | ... | ... |

##### 2. Các biến đầu ra (Output Variables)

| Mã lớp | Biến đầu ra | Phân loại lớp | Lớp tương đương | Ý nghĩa phản hồi |
| :---: | :--- | :---: | :--- | :--- |
| **EC[N]** | `[variable_name]` | **Valid (Success)** | [Mô tả lớp] | [Ý nghĩa] |
| **EC[N+1]** | `[variable_name]` | **Invalid (Failure)** | [Mô tả lớp] | [Ý nghĩa] |
| ... | ... | ... | ... | ... |

---

#### Bước 3: Lựa chọn giá trị đại diện (Selecting Representatives)

##### 1. Bảng giá trị đại diện cho các lớp tương đương

| Mã lớp | Biến tương ứng | Loại lớp | Giá trị đại diện | Ý nghĩa / Ghi chú kiểm thử |
| :---: | :--- | :---: | :--- | :--- |
| **EC01** | `[variable_name]` | Valid | `[representative_value]` | [Ghi chú] |
| **EC02** | `[variable_name]` | Invalid | `[representative_value]` | [Ghi chú] |
| ... | ... | ... | ... | ... |

##### 2. Thiết kế tập Test Cases phân hoạch tương đương (Equivalence Partitioning Test Cases)

Tập test cases tối thiểu dưới đây được thiết kế nhằm bao phủ toàn bộ các lớp tương đương đã phân hoạch ở Bước 2:

| Mã TC | Tên Test Case | Lớp tương đương phủ | Điều kiện tiền đề (Preconditions) | [Input 1] | [Input 2] | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | [Tên kịch bản] | [Mã EC phủ] | [Điều kiện tiền đề] | [Giá trị] | [Giá trị] | [Expected: Mô tả theo nghiệp vụ] | | |
| **TC02** | ... | ... | ... | ... | ... | ... | | |
| ... | ... | ... | ... | ... | ... | ... | | |

---

#### Bước 4: Phân tích giá trị biên (Boundary Value Analysis - BVA)

##### Giải thích chi tiết từng bước (Step-by-Step Explanation)

Để xác định các giá trị biên nhạy cảm của tính năng **[FEATURE_ID]: [FEATURE_NAME]**, em đã thực hiện phân tích theo các bước sau:
1.  **Xác định các biến có tính thứ tự hoặc khoảng số:** [Liệt kê biến có khoảng giá trị số/thời gian.]
2.  **Xác định các điểm biên (Boundaries) cho từng biến:** [Mô tả biên dưới LB và biên trên UB của từng biến.]
3.  **Lựa chọn các điểm kiểm thử biên nhạy cảm:** [Mô tả các điểm LB, LB+1, LB-1, UB, UB-1, UB+1.]

##### 1. Phân tích giá trị biên của các biến số/khoảng số

*   **Biến `[variable_name]` (Khoảng hợp lệ: `[LB, UB]`):**
    *   $LB = [value]$: [Ý nghĩa]
    *   $LB+1 = [value]$: [Ý nghĩa]
    *   $UB = [value]$: [Ý nghĩa]
    *   $UB+1 = [value]$: [Ý nghĩa] *(Tại ngưỡng kích hoạt hành vi mới)*
    *   $LB-1 = [value]$: [Ý nghĩa / Ghi chú nếu không thể đạt qua giao diện công khai]

##### 2. Thiết kế tập Test Cases giá trị biên (Boundary Value Test Cases)

| Mã TC | Tên Test Case | Biên kiểm thử | Điều kiện tiền đề (Preconditions) | [Input 1] | [Input 2] | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Output) | Trạng thái (Pass/Fail) |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-BVA-01** | [Tên kịch bản] | [Điểm biên] | [Điều kiện tiền đề] | [Giá trị] | [Giá trị] | [Expected: Mô tả theo nghiệp vụ] | | |
| **TC-BVA-02** | ... | ... | ... | ... | ... | ... | | |
| ... | ... | ... | ... | ... | ... | ... | | |

#### Bước 5: Phân tích khoảng trống AI (AI Gap Analysis)

##### 1. Các kịch bản/lỗi kiểm thử mà AI đã bỏ sót
*   **[Tên kịch bản bị bỏ sót 1]:** [Mô tả chi tiết kịch bản bị bỏ sót và lý do nó quan trọng.]
*   **[Tên kịch bản bị bỏ sót 2]:** [Mô tả.]

##### 2. Các sự nhầm lẫn, ảo giác và thiếu sót của AI trong quá trình thiết kế (AI Critique)
*   **[Tên vấn đề 1]:** [Mô tả chi tiết.]
*   **[Tên vấn đề 2]:** [Mô tả chi tiết.]

##### 3. Giải thích nguyên nhân AI gặp các hạn chế trên
*   **[Nguyên nhân 1]:** [Mô tả.]
*   **[Nguyên nhân 2]:** [Mô tả.]
```

---

## Quy tắc bắt buộc

1. **Cột Actual Output và Pass/Fail luôn để trống**: Ghi `| |` (một khoảng trắng) — **KHÔNG ĐƯỢC ĐIỀN BẤT KỲ GIÁ TRỊ NÀO**
2. **Expected Output mô tả theo nghiệp vụ**: Không được dùng chuỗi JSON cụ thể của implementation (ví dụ: không được viết `{"error": "Invalid email or password"}`, thay vào đó viết `JSON chứa thông báo lỗi bảo mật chung, không phân biệt nguyên nhân`)
3. **System State → Preconditions**: Các biến trạng thái hệ thống (bộ đếm, trạng thái khóa, quyền truy cập) phải được đặt trong cột Preconditions, KHÔNG phải cột Input
4. **Đánh số EC liên tục**: Bắt đầu từ EC01 và đánh số liên tục, không reset giữa bảng Input và Output
5. **Đánh số TC**: EP test cases: `TC01`, `TC02`, ... ; BVA test cases: `TC-BVA-01`, `TC-BVA-02`, ...
