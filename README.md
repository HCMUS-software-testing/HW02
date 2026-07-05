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
| **2** | **Feature B (Domain + Boundary)** | 25 | *[TBD]* | Tính năng của thành viên khác |
| **3** | **Feature C (Domain + Boundary)** | 25 | *[TBD]* | Tính năng của thành viên khác |
| **4** | **Feature D (Mobile, Domain + Boundary)** | 15 | *[TBD]* | Tính năng của thành viên khác |
| **5** | **Agent Skills** | 10 | **10** | Xây dựng Agent Custom Rules / Prompt Logs lưu trữ hoàn chỉnh |
| **Tổng**| **Tổng điểm toàn bài** | **100** | **[TBD]/100** | |

---

## 3. Báo cáo tổng hợp kiểm thử (Test Summary Report)

Thống kê số liệu kiểm thử hộp đen cho tính năng **FR-02: Đăng nhập & Khóa tài khoản**:

*   **Số lượng tính năng kiểm thử (Number of features):** 1 tính năng (`FR-02`)
*   **Tổng số kịch bản kiểm thử thiết kế (Test cases designed):** 17 kịch bản
    *   *Phân hoạch tương đương (EP):* 10 kịch bản (`TC01` $\rightarrow$ `TC10`)
    *   *Phân tích giá trị biên (BVA):* 7 kịch bản (`TC-BVA-01` $\rightarrow$ `TC-BVA-07`)
*   **Số lượng kịch bản đã thực thi (Test cases executed):** 17 kịch bản
*   **Số lượng kịch bản đạt (Test cases passed):** 10 kịch bản
*   **Số lượng kịch bản lỗi (Test cases failed):** 7 kịch bản
*   **Số lượng kịch bản chưa thực thi (Test cases not yet executed):** 0 kịch bản
*   **Số lượng lỗi phát hiện được (Number of bugs):** 7 lỗi (`BUG-FR02-01` $\rightarrow$ `BUG-FR02-07`)
*   **Video Demo minh họa (Demo videos):** [Link YouTube Demo Kiểm thử FR-02](https://youtube.com/.../placeholder) *(Vui lòng cập nhật link video thực tế của bạn tại đây)*

---
