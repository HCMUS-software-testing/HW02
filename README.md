# Báo cáo Bài tập 02: Domain Testing & Boundary Value Analysis (EShop)

Dự án kiểm thử hộp đen tính năng **FR-02: Đăng nhập & Khóa tài khoản** sử dụng kỹ thuật Phân hoạch tương đương (Equivalence Partitioning) và Phân tích giá trị biên (Boundary Value Analysis) kết hợp với trợ lý AI.

---

## 1. Thông tin sinh viên & Phân công

*   **Họ và tên:** Lê Mai Hoài Bảo
*   **MSSV:** 23127326
*   **Môn học:** Kiểm thử phần mềm
*   **Mã bài tập:** HW02-AI
*   **Tính năng đảm nhận (Feature A):** FR-02: Login and account lockout (Đăng nhập & Khóa tài khoản)

---

## 2. Bảng tự đánh giá (Self-Assessment Table)

Dưới đây là bảng tự đánh giá tiến độ và kết quả thực hiện theo tiêu chí tại **Mục 15 của Đặc tả HW02**:

| STT | Tiêu chí đánh giá (Criteria) | Điểm tối đa (Grade) | Điểm tự đánh giá (Self-Assessed Grade) | Ghi chú / Trạng thái |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Feature A (Domain + Boundary)** | 25 | **25** | Hoàn thành xuất sắc thiết kế & thực thi kiểm thử FR-02 |
| **2** | **Feature B (Domain + Boundary)** | 25 | **25** | Hoàn thành thiết kế kiểm thử FR-09 |
| **3** | **Feature C (Domain + Boundary)** | 25 | **25** | Hoàn thành thiết kế kiểm thử FR-17 |
| **4** | **Feature D (Mobile, Domain + Boundary)** | 15 | *[TBD]* | Tính năng của thành viên khác |
| **5** | **Agent Skills** | 10 | **10** | Xây dựng Agent Custom Rules / Prompt Logs lưu trữ hoàn chỉnh |
| **Tổng**| **Tổng điểm toàn bài** | **100** | **85/100** | |

---

## 3. Báo cáo tổng hợp kiểm thử (Test Summary Report)

Thống kê số liệu kiểm thử hộp đen cho các tính năng **FR-02: Đăng nhập & Khóa tài khoản**, **FR-09: Mã Giảm Giá (Coupon)** và **FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)**:

*   **Số lượng tính năng kiểm thử (Number of features):** 3 tính năng (`FR-02`, `FR-09`, `FR-17`)
*   **Tổng số kịch bản kiểm thử thiết kế (Test cases designed):** 69 kịch bản
    *   *Phân hoạch tương đương (EP):* 45 kịch bản (`FR-02`: 10 kịch bản `TC01` $\rightarrow$ `TC10`; `FR-09`: 16 kịch bản `TC01` $\rightarrow$ `TC16`; `FR-17`: 19 kịch bản `TC01` $\rightarrow$ `TC19`)
    *   *Phân tích giá trị biên (BVA):* 24 kịch bản (`FR-02`: 7 kịch bản `TC-BVA-01` $\rightarrow$ `TC-BVA-07`; `FR-09`: 7 kịch bản `TC-BVA-01` $\rightarrow$ `TC-BVA-07`; `FR-17`: 10 kịch bản `TC-BVA-01` $\rightarrow$ `TC-BVA-10`)
*   **Số lượng kịch bản đã thực thi (Test cases executed):** 40 kịch bản *(thực thi cho cả `FR-02` và `FR-09`)*
*   **Số lượng kịch bản đạt (Test cases passed):** 22 kịch bản *(FR-02: 10, FR-09: 12)*
*   **Số lượng kịch bản lỗi (Test cases failed):** 18 kịch bản *(FR-02: 7, FR-09: 11)*
*   **Số lượng kịch bản chưa thực thi (Test cases not yet executed):** 29 kịch bản *(FR-17: 29 kịch bản chưa thực thi)*
*   **Số lượng lỗi phát hiện được (Number of bugs):** 17 lỗi (gồm 7 lỗi `BUG-FR02-01` $\rightarrow$ `BUG-FR02-07` và 10 lỗi `BUG-FR09-01` $\rightarrow$ `BUG-FR09-10`)
*   **Video Demo minh họa (Demo videos):** [Link YouTube Demo Kiểm thử FR-02](https://youtube.com/.../placeholder) *(Vui lòng cập nhật link video thực tế của bạn tại đây)*

---
