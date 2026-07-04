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
Tôi đã đóng vai trò chuyên gia QA, nghiên cứu kỹ tài liệu đặc tả nghiệp vụ 

README.md
 và tài liệu đặc tả API 

api_specification.md
 của EShop, sau đó hoàn thành Bước 1: Xác định các biến Input và Output cho tính năng FR-02: Đăng nhập & Khóa tài khoản.

Nội dung đã được ghi nhận đầy đủ dưới dạng các bảng chi tiết trong file báo cáo của bạn tại 

Main_Report.md
:

Biến đầu vào (Input Variables):
Direct Inputs (Người dùng nhập trực tiếp): email, password.
State Inputs (Trạng thái hệ thống ảnh hưởng tới logic): failed_login_attempts (bộ đếm số lần đăng nhập sai liên tiếp) và lockout_status (trạng thái tạm khóa 30 giây).
Biến đầu ra (Output Variables):
API Outputs (Kết quả trả về từ API): http_status_code và api_response_payload (JWT Token, thông tin user hoặc thông báo lỗi phù hợp).
UI Outputs (Phản hồi/Hành động trên giao diện): ui_message (thông báo lỗi xuất hiện trên nút submit) và ui_action (chuyển hướng người dùng hoặc tạm khóa form đăng nhập).
```
