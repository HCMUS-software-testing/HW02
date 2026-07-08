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
  - Từng testcase đều phải được test qua gao diện và cả API chứ khong tách biệt.
- Final Use in Submission: `[Manual by user]`

### Entry 021
- Time: `2026-07-07 22:22 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật lại skill để output [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) là ở B2. Xác định biên và giá trị cận biên, bảng gồm 3 cột với title lần lượt là Trường, Quy tắc biên, Giá Trị biên và cận biên
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md và .agents/skills/applying-domain-testing/references/boundary-value-analysis.md để bảng B2 dùng đúng 3 cột: Trường, Quy tắc biên, Giá Trị biên và cận biên. Đã chạy quick_validate.py cho skill applying-domain-testing và kết quả là Skill is valid!
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

### Entry 022
- Time: `2026-07-08 12:54 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: Cập nhật các file trong folder domain-testing để các bảng testcase có thêm một cột Kết quả thực tế và Đạt để trống để user test xong ghi vào. Cập nhật lại skill [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) để các bảng testcase sau này có thêm 2 cột đó
- Output: Đã cập nhật 3 file trong domain-testing để các bảng testcase EP/BVA có thêm hai cột trống Kết quả thực tế và Đạt. Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md để template A4/B3 và quality check yêu cầu hai cột này cho các artifact sau. Đã kiểm tra 6 bảng testcase với 124 dòng bảng, không có lỗi lệch cột; skill validate thành công bằng quick_validate.py.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

### Entry 023
- Time: `2026-07-08 16:05 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Áp dụng Domain Testing cho Pool B FR-07: Giỏ hàng (Shopping cart) (được đề cập trong tài liệu requirements/2026.HW02.Domain Testing_En.md) - chức năng Hiển thị danh sách sản phẩm (Lấy gió hàng), áp dụng cho dự án eshop-sut (Vui lòng đọc kỹ các tài liệu đặc tả bao gồm: eshop-sut/README, eshop-sut/api_specification.md). Kết quả đầu ra (output) của tính năng này sẽ được thêm vào thư mục ./domain-testing/FR-07_shopping-cart.
- Output:

```text
# FR-07: Giỏ hàng - Hiển thị danh sách sản phẩm / Lấy giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` |
| SUT | EShop - Frontend Web và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-07: Giỏ hàng (Shopping Cart)`; `eshop-sut/api_specification.md` mục `4. Giỏ hàng & Đơn hàng`, đặc biệt `4.1 Lấy giỏ hàng` và `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình Giỏ hàng; endpoint chính `GET /api/cart`; endpoint hỗ trợ tạo dữ liệu tiền điều kiện `POST /api/cart`; header `Authorization: Bearer <token>` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho chức năng hiển thị/lấy danh sách sản phẩm trong giỏ hàng của người dùng đã đăng nhập, bao gồm trạng thái giỏ trống, giỏ có sản phẩm, dòng sản phẩm trùng được gộp số lượng, các cột hiển thị, thành tiền và tổng cộng. |
| Ngoài phạm vi | Không kiểm thử chi tiết chức năng thêm sản phẩm vào giỏ, tăng/giảm số lượng, xóa sản phẩm, checkout, coupon, lịch sử đơn hàng, lưu trữ database, hiệu năng, bảo mật JWT chuyên sâu hoặc kiểm thử mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | API specification chỉ nêu `GET /api/cart` và yêu cầu `Authorization` nhưng không mô tả status code/body chi tiết khi thành công hoặc thất bại; artifact giả định API trả `200 OK` với danh sách item của giỏ hàng khi token hợp lệ, và trả lỗi `4xx` khi thiếu/sai token. README yêu cầu giỏ trống có hình minh họa và thông báo rõ ràng, nhưng API không kiểm chứng được hình minh họa. Đơn giá, số lượng, thành tiền và tổng cộng được kiểm theo dữ liệu quan sát được trong giỏ, không suy diễn từ database nội bộ. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Web/API/Postman. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Header xác thực bắt buộc cho `GET /api/cart` theo API specification. |
| Đầu vào | Trạng thái giỏ hàng của user | Giỏ trống, giỏ có một sản phẩm, giỏ có nhiều sản phẩm khác nhau, hoặc thêm trùng cùng một sản phẩm. |
| Đầu vào | Dòng sản phẩm trong giỏ | Mỗi dòng có thông tin sản phẩm, đơn giá, số lượng, thành tiền và thao tác theo FR-07. |
| Đầu ra | Danh sách sản phẩm trong giỏ | Web hiển thị danh sách sản phẩm với các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`; API trả dữ liệu giỏ hàng của user. |
| Đầu ra | Trạng thái giỏ trống | Web hiển thị hình minh họa và thông báo rõ ràng khi giỏ hàng trống; API trả danh sách rỗng hoặc trạng thái giỏ trống tương đương. |
| Đầu ra | Tổng tiền | Web hiển thị nhãn chính xác `Tổng cộng`; giá trị tổng bằng tổng các `Thành tiền`. |
| Đầu ra | Phản hồi lỗi xác thực | Khi thiếu hoặc sai token, API/Web từ chối truy cập giỏ hàng và yêu cầu đăng nhập hoặc trả lỗi xác thực. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | Yêu cầu `GET /api/cart` phải có header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ và đại diện cho user đang xem giỏ hàng. |
| C3 | Trạng thái giỏ hàng | Nếu giỏ hàng trống, Web phải hiển thị hình minh họa và thông báo rõ ràng. |
| C4 | Trạng thái giỏ hàng | Nếu giỏ hàng có sản phẩm, Web/API phải hiển thị/trả danh sách sản phẩm trong giỏ. |
| C5 | Dòng sản phẩm trong giỏ | Mỗi sản phẩm trong giỏ phải có cột/thông tin `Sản phẩm`. |
| C6 | Dòng sản phẩm trong giỏ | Mỗi sản phẩm trong giỏ phải có cột/thông tin `Đơn giá`. |
| C7 | Dòng sản phẩm trong giỏ | Mỗi sản phẩm trong giỏ phải có cột/thông tin `Số lượng` và có nút `+/-` để chỉnh trên Web. |
| C8 | Dòng sản phẩm trong giỏ | Mỗi sản phẩm trong giỏ phải có cột/thông tin `Thành tiền`. |
| C9 | Dòng sản phẩm trong giỏ | Mỗi sản phẩm trong giỏ phải có cột/thông tin `Thao tác`. |
| C10 | Dòng sản phẩm trùng | Thêm cùng một sản phẩm vào giỏ phải tăng số lượng, không tạo dòng mới. |
| C11 | `Thành tiền` | `Thành tiền` của từng dòng phải bằng `Đơn giá × Số lượng`. |
| C12 | Tổng tiền | Tổng tiền phải hiển thị với nhãn chính xác `Tổng cộng`. |
| C13 | Tổng tiền | Giá trị tổng cộng phải bằng tổng `Thành tiền` của các dòng sản phẩm trong giỏ. |
| C14 | Điều hướng | Web phải có nút `Tiếp tục mua sắm` để quay về trang chủ. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token | Header `Authorization` có token hợp lệ của user. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép lấy/hiển thị giỏ hàng của user tương ứng. |
| EC02 | `Authorization` token | Thiếu header `Authorization`. | Không | Không gửi header | Từ chối truy cập giỏ hàng; API trả lỗi `4xx`; Web yêu cầu đăng nhập hoặc không hiển thị dữ liệu giỏ hàng. |
| EC03 | `Authorization` token | Header có token sai/hết hạn/không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối truy cập giỏ hàng; API trả lỗi `4xx`; Web hiển thị trạng thái lỗi/xác thực phù hợp. |
| EC04 | Trạng thái giỏ hàng | Giỏ hàng trống. | Có | User đã đăng nhập, chưa có item trong giỏ | Web hiển thị hình minh họa và thông báo giỏ trống rõ ràng; API trả danh sách rỗng hoặc trạng thái giỏ trống tương đương. |
| EC05 | Trạng thái giỏ hàng | Giỏ có đúng một sản phẩm. | Có | 1 dòng: `Áo thun`, `price=100000`, `quantity=1` | Web/API hiển thị đúng một dòng sản phẩm với các thông tin bắt buộc. |
| EC06 | Trạng thái giỏ hàng | Giỏ có nhiều sản phẩm khác nhau. | Có | 2 dòng: `Áo thun`, `Giày thể thao` | Web/API hiển thị từng sản phẩm khác nhau thành các dòng riêng biệt. |
| EC07 | Dòng sản phẩm trùng | Cùng một sản phẩm được thêm nhiều lần. | Có | Thêm product `id=1` hai lần, mỗi lần `quantity=1` | Web/API chỉ có một dòng cho product `id=1`, `Số lượng=2`, không tạo dòng trùng. |
| EC08 | Dòng sản phẩm trong giỏ | Dòng có đủ thông tin/cột bắt buộc. | Có | `Sản phẩm=Áo thun`, `Đơn giá=100000`, `Số lượng=2`, `Thành tiền=200000`, có `Thao tác` | Web hiển thị đủ cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`; API có đủ dữ liệu để đối chiếu các giá trị. |
| EC09 | Dòng sản phẩm trong giỏ | Dòng thiếu thông tin/cột bắt buộc trên Web hoặc dữ liệu API không đủ đối chiếu. | Không | Dòng thiếu `Đơn giá` hoặc thiếu `Số lượng` | Không đạt yêu cầu FR-07 vì người dùng không thể xem đầy đủ danh sách sản phẩm trong giỏ. |
| EC10 | `Thành tiền` | `Thành tiền` bằng `Đơn giá × Số lượng`. | Có | `100000 × 2 = 200000` | Web/API hiển thị hoặc trả thành tiền đúng cho dòng sản phẩm. |
| EC11 | `Thành tiền` | `Thành tiền` khác `Đơn giá × Số lượng`. | Không | `price=100000`, `quantity=2`, `Thành tiền=100000` | Không đạt yêu cầu tính tiền của dòng sản phẩm. |
| EC12 | Tổng tiền | Nhãn tổng tiền là `Tổng cộng`. | Có | Label `Tổng cộng` | Web hiển thị đúng nhãn `Tổng cộng`. |
| EC13 | Tổng tiền | Nhãn tổng tiền không chính xác. | Không | Label `Tổng tạm tính` | Không đạt yêu cầu FR-07 vì nhãn sai. |
| EC14 | Tổng tiền | Giá trị tổng cộng bằng tổng các `Thành tiền`. | Có | `200000 + 300000 = 500000` | Web/API hiển thị hoặc trả tổng tiền đúng theo các dòng trong giỏ. |
| EC15 | Tổng tiền | Giá trị tổng cộng khác tổng các `Thành tiền`. | Không | Dòng 1 `200000`, dòng 2 `300000`, tổng hiển thị `300000` | Không đạt yêu cầu tính tổng tiền. |
| EC16 | Điều hướng | Có nút `Tiếp tục mua sắm` để quay về trang chủ. | Có | Button/link `Tiếp tục mua sắm` | Web cho phép người dùng quay về trang chủ. |
| EC17 | Điều hướng | Thiếu nút `Tiếp tục mua sắm` hoặc không điều hướng về trang chủ. | Không | Không có button/link, hoặc click không về trang chủ | Không đạt yêu cầu FR-07. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-GETCART-001 | Lấy/hiển thị giỏ hàng trống với user hợp lệ. | Đăng nhập bằng user hợp lệ; bảo đảm giỏ hàng không có item; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | EC01, EC04, EC12, EC16 | Web: hiển thị trạng thái giỏ trống có hình minh họa và thông báo rõ ràng, có nút `Tiếp tục mua sắm`, không hiển thị nhãn sai `Tổng tạm tính`. API: `GET /api/cart` với token hợp lệ trả `200 OK` và danh sách rỗng hoặc cấu trúc giỏ trống tương đương; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-002 | Lấy/hiển thị giỏ có một sản phẩm. | Tiền điều kiện qua Web hoặc `POST /api/cart`: `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 1 }`; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | EC01, EC05, EC08, EC10, EC12, EC14, EC16 | Web: hiển thị đúng một dòng với `Sản phẩm=Áo thun`, `Đơn giá=100000`, `Số lượng=1` kèm nút `+/-`, `Thành tiền=100000`, có `Thao tác`, tổng hiển thị nhãn `Tổng cộng` và giá trị `100000`, có nút `Tiếp tục mua sắm`. API: `GET /api/cart` trả `200 OK` và dữ liệu giỏ có một item tương ứng; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-003 | Lấy/hiển thị giỏ có nhiều sản phẩm khác nhau. | Tiền điều kiện: thêm `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 2 }` và `{ "id": 2, "name": "Giày thể thao", "price": 300000, "quantity": 1 }`; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | EC01, EC06, EC08, EC10, EC12, EC14, EC16 | Web: hiển thị hai dòng sản phẩm riêng biệt, mỗi dòng đủ cột bắt buộc; thành tiền lần lượt `200000` và `300000`; nhãn `Tổng cộng` với giá trị `500000`; có nút `Tiếp tục mua sắm`. API: `GET /api/cart` trả `200 OK` và danh sách chứa hai item tương ứng; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-004 | Xác nhận sản phẩm trùng được gộp thành một dòng khi xem giỏ. | Tiền điều kiện: thêm product `id=1` hai lần, mỗi lần `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 1 }`; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | EC01, EC07, EC08, EC10, EC14 | Web: chỉ có một dòng cho product `id=1`, số lượng là `2`, thành tiền `200000`, tổng cộng `200000`. API: `GET /api/cart` trả `200 OK` và dữ liệu chỉ có một item cho product `id=1` với `quantity=2`; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-005 | Từ chối lấy giỏ hàng khi thiếu token. | Không gửi header `Authorization`; gọi `GET /api/cart`; truy cập màn hình Giỏ hàng khi chưa đăng nhập. | EC02 | Web: không hiển thị dữ liệu giỏ hàng riêng tư và yêu cầu đăng nhập hoặc chuyển đến luồng đăng nhập phù hợp. API: `GET /api/cart` không có token trả lỗi `4xx` xác thực; API contract không nêu status/body lỗi cụ thể. |  |  |
| EP-FR07-GETCART-006 | Từ chối lấy giỏ hàng khi token không hợp lệ. | Gửi `Authorization: Bearer invalid.token`; gọi `GET /api/cart`. | EC03 | Web: không hiển thị dữ liệu giỏ hàng riêng tư và hiển thị trạng thái lỗi/xác thực phù hợp nếu thao tác qua giao diện. API: `GET /api/cart` với token không hợp lệ trả lỗi `4xx` xác thực; API contract không nêu status/body lỗi cụ thể. |  |  |
| EP-FR07-GETCART-007 | Phát hiện thiếu cột/thông tin bắt buộc của dòng sản phẩm. | Tiền điều kiện: giỏ có một item hợp lệ; quan sát các cột trên Web và body API từ `GET /api/cart`. | EC09 | Web: testcase đạt chỉ khi đủ các cột `Sản phẩm`, `Đơn giá`, `Số lượng`, `Thành tiền`, `Thao tác`; thiếu bất kỳ cột nào là lỗi. API: `GET /api/cart` trả `200 OK`; nếu body không đủ dữ liệu để đối chiếu item/price/quantity thì ghi nhận gap contract hoặc lỗi tùy mức kỳ vọng của API. |  |  |
| EP-FR07-GETCART-008 | Phát hiện thành tiền sai. | Tiền điều kiện: item `price=100000`, `quantity=2`; gọi `GET /api/cart`; quan sát Web. | EC11 | Web: testcase đạt chỉ khi `Thành tiền=200000`; nếu hiển thị giá trị khác thì lỗi. API: nếu API trả `price` và `quantity`, tester tự đối chiếu `price × quantity`; nếu API trả `line_total`, giá trị phải bằng `200000`; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-009 | Phát hiện nhãn tổng tiền sai. | Tiền điều kiện: giỏ có ít nhất một item; mở màn hình Giỏ hàng. | EC13 | Web: phải hiển thị nhãn chính xác `Tổng cộng`; nếu hiển thị `Tổng tạm tính` hoặc nhãn khác thì không đạt. API: không kiểm chứng được nhãn UI qua `GET /api/cart`; ghi nhận đây là kiểm tra Web-only. |  |  |
| EP-FR07-GETCART-010 | Phát hiện tổng cộng sai. | Tiền điều kiện: item 1 `price=100000`, `quantity=2`; item 2 `price=300000`, `quantity=1`; mở màn hình Giỏ hàng và gọi `GET /api/cart`. | EC15 | Web: testcase đạt chỉ khi tổng cộng là `500000`; nếu tổng khác tổng các `Thành tiền` thì lỗi. API: nếu API trả tổng tiền thì tổng phải là `500000`; nếu API chỉ trả item list thì tester tính lại từ danh sách; API contract không nêu body chi tiết. |  |  |
| EP-FR07-GETCART-011 | Kiểm tra nút tiếp tục mua sắm trên màn hình giỏ. | Mở màn hình Giỏ hàng khi giỏ trống hoặc có item; click `Tiếp tục mua sắm`. | EC16, EC17 | Web: có nút `Tiếp tục mua sắm` và khi click quay về trang chủ. API: không áp dụng vì đây là hành vi điều hướng UI-only. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| Số dòng sản phẩm trong giỏ | Số lượng/count | Có | FR-07 phân biệt giỏ trống và giỏ có danh sách sản phẩm; biên tự nhiên là `0` item và `1` item. |
| `quantity` của item trong giỏ | Số lượng/count | Có | FR-06 yêu cầu số lượng tối thiểu là `1`; FR-07 hiển thị số lượng và cho chỉnh bằng nút `+/-`. Không có biên tối đa được đặc tả. |
| `Đơn giá` | Tiền/số | Không | FR-07 chỉ yêu cầu hiển thị đơn giá; tài liệu không nêu min/max hoặc định dạng chi tiết cho giá trong giỏ. |
| `Thành tiền` | Tiền/số tính toán | Có | Có thể kiểm biên theo `quantity` tối thiểu và phép tính `Đơn giá × Số lượng`. |
| Tổng cộng | Tiền/số tính toán | Có | Có thể kiểm biên theo số dòng sản phẩm `0`, `1`, và nhiều dòng; tổng phải bằng tổng thành tiền. |
| Token xác thực | Chuỗi/token | Không | Token là điều kiện hợp lệ/không hợp lệ; không có biên độ dài hoặc thứ tự được đặc tả. |
| Nhãn/cột UI | Tập giá trị văn bản | Không | Đây là membership/hiển thị bắt buộc, phù hợp EP hơn BVA. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| Số dòng sản phẩm trong giỏ | Biên rỗng/có dữ liệu | `0 item`, `1 item`, `2 item` |
| `quantity` của item | Tối thiểu `1`; không có tối đa được đặc tả | `quantity=0` là dưới min theo quy tắc số lượng dương, `quantity=1` là min, `quantity=2` là min+1 |
| `Thành tiền` | Tính theo `Đơn giá × Số lượng` tại biên số lượng | Với `price=100000`: `quantity=1 -> 100000`, `quantity=2 -> 200000`; `quantity=0` không hợp lệ trong giỏ hợp lệ |
| Tổng cộng | Tính theo số dòng và thành tiền | `0 item -> 0 hoặc trạng thái giỏ trống`, `1 item price=100000 quantity=1 -> 100000`, `2 item: 200000 + 300000 -> 500000` |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-GETCART-001 | Số dòng sản phẩm trong giỏ | `0 item` | User hợp lệ có giỏ trống; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | Web: hiển thị hình minh họa và thông báo giỏ trống rõ ràng, không hiển thị dòng sản phẩm giả. API: trả `200 OK` với danh sách rỗng hoặc cấu trúc giỏ trống tương đương; API contract không nêu body chi tiết. |  |  |
| BV-FR07-GETCART-002 | Số dòng sản phẩm trong giỏ | `1 item` | Thêm `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 1 }`; gọi `GET /api/cart`; mở màn hình Giỏ hàng. | Web: hiển thị đúng một dòng sản phẩm với đủ cột bắt buộc, thành tiền `100000`, tổng cộng `100000`. API: trả `200 OK` với một item tương ứng; API contract không nêu body chi tiết. |  |  |
| BV-FR07-GETCART-003 | Số dòng sản phẩm trong giỏ | `2 item` | Thêm item 1 `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 2 }`; item 2 `{ "id": 2, "name": "Giày thể thao", "price": 300000, "quantity": 1 }`; gọi `GET /api/cart`. | Web: hiển thị hai dòng riêng biệt, thành tiền `200000` và `300000`, tổng cộng `500000`. API: trả `200 OK` với hai item tương ứng hoặc dữ liệu đủ để đối chiếu. |  |  |
| BV-FR07-GETCART-004 | `quantity` của item | `min-1`, `quantity=0` | Tiền điều kiện thử thêm hoặc quan sát item với `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 0 }`, sau đó gọi `GET /api/cart`. | Web: giỏ hàng hợp lệ không được hiển thị item có số lượng `0`; nếu thao tác qua UI, số lượng tối thiểu phải là `1`. API: `POST /api/cart` nên từ chối quantity dưới min bằng lỗi `4xx` hoặc `GET /api/cart` không trả item số lượng `0`; API contract không nêu lỗi chi tiết cho `POST /api/cart`. |  |  |
| BV-FR07-GETCART-005 | `quantity` của item | `min`, `quantity=1` | Thêm `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 1 }`; gọi `GET /api/cart`. | Web: hiển thị số lượng `1`, thành tiền `100000`, tổng cộng `100000`. API: trả `200 OK` với item `quantity=1` hoặc dữ liệu tương đương. |  |  |
| BV-FR07-GETCART-006 | `quantity` của item | `min+1`, `quantity=2` | Thêm `{ "id": 1, "name": "Áo thun", "price": 100000, "quantity": 2 }`; gọi `GET /api/cart`. | Web: hiển thị số lượng `2`, thành tiền `200000`, tổng cộng `200000`. API: trả `200 OK` với item `quantity=2` hoặc dữ liệu tương đương. |  |  |
| BV-FR07-GETCART-007 | `Thành tiền` | Biên tính toán tại `quantity=1` | Item `price=100000`, `quantity=1`. | Web: `Thành tiền=100000`; API: nếu trả `line_total` thì phải là `100000`, nếu chỉ trả `price`/`quantity` thì tester tính lại được `100000`. |  |  |
| BV-FR07-GETCART-008 | `Thành tiền` | Biên tính toán tại `quantity=2` | Item `price=100000`, `quantity=2`. | Web: `Thành tiền=200000`; API: nếu trả `line_total` thì phải là `200000`, nếu chỉ trả `price`/`quantity` thì tester tính lại được `200000`. |  |  |
| BV-FR07-GETCART-009 | Tổng cộng | Tổng tại `0 item` | User hợp lệ có giỏ trống. | Web: hiển thị trạng thái giỏ trống rõ ràng; nếu có vùng tổng tiền thì không được gây hiểu nhầm và không dùng nhãn sai `Tổng tạm tính`. API: trả danh sách rỗng hoặc cấu trúc giỏ trống tương đương. |  |  |
| BV-FR07-GETCART-010 | Tổng cộng | Tổng tại `1 item` | Một item `price=100000`, `quantity=1`. | Web: nhãn `Tổng cộng` và giá trị `100000`. API: nếu trả tổng tiền thì là `100000`; nếu không, danh sách item phải cho phép tính ra `100000`. |  |  |
| BV-FR07-GETCART-011 | Tổng cộng | Tổng tại `2 item` | Item 1 `price=100000`, `quantity=2`; item 2 `price=300000`, `quantity=1`. | Web: nhãn `Tổng cộng` và giá trị `500000`. API: nếu trả tổng tiền thì là `500000`; nếu không, danh sách item phải cho phép tính ra `500000`. |  |  |

## 5. Ghi chú rủi ro

- API specification của `GET /api/cart` chưa mô tả body phản hồi, status code lỗi, hoặc tên field cụ thể; khi thực thi cần ghi lại body thực tế và đối chiếu với yêu cầu Web/README.
- Chức năng được yêu cầu là `Hiển thị danh sách sản phẩm (Lấy giỏ hàng)`, nên artifact này không thay thế Domain Testing riêng cho `FR-05: Product listing and search`.
- Một số kỳ vọng như hình minh họa giỏ trống, nhãn `Tổng cộng`, nút `+/-`, nút `Tiếp tục mua sắm`, và cột `Thao tác` chỉ kiểm chứng được qua Web, không kiểm chứng trực tiếp qua `GET /api/cart`.
- Tài liệu không nêu giới hạn tối đa cho số lượng item, số lượng mỗi item, đơn giá hoặc tổng tiền; BVA chỉ dùng các biên được đặc tả hoặc biên tự nhiên của trạng thái rỗng/có dữ liệu.
- `POST /api/cart` được dùng trong artifact này như bước tạo dữ liệu tiền điều kiện; lỗi của `POST /api/cart` nên được ghi nhận riêng nếu phát hiện, nhưng mục tiêu chính vẫn là hiển thị/lấy danh sách sản phẩm trong giỏ bằng `GET /api/cart`.
```

- Human Review/Corrections:
  - Sau output ban đầu của Entry 023, sinh viên rà soát và chỉnh lại phạm vi input/output của artifact FR-07:
    - Các trạng thái như giỏ trống, giỏ có một/nhiều sản phẩm, sản phẩm trùng, dòng sản phẩm trong giỏ được xem là dữ liệu tiền điều kiện/test setup, không phải input trực tiếp của chức năng `GET /api/cart`; input chính còn lại là `Authorization` token.
    - Output được thu gọn về `Danh sách sản phẩm trong giỏ`, `Trạng thái giỏ trống`, `Tổng tiền`, và `Phản hồi lỗi xác thực`. `Thành tiền` được chuyển thành điều kiện/thuộc tính của `Danh sách sản phẩm trong giỏ`, không tách thành output riêng.
  - Cặp equivalence class cho sản phẩm trùng được tách thành hợp lệ/không hợp lệ, đặt cạnh nhau và đánh số lại; các testcase A4 được cập nhật lại mã EC tương ứng.
  - Phần `Điều hướng`/nút `Tiếp tục mua sắm` được đưa ra ngoài phạm vi artifact này vì không thuộc chức năng lấy/hiển thị danh sách sản phẩm trong giỏ.
  - Các testcase cần có sản phẩm trong giỏ được chỉnh để dựng tiền điều kiện bằng thao tác thêm sản phẩm qua UI, không gọi trực tiếp `POST /api/cart`, vì AI không có đủ context về kho hàng/tồn kho và product id hợp lệ khi thêm bằng API.
  - Các giá tiền cụ thể do AI tự đặt trong testcase và BVA như `100000`, `300000`, `500000` được thay bằng ký hiệu `X`, `Y`, `2X`, `2X + Y`; lý do là artifact không có context về giá thực tế của sản phẩm được thêm vào giỏ, nên tester phải lấy đơn giá quan sát được trên UI làm dữ liệu đối chiếu.


### Entry 024
- Time: `2026-07-08 20:14 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) Cập nhật[$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) rằng với các giá trị đầu vào như mức giá mà không có context từ hệ thống (vì kiểm tra blackbox) thì hãy để dưới dạng biến. Đảm bảo nội dung domain testing vẫn theo sát references/04_Domain Testing.md và có thể release thành bộ skill độc lập, portable.
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md để yêu cầu không tự đặt giá trị cụ thể cho dữ liệu runtime thiếu context black-box, mà dùng biến ký hiệu như X/Y và công thức như 2X, 2X + Y. Đã cập nhật references/equivalence-partitioning.md để representative value không bịa dữ liệu hệ thống ẩn, và references/boundary-value-analysis.md để phân biệt biên cụ thể từ specification với giá trị phụ trợ có thể dùng biến quan sát được. Đã đối chiếu references/04_Domain Testing.md, chạy RED check trước khi sửa, kiểm tra không thêm phụ thuộc HW02 vào skill, và chạy quick_validate.py với kết quả Skill is valid!.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 025
- Time: `2026-07-08 21:08 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Áp dụng Domain Testing cho Pool B FR-07: Giỏ hàng (Shopping cart) (được đề cập trong tài liệu requirements/2026.HW02.Domain Testing_En.md) - chức năng Thêm vào giỏ hàng, áp dụng cho dự án eshop-sut (Vui lòng đọc kỹ các tài liệu đặc tả bao gồm: eshop-sut/README, eshop-sut/api_specification.md). Kết quả đầu ra (output) của tính năng này sẽ được thêm vào thư mục ./domain-testing/FR-07_shopping-cart.
- Output:

```text
# FR-07: Giỏ hàng - Thêm vào giỏ hàng - Domain Testing

## 1. Chức năng kiểm thử

| Thuộc tính | Nội dung |
| --- | --- |
| Project | EShop |
| Feature | `FR-07: Shopping cart` / `FR-07: Giỏ hàng` - Thêm vào giỏ hàng |
| SUT | EShop - Frontend Web và Backend API |
| Specification tham chiếu | `requirements/2026.HW02.Domain Testing_En.md` mục Pool B; `eshop-sut/README.md` mục `FR-06: Xem chi tiết sản phẩm`, `FR-07: Giỏ hàng (Shopping Cart)`, `FR-23: Navigation Requirements`, `FR-24: Feedback & State Requirements`; `eshop-sut/api_specification.md` mục `4.2 Thêm vào giỏ hàng` |
| Giao diện/API tham chiếu | Màn hình chi tiết sản phẩm có ô `Số lượng` và nút `Thêm vào giỏ hàng`; navbar badge `Giỏ hàng`; endpoint `POST /api/cart`; header `Authorization: Bearer <token>` |
| Phạm vi kiểm thử | Thiết kế Domain Testing cho hành vi thêm sản phẩm vào giỏ hàng, bao gồm xác thực user, sản phẩm được chọn, số lượng thêm, phản hồi trực quan, badge giỏ hàng và quy tắc thêm cùng một sản phẩm thì tăng số lượng thay vì tạo dòng mới. |
| Ngoài phạm vi | Không kiểm thử chi tiết danh sách sản phẩm, tìm kiếm sản phẩm, hiển thị toàn bộ màn hình giỏ hàng, tăng/giảm số lượng trong giỏ, xóa sản phẩm, checkout, coupon, tồn kho thực tế, bảo mật JWT chuyên sâu, database hoặc mã nguồn triển khai. |
| Giả định/ràng buộc thiếu | API specification mô tả body `POST /api/cart` gồm `id`, `name`, `price`, `quantity` và yêu cầu token, nhưng không nêu status code/body phản hồi khi thành công hoặc lỗi. Artifact giả định thao tác thành công phải quan sát được bằng phản hồi Web và/hoặc lần đọc giỏ hàng sau đó; với API, tester cần gọi `GET /api/cart` sau `POST /api/cart` để đối chiếu trạng thái giỏ. Tài liệu không cung cấp sẵn danh sách product id, tên, giá hoặc tồn kho; ký hiệu `A_id`, `N_A`, `X` lần lượt là id, tên và đơn giá của sản phẩm A quan sát được từ UI/API black-box trong bước chuẩn bị. Sản phẩm B tương tự dùng `B_id`, `N_B`, `Y`. |
| Trạng thái thực thi | Chưa thực thi; cần bổ sung `Kết quả thực tế` và `Đạt` sau khi chạy Web/API/Postman. |

### A. Phân hoạch tương đương

#### A1. Đầu vào và đầu ra

| Loại | Tên | Mô tả |
| --- | --- | --- |
| Đầu vào | `Authorization` token | Header xác thực bắt buộc cho `POST /api/cart` theo API specification; trên Web tương ứng với trạng thái người dùng đã đăng nhập. |
| Đầu vào | Sản phẩm được chọn | Sản phẩm đang hiển thị ở màn hình chi tiết hoặc body API với `id`, `name`, `price`; giá trị cụ thể phải lấy từ dữ liệu quan sát được, ví dụ `A_id`, `N_A`, `X`. |
| Đầu vào | `quantity` | Số lượng cần thêm vào giỏ; FR-06 yêu cầu chỉ nhận số nguyên dương, tối thiểu là `1`. |
| Đầu vào | Trạng thái hiện tại của giỏ | Giỏ chưa có sản phẩm được chọn, đã có cùng sản phẩm, hoặc đã có sản phẩm khác; dùng để kiểm quy tắc gộp dòng/tăng số lượng. |
| Đầu ra | Kết quả thêm vào giỏ | Web hiển thị phản hồi trực quan sau khi bấm `Thêm vào giỏ`; API hoàn tất thao tác thêm theo contract, dù contract chưa mô tả body/status chi tiết. |
| Đầu ra | Trạng thái giỏ sau khi thêm | Giỏ có item mới hoặc tăng `quantity` của item hiện có; cùng một sản phẩm không được tạo dòng mới. |
| Đầu ra | Badge giỏ hàng | Link `Giỏ hàng` trên navbar cập nhật badge số lượng sản phẩm trong giỏ theo FR-23/FR-24. |
| Đầu ra | Phản hồi lỗi | Khi thiếu/sai token, sản phẩm không hợp lệ hoặc `quantity` không hợp lệ, hệ thống từ chối thêm vào giỏ và không làm thay đổi giỏ. |

#### A2. Điều kiện

| Mã | Đầu vào/Đầu ra | Điều kiện |
| --- | --- | --- |
| C1 | `Authorization` token | Yêu cầu `POST /api/cart` phải có header `Authorization: Bearer <token>`. |
| C2 | `Authorization` token | Token phải hợp lệ và đại diện cho user đang thêm sản phẩm vào giỏ. |
| C3 | Sản phẩm được chọn | Phải có một sản phẩm hợp lệ được chọn từ danh mục/chi tiết sản phẩm quan sát được. |
| C4 | Sản phẩm được chọn | Body API khi kiểm thử trực tiếp phải mang dữ liệu sản phẩm quan sát được gồm `id`, `name`, `price`; không dùng dữ liệu tự bịa ngoài catalog. |
| C5 | `quantity` | `quantity` phải được cung cấp. |
| C6 | `quantity` | `quantity` phải là số nguyên. |
| C7 | `quantity` | `quantity` phải là số dương, tối thiểu `1`. |
| C8 | Trạng thái hiện tại của giỏ | Nếu giỏ chưa có sản phẩm được chọn, thêm thành công tạo một item cho sản phẩm đó. |
| C9 | Trạng thái hiện tại của giỏ | Nếu giỏ đã có cùng sản phẩm, thêm tiếp phải tăng số lượng trên dòng hiện có, không tạo dòng mới. |
| C10 | Trạng thái hiện tại của giỏ | Nếu giỏ đã có sản phẩm khác, thêm sản phẩm mới phải giữ item cũ và thêm item khác tương ứng. |
| C11 | Kết quả thêm vào giỏ | Sau khi thêm thành công qua Web, phải có phản hồi trực quan như toast notification hoặc badge cập nhật. |
| C12 | Badge giỏ hàng | Link `Giỏ hàng` phải hiển thị/cập nhật badge số lượng sản phẩm trong giỏ. |
| C13 | Phản hồi lỗi | Với dữ liệu không hợp lệ hoặc xác thực không hợp lệ, hệ thống không được thêm item mới hoặc tăng số lượng trong giỏ. |

#### A3. Lớp tương đương

| EC | Đầu vào/Đầu ra | Lớp tương đương | Hợp lệ? | Giá trị đại diện | Kết quả mong đợi |
| --- | --- | --- | --- | --- | --- |
| EC01 | `Authorization` token | Header `Authorization` có token hợp lệ của user. | Có | `Authorization: Bearer <valid_user_token>` | Cho phép thực hiện thao tác thêm vào giỏ cho user tương ứng. |
| EC02 | `Authorization` token | Thiếu header `Authorization` hoặc user chưa đăng nhập. | Không | Không gửi header; Web ở trạng thái chưa đăng nhập | Từ chối thêm vào giỏ; Web yêu cầu đăng nhập hoặc không cho thêm dữ liệu riêng tư; API trả lỗi xác thực theo contract thực tế. |
| EC03 | `Authorization` token | Header có token sai/hết hạn/không hợp lệ. | Không | `Authorization: Bearer invalid.token` | Từ chối thêm vào giỏ; giỏ không thay đổi. |
| EC04 | Sản phẩm được chọn | Sản phẩm hợp lệ được quan sát từ UI/API black-box. | Có | Sản phẩm A: `id=A_id`, `name=N_A`, `price=X` | Có thể thêm sản phẩm A vào giỏ khi các điều kiện khác hợp lệ. |
| EC05 | Sản phẩm được chọn | Không có sản phẩm được chọn hoặc body API thiếu `id` sản phẩm. | Không | Body thiếu `id`; Web không ở màn hình sản phẩm cụ thể | Không thêm sản phẩm vào giỏ; giỏ không thay đổi. |
| EC06 | Sản phẩm được chọn | Sản phẩm không nằm trong catalog quan sát được hoặc dữ liệu sản phẩm trong body không nhất quán với sản phẩm đã chọn. | Không | `id=Z` không xuất hiện trong danh sách sản phẩm quan sát được, hoặc `id=A_id` nhưng `name=N_B` | Không thêm sản phẩm vào giỏ; cần ghi nhận contract gap nếu API không mô tả lỗi cụ thể. |
| EC07 | `quantity` | `quantity` được cung cấp và là số nguyên dương. | Có | `quantity=1` hoặc `quantity=2` | Số lượng được dùng để tạo mới hoặc cộng vào item trong giỏ. |
| EC08 | `quantity` | Thiếu `quantity`. | Không | Body thiếu `quantity`; Web để trống ô số lượng nếu có thể thao tác | Từ chối thêm vào giỏ; giỏ không thay đổi. |
| EC09 | `quantity` | `quantity` không phải số nguyên. | Không | `quantity=1.5` hoặc `quantity="abc"` | Từ chối thêm vào giỏ vì FR-06 chỉ nhận số nguyên dương. |
| EC10 | `quantity` | `quantity` nhỏ hơn tối thiểu `1`. | Không | `quantity=0` | Từ chối thêm vào giỏ vì số lượng tối thiểu là `1`. |
| EC11 | Trạng thái hiện tại của giỏ | Giỏ chưa có sản phẩm được chọn. | Có | Giỏ rỗng, thêm A với `quantity=1` | Giỏ sau khi thêm có một item A với `quantity=1`, đơn giá quan sát `X`. |
| EC12 | Trạng thái hiện tại của giỏ | Giỏ đã có cùng sản phẩm được chọn. | Có | Giỏ đã có A `quantity=1`, thêm A với `quantity=1` | Giỏ sau khi thêm vẫn chỉ có một dòng A, `quantity=2`; không tạo dòng trùng. |
| EC13 | Trạng thái hiện tại của giỏ | Giỏ đã có sản phẩm khác. | Có | Giỏ đã có A, thêm B với `quantity=1` | Giỏ sau khi thêm có item A và item B riêng biệt. |
| EC14 | Trạng thái hiện tại của giỏ | Cùng một sản phẩm được thêm tiếp nhưng xuất hiện thành nhiều dòng riêng biệt. | Không | Hai dòng đều có `id=A_id`, mỗi dòng `quantity=1` | Không đạt FR-07 vì thêm cùng sản phẩm phải tăng số lượng, không tạo dòng mới. |
| EC15 | Kết quả thêm vào giỏ | Web/API thêm vào giỏ thành công và có thể quan sát được. | Có | Bấm `Thêm vào giỏ hàng` cho A; hoặc gọi `POST /api/cart` với body quan sát được | Web có toast/badge cập nhật; API thao tác thành công và lần `GET /api/cart` sau đó phản ánh item đã thêm. |
| EC16 | Kết quả thêm vào giỏ | Không có phản hồi trực quan sau khi thêm thành công trên Web. | Không | Bấm `Thêm vào giỏ hàng` nhưng không có toast và badge không đổi | Không đạt FR-06/FR-24 vì thiếu phản hồi trực quan. |
| EC17 | Badge giỏ hàng | Badge giỏ hàng cập nhật theo số lượng sản phẩm trong giỏ. | Có | Trước khi thêm badge là `0` hoặc rỗng, sau khi thêm A `quantity=1` badge tăng thêm `1` | Navbar phản ánh đúng số lượng sản phẩm trong giỏ. |
| EC18 | Badge giỏ hàng | Badge không cập nhật hoặc cập nhật sai sau thao tác thêm. | Không | Thêm A `quantity=1` nhưng badge không đổi | Không đạt FR-23/FR-24. |
| EC19 | Phản hồi lỗi | Dữ liệu/xác thực không hợp lệ không làm thay đổi giỏ. | Có | Gửi `quantity=0` cho A khi giỏ đang rỗng | API/Web từ chối thao tác; lần đọc giỏ sau đó vẫn không có A. |
| EC20 | Phản hồi lỗi | Dữ liệu/xác thực không hợp lệ vẫn làm thay đổi giỏ. | Không | Gửi `quantity=0` nhưng giỏ có A `quantity=0` hoặc `quantity=1` | Không đạt vì thao tác lỗi không được thêm/sửa giỏ. |

#### A4. Ca kiểm thử EP

| TC | Mục tiêu | Dữ liệu kiểm thử | Lớp được bao phủ | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| EP-FR07-ADDCART-001 | Thêm một sản phẩm hợp lệ vào giỏ rỗng. | Tiền điều kiện: đăng nhập user hợp lệ, giỏ rỗng. Quan sát sản phẩm A trên UI/API với `id=A_id`, `name=N_A`, `price=X`. Web: mở chi tiết A, nhập `quantity=1`, bấm `Thêm vào giỏ hàng`. API: gọi `POST /api/cart` với token hợp lệ và body `{"id": A_id, "name": N_A, "price": X, "quantity": 1}`. | EC01, EC04, EC07, EC11, EC15, EC17 | Web: hiển thị phản hồi trực quan sau khi thêm, badge giỏ hàng tăng thêm `1`; khi mở giỏ có một dòng A với `quantity=1`, đơn giá `X`. API: contract chưa nêu status/body cụ thể; thao tác được xem là đạt khi `POST /api/cart` trả phản hồi thành công theo SUT và lần `GET /api/cart` sau đó có A `quantity=1`. |  |  |
| EP-FR07-ADDCART-002 | Thêm một sản phẩm hợp lệ với số lượng lớn hơn 1. | Đăng nhập user hợp lệ, giỏ rỗng. Quan sát A có `id=A_id`, `name=N_A`, `price=X`. Web/API thêm A với `quantity=2`. | EC01, EC04, EC07, EC11, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `2` hoặc phản ánh tổng số lượng trong giỏ theo thiết kế; giỏ có một dòng A `quantity=2`, thành tiền quan sát được là `2X`. API: sau `POST /api/cart`, lần `GET /api/cart` có A `quantity=2`; nếu API trả line total thì giá trị là `2X`. |  |  |
| EP-FR07-ADDCART-003 | Thêm cùng một sản phẩm nhiều lần phải tăng số lượng, không tạo dòng mới. | Đăng nhập user hợp lệ. Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`. Web/API thêm tiếp A với `quantity=1`. | EC01, EC04, EC07, EC12, EC14, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `1`; màn hình giỏ chỉ có một dòng A với `quantity=2`, không có hai dòng cùng `A_id`; thành tiền A là `2X`. API: sau `POST /api/cart`, `GET /api/cart` chỉ có một item `id=A_id` với `quantity=2`; nếu xuất hiện nhiều item cùng `A_id` thì không đạt. |  |  |
| EP-FR07-ADDCART-004 | Thêm sản phẩm khác khi giỏ đã có sản phẩm. | Đăng nhập user hợp lệ. Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`. Quan sát B có `id=B_id`, `name=N_B`, `price=Y`. Web/API thêm B với `quantity=1`. | EC01, EC04, EC07, EC13, EC15, EC17 | Web: có phản hồi trực quan, badge tăng thêm `1`; giỏ giữ A và thêm B thành dòng riêng, không làm mất item cũ. API: sau `POST /api/cart`, `GET /api/cart` có cả A và B với số lượng tương ứng. |  |  |
| EP-FR07-ADDCART-005 | Từ chối thêm vào giỏ khi chưa đăng nhập/thiếu token. | Web: chưa đăng nhập rồi bấm `Thêm vào giỏ hàng` cho A nếu UI cho phép đến màn hình sản phẩm. API: gọi `POST /api/cart` không có header `Authorization`. | EC02, EC04, EC07, EC13, EC19 | Web: không thêm sản phẩm vào giỏ riêng tư, yêu cầu đăng nhập hoặc hiển thị lỗi xác thực phù hợp; badge/giỏ của user không đổi. API: trả lỗi xác thực theo contract thực tế; `GET /api/cart` với user hợp lệ sau đó không xuất hiện item do request thiếu token tạo ra. |  |  |
| EP-FR07-ADDCART-006 | Từ chối thêm vào giỏ khi token không hợp lệ. | Gọi `POST /api/cart` với `Authorization: Bearer invalid.token` và body hợp lệ của A (`A_id`, `N_A`, `X`, `quantity=1`). | EC03, EC04, EC07, EC13, EC19 | API: trả lỗi xác thực theo contract thực tế; giỏ không thay đổi. Web: nếu token phiên hết hạn, không được thêm item và cần yêu cầu đăng nhập lại hoặc báo lỗi phù hợp. |  |  |
| EP-FR07-ADDCART-007 | Từ chối thêm khi không có sản phẩm hợp lệ. | API: gọi `POST /api/cart` với body thiếu `id` hoặc không chọn được sản phẩm cụ thể. Web: cố gắng bấm thêm khi không ở màn hình chi tiết sản phẩm nếu UI có đường thao tác tương ứng. | EC01, EC05, EC07, EC13, EC19 | Web/API: không thêm item mới vào giỏ; hiển thị/trả lỗi phù hợp nếu có. API contract chưa nêu status/body lỗi cụ thể, nên cần ghi lại phản hồi thực tế. |  |  |
| EP-FR07-ADDCART-008 | Từ chối thêm sản phẩm không thuộc catalog quan sát được hoặc dữ liệu body không nhất quán. | API: dùng token hợp lệ, body có `id=Z` không xuất hiện trong danh sách sản phẩm quan sát được, hoặc `id=A_id` nhưng `name=N_B`; `quantity=1`. | EC01, EC06, EC07, EC13, EC19 | API: không được thêm item không có cơ sở từ catalog quan sát được; giỏ không thay đổi. Nếu contract/API vẫn chấp nhận dữ liệu không nhất quán, ghi nhận rủi ro/bug tùy oracle của bài. |  |  |
| EP-FR07-ADDCART-009 | Từ chối thêm khi thiếu `quantity`. | API: token hợp lệ, body sản phẩm A quan sát được nhưng thiếu `quantity`. Web: nếu có thể để trống ô số lượng, bấm `Thêm vào giỏ hàng`. | EC01, EC04, EC08, EC13, EC19 | Web/API: từ chối thao tác; giỏ không thay đổi; nếu có lỗi hiển thị thì lỗi phải gần thao tác/ô nhập và không mơ hồ. |  |  |
| EP-FR07-ADDCART-010 | Từ chối thêm khi `quantity` không phải số nguyên. | Token hợp lệ, sản phẩm A hợp lệ, nhập/gửi `quantity=1.5` hoặc `quantity="abc"`. | EC01, EC04, EC09, EC13, EC19 | Web/API: từ chối thao tác vì chỉ nhận số nguyên dương; giỏ không thay đổi. |  |  |
| EP-FR07-ADDCART-011 | Từ chối thêm khi `quantity` nhỏ hơn tối thiểu. | Token hợp lệ, sản phẩm A hợp lệ, nhập/gửi `quantity=0`. | EC01, EC04, EC10, EC13, EC19, EC20 | Web/API: từ chối thao tác vì số lượng tối thiểu là `1`; giỏ không có item A với `quantity=0` và cũng không được âm thầm thêm A với số lượng khác. |  |  |
| EP-FR07-ADDCART-012 | Phát hiện thiếu phản hồi trực quan hoặc badge cập nhật sai sau khi thêm thành công. | Đăng nhập user hợp lệ, giỏ rỗng, thêm A với `quantity=1` qua Web và quan sát toast/badge ngay sau thao tác. | EC01, EC04, EC07, EC15, EC16, EC17, EC18 | Web: testcase đạt chỉ khi có phản hồi trực quan và badge giỏ hàng cập nhật phù hợp sau khi thêm. Nếu item thực sự được thêm nhưng không có toast/badge cập nhật thì không đạt FR-06/FR-23/FR-24. API: không kiểm chứng được phản hồi UI qua `POST /api/cart`; dùng `GET /api/cart` để xác nhận trạng thái giỏ. |  |  |

### B. Phân tích giá trị biên

#### B1. Xác định miền liên tục có thể phân tích biên

| Đầu vào/Đầu ra | Dạng miền | Có áp dụng BVA? | Lý do |
| --- | --- | --- | --- |
| `quantity` | Số lượng/count | Có | FR-06 nêu `Số lượng` chỉ nhận số nguyên dương và tối thiểu là `1`; đây là miền có thứ tự với biên dưới rõ ràng. |
| Số lượng hiện có của cùng sản phẩm trong giỏ | Số lượng/count | Có | FR-07 quy định thêm cùng sản phẩm thì tăng số lượng; biên tự nhiên để kiểm là sản phẩm chưa có trong giỏ (`0`) và đã có (`1`). |
| Số dòng sản phẩm trong giỏ sau khi thêm | Số lượng/count | Có | Có thể kiểm biên trạng thái từ giỏ rỗng sang một item, và từ một item sang hai item khi thêm sản phẩm khác. |
| `price`/đơn giá | Tiền/số | Không | Tài liệu không nêu min/max hoặc quy tắc validate giá trong `POST /api/cart`; giá phải lấy từ sản phẩm quan sát được và biểu diễn bằng `X`/`Y`. |
| Product `id` | Định danh | Không | `id` là định danh/membership theo catalog quan sát được, phù hợp EP hơn BVA; không có biên số học được đặc tả. |
| `Authorization` token | Chuỗi/token | Không | Token chỉ có trạng thái hợp lệ/không hợp lệ; không có biên độ dài hoặc thứ tự được đặc tả. |
| Toast/badge | Trạng thái UI | Không | Đây là điều kiện hiển thị/cập nhật, phù hợp EP hơn BVA. |

#### B2. Xác định biên và giá trị cận biên

| Trường | Quy tắc biên | Giá Trị biên và cận biên |
| --- | --- | --- |
| `quantity` | Tối thiểu `1`; không có tối đa được đặc tả | `quantity=0` là dưới min, `quantity=1` là min, `quantity=2` là min+1 |
| Số lượng hiện có của cùng sản phẩm trong giỏ | Chưa có sản phẩm A trong giỏ so với đã có A | `current_quantity(A)=0` trước khi thêm, `current_quantity(A)=1` trước khi thêm, kết quả kỳ vọng lần lượt là `1` và `2` khi thêm `quantity=1` |
| Số dòng sản phẩm trong giỏ sau khi thêm | Rỗng/có dữ liệu và thêm sản phẩm khác | `0 dòng -> 1 dòng` khi thêm A; `1 dòng A -> 1 dòng A` khi thêm lại A; `1 dòng A -> 2 dòng A,B` khi thêm B |
| Thành tiền của item sau khi thêm | Tính theo đơn giá quan sát và `quantity` hợp lệ | Với `price=X`: `quantity=1 -> X`, `quantity=2 -> 2X`; `quantity=0` không được tạo item hợp lệ |

#### B3. Ca kiểm thử BVA

| TC | Trường | Biên được kiểm thử | Dữ liệu kiểm thử | Kết quả mong đợi | Kết quả thực tế | Đạt |
| --- | --- | --- | --- | --- | --- | --- |
| BV-FR07-ADDCART-001 | `quantity` | `min-1`, `quantity=0` | Đăng nhập user hợp lệ; quan sát A có `id=A_id`, `name=N_A`, `price=X`; thử thêm A với `quantity=0` qua Web/API. | Web: từ chối thêm, không có phản hồi thành công sai lệch, badge/giỏ không tăng. API: contract chưa nêu status/body lỗi; sau request, `GET /api/cart` không được có A với `quantity=0` và không được âm thầm thêm A. |  |  |
| BV-FR07-ADDCART-002 | `quantity` | `min`, `quantity=1` | Đăng nhập user hợp lệ, giỏ rỗng; thêm A với `quantity=1`, `price=X`. | Web: có phản hồi trực quan, badge tăng thêm `1`, giỏ có A `quantity=1`, thành tiền `X`. API: sau `POST /api/cart`, `GET /api/cart` có A `quantity=1`. |  |  |
| BV-FR07-ADDCART-003 | `quantity` | `min+1`, `quantity=2` | Đăng nhập user hợp lệ, giỏ rỗng; thêm A với `quantity=2`, `price=X`. | Web: có phản hồi trực quan, badge phản ánh thêm `2` hoặc tổng số lượng mới; giỏ có A `quantity=2`, thành tiền `2X`. API: sau `POST /api/cart`, `GET /api/cart` có A `quantity=2`. |  |  |
| BV-FR07-ADDCART-004 | Số lượng hiện có của cùng sản phẩm | `current_quantity(A)=0` | Giỏ không có A; thêm A với `quantity=1`. | Web: giỏ chuyển từ không có A sang một dòng A `quantity=1`; badge tăng thêm `1`. API: `GET /api/cart` sau khi thêm có một item A. |  |  |
| BV-FR07-ADDCART-005 | Số lượng hiện có của cùng sản phẩm | `current_quantity(A)=1` | Tiền điều kiện: giỏ đã có A `quantity=1`, `price=X`; thêm tiếp A với `quantity=1`. | Web: vẫn chỉ một dòng A, `quantity=2`, thành tiền `2X`; badge tăng thêm `1`. API: `GET /api/cart` sau khi thêm chỉ có một item `A_id` với `quantity=2`. |  |  |
| BV-FR07-ADDCART-006 | Số dòng sản phẩm trong giỏ sau khi thêm | `0 dòng -> 1 dòng` | Giỏ rỗng; thêm A với `quantity=1`. | Web/API: giỏ sau thao tác có đúng một item A. |  |  |
| BV-FR07-ADDCART-007 | Số dòng sản phẩm trong giỏ sau khi thêm | `1 dòng A -> 1 dòng A` khi thêm trùng | Giỏ đã có một dòng A; thêm lại A với `quantity=1`. | Web/API: số dòng sản phẩm không tăng do trùng sản phẩm; chỉ `quantity` của A tăng lên `2`. |  |  |
| BV-FR07-ADDCART-008 | Số dòng sản phẩm trong giỏ sau khi thêm | `1 dòng A -> 2 dòng A,B` khi thêm sản phẩm khác | Giỏ đã có A; quan sát B có `id=B_id`, `name=N_B`, `price=Y`; thêm B với `quantity=1`. | Web/API: giỏ sau thao tác có hai dòng sản phẩm khác nhau A và B; không làm mất A. |  |  |

## 5. Ghi chú rủi ro

- API specification của `POST /api/cart` chưa mô tả status code/body phản hồi thành công hoặc lỗi; khi thực thi cần ghi lại response thực tế và dùng `GET /api/cart` để xác nhận trạng thái giỏ sau thao tác.
- Tài liệu không cung cấp product id, tên, giá hoặc tồn kho cụ thể; tester phải lấy sản phẩm hợp lệ từ UI/API black-box rồi dùng biến `A_id`, `N_A`, `X`, `B_id`, `N_B`, `Y` trong dữ liệu kiểm thử.
- Tài liệu không nêu giới hạn tối đa cho `quantity`, stock khả dụng, hoặc cách xử lý khi số lượng vượt tồn kho; BVA chỉ kiểm biên dưới `1` và `min+1`.
- Với Web, phản hồi trực quan có thể là toast notification hoặc badge cập nhật; nếu hệ thống chọn một dạng khác, tester cần đối chiếu xem phản hồi đó có đủ rõ ràng theo FR-06/FR-24 hay không.
- API nhận cả `name` và `price` trong body là rủi ro contract vì client có thể gửi dữ liệu không nhất quán; artifact chỉ nêu testcase black-box để phát hiện, không suy diễn cách backend nên triển khai từ mã nguồn.
```
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 026
- Time: `2026-07-08 22:58 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Áp dụng Domain Testing cho Pool C FR-18: Order management (admin) (được đề cập trong tài liệu requirements/2026.HW02.Domain Testing_En.md) áp dụng cho dự án eshop-sut. Chia ra thành nhiều file nếu có các chức năng nhỏ khác nhau. Vui lòng đọc kỹ các tài liệu đặc tả bao gồm: eshop-sut/README, eshop-sut/api_specification.md. Kết quả đầu ra (output) của tính năng này sẽ được thêm vào thư mục ./domain-testing/FR-18_order-management-admin.
- Output: Đã tạo bộ artifact Domain Testing cho FR-18 trong domain-testing/FR-18_order-management-admin, gồm README.md, FR-18_admin-order-list_domain_testing.md, FR-18_admin-order-status-update_domain_testing.md, và FR-18_admin-shipping-address-safe-display_domain_testing.md. Nội dung chia theo chức năng nhỏ: admin xem toàn bộ đơn hàng, admin cập nhật trạng thái theo FR-10 state machine, và hiển thị an toàn shipping_address. Các artifact dùng tiếng Việt, có EP/BVA, testcase chưa thực thi với cột Kết quả thực tế và Đạt để trống, ghi rõ contract gap/rủi ro đặc tả, và không viết phần AI gap analysis.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 027
- Time: `2026-07-08 23:14 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Áp dụng Domain Testing cho Pool D FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước) nhưng cho mobile (được đề cập trong tài liệu requirements/2026.HW02.Domain Testing_En.md) áp dụng cho dự án eshop-sut. Chia ra thành nhiều file nếu có các chức năng nhỏ khác nhau. Vui lòng đọc kỹ các tài liệu đặc tả bao gồm: eshop-sut/README.md, eshop-sut/api_specification.md. Kết quả đầu ra (output) của tính năng này sẽ được thêm vào thư mục ./domain-testing/FR-03_reset-password-mobile.
- Output: Đã tạo thư mục domain-testing/FR-03_reset-password-mobile với README.md và hai artifact Markdown: FR-03_mobile-forgot-password-request-otp_domain_testing.md cho Bước 1 lấy OTP, FR-03_mobile-reset-password_domain_testing.md cho Bước 2 đặt lại mật khẩu. Các artifact dùng nguồn black-box requirements/2026.HW02.Domain Testing_En.md, eshop-sut/README.md, eshop-sut/api_specification.md; bao gồm EP, BVA, test case Mobile/API, giả định, contract gaps, và cột trống Kết quả thực tế/Đạt để người học điền khi thực thi.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 028
- Time: `2026-07-08 23:47 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [$superpowers:writing-skills](/home/tkin/.codex/plugins/cache/openai-api-curated/superpowers/d6169bef/skills/writing-skills/SKILL.md) [$skill-creator](/home/tkin/.codex/skills/.system/skill-creator/SKILL.md) Cập nhật [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md)  để skill có thể tách một chức năng lớn thành các file cho những chức năng nhỏ để dễ dàng hơn trong quá trình kiểm thử. Tuy nhiên phương pháp test vẫn phải bám sát references/04_Domain Testing.md và và đảm bảo tính độc lập, portable, có thể release thành 1 skill tái sử dụng.
- Output: Đã cập nhật .agents/skills/applying-domain-testing/SKILL.md để hỗ trợ tách feature lớn thành nhiều artifact sub-feature độc lập, thêm decomposition map, README/index cho thư mục output, quy tắc mỗi child artifact vẫn chạy đủ Domain Testing theo EP/BVA, và nhấn mạnh phương pháp bám sát references/04_Domain Testing.md nhưng vẫn self-contained/portable khi release. Đã cập nhật .agents/skills/applying-domain-testing/agents/openai.yaml để metadata phản ánh khả năng split sub-feature files. Đã kiểm tra bằng quick_validate.py và git diff --check.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`


### Entry 029
- Time: `2026-07-09 00:04 +07`
- Tool/Model: `Codex / GPT-5`
- Prompt: [@superpowers](plugin://superpowers@openai-api-curated) [$applying-domain-testing](/home/tkin/Documents/hcmus/software-testing/HW02/.agents/skills/applying-domain-testing/SKILL.md) Áp dụng Domain Testing cho Pool B FR-07: Giỏ hàng (Shopping cart) (được đề cập trong tài liệu requirements/2026.HW02.Domain Testing_En.md) - chức năng cập nhật số lượng trong giỏ hàng, xóa sản phẩm trong giỏ hàng, tiếp tục mua hàng từ giỏ hàng, áp dụng cho dự án eshop-sut (Vui lòng đọc kỹ các tài liệu đặc tả bao gồm: eshop-sut/README, eshop-sut/api_specification.md). Kết quả đầu ra (output) của tính năng này sẽ được thêm vào thư mục ./domain-testing/FR-07_shopping-cart.
- Output: Đã tạo/cập nhật các artifact Domain Testing trong thư mục domain-testing/FR-07_shopping-cart: README.md, FR-07_shopping-cart_update-cart-quantity_domain_testing.md, FR-07_shopping-cart_remove-cart-product_domain_testing.md, và FR-07_shopping-cart_continue-shopping-from-cart_domain_testing.md. Các artifact dùng nguồn black-box từ requirements/2026.HW02.Domain Testing_En.md, eshop-sut/README.md và eshop-sut/api_specification.md; tách theo hành vi quan sát được; dùng biến A_id, N_A, X, B_id, N_B, Y cho dữ liệu runtime không có trong đặc tả; để trống cột Kết quả thực tế/Đạt để sinh viên điền sau khi thực thi.
- Human Review/Corrections: `[Manual by user]`
- Final Use in Submission: `[Manual by user]`

## Integrity Notes

- AI-generated content verified against requirements: `[TODO]`
- Manual corrections made: `[TODO]`
- Limitations or risks: `[TODO]`
