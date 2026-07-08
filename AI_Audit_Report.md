# AI Audit Report

## 1. Tuyên bố sử dụng AI (AI Declaration)
> **Declaration:** I use AI tools for the following tasks: Analyzing requirements, identifying input/output variables, partitioning equivalence classes, and generating boundary value test cases for Features A, B, C, and D.

---

## 2. Nhật ký tương tác (Interaction Logs)

### Prompt 1
*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-03, 11:55PM
*   **Mục đích:** Phân tích tài liệu đặc tả và xác định các biến vào/ra cho tính năng Đăng nhập & Khóa tài khoản.

#### Prompt
```text
Tôi đang làm bài tập HW02, thực hiện kỹ thuật Domain Testing cho tính năng FR-02: Đăng nhập & Khóa tài khoản dựa trên tài liệu đặc tả của EShop và kỹ thuật kiểm thử từ [04_Domain%20Testing.pdf]. Dưới đây là nội dung spec của tính năng FR-02 lấy từ file [README.md] và [api_specification.md]. Hãy đóng vai trò là một chuyên gia QA, đọc kỹ spec trên và thực hiện Bước 1: Xác định toàn bộ các biến Input và Output của FR-02 sau đó điền vào [Main_Report.md]. Lưu ý: Chỉ liệt kê các biến Input/Output, chưa làm các bước tiếp theo.
```

#### Output

```text
Tôi đã đóng vai trò chuyên gia QA, nghiên cứu kỹ tài liệu đặc tả nghiệp vụ README.md và tài liệu đặc tả API api_specification.md của EShop, sau đó hoàn thành Bước 1: Xác định các biến Input và Output cho tính năng FR-02: Đăng nhập & Khóa tài khoản.

Nội dung đã được ghi nhận đầy đủ dưới dạng các bảng chi tiết trong file báo cáo của bạn tại Main_Report.md:

Biến đầu vào (Input Variables):
Direct Inputs (Người dùng nhập trực tiếp): email, password.
State Inputs (Trạng thái hệ thống ảnh hưởng tới logic): failed_login_attempts (bộ đếm số lần đăng nhập sai liên tiếp) và lockout_status (trạng thái tạm khóa 30 giây).
Biến đầu ra (Output Variables):
API Outputs (Kết quả trả về từ API): http_status_code và api_response_payload (JWT Token, thông tin user hoặc thông báo lỗi phù hợp).
UI Outputs (Phản hồi/Hành động trên giao diện): ui_message (thông báo lỗi xuất hiện trên nút submit) và ui_action (chuyển hướng người dùng hoặc tạm khóa form đăng nhập).
```

File [Main_Report.md](./Main_Report.md) đã được ghi nhận đầy đủ với input và output của FR-02.

### Prompt 2

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-04, 01:27PM
*   **Mục đích:** Thực hiện kỹ thuật phân hoạch tương đương (Equivalence Partitioning) cho các biến Input/Output của FR-02 và điền vào [Main_Report.md].

#### Prompt 

```Text
Dựa trên các biến Input và Output đã xác định ở Bước 1, hãy giúp tôi thực hiện Bước 2: Xác định các lớp tương đương (Equivalence Classes) cho từng biến.  Hãy chia rõ thành hai nhóm: Valid Equivalence Classes (cho đầu vào hợp lệ) và Invalid Equivalence Classes (cho đầu vào không hợp lệ) theo đúng guideline phân hoạch miền của slide 04_Domain Testing.pdf. Hãy trình bày dưới dạng bảng.
```

#### Output

```
Tôi đã hoàn thành Bước 2: Xác định các lớp tương đương (Equivalence Classes) cho từng biến đầu vào và đầu ra dựa trên các chỉ dẫn phân hoạch miền trong tài liệu 04_Domain Testing.pdf. Các thông tin đã được cập nhật thành các bảng có phân loại rõ ràng Valid Equivalence Classes (Hợp lệ) và Invalid Equivalence Classes (Không hợp lệ) tại phần Bước 2 trong file báo cáo Main_Report.md:

Các biến đầu vào (Input Variables): Được phân hoạch từ EC01 đến EC14 cho các biến email, password, failed_login_attempts và lockout_status (theo thời gian khóa $t$).
Các biến đầu ra (Output Variables): Được phân hoạch từ EC15 đến EC24 cho các phản hồi ở mức API và mức UI (gồm mã trạng thái HTTP, dữ liệu trả về, thông điệp hiển thị và các hành động chuyển hướng/khóa form tương ứng).
```

File [Main_Report.md](./Main_Report.md) đã được ghi nhận đầy đủ với các bảng phân hoạch.

### Prompt 3

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-04, 03:13PM
*   **Mục đích:** Thêm cột actual output cho bản test case

#### Prompt 

```text
Hãy thêm cột actual output cho các test case (để trống) dùm tôi
```

### Output

```text
Tôi đã thực hiện bổ sung hai cột Kết quả thực tế (Actual Output) và Trạng thái (Pass/Fail) (được để trống | | |) vào cuối cả 2 bảng:

Bảng Test Cases Phân hoạch tương đương (Bước 3 - Mục 2): Từ TC01 đến TC10.
Bảng Test Cases Giá trị biên (Bước 4 - Mục 2): Từ TC-BVA-01 đến TC-BVA-07.
Bạn có thể xem trực tiếp sự thay đổi tại file báo cáo 

Main_Report.md
. Bây giờ các bảng đã có cấu trúc chuẩn chỉnh để bạn điền kết quả thực tế và trạng thái đạt/lỗi ngay khi thực hiện chạy thử (execute) kịch bản trên SUT!
```


File [Main_Report.md](./Main_Report.md) đã được ghi nhận đầy đủ với các bảng test cases.

### Prompt 4

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-05, 01:50PM
*   **Mục đích:** Viết script kiểm thử tự động Race Condition (Brute-force song song) cho kịch bản `TC08` vượt qua giới hạn click tay của giao diện.

#### Prompt
```text
Hãy viết một kịch bản Node.js (sử dụng fetch) để kiểm thử Race Condition (TC08) cho API đăng nhập của EShop tại địa chỉ http://localhost:3000/api/login. Kịch bản này cần tự động đăng ký một tài khoản test ngẫu nhiên, sau đó gửi đồng thời 5 request đăng nhập sai mật khẩu trong cùng 1 mili giây và in kết quả HTTP status, response để xem có request nào bị chặn 403 Forbidden từ lần 3 trở đi hay không.
```

#### Output
```javascript
// Ghi nhận mã nguồn được sinh ra tại scratch_test_race.js
// Gồm hàm đăng ký tài khoản ngẫu nhiên, Promise.all gửi 5 requests đồng thời, và log kết quả.
```

### Prompt 5

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-05, 02:00PM
*   **Mục đích:** Viết script kiểm thử tự động kiểm tra tính hiệu lực của JWT token cũ khi tài khoản bị khóa ở phiên làm việc khác cho kịch bản `TC09`.

#### Prompt
```text
Hãy viết một kịch bản Node.js (sử dụng fetch) để kiểm thử tính hiệu lực của JWT token cũ khi tài khoản bị khóa (TC09). Kịch bản này cần:
1. Đăng ký tài khoản sạch và đăng nhập thành công để nhận JWT Token.
2. Gửi 2 request đăng nhập sai liên tiếp từ một luồng khác để khóa tài khoản.
3. Dùng Token đã lấy ở bước 1 gọi API GET /api/users/me xem hệ thống có chặn lại (trả về 401/403) hay vẫn cho phép truy cập.
```

#### Output
```javascript
// Ghi nhận mã nguồn được sinh ra tại scratch_test_token.js
// Thiết lập đăng nhập, lưu token, gửi sai 2 lần gây khóa, và dùng token cũ gọi GET /api/users/me.
```


### Prompt 6

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-05, 02:47PM
*   **Mục đích:** Tổng hợp kết quả kiểm thử vào Bug_Report.md

#### Prompt

```text
Hãy đọc Main_Report.md, tổng hợp vào Bug_Report.md theo yêu cầu sau "Bug reporting. Report all discovered bugs both in the Markdown report and on your group's GitHub Issues page. Remember to attach bug screenshots to each GitHub issue."
```

#### Output

```text
Em đã đọc kỹ file Main_Report.md, đối chiếu toàn bộ các test case có trạng thái Fail ở cả hai bảng Phân hoạch tương đương (EP) và Phân tích giá trị biên (BVA), sau đó đồng bộ và tổng hợp đầy đủ vào file Bug_Report.md.

Các nội dung đã cập nhật trong Bug_Report.md:
- Bổ sung lỗi bị thiếu BUG-FR02-07 (Race Condition): Phản ánh lỗi đồng bộ hóa/giao dịch khi gửi đồng thời nhiều yêu cầu đăng nhập sai mật khẩu để vượt cơ chế khóa (phát hiện bởi TC08).
- Đồng bộ 100% mã Test Case phát hiện lỗi: Phân bổ rõ ràng kịch bản kiểm thử tương ứng cho từng lỗi (ví dụ: TC09 phát hiện BUG-FR02-05, TC10 phát hiện BUG-FR02-06, v.v.).
- Tích hợp cấu trúc báo cáo lỗi chuẩn của GitHub Issues & Screenshots: Dưới mỗi mục mô tả lỗi chi tiết đã bổ sung hai phần Đường dẫn GitHub Issue và Ảnh chụp minh họa (Bug Screenshot) trỏ tới thư mục screenshots/.
- Toàn bộ 7 lỗi phát hiện từ quá trình chạy test thực tế đã được lập hồ sơ báo cáo lỗi hoàn chỉnh và chuyên nghiệp.
```

File [Bug_report.md](./Bug_Report.md) đã được tổng hợp đầy đủ 7 lỗi (Bug) được phát hiện từ 10 kịch bản kiểm thử Miền và Giá trị biên, bao gồm các lỗi liên quan đến logic ghi nhận thất bại đăng nhập và quản lý trạng thái khóa tài khoản của hệ thống.


### Prompt 7


*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-05, 03:05PM
*   **Mục đích:** Tạo các Github Issue từ Bug_Report.md

#### Prompt

```text
[Bug_Report.md] Hãy dựa vào bug report tạo các Github Issue giúp tôi
```

#### Output

File [github_issues_templates](./github_issues_templates.md) được sinh ra.

### Prompt 8

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash (High)
*   **Thời gian thực hiện (Date and Time):** 2026-07-05, 05:14PM
*   **Mục đích:** Thực hiện kỹ thuật Domain Testing (EP + BVA) cho tính năng FR-09: Mã Giảm Giá (Coupon) — bao gồm xác định biến I/O, phân hoạch tương đương, phân tích giá trị biên và AI Gap Analysis.

#### Prompt

```text
Thực hiện domain testing với Pool B: FR-09
```

#### Output

```text
Đã hoàn thành kiểm thử miền cho tính năng FR-09: Mã Giảm Giá (Coupon).

Kết quả đã được ghi vào Main_Report.md:
- Bước 1: Xác định 7 biến đầu vào và 5 biến đầu ra.
- Bước 2: Phân hoạch 31 lớp tương đương (EC22 đến EC52).
- Bước 3: Thiết kế 16 test cases EP (TC01 đến TC16).
- Bước 4: Phân tích giá trị biên, thiết kế 7 test cases BVA (TC-BVA-01 đến TC-BVA-07).
- Bước 5: AI Gap Analysis — ghi nhận 3 kịch bản bị bỏ sót và 3 vấn đề AI Critique.

README.md và AI_Audit_Report.md đã được cập nhật tương ứng.
```

File [Main_Report.md](./Main_Report.md) đã được bổ sung đầy đủ nội dung Domain Testing cho FR-09.


### Prompt 9

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-06, 09:28PM
*   **Mục đích:** Tìm các bug của FR-09 từ [Main_Report.md] và ghi vào [Bug_Report.md]

#### Prompt
```text
Hãy dựa vào [Main_Report.md] phân tích sau đó ghi các bug của FR-09 vào [Bug_Report.md] 
```

#### Output

File [Bug_Report.md](./Bug_Report.md) thêm được 


### Prompt 10

*   **Công cụ AI sử dụng (Name of AI Tool):** Codex GPT-5
*   **Thời gian thực hiện (Date and Time):** 2026-07-07, 03:12PM
*   **Mục đích:** Thực hiện kỹ thuật Domain Testing (EP + BVA) cho tính năng FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) — bao gồm xác định biến I/O, phân hoạch tương đương, phân tích giá trị biên và AI Gap Analysis.

#### Prompt

```text
Thực hiện domain testing với Pool C: FR-17
```

#### Output

```text
Đã hoàn thành kiểm thử miền cho tính năng FR-17: Quản lý Mã Giảm Giá (Coupon CRUD).

Kết quả đã được ghi vào Main_Report.md:
- Bước 1: Xác định 11 biến đầu vào và 4 biến đầu ra.
- Bước 2: Phân hoạch 37 lớp tương đương (EC01 đến EC37).
- Bước 3: Thiết kế 19 test cases EP (TC01 đến TC19).
- Bước 4: Phân tích giá trị biên, thiết kế 10 test cases BVA (TC-BVA-01 đến TC-BVA-10).
- Bước 5: AI Gap Analysis — ghi nhận 3 kịch bản bị bỏ sót và 3 vấn đề AI Critique.

README.md, AI_Audit_Report.md và Bug_Report.md đã được cập nhật tương ứng.
```

File [Main_Report.md](./Main_Report.md) đã được bổ sung đầy đủ nội dung Domain Testing cho FR-17.

### Prompt 11


*   **Công cụ AI sử dụng (Name of AI Tool):** Codex GPT-5
*   **Thời gian thực hiện (Date and Time):** 2026-07-07, 05:00PM
*   **Mục đích:** Tìm các bug của FR-17 từ [Main_Report.md] và ghi vào [Bug_Report.md]

#### Prompt
```text
Dựa vào các test case trong main report của FR-17 hãy phân tích và tổng hợp nó vào Bug Report
```

#### Output

```text
Đã cập nhật [Bug_Report.md](/Users/mac/KhoChua/ĐH/Năm3/HK3/Kiểm thử phần mềm/HW02/Bug_Report.md) dựa trên các test case FR-17 trong Main_Report.md.
Mình đã tổng hợp FR-17 thành 9 bug (BUG-FR17-01 đến BUG-FR17-09) với các thông tin chi tiết về mô tả lỗi, bước tái hiện, kết quả mong đợi, kết quả thực tế
```

File [Bug_Report.md](./Bug_Report.md) đã được tổng hợp đầy đủ 9 lỗi (Bug) được phát hiện từ 19 kịch bản kiểm thử Miền và 10 kịch bản kiểm thử Giá trị biên của FR-17, bao gồm các lỗi liên quan đến logic tạo, xóa và validate dữ liệu coupon của hệ thống.