# AI Critique - HW02 Domain Testing and BVA

## 1. Mục tiêu đánh giá

Tài liệu này đánh giá vai trò của AI trong quá trình thực hiện HW02 cho EShop SUT, gồm thiết kế Domain Testing / Boundary Value Analysis, sinh test case, hỗ trợ thực thi, ghi nhận bug, rà soát bằng chứng và hoàn thiện báo cáo. Cách sử dụng AI trong bài này không xem AI là nguồn quyết định cuối cùng, mà là công cụ tăng tốc để tạo bản nháp có cấu trúc, sau đó được sinh viên kiểm tra lại bằng requirement, API specification, README của SUT, thao tác black-box và bằng chứng thực tế.

Phạm vi critique tập trung vào bốn feature đã chọn: FR-04 Personal profile management, FR-08 Checkout, FR-15 Product management CRUD và FR-06 Mobile product detail view.

## 2. Cách AI được sử dụng trong bài

AI được dùng nhiều nhất ở giai đoạn phân tích ban đầu: đọc context của từng feature, đề xuất biến input/output/state, chuyển chúng thành điều kiện kiểm thử, phân hoạch equivalence class, xác định giá trị boundary khi có căn cứ, rồi sinh test case candidate. Các Agent Skills trong `.agents/skills/` giúp chuẩn hóa workflow này để các feature đi qua cùng một chuỗi checkpoint thay vì mỗi phần viết theo một kiểu khác nhau.

AI cũng hỗ trợ các công việc phụ trợ: tạo script execution cho API/Web workflow, gợi ý cách nhóm bug, rà soát link reference, kiểm tra tính nhất quán giữa Main Report, Bug Report, AI Audit Report và README. Với FR-06, AI còn hỗ trợ kiểm tra mobile UI, phân loại screenshot theo bug và chuẩn bị kịch bản demo agent skills.

Tuy nhiên, các phần cần quyết định nghiệp vụ như expected result, bug confirmation, pass/fail status và mức độ nghiêm trọng không thể giao hoàn toàn cho AI. Những phần này được đối chiếu lại với requirement công khai và kết quả thực thi trên SUT.

## 3. Điểm AI hỗ trợ tốt

AI đặc biệt hữu ích ở việc tạo cấu trúc. Khi một feature có nhiều biến và nhiều trạng thái, AI giúp tách nhanh các nhóm như authentication state, request completeness, input validity, output response, UI state và post-condition. Nhờ đó test suite tránh bị lệch về happy path và bao phủ được các case âm tính quan trọng.

AI cũng giúp phát hiện khoảng trống trong prompt hoặc requirement. Ví dụ với FR-08, AI ban đầu thấy `total_amount` là một input trong request checkout. Sau khi được yêu cầu critique, AI chỉ ra rủi ro backend tin dữ liệu từ client và giúp mở rộng analysis sang rule quan trọng hơn: hệ thống phải tự kiểm soát tổng tiền dựa trên cart. Với FR-15, AI giúp nhận ra cần tách lỗi API thiếu auth/validation khỏi lỗi UI update isolation để bug report không gom quá rộng.

Một lợi ích khác là tính nhất quán tài liệu. AI hỗ trợ đồng bộ số liệu test summary, GitHub issue links, screenshot paths, reference paths và phần agent skills demo. Đây là loại việc dễ sai khi làm thủ công vì chỉ cần đổi một bug hoặc một test case là nhiều bảng trong report phải đổi theo.

## 4. Hạn chế và rủi ro của AI

Rủi ro lớn nhất là AI có xu hướng tự lấp khoảng trống nếu prompt không ràng buộc rõ. Trong Domain Testing và BVA, điều này nguy hiểm vì AI có thể tự tạo min/max, format rule hoặc expected result mà requirement không nêu. Ví dụ, nếu không kiểm tra lại README và API specification, AI có thể biến độ dài `shipping_address`, `description` hoặc `imageUrl` thành boundary chính thức dù không có giới hạn công khai.

AI cũng dễ lẫn giữa black-box testing và source-code inspection. Với FR-06, một số test case ban đầu thiên về đọc source, deep link, proxy/offline hoặc trạng thái không thể quan sát ổn định trong phạm vi bài. Các case này phải được loại bỏ để giữ đúng yêu cầu black-box và tránh làm phồng số lượng test case không thực thi được.

Một hạn chế khác là AI có thể mô tả actual result nghe hợp lý nhưng chưa chắc đúng với SUT. Vì vậy bài này không để AI tự điền actual output trước khi execution. Những actual result trong Main Report được giữ theo kết quả thực thi hoặc theo phạm vi đã được người làm bài xác nhận, còn các bằng chứng bug được liên kết tới screenshot/API evidence.

AI cũng không tự đảm bảo link và artifact luôn đúng sau nhiều vòng sửa. Các lỗi như đường dẫn tuyệt đối, thư mục nháp cũ, ảnh trùng giữa bug, hoặc reference chưa cập nhật vẫn cần human review rà lại trước khi nộp.

## 5. Ví dụ cụ thể theo feature

### 5.1 FR-04 - Personal Profile Management

AI hỗ trợ tách các miền liên quan đến token, dữ liệu profile, partial update, input validation và dữ liệu nhạy cảm trong response. Điểm tốt là AI nhanh chóng gợi ý các negative case như thiếu trường, dữ liệu sai định dạng, hoặc gửi thêm field ngoài scope.

Điểm cần human review là oracle bảo mật. Nếu chỉ nhìn API hoạt động được, AI có thể đánh giá `GET /api/users/me` là pass khi trả về profile. Nhưng với requirement profile cá nhân, response không nên lộ password, reset token hoặc trạng thái nội bộ. Human review đã chuyển đây thành bug riêng thay vì chỉ ghi nhận như dữ liệu phụ.

### 5.2 FR-08 - Checkout

FR-08 là ví dụ rõ nhất về rủi ro AI bị kéo theo API sample. Vì request mẫu có `total_amount`, AI có thể xem đây là input hợp lệ do client điều khiển. Sau khi critique lại, expected behavior được chỉnh theo hướng an toàn hơn: backend phải tự tính hoặc xác minh tổng tiền từ cart, không tin số tiền do client gửi lên.

AI cũng giúp mở rộng coverage sang empty cart, invalid cart item, thiếu `shipping_address`, checkout không clear cart và UI cho sửa tổng tiền. Các lỗi này chỉ được xác nhận sau khi thực thi, không chỉ dựa trên suy luận.

### 5.3 FR-15 - Product Management CRUD

AI hỗ trợ tốt trong việc gom nhóm CRUD theo create, update, delete, list/detail và auth state. Sau khi đối chiếu README công khai, các rule có căn cứ như `name` bắt buộc, `price > 0`, `category_id` hợp lệ và giới hạn tên sản phẩm được đưa vào test suite.

Điểm cần sửa là phân loại bug. API thiếu auth/validation là một nhóm lỗi lớn, nhưng UI update làm đổi tên nhiều sản phẩm lại là lỗi ở tầng giao diện/state management. Nếu không tách, bug report sẽ khó quản lý và khó map về test case.

### 5.4 FR-06 - Mobile Product Detail View

FR-06 cho thấy AI hữu ích nhưng phải được kiểm soát chặt scope. AI ban đầu có thể đề xuất các case như deep link, network interruption, proxy error hoặc đọc source để tìm constraint. Những case này không phù hợp với yêu cầu black-box trong bài và đã được bỏ.

Sau khi đối chiếu `eshop-sut/README.md`, FR-06 được thu gọn về các behavior quan sát được: hiển thị ảnh lớn, tên, giá, mô tả, danh mục; quantity là số nguyên dương tối thiểu `1`; xử lý quantity `0` và non-integer; add-to-cart có badge/toast; và màn hình không thiếu breadcrumb/định hướng trang con. Điều này làm test suite ngắn hơn nhưng đáng tin hơn.

## 6. Vai trò của human review

Human review là lớp kiểm soát bắt buộc trong toàn bộ bài. Người làm bài phải quyết định feature nào thuộc phạm vi, điều kiện nào có căn cứ, boundary nào hợp lệ, test case nào thực thi được, và bug nào đủ bằng chứng để báo cáo.

Trong quá trình hoàn thiện, human review đã thực hiện các chỉnh sửa quan trọng: loại bỏ test case trùng hoặc không black-box, sửa ảnh evidence bị dùng lặp, bỏ bằng chứng không cần thiết cho case pass, chia bug report theo section để dễ quản lý, cập nhật GitHub issue links, chuẩn hóa reference path và đồng bộ test summary. Những việc này cho thấy AI không thay thế trách nhiệm kiểm thử, mà chỉ hỗ trợ tăng tốc thao tác và nhắc các điểm cần rà.

## 7. Bài học rút ra khi prompt AI

Prompt hiệu quả cần nêu rõ nguồn requirement được phép dùng, phạm vi black-box, format bảng cần sinh, quy tắc không tự bịa boundary và yêu cầu ghi rõ assumption. Nếu test case chưa được thực thi, AI không nên tự điền actual result hoặc trạng thái pass/fail.

Khi dùng AI để sinh bug report, prompt nên yêu cầu mỗi bug chỉ đại diện một fault chính, có test case đối chiếu, severity/priority hợp lý, expected/actual rõ ràng và evidence path cụ thể. Với report dài, prompt cũng cần yêu cầu AI rà consistency giữa test summary, bug count, issue link và reference list.

Với Agent Skills, bài học quan trọng là chia workflow thành checkpoint nhỏ: context extraction, domain modeling, test design, execution preparation, report writeback và audit. Cách này giúp người dùng kiểm soát từng bước, giảm rủi ro AI đi quá xa rồi phải sửa lại nhiều.

## 8. Kết luận

AI mang lại giá trị lớn trong HW02 ở tốc độ tạo bản nháp, độ bao phủ ý tưởng, chuẩn hóa cấu trúc và rà soát consistency. Tuy vậy, AI có hạn chế rõ ràng trong việc xác định oracle nghiệp vụ, phân biệt assumption với requirement, đảm bảo black-box scope và xác nhận actual result.

Cách sử dụng phù hợp nhất là AI-first nhưng human-reviewed: để AI tạo candidate analysis và hỗ trợ tự động hóa, sau đó người làm bài kiểm chứng bằng requirement, SUT execution và evidence. Với cách tiếp cận này, AI trở thành một trợ lý kiểm thử hữu ích thay vì một nguồn kết luận không kiểm chứng.
