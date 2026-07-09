# Báo cáo Bài tập 02: Domain Testing & Boundary Value Analysis (EShop)

Dự án kiểm thử hộp đen các tính năng **FR-03, FR-10, FR-14, FR-01** sử dụng kỹ thuật Phân hoạch tương đương (Equivalence Partitioning) và Phân tích giá trị biên (Boundary Value Analysis) kết hợp với trợ lý AI.

---

## 1. Thông tin sinh viên & Phân công

*   **Họ và tên:** Mai Thị Kim Duyên
*   **MSSV:** 23127185
*   **Môn học:** Kiểm thử phần mềm
*   **Mã bài tập:** HW02-AI
*   **Tính năng đảm nhận:**
    *   Pool A: FR-03 — Quên mật khẩu & Đặt lại mật khẩu (2 bước)
    *   Pool B: FR-10 — Trạng thái Đơn hàng
    *   Pool C: FR-14 — Quản lý Danh mục (Category CRUD)
    *   Pool D (Mobile): FR-01 — Đăng ký tài khoản

---

## 2. Bảng tự đánh giá (Self-Assessment Table)

Dưới đây là bảng tự đánh giá tiến độ và kết quả thực hiện theo tiêu chí tại **Mục 15 của Đặc tả HW02**:

| STT | Tiêu chí đánh giá (Criteria) | Điểm tối đa (Grade) | Điểm tự đánh giá (Self-Assessed Grade) |
| :---: | :--- | :---: | :---: |
| **1** | **Tính năng 3 - Pool A: Quên mật khẩu & Đặt lại mật khẩu (2 bước)** | 25 | 25 |
| **2** | **Tính năng 10 - Pool B: Trạng thái Đơn hàng** | 25 | 25 |
| **3** | **Tính năng 14 - Pool C: Quản lý Danh mục (Category CRUD)** | 25 | 25 |
| **4** | **Tính năng 1 - Pool D (Mobile): Đăng ký tài khoản** | 15 | 15 |
| **5** | **Agent Skills** | 10 | 8 |
| **Tổng** | **Tổng điểm toàn bài** | **100** | 98 |

---

## 3. Báo cáo tổng hợp kiểm thử (Test Summary Report)

Thống kê số liệu kiểm thử cho các tính năng FR-03, FR-10, FR-14 và FR-01:

*   Số lượng tính năng kiểm thử (Number of features): 4 tính năng (`FR-03`, `FR-10`, `FR-14`, `FR-01`)
*   Tổng số kịch bản kiểm thử thiết kế (Test cases designed): 60 kịch bản
    *   FR-03 (Pool A): 21 kịch bản (`TC1` → `TC21`)
    *   FR-10 (Pool B): 11 kịch bản (`TC1` → `TC11`)
    *   FR-14 (Pool C): 9 kịch bản (`TC1` → `TC9`)
    *   FR-01 (Pool D): 19 kịch bản (`TC1` → `TC19`)
*   Số lượng kịch bản đã thực thi (Test cases executed): 60 kịch bản
*   Số lượng kịch bản đạt (Test cases passed): 32 kịch bản (FR-03: 8, FR-10: 6, FR-14: 3, FR-01: 15)
*   Số lượng kịch bản lỗi (Test cases failed): 28 kịch bản (FR-03: 13, FR-10: 5, FR-14: 6, FR-01: 4)
*   Số lượng lỗi phát hiện được (Number of bugs): 14 lỗi (gồm Bug 1 → Bug 4 cho FR-03; Bug 5 → Bug 6 cho FR-10; Bug 7 → Bug 10 cho FR-14; Bug 11 → Bug 14 cho FR-01)
*   Video Demo minh họa (Demo videos): https://youtu.be/IAn5Fo-WTX8
---
