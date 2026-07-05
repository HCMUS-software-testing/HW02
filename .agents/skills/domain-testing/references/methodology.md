# Phương pháp luận Domain Testing (EP + BVA)

Tài liệu này tóm tắt phương pháp kỹ thuật kiểm thử miền dựa trên slide `04_Domain Testing.pdf` để Agent áp dụng nhất quán.

---

## 1. Equivalence Partitioning (Phân hoạch tương đương)

### Nguyên tắc cốt lõi
- **Partitioning**: Chia toàn bộ miền đầu vào thành các lớp tương đương (EC — Equivalence Class) sao cho các phần tử trong cùng một lớp có hành vi hệ thống **giống nhau**.
- **Valid EC**: Lớp chứa các giá trị hợp lệ, hệ thống nên xử lý bình thường.
- **Invalid EC**: Lớp chứa các giá trị không hợp lệ, hệ thống nên từ chối hoặc phản hồi lỗi.

### Quy tắc phân hoạch
| Điều kiện đầu vào | Cách phân hoạch |
|:---|:---|
| Khoảng giá trị (range) | 1 Valid EC (trong khoảng) + 2 Invalid EC (dưới và trên khoảng) |
| Giá trị cụ thể (specific value) | 1 Valid EC (đúng giá trị) + 2 Invalid EC (nhỏ hơn và lớn hơn) |
| Tập hợp (set) | 1 Valid EC (thuộc tập) + 1 Invalid EC (ngoài tập) |
| Boolean (true/false) | 1 Valid EC + 1 Invalid EC |
| String có format (email, phone) | 1 Valid EC (đúng format) + Invalid EC (sai format, rỗng) |

### Nguyên tắc thiết kế Test Cases
1. **TC Valid duy nhất**: Kết hợp **tất cả** các lớp Valid của mọi biến vào **1 test case** duy nhất để kiểm tra luồng thành công.
2. **TC Invalid riêng lẻ**: Mỗi test case invalid chỉ chứa **đúng 1 lớp Invalid**, phần còn lại kết hợp với các lớp Valid. Nguyên tắc này giúp **cô lập lỗi** và tránh **error masking**.
3. Có thể bổ sung thêm TC integration (concurrent, security edge cases) sau khi đã phủ đủ EC.

---

## 2. Boundary Value Analysis (Phân tích giá trị biên)

### Nguyên tắc cốt lõi
Lỗi thường xuất hiện tại **ranh giới** giữa các phân vùng. BVA chọn các điểm kiểm thử tại và sát ranh giới này.

### 6 điểm biên chuẩn cho khoảng `[LB, UB]`
| Điểm | Ký hiệu | Ý nghĩa |
|:---:|:---:|:---|
| Biên dưới | `LB` | Giá trị tối thiểu hợp lệ |
| Sát trong biên dưới | `LB+1` | Vừa lớn hơn biên dưới |
| Sát ngoài biên dưới | `LB-1` | Vừa nhỏ hơn biên dưới (invalid) |
| Biên trên | `UB` | Giá trị tối đa hợp lệ |
| Sát trong biên trên | `UB-1` | Vừa nhỏ hơn biên trên |
| Sát ngoài biên trên | `UB+1` | Vừa lớn hơn biên trên (invalid) |

### Lưu ý quan trọng (Black-box)
- Chỉ áp dụng BVA cho các biến có **tính thứ tự** (số nguyên, số thực, thời gian, độ dài chuỗi).
- Nếu `LB-1` hoặc `UB+1` không thể đạt được qua giao diện công khai (UI/API), chỉ ghi nhận **phân tích lý thuyết** mà **không** thiết kế test case thực tế.
- Không can thiệp trực tiếp vào Database để thiết lập giá trị biên — đây là vi phạm Black-box testing.

---

## 3. Nguyên tắc Black-box Testing

> **Quy tắc bất khả xâm phạm:** Agent KHÔNG được đọc bất kỳ file nào trong các thư mục source code (`backend/`, `frontend-web/`, `frontend-admin/`, `frontend-mobile/`) của SUT khi thiết kế test case.

Nguồn thông tin hợp lệ duy nhất:
- `eshop-sut/README.md` — Đặc tả yêu cầu nghiệp vụ
- `eshop-sut/api_specification.md` — Đặc tả API
- Hành vi quan sát được qua UI và API response (khi thực thi)

---

## 4. Phân loại biến đầu vào

| Loại biến | Mô tả | Cách xử lý trong test case |
|:---|:---|:---|
| **Direct Input** | Người dùng nhập trực tiếp (form fields, API body params) | Ghi vào cột Input của bảng test case |
| **System State Input** | Trạng thái hệ thống ảnh hưởng tới luồng xử lý (bộ đếm, trạng thái khóa, quyền) | Ghi vào cột **Điều kiện tiền đề (Preconditions)** — KHÔNG ghi vào cột Input trực tiếp |

> **Lý do**: System State Input không phải là thứ người dùng "nhập vào" qua form. Mô hình hóa chúng như Preconditions giúp Test Case phản ánh đúng thực tế Black-box.

---

## 5. Phân loại biến đầu ra

| Loại biến | Mô tả |
|:---|:---|
| **API Output** | HTTP status code, JSON response body |
| **UI Output** | Thông báo hiển thị trên giao diện, hành động điều hướng, thay đổi trạng thái UI |

Expected Output trong test case phải mô tả hành vi theo **yêu cầu nghiệp vụ** (từ đặc tả), không phải chuỗi JSON cụ thể của implementation.
