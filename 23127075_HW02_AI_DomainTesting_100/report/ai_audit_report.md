# AI Audit Report

> Placeholder only. Log every meaningful AI-assisted step.

## Student Information

- Student name: `Lê Trung Kiên`
- Student ID: `23127075`

## Prompt and Output Log

### Entry 001
- Time: `2026-07-05 22:41 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Add a skill and a rule so each user prompt session appends an entry to the HW02 AI audit report; leave human review and final use fields manual.
- Output Summary: Created repo-local ai-audit-entry skill, added append script, updated AGENTS.md rule, and left manual audit fields as placeholders.
- Human Review/Corrections: Skill được tạo trong root của repo nên sinh viên đưa vào `./.agents`.

### Entry 002
- Time: `2026-07-05 22:58 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Đưa nội dung references/04_Domain Testing.pdf thành markdown
- Output Summary: Created references/04_Domain Testing.md from the PDF content with headings, bullets, and Markdown tables for examples and test cases.
- Human Review/Corrections: AI chuyển file pdf sang markdown đảm bảo được nội dung.
- Final Use in Submission: File markdown không dùng để nộp nhưng sẽ được dùng để build skill domain testing.

### Entry 003
- Time: `2026-07-05 23:02 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật skill ai audit .agents/skills/ai-audit-entry để luôn đánh số lại phù hợp mỗi khi thêm entry vì user có thể xóa các entry thừa.
- Output Summary: Updated the ai-audit-entry script to renumber existing Entry headings before appending, updated SKILL.md with the behavior and correct script path, and validated the skill.
- Human Review/Corrections: Skill đánh số các entry trong AI audit report đúng thứ tự.

### Entry 004
- Time: `2026-07-05 23:18 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: User asked to change registration Part A IDs in references/23127075.md from E prefix to EC prefix.
- Output Summary: Updated the Part A test data table so registration equivalent class references use EC01-EC23 consistently with the EP domain table.
- Human Review/Corrections: Output đúng theo yêu cầu
- Final Use in Submission: Không dùng trong bài nộp, chỉ để AI đọc.

### Entry 005
- Time: `2026-07-05 23:31 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Fix the skill ai-audit to give the Ouput of a Entry is the full output of AI (only summarize if too long or not in a single paragraph). The output might be the content of a file, a code,... or any artifact created by AI.
- Output: Updated the AI audit skill so Output means the full AI-generated output or artifact when it is short and contiguous, including final answer text, file content, code, Markdown, command text, or other created artifacts. The script now formats multi-line prompt/output values in fenced blocks and the skill validated successfully. No commit was made.
- Human Review/Corrections: Skill đã giúp AI in output cho từng entry trong AI Audit report đúng theo ý muốn của sinh viên.

### Entry 006
- Time: `2026-07-05 23:50 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) references/04_Domain Testing.md provide the knowledge about Domain Testing, meanwhile, references/23127075.md provide the example of exercises for Domain Testing to let you know how to do domain testing step by step. Based on two mentioned files, create the skills for domain testing including Equivalence partitioning (EP) and Boundary Value Analysis (BVA) for a single given function. Ensure that this skill (or skilss) is reusable and meets the requirements in requirements/2026.HW02.Domain Testing_En.md section 7. Agent Skill
- Output: Created .agents/skills/applying-domain-testing/SKILL.md and .agents/skills/applying-domain-testing/agents/openai.yaml. The skill provides a reusable workflow and Markdown output templates for applying Domain Testing, Equivalence Partitioning, and Boundary Value Analysis to a single function/API/form/feature. Validated the skill with quick_validate.py; result: Skill is valid. No commit was made.
- Human Review/Corrections: Skill thực hiện khá tốt domain testing cho FR-01: Registration.
- Final Use in Submission: Chỉ dùng để test skill và giữ làm bản dự bị, chưa phải bản cuối.

### Entry 007
- Time: `2026-07-06 20:24 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) Cập nhật các skill để output đầu ra là tiếng Việt, đảm bảo có dấu, không bị lỗi kí tự. Tuy nhiên, trong ai audit thì với từng entry, prompt và output giữ nguyên ngôn ngữ không cần dịch để tôn trọng tính nguyên bản.
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md để yêu cầu artifact Domain Testing bằng tiếng Việt có dấu, UTF-8, giữ nguyên định danh kỹ thuật và Việt hóa mẫu output. Đã cập nhật .agents/skills/ai-audit-entry/SKILL.md để metadata mới dùng tiếng Việt có dấu nhưng Prompt/Output của từng entry được giữ nguyên ngôn ngữ và nguyên văn. Đã thêm regression test Unicode vào .agents/skills/ai-audit-entry/scripts/test_append_ai_audit_entry.py và xác minh bằng test/compile.
- Human Review/Corrections: Output của các skill bây giờ là tiếng Việt đúng yêu cầu bài tập.

### Entry 008
- Time: `2026-07-06 20:33 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project. The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng dưới kiểm thử

- Pool: `Pool A - Authentication, Categories, and Products`
- Feature: `FR-01: Account registration`
- SUT: `eshop-sut`
- Giao diện tham chiếu: màn hình `Register` của customer web app và mobile app.
- API tham chiếu: `POST /api/register`
- Phạm vi kiểm thử: thiết kế ca kiểm thử miền dữ liệu cho đăng ký tài khoản người dùng với các trường `name`, `email`, `password`, kết quả thành công/lỗi, và trạng thái tài khoản mới.
- Trạng thái thực thi: các ca dưới đây là ca thiết kế, chưa thực thi. Khi chạy thật, ghi actual result, status, và evidence path theo hướng dẫn bài tập.

## 2. Cơ sở và giả định

Tài liệu `requirements/2026.HW02.Domain Testing_En.md` chỉ nêu feature ở mức `FR-01: Account registration`, không mô tả chi tiết độ dài, định dạng, hoặc thông điệp lỗi. Vì vậy artifact này dùng yêu cầu tổng quát của chức năng đăng ký làm oracle chính và đánh dấu các điểm chưa rõ là giả định cần rà soát thủ công.

Giả định nghiệp vụ cần xác nhận:

- `name`, `email`, `password` là bắt buộc vì form đăng ký yêu cầu cả ba trường.
- `email` phải có định dạng email hợp lệ và nên là duy nhất trong hệ thống để tránh nhiều tài khoản dùng cùng một email.
- `password` phải dài tối thiểu 8 ký tự, có ít nhất một chữ thường, một chữ hoa, một chữ số, và một ký tự đặc biệt. Đây là diễn giải theo thông điệp UI: `Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT.`
- Không có ràng buộc chính thức về độ dài tối đa của `name`, `email`, `password`; các ca độ dài tối đa được ghi là rủi ro/gợi ý cần review, không coi là yêu cầu bắt buộc.
- Tài khoản đăng ký thành công có role mặc định là `user`, có thể đăng nhập bằng `email` và `password` vừa tạo.

## A. Phân hoạch tương đương

### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký, nhập từ form đăng ký và gửi trong body của `POST /api/register`. |
| Đầu vào | `email` | Email dùng làm định danh đăng nhập, nhập từ form đăng ký và gửi trong body của `POST /api/register`. |
| Đầu vào | `password` | Mật khẩu người dùng, nhập từ form đăng ký và gửi trong body của `POST /api/register`. |
| Đầu ra | HTTP status/body | Kết quả API đăng ký: thành công trả về thông báo và `id`; lỗi trả về thông tin lỗi quan sát được. |
| Đầu ra | UI feedback/navigation | Web app chuyển đến `/login` khi thành công; mobile app hiển thị thông báo thành công và quay về login; khi lỗi hiển thị thông báo lỗi. |
| Đầu ra | Trạng thái dữ liệu user | Tài khoản mới được tạo với `email`, `name`, `password` đã nhập và role mặc định `user`; dữ liệu không hợp lệ không được tạo user mới. |

### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` là bắt buộc, không được bỏ trống. |
| C2 | `name` | `name` không nên chỉ gồm khoảng trắng. |
| C3 | `name` | `name` có thể chứa chữ cái tiếng Việt có dấu và khoảng trắng giữa các từ. |
| C4 | `email` | `email` là bắt buộc, không được bỏ trống. |
| C5 | `email` | `email` phải đúng định dạng email hợp lệ. |
| C6 | `email` | `email` nên là duy nhất trong hệ thống. Đây là giả định nghiệp vụ cần xác nhận vì yêu cầu không nêu rõ. |
| C7 | `password` | `password` là bắt buộc, không được bỏ trống. |
| C8 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C9 | `password` | `password` có ít nhất một chữ thường. |
| C10 | `password` | `password` có ít nhất một chữ hoa. |
| C11 | `password` | `password` có ít nhất một chữ số. |
| C12 | `password` | `password` có ít nhất một ký tự đặc biệt. |
| C13 | HTTP status/body | Dữ liệu hợp lệ tạo tài khoản mới và trả kết quả thành công quan sát được. |
| C14 | HTTP status/body | Dữ liệu không hợp lệ bị từ chối, không tạo tài khoản mới, và trả thông báo lỗi quan sát được. |
| C15 | UI feedback/navigation | Thành công đưa người dùng về màn hình đăng nhập; thất bại giữ ở màn hình đăng ký và hiển thị lỗi. |

### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | Họ tên có chữ cái tiếng Việt và khoảng trắng hợp lệ. | Có | `Nguyễn Văn An` | Chấp nhận `name`. |
| EC02 | `name` | `name` rỗng hoặc không gửi trường `name`. | Không | `` | Từ chối đăng ký, hiển thị lỗi bắt buộc, không tạo user. |
| EC03 | `name` | `name` chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký, không tạo user có tên rỗng về mặt nghiệp vụ. |
| EC04 | `email` | Email hợp lệ, chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận `email`. |
| EC05 | `email` | `email` rỗng hoặc không gửi trường `email`. | Không | `` | Từ chối đăng ký, hiển thị lỗi bắt buộc, không tạo user. |
| EC06 | `email` | Email thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký, thông báo định dạng email không hợp lệ. |
| EC07 | `email` | Email thiếu domain. | Không | `fr01@` | Từ chối đăng ký, thông báo định dạng email không hợp lệ. |
| EC08 | `email` | Email thiếu local-part. | Không | `@example.com` | Từ chối đăng ký, thông báo định dạng email không hợp lệ. |
| EC09 | `email` | Email có khoảng trắng trong chuỗi. | Không | `fr01 user@example.com` | Từ chối đăng ký, thông báo định dạng email không hợp lệ. |
| EC10 | `email` | Email đã tồn tại trong hệ thống. | Không | `existing.user@example.com` | Từ chối đăng ký trùng email, không tạo user thứ hai cùng email. |
| EC11 | `password` | Mật khẩu mạnh đủ 8+ ký tự, có chữ thường, chữ hoa, số, ký tự đặc biệt. | Có | `Aa123456!` | Chấp nhận `password`. |
| EC12 | `password` | `password` rỗng hoặc không gửi trường `password`. | Không | `` | Từ chối đăng ký, hiển thị lỗi bắt buộc hoặc mật khẩu yếu, không tạo user. |
| EC13 | `password` | Mật khẩu ngắn hơn 8 ký tự. | Không | `Aa12!bc` | Từ chối đăng ký với lỗi mật khẩu yếu. |
| EC14 | `password` | Mật khẩu thiếu chữ thường. | Không | `AA123456!` | Từ chối đăng ký với lỗi mật khẩu yếu. |
| EC15 | `password` | Mật khẩu thiếu chữ hoa. | Không | `aa123456!` | Từ chối đăng ký với lỗi mật khẩu yếu. |
| EC16 | `password` | Mật khẩu thiếu chữ số. | Không | `Aaaaaaaa!` | Từ chối đăng ký với lỗi mật khẩu yếu. |
| EC17 | `password` | Mật khẩu thiếu ký tự đặc biệt. | Không | `Aa123456` | Từ chối đăng ký với lỗi mật khẩu yếu. |
| EC18 | `password` | Mật khẩu có khoảng trắng nhưng không có ký tự đặc biệt khác. | Không | `Aa123456 ` | Theo yêu cầu UI, khoảng trắng không nên được tính là ký tự đặc biệt; từ chối đăng ký. |
| EC19 | HTTP status/body | Đăng ký thành công với toàn bộ input hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa123456!` | API trả thành công, có `id`; UI chuyển/hiển thị thành công; user mới tồn tại. |
| EC20 | HTTP status/body | Đăng ký thất bại vì một input không hợp lệ. | Không | `email=fr01.example.com` | API/UI trả lỗi quan sát được; không tạo user mới. |
| EC21 | Trạng thái dữ liệu user | User mới có role mặc định `user`. | Có | User vừa đăng ký | Có thể đăng nhập như customer, không có quyền admin. |

### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa123456!` | EC01, EC04, EC11, EC19, EC21 | Tạo user mới, trả thành công có `id`, UI chuyển/hiển thị thành công, user có role `user`. |
| EP-FR01-002 | Từ chối khi thiếu `name`. | `name=`; `email=fr01.noname@example.com`; `password=Aa123456!` | EC02, EC04, EC11, EC20 | Không tạo user; hiển thị lỗi bắt buộc cho `name` hoặc lỗi đăng ký thất bại quan sát được. |
| EP-FR01-003 | Từ chối khi `name` chỉ có khoảng trắng. | `name=   `; `email=fr01.blankname@example.com`; `password=Aa123456!` | EC03, EC04, EC11, EC20 | Không tạo user có tên rỗng về mặt nghiệp vụ; hiển thị lỗi hợp lệ. |
| EP-FR01-004 | Từ chối khi thiếu `email`. | `name=Nguyễn Văn An`; `email=`; `password=Aa123456!` | EC01, EC05, EC11, EC20 | Không tạo user; hiển thị lỗi bắt buộc cho `email` hoặc lỗi đăng ký thất bại quan sát được. |
| EP-FR01-005 | Từ chối email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa123456!` | EC01, EC06, EC11, EC20 | Không tạo user; hiển thị lỗi định dạng email không hợp lệ. |
| EP-FR01-006 | Từ chối email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa123456!` | EC01, EC07, EC11, EC20 | Không tạo user; hiển thị lỗi định dạng email không hợp lệ. |
| EP-FR01-007 | Từ chối email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa123456!` | EC01, EC08, EC11, EC20 | Không tạo user; hiển thị lỗi định dạng email không hợp lệ. |
| EP-FR01-008 | Từ chối email có khoảng trắng. | `name=Nguyễn Văn An`; `email=fr01 user@example.com`; `password=Aa123456!` | EC01, EC09, EC11, EC20 | Không tạo user; hiển thị lỗi định dạng email không hợp lệ. |
| EP-FR01-009 | Từ chối email đã tồn tại. | Tiền điều kiện: đã có `existing.user@example.com`; đăng ký `name=Nguyễn Văn An`; `email=existing.user@example.com`; `password=Aa123456!` | EC01, EC10, EC11, EC20 | Không tạo user thứ hai cùng email; hiển thị lỗi email đã tồn tại hoặc lỗi tương đương. |
| EP-FR01-010 | Từ chối khi thiếu `password`. | `name=Nguyễn Văn An`; `email=fr01.nopassword@example.com`; `password=` | EC01, EC04, EC12, EC20 | Không tạo user; hiển thị lỗi bắt buộc hoặc lỗi mật khẩu yếu. |
| EP-FR01-011 | Từ chối mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.shortpass@example.com`; `password=Aa12!bc` | EC01, EC04, EC13, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu. |
| EP-FR01-012 | Từ chối mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.nolower@example.com`; `password=AA123456!` | EC01, EC04, EC14, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu. |
| EP-FR01-013 | Từ chối mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.noupper@example.com`; `password=aa123456!` | EC01, EC04, EC15, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.nodigit@example.com`; `password=Aaaaaaaa!` | EC01, EC04, EC16, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối mật khẩu thiếu ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.nospecial@example.com`; `password=Aa123456` | EC01, EC04, EC17, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối mật khẩu dùng khoảng trắng thay cho ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.spacepass@example.com`; `password=Aa123456 ` | EC01, EC04, EC18, EC20 | Không tạo user; hiển thị lỗi mật khẩu yếu vì khoảng trắng không phải ký tự đặc biệt theo thông điệp UI. |

## B. Phân tích giá trị biên

### B1. Ứng viên biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `password` | Độ dài tối thiểu 8 ký tự. | 7 ký tự: `Aa12!bc`; 8 ký tự: `Aa12345!`; 9 ký tự: `Aa123456!` |
| `password` | Thiếu từng nhóm ký tự bắt buộc ngay tại độ dài tối thiểu. | 8 ký tự thiếu chữ thường: `AA12345!`; thiếu chữ hoa: `aa12345!`; thiếu số: `Aaaaaaa!`; thiếu ký tự đặc biệt: `Aa123456` |
| `name` | Bắt buộc, không có min/max chính thức ngoài không rỗng. | Rỗng: ``; chỉ khoảng trắng: `   `; một ký tự: `A`; tên tiếng Việt hợp lệ: `Á` |
| `email` | Bắt buộc và định dạng có các thành phần local-part, `@`, domain. | Rỗng: ``; thiếu `@`: `fr01.example.com`; thiếu local-part: `@example.com`; thiếu domain: `fr01@`; hợp lệ ngắn: `a@b.co` |

Không áp dụng BVA cho role vì role không phải input của chức năng đăng ký người dùng. Không áp dụng BVA cho tập enum/điều hướng UI vì các miền này không có thứ tự số học.

### B2. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `password` | `min-1`, 7 ký tự | `name=Nguyễn Văn An`; `email=fr01.bv.pass7@example.com`; `password=Aa12!bc` | Từ chối đăng ký, hiển thị lỗi mật khẩu yếu, không tạo user. |
| BV-FR01-002 | `password` | `min`, 8 ký tự hợp lệ | `name=Nguyễn Văn An`; `email=fr01.bv.pass8@example.com`; `password=Aa12345!` | Chấp nhận đăng ký, tạo user mới. |
| BV-FR01-003 | `password` | `min+1`, 9 ký tự hợp lệ | `name=Nguyễn Văn An`; `email=fr01.bv.pass9@example.com`; `password=Aa123456!` | Chấp nhận đăng ký, tạo user mới. |
| BV-FR01-004 | `password` | 8 ký tự nhưng thiếu chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!` | Từ chối đăng ký, hiển thị lỗi mật khẩu yếu, không tạo user. |
| BV-FR01-005 | `password` | 8 ký tự nhưng thiếu chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!` | Từ chối đăng ký, hiển thị lỗi mật khẩu yếu, không tạo user. |
| BV-FR01-006 | `password` | 8 ký tự nhưng thiếu chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!` | Từ chối đăng ký, hiển thị lỗi mật khẩu yếu, không tạo user. |
| BV-FR01-007 | `password` | 8 ký tự nhưng thiếu ký tự đặc biệt | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456` | Từ chối đăng ký, hiển thị lỗi mật khẩu yếu, không tạo user. |
| BV-FR01-008 | `name` | Rỗng | `name=`; `email=fr01.bv.emptyname@example.com`; `password=Aa12345!` | Từ chối đăng ký, không tạo user. |
| BV-FR01-009 | `name` | Một ký tự hợp lệ | `name=Á`; `email=fr01.bv.onename@example.com`; `password=Aa12345!` | Chấp nhận nếu hệ thống không quy định độ dài tên tối thiểu lớn hơn 1; nếu bị từ chối cần cập nhật requirement. |
| BV-FR01-010 | `email` | Rỗng | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!` | Từ chối đăng ký, không tạo user. |
| BV-FR01-011 | `email` | Email hợp lệ ngắn | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!` | Chấp nhận nếu email chưa tồn tại. |

## 3. Ma trận traceability

| Điều kiện | Lớp tương đương | Ca kiểm thử |
| --- | --- | --- |
| C1 | EC01, EC02 | EP-FR01-001, EP-FR01-002, BV-FR01-008, BV-FR01-009 |
| C2 | EC03 | EP-FR01-003 |
| C3 | EC01 | EP-FR01-001, BV-FR01-009 |
| C4 | EC04, EC05 | EP-FR01-001, EP-FR01-004, BV-FR01-010 |
| C5 | EC04, EC06, EC07, EC08, EC09 | EP-FR01-005, EP-FR01-006, EP-FR01-007, EP-FR01-008, BV-FR01-011 |
| C6 | EC10 | EP-FR01-009 |
| C7 | EC11, EC12 | EP-FR01-010 |
| C8 | EC11, EC13 | EP-FR01-011, BV-FR01-001, BV-FR01-002, BV-FR01-003 |
| C9 | EC11, EC14 | EP-FR01-012, BV-FR01-004 |
| C10 | EC11, EC15 | EP-FR01-013, BV-FR01-005 |
| C11 | EC11, EC16 | EP-FR01-014, BV-FR01-006 |
| C12 | EC11, EC17, EC18 | EP-FR01-015, EP-FR01-016, BV-FR01-007 |
| C13 | EC19, EC21 | EP-FR01-001, BV-FR01-002, BV-FR01-003 |
| C14 | EC20 | EP-FR01-002 đến EP-FR01-016, BV-FR01-001, BV-FR01-004 đến BV-FR01-008, BV-FR01-010 |
| C15 | EC19, EC20 | Tất cả ca EP/BVA cần quan sát UI nếu thực thi qua web/mobile. |

## 4. Gợi ý dữ liệu tiền điều kiện

| Mục đích | Dữ liệu |
| --- | --- |
| Email đã tồn tại | Tạo trước user với `email=existing.user@example.com`, `password=Aa123456!`, `name=Existing User`. |
| Email mới cho ca hợp lệ | Dùng email có prefix riêng theo TC, ví dụ `fr01.bv.pass8@example.com`, để tránh ảnh hưởng giữa các lần chạy. |
| Môi trường API | Backend chạy tại `http://localhost:3000`; endpoint đăng ký là `POST /api/register`. |

## 5. Ghi chú rủi ro và AI gap analysis

- Yêu cầu FR-01 trong file requirements quá ngắn, nên các ràng buộc chi tiết như email duy nhất, độ mạnh mật khẩu, và role mặc định cần con người xác nhận trước khi nộp.
- Có khả năng AI bỏ sót khác biệt giữa web app và mobile app: mobile regex chấp nhận ký tự đặc biệt thật, còn web regex hiện tại có dấu hiệu dùng `\s` thay cho ký tự đặc biệt. Khi thực thi, nên ưu tiên oracle từ yêu cầu/thông điệp UI và báo bug nếu web chấp nhận khoảng trắng nhưng từ chối ký tự đặc biệt thật.
- Backend `POST /api/register` hiện là bề mặt cần kiểm tra kỹ vì nếu chỉ kiểm thử UI thì có thể bỏ sót API nhận dữ liệu rỗng, email sai định dạng, hoặc email trùng.
- Vì database schema tham chiếu không thể hiện unique constraint cho `email`, ca `EP-FR01-009` có rủi ro phát hiện bug nghiêm trọng hoặc cần cập nhật requirement nếu hệ thống cố ý cho phép trùng email.
- Chưa có giới hạn chính thức cho độ dài tối đa của `name`, `email`, `password`; nếu nhóm muốn kiểm thử robust hơn, nên bổ sung ca dữ liệu rất dài như 255/256 ký tự sau khi xác nhận yêu cầu hoặc giới hạn DB/API.
- Các ca trong artifact này chưa được thực thi. Sau khi chạy thật, cần điền actual result, status `Passed/Failed/Blocked/Not executed`, và evidence path trong báo cáo kiểm thử hoặc phụ lục execution riêng.
```

- Human Review/Corrections: Input thiếu confirm password như yêu cầu tong đặc tả. Có vài cụm từ chưa phù hợp khi dịch ra như "Chức năng dưới kiểm thử". Phần 5 chỉ nên là Ghi chú rủi ro, còn AI gap analysis là của sinh viên làm.
- Final Use in Submission: Chỉ dùng để test skill, chưa phải bản cuối.

### Entry 009
- Time: `2026-07-06 20:54 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) Cập nhật lại  skill‌ [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) để format lại phần 1 từ Chức năng dưới kiểm thử thành Chức năng kiểm thử. Nội dung phần này trình bày dưới dạng bảng, có format mẫu trong skill. AI gap analysis là phần user điền nên phần 5. chỉ ghi là Ghi chú rủi ro thôi. Phần BVA sẽ gồm 2 bước là xác định các input, output nào có dạng số liên tục rồi step 2 xác định biên, các giá trị cận biên
- Output:

```text
---
name: applying-domain-testing
description: Use when designing Domain Testing, equivalence partitioning, equivalence classes, boundary value analysis, or EP/BVA test cases for a single function, API endpoint, form, feature, or input-validation rule.
---

# Applying Domain Testing

## Overview

Use this skill to produce reusable, step-by-step Domain Testing output for one function at a time. Treat Domain Testing as stratified sampling: partition huge input/output domains into equivalence classes, then choose representatives, especially boundary values for ordered fields.

Write the final Domain Testing artifact in Vietnamese with full accents and UTF-8-safe characters unless the user explicitly requests another language. Keep technical identifiers, API paths, field names, status codes, file names, and test IDs unchanged when translating surrounding explanations.

## Workflow

1. State the test function, scope, assumptions, and any missing constraints in the `## 1. Chức năng kiểm thử` table. Do not invent hidden requirements; mark them as assumptions.
2. Identify inputs and outputs from the specification, code, API contract, or UI behavior.
3. Convert each input rule into conditions. Include type, required/optional, format, range, membership set, uniqueness, state, and cross-field constraints.
4. Build equivalence partitions. For a range, create one valid class plus lower-than-min and higher-than-max invalid classes. For a set where values behave differently, create one valid class per value plus invalid class(es). For a must-be rule, create one valid and one invalid class. Split any class that may be handled differently.
5. Number classes as `EC01`, `EC02`, etc. Include input/output, condition, class description, valid/invalid, representative value, and expected result.
6. Design EP test cases. Cover as many valid classes as possible in a single valid test. For invalid tests, isolate one invalid class while all unrelated inputs use nominal valid values.
7. Apply BVA in two steps. First identify which inputs/outputs are continuous numeric, date, length, count, or otherwise ordered domains. Then identify boundaries and boundary-adjacent values. Test `min-1`, `min`, `min+1`, nominal, `max-1`, `max`, `max+1` when both bounds exist. For one-sided bounds, test just outside, on, and just inside the boundary.
8. Trace every test case back to `ECxx` or a named boundary. Mark not-executed tests honestly if execution is outside scope.
9. Add only risk notes that are supported by the requirements, specification, code, or observed ambiguity. Do not write the `AI gap analysis` section because the user will fill that part manually.

## Language and Encoding

- Use Vietnamese for headings, descriptions, assumptions, expected results, notes, and analysis.
- Preserve original language for quoted requirements, exact UI/API messages, code identifiers, usernames, emails, URLs, commands, and evidence paths.
- Use proper Vietnamese accents such as `Đăng ký tài khoản`, `Điều kiện`, `Kết quả mong đợi`, and `Cần rà soát thủ công`.
- Save Markdown artifacts as UTF-8. Do not replace Vietnamese characters with mojibake or ASCII fallbacks such as `Dang ky tai khoan` unless the source text itself is ASCII.
- If the user asks for an audit entry, follow the audit skill's rule: prompt and output in each audit entry remain verbatim in their original language, not translated.

## Output Format

Use the following Vietnamese structure for final artifacts.

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | `<pool hoặc nhóm chức năng>` |
| Feature | `<mã và tên feature>` |
| SUT | `<tên hệ thống/module>` |
| Giao diện/API tham chiếu | `<màn hình, endpoint, hàm, hoặc luồng liên quan>` |
| Phạm vi kiểm thử | `<phạm vi áp dụng domain testing>` |
| Ngoài phạm vi | `<những phần không kiểm thử trong artifact này>` |
| Giả định/ràng buộc thiếu | `<điểm chưa rõ từ requirement; đánh dấu là giả định>` |
| Trạng thái thực thi | `<đã thực thi/chưa thực thi/cần bổ sung actual result>` |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `<input>` | `<ý nghĩa/nguồn quy tắc>` |
| Đầu ra | `<output>` | `<thành công/lỗi/trạng thái>` |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `<field>` | `<quy tắc>` |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `<field>` | `<mô tả lớp>` | Có/Không | `<giá trị>` | `<kết quả mong đợi>` |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| TC01 | `<trọng tâm hợp lệ/không hợp lệ>` | `<giá trị>` | EC01, EC02 | `<kết quả mong đợi>` |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `<field/output>` | `<số/độ dài/ngày/số lượng/khác>` | Có/Không | `<vì sao có hoặc không có biên>` |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `<field>` | `<min/max/độ dài/ngày/số lượng>` | `<min-1, min, min+1...>` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV01 | `<field>` | `<min-1/min/min+1>` | `<giá trị>` | `<kết quả mong đợi>` |

## 5. Ghi chú rủi ro

- `<rủi ro, điểm mơ hồ, hoặc giới hạn cần người học rà soát thủ công>`
- Không viết phần `AI gap analysis` trong artifact; phần đó để user tự điền.

## Quality Checks

- Every input and output from the function appears in A1.
- Every condition has at least one valid or invalid `ECxx`.
- Invalid EP test cases isolate exactly one invalid class unless documenting an intentional interaction test.
- BVA is not forced onto unordered enums; use EP for those.
- BVA includes a first step that explicitly decides which inputs/outputs are continuous or ordered enough for boundary analysis.
- BVA includes a second step that lists the actual boundaries and adjacent values before test cases.
- Boundary dates state the reference date explicitly.
- Expected results are observable, not vague phrases like "works correctly".
- The final artifact uses `## 1. Chức năng kiểm thử`, not `## 1. Chức năng dưới kiểm thử`.
- Section 5 is `## 5. Ghi chú rủi ro`; do not generate an `AI gap analysis` section.
```

### Entry 010
- Time: `2026-07-06 20:59 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project. The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` |
| SUT | EShop - customer web app, mobile app, và backend API |
| Giao diện/API tham chiếu | Màn hình `Register` của customer web app/mobile app; endpoint `POST /api/register` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử domain testing và boundary value analysis cho luồng đăng ký tài khoản người dùng mới. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, gửi email, bảo mật lưu mật khẩu, hoặc phân quyền sau đăng ký. |
| Giả định/ràng buộc thiếu | Requirement FR-01 không quy định độ dài tối đa cho họ tên/email/mật khẩu, không quy định chuẩn regex email đầy đủ, không nêu thông điệp lỗi cụ thể, và không mô tả xử lý khoảng trắng. Các giá trị tối đa trong BVA được đánh dấu là giả định cần rà soát. |
| Trạng thái thực thi | Chưa thực thi; artifact này là thiết kế kiểm thử dựa trên requirement và đặc tả quan sát được. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký; bắt buộc theo FR-01. |
| Đầu vào | `email` | Email dùng làm định danh đăng nhập; bắt buộc, đúng định dạng `user@domain.com`, và duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; bắt buộc, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Trường xác nhận mật khẩu; bắt buộc theo FR-01 và phải khớp `password`. |
| Đầu ra | Tạo tài khoản | Bản ghi user mới được tạo khi toàn bộ dữ liệu hợp lệ. |
| Đầu ra | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả về lỗi phù hợp, và không tạo user mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | Bắt buộc có giá trị không rỗng sau khi người dùng nhập. |
| C2 | `name` | Họ tên nên chấp nhận chữ cái tiếng Việt, khoảng trắng giữa các phần tên, và không chỉ gồm khoảng trắng. |
| C3 | `email` | Bắt buộc có giá trị không rỗng. |
| C4 | `email` | Phải có định dạng email hợp lệ dạng `user@domain.com`. |
| C5 | `email` | Phải là duy nhất trong hệ thống. |
| C6 | `password` | Bắt buộc có giá trị không rỗng. |
| C7 | `password` | Độ dài tối thiểu là 8 ký tự. |
| C8 | `password` | Có ít nhất 1 chữ hoa. |
| C9 | `password` | Có ít nhất 1 chữ thường. |
| C10 | `password` | Có ít nhất 1 chữ số. |
| C11 | `password` | Có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C12 | `confirmPassword` | Bắt buộc có giá trị không rỗng. |
| C13 | `confirmPassword` | Phải khớp chính xác với `password`. |
| C14 | Tạo tài khoản | Chỉ tạo user mới khi tất cả đầu vào hợp lệ. |
| C15 | Điều hướng sau đăng ký | Đăng ký thành công chuyển người dùng tới trang Đăng nhập. |
| C16 | Phản hồi lỗi | Với bất kỳ điều kiện không hợp lệ nào, hệ thống trả/hiển thị lỗi phù hợp và không tạo user. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | Họ tên không rỗng, có chữ cái hợp lệ. | Có | `Nguyễn Văn An` | Chấp nhận giá trị họ tên. |
| EC02 | `name` | Họ tên rỗng. | Không | `` | Từ chối đăng ký và báo lỗi họ tên bắt buộc. |
| EC03 | `name` | Họ tên chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký và không tạo user. |
| EC04 | `email` | Email đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận email. |
| EC05 | `email` | Email rỗng. | Không | `` | Từ chối đăng ký và báo lỗi email bắt buộc. |
| EC06 | `email` | Thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC07 | `email` | Thiếu phần local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC08 | `email` | Thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC09 | `email` | Domain không có dấu chấm. | Không | `fr01@example` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC10 | `email` | Email đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký và không tạo user trùng email. |
| EC11 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa123456!` | Chấp nhận mật khẩu. |
| EC12 | `password` | Mật khẩu rỗng. | Không | `` | Từ chối đăng ký và báo lỗi mật khẩu bắt buộc. |
| EC13 | `password` | Mật khẩu ngắn hơn 8 ký tự. | Không | `Aa12!` | Từ chối đăng ký và báo lỗi độ dài tối thiểu. |
| EC14 | `password` | Thiếu chữ hoa. | Không | `aa123456!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC15 | `password` | Thiếu chữ thường. | Không | `AA123456!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC16 | `password` | Thiếu chữ số. | Không | `Aaaaaaaa!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC17 | `password` | Thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `Aa123456` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC18 | `password` | Có ký tự đặc biệt ngoài tập yêu cầu, không có ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa123456#` | Từ chối đăng ký theo tập ký tự đặc biệt đã nêu trong FR-01. |
| EC19 | `confirmPassword` | Xác nhận mật khẩu khớp với mật khẩu. | Có | `Aa123456!` | Chấp nhận xác nhận mật khẩu. |
| EC20 | `confirmPassword` | Xác nhận mật khẩu rỗng. | Không | `` | Từ chối đăng ký và báo lỗi xác nhận mật khẩu bắt buộc. |
| EC21 | `confirmPassword` | Xác nhận mật khẩu không khớp. | Không | `Aa123456?` | Từ chối đăng ký và báo lỗi hai mật khẩu không khớp. |
| EC22 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa123456!`, `confirmPassword=Aa123456!` | Tạo user mới với role mặc định `user`. |
| EC23 | Tạo tài khoản | Ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC24 | Điều hướng sau đăng ký | Đăng ký thành công. | Có | Dữ liệu hợp lệ đầy đủ | Chuyển người dùng tới trang Đăng nhập. |
| EC25 | Phản hồi lỗi | Đăng ký thất bại vì dữ liệu không hợp lệ. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp và giữ người dùng ở màn hình đăng ký. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC01, EC04, EC11, EC19, EC22, EC24 | Tạo user mới, role mặc định `user`, và chuyển tới trang Đăng nhập. |
| EP-FR01-002 | Từ chối khi họ tên rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC02, EC23, EC25 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi họ tên chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC03, EC23, EC25 | Không tạo user; báo lỗi họ tên không hợp lệ. |
| EP-FR01-004 | Từ chối khi email rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC05, EC23, EC25 | Không tạo user; báo lỗi email bắt buộc. |
| EP-FR01-005 | Từ chối email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC06, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC07, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC08, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối email có domain thiếu dấu chấm. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC09, EC23, EC25 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | EC10, EC23, EC25 | Không tạo user trùng email; báo lỗi email đã tồn tại. |
| EP-FR01-010 | Từ chối mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=`; `confirmPassword=` | EC12, EC23, EC25 | Không tạo user; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-011 | Từ chối mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa12!`; `confirmPassword=Aa12!` | EC13, EC23, EC25 | Không tạo user; báo lỗi độ dài tối thiểu. |
| EP-FR01-012 | Từ chối mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa123456!`; `confirmPassword=aa123456!` | EC14, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-013 | Từ chối mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA123456!`; `confirmPassword=AA123456!` | EC15, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaaa!`; `confirmPassword=Aaaaaaaa!` | EC16, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối mật khẩu thiếu ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC17, EC23, EC25 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối mật khẩu chỉ có ký tự đặc biệt ngoài tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa123456#`; `confirmPassword=Aa123456#` | EC18, EC23, EC25 | Không tạo user; báo lỗi ký tự đặc biệt không hợp lệ hoặc mật khẩu yếu. |
| EP-FR01-017 | Từ chối khi xác nhận mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa123456!`; `confirmPassword=` | EC20, EC23, EC25 | Không tạo user; báo lỗi xác nhận mật khẩu bắt buộc. |
| EP-FR01-018 | Từ chối khi xác nhận mật khẩu không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456?` | EC21, EC23, EC25 | Không tạo user; báo lỗi hai mật khẩu không khớp. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, có giới hạn | Requirement chỉ nêu bắt buộc, không nêu độ dài tối đa; có thể kiểm thử biên rỗng/không rỗng và đánh dấu max là giả định nếu cần. |
| `email` | Độ dài chuỗi và cấu trúc chuỗi | Có, có giới hạn | Email có cấu trúc định dạng và trạng thái duy nhất; BVA áp dụng cho rỗng/không rỗng và các điểm sát cấu trúc tối thiểu. |
| `password` | Độ dài chuỗi | Có | Requirement quy định rõ biên tối thiểu 8 ký tự. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, có giới hạn | Có biên rỗng/không rỗng; phần khớp/không khớp là quan hệ tương đương hơn là miền số liên tục. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Kết quả tạo/không tạo là trạng thái rời rạc, phù hợp EP hơn BVA. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Kết quả chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Trạng thái lỗi | Không | Các lỗi là tập trạng thái rời rạc theo từng điều kiện vi phạm. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng sau khi nhập. | `length=0`, `length=1`, giá trị chỉ khoảng trắng |
| `email` | Biên tối thiểu: không được rỗng và phải đạt cấu trúc email tối thiểu có local-part, `@`, domain, dấu chấm, và TLD. | `length=0`, email tối thiểu hợp lệ giả định `a@b.co`, thiếu từng thành phần cấu trúc |
| `email` | Biên trạng thái duy nhất: email chưa tồn tại so với đã tồn tại. | `fr01.unique@example.com`, `test@eshop.com` |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`, `length=8`, `length=9` |
| `password` | Biên thành phần bắt buộc: số lượng tối thiểu mỗi nhóm ký tự là 1. | 0/1 chữ hoa, 0/1 chữ thường, 0/1 chữ số, 0/1 ký tự đặc biệt thuộc tập cho phép |
| `confirmPassword` | Biên tối thiểu: không được rỗng. | `length=0`, `length=8` khi khớp password |
| `confirmPassword` | Biên quan hệ bằng nhau: khớp tuyệt đối với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu hệ thống không có yêu cầu độ dài tối thiểu lớn hơn 1; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; không tạo user. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo user. |
| BV-FR01-005 | `email` | Cấu trúc tối thiểu hợp lệ | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-006 | `email` | Thiếu local-part sát biên | `name=Nguyễn Văn An`; `email=@b.co`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-007 | `email` | Thiếu TLD sau dấu chấm | `name=Nguyễn Văn An`; `email=a@b.`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-008 | `email` | Email chưa tồn tại | `name=Nguyễn Văn An`; `email=fr01.bv.unique@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu toàn bộ input hợp lệ; tạo user mới. |
| BV-FR01-009 | `email` | Email đã tồn tại | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Từ chối đăng ký; không tạo user trùng email. |
| BV-FR01-010 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| BV-FR01-011 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự bắt buộc đều có; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-012 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-013 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-014 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-015 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-016 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-017 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa123456!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc; không tạo user. |
| BV-FR01-018 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận xác nhận mật khẩu; tạo user nếu các input khác hợp lệ. |
| BV-FR01-019 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |

## 5. Ghi chú rủi ro

- Requirement chính trong `requirements/2026.HW02.Domain Testing_En.md` chỉ liệt kê `FR-01: Account registration`; chi tiết nghiệp vụ được đối chiếu thêm từ `eshop-sut/README.md` và `eshop-sut/api_specification.md`.
- `eshop-sut/README.md` yêu cầu trường **Xác nhận mật khẩu**, nhưng `POST /api/register` trong `eshop-sut/api_specification.md` chỉ mô tả `name`, `email`, `password`. Cần kiểm tra UI/API khi thực thi để xác nhận đây là thiếu sót triển khai hay thiếu sót tài liệu.
- Customer web form hiện quan sát được dùng input email kiểu `text`; nếu requirement yêu cầu validate email chặt ở UI thì cần kiểm thử cả UI và API trực tiếp.
- Backend hiện quan sát được có thể phụ thuộc ràng buộc database cho email duy nhất; cần xác nhận schema thực tế vì nếu không có `UNIQUE`, ca email trùng có nguy cơ tạo tài khoản trùng.
- Requirement chưa nêu độ dài tối đa cho `name`, `email`, `password`, cũng chưa nêu chính sách trim khoảng trắng, nên các biên tối đa và xử lý whitespace cần người học bổ sung sau khi rà soát.
```

- Human Review/Corrections: Skill hoạt động tương đối đúng nhu cầu của sinh viên.
- Final Use in Submission: Chỉ dùng để test skill, không phải bản nộp.

### Entry 011
- Time: `2026-07-06 22:09 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md)  Hãy chia [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) để skill ấy có 2 sub skill là Equivalence partitioning và Boundary value analysis
- Output: Updated .agents/skills/applying-domain-testing/SKILL.md to act as a parent Domain Testing skill that routes to two sub-skill references: references/equivalence-partitioning.md and references/boundary-value-analysis.md. Added the two reference files with Vietnamese EP/BVA workflows, output sections, and quality checks. Updated .agents/skills/applying-domain-testing/agents/openai.yaml metadata to describe the parent/sub-skill structure. Verified UTF-8 readability and ran quick_validate.py successfully.
- Human Review/Corrections: Skill domain testing đã gồm 2 phần là EP và BVA như yêu cầu.

### Entry 012
- Time: `2026-07-06 22:24 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Xóa bảng AI tool usage summary trong ai audit report
- Output: Removed the AI Tool Usage Summary section from 23127075_HW02_AI_DomainTesting_100/report/ai_audit_report.md. Updated .agents/skills/ai-audit-entry/SKILL.md so future audit work records evidence only in Prompt and Output Log entries. Updated .agents/skills/ai-audit-entry/scripts/append_ai_audit_entry.py so new reports do not create the summary table and old reports have that section removed before saving. Added a regression test in .agents/skills/ai-audit-entry/scripts/test_append_ai_audit_entry.py to verify the summary table is not created. Verified with the script tests, in-memory syntax parse, skill quick_validate.py, and a search for the removed summary table heading/header.
- Human Review/Corrections: Đã xóa bản Summary trong AI audit report.

### Entry 013
- Time: `2026-07-06 22:43 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project. The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` / `FR-01: Đăng ký tài khoản` |
| SUT | EShop - Frontend Web và Backend API |
| Giao diện/API tham chiếu | Màn hình đăng ký tài khoản của Frontend Web; endpoint `POST /api/register` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử domain testing cho dữ liệu đăng ký tài khoản: `name`, `email`, `password`, `confirmPassword`, kết quả tạo tài khoản, phản hồi lỗi, và điều hướng sau đăng ký thành công. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, đổi mật khẩu, gửi email, mã hóa/lưu trữ mật khẩu, phân quyền sau đăng ký, và luồng đăng ký trên Mobile App. |
| Giả định/ràng buộc thiếu | File `requirements/2026.HW02.Domain Testing_En.md` chỉ liệt kê `FR-01: Account registration`; chi tiết nghiệp vụ được lấy từ `eshop-sut/README.md`. Requirement không nêu độ dài tối đa cho `name`, `email`, `password`, không nêu chính sách trim khoảng trắng, không nêu thông điệp lỗi cụ thể, và không nêu email có phân biệt hoa/thường khi kiểm tra duy nhất hay không. |
| Trạng thái thực thi | Chưa thực thi; artifact này là thiết kế kiểm thử dựa trên requirement và đặc tả quan sát được. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người dùng; theo FR-01, người dùng phải cung cấp **Họ Tên**. |
| Đầu vào | `email` | Email đăng ký; theo FR-01, phải có định dạng hợp lệ dạng `user@domain.com` và là duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; theo FR-01, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Xác nhận mật khẩu; theo FR-01, phải có trường này và hệ thống từ chối nếu không khớp `password`. |
| Đầu ra | Tạo tài khoản | User mới được tạo khi toàn bộ dữ liệu hợp lệ. |
| Đầu ra | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả về lỗi phù hợp, và không tạo user mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` phải được cung cấp và không chỉ gồm khoảng trắng. |
| C2 | `email` | `email` phải là email hợp lệ dạng `user@domain.com`; điều kiện này đã bao hàm email không rỗng. |
| C3 | `email` | `email` phải là duy nhất trong hệ thống. |
| C4 | `password` | `password` phải là mật khẩu mạnh: độ dài tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`; điều kiện này đã bao hàm password không rỗng. |
| C5 | `confirmPassword` | `confirmPassword` phải được cung cấp và khớp chính xác với `password`. |
| C6 | Tạo tài khoản | Chỉ tạo user mới khi tất cả đầu vào hợp lệ. |
| C7 | Điều hướng sau đăng ký | Đăng ký thành công chuyển người dùng tới trang Đăng nhập. |
| C8 | Phản hồi lỗi | Với bất kỳ điều kiện không hợp lệ nào, hệ thống trả/hiển thị lỗi phù hợp và không tạo user. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | Họ tên được cung cấp và có ký tự khác khoảng trắng. | Có | `Nguyễn Văn An` | Chấp nhận `name`. |
| EC02 | `name` | Họ tên rỗng. | Không | `` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| EC03 | `name` | Họ tên chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký; báo lỗi họ tên không hợp lệ; không tạo user. |
| EC04 | `email` | Email đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận `email`. |
| EC05 | `email` | Email rỗng hoặc không được cung cấp. | Không | `` | Từ chối đăng ký; báo lỗi email bắt buộc/không hợp lệ; không tạo user. |
| EC06 | `email` | Email thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| EC07 | `email` | Email thiếu local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| EC08 | `email` | Email thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| EC09 | `email` | Email có domain thiếu dấu chấm/TLD theo dạng `user@domain.com`. | Không | `fr01@example` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| EC10 | `email` | Email đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký; báo lỗi email đã tồn tại; không tạo user trùng email. |
| EC11 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa12345!` | Chấp nhận `password`. |
| EC12 | `password` | Mật khẩu rỗng hoặc ngắn hơn 8 ký tự. | Không | `Aa12!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự; không tạo user. |
| EC13 | `password` | Mật khẩu đủ dài nhưng thiếu chữ hoa. | Không | `aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| EC14 | `password` | Mật khẩu đủ dài nhưng thiếu chữ thường. | Không | `AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| EC15 | `password` | Mật khẩu đủ dài nhưng thiếu chữ số. | Không | `Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| EC16 | `password` | Mật khẩu đủ dài nhưng thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| EC17 | `password` | Mật khẩu có ký tự đặc biệt ngoài tập yêu cầu nhưng không có ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa12345#` | Từ chối đăng ký theo tập ký tự đặc biệt đã nêu trong FR-01; không tạo user. |
| EC18 | `confirmPassword` | Xác nhận mật khẩu khớp chính xác với mật khẩu. | Có | `Aa12345!` | Chấp nhận `confirmPassword`. |
| EC19 | `confirmPassword` | Xác nhận mật khẩu rỗng hoặc không được cung cấp. | Không | `` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc/không khớp; không tạo user. |
| EC20 | `confirmPassword` | Xác nhận mật khẩu không khớp với `password`. | Không | `Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |
| EC21 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa12345!`, `confirmPassword=Aa12345!` | Tạo user mới với role mặc định `user` hoặc trạng thái người dùng tương đương theo hệ thống. |
| EC22 | Tạo tài khoản | Có ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC23 | Điều hướng sau đăng ký | Đăng ký thành công. | Có | Dữ liệu hợp lệ đầy đủ | Chuyển người dùng tới trang Đăng nhập. |
| EC24 | Phản hồi lỗi | Đăng ký thất bại vì dữ liệu không hợp lệ hoặc email trùng. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp và giữ người dùng ở màn hình đăng ký. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC01, EC04, EC11, EC18, EC21, EC23 | Tạo user mới; chuyển người dùng tới trang Đăng nhập. |
| EP-FR01-002 | Từ chối khi họ tên rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC02, EC22, EC24 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi họ tên chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC03, EC22, EC24 | Không tạo user; báo lỗi họ tên không hợp lệ. |
| EP-FR01-004 | Từ chối khi email rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC05, EC22, EC24 | Không tạo user; báo lỗi email bắt buộc/không hợp lệ. |
| EP-FR01-005 | Từ chối email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC06, EC22, EC24 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC07, EC22, EC24 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC08, EC22, EC24 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối email có domain thiếu dấu chấm/TLD. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC09, EC22, EC24 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC10, EC22, EC24 | Không tạo user trùng email; báo lỗi email đã tồn tại. |
| EP-FR01-010 | Từ chối mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=`; `confirmPassword=` | EC12, EC22, EC24 | Không tạo user; báo lỗi mật khẩu tối thiểu 8 ký tự hoặc mật khẩu bắt buộc. |
| EP-FR01-011 | Từ chối mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa12!`; `confirmPassword=Aa12!` | EC12, EC22, EC24 | Không tạo user; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EP-FR01-012 | Từ chối mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | EC13, EC22, EC24 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-013 | Từ chối mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | EC14, EC22, EC24 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | EC15, EC22, EC24 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối mật khẩu thiếu ký tự đặc biệt thuộc tập cho phép. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC16, EC22, EC24 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối mật khẩu chỉ dùng ký tự đặc biệt ngoài tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa12345#`; `confirmPassword=Aa12345#` | EC17, EC22, EC24 | Không tạo user; báo lỗi ký tự đặc biệt không hợp lệ hoặc mật khẩu yếu. |
| EP-FR01-017 | Từ chối khi xác nhận mật khẩu rỗng. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa12345!`; `confirmPassword=` | EC19, EC22, EC24 | Không tạo user; báo lỗi xác nhận mật khẩu bắt buộc/không khớp. |
| EP-FR01-018 | Từ chối khi xác nhận mật khẩu không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | EC20, EC22, EC24 | Không tạo user; báo lỗi hai mật khẩu không khớp. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, có giới hạn | Requirement yêu cầu phải cung cấp `name`; có thể kiểm thử biên rỗng/không rỗng. Không có độ dài tối đa nên không xác định được biên trên. |
| `email` | Độ dài chuỗi và cấu trúc chuỗi | Có, có giới hạn | Email có biên rỗng/không rỗng và cấu trúc tối thiểu `local-part@domain.tld`; trạng thái email trùng là rời rạc nên xử lý bằng EP. |
| `password` | Độ dài chuỗi và số lượng nhóm ký tự bắt buộc | Có | Requirement quy định rõ biên tối thiểu 8 ký tự và tối thiểu 1 ký tự cho từng nhóm chữ hoa, chữ thường, chữ số, ký tự đặc biệt. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, có giới hạn | Có thể kiểm thử biên rỗng/không rỗng; quan hệ khớp/không khớp là quan hệ rời rạc nhưng có thể dùng giá trị sát biên "khác đúng 1 ký tự". |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Tạo/không tạo tài khoản là trạng thái rời rạc, phù hợp EP hơn BVA. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Trạng thái lỗi | Không | Các loại lỗi là tập trạng thái rời rạc theo từng điều kiện vi phạm. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: phải có ít nhất 1 ký tự có nghĩa sau khi nhập. | `length=0`, `length=1`, giá trị chỉ khoảng trắng |
| `email` | Biên tối thiểu: phải có giá trị và đạt cấu trúc email tối thiểu có local-part, `@`, domain, dấu chấm, và TLD. | `length=0`, email tối thiểu hợp lệ giả định `a@b.co`, thiếu local-part `@b.co`, thiếu TLD `a@b.` |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`, `length=8`, `length=9` |
| `password` | Biên số lượng tối thiểu mỗi nhóm ký tự bắt buộc là 1. | 0/1 chữ hoa, 0/1 chữ thường, 0/1 chữ số, 0/1 ký tự đặc biệt thuộc tập cho phép |
| `confirmPassword` | Biên tối thiểu: phải được cung cấp. | `length=0`, `length=8` khi khớp `password` |
| `confirmPassword` | Biên quan hệ bằng nhau: phải khớp chính xác với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu không có requirement độ dài tối thiểu lớn hơn 1; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên không hợp lệ; không tạo user. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi email bắt buộc/không hợp lệ; không tạo user. |
| BV-FR01-005 | `email` | Cấu trúc tối thiểu hợp lệ | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-006 | `email` | Thiếu local-part sát biên | `name=Nguyễn Văn An`; `email=@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-007 | `email` | Thiếu TLD sau dấu chấm | `name=Nguyễn Văn An`; `email=a@b.`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-008 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự; không tạo user. |
| BV-FR01-009 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự bắt buộc đều có và email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-010 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-011 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-012 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ và email chưa tồn tại. |
| BV-FR01-013 | `password` | 0 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-014 | `password` | 1 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.onelower@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ và email chưa tồn tại. |
| BV-FR01-015 | `password` | 0 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-016 | `password` | 1 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.onedigit@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ và email chưa tồn tại. |
| BV-FR01-017 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo user. |
| BV-FR01-018 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-019 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa12345!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc/không khớp; không tạo user. |
| BV-FR01-020 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận xác nhận mật khẩu; tạo user nếu các input khác hợp lệ. |
| BV-FR01-021 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |

## 5. Ghi chú rủi ro

- `requirements/2026.HW02.Domain Testing_En.md` chỉ nêu tên `FR-01: Account registration`; nội dung chi tiết của FR-01 được lấy từ `eshop-sut/README.md`, nên cần người học xác nhận đây là oracle chính thức khi đưa vào báo cáo cuối.
- `eshop-sut/api_specification.md` mô tả `POST /api/register` chỉ nhận `name`, `email`, `password`, trong khi `eshop-sut/README.md` yêu cầu thêm trường `confirmPassword`; cần kiểm thử UI/API để xác định thiếu sót triển khai hoặc thiếu sót đặc tả API.
- Frontend Web hiện quan sát được dùng `input type="text"` cho `email`, không có trường `confirmPassword`, và regex mật khẩu yêu cầu ký tự khoảng trắng `\s` thay vì ký tự đặc biệt như thông báo; đây là các điểm rủi ro có thể tạo bug khi thực thi các ca trên.
- Backend `POST /api/register` hiện quan sát được chèn trực tiếp `name`, `email`, `password` vào bảng `users` mà không validate định dạng email, độ mạnh mật khẩu, hoặc xác nhận mật khẩu; cần chạy test để ghi nhận actual result.
- Schema `users` trong `eshop-sut/backend/database.js` hiện quan sát được không đặt `UNIQUE` cho cột `email`, nên ca email trùng có nguy cơ tạo tài khoản trùng thay vì bị từ chối theo FR-01.
- Requirement chưa nêu độ dài tối đa và chính sách trim khoảng trắng cho `name`, `email`, `password`; các biên trên không được thiết kế trong artifact này để tránh tự đặt requirement ẩn.
```

- Human Review/Corrections: Ở phần A2, các điều kiện bị gộp quá mức như Password.
- Final Use in Submission: Chỉ dùng để test skill, không phải bản nộp.

### Entry 014
- Time: `2026-07-06 23:11 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md)[$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Ở A2. Điều kiện, các điều kiện đang bị gộp quá mức. Hãy cập nhật [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md)  để đảm bảo các điều kiện được chia nhỏ ra.
- Output: Updated .agents/skills/applying-domain-testing/SKILL.md to require A2 conditions to be atomic, with separate rows for required/non-empty, type, format, length, membership, uniqueness, state, and cross-field relationship checks. Added an example splitting email and password rules into separate C rows. Updated .agents/skills/applying-domain-testing/references/equivalence-partitioning.md to remove the old guidance that encouraged merging implied conditions, and replaced it with instructions to keep A2 conditions visible while documenting coverage relationships in A3/A4. Verified with rg/file checks; quick_validate.py was not available in the repo/PATH during this session.

### Entry 015
- Time: `2026-07-06 23:17 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project. The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` |
| SUT | EShop - customer web app và backend API |
| Giao diện/API tham chiếu | Màn hình `Register` trong `frontend-web`; endpoint `POST /api/register` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử phân hoạch tương đương và phân tích giá trị biên cho luồng người dùng đăng ký tài khoản mới bằng `name`, `email`, `password`. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, quản lý hồ sơ, phân quyền admin, bảo mật lưu mật khẩu, hoặc kiểm thử hiệu năng. |
| Giả định/ràng buộc thiếu | Requirement trong `requirements/2026.HW02.Domain Testing_En.md` chỉ liệt kê `FR-01: Account registration`, chưa mô tả chi tiết rule nghiệp vụ. Artifact này dùng thêm thông tin quan sát từ form `Register.jsx`, endpoint `POST /api/register`, và dữ liệu seed. Các điểm như chuẩn email đầy đủ, tập ký tự đặc biệt hợp lệ, độ dài tối đa, trim khoảng trắng, và bắt buộc email duy nhất cần được người học xác nhận khi rà soát. |
| Trạng thái thực thi | Chưa thực thi; đây là thiết kế ca kiểm thử dựa trên requirement và đặc tả/triển khai quan sát được. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký; form web đánh dấu `required`. |
| Đầu vào | `email` | Email dùng làm định danh đăng nhập; form web đánh dấu `required`; endpoint nhận trong body JSON. |
| Đầu vào | `password` | Mật khẩu đăng ký; form web đánh dấu `required`; UI mô tả yêu cầu tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt. |
| Đầu ra | Tạo tài khoản | User mới được thêm vào bảng `users` khi đăng ký thành công. |
| Đầu ra | Điều hướng sau đăng ký | Web app chuyển người dùng tới `/login` sau khi gọi API thành công. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ hoặc API lỗi, hệ thống hiển thị/trả về thông báo lỗi và không tạo user mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` không được rỗng. |
| C2 | `name` | `name` không chỉ gồm khoảng trắng. |
| C3 | `email` | `email` không được rỗng. |
| C4 | `email` | `email` có phần local-part trước ký tự `@`. |
| C5 | `email` | `email` có đúng một ký tự `@`. |
| C6 | `email` | `email` có phần domain sau ký tự `@`. |
| C7 | `email` | Phần domain của `email` có dấu chấm và phần TLD sau dấu chấm. |
| C8 | `email` | `email` chưa tồn tại trong hệ thống. |
| C9 | `password` | `password` không được rỗng. |
| C10 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C11 | `password` | `password` có ít nhất 1 chữ hoa. |
| C12 | `password` | `password` có ít nhất 1 chữ thường. |
| C13 | `password` | `password` có ít nhất 1 chữ số. |
| C14 | `password` | `password` có ít nhất 1 ký tự đặc biệt. |
| C15 | Tạo tài khoản | User mới chỉ được tạo khi toàn bộ đầu vào hợp lệ. |
| C16 | Điều hướng sau đăng ký | Khi đăng ký thành công, người dùng được chuyển tới trang đăng nhập. |
| C17 | Phản hồi lỗi | Khi có bất kỳ điều kiện đầu vào không hợp lệ nào, hệ thống hiển thị/trả về lỗi phù hợp và không tạo user mới. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | `name` có nội dung không rỗng và không chỉ gồm khoảng trắng. | Có | `Nguyễn Văn An` | Chấp nhận giá trị họ tên. |
| EC02 | `name` | `name` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi họ tên bắt buộc. |
| EC03 | `name` | `name` chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký và không tạo user. |
| EC04 | `email` | `email` hợp lệ về cấu trúc và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận email. |
| EC05 | `email` | `email` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi email bắt buộc. |
| EC06 | `email` | Thiếu local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC07 | `email` | Thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC08 | `email` | Có nhiều hơn một ký tự `@`. | Không | `fr01@@example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC09 | `email` | Thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC10 | `email` | Domain thiếu dấu chấm hoặc thiếu TLD. | Không | `fr01@example` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC11 | `email` | `email` đã tồn tại trong dữ liệu seed. | Không | `test@eshop.com` | Từ chối đăng ký và không tạo user trùng email. |
| EC12 | `password` | Mật khẩu đáp ứng toàn bộ điều kiện độ mạnh. | Có | `Aa12345!` | Chấp nhận mật khẩu. |
| EC13 | `password` | `password` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi mật khẩu bắt buộc. |
| EC14 | `password` | `password` ngắn hơn 8 ký tự. | Không | `Aa123!` | Từ chối đăng ký và báo lỗi độ dài tối thiểu. |
| EC15 | `password` | `password` thiếu chữ hoa. | Không | `aa12345!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC16 | `password` | `password` thiếu chữ thường. | Không | `AA12345!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC17 | `password` | `password` thiếu chữ số. | Không | `Aaaaaaa!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC18 | `password` | `password` thiếu ký tự đặc biệt. | Không | `Aa123456` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC19 | `password` | `password` có khoảng trắng nhưng không có ký tự đặc biệt rõ ràng. | Không | `Aa12345 ` | Từ chối đăng ký nếu khoảng trắng không được xem là ký tự đặc biệt hợp lệ. |
| EC20 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa12345!` | Tạo user mới với role mặc định `user`. |
| EC21 | Tạo tài khoản | Có ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC22 | Điều hướng sau đăng ký | API đăng ký thành công. | Có | Dữ liệu hợp lệ đầy đủ | Web app chuyển tới `/login`. |
| EC23 | Phản hồi lỗi | Đăng ký thất bại vì dữ liệu không hợp lệ hoặc lỗi API. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp và giữ người dùng ở màn hình đăng ký. |

Ghi chú bao phủ: điều kiện `email` không rỗng (C3) được giữ riêng với điều kiện định dạng (C4-C7) dù một email đúng định dạng thường đã không rỗng. Tương tự, `password` không rỗng (C9) được giữ riêng với độ dài tối thiểu (C10) và các nhóm ký tự (C11-C14); khi thiết kế test, có thể giảm trùng lặp bằng cách để từng ca invalid cô lập đúng một lớp không hợp lệ.

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa12345!` | EC01, EC04, EC12, EC20, EC22 | Tạo user mới với role mặc định `user` và chuyển tới `/login`. |
| EP-FR01-002 | Từ chối khi `name` rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa12345!` | EC02, EC21, EC23 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi `name` chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa12345!` | EC03, EC21, EC23 | Không tạo user; báo lỗi họ tên không hợp lệ. |
| EP-FR01-004 | Từ chối khi `email` rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!` | EC05, EC21, EC23 | Không tạo user; báo lỗi email bắt buộc. |
| EP-FR01-005 | Từ chối email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa12345!` | EC06, EC21, EC23 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa12345!` | EC07, EC21, EC23 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối email có nhiều hơn một `@`. | `name=Nguyễn Văn An`; `email=fr01@@example.com`; `password=Aa12345!` | EC08, EC21, EC23 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa12345!` | EC09, EC21, EC23 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối email domain thiếu dấu chấm hoặc TLD. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa12345!` | EC10, EC21, EC23 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-010 | Từ chối email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!` | EC11, EC21, EC23 | Không tạo user trùng email; báo lỗi email đã tồn tại. |
| EP-FR01-011 | Từ chối khi `password` rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=` | EC13, EC21, EC23 | Không tạo user; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-012 | Từ chối mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa123!` | EC14, EC21, EC23 | Không tạo user; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EP-FR01-013 | Từ chối mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa12345!` | EC15, EC21, EC23 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA12345!` | EC16, EC21, EC23 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaa!` | EC17, EC21, EC23 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối mật khẩu thiếu ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456` | EC18, EC21, EC23 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-017 | Từ chối mật khẩu chỉ dùng khoảng trắng thay cho ký tự đặc biệt. | `name=Nguyễn Văn An`; `email=fr01.password.space@example.com`; `password=Aa12345 ` | EC19, EC21, EC23 | Không tạo user nếu khoảng trắng không được chấp nhận là ký tự đặc biệt hợp lệ. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, giới hạn dưới | Có biên rỗng/không rỗng do trường bắt buộc. Requirement chưa nêu độ dài tối đa nên không tạo biên tối đa. |
| `email` | Độ dài chuỗi và cấu trúc định dạng | Có, giới hạn dưới một phần | Có biên rỗng/không rỗng do trường bắt buộc. Các lỗi local-part, `@`, domain, TLD là lớp định dạng rời rạc nên chủ yếu thuộc EP. Không có độ dài tối đa được quy định. |
| `password` | Độ dài chuỗi và số lượng nhóm ký tự | Có | UI nêu rõ biên độ dài tối thiểu 8 ký tự; mỗi nhóm chữ hoa/chữ thường/chữ số/ký tự đặc biệt có ngưỡng tối thiểu 1. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Kết quả tạo/không tạo là trạng thái rời rạc, phù hợp EP hơn BVA. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Kết quả chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Trạng thái lỗi | Không | Các lỗi là tập trạng thái rời rạc theo từng điều kiện vi phạm. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng. | `length=0`; `length=1`; giá trị chỉ gồm khoảng trắng |
| `email` | Biên tối thiểu: không được rỗng. | `length=0`; email tối thiểu hợp lệ giả định `a@b.co` |
| `email` | Biên trạng thái duy nhất: chưa tồn tại so với đã tồn tại. | `fr01.unique@example.com`; `test@eshop.com` |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`; `length=8`; `length=9` |
| `password` | Biên số lượng chữ hoa tối thiểu là 1. | 0 chữ hoa; 1 chữ hoa |
| `password` | Biên số lượng chữ thường tối thiểu là 1. | 0 chữ thường; 1 chữ thường |
| `password` | Biên số lượng chữ số tối thiểu là 1. | 0 chữ số; 1 chữ số |
| `password` | Biên số lượng ký tự đặc biệt tối thiểu là 1. | 0 ký tự đặc biệt; 1 ký tự đặc biệt |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa12345!` | Chấp nhận nếu không có rule độ dài tối thiểu lớn hơn 1; tạo user và chuyển tới `/login`. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa12345!` | Từ chối đăng ký; không tạo user. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo user. |
| BV-FR01-005 | `email` | Email tối thiểu hợp lệ theo cấu trúc giả định | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!` | Chấp nhận nếu email chưa tồn tại và toàn bộ input khác hợp lệ. |
| BV-FR01-006 | `email` | Email chưa tồn tại | `name=Nguyễn Văn An`; `email=fr01.bv.unique@example.com`; `password=Aa12345!` | Chấp nhận nếu toàn bộ input hợp lệ; tạo user mới. |
| BV-FR01-007 | `email` | Email đã tồn tại | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!` | Từ chối đăng ký; không tạo user trùng email. |
| BV-FR01-008 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| BV-FR01-009 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới `/login`. |
| BV-FR01-010 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới `/login`. |
| BV-FR01-011 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-012 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!` | Chấp nhận nếu các điều kiện khác hợp lệ. |
| BV-FR01-013 | `password` | 0 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-014 | `password` | 1 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.onelower@example.com`; `password=Aa12345!` | Chấp nhận nếu các điều kiện khác hợp lệ. |
| BV-FR01-015 | `password` | 0 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-016 | `password` | 1 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.onedigit@example.com`; `password=Aa12345!` | Chấp nhận nếu các điều kiện khác hợp lệ. |
| BV-FR01-017 | `password` | 0 ký tự đặc biệt | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-018 | `password` | 1 ký tự đặc biệt | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới `/login`. |

## 5. Ghi chú rủi ro

- Requirement gốc chỉ liệt kê `FR-01: Account registration`, chưa mô tả đầy đủ oracle cho `name`, `email`, `password`; người học cần xác nhận lại rule chính thức trước khi chốt report.
- Form web hiện có `name`, `email`, `password`, không có `confirmPassword`; vì vậy artifact này không thiết kế điều kiện cho xác nhận mật khẩu.
- Frontend hiển thị yêu cầu mật khẩu có ký tự đặc biệt, nhưng regex quan sát được lại yêu cầu có khoảng trắng và chỉ cho phép chữ, số, khoảng trắng. Đây là rủi ro lỗi triển khai cần kiểm thử thực tế bằng các ca như `Aa12345!` và `Aa12345 `.
- Endpoint `POST /api/register` quan sát được không tự validate `name`, `email`, `password`; nếu gọi API trực tiếp, các ca invalid có thể vẫn được insert. Khi thực thi nên kiểm thử cả UI và API trực tiếp để phân biệt lỗi frontend/backend.
- Bảng `users` quan sát được không có ràng buộc `UNIQUE` cho `email`; ca email trùng `test@eshop.com` có nguy cơ vẫn tạo thêm user nếu backend không kiểm tra trùng.
- Requirement chưa nêu độ dài tối đa cho `name`, `email`, `password`, chưa nêu chuẩn trim khoảng trắng và tập ký tự đặc biệt hợp lệ, nên không tạo BVA cho biên tối đa trong artifact này.
```

- Human Review/Corrections: Thông qua đợt prompt này, sinh viên nhận ra có mâu thuẫn trong skill apply-domain-testing đó là parent skill yêu cầu tách các Condition, EC ra mức atomic nhưng sub-skill (EP) lại yêu cầu gộp nếu có thể trùng lặp.

### Entry 016
- Time: `2026-07-06 23:27 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Đồng nhất sub skill EP và parent skill apply domain testing để đảm bảo phần A2. Điều kiện của EP sẽ tách điều kiện nguyên tử để đảm bảo tối ưu khi viết Lớp tương đương và test case.
- Output:

```text
# Equivalence Partitioning

Use this sub-skill when the task asks for equivalence partitioning, equivalence classes, EP test cases, valid/invalid classes, or the EP part of a full Domain Testing artifact.

## Core Rule

Partition each input/output rule into classes that should be treated the same by the SUT. Keep classes minimal but behaviorally meaningful. Split a class when the requirement, API, UI, database state, or code path suggests different handling.

## Workflow

1. Identify all inputs and outputs relevant to the function.
2. Convert each rule into conditions. Include type, required/optional, format, range, membership set, uniqueness, state, and cross-field constraints.
3. Split rules into atomic conditions in A2. One condition row should express exactly one check: required/non-empty, type, format, min length, max length, membership set, uniqueness, state, or one cross-field relationship. Do not hide a weaker condition just because a stricter condition may imply it during execution.
4. Optimize modeling in A3/A4, not A2. If several atomic conditions are satisfied by one representative valid class or exposed by one invalid value, keep the conditions separate in A2 and state the coverage relationship in the equivalence class or test case.
5. Create equivalence classes:
   - For a range: one valid class, one lower-than-min invalid class, and one higher-than-max invalid class.
   - For a finite set with distinct behavior: one valid class per meaningful value plus invalid class(es).
   - For a must-be rule: one valid class and one invalid class.
   - For uniqueness or state: one class for available state and one for conflicting state.
   - For cross-field constraints: one class for satisfied relationship and one or more invalid relationship classes.
6. Number classes as `EC01`, `EC02`, etc. Include input/output, class description, valid/invalid status, representative value, and expected result.
7. Design EP test cases:
   - Cover as many valid classes as possible in one valid test.
   - For invalid tests, isolate exactly one invalid class while all unrelated inputs use nominal valid values.
   - Add interaction tests only when a cross-field condition is the target.
8. Trace every EP test case to the covered `ECxx` values.

## Output Sections

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `<input>` | `<ý nghĩa/nguồn quy tắc>` |
| Đầu ra | `<output>` | `<thành công/lỗi/trạng thái>` |

#### A2. Điều kiện

List atomic conditions. One row should express one check only. Required/non-empty, format, length, membership, uniqueness, state, and cross-field checks must be separate rows even when one check can imply another during execution.

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `<field>` | `<quy tắc>` |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `<field>` | `<mô tả lớp>` | Có/Không | `<giá trị>` | `<kết quả mong đợi>` |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| TC01 | `<trọng tâm hợp lệ/không hợp lệ>` | `<giá trị>` | EC01, EC02 | `<kết quả mong đợi>` |

## Quality Checks

- Every input and output from the function appears in A1.
- A2 conditions are atomic; do not merge required/non-empty, type, format, length, membership, uniqueness, state, and cross-field relationship checks into the same row.
- Every condition has at least one valid or invalid `ECxx`.
- Each invalid EP test isolates one invalid class unless explicitly documenting an interaction test.
- If one representative class or test case covers multiple atomic conditions, keep the A2 rows separate and mention that coverage in A3/A4.
- Expected results are observable through UI text, API status/body, database state, or documented system state.
- Use Vietnamese with full accents, while preserving field names, endpoint names, codes, and quoted source text verbatim.
```

### Entry 017
- Time: `2026-07-06 23:33 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project (Please read the README in folder eshop-sut for Specification). The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Pool | Pool A - Authentication, Categories, and Products |
| Feature | `FR-01: Account registration` / Đăng ký tài khoản |
| SUT | EShop - Frontend Web khách hàng và Backend API |
| Giao diện/API tham chiếu | Màn hình đăng ký tài khoản; endpoint `POST /api/register` |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử phân hoạch tương đương và phân tích giá trị biên cho luồng người dùng đăng ký tài khoản mới theo đặc tả trong `eshop-sut/README.md`. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, phân quyền sau đăng ký, gửi email, mã hóa/lưu trữ mật khẩu, hoặc luồng mobile của `FR-20`. |
| Giả định/ràng buộc thiếu | Requirement không nêu độ dài tối đa cho `name`, `email`, `password`; không định nghĩa regex email đầy đủ ngoài ví dụ `user@domain.com`; không nêu thông điệp lỗi cụ thể; không nêu rõ xử lý khoảng trắng đầu/cuối. Các điểm này cần người học rà soát khi thực thi. |
| Trạng thái thực thi | Chưa thực thi; artifact này là thiết kế kiểm thử dựa trên requirement/README và quan sát implementation để ghi rủi ro. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người dùng; bắt buộc theo FR-01. |
| Đầu vào | `email` | Email dùng để đăng ký/đăng nhập; bắt buộc, đúng định dạng `user@domain.com`, và duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; bắt buộc, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Trường xác nhận mật khẩu; bắt buộc phải tồn tại theo FR-01 và giá trị phải khớp `password`. |
| Đầu ra | Tạo tài khoản | User mới được tạo khi toàn bộ dữ liệu hợp lệ. |
| Đầu ra | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi có dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả lỗi phù hợp, và không tạo user mới. |
| Đầu ra | Thuộc tính form | Form tuân thủ yêu cầu giao diện liên quan: trường bắt buộc có ký hiệu `*`, `email` dùng `type="email"`, mật khẩu dùng `type="password"`, lỗi xuất hiện trên nút submit. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` bắt buộc có giá trị không rỗng. |
| C2 | `email` | `email` bắt buộc có giá trị không rỗng. |
| C3 | `email` | Trường `email` trên form phải dùng `type="email"`. |
| C4 | `email` | `email` phải đúng định dạng hợp lệ dạng `user@domain.com`. |
| C5 | `email` | `email` phải là duy nhất trong hệ thống. |
| C6 | `password` | `password` bắt buộc có giá trị không rỗng. |
| C7 | `password` | Trường `password` trên form phải dùng `type="password"`. |
| C8 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C9 | `password` | `password` có ít nhất 1 chữ hoa. |
| C10 | `password` | `password` có ít nhất 1 chữ thường. |
| C11 | `password` | `password` có ít nhất 1 chữ số. |
| C12 | `password` | `password` có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C13 | `confirmPassword` | Form phải có trường `confirmPassword` / Xác nhận mật khẩu. |
| C14 | `confirmPassword` | `confirmPassword` bắt buộc có giá trị không rỗng. |
| C15 | `confirmPassword` | Trường `confirmPassword` trên form phải che mật khẩu như trường mật khẩu, tương đương `type="password"`. |
| C16 | `confirmPassword` | `confirmPassword` phải khớp chính xác với `password`. |
| C17 | Thuộc tính form | Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn. |
| C18 | Phản hồi lỗi | Thông báo lỗi phải xuất hiện trên nút submit. |
| C19 | Tạo tài khoản | Chỉ tạo user mới khi tất cả đầu vào hợp lệ. |
| C20 | Tạo tài khoản | Không tạo user mới khi có bất kỳ điều kiện đầu vào không hợp lệ nào. |
| C21 | Điều hướng sau đăng ký | Sau khi đăng ký thành công, người dùng được chuyển tới trang Đăng nhập. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | `name` không rỗng. | Có | `Nguyễn Văn An` | Chấp nhận họ tên. |
| EC02 | `name` | `name` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi họ tên bắt buộc. |
| EC03 | `email` | `email` đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận email. |
| EC04 | `email` | `email` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi email bắt buộc. |
| EC05 | `email` | `email` thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC06 | `email` | `email` thiếu local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC07 | `email` | `email` thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC08 | `email` | `email` có domain thiếu dấu chấm. | Không | `fr01@example` | Từ chối đăng ký và báo lỗi định dạng email. |
| EC09 | `email` | `email` đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký, không tạo user trùng email. |
| EC10 | `email` | Trường email dùng đúng kiểu HTML5. | Có | `input type="email"` | Trình duyệt/form hỗ trợ validate định dạng email. |
| EC11 | `email` | Trường email dùng sai kiểu HTML5. | Không | `input type="text"` | Ghi nhận không tuân thủ yêu cầu form. |
| EC12 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa12345!` | Chấp nhận mật khẩu. |
| EC13 | `password` | `password` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi mật khẩu bắt buộc. |
| EC14 | `password` | `password` ngắn hơn 8 ký tự. | Không | `Aa1234!` | Từ chối đăng ký và báo lỗi độ dài tối thiểu. |
| EC15 | `password` | `password` thiếu chữ hoa. | Không | `aa12345!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC16 | `password` | `password` thiếu chữ thường. | Không | `AA12345!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC17 | `password` | `password` thiếu chữ số. | Không | `Aaaaaaa!` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC18 | `password` | `password` thiếu ký tự đặc biệt thuộc tập cho phép. | Không | `Aa123456` | Từ chối đăng ký và báo lỗi mật khẩu yếu. |
| EC19 | `password` | `password` chỉ có ký tự đặc biệt ngoài tập yêu cầu, không có ký tự trong tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa12345#` | Từ chối đăng ký theo tập ký tự đặc biệt đã nêu trong FR-01. |
| EC20 | `password` | Trường mật khẩu che giá trị nhập. | Có | `input type="password"` | Không hiển thị rõ mật khẩu trên form. |
| EC21 | `password` | Trường mật khẩu không che giá trị nhập. | Không | `input type="text"` | Ghi nhận không tuân thủ yêu cầu form. |
| EC22 | `confirmPassword` | Form có trường xác nhận mật khẩu. | Có | Có input Xác nhận mật khẩu | Có thể kiểm tra quan hệ khớp mật khẩu trước khi đăng ký. |
| EC23 | `confirmPassword` | Form thiếu trường xác nhận mật khẩu. | Không | Không có input Xác nhận mật khẩu | Ghi nhận không tuân thủ FR-01; không đủ dữ liệu để kiểm tra khớp mật khẩu. |
| EC24 | `confirmPassword` | `confirmPassword` không rỗng và khớp `password`. | Có | `Aa12345!` | Chấp nhận xác nhận mật khẩu. |
| EC25 | `confirmPassword` | `confirmPassword` rỗng. | Không | `` | Từ chối đăng ký và báo lỗi xác nhận mật khẩu bắt buộc. |
| EC26 | `confirmPassword` | `confirmPassword` không khớp `password`. | Không | `Aa12345?` | Từ chối đăng ký và báo lỗi hai mật khẩu không khớp. |
| EC27 | `confirmPassword` | Trường xác nhận mật khẩu che giá trị nhập. | Có | `input type="password"` | Không hiển thị rõ xác nhận mật khẩu trên form. |
| EC28 | `confirmPassword` | Trường xác nhận mật khẩu không che giá trị nhập. | Không | `input type="text"` | Ghi nhận không tuân thủ yêu cầu form. |
| EC29 | Thuộc tính form | Các trường bắt buộc có ký hiệu `*`. | Có | Nhãn `Họ Tên *`, `Email *`, `Mật khẩu *`, `Xác nhận mật khẩu *` | Form thể hiện rõ trường bắt buộc. |
| EC30 | Thuộc tính form | Thiếu ký hiệu `*` ở ít nhất một trường bắt buộc. | Không | Nhãn `Email` không có `*` | Ghi nhận không tuân thủ yêu cầu form. |
| EC31 | Phản hồi lỗi | Lỗi hiển thị trên nút submit. | Có | Vùng lỗi nằm trước button submit | Người dùng thấy lỗi đúng vị trí yêu cầu. |
| EC32 | Phản hồi lỗi | Lỗi hiển thị dưới nút submit hoặc không hiển thị. | Không | Lỗi nằm sau button submit | Ghi nhận không tuân thủ yêu cầu form. |
| EC33 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.new.user@example.com`, `password=Aa12345!`, `confirmPassword=Aa12345!` | Tạo user mới với role mặc định `user`. |
| EC34 | Tạo tài khoản | Có ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo user mới. |
| EC35 | Điều hướng sau đăng ký | Đăng ký thành công. | Có | Dữ liệu hợp lệ đầy đủ | Chuyển người dùng tới trang Đăng nhập. |
| EC36 | Điều hướng sau đăng ký | Đăng ký thất bại. | Không | `password=Aa123456` | Giữ người dùng ở màn hình đăng ký và hiển thị lỗi phù hợp. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.new.user@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC01, EC03, EC12, EC24, EC33, EC35 | Tạo user mới với role mặc định `user` và chuyển tới trang Đăng nhập. |
| EP-FR01-002 | Từ chối khi `name` rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC02, EC34, EC36 | Không tạo user; báo lỗi họ tên bắt buộc. |
| EP-FR01-003 | Từ chối khi `email` rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC04, EC34, EC36 | Không tạo user; báo lỗi email bắt buộc. |
| EP-FR01-004 | Từ chối `email` thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC05, EC34, EC36 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-005 | Từ chối `email` thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC06, EC34, EC36 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-006 | Từ chối `email` thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC07, EC34, EC36 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối `email` có domain thiếu dấu chấm. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC08, EC34, EC36 | Không tạo user; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối `email` đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC09, EC34, EC36 | Không tạo user trùng email; báo lỗi email đã tồn tại. |
| EP-FR01-009 | Kiểm tra kiểu trường `email` trên form. | Quan sát DOM của trường email. | EC10, EC11 | Field phải là `input type="email"`; nếu là kiểu khác thì ghi nhận không đạt. |
| EP-FR01-010 | Từ chối khi `password` rỗng. | `name=Nguyễn Văn An`; `email=fr01.password.empty@example.com`; `password=`; `confirmPassword=` | EC13, EC34, EC36 | Không tạo user; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-011 | Từ chối khi `password` ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | EC14, EC34, EC36 | Không tạo user; báo lỗi độ dài tối thiểu. |
| EP-FR01-012 | Từ chối khi `password` thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | EC15, EC34, EC36 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-013 | Từ chối khi `password` thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | EC16, EC34, EC36 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-014 | Từ chối khi `password` thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | EC17, EC34, EC36 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối khi `password` thiếu ký tự đặc biệt thuộc tập cho phép. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC18, EC34, EC36 | Không tạo user; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối khi ký tự đặc biệt không thuộc tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa12345#`; `confirmPassword=Aa12345#` | EC19, EC34, EC36 | Không tạo user; báo lỗi mật khẩu yếu hoặc ký tự đặc biệt không hợp lệ. |
| EP-FR01-017 | Kiểm tra kiểu trường `password` trên form. | Quan sát DOM của trường mật khẩu. | EC20, EC21 | Field phải là `input type="password"`; nếu là kiểu khác thì ghi nhận không đạt. |
| EP-FR01-018 | Kiểm tra form có trường xác nhận mật khẩu. | Quan sát form đăng ký. | EC22, EC23 | Form phải có trường Xác nhận mật khẩu; nếu thiếu thì ghi nhận không tuân thủ FR-01. |
| EP-FR01-019 | Từ chối khi `confirmPassword` rỗng. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa12345!`; `confirmPassword=` | EC25, EC34, EC36 | Không tạo user; báo lỗi xác nhận mật khẩu bắt buộc. |
| EP-FR01-020 | Từ chối khi `confirmPassword` không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | EC26, EC34, EC36 | Không tạo user; báo lỗi hai mật khẩu không khớp. |
| EP-FR01-021 | Kiểm tra kiểu trường `confirmPassword` trên form. | Quan sát DOM của trường xác nhận mật khẩu. | EC27, EC28 | Field phải che mật khẩu; nếu không che thì ghi nhận không đạt. |
| EP-FR01-022 | Kiểm tra ký hiệu bắt buộc trên nhãn trường. | Quan sát nhãn `name`, `email`, `password`, `confirmPassword`. | EC29, EC30 | Mỗi trường bắt buộc có ký hiệu `*`; thiếu ký hiệu nào thì ghi nhận không đạt. |
| EP-FR01-023 | Kiểm tra vị trí thông báo lỗi. | Gây lỗi bằng `email=fr01.example.com`; quan sát vị trí lỗi. | EC31, EC32 | Lỗi hiển thị phía trên nút submit. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, giới hạn dưới | Requirement yêu cầu phải cung cấp họ tên, nên có biên rỗng/không rỗng; không có max được đặc tả. |
| `email` | Độ dài/cấu trúc chuỗi và trạng thái duy nhất | Có, giới hạn | Có biên rỗng/không rỗng và các điểm sát cấu trúc tối thiểu của email; trạng thái duy nhất là miền rời rạc nên thuộc EP hơn BVA. |
| `password` | Độ dài chuỗi và số lượng nhóm ký tự bắt buộc | Có | Requirement quy định rõ biên độ dài tối thiểu 8 ký tự và tối thiểu 1 ký tự cho từng nhóm bắt buộc. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, giới hạn | Có biên rỗng/không rỗng; quan hệ khớp/không khớp là quan hệ rời rạc nhưng có thể kiểm tra sát biên bằng khác đúng 1 ký tự. |
| Thuộc tính form | Thuộc tính UI rời rạc | Không | `type`, ký hiệu `*`, và vị trí lỗi là trạng thái rời rạc, phù hợp EP hơn BVA. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Tạo/không tạo user là kết quả rời rạc. |
| Điều hướng sau đăng ký | Trạng thái UI | Không | Chuyển trang/không chuyển trang là kết quả rời rạc. |
| Phản hồi lỗi | Trạng thái lỗi | Không | Các lỗi là tập trạng thái rời rạc theo từng điều kiện vi phạm. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng. | `length=0`, `length=1` |
| `email` | Biên tối thiểu: không được rỗng. | `length=0`, email tối thiểu hợp lệ giả định `a@b.co` |
| `email` | Biên cấu trúc email hợp lệ. | Thiếu local-part: `@b.co`; thiếu domain: `a@`; thiếu TLD sau dấu chấm: `a@b.`; hợp lệ sát biên: `a@b.co` |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`, `length=8`, `length=9` |
| `password` | Biên số lượng chữ hoa tối thiểu là 1. | 0 chữ hoa, 1 chữ hoa |
| `password` | Biên số lượng chữ thường tối thiểu là 1. | 0 chữ thường, 1 chữ thường |
| `password` | Biên số lượng chữ số tối thiểu là 1. | 0 chữ số, 1 chữ số |
| `password` | Biên số lượng ký tự đặc biệt thuộc tập cho phép tối thiểu là 1. | 0 ký tự đặc biệt, 1 ký tự đặc biệt |
| `confirmPassword` | Biên tối thiểu: không được rỗng. | `length=0`, `length=8` khi khớp `password` |
| `confirmPassword` | Biên quan hệ bằng nhau với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo user. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các input khác hợp lệ và requirement không đặt min lớn hơn 1; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo user. |
| BV-FR01-004 | `email` | Cấu trúc tối thiểu hợp lệ | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-005 | `email` | Thiếu local-part sát biên | `name=Nguyễn Văn An`; `email=@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-006 | `email` | Thiếu domain sau `@` | `name=Nguyễn Văn An`; `email=a@`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-007 | `email` | Thiếu TLD sau dấu chấm | `name=Nguyễn Văn An`; `email=a@b.`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi định dạng email; không tạo user. |
| BV-FR01-008 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| BV-FR01-009 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-010 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-011 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-012 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-013 | `password` | 0 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-014 | `password` | 1 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.onelower@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-015 | `password` | 0 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-016 | `password` | 1 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.onedigit@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-017 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| BV-FR01-018 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo user và chuyển tới trang Đăng nhập. |
| BV-FR01-019 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa12345!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc; không tạo user. |
| BV-FR01-020 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận xác nhận mật khẩu; tạo user nếu các input khác hợp lệ. |
| BV-FR01-021 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo user. |

## 5. Ghi chú rủi ro

- `eshop-sut/README.md` yêu cầu có trường **Xác nhận mật khẩu**, nhưng `eshop-sut/frontend-web/src/pages/Register.jsx` hiện không có trường này và `POST /api/register` chỉ nhận `{ name, email, password }`; cần xác minh khi thực thi và có thể lập bug.
- `eshop-sut/frontend-web/src/pages/Register.jsx` hiện dùng `type="text"` cho email, trong khi `FR-22` yêu cầu trường Email dùng `type="email"`.
- Regex mật khẩu ở `Register.jsx` hiện yêu cầu khoảng trắng `(?=.*\s)` và chỉ cho `[A-Za-z\d\s]`, không khớp requirement yêu cầu ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`.
- `eshop-sut/backend/server.js` hiện không validate `name`, `email`, `password`, `confirmPassword` ở endpoint `POST /api/register`; nếu kiểm thử API trực tiếp, các ca invalid có nguy cơ vẫn được tạo user.
- `eshop-sut/backend/database.js` định nghĩa `email TEXT` không có `UNIQUE`, nên requirement email duy nhất có nguy cơ không được đảm bảo ở tầng database/backend.
- Requirement chưa nêu độ dài tối đa cho `name`, `email`, `password`, chưa nêu trim khoảng trắng, và chưa quy định thông điệp lỗi cụ thể; khi thực thi cần ghi actual result theo hành vi quan sát được.
```

- Human Review/Corrections: Qua quá trình sửa skill, AI mất context domain testing từ slide môn học.

### Entry 018
- Time: `2026-07-06 23:41 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Đồng nhất sub skill EP và parent skill apply domain testing để đảm bảo phần A2. Điều kiện của EP sẽ tách điều kiện nguyên tử để đảm bảo tối ưu khi viết Lớp tương đương và test case. Kiến thức phương pháp Domain Testing phải dựa trên references/04_Domain Testing.md.
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md để yêu cầu đọc repo-root references/04_Domain Testing.md làm method oracle, đồng thời nhấn mạnh A2 phải tách điều kiện nguyên tử trước khi lập lớp tương đương. Đã cập nhật .agents/skills/applying-domain-testing/references/equivalence-partitioning.md để bỏ hướng dẫn gộp điều kiện dư thừa, thay bằng quy tắc giữ required/non-empty, type, format, range, length, membership, uniqueness, state và cross-field relationship thành các điều kiện riêng. Đã cập nhật .agents/skills/applying-domain-testing/references/boundary-value-analysis.md để nêu rõ BVA dựa trên repo-root references/04_Domain Testing.md. Đã chạy quick_validate.py và skill hợp lệ; các file Markdown vẫn là UTF-8.

### Entry 019
- Time: `2026-07-07 10:06 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Đưa nội dung references/04_Domain Testing.md thành các bước thực hiện domain testing vào trong [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) để đảm bảo tính tái sử dụng và portable. Bộ skill nhận input là project - feature, nhấn mạnh Domain testing gồm EP và BVA là blackbox testing, dựa trên các specification, không đọc code.
- Output:

```text
Đã cập nhật bộ skill `applying-domain-testing` để portable hơn.

Thay đổi chính:
- Nhúng phương pháp 4 bước từ `references/04_Domain Testing.md` trực tiếp vào `SKILL.md`.
- Đổi đơn vị input thành `project-feature` và thêm trường `Project`, `Specification tham chiếu` trong artifact.
- Nhấn mạnh Domain Testing là black-box testing gồm EP và BVA, dựa trên specification/observable behavior, không đọc source code hay implementation internals.
- Gỡ phụ thuộc `repo-root references/04_Domain Testing.md` khỏi parent skill và hai sub-skill EP/BVA.
- Đồng bộ `agents/openai.yaml` để prompt mặc định cũng nói project-feature/specification.

Đã verify:
- `quick_validate.py` -> `Skill is valid!`
- `git diff --check` sạch.
- Kiểm tra nội dung xác nhận có `black-box`, `project-feature`, ràng buộc không đọc source code, và không còn `repo-root`/`code path` trong bộ skill.

Mình chỉ sửa các file trong `.agents/skills/applying-domain-testing/`. Worktree đang có vài thay đổi ngoài phạm vi từ trước/khác task như `database.sqlite`, audit report, và một file backup bị xóa; mình không đụng vào chúng.
```

- Human Review/Corrections: Skill không còn phụ thuộc vào file slide của môn học mà có thể xuất thành bộ skill domain testing độc lập.

### Entry 020
- Time: `2026-07-07 21:42 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool A FR-01: Account registration (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project (Please read the specifications including: eshop-sut/README, eshop-sut/api_specification.md,  in the folder eshop-sut). The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-01: Đăng ký tài khoản - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-01: Account registration` / `FR-01: Đăng ký tài khoản` |
| SUT | EShop - Frontend Web, Frontend Mobile, Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool A; `eshop-sut/README.md` mục `FR-01: Đăng ký tài khoản`, `FR-22: Form Requirements`; `eshop-sut/api_specification.md` mục `1.1 Đăng ký tài khoản` |
| Giao diện/API tham chiếu | Màn hình Đăng ký tài khoản; endpoint `POST /api/register` với body API gồm `name`, `email`, `password`; sau đăng ký thành công chuyển tới trang Đăng nhập |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử Domain Testing gồm phân hoạch tương đương và phân tích giá trị biên cho dữ liệu đăng ký tài khoản mới. Oracle chính là đặc tả README/API, không dựa trên mã nguồn triển khai. |
| Ngoài phạm vi | Không kiểm thử đăng nhập, khóa tài khoản, quên mật khẩu, reset mật khẩu, hồ sơ cá nhân, phân quyền, bảo mật lưu mật khẩu, gửi email, hiệu năng, hoặc kiểm thử triển khai database. |
| Giả định/ràng buộc thiếu | FR-01 không nêu độ dài tối đa cho `name`, `email`, `password`; không nêu regex email đầy đủ ngoài ví dụ `user@domain.com`; không nêu thông báo lỗi/status code thất bại chính xác; không nêu chính sách trim khoảng trắng. Artifact giả định giá trị chỉ gồm khoảng trắng là chưa cung cấp dữ liệu người dùng. README yêu cầu `confirmPassword`, nhưng API specification của `POST /api/register` chưa liệt kê trường này; artifact tách rõ ca UI và ca API khi cần. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung actual result, status, và evidence path sau khi chạy kiểm thử. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `name` | Họ tên người đăng ký; bắt buộc theo FR-01. |
| Đầu vào | `email` | Email dùng định danh tài khoản; bắt buộc, đúng định dạng `user@domain.com`, và duy nhất trong hệ thống. |
| Đầu vào | `password` | Mật khẩu; bắt buộc, tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| Đầu vào | `confirmPassword` | Xác nhận mật khẩu trên giao diện; bắt buộc theo FR-01 và phải khớp với `password`. |
| Đầu ra | Tạo tài khoản | Tài khoản mới được tạo khi tất cả dữ liệu hợp lệ và `email` chưa tồn tại. |
| Đầu ra | Phản hồi thành công API | `POST /api/register` trả `200 OK` với body dạng `{"message": "User registered successfully", "id": 1}` theo API specification. |
| Đầu ra | Điều hướng UI | Sau khi đăng ký thành công qua giao diện, người dùng được chuyển tới trang Đăng nhập. |
| Đầu ra | Phản hồi lỗi | Khi dữ liệu không hợp lệ, hệ thống từ chối đăng ký, hiển thị/trả lỗi phù hợp, và không tạo tài khoản mới. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `name` | `name` không được rỗng. |
| C2 | `name` | Theo giả định dữ liệu người dùng, `name` không được chỉ gồm khoảng trắng. |
| C3 | `email` | `email` không được rỗng. |
| C4 | `email` | `email` phải có phần local-part trước ký tự `@`. |
| C5 | `email` | `email` phải có đúng một ký tự phân tách `@`. |
| C6 | `email` | `email` phải có domain sau ký tự `@`. |
| C7 | `email` | Domain của `email` phải có phần tên miền và phần mở rộng theo dạng ví dụ `domain.com`. |
| C8 | `email` | `email` phải là duy nhất trong hệ thống. |
| C9 | `password` | `password` không được rỗng. |
| C10 | `password` | `password` có độ dài tối thiểu 8 ký tự. |
| C11 | `password` | `password` có ít nhất 1 chữ hoa. |
| C12 | `password` | `password` có ít nhất 1 chữ thường. |
| C13 | `password` | `password` có ít nhất 1 chữ số. |
| C14 | `password` | `password` có ít nhất 1 ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. |
| C15 | `confirmPassword` | `confirmPassword` không được rỗng trên giao diện đăng ký. |
| C16 | `confirmPassword` | `confirmPassword` phải khớp chính xác với `password`. |
| C17 | Tạo tài khoản | Chỉ tạo tài khoản mới khi toàn bộ điều kiện đầu vào hợp lệ. |
| C18 | Phản hồi thành công API | Khi đăng ký hợp lệ qua API, phản hồi thành công phải có thông báo đăng ký thành công và `id` user mới. |
| C19 | Điều hướng UI | Khi đăng ký hợp lệ qua giao diện, người dùng được chuyển tới trang Đăng nhập. |
| C20 | Phản hồi lỗi | Với bất kỳ điều kiện không hợp lệ nào, hệ thống phải trả/hiển thị lỗi phù hợp và không tạo tài khoản mới. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `name` | `name` có giá trị không rỗng và không chỉ gồm khoảng trắng. | Có | `Nguyễn Văn An` | Chấp nhận `name`. |
| EC02 | `name` | `name` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo tài khoản. |
| EC03 | `name` | `name` chỉ gồm khoảng trắng. | Không | `   ` | Từ chối đăng ký theo giả định dữ liệu người dùng chưa được cung cấp; không tạo tài khoản. |
| EC04 | `email` | Email đúng định dạng và chưa tồn tại. | Có | `fr01.new.user@example.com` | Chấp nhận `email`. |
| EC05 | `email` | `email` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo tài khoản. |
| EC06 | `email` | Email thiếu local-part trước `@`. | Không | `@example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC07 | `email` | Email thiếu ký tự `@`. | Không | `fr01.example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC08 | `email` | Email có nhiều hơn một ký tự `@`. | Không | `fr01@@example.com` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC09 | `email` | Email thiếu domain sau `@`. | Không | `fr01@` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC10 | `email` | Domain không có phần mở rộng theo dạng `domain.com`. | Không | `fr01@example` | Từ chối đăng ký; báo lỗi định dạng email. |
| EC11 | `email` | Email đã tồn tại trong hệ thống. | Không | `test@eshop.com` | Từ chối đăng ký; không tạo tài khoản trùng email. |
| EC12 | `password` | Mật khẩu mạnh hợp lệ. | Có | `Aa12345!` | Chấp nhận `password`. |
| EC13 | `password` | `password` rỗng. | Không | `` | Từ chối đăng ký; báo lỗi mật khẩu bắt buộc; không tạo tài khoản. |
| EC14 | `password` | `password` ngắn hơn 8 ký tự. | Không | `Aa12!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EC15 | `password` | `password` thiếu chữ hoa. | Không | `aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC16 | `password` | `password` thiếu chữ thường. | Không | `AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC17 | `password` | `password` thiếu chữ số. | Không | `Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC18 | `password` | `password` thiếu ký tự đặc biệt thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu. |
| EC19 | `password` | `password` có ký tự đặc biệt ngoài tập nêu trong FR-01 nhưng không có ký tự thuộc tập `@`, `$`, `!`, `%`, `*`, `?`, `&`. | Không | `Aa12345#` | Từ chối đăng ký vì chưa thỏa điều kiện ký tự đặc biệt theo FR-01. |
| EC20 | `confirmPassword` | `confirmPassword` không rỗng và khớp chính xác `password`. | Có | `Aa12345!` | Chấp nhận xác nhận mật khẩu. |
| EC21 | `confirmPassword` | `confirmPassword` rỗng. | Không | `` | Từ chối đăng ký trên giao diện; báo lỗi xác nhận mật khẩu bắt buộc; không tạo tài khoản. |
| EC22 | `confirmPassword` | `confirmPassword` không khớp `password`. | Không | `Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo tài khoản. |
| EC23 | Tạo tài khoản | Tất cả đầu vào hợp lệ. | Có | `name=Nguyễn Văn An`, `email=fr01.success@example.com`, `password=Aa12345!`, `confirmPassword=Aa12345!` | Tạo tài khoản mới. |
| EC24 | Tạo tài khoản | Có ít nhất một đầu vào không hợp lệ. | Không | `email=fr01.example.com` | Không tạo tài khoản mới. |
| EC25 | Phản hồi thành công API | Đăng ký hợp lệ qua `POST /api/register`. | Có | Body API hợp lệ gồm `name`, `email`, `password` | API trả `200 OK` và body có `message`, `id`. |
| EC26 | Điều hướng UI | Đăng ký hợp lệ qua giao diện. | Có | Dữ liệu hợp lệ đầy đủ, gồm `confirmPassword` khớp | Người dùng được chuyển tới trang Đăng nhập. |
| EC27 | Phản hồi lỗi | Đăng ký thất bại do một điều kiện không hợp lệ. | Không | `password=Aa123456` | Hiển thị/trả lỗi phù hợp; không tạo tài khoản mới. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Đăng ký thành công qua giao diện với dữ liệu hợp lệ điển hình. | `name=Nguyễn Văn An`; `email=fr01.success@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC01, EC04, EC12, EC20, EC23, EC26 | Tạo tài khoản mới; người dùng được chuyển tới trang Đăng nhập. |
| EP-FR01-002 | Đăng ký thành công qua API với body hợp lệ theo API specification. | `POST /api/register`; body `{ "name": "Nguyen Van A", "email": "fr01.api.success@example.com", "password": "Aa12345!" }` | EC01, EC04, EC12, EC23, EC25 | API trả `200 OK` với `message="User registered successfully"` và `id` user mới. |
| EP-FR01-003 | Từ chối khi họ tên rỗng. | `name=`; `email=fr01.name.empty@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC02, EC24, EC27 | Không tạo tài khoản; báo lỗi họ tên bắt buộc. |
| EP-FR01-004 | Từ chối khi họ tên chỉ gồm khoảng trắng. | `name=   `; `email=fr01.name.space@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC03, EC24, EC27 | Không tạo tài khoản; báo lỗi họ tên không hợp lệ hoặc bắt buộc. |
| EP-FR01-005 | Từ chối khi email rỗng. | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC05, EC24, EC27 | Không tạo tài khoản; báo lỗi email bắt buộc. |
| EP-FR01-006 | Từ chối khi email thiếu local-part. | `name=Nguyễn Văn An`; `email=@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC06, EC24, EC27 | Không tạo tài khoản; báo lỗi định dạng email. |
| EP-FR01-007 | Từ chối khi email thiếu `@`. | `name=Nguyễn Văn An`; `email=fr01.example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC07, EC24, EC27 | Không tạo tài khoản; báo lỗi định dạng email. |
| EP-FR01-008 | Từ chối khi email có nhiều hơn một `@`. | `name=Nguyễn Văn An`; `email=fr01@@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC08, EC24, EC27 | Không tạo tài khoản; báo lỗi định dạng email. |
| EP-FR01-009 | Từ chối khi email thiếu domain. | `name=Nguyễn Văn An`; `email=fr01@`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC09, EC24, EC27 | Không tạo tài khoản; báo lỗi định dạng email. |
| EP-FR01-010 | Từ chối khi domain email thiếu phần mở rộng. | `name=Nguyễn Văn An`; `email=fr01@example`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC10, EC24, EC27 | Không tạo tài khoản; báo lỗi định dạng email. |
| EP-FR01-011 | Từ chối khi email đã tồn tại. | `name=Nguyễn Văn An`; `email=test@eshop.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | EC11, EC24, EC27 | Không tạo tài khoản trùng email; báo lỗi email đã tồn tại hoặc lỗi tương đương. |
| EP-FR01-012 | Từ chối khi mật khẩu rỗng qua API, tách khỏi điều kiện `confirmPassword` của UI. | `POST /api/register`; body `{ "name": "Nguyen Van A", "email": "fr01.password.empty@example.com", "password": "" }` | EC13, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu bắt buộc. |
| EP-FR01-013 | Từ chối khi mật khẩu ngắn hơn 8 ký tự. | `name=Nguyễn Văn An`; `email=fr01.password.short@example.com`; `password=Aa12!`; `confirmPassword=Aa12!` | EC14, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu tối thiểu 8 ký tự. |
| EP-FR01-014 | Từ chối khi mật khẩu thiếu chữ hoa. | `name=Nguyễn Văn An`; `email=fr01.password.upper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | EC15, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu yếu. |
| EP-FR01-015 | Từ chối khi mật khẩu thiếu chữ thường. | `name=Nguyễn Văn An`; `email=fr01.password.lower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | EC16, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu yếu. |
| EP-FR01-016 | Từ chối khi mật khẩu thiếu chữ số. | `name=Nguyễn Văn An`; `email=fr01.password.digit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | EC17, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu yếu. |
| EP-FR01-017 | Từ chối khi mật khẩu thiếu ký tự đặc biệt thuộc tập cho phép. | `name=Nguyễn Văn An`; `email=fr01.password.special@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | EC18, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu yếu. |
| EP-FR01-018 | Từ chối khi mật khẩu chỉ có ký tự đặc biệt ngoài tập yêu cầu. | `name=Nguyễn Văn An`; `email=fr01.password.hash@example.com`; `password=Aa12345#`; `confirmPassword=Aa12345#` | EC19, EC20, EC24, EC27 | Không tạo tài khoản; báo lỗi mật khẩu chưa thỏa điều kiện ký tự đặc biệt theo FR-01. |
| EP-FR01-019 | Từ chối khi xác nhận mật khẩu rỗng trên giao diện. | `name=Nguyễn Văn An`; `email=fr01.confirm.empty@example.com`; `password=Aa12345!`; `confirmPassword=` | EC21, EC24, EC27 | Không tạo tài khoản; báo lỗi xác nhận mật khẩu bắt buộc. |
| EP-FR01-020 | Từ chối khi xác nhận mật khẩu không khớp. | `name=Nguyễn Văn An`; `email=fr01.confirm.mismatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | EC22, EC24, EC27 | Không tạo tài khoản; báo lỗi hai mật khẩu không khớp. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `name` | Độ dài chuỗi | Có, giới hạn ở biên tối thiểu | FR-01 yêu cầu bắt buộc nên có biên `length=0` và `length=1`; không có biên tối đa được đặc tả. |
| `email` | Độ dài chuỗi và mẫu định dạng | Có, giới hạn ở biên rỗng/không rỗng | Điều kiện bắt buộc có biên `length=0`; cấu trúc email và tính duy nhất là miền rời rạc, phù hợp EP hơn BVA. |
| `password` | Độ dài chuỗi và số lượng nhóm ký tự bắt buộc | Có | FR-01 quy định rõ độ dài tối thiểu 8 ký tự và ngưỡng tối thiểu 1 cho từng nhóm ký tự bắt buộc. |
| `confirmPassword` | Độ dài chuỗi và quan hệ bằng nhau với `password` | Có, giới hạn ở biên rỗng/không rỗng | Có biên rỗng/không rỗng; quan hệ khớp/không khớp là quan hệ rời rạc nên được bao phủ chính bằng EP. |
| Tạo tài khoản | Trạng thái nghiệp vụ | Không | Tạo/không tạo là trạng thái rời rạc, không phải miền có thứ tự. |
| Phản hồi thành công API | Trạng thái phản hồi | Không | `200 OK` và body thành công là trạng thái rời rạc. |
| Điều hướng UI | Trạng thái UI | Không | Chuyển trang/không chuyển trang là trạng thái rời rạc. |
| Phản hồi lỗi | Tập lỗi theo điều kiện | Không | Các lỗi là tập trạng thái rời rạc, phù hợp EP. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá trị biên |
| --- | --- | --- |
| `name` | Biên tối thiểu: không được rỗng. | `length=0`; `length=1`; giá trị chỉ khoảng trắng được kiểm riêng theo giả định dữ liệu người dùng. |
| `email` | Biên tối thiểu: không được rỗng. | `length=0`; email hợp lệ ngắn đại diện `a@b.co`; các biến thể sai định dạng đã nằm trong EP. |
| `password` | Biên độ dài tối thiểu là 8 ký tự. | `length=7`; `length=8`; `length=9`. |
| `password` | Biên số lượng chữ hoa tối thiểu là 1. | 0 chữ hoa; 1 chữ hoa. |
| `password` | Biên số lượng chữ thường tối thiểu là 1. | 0 chữ thường; 1 chữ thường. |
| `password` | Biên số lượng chữ số tối thiểu là 1. | 0 chữ số; 1 chữ số. |
| `password` | Biên số lượng ký tự đặc biệt thuộc tập cho phép tối thiểu là 1. | 0 ký tự đặc biệt thuộc tập cho phép; 1 ký tự đặc biệt thuộc tập cho phép. |
| `confirmPassword` | Biên tối thiểu: không được rỗng. | `length=0`; `length=8` khi khớp mật khẩu hợp lệ tối thiểu. |
| `confirmPassword` | Biên quan hệ bằng nhau với `password`. | Khớp toàn bộ; khác đúng 1 ký tự cuối. |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR01-001 | `name` | `length=0` | `name=`; `email=fr01.bv.name0@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi họ tên bắt buộc; không tạo tài khoản. |
| BV-FR01-002 | `name` | `length=1` | `name=A`; `email=fr01.bv.name1@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu hệ thống không có yêu cầu độ dài tối thiểu lớn hơn 1; tạo tài khoản và chuyển tới trang Đăng nhập. |
| BV-FR01-003 | `name` | Chỉ khoảng trắng | `name=   `; `email=fr01.bv.namespace@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký theo giả định dữ liệu người dùng chưa được cung cấp; không tạo tài khoản. |
| BV-FR01-004 | `email` | `length=0` | `name=Nguyễn Văn An`; `email=`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Từ chối đăng ký; báo lỗi email bắt buộc; không tạo tài khoản. |
| BV-FR01-005 | `email` | Không rỗng và hợp lệ ngắn | `name=Nguyễn Văn An`; `email=a@b.co`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận nếu email chưa tồn tại; tạo tài khoản và chuyển tới trang Đăng nhập. |
| BV-FR01-006 | `password` | `min-1`, `length=7` | `name=Nguyễn Văn An`; `email=fr01.bv.password7@example.com`; `password=Aa1234!`; `confirmPassword=Aa1234!` | Từ chối đăng ký; báo lỗi mật khẩu tối thiểu 8 ký tự; không tạo tài khoản. |
| BV-FR01-007 | `password` | `min`, `length=8` | `name=Nguyễn Văn An`; `email=fr01.bv.password8@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu vì đủ 8 ký tự và đủ nhóm ký tự; tạo tài khoản nếu email chưa tồn tại. |
| BV-FR01-008 | `password` | `min+1`, `length=9` | `name=Nguyễn Văn An`; `email=fr01.bv.password9@example.com`; `password=Aa123456!`; `confirmPassword=Aa123456!` | Chấp nhận mật khẩu; tạo tài khoản nếu email chưa tồn tại. |
| BV-FR01-009 | `password` | 0 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.noupper@example.com`; `password=aa12345!`; `confirmPassword=aa12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo tài khoản. |
| BV-FR01-010 | `password` | 1 chữ hoa | `name=Nguyễn Văn An`; `email=fr01.bv.oneupper@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-011 | `password` | 0 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.nolower@example.com`; `password=AA12345!`; `confirmPassword=AA12345!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo tài khoản. |
| BV-FR01-012 | `password` | 1 chữ thường | `name=Nguyễn Văn An`; `email=fr01.bv.onelower@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-013 | `password` | 0 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.nodigit@example.com`; `password=Aaaaaaa!`; `confirmPassword=Aaaaaaa!` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo tài khoản. |
| BV-FR01-014 | `password` | 1 chữ số | `name=Nguyễn Văn An`; `email=fr01.bv.onedigit@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu các nhóm ký tự khác hợp lệ. |
| BV-FR01-015 | `password` | 0 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.nospecial@example.com`; `password=Aa123456`; `confirmPassword=Aa123456` | Từ chối đăng ký; báo lỗi mật khẩu yếu; không tạo tài khoản. |
| BV-FR01-016 | `password` | 1 ký tự đặc biệt thuộc tập cho phép | `name=Nguyễn Văn An`; `email=fr01.bv.onespecial@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận mật khẩu nếu email chưa tồn tại. |
| BV-FR01-017 | `confirmPassword` | `length=0` | `name=Nguyễn Văn An`; `email=fr01.bv.confirm0@example.com`; `password=Aa12345!`; `confirmPassword=` | Từ chối đăng ký; báo lỗi xác nhận mật khẩu bắt buộc; không tạo tài khoản. |
| BV-FR01-018 | `confirmPassword` | Khớp tuyệt đối với `password` | `name=Nguyễn Văn An`; `email=fr01.bv.confirmmatch@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345!` | Chấp nhận xác nhận mật khẩu; tạo tài khoản nếu các input khác hợp lệ. |
| BV-FR01-019 | `confirmPassword` | Khác đúng 1 ký tự cuối | `name=Nguyễn Văn An`; `email=fr01.bv.confirmdiff@example.com`; `password=Aa12345!`; `confirmPassword=Aa12345?` | Từ chối đăng ký; báo lỗi hai mật khẩu không khớp; không tạo tài khoản. |

## 5. Ghi chú rủi ro

- `eshop-sut/README.md` yêu cầu có trường **Xác nhận mật khẩu**, nhưng `eshop-sut/api_specification.md` mô tả `POST /api/register` chỉ nhận `name`, `email`, `password`; khi thực thi cần xác nhận `confirmPassword` chỉ được kiểm ở UI hay là thiếu trong API contract.
- FR-01 không nêu độ dài tối đa cho `name`, `email`, `password`, nên artifact không tạo ca BVA cho biên tối đa.
- FR-01 nêu email hợp lệ dạng `user@domain.com` nhưng không định nghĩa regex đầy đủ; các lớp email sai định dạng trong EP là đại diện, không phải danh sách toàn bộ biến thể email sai.
- FR-01 không nêu rõ cách xử lý khoảng trắng đầu/cuối. Các ca `name=   ` được đánh dấu theo giả định cần người học rà soát khi thực thi.
- API specification chỉ nêu phản hồi thành công `200 OK`; tài liệu không nêu status code/thông báo lỗi cụ thể cho dữ liệu không hợp lệ, nên expected result của ca lỗi chỉ khẳng định hành vi quan sát được ở mức nghiệp vụ: từ chối đăng ký và không tạo tài khoản.
- Các ca kiểm thử trong artifact này đang ở trạng thái thiết kế; khi thực thi cần bổ sung actual result, status, và evidence path theo yêu cầu báo cáo.
```

- Human Review/Corrections:

  - Ở password chưa check tất cả kí tự đặc biệt trong tập yêu cầu trong đặc tả. Có khả năng thể hệ thống sẽ không nhận ít nhất 1 trong các ki tự trong tập nên phải kiểm tra từng kí tự.
  - Sửa cột 3 phần `B2. Xác định biên và giá trị cận biên` từ Giá trị biên thành Giá trị biên và cận biên.
  - Với các điều kiện `password` có ngưỡng “tối thiểu 1”, bổ sung đủ bộ cận biên: 0, 1, 2
  - Đối với confirmPassword, giá trị biên và cận biên phải là:
    - Không rỗng: $length \in \{0; 1\}$
    - Khớp với password: Khớp hoàn toàn với `password`; khác/dư/thiếu 1 ký tự so với `password`.
- Final Use in Submission: `[Manual by user]`

### Entry 021
- Time: `2026-07-07 22:22 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật lại skill để output [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) là ở B2. Xác định biên và giá trị cận biên, bảng gồm 3 cột với title lần lượt là Trường, Quy tắc biên, Giá Trị biên và cận biên
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md và .agents/skills/applying-domain-testing/references/boundary-value-analysis.md để bảng B2 dùng đúng 3 cột: Trường, Quy tắc biên, Giá Trị biên và cận biên. Đã chạy quick_validate.py cho skill applying-domain-testing và kết quả là Skill is valid!
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 022
- Time: `2026-07-07 23:17 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Apply domain testing for Pool B FR-07: Shopping cart (mentioned in requirements/2026.HW02.Domain Testing_En.md) for eshop-sut project (Please read the specifications including: eshop-sut/README, eshop-sut/api_specification.md,  in the folder eshop-sut). The output for this feature will be added into folder ./domain-testing
- Output:

```text
# FR-07: Shopping cart - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` |
| SUT | EShop - Frontend Web, Frontend Mobile, Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-07: Giỏ hàng (Shopping Cart)`, `FR-06: Xem chi tiết sản phẩm`, `FR-21: Tiêu chuẩn Giao diện Chung`; `eshop-sut/api_specification.md` mục `4. Giỏ hàng & Đơn hàng`, `4.1 Lấy giỏ hàng`, `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình Giỏ hàng; luồng Thêm vào giỏ hàng từ chi tiết sản phẩm; endpoint `GET /api/cart`; endpoint `POST /api/cart` với body gồm `id`, `name`, `price`, `quantity`; header `Authorization: Bearer <token>` theo API specification |
| Phạm vi kiểm thử | Thiết kế ca kiểm thử Domain Testing gồm phân hoạch tương đương và phân tích giá trị biên cho hành vi giỏ hàng: xem giỏ hàng, thêm sản phẩm, cộng dồn sản phẩm trùng, tăng/giảm số lượng, xóa sản phẩm có xác nhận, tổng tiền, nhãn tổng tiền, trạng thái giỏ trống và điều hướng tiếp tục mua sắm. Oracle chính là đặc tả README/API, không dựa trên mã nguồn triển khai. |
| Ngoài phạm vi | Không kiểm thử thanh toán FR-08, mã giảm giá FR-09, trạng thái đơn hàng, quản trị sản phẩm, tồn kho, bảo mật lưu trữ phía client, hiệu năng, đồng bộ đa thiết bị, hoặc triển khai database. |
| Giả định/ràng buộc thiếu | API specification không mô tả endpoint cập nhật số lượng hoặc xóa sản phẩm khỏi giỏ, trong khi FR-07 yêu cầu nút `+/-` và `Xóa sản phẩm`; artifact thiết kế theo hành vi quan sát được trên UI và ghi rủi ro cho phần API thiếu contract. FR-07 không nêu số lượng tối đa, số dòng tối đa, giới hạn giá trị `price`, hành vi khi bấm `-` tại `quantity=1`, hay thông báo lỗi/status code cụ thể. Dựa trên FR-06, số lượng đưa vào giỏ được giả định là số nguyên dương, tối thiểu 1. Dữ liệu sản phẩm hợp lệ được giả định là sản phẩm có trong danh sách/chi tiết sản phẩm của hệ thống. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung actual result, status, và evidence path sau khi chạy kiểm thử. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Token JWT gửi qua header `Authorization: Bearer <token>` khi gọi API giỏ hàng theo API specification. |
| Đầu vào | Trạng thái giỏ hàng hiện tại | Giỏ hàng có thể rỗng, có một dòng sản phẩm, có nhiều dòng sản phẩm, hoặc đã có sẵn sản phẩm trùng với sản phẩm sắp thêm. |
| Đầu vào | `id` | Mã sản phẩm trong body `POST /api/cart`; dùng để nhận diện sản phẩm và quyết định cộng dồn khi thêm cùng sản phẩm. |
| Đầu vào | `name` | Tên sản phẩm trong body `POST /api/cart` và cột `Sản phẩm` trên giao diện giỏ hàng. |
| Đầu vào | `price` | Đơn giá sản phẩm trong body `POST /api/cart`; dùng hiển thị cột `Đơn giá` và tính thành tiền/tổng tiền. |
| Đầu vào | `quantity` | Số lượng sản phẩm thêm vào giỏ hoặc số lượng đang hiển thị trong dòng giỏ hàng; theo FR-06, chỉ nhận số nguyên dương, tối thiểu 1. |
| Đầu vào | Hành động `+` | Người dùng tăng số lượng của một dòng sản phẩm trong giỏ hàng. |
| Đầu vào | Hành động `-` | Người dùng giảm số lượng của một dòng sản phẩm trong giỏ hàng. |
| Đầu vào | Hành động `Xóa sản phẩm` | Người dùng yêu cầu xóa một dòng sản phẩm khỏi giỏ hàng. |
| Đầu vào | Quyết định trong dialog xác nhận | Người dùng xác nhận hoặc hủy thao tác xóa sản phẩm. |
| Đầu vào | Hành động `Tiếp tục mua sắm` | Người dùng quay về trang chủ từ màn hình giỏ hàng. |
| Đầu ra | Danh sách sản phẩm trong giỏ | Khi giỏ không rỗng, hiển thị các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. |
| Đầu ra | Dòng sản phẩm trong giỏ | Mỗi sản phẩm khác nhau hiển thị một dòng; thêm cùng sản phẩm chỉ tăng số lượng, không tạo dòng mới. |
| Đầu ra | `Thành tiền` | Giá trị mỗi dòng bằng `Đơn giá × Số lượng`, hiển thị tiền tệ theo FR-21. |
| Đầu ra | Tổng tiền | Tổng các `Thành tiền`, hiển thị với nhãn chính xác `"Tổng cộng"`. |
| Đầu ra | Dialog xác nhận xóa | Hệ thống hiển thị dialog xác nhận trước khi xóa sản phẩm. |
| Đầu ra | Trạng thái giỏ hàng trống | Khi không có sản phẩm, hiển thị hình minh họa và thông báo rõ ràng. |
| Đầu ra | Điều hướng về trang chủ | Khi bấm `Tiếp tục mua sắm`, người dùng được đưa về trang chủ. |
| Đầu ra | Phản hồi lỗi/từ chối | Với token không hợp lệ hoặc dữ liệu giỏ hàng không hợp lệ, hệ thống từ chối thao tác, không cập nhật giỏ hàng sai. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | API giỏ hàng yêu cầu header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ để truy cập `GET /api/cart` và `POST /api/cart`. |
| C3 | Trạng thái giỏ hàng hiện tại | Khi giỏ hàng rỗng, giao diện phải hiển thị trạng thái giỏ trống. |
| C4 | Trạng thái giỏ hàng hiện tại | Khi giỏ hàng không rỗng, giao diện phải hiển thị danh sách sản phẩm trong giỏ. |
| C5 | Danh sách sản phẩm trong giỏ | Danh sách phải có các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. |
| C6 | `id` | Sản phẩm thêm vào giỏ phải có `id` theo body `POST /api/cart`. |
| C7 | `name` | Sản phẩm thêm vào giỏ phải có `name` để hiển thị ở cột `Sản phẩm`. |
| C8 | `price` | Sản phẩm thêm vào giỏ phải có `price` để hiển thị `Đơn giá` và tính tiền. |
| C9 | `quantity` | `quantity` phải là số nguyên. |
| C10 | `quantity` | `quantity` phải là số nguyên dương. |
| C11 | `quantity` | `quantity` tối thiểu là 1 theo FR-06. |
| C12 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm chưa có trong giỏ tạo một dòng sản phẩm mới. |
| C13 | Trạng thái sản phẩm trong giỏ | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng của dòng hiện có, không tạo dòng mới. |
| C14 | Hành động `+` | Bấm `+` phải tăng số lượng sản phẩm trong dòng giỏ hàng. |
| C15 | Hành động `-` | Bấm `-` phải giảm số lượng khi số lượng hiện tại lớn hơn 1. |
| C16 | Hành động `-` | Số lượng không được giảm xuống dưới 1; nếu muốn loại bỏ sản phẩm, người dùng phải dùng thao tác xóa theo giả định từ FR-07. |
| C17 | Hành động `Xóa sản phẩm` | Bấm `Xóa sản phẩm` phải hiển thị dialog xác nhận trước khi thực hiện xóa. |
| C18 | Quyết định trong dialog xác nhận | Nếu người dùng xác nhận xóa, sản phẩm bị xóa khỏi giỏ. |
| C19 | Quyết định trong dialog xác nhận | Nếu người dùng hủy dialog, sản phẩm vẫn còn trong giỏ và số lượng không đổi. |
| C20 | `Thành tiền` | `Thành tiền` của từng dòng phải bằng `Đơn giá × Số lượng`. |
| C21 | Tổng tiền | Tổng tiền phải bằng tổng tất cả `Thành tiền` trong giỏ. |
| C22 | Tổng tiền | Nhãn tổng tiền phải hiển thị chính xác là `"Tổng cộng"`. |
| C23 | Hiển thị tiền tệ | Giá tiền phải dùng ký hiệu `₫` và định dạng phân cách hàng nghìn theo FR-21. |
| C24 | Trạng thái giỏ hàng trống | Giỏ hàng trống phải có hình minh họa. |
| C25 | Trạng thái giỏ hàng trống | Giỏ hàng trống phải có thông báo rõ ràng. |
| C26 | Hành động `Tiếp tục mua sắm` | Bấm `Tiếp tục mua sắm` phải quay về trang chủ. |
| C27 | Phản hồi lỗi/từ chối | Với dữ liệu thêm vào giỏ không hợp lệ, hệ thống phải từ chối cập nhật giỏ hàng. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token | Header `Authorization` có token JWT hợp lệ. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép gọi `GET /api/cart` và `POST /api/cart`. |
| EC02 | `Authorization` token | Thiếu header `Authorization`. | Không | Không gửi header | Từ chối truy cập API giỏ hàng; không trả/cập nhật giỏ hàng cho người dùng. |
| EC03 | `Authorization` token | Header có token sai định dạng hoặc không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối truy cập API giỏ hàng; không trả/cập nhật giỏ hàng cho người dùng. |
| EC04 | Trạng thái giỏ hàng hiện tại | Giỏ hàng rỗng. | Có | Không có dòng sản phẩm | Hiển thị hình minh họa và thông báo giỏ hàng trống rõ ràng. |
| EC05 | Trạng thái giỏ hàng hiện tại | Giỏ hàng có một hoặc nhiều sản phẩm. | Có | 2 dòng: `id=1`, `id=2` | Hiển thị danh sách sản phẩm với đủ cột theo FR-07. |
| EC06 | Danh sách sản phẩm trong giỏ | Danh sách hiển thị đủ cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`. | Có | Bảng giỏ hàng đủ 5 cột | Người dùng quan sát được đầy đủ thông tin và thao tác giỏ hàng. |
| EC07 | Danh sách sản phẩm trong giỏ | Danh sách thiếu một hoặc nhiều cột bắt buộc. | Không | Thiếu cột `Thành tiền` | Không đạt FR-07; cần ghi nhận lỗi giao diện. |
| EC08 | `id` | Body thêm giỏ có `id` của sản phẩm hợp lệ. | Có | `id=1` | Chấp nhận định danh sản phẩm để tạo/cập nhật dòng giỏ hàng. |
| EC09 | `id` | Body thêm giỏ thiếu `id`. | Không | Không có `id` | Từ chối thêm vào giỏ; không tạo dòng sản phẩm không định danh. |
| EC10 | `id` | `id` không thuộc sản phẩm hợp lệ trong hệ thống. | Không | `id=999999` | Từ chối thêm vào giỏ theo giả định sản phẩm phải tồn tại; không cập nhật giỏ hàng. |
| EC11 | `name` | Body thêm giỏ có `name` không rỗng. | Có | `name="Sản phẩm A"` | Chấp nhận tên sản phẩm để hiển thị trong giỏ. |
| EC12 | `name` | Body thêm giỏ thiếu hoặc rỗng `name`. | Không | `name=""` | Từ chối thêm vào giỏ; không hiển thị dòng sản phẩm thiếu tên. |
| EC13 | `price` | Body thêm giỏ có `price` là đơn giá hợp lệ của sản phẩm. | Có | `price=100000` | Chấp nhận đơn giá để hiển thị và tính tiền. |
| EC14 | `price` | Body thêm giỏ thiếu `price`. | Không | Không có `price` | Từ chối thêm vào giỏ; không thể tính `Thành tiền`. |
| EC15 | `price` | `price` không phải số. | Không | `price="100000"` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng bằng dữ liệu giá sai kiểu. |
| EC16 | `quantity` | `quantity` là số nguyên dương, tối thiểu 1. | Có | `quantity=2` | Chấp nhận số lượng; thêm/cập nhật giỏ hàng. |
| EC17 | `quantity` | `quantity` thiếu. | Không | Không có `quantity` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC18 | `quantity` | `quantity` không phải số nguyên. | Không | `quantity=1.5` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC19 | `quantity` | `quantity` bằng 0. | Không | `quantity=0` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC20 | `quantity` | `quantity` là số âm. | Không | `quantity=-1` | Từ chối thêm vào giỏ; không cập nhật giỏ hàng. |
| EC21 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm chưa có trong giỏ. | Có | Giỏ chưa có `id=1`, thêm `id=1, quantity=2` | Tạo một dòng mới cho sản phẩm `id=1` với số lượng 2. |
| EC22 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm đã có trong giỏ. | Có | Giỏ đã có `id=1, quantity=2`, thêm `id=1, quantity=3` | Dòng `id=1` có số lượng mới là 5; không tạo dòng trùng. |
| EC23 | Trạng thái sản phẩm trong giỏ | Thêm sản phẩm khác với sản phẩm đang có trong giỏ. | Có | Giỏ có `id=1`, thêm `id=2` | Tạo thêm dòng mới cho `id=2`; dòng `id=1` giữ nguyên. |
| EC24 | Hành động `+` | Bấm `+` trên dòng sản phẩm hợp lệ. | Có | `quantity=2`, bấm `+` | Số lượng tăng lên 3; `Thành tiền` và tổng tiền được tính lại. |
| EC25 | Hành động `-` | Bấm `-` khi số lượng hiện tại lớn hơn 1. | Có | `quantity=2`, bấm `-` | Số lượng giảm xuống 1; `Thành tiền` và tổng tiền được tính lại. |
| EC26 | Hành động `-` | Bấm `-` khi số lượng hiện tại bằng 1. | Không | `quantity=1`, bấm `-` | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa dùng thao tác xóa có xác nhận. |
| EC27 | Hành động `Xóa sản phẩm` | Bấm xóa và hệ thống hiển thị dialog xác nhận trước khi xóa. | Có | Bấm `Xóa sản phẩm` trên dòng `id=1` | Dialog xác nhận xuất hiện; chưa xóa sản phẩm trước khi người dùng quyết định. |
| EC28 | Quyết định trong dialog xác nhận | Người dùng xác nhận xóa. | Có | Chọn xác nhận trong dialog | Dòng sản phẩm bị xóa khỏi giỏ; tổng tiền được tính lại; nếu hết sản phẩm thì hiển thị giỏ trống. |
| EC29 | Quyết định trong dialog xác nhận | Người dùng hủy xóa. | Có | Chọn hủy trong dialog | Dòng sản phẩm vẫn còn trong giỏ; số lượng và tổng tiền không đổi. |
| EC30 | Dialog xác nhận xóa | Xóa sản phẩm không có dialog xác nhận. | Không | Bấm xóa và sản phẩm biến mất ngay | Không đạt FR-07; cần ghi nhận lỗi vì thiếu xác nhận trước khi thực hiện. |
| EC31 | `Thành tiền` | `Thành tiền` đúng bằng `Đơn giá × Số lượng`. | Có | `price=100000`, `quantity=2`, `Thành tiền=200000` | Hiển thị thành tiền chính xác, có định dạng tiền tệ. |
| EC32 | `Thành tiền` | `Thành tiền` khác `Đơn giá × Số lượng`. | Không | `price=100000`, `quantity=2`, `Thành tiền=100000` | Không đạt yêu cầu tính tiền; cần ghi nhận lỗi. |
| EC33 | Tổng tiền | Tổng tiền đúng bằng tổng các `Thành tiền`. | Có | `200000 + 150000 = 350000` | Hiển thị tổng tiền chính xác. |
| EC34 | Tổng tiền | Tổng tiền khác tổng các `Thành tiền`. | Không | Thành tiền `200000` và `150000`, tổng hiển thị `200000` | Không đạt yêu cầu tính tổng; cần ghi nhận lỗi. |
| EC35 | Tổng tiền | Nhãn tổng tiền chính xác là `"Tổng cộng"`. | Có | Label `"Tổng cộng"` | Đạt FR-07 về nhãn tổng tiền. |
| EC36 | Tổng tiền | Nhãn tổng tiền sai, ví dụ `"Tổng tạm tính"`. | Không | Label `"Tổng tạm tính"` | Không đạt FR-07; cần ghi nhận lỗi nhãn. |
| EC37 | Hiển thị tiền tệ | Giá tiền dùng ký hiệu `₫` và phân cách hàng nghìn. | Có | `100.000 ₫` | Đạt FR-21 về đơn vị tiền. |
| EC38 | Hiển thị tiền tệ | Giá tiền thiếu ký hiệu `₫` hoặc thiếu phân cách hàng nghìn. | Không | `100000` | Không đạt FR-21; cần ghi nhận lỗi hiển thị tiền tệ. |
| EC39 | Trạng thái giỏ hàng trống | Giỏ trống có hình minh họa và thông báo rõ ràng. | Có | Hình minh họa + text `Giỏ hàng trống` | Người dùng hiểu giỏ hàng hiện không có sản phẩm. |
| EC40 | Trạng thái giỏ hàng trống | Giỏ trống thiếu hình minh họa. | Không | Chỉ hiển thị text | Không đạt FR-07; cần ghi nhận thiếu hình minh họa. |
| EC41 | Trạng thái giỏ hàng trống | Giỏ trống thiếu thông báo rõ ràng. | Không | Chỉ hiển thị vùng trống/hình không có text | Không đạt FR-07; cần ghi nhận thiếu thông báo. |
| EC42 | Hành động `Tiếp tục mua sắm` | Bấm `Tiếp tục mua sắm`. | Có | Click button trên trang giỏ hàng | Điều hướng về trang chủ. |
| EC43 | Hành động `Tiếp tục mua sắm` | Button `Tiếp tục mua sắm` thiếu hoặc không điều hướng về trang chủ. | Không | Không có button hoặc click không đổi trang | Không đạt FR-07; cần ghi nhận lỗi điều hướng. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| EP-FR07-001 | Truy cập API giỏ hàng với token hợp lệ. | `GET /api/cart`; `Authorization: Bearer <valid_user_token>` | EC01 | API cho phép truy cập giỏ hàng của user đang đăng nhập. |
| EP-FR07-002 | Từ chối API giỏ hàng khi thiếu token. | `GET /api/cart`; không gửi header `Authorization` | EC02 | API từ chối truy cập; không trả giỏ hàng người dùng. |
| EP-FR07-003 | Từ chối API giỏ hàng khi token không hợp lệ. | `GET /api/cart`; `Authorization: Bearer invalid.token` | EC03 | API từ chối truy cập; không trả giỏ hàng người dùng. |
| EP-FR07-004 | Hiển thị giỏ hàng trống đúng yêu cầu. | User hợp lệ có giỏ hàng rỗng; mở màn hình Giỏ hàng | EC04, EC39 | Giao diện hiển thị hình minh họa và thông báo giỏ hàng trống rõ ràng. |
| EP-FR07-005 | Hiển thị giỏ hàng không rỗng với đủ cột bắt buộc. | Giỏ có `id=1, name="Sản phẩm A", price=100000, quantity=2` | EC05, EC06, EC31, EC33, EC35, EC37 | Bảng giỏ hàng có đủ cột; thành tiền `200.000 ₫`; tổng tiền nhãn `"Tổng cộng"` và giá trị `200.000 ₫`. |
| EP-FR07-006 | Phát hiện danh sách giỏ hàng thiếu cột bắt buộc. | Giỏ không rỗng nhưng UI thiếu cột `Thành tiền` | EC07 | Không đạt FR-07; ghi nhận lỗi giao diện thiếu cột bắt buộc. |
| EP-FR07-007 | Thêm sản phẩm hợp lệ chưa có trong giỏ. | `POST /api/cart`; token hợp lệ; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}`; giỏ chưa có `id=1` | EC01, EC08, EC11, EC13, EC16, EC21 | Giỏ tạo một dòng `id=1` với số lượng 2; thành tiền và tổng tiền được tính đúng. |
| EP-FR07-008 | Từ chối thêm sản phẩm khi thiếu `id`. | Body `{"name":"Sản phẩm A","price":100000,"quantity":2}` | EC09 | Từ chối thêm vào giỏ; không tạo dòng sản phẩm không định danh. |
| EP-FR07-009 | Từ chối thêm sản phẩm với `id` không hợp lệ. | Body `{"id":999999,"name":"Sản phẩm không tồn tại","price":100000,"quantity":2}` | EC10 | Từ chối thêm vào giỏ theo giả định sản phẩm phải tồn tại; giỏ hàng không đổi. |
| EP-FR07-010 | Từ chối thêm sản phẩm khi thiếu/rỗng `name`. | Body `{"id":1,"name":"","price":100000,"quantity":2}` | EC12 | Từ chối thêm vào giỏ; không hiển thị dòng sản phẩm thiếu tên. |
| EP-FR07-011 | Từ chối thêm sản phẩm khi thiếu `price`. | Body `{"id":1,"name":"Sản phẩm A","quantity":2}` | EC14 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-012 | Từ chối thêm sản phẩm khi `price` sai kiểu. | Body `{"id":1,"name":"Sản phẩm A","price":"100000","quantity":2}` | EC15 | Từ chối thêm vào giỏ; không tính tiền bằng dữ liệu giá sai kiểu. |
| EP-FR07-013 | Từ chối thêm sản phẩm khi thiếu `quantity`. | Body `{"id":1,"name":"Sản phẩm A","price":100000}` | EC17 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-014 | Từ chối thêm sản phẩm khi `quantity` không nguyên. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1.5}` | EC18 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-015 | Từ chối thêm sản phẩm khi `quantity=0`. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}` | EC19 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-016 | Từ chối thêm sản phẩm khi `quantity` âm. | Body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":-1}` | EC20 | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| EP-FR07-017 | Thêm cùng sản phẩm phải cộng dồn số lượng, không tạo dòng mới. | Giỏ đã có `id=1, quantity=2`; thêm body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":3}` | EC22 | Giỏ vẫn chỉ có một dòng `id=1`; số lượng thành 5; thành tiền `500.000 ₫`. |
| EP-FR07-018 | Thêm sản phẩm khác tạo dòng mới và giữ dòng cũ. | Giỏ có `id=1, quantity=2`; thêm body `{"id":2,"name":"Sản phẩm B","price":150000,"quantity":1}` | EC23 | Giỏ có hai dòng `id=1` và `id=2`; dòng cũ giữ nguyên; tổng tiền được tính lại. |
| EP-FR07-019 | Tăng số lượng bằng nút `+`. | Giỏ có dòng `id=1, price=100000, quantity=2`; bấm `+` | EC24, EC31, EC33 | Số lượng thành 3; thành tiền `300.000 ₫`; tổng tiền cập nhật tương ứng. |
| EP-FR07-020 | Giảm số lượng bằng nút `-` khi số lượng lớn hơn 1. | Giỏ có dòng `id=1, price=100000, quantity=2`; bấm `-` | EC25, EC31, EC33 | Số lượng thành 1; thành tiền `100.000 ₫`; tổng tiền cập nhật tương ứng. |
| EP-FR07-021 | Không cho số lượng giảm dưới 1 bằng nút `-`. | Giỏ có dòng `id=1, quantity=1`; bấm `-` | EC26 | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa qua thao tác xóa có xác nhận. |
| EP-FR07-022 | Xóa sản phẩm phải hiển thị dialog trước khi thực hiện. | Giỏ có `id=1`; bấm `Xóa sản phẩm` | EC27 | Dialog xác nhận xuất hiện; sản phẩm chưa bị xóa trước khi người dùng xác nhận. |
| EP-FR07-023 | Xác nhận xóa sản phẩm. | Sau `EP-FR07-022`, chọn xác nhận trong dialog | EC28 | Dòng sản phẩm bị xóa; tổng tiền cập nhật; nếu giỏ hết sản phẩm thì hiển thị trạng thái giỏ trống. |
| EP-FR07-024 | Hủy xóa sản phẩm. | Sau `EP-FR07-022`, chọn hủy trong dialog | EC29 | Dòng sản phẩm vẫn còn; số lượng và tổng tiền không đổi. |
| EP-FR07-025 | Phát hiện lỗi xóa không có dialog xác nhận. | Bấm `Xóa sản phẩm` và dòng bị xóa ngay | EC30 | Không đạt FR-07; ghi nhận lỗi thiếu dialog xác nhận. |
| EP-FR07-026 | Kiểm tra sai lệch `Thành tiền`. | Giỏ có `price=100000`, `quantity=2`, UI hiển thị `Thành tiền=100.000 ₫` | EC32 | Không đạt yêu cầu tính tiền; ghi nhận lỗi vì thành tiền phải là `200.000 ₫`. |
| EP-FR07-027 | Kiểm tra sai lệch tổng tiền. | Giỏ có thành tiền `200.000 ₫` và `150.000 ₫`, UI hiển thị tổng `200.000 ₫` | EC34 | Không đạt yêu cầu tính tổng; ghi nhận lỗi vì tổng phải là `350.000 ₫`. |
| EP-FR07-028 | Kiểm tra nhãn tổng tiền chính xác. | Giỏ không rỗng, quan sát vùng tổng tiền | EC35 | Nhãn hiển thị chính xác `"Tổng cộng"`. |
| EP-FR07-029 | Phát hiện nhãn tổng tiền sai. | Giỏ không rỗng, UI hiển thị nhãn `"Tổng tạm tính"` | EC36 | Không đạt FR-07; ghi nhận lỗi nhãn tổng tiền. |
| EP-FR07-030 | Kiểm tra định dạng tiền tệ hợp lệ. | `price=100000`, `quantity=2`; quan sát `Đơn giá`, `Thành tiền`, tổng tiền | EC37 | Các giá trị tiền dùng ký hiệu `₫` và phân cách hàng nghìn, ví dụ `100.000 ₫`, `200.000 ₫`. |
| EP-FR07-031 | Phát hiện định dạng tiền tệ sai. | UI hiển thị `100000` thay vì `100.000 ₫` | EC38 | Không đạt FR-21; ghi nhận lỗi hiển thị tiền tệ. |
| EP-FR07-032 | Phát hiện giỏ trống thiếu hình minh họa. | User hợp lệ có giỏ rỗng; UI chỉ có text, không có hình | EC40 | Không đạt FR-07; ghi nhận thiếu hình minh họa cho giỏ trống. |
| EP-FR07-033 | Phát hiện giỏ trống thiếu thông báo rõ ràng. | User hợp lệ có giỏ rỗng; UI chỉ hiển thị hình/vùng trống không có text rõ nghĩa | EC41 | Không đạt FR-07; ghi nhận thiếu thông báo rõ ràng. |
| EP-FR07-034 | Điều hướng về trang chủ bằng `Tiếp tục mua sắm`. | Mở giỏ hàng; bấm `Tiếp tục mua sắm` | EC42 | Người dùng được điều hướng về trang chủ. |
| EP-FR07-035 | Phát hiện thiếu/hỏng `Tiếp tục mua sắm`. | Màn hình giỏ hàng thiếu button hoặc bấm button không về trang chủ | EC43 | Không đạt FR-07; ghi nhận lỗi điều hướng. |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `Authorization` token | Trạng thái hợp lệ/không hợp lệ | Không | Token là trạng thái xác thực rời rạc; phù hợp EP hơn BVA. |
| Trạng thái giỏ hàng hiện tại | Số dòng sản phẩm trong giỏ | Có, giới hạn ở biên rỗng/không rỗng | FR-07 có hành vi khác nhau giữa giỏ trống và giỏ không rỗng; biên quan trọng là `item_count=0` sang `item_count=1`. Không có số dòng tối đa được đặc tả. |
| `id` | Định danh/membership | Không | `id` là định danh sản phẩm; đặc tả không nêu miền số hoặc ngưỡng min/max cho `id`. |
| `name` | Chuỗi hiển thị | Không | FR-07/API chỉ yêu cầu có `name` trong body mẫu và hiển thị ở cột `Sản phẩm`; không nêu độ dài min/max riêng cho giỏ hàng. |
| `price` | Số tiền | Không | FR-07 dùng `price` để hiển thị/tính tiền nhưng không nêu giới hạn hợp lệ, min/max, hoặc ngưỡng giá cho giỏ hàng. |
| `quantity` | Số lượng | Có | FR-06 quy định số lượng là số nguyên dương, tối thiểu 1; FR-07 có nút `+/-` nên biên `quantity=1` là biên quan trọng. Không có biên tối đa được đặc tả. |
| Hành động `+` | Thay đổi số lượng | Có, theo số lượng sau thao tác | Bấm `+` chuyển số lượng từ `n` sang `n+1`; cần kiểm quanh biên tối thiểu 1. |
| Hành động `-` | Thay đổi số lượng | Có, theo số lượng trước/sau thao tác | Bấm `-` có rủi ro tại `quantity=1`; số lượng không được xuống 0 hoặc âm theo giả định từ yêu cầu số nguyên dương. |
| `Thành tiền` | Công thức số tiền | Có, theo biên số lượng | `Thành tiền = Đơn giá × Số lượng`; khi `quantity` ở biên 1/2, thành tiền và tổng tiền phải cập nhật đúng. |
| Tổng tiền | Tổng các dòng | Có, theo số dòng và số lượng | Tổng tiền phụ thuộc số dòng trong giỏ và số lượng từng dòng; biên `item_count=0`, `item_count=1`, `item_count=2` có ý nghĩa quan sát được. |
| Dialog xác nhận xóa | Trạng thái UI | Không | Xác nhận/hủy là trạng thái rời rạc; phù hợp EP hơn BVA. |
| Nhãn `"Tổng cộng"` | Chuỗi cố định | Không | Đây là điều kiện must-be chuỗi chính xác, không phải miền liên tục. |
| Trạng thái giỏ trống | Trạng thái UI | Không | Hình minh họa/thông báo là điều kiện hiện diện rời rạc. |
| Hành động `Tiếp tục mua sắm` | Điều hướng | Không | Điều hướng đúng/sai là trạng thái rời rạc. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Trạng thái giỏ hàng hiện tại | Biên số dòng sản phẩm: rỗng sang không rỗng. | `item_count=0`; `item_count=1`; `item_count=2`. |
| `quantity` khi thêm vào giỏ | Biên tối thiểu: số nguyên dương, tối thiểu 1. | `quantity=0` (`min-1`); `quantity=1` (`min`); `quantity=2` (`min+1`). |
| `quantity` kiểu số nguyên | Biên quanh tính nguyên của số lượng. | `quantity=1.5` (không nguyên); `quantity=1` (nguyên hợp lệ); `quantity=2` (nguyên hợp lệ). |
| Hành động `+` | Tăng số lượng quanh biên tối thiểu. | Trước thao tác `quantity=1`, sau `+` là `2`; trước thao tác `quantity=2`, sau `+` là `3`. |
| Hành động `-` | Giảm số lượng quanh biên tối thiểu. | Trước thao tác `quantity=2`, sau `-` là `1`; trước thao tác `quantity=1`, sau `-` không được là `0` hoặc âm. |
| `Thành tiền` | Công thức tại biên số lượng. | Với `price=100000`: `quantity=1` thì `Thành tiền=100000`; `quantity=2` thì `Thành tiền=200000`. |
| Tổng tiền | Tổng tại biên số dòng. | `item_count=0` thì tổng không có dòng sản phẩm; `item_count=1` tổng bằng thành tiền dòng đó; `item_count=2` tổng bằng tổng hai thành tiền. |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi |
| --- | --- | --- | --- | --- |
| BV-FR07-001 | Trạng thái giỏ hàng hiện tại | `item_count=0` | User hợp lệ có giỏ hàng rỗng; mở màn hình Giỏ hàng | Hiển thị trạng thái giỏ trống với hình minh họa và thông báo rõ ràng; không hiển thị dòng sản phẩm. |
| BV-FR07-002 | Trạng thái giỏ hàng hiện tại | `item_count=1` | Giỏ có 1 dòng: `id=1`, `price=100000`, `quantity=1` | Hiển thị bảng giỏ hàng đủ cột; tổng tiền bằng thành tiền của dòng duy nhất, nhãn `"Tổng cộng"`. |
| BV-FR07-003 | Trạng thái giỏ hàng hiện tại | `item_count=2` | Giỏ có 2 dòng: `id=1`, `price=100000`, `quantity=1`; `id=2`, `price=150000`, `quantity=1` | Hiển thị 2 dòng riêng biệt; tổng tiền `250.000 ₫`. |
| BV-FR07-004 | `quantity` khi thêm vào giỏ | `min-1`, `quantity=0` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":0}` | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| BV-FR07-005 | `quantity` khi thêm vào giỏ | `min`, `quantity=1` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1}` | Chấp nhận thêm vào giỏ nếu sản phẩm hợp lệ; dòng giỏ hàng có số lượng 1; thành tiền `100.000 ₫`. |
| BV-FR07-006 | `quantity` khi thêm vào giỏ | `min+1`, `quantity=2` | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":2}` | Chấp nhận thêm vào giỏ nếu sản phẩm hợp lệ; dòng giỏ hàng có số lượng 2; thành tiền `200.000 ₫`. |
| BV-FR07-007 | `quantity` kiểu số nguyên | Không nguyên sát miền hợp lệ | `POST /api/cart`; body `{"id":1,"name":"Sản phẩm A","price":100000,"quantity":1.5}` | Từ chối thêm vào giỏ; giỏ hàng không đổi. |
| BV-FR07-008 | Hành động `+` | Từ `quantity=1` lên `2` | Giỏ có dòng `id=1`, `price=100000`, `quantity=1`; bấm `+` | Số lượng thành 2; thành tiền `200.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-009 | Hành động `+` | Từ `quantity=2` lên `3` | Giỏ có dòng `id=1`, `price=100000`, `quantity=2`; bấm `+` | Số lượng thành 3; thành tiền `300.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-010 | Hành động `-` | Từ `quantity=2` về `1` | Giỏ có dòng `id=1`, `price=100000`, `quantity=2`; bấm `-` | Số lượng thành 1; thành tiền `100.000 ₫`; tổng tiền cập nhật. |
| BV-FR07-011 | Hành động `-` | Tại biên `quantity=1` | Giỏ có dòng `id=1`, `price=100000`, `quantity=1`; bấm `-` | Số lượng không xuống 0 hoặc âm; sản phẩm không bị xóa nếu chưa dùng dialog xác nhận xóa. |
| BV-FR07-012 | `Thành tiền` | Công thức tại `quantity=1` | Dòng giỏ hàng `price=100000`, `quantity=1` | `Thành tiền` hiển thị `100.000 ₫`; tổng tiền chứa giá trị này. |
| BV-FR07-013 | `Thành tiền` | Công thức tại `quantity=2` | Dòng giỏ hàng `price=100000`, `quantity=2` | `Thành tiền` hiển thị `200.000 ₫`; tổng tiền chứa giá trị này. |
| BV-FR07-014 | Tổng tiền | `item_count=1` | Giỏ có 1 dòng `price=100000`, `quantity=2` | Tổng tiền hiển thị `200.000 ₫` với nhãn `"Tổng cộng"`. |
| BV-FR07-015 | Tổng tiền | `item_count=2` | Giỏ có dòng 1 `price=100000`, `quantity=2`; dòng 2 `price=150000`, `quantity=1` | Tổng tiền hiển thị `350.000 ₫` với nhãn `"Tổng cộng"`. |
| BV-FR07-016 | Cộng dồn sản phẩm trùng | Số lượng sau cộng dồn quanh biên | Giỏ đã có `id=1`, `quantity=1`; thêm lại `id=1`, `quantity=1` | Không tạo dòng mới; dòng `id=1` có số lượng 2; thành tiền và tổng tiền cập nhật đúng. |

## 5. Ghi chú rủi ro

- `eshop-sut/api_specification.md` chỉ mô tả `GET /api/cart` và `POST /api/cart`; không mô tả endpoint/API contract cho cập nhật số lượng bằng `+/-` hoặc xóa sản phẩm. Khi thực thi cần xác định các thao tác này kiểm qua UI, API ẩn, hay thiếu đặc tả API.
- FR-07 không nêu hành vi khi bấm `-` tại `quantity=1`. Artifact giả định số lượng không được xuống dưới 1 và việc loại bỏ sản phẩm phải đi qua `Xóa sản phẩm` có dialog xác nhận; cần rà soát thủ công khi thực thi.
- FR-07 không nêu số lượng tối đa, số dòng tối đa trong giỏ, giới hạn giá trị `price`, hoặc xử lý tồn kho, nên artifact không tạo ca BVA cho biên tối đa.
- API `POST /api/cart` nhận cả `name` và `price` từ client theo specification, nhưng yêu cầu nghiệp vụ không nói backend phải đối chiếu lại với catalog. Artifact chỉ ghi expected result ở mức black-box: sản phẩm hợp lệ được thêm và tiền được tính đúng; rủi ro chỉnh sửa `price/name` phía client cần được đánh giá thêm nếu nằm trong mục tiêu bảo mật.
- API specification không nêu status code/thông báo lỗi cụ thể cho token sai hoặc dữ liệu giỏ hàng không hợp lệ, nên expected result của ca lỗi chỉ khẳng định hành vi nghiệp vụ: từ chối thao tác và không cập nhật giỏ hàng sai.
- Các ca kiểm thử trong artifact này đang ở trạng thái thiết kế; khi thực thi cần bổ sung actual result, status, và evidence path theo yêu cầu báo cáo.
```
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

## Integrity Notes

- AI-generated content verified against requirements: `[TODO]`
- Manual corrections made: `[TODO]`
- Limitations or risks: `[TODO]`
