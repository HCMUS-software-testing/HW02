# Kế hoạch Thực hiện Bài tập HW02 – Domain Testing & Boundary Value Analysis (BVA)

Chào bạn, các góp ý và chỉnh sửa của bạn thực sự cực kỳ sắc bén và đúng chuẩn "thực chiến". Tôi đã đánh giá và thấy chúng khớp 100% với rubric chấm điểm cũng như các best practices trong ngành QA. 

Dưới đây là bản Kế hoạch Hành động (Action Plan) đã được cập nhật hoàn chỉnh.

---

## 1. Thông tin Tổng quan & Lựa chọn của bạn
- **Phương pháp kiểm thử:** Domain Testing & Boundary Value Analysis (BVA).
- **Chiến lược cốt lõi:** AI-First (Sử dụng AI để sinh test case theo từng bước, không prompt chung chung) + Human Review (Con người kiểm tra và chốt kết quả).
- **Danh sách Features đã chọn:**
  - **Pool A:** FR-04 (Personal profile management)
  - **Pool B:** FR-08 (Checkout)
  - **Pool C:** FR-15 (Product management - CRUD)
  - **Pool D:** FR-06 (Mobile App - Product detail view)

---

## 2. Cấu trúc thư mục Workspace & Nộp bài
Để quản lý tốt mã nguồn, tài liệu và điểm số Git, bạn hãy khởi tạo một thư mục dự án cục bộ (Local Repository) và liên kết với GitHub. Cấu trúc gợi ý như sau:

```text
HW02_Workspace/
├── README.md                 (Chứa Self-assessment table, Test summary, Traceability Matrix & Test Coverage)
├── FR04_Profile/             (Báo cáo Test case, BVA, Bug cho FR-04)
├── FR08_Checkout/            (Báo cáo Test case, BVA, Bug cho FR-08)
├── FR15_Product_Admin/       (Báo cáo Test case, BVA, Bug cho FR-15)
├── FR06_Mobile_Product/      (Báo cáo Test case, BVA, Bug cho FR-06 Mobile)
├── Bugs_Screenshots/         (Lưu trữ hình ảnh bug cho GitHub Issues)
├── Agent_Skills/             (Chứa scripts/prompts templates + link YouTube demo)
├── AI_Reports/
│   ├── AI_Audit_Report.md    (Nhật ký prompt, output & Declaration)
│   └── AI_Critique.md        (Bài viết 200-300 chữ đánh giá AI)
└── git_commit_log.txt        (Sẽ xuất ra ở bước cuối)
```

> [!CAUTION]
> **Tuyệt đối không nén Source Code:** Không bao gồm source code của phần mềm EShop vào file zip cuối cùng để tránh file quá nặng và sai quy định (chỉ cho phép max 20MB). Chúng ta đang làm Blackbox Testing nên chỉ nộp các file báo cáo Markdown, hình ảnh, PDF và script.

> [!NOTE]
> **Git Workflow:** Không cần gộp (merge) code vào nhánh `main` của nhóm. Bạn chỉ cần thực hiện commit và làm việc hoàn toàn trên nhánh cá nhân của mình là đủ để có lịch sử nộp bài.

---

## 3. Lộ trình Thực hiện Chi tiết (Step-by-Step)

### Giai đoạn 1: Chuẩn bị Agent Skills (Lấy trọn 10 điểm Bonus)
- **Bước 1.1:** Viết Agent Skill cho **Domain Testing**.
- **Bước 1.2:** Viết Agent Skill cho **Boundary Value Analysis (BVA)**.
- **Bước 1.3:** Viết **Audit Extraction Prompt** để AI tự động trích xuất lịch sử chat (Công cụ, Ngày giờ, Prompt, Output) điền vào AI Audit Report.
- *Lưu tất cả vào thư mục `Agent_Skills/`.*

### Giai đoạn 2: Tiến hành Kiểm thử (Lặp lại cho từng Feature)
Với mỗi feature, thực hiện chia nhỏ Commit Git để chứng minh tiến độ làm việc liên tục:

- **Bước 2.1: Giải thích chi tiết 4 bước (Step-by-step Explanation) & Sinh Test Case**
  Trong báo cáo của mỗi Feature, bạn **phải viết rõ** cách bạn áp dụng lý thuyết vào thực tế qua 4 bước trước khi đưa ra bảng Test Case:
  1. Xác định Input/Output variables.
  2. Xác định các Phân vùng tương đương (Equivalence Classes) và giải thích tại sao chọn Valid/Invalid.
  3. Chọn giá trị đại diện (Selecting test cases) thông qua ma trận tổ hợp.
  4. Phân tích giá trị biên (Boundary Value Analysis).
  *👉 Git Commit: "Analyze input variables and define equivalence classes for [Feature]"*
  *👉 Git Commit: "Create combination matrix and select boundary values for [Feature]"*

- **Bước 2.2: Human Review (Con người kiểm duyệt) & Sinh Test Case chi tiết**
  Sử dụng AI để sinh chi tiết các Test Cases. Chốt danh sách cuối cùng. Ghi nhận lại điểm mù của AI.
  *👉 Git Commit: "Review and finalize detailed test cases for [Feature]"*

- **Bước 2.3: Thực thi Test (Execution) & Log Bug**
  Chạy SUT EShop trên máy, test, chụp màn hình. Viết Bug Report trên file Markdown, sau đó **post lên GitHub Issues**.
  *👉 Git Commit: "Execute tests and log bugs on GitHub for [Feature]"*

- **Bước 2.4: Viết AI Gap Analysis**
  Phân tích xem AI đã bỏ sót test case/bug nào và tại sao.
  *👉 Git Commit: "Add AI Gap Analysis for [Feature]"*

### Giai đoạn 3: Quay Video Demo Agent Skills
- Dùng ứng dụng quay màn hình demo cách áp dụng Agent Skills.
- **Lưu ý:** Bạn có thể lồng tiếng trực tiếp (voiceover) hoặc chèn text giải thích (subtitles) trên video đều hợp lệ, tùy cách nào nhanh nhất.
- Upload YouTube (Unlisted) và dán link vào báo cáo.
- *👉 Git Commit: "Add Agent Skills demo video link"*

### Giai đoạn 4: Viết Báo cáo Tổng hợp (AI Audit & Critique)
- **Bước 4.1: AI Audit Report & Lời Tuyên Bố**
  - Mở đầu file `AI_Audit_Report.md` bắt buộc phải có câu: *"I use AI tools for the following tasks..."* kèm danh sách task.
  - Sử dụng Agent Skill "Audit Extraction" để lấy format nhanh chóng.
- **Bước 4.2: AI Critique (Rất quan trọng - 200~300 chữ)**
  - Đánh giá AI: Sai ở đâu? Tại sao? Học được gì?
- *👉 Git Commit: "Complete AI Audit (with Declaration) and Critique reports"*

### Giai đoạn 5: Hoàn thiện README & Lấy Log Git
- **Bước 5.1: File README.md chính (Mở rộng Test Summary)**
  - Thêm bảng Test Summary Report (Tổng feature, test case, Pass/Fail/Not Executed, Bug).
  - Bổ sung **Requirements Traceability Matrix** và **Test Coverage** để báo cáo nổi bật, chuẩn mực hơn.
  - Điền bảng Self-Assessment Template (Điểm tự đánh giá).
- **Bước 5.2: Xuất lịch sử Git** (`git log --oneline > git_commit_log.txt`)
- **Bước 5.3: Xuất PDF** (Xuất bản sao PDF cho các file Markdown).
- *👉 Git Commit: "Finalize README with expanded metrics, export Git log and PDF"*

### Giai đoạn 6: Đóng gói (.zip) và Nộp bài (Moodle)
- Đặt tên file chính xác theo định dạng khóa sinh viên và điểm số tự đánh giá.
- **Ví dụ:** `23127205_HW02_AI_DomainTesting_100.zip`
- Chỉ nén các file báo cáo, PDF, thư mục script/hình ảnh. (Nhắc lại: **Không nén source code EShop**).
- Nộp lên Moodle.
