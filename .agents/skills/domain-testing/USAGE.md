# Hướng dẫn sử dụng Agent Skill: Domain Testing

> **Dành cho**: Sinh viên thực hiện bài tập HW02 — Domain Testing cho hệ thống EShop  
> **Skill**: `domain-testing` tại `.agents/skills/domain-testing/`

---

## 1. Skill này làm gì?

Khi bạn gọi lệnh đúng cú pháp, Agent sẽ tự động:

| Bước | Hành động |
|:---:|:---|
| 1 | Đọc đặc tả `eshop-sut/README.md` và `eshop-sut/api_specification.md` |
| 2 | Xác định tất cả biến Input/Output của tính năng |
| 3 | Phân hoạch tương đương (EP) — chia lớp Valid/Invalid |
| 4 | Chọn giá trị đại diện + thiết kế bảng EP Test Cases |
| 5 | Phân tích giá trị biên (BVA) + thiết kế bảng BVA Test Cases |
| 6 | Viết AI Gap Analysis |
| 7 | **Ghi kết quả vào 4 file**: `Main_Report.md`, `README.md`, `AI_Audit_Report.md`, `Bug_Report.md` |

> **Lưu ý**: Cột **Actual Output** và **Pass/Fail** trong mọi bảng test case luôn được để **trống** — bạn tự điền sau khi chạy test thực tế.

---

## 2. Cách gọi lệnh

### Cú pháp cơ bản

```
Thực hiện domain testing với Pool X: FR-XX
```

### Ví dụ cụ thể

```
Thực hiện domain testing với Pool A: FR-02
```

```
Thực hiện domain testing với Pool B: FR-09
```

```
Thực hiện domain testing với Pool C: FR-03
```

```
Thực hiện domain testing với Pool D: FR-20
```

### Các biến thể cú pháp cũng được nhận diện

```
domain testing FR-03
```

```
kiểm thử miền Pool C: FR-03
```

```
làm domain testing FR-09
```

> ⚠️ **Quan trọng**: Hãy dùng trong **conversation mới** (không phải tiếp tục conversation cũ dài) để Agent load skill sạch và không bị ảnh hưởng bởi ngữ cảnh cũ.

---

## 3. Quy trình làm việc đầy đủ

### Giai đoạn 1 — Thiết kế (Agent tự động)

1. **Mở conversation mới** trong Antigravity IDE
2. Gõ lệnh: `Thực hiện domain testing với Pool X: FR-XX`
3. Chờ Agent hoàn thành — toàn bộ nội dung sẽ được append vào các file

**Kết quả sau giai đoạn 1:**
- ✅ `Main_Report.md` — Có đầy đủ 5 bước, cột Actual Output để trống
- ✅ `README.md` — Bảng Self-Assessment và Test Summary được cập nhật
- ✅ `AI_Audit_Report.md` — Có thêm 1 Prompt Log tổng hợp
- ✅ `Bug_Report.md` — Có placeholder section cho feature mới

### Giai đoạn 2 — Thực thi test (Bạn tự làm)

1. Mở `Main_Report.md`, tìm phần Pool X: FR-XX vừa được thêm
2. Chạy từng test case trên hệ thống EShop thực tế (`http://localhost:5173` hoặc Postman)
3. Điền **Kết quả thực tế (Actual Output)** vào từng dòng TC
4. Đánh **Pass/Fail** cho từng TC

### Giai đoạn 3 — Báo cáo Bug (Sau khi có Actual Output)

1. Xem các TC có trạng thái **Fail**
2. **Nhóm** các TC Fail theo cùng nguyên nhân gốc (root cause)
3. Với mỗi nhóm root cause, thêm **1 mục Bug** vào `Bug_Report.md` (thay thế placeholder)
4. Chụp ảnh màn hình bằng chứng lỗi, đặt vào thư mục `screenshots/`
5. Tạo GitHub Issue, cập nhật link vào `Bug_Report.md`

> **Ví dụ nhóm bug**: Nếu TC02 và TC-BVA-01 cùng Fail vì cùng lý do → chỉ tạo **1 Bug** với `Mã TC phát hiện: TC02, TC-BVA-01`.

---

## 4. Cấu trúc file Skill

```
.agents/skills/domain-testing/
├── SKILL.md                          ← Quy trình thực thi (Agent đọc khi chạy)
├── examples/
│   └── fr02_completed.md             ← Ví dụ gold-standard FR-02 đã hoàn chỉnh
└── references/
    ├── methodology.md                ← Phương pháp EP + BVA chi tiết
    ├── report_template.md            ← Template bảng chuẩn cho 5 bước
    └── file_update_rules.md          ← Quy tắc ghi vào từng file output
```

---

## 5. Các quy tắc bất biến (Agent tự tuân thủ)

| Quy tắc | Mô tả |
|:---|:---|
| 🔲 Actual Output luôn trống | Agent **không bao giờ** điền vào cột Actual Output hay Pass/Fail |
| ⛔ Không đọc source code | Chỉ dùng `eshop-sut/README.md` và `api_specification.md` — tuyệt đối không đọc `backend/`, `frontend-web/`, v.v. |
| 📋 Expected Output theo nghiệp vụ | Không dùng chuỗi JSON cụ thể của implementation (ví dụ không viết `{"error": "..."}`) |
| 🔀 System State → Preconditions | Biến trạng thái hệ thống (bộ đếm, trạng thái khóa, quyền...) nằm ở cột Preconditions, không phải cột Input |
| 🐛 1 Bug = 1 Root Cause | Nhiều TC Fail cùng nguyên nhân → 1 mục Bug, liệt kê tất cả mã TC |

---

## 6. Kiểm tra kết quả sau khi Agent chạy

Sau khi Agent hoàn thành, hãy kiểm tra nhanh:

- [ ] `Main_Report.md`: Có section mới `### Pool X: FR-XX` với đủ 5 bước
- [ ] Tất cả cột "Kết quả thực tế" trong bảng TC đều **trống**
- [ ] Tất cả cột "Trạng thái (Pass/Fail)" đều **trống**
- [ ] `README.md`: Bảng Self-Assessment đã cập nhật điểm Pool X
- [ ] `AI_Audit_Report.md`: Có thêm `### Prompt N` mới ở cuối file
- [ ] `Bug_Report.md`: Có thêm placeholder section cho FR-XX ở cuối file

---

## 7. Câu hỏi thường gặp

**Q: Agent có thể tự chạy test case và điền Actual Output không?**  
A: Không. Đây là kiểm thử hộp đen — bạn phải tự chạy test trên hệ thống thực và điền kết quả.

**Q: Tôi muốn Agent viết thêm TC integration/security không có trong EP/BVA?**  
A: Được — Agent sẽ thêm các TC bổ sung (như Race Condition, Bypass API) vào cuối bảng EP nếu đặc tả gợi ý yêu cầu bảo mật.

**Q: Nếu tính năng không có biến số (không áp dụng BVA)?**  
A: Agent sẽ ghi chú rõ lý do và bỏ qua phần BVA hoặc giữ bảng trống có chú thích.

**Q: Cột Actual Output có được điền khi thiết kế không?**  
A: **Không bao giờ.** Đây là quy tắc cứng. Actual Output chỉ có sau khi chạy test thực tế trên SUT.

**Q: Skill có tự tạo GitHub Issues không?**  
A: Không. Skill chỉ để lại placeholder link trong Bug_Report.md. Bạn tự tạo Issue trên GitHub và điền link vào.
