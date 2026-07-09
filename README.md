# Báo cáo Bài tập 02: Domain Testing & Boundary Value Analysis (EShop)

Dự án thực hiện kiểm thử hộp đen cho hệ thống **EShop** bằng kỹ thuật **Phân hoạch tương đương (Equivalence Partitioning - EP)** và **Phân tích giá trị biên (Boundary Value Analysis - BVA)**, kết hợp sử dụng AI để hỗ trợ thiết kế test case, rà soát khoảng trống kiểm thử và ghi nhận lỗi.

## 1. Thông tin sinh viên

* **Họ và tên:** Lê Mai Hoài Bảo
* **MSSV:** 23127326
* **Môn học:** Kiểm thử phần mềm

## 2. Phạm vi kiểm thử

|   Pool   | Feature | Tính năng                         | Số TC EP | Số TC BVA | Tổng TC |   Pass |   Fail | Số bug |
| :------: | :-----: | :-------------------------------- | -------: | --------: | ------: | -----: | -----: | -----: |
|    A     |  FR-02  | Đăng nhập & Khóa tài khoản        |       10 |         7 |      17 |     10 |      7 |      7 |
|    B     |  FR-09  | Mã Giảm Giá (Coupon)              |       16 |         7 |      23 |     12 |     11 |      7 |
|    C     |  FR-17  | Quản lý Mã Giảm Giá (Coupon CRUD) |       19 |        10 |      29 |     10 |     19 |      9 |
|    D     |  FR-07  | Giỏ hàng (Shopping Cart)          |       19 |         8 |      27 |      4 |     23 |      8 |
| **Tổng** |         |                                   |   **64** |    **32** |  **96** | **36** | **60** | **31** |

## 3. Báo cáo tổng hợp kiểm thử

* **Số lượng tính năng kiểm thử:** 4 tính năng (`FR-02`, `FR-09`, `FR-17`, `FR-07`)
* **Tổng số test case thiết kế:** 96 test case
* **Tổng số test case đã thực thi:** 96 test case
* **Tổng số test case đạt:** 36 test case
* **Tổng số test case lỗi:** 60 test case
* **Số test case chưa thực thi / bị chặn môi trường:** 0 test case
* **Số lỗi phát hiện được:** 31 lỗi, tất cả đang ở trạng thái `Open`

## 4. Danh sách lỗi theo tính năng

| Feature | Mã lỗi                         | Nhóm lỗi chính                                                                                                                                                                       | Severity nổi bật       |
| :-----: | :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
|  FR-02  | `BUG-FR02-01` -> `BUG-FR02-07` | Khóa tài khoản sai ngưỡng, không tự mở khóa, rò rỉ mật khẩu, token cũ vẫn hợp lệ, thiếu validate email, race condition                                                               | Critical, High, Medium |
|  FR-09  | `BUG-FR09-01` -> `BUG-FR09-07` | Tính sai coupon percent, sai biên min order, thiếu xác thực JWT, giả mạo`user_id`, checkout bypass, thông báo lỗi sai, double-use race condition                                     | Critical, High, Medium |
|  FR-17  | `BUG-FR17-01` -> `BUG-FR17-09` | Thiếu kiểm tra role Admin, thiếu validate các trường coupon, lỗi trùng mã trả 500/lộ SQLite, xóa ID không tồn tại vẫn báo thành công                                                 | Critical, High, Medium |
|  FR-07  | `BUG-FR07-01` -> `BUG-FR07-08` | API cart không gộp sản phẩm, thiếu validate quantity/product data, response HTML 404, UI mobile sai nhãn tổng tiền, thiếu nút`+/-`, thiếu xác nhận xóa, thiếu illustration giỏ trống | High, Medium, Low      |

Chi tiết từng lỗi, bước tái hiện, expected/actual output, severity, GitHub issue và ảnh minh họa được ghi trong [`Bug_Report.md`](./Bug_Report.md).

## 5. Tài liệu nộp bài

* [`Main_Report.md`](./Main_Report.md): Báo cáo domain testing đầy đủ cho 4 feature, gồm I/O variables, EP, BVA, test case, actual result và AI gap analysis.
* [`Bug_Report.md`](./Bug_Report.md): Danh sách 31 lỗi và mô tả chi tiết từng bug.
* [`AI_Audit_Report.md`](./AI_Audit_Report.md): Nhật ký sử dụng AI trong quá trình kiểm thử.
* [`AI_Critique_Report.md`](./AI_Critique_Report.md): Bản đánh giá riêng về hạn chế, sai lệch và cách kiểm soát kết quả do AI hỗ trợ.
* [`screenshots/`](./screenshots/): Ảnh minh họa lỗi và bằng chứng kiểm thử.
* `scratch_test_*.js`: Script kiểm thử black-box/ad hoc hỗ trợ kiểm chứng các lỗi API hoặc race condition.

## 6. Tự đánh giá

|   STT    | Tiêu chí đánh giá                                              | Điểm tối đa | Điểm tự đánh giá |
| :------: | :------------------------------------------------------------- | :---------: | :--------------: |
|    1     | Pool A - FR-02: Đăng nhập & Khóa tài khoản (Domain + Boundary) |     25      |        25        |
|    2     | Pool B - FR-09: Mã Giảm Giá (Domain + Boundary)                |     25      |        25        |
|    3     | Pool C - FR-17: Quản lý Mã Giảm Giá (Domain + Boundary)        |     25      |        25        |
|    4     | Pool D - FR-07: Giỏ hàng (Mobile, Domain + Boundary)           |     15      |        15        |
|    5     | Agent Skills                                                   |     10      |        10        |
| **Tổng** |                                                                |   **100**   |   **100/100**    |

## 7. Demo videos

* Demo video Agent Skill Domain Testing: [Agent Skill Domain Testing](https://youtu.be/zuflIL3nH2M)
