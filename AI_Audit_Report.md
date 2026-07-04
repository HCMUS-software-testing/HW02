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

### Prompt 3

*   **Công cụ AI sử dụng (Name of AI Tool):** Gemini 3.5 Flash
*   **Thời gian thực hiện (Date and Time):** 2026-07-04, 03:13PM
*   **Mục đích:** Thêm cột actual output cho bản test case

#### Prompt 

```text
Hãy thêm cột actual output cho các test case (để trống) dùm tôi
```

#### Output

```text
Tôi đã thực hiện bổ sung hai cột Kết quả thực tế (Actual Output) và Trạng thái (Pass/Fail) (được để trống | | |) vào cuối cả 2 bảng:
- Bảng Test Cases Phân hoạch tương đương (Bước 3 - Mục 2): Từ TC01 đến TC10.
- Bảng Test Cases Giá trị biên (Bước 4 - Mục 2): Từ TC-BVA-01 đến TC-BVA-07.

(AI đã tự động cập nhật trực tiếp cấu trúc của file Main_Report.md bằng cách thêm hai cột trống này).
```