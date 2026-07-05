# Kế Hoạch Thực Hiện HW02 Domain Testing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Mục tiêu:** Lập kế hoạch từng bước để hoàn thành HW02 Domain Testing cho EShop SUT với 4 feature, mỗi pool 1 feature.

**Kiến trúc:** Đây là kế hoạch tài liệu và kiểm thử, không phải kế hoạch sửa code SUT. Việc thực hiện sẽ gồm đọc requirement, thiết kế Domain Testing, Boundary Value Analysis, chạy test API/UI/mobile, ghi bug evidence, lập AI audit, và đóng gói báo cáo.

**Tech Stack:** Markdown reports, Node.js/Express backend API, React web frontend, React admin frontend, React Native/Expo mobile app, SQLite, cURL/Postman/manual UI testing.

---

## Nguyên Tắc Thực Hiện

- [ ] Không commit trong giai đoạn lập kế hoạch và chuẩn bị nếu chưa được cho phép.
- [ ] Không sửa source code của `eshop-sut`; chỉ dùng SUT để đọc đặc tả, chạy app, và lấy bằng chứng bug.
- [ ] Mỗi bug phải có bằng chứng: screenshot UI hoặc API response/test result.
- [ ] Không tạo GitHub Issue giả; nếu chưa tạo issue thì ghi rõ `Pending`.
- [ ] Nếu test chưa chạy, phải đánh dấu `Not executed`, không được tính là pass/fail.
- [ ] Pool D phải là mobile feature và không trùng `FR-01`, `FR-06`, `FR-07`.

## Feature Selection

| Pool | Feature | Lý do chọn |
| --- | --- | --- |
| Pool A | `FR-01 Account registration` | Có nhiều domain đầu vào rõ ràng: name, email, password, confirm password. |
| Pool B | `FR-07 Shopping cart` | Có nhiều boundary liên quan quantity, duplicate product, empty cart. |
| Pool C | `FR-18 Admin order management` | Có state machine và access control để thiết kế domain/state tests. |
| Pool D | `FR-20 Mobile App - Checkout, Order History, Cancel Order` | Thuộc mobile app, né mobile registration/product detail/cart để không trùng `FR-01`, `FR-06`, `FR-07`. |

## Deliverables Cần Tạo

- [ ] `report/HW02_DomainTesting.md`: báo cáo Domain Testing và Boundary Value Analysis cho 4 feature.
- [ ] `report/bug_report.md`: danh sách bug, steps, expected, actual, severity, issue link, evidence path.
- [ ] `report/ai_audit_report.md`: log AI tool, prompt, output, human review.
- [ ] `report/ai_critique.md`: critique 200-300 words.
- [ ] `README.md`: self-assessment table, test summary, bug count, video links.
- [ ] `artifacts/screenshots/`: ảnh bug UI/mobile/admin.
- [ ] `artifacts/test-results/`: API responses, command output, manual execution notes.
- [ ] `git-log.txt`: ghi `Not committed yet` nếu chưa được phép commit.

## Task 1: Đọc Và Khóa Phạm Vi

**Files cần đọc:**
- `requirements/2026.HW02.Domain Testing_En.md`
- `requirements/my-pool.md`
- `eshop-sut/README.md`
- `eshop-sut/api_specification.md`
- `eshop-sut/setup_guide.md`
- `eshop-sut/backend/server.js`
- `eshop-sut/frontend-mobile/App.js`

- [ ] Đọc đề bài HW02 để xác nhận yêu cầu bắt buộc: 4 feature, Domain Testing, Boundary Value Analysis, AI audit, AI critique, bug report, screenshots, git log, README.
- [ ] Đọc `requirements/my-pool.md` để ghi nhận Pool A/B/C đã chọn: `FR-01`, `FR-07`, `FR-18`.
- [ ] Đọc `eshop-sut/frontend-mobile/App.js` để xác định Pool D có các flow mobile: checkout, order history, cancel order.
- [ ] Cập nhật phạm vi Pool D thành `FR-20 Mobile App - Checkout, Order History, Cancel Order`.
- [ ] Ghi assumption: Pool D không test mobile registration, mobile product detail, mobile cart vì cần né `FR-01`, `FR-06`, `FR-07`.

## Task 2: Chuẩn Bị Môi Trường Kiểm Thử

**Files cần đọc:**
- `eshop-sut/setup_guide.md`
- `eshop-sut/backend/package.json`
- `eshop-sut/frontend-web/package.json`
- `eshop-sut/frontend-admin/package.json`
- `eshop-sut/frontend-mobile/package.json`

- [ ] Cài dependencies cho backend nếu chưa có.
- [ ] Chạy backend tại `http://localhost:3000`.
- [ ] Chạy frontend web tại `http://localhost:5173`.
- [ ] Chạy frontend admin tại `http://localhost:5174`.
- [ ] Chạy mobile app bằng Expo nếu cần lấy bằng chứng Pool D.
- [ ] Ghi lại account mặc định:
  - Admin: `admin@eshop.com` / `Admin123!`
  - User: `test@eshop.com` / `Test1234!`
- [ ] Ghi lại môi trường test vào `artifacts/test-results/environment.md`.

## Task 3: FR-01 Account Registration - Domain Testing

**Scope:**
- API: `POST /api/register`
- Web UI: `frontend-web/src/pages/Register.jsx`

**Input domains:**
- `name`
- `email`
- `password`
- `confirmPassword`

- [ ] Lập bảng domain cho `name`:
  - Valid: non-empty human name.
  - Invalid: missing, empty string, whitespace-only.
- [ ] Lập bảng domain cho `email`:
  - Valid: `user@domain.com`.
  - Invalid: missing, empty, no `@`, no domain, duplicate email.
- [ ] Lập bảng domain cho `password`:
  - Valid: at least 8 chars, uppercase, lowercase, digit, special char.
  - Invalid: length < 8, no uppercase, no lowercase, no digit, no special char.
- [ ] Lập bảng domain cho `confirmPassword`:
  - Valid: matches password.
  - Invalid: missing or different from password.
- [ ] Tạo test cases domain:
  - `FR01-DT-001`: valid registration.
  - `FR01-DT-002`: missing name.
  - `FR01-DT-003`: invalid email format.
  - `FR01-DT-004`: duplicate email.
  - `FR01-DT-005`: weak password.
  - `FR01-DT-006`: confirm password mismatch.
- [ ] Ghi expected result theo requirement, không theo behavior hiện tại của SUT.

## Task 4: FR-01 Account Registration - Boundary Value Analysis

- [ ] Xác định boundary password length: minimum valid length là `8`.
- [ ] Tạo BVA cases:
  - `FR01-BVA-001`: password length `7`, expected reject.
  - `FR01-BVA-002`: password length `8`, expected accept nếu đủ các nhóm ký tự.
  - `FR01-BVA-003`: password length `9`, expected accept nếu đủ các nhóm ký tự.
- [ ] Tạo BVA email cases:
  - `FR01-BVA-004`: empty email, expected reject.
  - `FR01-BVA-005`: minimal valid email dạng `a@b.co`, expected accept nếu chưa trùng.
  - `FR01-BVA-006`: whitespace-only email, expected reject.
- [ ] Tạo BVA name cases:
  - `FR01-BVA-007`: empty name, expected reject.
  - `FR01-BVA-008`: one-character name, expected accept nếu requirement không quy định min length.
  - `FR01-BVA-009`: whitespace-only name, expected reject.

## Task 5: FR-07 Shopping Cart - Domain Testing

**Scope:**
- Web cart context: `frontend-web/src/context/CartContext.jsx`
- Web cart page: `frontend-web/src/pages/Cart.jsx`
- API: `GET /api/cart`, `POST /api/cart`

**Input domains:**
- Product id.
- Product name.
- Price.
- Quantity.
- Authenticated/unauthenticated user.

- [ ] Lập bảng domain cho product id:
  - Valid existing id.
  - Non-existing id.
  - Missing id.
- [ ] Lập bảng domain cho quantity:
  - Valid positive integer.
  - Invalid zero.
  - Invalid negative.
  - Invalid decimal.
  - Invalid non-numeric.
  - Very large value.
- [ ] Lập bảng domain cho duplicate product:
  - Same product added once.
  - Same product added twice.
  - Different products added.
- [ ] Tạo test cases domain:
  - `FR07-DT-001`: add one product quantity 1.
  - `FR07-DT-002`: add same product twice, expected quantity increases and no duplicate row.
  - `FR07-DT-003`: add quantity 0, expected reject.
  - `FR07-DT-004`: add negative quantity, expected reject.
  - `FR07-DT-005`: add non-numeric quantity, expected reject.
  - `FR07-DT-006`: remove item, expected confirmation dialog before removal.
  - `FR07-DT-007`: empty cart display, expected illustration and clear message.

## Task 6: FR-07 Shopping Cart - Boundary Value Analysis

- [ ] Xác định boundary quantity: minimum valid quantity là `1`.
- [ ] Tạo BVA cases:
  - `FR07-BVA-001`: quantity `0`, expected reject.
  - `FR07-BVA-002`: quantity `1`, expected accept.
  - `FR07-BVA-003`: quantity `2`, expected accept.
  - `FR07-BVA-004`: quantity `-1`, expected reject.
  - `FR07-BVA-005`: quantity very large, expected reject hoặc clamp nếu requirement có quy định stock.
- [ ] Xác định boundary cart state:
  - Empty cart.
  - One item.
  - Multiple items.
- [ ] Kiểm tra label tổng tiền:
  - Expected label: `Tổng cộng`.
  - Nếu UI hiện `Tổng tạm tính`, ghi bug.

## Task 7: FR-18 Admin Order Management - Domain And State Testing

**Scope:**
- API: `GET /api/admin/orders`
- API: `PUT /api/admin/orders/:id/status`
- Admin UI: `frontend-admin/src/App.jsx`

**Input/state domains:**
- Token role: no token, user token, admin token.
- Order id: existing, non-existing, invalid format.
- Current status: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`.
- Target status: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`, invalid string.

- [ ] Lập bảng transition hợp lệ:
  - `pending -> confirmed`
  - `pending -> canceled`
  - `confirmed -> shipping`
  - `confirmed -> canceled`
  - `shipping -> delivered`
- [ ] Lập bảng transition không hợp lệ:
  - `pending -> delivered`
  - `confirmed -> delivered`
  - `shipping -> canceled` nếu user thao tác hủy.
  - `delivered -> shipping`
  - `delivered -> canceled`
  - `canceled -> delivered`
  - Any state -> invalid status string.
- [ ] Tạo access control cases:
  - `FR18-DT-001`: no token calls admin orders, expected reject.
  - `FR18-DT-002`: normal user token calls admin orders, expected reject.
  - `FR18-DT-003`: admin token calls admin orders, expected accept.
  - `FR18-DT-004`: normal user token updates admin order status, expected reject.
- [ ] Tạo state test cases:
  - `FR18-ST-001`: `pending -> confirmed`, expected accept.
  - `FR18-ST-002`: `pending -> canceled`, expected accept.
  - `FR18-ST-003`: `confirmed -> shipping`, expected accept.
  - `FR18-ST-004`: `shipping -> delivered`, expected accept.
  - `FR18-ST-005`: `canceled -> delivered`, expected reject.
  - `FR18-ST-006`: `delivered -> shipping`, expected reject.

## Task 8: FR-18 Admin Order Management - Boundary Value Analysis

- [ ] Xác định boundary order id:
  - Missing id.
  - Non-numeric id.
  - Existing smallest id.
  - Non-existing very large id.
- [ ] Tạo BVA cases:
  - `FR18-BVA-001`: order id missing, expected route reject/not found.
  - `FR18-BVA-002`: order id `0`, expected not found/reject.
  - `FR18-BVA-003`: order id `1` nếu tồn tại, expected process theo status.
  - `FR18-BVA-004`: order id very large, expected not found.
- [ ] Xác định boundary final states:
  - `delivered` là final state.
  - `canceled` là final state.
- [ ] Tạo final-state tests:
  - `FR18-BVA-005`: delivered order update to any other status, expected reject.
  - `FR18-BVA-006`: canceled order update to any other status, expected reject.

## Task 9: FR-20 Mobile Checkout, Order History, Cancel Order - Domain Testing

**Scope:**
- Mobile app: `eshop-sut/frontend-mobile/App.js`
- API: `POST /api/checkout`
- API: `GET /api/orders/my-orders`
- API: `PUT /api/orders/:id/cancel`

**Không test trong Pool D:**
- Mobile registration, vì trùng `FR-01`.
- Mobile product detail, vì trùng `FR-06`.
- Mobile cart behavior, vì trùng `FR-07`.

**Input domains:**
- Login state.
- Cart state.
- Shipping address.
- Total amount.
- Order status for cancel.

- [ ] Lập bảng domain login state:
  - Logged in.
  - Not logged in.
  - Expired/invalid token.
- [ ] Lập bảng domain cart state:
  - Empty cart.
  - One item.
  - Multiple items.
- [ ] Lập bảng domain shipping address:
  - Valid address.
  - Empty string.
  - Whitespace-only.
  - Very long address.
  - Address containing HTML tags.
- [ ] Lập bảng domain cancel order status:
  - `pending`, expected cancel allowed.
  - `confirmed`, expected cancel allowed.
  - `shipping`, expected user cancel rejected.
  - `delivered`, expected cancel rejected.
  - `canceled`, expected cancel rejected.
- [ ] Tạo mobile test cases:
  - `FR20-DT-001`: unauthenticated user opens checkout, expected redirected/blocked.
  - `FR20-DT-002`: authenticated user checkout with valid address and non-empty cart, expected order created.
  - `FR20-DT-003`: authenticated user checkout with empty cart, expected reject.
  - `FR20-DT-004`: checkout with empty shipping address, expected reject.
  - `FR20-DT-005`: order history shows only current user's orders.
  - `FR20-DT-006`: cancel pending order, expected success.
  - `FR20-DT-007`: cancel shipping order as user, expected reject.

## Task 10: FR-20 Mobile - Boundary Value Analysis

- [ ] Xác định boundary cart total:
  - `0`, expected reject checkout.
  - Minimum positive total from one valid product, expected accept.
  - Very large total, expected backend recalculates or validates.
- [ ] Xác định boundary shipping address:
  - Length `0`, expected reject.
  - Length `1`, expected accept nếu requirement không có min length.
  - Whitespace-only, expected reject.
  - Very long string, expected reject hoặc safe display.
- [ ] Xác định boundary order status:
  - Before final state: `pending`, `confirmed`.
  - Transition cutoff: `shipping`.
  - Final states: `delivered`, `canceled`.
- [ ] Tạo BVA cases:
  - `FR20-BVA-001`: total amount `0`, expected reject.
  - `FR20-BVA-002`: total amount minimum positive, expected accept.
  - `FR20-BVA-003`: empty shipping address, expected reject.
  - `FR20-BVA-004`: one-character shipping address, expected accept if no stricter rule.
  - `FR20-BVA-005`: cancel `confirmed` order, expected accept.
  - `FR20-BVA-006`: cancel `shipping` order, expected reject.

## Task 11: Thực Thi Test Và Thu Thập Evidence

- [ ] Tạo test data riêng cho mỗi feature để tránh bị ảnh hưởng bởi database reset.
- [ ] Chạy API tests bằng cURL/Postman/Node script.
- [ ] Chạy UI/manual tests trên web register, web cart, admin orders.
- [ ] Chạy mobile/manual tests trên Expo cho Pool D nếu môi trường hỗ trợ.
- [ ] Lưu response API vào `artifacts/test-results/api-evidence.md`.
- [ ] Lưu manual notes vào `artifacts/test-results/manual-evidence.md`.
- [ ] Lưu screenshot bug vào `artifacts/screenshots/`.
- [ ] Mỗi evidence phải map về test case ID.

## Task 12: Viết Bug Report

**File output:** `report/bug_report.md`

- [ ] Lập bảng bug gồm các cột:
  - Bug ID.
  - Feature.
  - Related test case.
  - Severity.
  - Preconditions.
  - Steps to reproduce.
  - Expected result.
  - Actual result.
  - Evidence path.
  - GitHub Issue URL.
- [ ] Tạo GitHub Issue cho mỗi bug sau khi có screenshot/evidence.
- [ ] Nếu chưa tạo issue, ghi `Pending - issue not created yet`.
- [ ] Không đưa link giả vào report.

## Task 13: Viết Main Report

**File output:** `report/HW02_DomainTesting.md`

- [ ] Viết introduction: SUT, selected features, testing techniques.
- [ ] Viết section FR-01:
  - Scope.
  - Domain model.
  - Equivalence classes.
  - BVA table.
  - Test cases.
  - Execution result.
  - Bugs found.
- [ ] Viết section FR-07 theo cùng cấu trúc.
- [ ] Viết section FR-18 theo cùng cấu trúc, thêm state transition table.
- [ ] Viết section FR-20 theo cùng cấu trúc, ghi rõ đây là mobile feature và đã né `FR-01`, `FR-06`, `FR-07`.
- [ ] Viết AI gap analysis:
  - Test nào AI đề xuất thiếu.
  - Bug nào cần human review mới thấy.
  - Lý do AI miss.

## Task 14: Viết AI Audit Report

**File output:** `report/ai_audit_report.md`

- [ ] Ghi declaration: `I use AI tools for the following tasks`.
- [ ] Với mỗi lần dùng AI, ghi:
  - Tool name.
  - Date/time.
  - Prompt.
  - Output summary.
  - Human review/correction.
- [ ] Ghi rõ prompt nào dùng để chọn Pool D.
- [ ] Ghi rõ prompt nào dùng để sinh Domain Testing/BVA.
- [ ] Ghi rõ nơi nào human override AI.

## Task 15: Viết AI Critique

**File output:** `report/ai_critique.md`

- [ ] Viết 200-300 words.
- [ ] Nội dung phải trả lời:
  - AI sai/thiếu ở đâu.
  - Vì sao AI miss bug hoặc miss test case.
  - Bài học khi cộng tác với AI trong kiểm thử.
- [ ] Kiểm tra word count nằm trong khoảng 200-300.

## Task 16: Cập Nhật README Summary

**File output:** `README.md`

- [ ] Thêm self-assessment table theo template đề bài.
- [ ] Ghi selected features:
  - `FR-01`
  - `FR-07`
  - `FR-18`
  - `FR-20 Mobile Checkout, Order History, Cancel Order`
- [ ] Ghi test summary:
  - Number of features.
  - Number of test cases designed.
  - Number of test cases executed.
  - Number of passed tests.
  - Number of failed tests.
  - Number of not executed tests.
  - Number of bugs.
- [ ] Ghi demo video links nếu có.
- [ ] Ghi Agent Skill status:
  - Nếu có làm skill, thêm link/demo.
  - Nếu không làm, ghi rõ không thực hiện phần optional Agent Skill.

## Task 17: Xuất Git Log

**File output:** `git-log.txt`

- [ ] Nếu chưa được phép commit, ghi:

```text
Not committed yet
```

- [ ] Nếu sau này được phép commit, tạo commit theo từng bước/feature.
- [ ] Sau khi commit, xuất git log vào `git-log.txt`.

## Task 18: Đóng Gói Bài Nộp

- [ ] Kiểm tra các file bắt buộc tồn tại:
  - Main report Markdown.
  - Main report PDF.
  - Bug report.
  - Screenshots.
  - AI audit report Markdown/PDF.
  - AI critique Markdown/PDF.
  - README.
  - Git commit log.
- [ ] Đổi tên zip theo format:

```text
<StudentID>_HW02_AI_DomainTesting_<SelfAssessedGrade>.zip
```

- [ ] Kiểm tra lần cuối: không có file tạm, không có fake issue link, không claim test đã chạy nếu chưa có evidence.

## Self-Review Checklist

- [ ] Đã đủ 4 pool: A, B, C, D.
- [ ] Pool D là mobile feature.
- [ ] Pool D không trùng `FR-01`, `FR-06`, `FR-07`.
- [ ] Mỗi feature có Domain Testing.
- [ ] Mỗi feature có Boundary Value Analysis.
- [ ] FR-18 có state transition tests.
- [ ] Mỗi bug có expected/actual/evidence.
- [ ] AI audit có prompt và human review.
- [ ] AI critique đạt 200-300 words.
- [ ] README có self-assessment và test summary.
- [ ] Không commit nếu chưa được phép.

