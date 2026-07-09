 

# HW02 Main Report - Domain Testing and Boundary Value Analysis

## 1. Introduction

TODO: Summarize HW02 objective, selected EShop features, and the AI-first, human-reviewed testing workflow.

## 2. Selected Features

| Pool | Feature ID | Feature Name                | Surface       | Status |
| :--- | :--------- | :-------------------------- | :------------ | :----- |
| A    | FR-04      | Personal profile management | Web/API       | TODO   |
| B    | FR-08      | Checkout                    | Web/API       | TODO   |
| C    | FR-15      | Product management CRUD     | Admin Web/API | TODO   |
| D    | FR-06      | Mobile product detail view  | Mobile/API    | TODO   |

## 3. Testing Methodology

### 3.1 Phân tích Phân hoạch tương đương / Domain Testing

Kỹ thuật Phân hoạch tương đương (Equivalent Partitioning - EP) và Phân tích Miền (Domain Testing) được thực hiện theo cấu trúc 4 bước kế thừa từ tài liệu bài giảng và biểu mẫu báo cáo chuẩn [23127205.pdf](file:///d:/LEARNING/CNTT_CLC(2023-2027)/NamBa/HK3/Kiểm thử phần mềm/HW/HW2/HW02/references/23127205.pdf). Tuy nhiên, các bước 1, 2 và 3 đã được chuẩn hóa sang **dạng bảng biểu** có cột **Cơ sở lý do lựa chọn (Rationale)** để giải thích rõ lý do kỹ thuật đằng sau mỗi quyết định thiết kế:

1. **Step 1: Xác định Input và Output:** Nhận diện toàn bộ các biến số đầu vào, trạng thái hệ thống và kết quả đầu ra có thể quan sát/kiểm chứng từ góc độ Black-Box (giao diện UI và đặc tả API công khai). Mỗi biến đều đi kèm lý do lựa chọn trong cột Rationale.
2. **Step 2: Xác định Condition:** Định nghĩa cụ thể các điều kiện biên nghiệp vụ hoặc ràng buộc ràng buộc đối với các biến đầu vào/đầu ra, đi kèm cơ sở quy định (Rationale) từ SUT.
3. **Step 3: Xác định miền phân hoạch tương đương (EP):** Chia các điều kiện thành các phân vùng hợp lệ (Valid) và không hợp lệ (Invalid), xác định giá trị đại diện và giải thích chi tiết lý do phân nhóm (Rationale).
4. **Step 4: Xác định Test Case:** Thiết lập các kịch bản kiểm thử cụ thể dưới dạng bảng dữ liệu. Áp dụng nguyên tắc Đơn lỗi (Single Fault Assumption) cho các ca kiểm thử không hợp lệ (chỉ chứa duy nhất một tham số không hợp lệ trong một test case) để tránh hiện tượng che khuất lỗi khi thực thi.

### 3.2 Phân tích Giá trị biên (Boundary Value Analysis)

Kỹ thuật Phân tích Giá trị biên (BVA) tập trung vào các lỗi ranh giới (ví dụ: lỗi toán tử so sánh hoặc độ dài). Quy trình BVA được tổ chức thành 3 bước dạng bảng:

1. **Step 1: Xác định các tham số định lượng:** Lọc ra các biến số đầu vào/đầu ra có tính chất thứ tự, số lượng hoặc liên tục (ví dụ: độ dài chuỗi, số tiền, số lượng sản phẩm).
2. **Step 2: Xác định biên và cận biên:** Với các tham số được chọn, xác định các giá trị kiểm thử cận biên (Biên dưới, cận dưới trong/ngoài biên, giá trị bình thường, cận trên trong/ngoài biên, biên trên). Đồng thời tích hợp cột **Giải thích nguồn gốc biên (Rationale)** để chứng minh cơ sở xác định biên (ví dụ: quan sát giao diện hoặc đặc tả API).
3. **Step 3: Xác định BVA Test Case:** Thiết kế các ca kiểm thử cụ thể. Khi kiểm thử một biến tại biên, tất cả các biến số khác được giữ ở giá trị bình thường hợp lệ (nominal valid value) để cô lập hành vi tại biên.

### 3.3 Quy trình AI-First và Rà soát bởi con người (Human Review)

Quy trình thiết kế và thực thi kiểm thử tuân thủ nguyên lý phối hợp giữa AI và con người theo syllabus ISTQB CT-AI:

- **AI-First:** Sử dụng bộ Agent Skills được lập trình riêng cho dự án (`domain_testing`, `bva_testing`) để hướng dẫn AI sinh các phân tích nghiệp vụ, điều kiện, phân hoạch và các kịch bản kiểm thử đề xuất (candidate test cases) từ tài liệu requirement và hành vi quan sát được của SUT.
- **Human Review:** Con người (sinh viên) trực tiếp rà soát, chỉnh sửa các giả định sai lệch hoặc các expected result thiếu căn cứ của AI tại mỗi bước (Checkpoint) trước khi cho phép AI thực hiện bước tiếp theo.
- **Thực thi thực tế:** Kết quả thực tế (Actual Results) và trạng thái Pass/Fail/Bug tuyệt đối không được AI tự điền trước. Việc thực thi kiểm thử hoàn toàn do sinh viên chạy thủ công trên SUT, sau đó ghi nhận kết quả và báo lỗi (nếu có) trên GitHub Issues đi kèm ảnh chụp bằng chứng cụ thể. Các lỗi đã xác nhận sẽ được dẫn link trực tiếp từ bảng Test Case trong Main Report tới GitHub Issue và Bug Report tương ứng.

## 4. FR-04 - Personal Profile Management

### 4.1 Feature Overview

FR-04 Personal Profile Management cho phép customer đã đăng nhập xem và cập nhật thông tin cá nhân của chính mình. Tính năng được kiểm thử theo hướng black-box trên Web/API, tập trung vào luồng xem profile, cập nhật các trường thông tin cơ bản và kiểm tra phản hồi của hệ thống khi request hợp lệ hoặc không hợp lệ.

| Mục                      | Nội dung                                                                                                                                                                          |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature ID               | FR-04                                                                                                                                                                             |
| Feature name             | Personal Profile Management                                                                                                                                                       |
| Pool                     | A                                                                                                                                                                                 |
| Surface                  | Web/API                                                                                                                                                                           |
| User role                | Customer đã đăng nhập                                                                                                                                                             |
| Preconditions            | User có tài khoản hợp lệ, đã đăng nhập và có authentication token hợp lệ. Trang/API profile có thể truy cập được.                                                                 |
| API liên quan            | `GET /api/users/me`, `PUT /api/users/me`                                                                                                                                          |
| Input chính              | Authentication token,`name`, `shipping_address`, `phone`, mức đầy đủ của request body.                                                                                            |
| Output/state chính       | Profile data được trả về/hiển thị, kết quả cập nhật profile, trạng thái dữ liệu sau update, unauthorized error, validation error nếu SUT có rule tương ứng.                       |
| Out of scope             | Registration/login flow, password change/reset, admin user management, dữ liệu profile của user khác.                                                                             |
| Điểm cần verify trên SUT | Min/max length của`name`, `shipping_address`, `phone`; format bắt buộc của `phone`; behavior khi field rỗng; persistence sau update bằng reload profile hoặc `GET /api/users/me`. |

Request body tham chiếu cho luồng cập nhật hợp lệ:

### 4.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến              | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT                                                                                  | Cơ sở lý do lựa chọn (Rationale)                                              |
| :-------------------------- | :------------------------ | :----------------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `Authentication Token`      | Input                     | String (JWT / Header)    | Mã xác thực gửi kèm trong Header request để thực thi các API Profile.                                     | Bắt buộc đối với các API yêu cầu đăng nhập. Cần xác thực phân quyền của user. |
| `name`                      | Input                     | String                   | Tên khách hàng gửi trong body request khi cập nhật thông tin.                                             | Biến đầu vào chính của tính năng cập nhật thông tin cá nhân.                  |
| `shipping_address`          | Input                     | String                   | Địa chỉ nhận hàng gửi trong body request khi cập nhật thông tin.                                          | Biến đầu vào chính để kiểm tra tính năng lưu địa chỉ.                         |
| `phone`                     | Input                     | String                   | Số điện thoại liên hệ gửi trong body request khi cập nhật thông tin.                                      | Biến đầu vào quan trọng thường có quy tắc ràng buộc định dạng chuỗi số.       |
| `Request body completeness` | Input                     | Object (JSON)            | Cấu trúc dữ liệu trong body request (đủ các trường hỗ trợ, thiếu trường, hoặc thừa trường ngoài phạm vi). | Kiểm tra khả năng xử lý của API trước các dị biệt cấu trúc dữ liệu gửi lên.   |
| `Profile Data`              | Output                    | JSON / Object            | Dữ liệu thông tin cá nhân được trả về và hiển thị trên UI/API response.                                   | Xác nhận thông tin trả về có đúng chính chủ đang đăng nhập hay không.         |
| `Update Result`             | Output                    | HTTP Status / Message    | Phản hồi của API (chấp nhận cập nhật hoặc báo lỗi dữ liệu).                                               | Xác định phản hồi nghiệp vụ của hệ thống trước yêu cầu cập nhật.              |
| `Profile State Persistence` | Output / State            | State (Database)         | Dữ liệu thực tế được cập nhật và duy trì trong cơ sở dữ liệu.                                             | Đảm bảo kết quả cập nhật được ghi nhận lâu dài (kiểm chứng qua GET request).  |
| `Unauthorized Error`        | Output                    | HTTP Status / Message    | Lỗi 401 Unauthorized khi truy cập không hợp lệ.                                                           | Bảo vệ dữ liệu cá nhân, chặn truy cập khi thiếu/sai token xác thực.           |
| `Validation Error`          | Output                    | HTTP Status / Message    | Lỗi 400 Bad Request/Validation khi dữ liệu đầu vào vi phạm quy tắc.                                       | Đảm bảo tính toàn vẹn dữ liệu, chặn lưu thông tin sai quy định.               |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng           | Mô tả điều kiện                                                          | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale)                                                |
| :---------------- | :-------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| C1                | `Authentication Token`      | Khách hàng có token hợp lệ khi gọi API                                   | Điều kiện tiên quyết để hệ thống chấp nhận thực thi yêu cầu của khách hàng.                 |
| C2                | `Authentication Token`      | Request không gửi kèm token xác thực                                     | Kiểm tra cơ chế chặn truy cập trái phép của hệ thống (401 Unauthorized).                    |
| C3                | `Authentication Token`      | Request kèm token không hợp lệ hoặc đã hết hạn                           | Đảm bảo hệ thống phát hiện và từ chối các phiên làm việc hết hạn hoặc bị giả mạo.           |
| C4                | `Profile Data`              | Khách hàng đã đăng nhập gửi request GET xem profile của chính mình       | Nghiệp vụ hiển thị thông tin cá nhân tương ứng với tài khoản đang đăng nhập.                |
| C5                | `Request body completeness` | Body cập nhật chứa đầy đủ các trường:`name`, `shipping_address`, `phone` | Cấu trúc request cập nhật hợp chuẩn thông thường theo đặc tả của API.                       |
| C6                | `Request body completeness` | Body cập nhật thiếu một trong các trường trên                            | Kiểm nghiệm xem API có cho phép cập nhật từng phần (partial update) hay bắt buộc đủ trường. |
| C7                | `Request body completeness` | Body cập nhật chứa thêm trường ngoài scope (ví dụ:`role`)                | Đảm bảo API lọc bỏ các trường không được hỗ trợ hoặc từ chối hành vi thao túng dữ liệu.     |
| C8                | `name`                      | Trường`name` có giá trị chuỗi hợp lệ                                     | Cập nhật tên hiển thị hợp lệ trên tài khoản.                                                |
| C9                | `name`                      | Trường`name` rỗng hoặc không có giá trị                                  | Kiểm tra ràng buộc bắt buộc nhập tên hiển thị (tránh hồ sơ rỗng tên).                       |
| C10               | `shipping_address`          | Trường`shipping_address` có giá trị chuỗi hợp lệ                         | Cập nhật địa chỉ nhận hàng của người dùng.                                                  |
| C11               | `shipping_address`          | Trường`shipping_address` rỗng hoặc không có giá trị                      | Kiểm tra hành vi hệ thống xem địa chỉ có phải là trường bắt buộc hay không.                 |
| C12               | `phone`                     | Trường`phone` có giá trị chuỗi hợp lệ                                    | Cập nhật số điện thoại liên hệ hợp lệ.                                                      |
| C13               | `phone`                     | Trường`phone` rỗng hoặc không có giá trị                                 | Kiểm tra ràng buộc bắt buộc nhập số điện thoại hoặc cho phép để trống.                      |
| C14               | `phone`                     | Trường`phone` sai định dạng chuỗi số liên hệ                             | Kiểm tra cơ chế kiểm soát dữ liệu số điện thoại (chỉ nhận số, theo đầu số nhà mạng).        |
| C15               | `Profile State Persistence` | Sau khi cập nhật thành công, reload hoặc GET trả về dữ liệu mới          | Xác thực tính nhất quán và lưu trữ thành công dữ liệu vào cơ sở dữ liệu.                    |
| C16               | `Profile State Persistence` | Khi có lỗi hoặc unauthorized, dữ liệu cũ giữ nguyên                      | Đảm bảo tính an toàn dữ liệu, không ghi đè dữ liệu rác khi yêu cầu thất bại.                |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện                                  | Lý do lựa chọn & Biên (Rationale)                                                          |
| :----------------- | :--------------------- | :-------------------------------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| E1                 | C1                     | Hợp lệ (Valid)                          | Request gửi kèm Token hợp lệ                                         | Phân vùng cơ bản cho người dùng đã đăng nhập để thực hiện mọi thao tác.                    |
| E2                 | C2                     | Không hợp lệ (Invalid)                  | Request không gửi Token                                              | Phân vùng lỗi nhằm kiểm tra tính năng chặn truy cập khi thiếu định danh.                   |
| E3                 | C3                     | Không hợp lệ (Invalid)                  | Request gửi Token sai hoặc hết hạn                                   | Phân vùng lỗi nhằm kiểm tra tính năng chặn truy cập khi token không hợp lệ.                |
| E4                 | C4                     | Hợp lệ (Valid)                          | GET`/api/users/me` trả về đúng profile của chính chủ                 | Kịch bản hợp lệ cho tính năng xem thông tin tài khoản cá nhân.                             |
| E5                 | C5                     | Hợp lệ (Valid)                          | Body cập nhật chứa đầy đủ: name, address, phone                      | Ca hợp lệ cơ bản cho happy path cập nhật thông tin cá nhân.                                |
| E6                 | C6                     | Hợp lệ (Valid)                          | Thiếu`phone` nhưng API vẫn cho phép cập nhật từng phần               | Phân vùng hợp lệ nếu API hỗ trợ cơ chế PATCH/partial update (cần verify thực tế).          |
| E7                 | C6                     | Không hợp lệ (Invalid)                  | Thiếu`phone` và bị từ chối cập nhật                                  | Phân vùng lỗi nếu hệ thống yêu cầu cấu trúc body hoàn chỉnh (cần verify thực tế).          |
| E8                 | C7                     | Hợp lệ (Valid)                          | Có trường ngoài scope (`role: "admin"`) nhưng API bỏ qua             | Phân vùng hợp lệ nếu hệ thống tự động lọc bỏ trường lạ mà không chặn request (cần verify). |
| E9                 | C7                     | Không hợp lệ (Invalid)                  | Có trường ngoài scope (`role: "admin"`) và request bị từ chối        | Phân vùng lỗi nếu hệ thống áp dụng cơ chế strict-validation cho request body (cần verify). |
| E10                | C8                     | Hợp lệ (Valid)                          | `name` là chuỗi ký tự hợp lệ (ví dụ: `Nguyen Van A`)                 | Lớp giá trị tên hợp lệ tiêu chuẩn cho người dùng Việt Nam.                                 |
| E11                | C9                     | Không hợp lệ (Invalid)                  | `name` là chuỗi rỗng `""`                                            | Kiểm tra ràng buộc bắt buộc nhập trường họ tên để tránh dữ liệu lỗi (cần verify).          |
| E12                | C10                    | Hợp lệ (Valid)                          | `shipping_address` là chuỗi hợp lệ (ví dụ: `123 Le Loi, Q1, TP.HCM`) | Lớp giá trị địa chỉ hợp lệ tiêu chuẩn.                                                     |
| E13                | C11                    | Không hợp lệ (Invalid)                  | `shipping_address` là chuỗi rỗng `""`                                | Kiểm tra xem địa chỉ có bắt buộc nhập hay hệ thống cho phép xóa trắng (cần verify).        |
| E14                | C12                    | Hợp lệ (Valid)                          | `phone` là chuỗi số hợp lệ dài 9-10 chữ số (ví dụ: `0912345678`)     | Lớp giá trị số điện thoại hợp lệ theo bộ testcase FR-04 hiện tại.                          |
| E15                | C13                    | Không hợp lệ (Invalid)                  | `phone` là chuỗi rỗng `""`                                           | Kiểm tra xem số điện thoại có bắt buộc nhập hay cho phép xóa trắng (cần verify).           |
| E16                | C14                    | Không hợp lệ (Invalid)                  | `phone` chứa ký tự không phải số hoặc ngoài độ dài 9-10 chữ số       | Kiểm tra tính năng validate định dạng số điện thoại theo bộ testcase FR-04 hiện tại.       |
| E17                | C15                    | Hợp lệ (Valid)                          | Gọi GET ngay sau cập nhật thành công trả về thông tin mới            | Kiểm tra tính persistence của dữ liệu sau khi API trả về thành công.                       |
| E18                | C16                    | Hợp lệ (Valid)                          | Gọi GET sau khi cập nhật thất bại trả về thông tin cũ                | Đảm bảo dữ liệu cũ không bị biến đổi khi cập nhật lỗi.                                     |

#### Step 4: Xác định Test Case

| Mã test case  | Authentication state | API/Action                                         | name         | shipping_address            | phone      | Request body                                    | Kết quả mong đợi                                                                                                                          | Kết quả thực tế                                                                                                                                               | Trạng thái | Bug ID / Evidence                                       | Phủ các lớp EP                 |
| :------------ | :------------------- | :------------------------------------------------- | :----------- | :-------------------------- | :--------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- | :------------------------------------------------------ | :----------------------------- |
| FR04-DOM-TC01 | Token hợp lệ         | `GET /api/users/me`                                | `""`         | `""`                        | `""`       | `""`                                            | Trả về profile data của đúng customer đang đăng nhập; response không được chứa mật khẩu, reset token hoặc dữ liệu nội bộ không cần thiết. | API trả về 200 OK nhưng JSON response chứa cả`password`, `reset_token`, `login_attempts`, `locked_until` và các trường nội bộ khác.                           | Failed     | [BUG-FR04-04](./BUG_FR04_04_Sensitive_Data_Exposure.md) | E1, E4, E10, E12, E14, E17     |
| FR04-DOM-TC02 | Token hợp lệ         | `PUT /api/users/me` rồi reload/`GET /api/users/me` | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ`name`, `shipping_address`, `phone`           | Update được chấp nhận; profile sau reload/GET trả về dữ liệu mới.                                                                         | API cập nhật trực tiếp thành công, nhưng trên giao diện Web Frontend yêu cầu bị chặn lại và hiển thị cảnh báo không hợp lệ do lỗi định dạng Regex của Client. | Failed     | [BUG-FR04-05](./Bug_Report_Template.md)                 | E1, E4, E5, E10, E12, E14, E17 |
| FR04-DOM-TC03 | Thiếu token          | `GET /api/users/me`                                | `""`         | `""`                        | `""`       | `""`                                            | Trả về/hiển thị unauthorized error; không trả về profile data.                                                                            | API từ chối với mã lỗi 401 Unauthorized.                                                                                                                      | Pass       | `""`                                                    | E2                             |
| FR04-DOM-TC04 | Token sai/hết hạn    | `GET /api/users/me`                                | `""`         | `""`                        | `""`       | `""`                                            | Trả về/hiển thị unauthorized error; không trả về profile data.                                                                            | API từ chối với mã lỗi 403 Forbidden.                                                                                                                         | Pass       | `""`                                                    | E3                             |
| FR04-DOM-TC05 | Thiếu token          | `PUT /api/users/me`                                | Tran Van B   | 45 Nguyen Hue, Q1, TP.HCM   | 0987654321 | Đủ`name`, `shipping_address`, `phone`           | Trả về/hiển thị unauthorized error; profile cũ không bị thay đổi.                                                                         | API từ chối với mã lỗi 401 Unauthorized.                                                                                                                      | Pass       | `""`                                                    | E2                             |
| FR04-DOM-TC06 | Token sai/hết hạn    | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ`name`, `shipping_address`, `phone`           | Trả về/hiển thị unauthorized/forbidden error; profile cũ không bị thay đổi.                                                               | API từ chối với mã lỗi 403 Forbidden.                                                                                                                         | Pass       | `""`                                                    | E3                             |
| FR04-DOM-TC07 | Token hợp lệ         | `PUT /api/users/me`                                | Le Thi C     | 88 Pasteur, Q3, TP.HCM      | `""`       | Thiếu field`phone`                              | Trả về validation error và profile cũ không đổi (yêu cầu đủ field).                                                                       | API trả về 200 OK nhưng gán giá trị NULL xóa trắng dữ liệu phone hiện có.                                                                                     | Failed     | [BUG-FR04-02](./Bug_Report_Template.md)                 | E7                             |
| FR04-DOM-TC08 | Token hợp lệ         | `PUT /api/users/me`                                | Pham Van D   | 10 Hai Ba Trung, Q1, TP.HCM | 0900000000 | Có thêm field ngoài scope, ví dụ`role: "admin"` | Chỉ cập nhật các trường thông tin cá nhân và từ chối nâng quyền.                                                                          | API trả về 200 OK và cập nhật vai trò của tài khoản thành admin.                                                                                              | Failed     | [BUG-FR04-01](./Bug_Report_Template.md)                 | E9                             |
| FR04-DOM-TC09 | Token hợp lệ         | `PUT /api/users/me`                                | `""`         | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ field,`name` rỗng                            | Báo lỗi validation bắt buộc nhập`name`.                                                                                                   | API trả về 200 OK và cập nhật chuỗi rỗng vào tên của tài khoản.                                                                                               | Failed     | [BUG-FR04-03](./Bug_Report_Template.md)                 | E11                            |
| FR04-DOM-TC10 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | `""`                        | 0912345678 | Đủ field,`shipping_address` rỗng                | Báo lỗi validation bắt buộc nhập`shipping_address`.                                                                                       | API trả về 200 OK và cập nhật chuỗi rỗng vào địa chỉ trong DB.                                                                                                | Failed     | [BUG-FR04-03](./Bug_Report_Template.md)                 | E13                            |
| FR04-DOM-TC11 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | `""`       | Đủ field,`phone` rỗng                           | Báo lỗi validation bắt buộc nhập`phone`.                                                                                                  | API trả về 200 OK và cập nhật chuỗi rỗng vào trường số điện thoại.                                                                                            | Failed     | [BUG-FR04-03](./Bug_Report_Template.md)                 | E15                            |
| FR04-DOM-TC12 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | abc-phone  | Đủ field,`phone` không đúng định dạng số        | Báo lỗi số điện thoại không đúng định dạng.                                                                                               | API trả về 200 OK và chấp nhận lưu chuỗi "abc-phone" sai định dạng.                                                                                           | Failed     | [BUG-FR04-03](./Bug_Report_Template.md)                 | E16                            |

### 4.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số                           | Có áp dụng BVA không? | Lý do                                                                                                                                                |
| :-------------------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` (Độ dài chuỗi)             | Có                    | Tránh tên rỗng, tên quá ngắn hoặc quá dài gây lỗi hiển thị/cơ sở dữ liệu.                                                                            |
| `shipping_address` (Độ dài chuỗi) | Không                 | Đây là trường văn bản tự do và đặc tả không quy định giới hạn độ dài cụ thể; trường hợp rỗng đã được kiểm nghiệm ở phần phân hoạch tương đương (EP). |
| `phone` (Số lượng chữ số)         | Có                    | Số điện thoại Việt Nam có quy định cụ thể về số lượng chữ số (ví dụ: 10 chữ số).                                                                     |

#### Step 2: Xác định biên và cận biên

| Mã biên      | Tham số          | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale)                                                       |
| :----------- | :--------------- | :------------------ | :-------- | :------------------ | :------------------ | :------------------ | :-------- | :------------------ | :------------------------------------------------------------------------------------------ |
| FR04-BVA-B01 | `name` (Độ dài)  | 0                   | 1         | 2                   | 15                  | N/A                 | N/A       | N/A                 | Tên không được phép để rỗng (biên dưới = 1). Không có biên trên explicit trong requirement. |
| FR04-BVA-B02 | `phone` (Độ dài) | 8                   | 9         | 10                  | 10                  | N/A                 | 10        | 11                  | Theo bộ testcase FR-04 hiện tại, số điện thoại hợp lệ dài từ 9 đến 10 chữ số.               |

#### Step 3: Xác định BVA Test Case

| Mã test case  | Authentication Token | name           | shipping_address | phone                 | Giá trị biên được test               | Kết quả mong đợi                                                  | Kết quả thực tế                                                                                                                                               | Trạng thái | Bug ID / Evidence                       | Phủ mã biên  |
| :------------ | :------------------- | :------------- | :--------------- | :-------------------- | :----------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- | :-------------------------------------- | :----------- |
| FR04-BVA-TC01 | Token hợp lệ         | `A` (1 ký tự)  | 123 Le Loi, Q1   | 0912345678            | `name` length = 1 (tại biên dưới)    | Cập nhật thành công.                                              | Cập nhật thành công.                                                                                                                                          | Pass       | `""`                                    | FR04-BVA-B01 |
| FR04-BVA-TC02 | Token hợp lệ         | `AB` (2 ký tự) | 123 Le Loi, Q1   | 0912345678            | `name` length = 2 (trên biên dưới)   | Cập nhật thành công.                                              | Cập nhật thành công.                                                                                                                                          | Pass       | `""`                                    | FR04-BVA-B01 |
| FR04-BVA-TC03 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `0912345678` (10 số)  | `phone` length = 10 (tại biên)       | Cập nhật thành công.                                              | API cập nhật trực tiếp thành công, nhưng trên giao diện Web Frontend yêu cầu bị chặn lại và hiển thị cảnh báo không hợp lệ do lỗi định dạng Regex của Client. | Failed     | [BUG-FR04-05](./Bug_Report_Template.md) | FR04-BVA-B02 |
| FR04-BVA-TC04 | Token hợp lệ         | Chuỗi rỗng`""` | 123 Le Loi, Q1   | 0912345678            | `name` length = 0 (dưới biên dưới)   | Báo lỗi validation bắt buộc nhập`name`.                           | API trả về 200 OK và lưu chuỗi rỗng vào DB.                                                                                                                   | Failed     | [BUG-FR04-03](./Bug_Report_Template.md) | FR04-BVA-B01 |
| FR04-BVA-TC05 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `091234567` (9 số)    | `phone` length = 9 (dưới biên dưới)  | Báo lỗi số điện thoại không đúng định dạng.                       | API trả về 200 OK và chấp nhận số điện thoại 9 số.                                                                                                            | Failed     | [BUG-FR04-03](./Bug_Report_Template.md) | FR04-BVA-B02 |
| FR04-BVA-TC06 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `09123456789` (11 số) | `phone` length = 11 (trên biên trên) | Báo lỗi số điện thoại không đúng định dạng; profile cũ không đổi. | API trả về 200 OK và chấp nhận số điện thoại 11 số.                                                                                                           | Failed     | [BUG-FR04-03](./Bug_Report_Template.md) | FR04-BVA-B02 |

### 4.4 AI Gap Analysis

Phân tích khoảng cách (AI Gap Analysis) đánh giá sự khác biệt giữa các kịch bản kiểm thử do công cụ AI tự động thiết kế ban đầu so với các kịch bản thực tế cần thiết để phát hiện toàn bộ lỗi trên SUT. Khoảng cách này được phân tích thông qua 3 nguyên nhân cốt lõi:

#### 1. Do chất lượng dữ liệu đầu vào (Prompt Quality)

- **Khoảng cách:** AI đã bỏ sót kịch bản kiểm tra khả năng kiểm duyệt dữ liệu đầu vào khi thực hiện cập nhật từng phần (Partial Update) và định dạng số điện thoại Việt Nam bắt đầu bằng số `0`.
- **Nguyên nhân:**
  - Prompt ban đầu cung cấp các thông tin quá khái quát về API và cấu trúc dữ liệu mà không mô tả chi tiết giao diện người dùng (UI) cũng như biểu thức chính quy (Regex) cụ thể của client.
  - Thiếu các chỉ thị rõ ràng trong prompt yêu cầu AI phải kiểm tra hành vi của hệ thống khi gửi thiếu trường (như không gửi trường `phone` để phát hiện lỗi ghi đè NULL) hoặc gửi dữ liệu dị biệt. Điều này khiến AI thiết kế các ca kiểm thử theo hướng "happy path" hoặc các lỗi biên lý thuyết đơn thuần, bỏ qua các lỗi logic tương tác thực tế giữa các trường.

#### 2. Do giới hạn của công cụ AI (AI Tool Limitations)

- **Khoảng cách:** AI không thể tự phát hiện lỗi thiếu kiểm duyệt dữ liệu ở Backend (chấp nhận lưu chuỗi rỗng và chữ cái vào số điện thoại) và lỗi định dạng Regex chặn số điện thoại hợp lệ ở Frontend.
- **Nguyên nhân:**
  - **Giới hạn kiểm thử tĩnh:** Tại thời điểm thiết kế kịch bản, AI hoạt động hoàn toàn ở chế độ phân tích tĩnh (Static Analysis), không có khả năng thực thi mã nguồn hay thao tác thực tế trên giao diện để nhận diện phản hồi động từ phía SUT. AI chỉ có thể dự đoán kết quả mong đợi (Expected Result) dựa trên lý thuyết kiểm thử mà không thể biết backend thực tế sẽ trả về `200 OK` thay vì từ chối dữ liệu sai.
  - **Thiên kiến thiết kế tốt (Bias):** AI có xu hướng giả định hệ thống SUT được thiết kế tối ưu theo các tiêu chuẩn công nghiệp thông thường (ví dụ: tự động kiểm tra tính hợp lệ dữ liệu và bỏ qua các thuộc tính không được khai báo). Do đó, AI không tự đưa ra các kịch bản kiểm thử tiêu cực để dò tìm các lỗi thiếu kiểm duyệt ở backend.

#### 3. Do độ phức tạp nội tại của chức năng kiểm thử (Inherent Complexity of the Feature Under Test)

- **Khoảng cách:** AI hoàn toàn bỏ sót các kịch bản kiểm tra lỗ hổng bảo mật nâng cao như Leo thang đặc quyền (Mass Assignment) và Lộ lọt dữ liệu nhạy cảm (Sensitive Data Exposure) trong response của API.
- **Nguyên nhân:**
  - Tính năng Quản lý hồ sơ cá nhân bề ngoài chỉ là một chức năng CRUD cập nhật thông tin đơn giản. Tuy nhiên, ở tầng kiến trúc API, nó chứa đựng các rủi ro bảo mật tiềm ẩn liên quan đến phân quyền và quản lý session.
  - Kỹ thuật phân tích biên (BVA) và phân hoạch tương đương (EP) thông thường chỉ tập trung vào kiểm tra giá trị của các tham số được định nghĩa sẵn trong đặc tả. Các kịch bản tấn công leo thang đặc quyền (bằng cách tiêm thuộc tính `role: "admin"` ngoài đặc tả) đòi hỏi tư duy kiểm thử khám phá (Exploratory Testing) và kiến thức chuyên sâu về bảo mật ứng dụng Web, vượt ngoài khả năng suy luận logic thông thường của AI khi chỉ bám sát tài liệu đặc tả chức năng.

## 5. FR-08 - Checkout

### 5.1 Feature Overview

FR-08 Checkout cho phép customer đã đăng nhập thực hiện thanh toán/đặt hàng từ cart thông qua Web/API. Tính năng được kiểm thử theo hướng black-box, tập trung vào trạng thái xác thực, trạng thái cart, dữ liệu `total_amount`, `shipping_address`, cấu trúc request checkout và trạng thái order/cart sau khi checkout.

| Mục                      | Nội dung                                                                                                                                                                                                        |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature ID               | FR-08                                                                                                                                                                                                           |
| Feature name             | Checkout                                                                                                                                                                                                        |
| Pool                     | B                                                                                                                                                                                                               |
| Surface                  | Web/API                                                                                                                                                                                                         |
| User role                | Customer đã đăng nhập                                                                                                                                                                                           |
| Preconditions            | User có tài khoản hợp lệ, đã đăng nhập và có authentication token hợp lệ. Cart feature hoạt động. Có thể add ít nhất một product vào cart cho normal checkout path.                                             |
| API liên quan            | `GET /api/cart`, `POST /api/cart`, `POST /api/checkout`                                                                                                                                                         |
| Input chính              | Authentication state, cart state, cart item data,`total_amount`, `shipping_address`, mức đầy đủ của request body.                                                                                               |
| Output/state chính       | Checkout/order được tạo thành công, validation error, unauthorized error, cart/order state sau checkout, không tạo order với invalid checkout data.                                                             |
| Out of scope             | Discount/coupon validation, order cancellation, order history/detail ngoài phần xác nhận order được tạo, payment gateway nếu SUT không triển khai real payment flow.                                            |
| Điểm cần verify trên SUT | Min/max của`total_amount`; min/max length của `shipping_address`; checkout với empty cart; server tự tính lại `total_amount` hay tin giá trị client gửi lên; quantity/stock constraints nếu UI/API có thể hiện. |

### 5.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến              | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng           | Mô tả & Hành vi trên SUT                                                                                                                            | Cơ sở lý do lựa chọn (Rationale)                                                                                                                        |
| :-------------------------- | :------------------------ | :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `authentication_state`      | State                     | Trạng thái phiên đăng nhập / token | Customer phải đăng nhập và có authentication token hợp lệ để gọi Cart và Checkout APIs.                                                             | Context FR-08 nêu Cart và Checkout APIs yêu cầu authentication; đây là trạng thái tiền điều kiện ảnh hưởng trực tiếp đến khả năng checkout.             |
| `cart_state`                | State                     | Trạng thái giỏ hàng                | Giỏ hàng có thể chứa ít nhất một product cho normal checkout path; cart được truy xuất qua`GET /api/cart` và có thể thêm item qua `POST /api/cart`. | Preconditions nêu Cart feature hoạt động và có thể add ít nhất một product vào cart cho normal checkout path.                                           |
| `cart_item.id`              | Input                     | Number / Product identifier        | ID sản phẩm được thêm vào cart trong dữ liệu chuẩn, ví dụ`1`.                                                                                       | Checkout phụ thuộc vào item trong cart; context cung cấp request body mẫu cho`POST /api/cart` gồm `id`.                                                 |
| `cart_item.name`            | Input                     | String                             | Tên sản phẩm trong cart, ví dụ`Sample Product`.                                                                                                     | Là một phần dữ liệu item trong cart theo API body mẫu; dùng để mô tả trạng thái cart trước checkout.                                                    |
| `cart_item.price`           | Input                     | Number                             | Giá sản phẩm trong cart, ví dụ`100000`.                                                                                                             | Là thành phần tạo nên tổng tiền checkout trong nominal path; context cung cấp price trong`POST /api/cart`.                                              |
| `cart_item.quantity`        | Input                     | Number                             | Số lượng sản phẩm trong cart, ví dụ`2`.                                                                                                             | Là thành phần ảnh hưởng đến tổng tiền cart; context cung cấp quantity trong`POST /api/cart`.                                                            |
| `total_amount`              | Input                     | Number                             | Tổng tiền gửi trong request`POST /api/checkout`, ví dụ `200000`.                                                                                    | Context FR-08 nêu checkout request gồm`total_amount`; giá trị nominal bằng `price * quantity` theo dữ liệu mẫu.                                         |
| `shipping_address`          | Input                     | String                             | Địa chỉ giao hàng gửi trong request`POST /api/checkout`, ví dụ `123 Le Loi, TP.HCM`.                                                                | Context FR-08 nêu checkout request gồm`shipping_address`; đây là dữ liệu người dùng cần cung cấp để checkout.                                           |
| `request_body_completeness` | Input                     | Object structure                   | Mức đầy đủ của request body khi gọi checkout: có các field thuộc request checkout hoặc thiếu field.                                                 | Context nêu request body liên quan gồm`total_amount` và `shipping_address`; mức đầy đủ của body là một biến đầu vào quan sát được ở API.                |
| `checkout_result`           | Output                    | Response / UI state                | Kết quả checkout trả về hoặc hiển thị sau khi submit checkout.                                                                                      | FR-08 yêu cầu checkout thành công nên tạo order hoặc trạng thái xác nhận checkout tương đương.                                                          |
| `order_creation_state`      | Output/State              | Order state                        | Trạng thái order sau checkout: order được tạo hoặc không được tạo.                                                                                  | Context nêu checkout thành công nên tạo order hoặc xác nhận tương đương; cũng nêu không tạo order với invalid checkout data như candidate output/state. |
| `validation_error`          | Output                    | Error response / UI message        | Lỗi validation được trả về hoặc hiển thị khi dữ liệu checkout không hợp lệ.                                                                         | Candidate output/state của FR-08 có validation error; đây là output quan sát được khi request không đạt yêu cầu.                                        |
| `unauthorized_error`        | Output                    | Error response / UI message        | Lỗi unauthorized khi thao tác cart/checkout không có authentication hợp lệ.                                                                         | Rule có căn cứ: Cart và Checkout APIs yêu cầu authentication, nên unauthorized error là output cần quan sát.                                            |
| `cart_after_checkout_state` | Output/State              | Cart/order state                   | Trạng thái cart/order sau checkout thành công hoặc thất bại.                                                                                        | Candidate output/state nêu cart/order state sau checkout đúng; đây là trạng thái hậu điều kiện quan sát được sau thao tác checkout.                     |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng           | Mô tả điều kiện                                                                                                | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale)                                                                                                                                                                                              |
| :---------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1                | `authentication_state`      | Người dùng phải là customer đã đăng nhập và có authentication token hợp lệ khi thực hiện checkout.             | Context FR-08 nêu Cart và Checkout APIs yêu cầu authentication; precondition cũng yêu cầu user đã đăng nhập và có token hợp lệ.                                                                                                           |
| C2                | `cart_state`                | Cart phải ở trạng thái phục vụ checkout path, trong đó normal checkout path có ít nhất một product trong cart. | Preconditions nêu Cart feature hoạt động và có thể add ít nhất một product vào cart cho normal checkout path.                                                                                                                             |
| C3                | `cart_item.id`              | Product trong cart có định danh sản phẩm.                                                                      | API body mẫu của`POST /api/cart` gồm field `id`; checkout phụ thuộc vào dữ liệu item đã có trong cart.                                                                                                                                    |
| C4                | `cart_item.price`           | Product trong cart có giá dùng để hình thành tổng tiền checkout.                                               | API body mẫu của`POST /api/cart` gồm `price`; giá trị nominal `100000` kết hợp với quantity tạo ra `total_amount` nominal.                                                                                                                |
| C5                | `cart_item.quantity`        | Product trong cart có số lượng dùng để hình thành tổng tiền checkout.                                          | API body mẫu của`POST /api/cart` gồm `quantity`; giá trị nominal `2` kết hợp với price tạo ra `total_amount` nominal.                                                                                                                     |
| C6                | `total_amount`              | Checkout request phải gửi`total_amount`.                                                                       | API body liên quan của`POST /api/checkout` gồm `total_amount`; context chưa nêu min/max cụ thể nên chưa đặt điều kiện biên/min/max.                                                                                                       |
| C7                | `total_amount`              | `total_amount` đại diện cho tổng tiền checkout tương ứng với cart trong normal checkout path.                  | Giá trị nominal trong context là price`100000`, quantity `2`, total_amount `200000`; context cũng ghi cần kiểm chứng server tự tính lại hay tin giá trị client gửi lên, nên chỉ ghi điều kiện ở mức “tương ứng với cart” cho normal path. |
| C8                | `shipping_address`          | Checkout request phải gửi`shipping_address`.                                                                   | API body liên quan của`POST /api/checkout` gồm `shipping_address`; context chưa nêu min/max length cụ thể nên chưa đặt điều kiện độ dài.                                                                                                  |
| C9                | `shipping_address`          | `shipping_address` là dữ liệu địa chỉ giao hàng có nội dung trong normal checkout path.                        | Giá trị nominal trong context là`123 Le Loi, TP.HCM`; requirement/API spec chưa nêu rule format hoặc min/max, nên condition chỉ dừng ở vai trò dữ liệu địa chỉ giao hàng.                                                                 |
| C10               | `request_body_completeness` | Request body checkout cần bao gồm các field được đặc tả cho checkout:`total_amount` và `shipping_address`.     | Context FR-08 nêu checkout request gồm`total_amount` và `shipping_address`; candidate input cũng nhắc đến mức đầy đủ request body như thiếu `total_amount` hoặc thiếu `shipping_address`.                                                 |
| C11               | `checkout_result`           | Khi checkout thành công, hệ thống tạo order hoặc hiển thị/trả về trạng thái xác nhận checkout tương đương.     | Rule có căn cứ trong FR-08: “Checkout thành công nên tạo order hoặc trạng thái xác nhận checkout tương đương.”                                                                                                                            |
| C12               | `validation_error`          | Khi dữ liệu checkout không hợp lệ, hệ thống hiển thị/trả về validation error và không tạo order.               | Candidate output/state nêu validation error và không tạo order với invalid checkout data; đây là output/state cần kiểm tra từ góc nhìn black-box.                                                                                         |
| C13               | `unauthorized_error`        | Khi checkout/cart API không có authentication hợp lệ, hệ thống hiển thị/trả về unauthorized error.             | Rule có căn cứ: Cart và Checkout APIs yêu cầu authentication; unauthorized error là output tương ứng khi điều kiện authentication không đạt.                                                                                              |
| C14               | `cart_after_checkout_state` | Sau checkout, trạng thái cart/order phải phản ánh đúng kết quả checkout.                                       | Candidate output/state nêu “Cart/order state sau checkout đúng”; đây là state hậu điều kiện để xác nhận checkout đã xử lý đúng.                                                                                                           |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện                                                             | Lý do lựa chọn & Biên (Rationale)                                                                                                                               |
| :----------------- | :--------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E1                 | C1                     | Hợp lệ (Valid)                          | Customer đã đăng nhập, có authentication token hợp lệ.                                          | Đáp ứng precondition và rule có căn cứ: Cart/Checkout APIs yêu cầu authentication.                                                                              |
| E2                 | C1                     | Không hợp lệ (Invalid)                  | Thiếu authentication token.                                                                     | Vi phạm yêu cầu authentication; expected behavior là unauthorized error.                                                                                        |
| E3                 | C1                     | Không hợp lệ (Invalid)                  | Token sai hoặc hết hạn.                                                                         | Vẫn là trường hợp không có authentication hợp lệ; tách khỏi thiếu token vì request có token nhưng token không được chấp nhận.                                   |
| E4                 | C2                     | Hợp lệ (Valid)                          | Cart có ít nhất một product, ví dụ cart có item product id`1`.                                  | Normal checkout path yêu cầu có thể add ít nhất một product vào cart.                                                                                           |
| E5                 | C2                     | Không hợp lệ (Invalid)                  | Cart rỗng.                                                                                      | Context ghi cần kiểm chứng checkout với empty cart có bị chặn không; đưa vào EP như một lớp cần kiểm tra, chưa tự khẳng định behavior nếu chưa execute.         |
| E6                 | C3                     | Hợp lệ (Valid)                          | Cart item có product id theo dữ liệu nominal, ví dụ`1`.                                         | API body mẫu`POST /api/cart` có `id`; nominal value trong context là Product id `1`.                                                                            |
| E7                 | C4                     | Hợp lệ (Valid)                          | Cart item có price theo dữ liệu nominal, ví dụ`100000`.                                         | API body mẫu có`price`; price là thành phần hình thành total_amount.                                                                                            |
| E8                 | C5                     | Hợp lệ (Valid)                          | Cart item có quantity theo dữ liệu nominal, ví dụ`2`.                                           | API body mẫu có`quantity`; quantity là thành phần hình thành total_amount.                                                                                      |
| E9                 | C6                     | Hợp lệ (Valid)                          | Checkout request có field`total_amount`, ví dụ `200000`.                                        | `POST /api/checkout` được đặc tả gồm `total_amount`.                                                                                                            |
| E10                | C6                     | Không hợp lệ (Invalid)                  | Checkout request thiếu field`total_amount`.                                                     | Candidate input nêu request body có thể thiếu`total_amount`; đây là lỗi cấu trúc request body so với API body liên quan.                                        |
| E11                | C7                     | Hợp lệ (Valid)                          | `total_amount` khớp với tổng cart trong nominal path, ví dụ `100000 * 2 = 200000`.              | Dữ liệu nominal cho thấy total_amount tương ứng với price và quantity.                                                                                          |
| E12                | C7                     | Không hợp lệ (Invalid)                  | `total_amount` không khớp với tổng cart.                                                        | Context ghi cần kiểm chứng server tự tính lại total_amount hay tin giá trị client gửi lên; đây là lớp EP quan trọng để quan sát behavior.                       |
| E13                | C7                     | Không hợp lệ (Invalid)                  | `total_amount` bằng `0`.                                                                        | Candidate input nêu trường hợp`total_amount` bằng 0; requirement chưa nêu min cụ thể, nên lớp này là candidate invalid cần verify behavior.                     |
| E14                | C7                     | Không hợp lệ (Invalid)                  | `total_amount` âm, ví dụ `-1`.                                                                  | Candidate input nêu trường hợp âm; requirement chưa nêu min cụ thể nên không đặt boundary chính thức ngoài giá trị đại diện.                                    |
| E15                | C7                     | Không hợp lệ (Invalid)                  | `total_amount` không phải số, ví dụ `"abc"`.                                                    | `total_amount` là dữ liệu tổng tiền; candidate input nêu lớp không phải số để kiểm tra validation.                                                              |
| E16                | C8                     | Hợp lệ (Valid)                          | Checkout request có field`shipping_address`, ví dụ `123 Le Loi, TP.HCM`.                        | `POST /api/checkout` được đặc tả gồm `shipping_address`; nominal value đã có trong context.                                                                     |
| E17                | C8                     | Không hợp lệ (Invalid)                  | Checkout request thiếu field`shipping_address`.                                                 | Candidate input nêu request body có thể thiếu`shipping_address`; đây là lỗi cấu trúc request body so với API body liên quan.                                    |
| E18                | C9                     | Hợp lệ (Valid)                          | `shipping_address` có nội dung, ví dụ `123 Le Loi, TP.HCM`.                                     | Normal checkout path cần địa chỉ giao hàng; context cung cấp nominal shipping address.                                                                          |
| E19                | C9                     | Không hợp lệ (Invalid)                  | `shipping_address` rỗng, ví dụ `""`.                                                            | Candidate input nêu shipping_address rỗng; requirement chưa nêu min length nên cần verify behavior trên SUT.                                                    |
| E20                | C9                     | Không hợp lệ (Invalid)                  | `shipping_address` chỉ gồm whitespace, ví dụ `"   "`.                                           | Candidate input nêu whitespace; tách khỏi chuỗi rỗng vì UI/API có thể xử lý trim khác nhau.                                                                     |
| E21                | C9                     | Hợp lệ (Valid)                          | `shipping_address` có ký tự đặc biệt thường gặp trong địa chỉ, ví dụ `123 Le Loi, Q.1, TP.HCM`. | Candidate input nhắc ký tự đặc biệt; vì địa chỉ thực tế thường có dấu phẩy, dấu chấm, số, chữ nên đây là lớp hợp lệ cần cover nếu SUT chấp nhận normal address. |
| E22                | C10                    | Hợp lệ (Valid)                          | Request body checkout có đủ`total_amount` và `shipping_address`.                                | Đúng với API body liên quan của`POST /api/checkout`.                                                                                                            |
| E23                | C10                    | Không hợp lệ (Invalid)                  | Request body thiếu một field được đặc tả.                                                       | Đối chiếu với API body yêu cầu hai field; đại diện có thể là thiếu`total_amount` hoặc thiếu `shipping_address`.                                                 |
| E24                | C10                    | Hợp lệ cần quan sát                     | Request body có thêm field ngoài scope.                                                         | Candidate input nêu field ngoài scope; chưa có căn cứ xem là lỗi, nên chỉ xem là lớp cần quan sát behavior, không tự gán expected result invalid.               |
| E25                | C11                    | Hợp lệ (Valid)                          | Checkout thành công tạo order hoặc trả về/trình bày trạng thái xác nhận checkout tương đương.   | Đây là output hợp lệ theo rule có căn cứ trong FR-08.                                                                                                           |
| E26                | C12                    | Không hợp lệ (Invalid)                  | Với checkout data không hợp lệ, hệ thống trả về/hiển thị validation error.                      | Candidate output/state nêu validation error và không tạo order với invalid checkout data.                                                                       |
| E27                | C13                    | Không hợp lệ (Invalid)                  | Với authentication không hợp lệ, hệ thống trả về/hiển thị unauthorized error.                   | Rule authentication có căn cứ; unauthorized là output tương ứng cho nhóm E2/E3.                                                                                 |
| E28                | C14                    | Hợp lệ (Valid)                          | Sau checkout thành công, cart/order state phản ánh đúng kết quả checkout.                       | Candidate output/state nêu cart/order state sau checkout đúng; cần kiểm tra hậu trạng thái sau normal checkout.                                                 |
| E29                | C14                    | Không hợp lệ (Invalid)                  | Với invalid checkout data, order không được tạo.                                                | Candidate output/state nêu không tạo order với invalid checkout data; đây là state mong đợi cần kiểm tra cho các lớp invalid data.                              |

#### Step 4: Xác định Test Case

| Mã test case  | Auth state        | Cart state / Test data                                                         | `total_amount`                                             | `shipping_address`            | Kết quả mong đợi                                                                                                                                                 | Kết quả thực tế                                                                                                      | Trạng thái | Bug ID / Evidence                       | Phủ các lớp EP                                       |
| :------------ | :---------------- | :----------------------------------------------------------------------------- | :--------------------------------------------------------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :--------- | :-------------------------------------- | :--------------------------------------------------- |
| FR08-DOM-TC01 | Token hợp lệ      | Cart có product`{ id: 1, name: "Sample Product", price: 100000, quantity: 2 }` | `200000`                                                   | `123 Le Loi, TP.HCM`          | Checkout thành công; order hoặc trạng thái xác nhận checkout tương đương được tạo/hiển thị; cart/order state sau checkout đúng.                                  | API trả `200 OK`, tạo order `pending` với `total_amount=200000`; nhưng `GET /api/cart` sau checkout vẫn còn item cũ. | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | E1, E4, E6, E7, E8, E9, E11, E16, E18, E22, E25, E28 |
| FR08-DOM-TC02 | Thiếu token       | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị unauthorized error; không tạo order.                                                                                                    | API trả `401 Unauthorized`.                                                                                          | Pass       | `""`                                    | E2, E27                                              |
| FR08-DOM-TC03 | Token sai/hết hạn | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị unauthorized error; không tạo order.                                                                                                    | API trả `403 Forbidden`.                                                                                             | Pass       | `""`                                    | E3, E27                                              |
| FR08-DOM-TC04 | Token hợp lệ      | Cart rỗng                                                                      | `0` hoặc giá trị theo UI/API cho empty cart                | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: checkout empty cart nên bị chặn hoặc trả về validation/error state; không tự kết luận nếu SUT chưa verify.                                     | Với user mới có `beforeCart=[]`, API vẫn trả `200 OK` và tạo order `pending` có `total_amount=0`.                    | Failed     | [BUG-FR08-06](./Bug_Report_Template.md) | E5                                                   |
| FR08-DOM-TC05 | Token hợp lệ      | Cart có product nominal                                                        | Thiếu field`total_amount`                                  | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount=null`.                                                                 | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | E10, E23, E26, E29                                   |
| FR08-DOM-TC06 | Token hợp lệ      | Cart có product nominal                                                        | `100000`                                                   | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: hệ thống xử lý trường hợp`total_amount` không khớp cart total; không tạo order nếu xem đây là dữ liệu checkout không hợp lệ.                   | API trả `200 OK`, tạo order với `total_amount=100000` dù cart nominal là `200000`.                                   | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | E12                                                  |
| FR08-DOM-TC07 | Token hợp lệ      | Cart có product nominal                                                        | `0`                                                        | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `total_amount=0`.                                                                    | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | E13                                                  |
| FR08-DOM-TC08 | Token hợp lệ      | Cart có product nominal                                                        | `-1`                                                       | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount=-1`.                                                                   | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | E14, E26, E29                                        |
| FR08-DOM-TC09 | Token hợp lệ      | Cart có product nominal                                                        | `"abc"`                                                    | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount="abc"`.                                                                | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | E15, E26, E29                                        |
| FR08-DOM-TC10 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | Thiếu field`shipping_address` | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `shipping_address=null`.                                                             | Failed     | [BUG-FR08-03](./Bug_Report_Template.md) | E17, E23, E26, E29                                   |
| FR08-DOM-TC11 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `""`                          | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `shipping_address=""`.                                                               | Failed     | [BUG-FR08-03](./Bug_Report_Template.md) | E19                                                  |
| FR08-DOM-TC12 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `"   "`                       | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `shipping_address="   "`.                                                            | Failed     | [BUG-FR08-03](./Bug_Report_Template.md) | E20                                                  |
| FR08-DOM-TC13 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, Q.1, TP.HCM`     | Checkout thành công nếu SUT chấp nhận địa chỉ có ký tự thường gặp như dấu phẩy, dấu chấm; order hoặc trạng thái xác nhận checkout tương đương được tạo/hiển thị. | API trả `200 OK`, tạo order với địa chỉ `123 Le Loi, Q.1, TP.HCM`; cart vẫn không được xóa sau checkout.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | E21, E25, E28                                        |
| FR08-DOM-TC14 | Token hợp lệ      | Cart có product nominal                                                        | `200000`, kèm thêm field ngoài scope, ví dụ `note: "test"` | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: field ngoài scope có thể bị bỏ qua hoặc bị từ chối; không tự gán Pass/Fail trước khi execute.                                                  | API trả `200 OK`, tạo order bình thường và bỏ qua field `note`; cart vẫn không được xóa sau checkout.                | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | E24                                                  |

### 5.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số                                                                                                                                  | Có áp dụng BVA không? | Lý do                                                                                                                                                                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `total_amount`                                                                                                                           | **Có**                | Là tham số dạng số (monetary amount) đại diện cho tổng tiền thanh toán, có tính chất định lượng liên tục và chịu ảnh hưởng bởi các ràng buộc logic biên (ví dụ: lớn hơn 0, khớp với tổng tiền giỏ hàng).              |
| `shipping_address` (Độ dài)                                                                                                              | **Có**                | Mặc dù là chuỗi ký tự, nhưng độ dài của chuỗi (string length) là một đại lượng số lượng/định lượng liên tục có giới hạn biên (độ dài tối thiểu, độ dài tối đa) thường được validate bởi hệ thống (UI/API).            |
| `cart_item.quantity`                                                                                                                     | **Có**                | Số lượng của từng sản phẩm trong giỏ hàng là đại lượng số lượng rời rạc có thứ tự (quantity/item count), có giới hạn biên thực tế (ví dụ: tối thiểu là 1, tối đa theo giới hạn tồn kho hoặc giới hạn mua sắm tối đa). |
| `cart_item.price`                                                                                                                        | **Có**                | Đơn giá sản phẩm là đại lượng tiền tệ dạng số (monetary amount), ảnh hưởng trực tiếp đến việc tính toán tổng tiền thanh toán và có giới hạn logic biên (ví dụ: đơn giá > 0).                                          |
| `cart_state` (Số lượng item)                                                                                                             | **Có**                | Trạng thái giỏ hàng có thể định lượng qua số lượng sản phẩm/item trong giỏ (list size). Có thể áp dụng BVA tại ranh giới giỏ hàng trống (0 sản phẩm) và giỏ hàng bắt đầu có sản phẩm (tối thiểu là 1 sản phẩm).       |
| `authentication_state`                                                                                                                   | Không                 | Là biến trạng thái phân loại rời rạc (Valid token, missing token, invalid token), không có tính chất định lượng hay miền giá trị có thứ tự liên tục.                                                                  |
| `cart_item.id`                                                                                                                           | Không                 | ID sản phẩm chỉ là định danh danh nghĩa (nominal identifier), không có ý nghĩa định lượng hay thứ tự liên tục.                                                                                                        |
| `cart_item.name`                                                                                                                         | Không                 | Tên sản phẩm không được gửi trực tiếp trong request checkout và không trực tiếp tham gia kiểm thử biên tại chức năng checkout.                                                                                        |
| `request_body_completeness`                                                                                                              | Không                 | Là biến cấu trúc biểu thị mức độ đầy đủ của request body (thiếu hoặc đủ field), mang tính rời rạc phân loại chứ không có miền giá trị có thứ tự liên tục.                                                             |
| Các biến Output/State (`checkout_result`, `order_creation_state`, `validation_error`, `unauthorized_error`, `cart_after_checkout_state`) | Không                 | Là các kết quả đầu ra (Outputs) hoặc trạng thái phản hồi sau kiểm thử, không phải tham số đầu vào có miền giá trị định lượng/liên tục để làm đối tượng cho BVA.                                                       |

#### Step 2: Xác định biên và cận biên

| Mã biên          | Tham số                            | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale)                                                                                                                        |
| :--------------- | :--------------------------------- | :------------------ | :-------- | :------------------ | :------------------ | :------------------ | :-------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FR08-BVA-B01** | `total_amount` (Khớp giỏ hàng)     | 199.999             | 200.000   | N/A                 | 200.000             | N/A                 | 200.000   | 200.001             | Giá trị tổng tiền gửi lên phải khớp chính xác với giá trị thực tế của giỏ hàng (trong nominal path là 200.000đ) để đảm bảo tính toàn vẹn dữ liệu thanh toán. |
| **FR08-BVA-B02** | `total_amount` (Tiền tệ tuyệt đối) | 0                   | 1         | 2                   | 200.000             | N/A                 | N/A       | N/A                 | Tổng tiền thanh toán tối thiểu phải là số dương lớn hơn 0 (đơn vị tối thiểu là 1 VNĐ). Không có giới hạn biên trên.                                          |
| **FR08-BVA-B03** | `shipping_address` (Độ dài)        | 0 (Rỗng)            | 1         | 2                   | 19                  | N/A                 | N/A       | N/A                 | Địa chỉ giao hàng không được phép để rỗng (độ dài tối thiểu = 1 ký tự). Không có giới hạn biên trên explicit trong requirement.                              |
| **FR08-BVA-B04** | `cart_item.quantity`               | 0                   | 1         | 2                   | 2                   | N/A                 | N/A       | N/A                 | Số lượng mua của từng sản phẩm trong giỏ hàng phải tối thiểu là 1 sản phẩm. Không có quy định về biên trên.                                                  |
| **FR08-BVA-B05** | `cart_state` (Số lượng item)       | 0 (Rỗng)            | 1         | 2                   | 1                   | N/A                 | N/A       | N/A                 | Giỏ hàng phải chứa tối thiểu 1 sản phẩm thì mới được thực hiện checkout. Giỏ hàng rỗng (0 sản phẩm) là không hợp lệ.                                         |
| **FR08-BVA-B06** | `cart_item.price`                  | 0                   | 1         | 2                   | 100.000             | N/A                 | N/A       | N/A                 | Đơn giá của sản phẩm trong giỏ hàng phải có giá trị dương tối thiểu là 1 VNĐ. Không có quy định về biên trên.                                                |

#### Step 3: Xác định BVA Test Case

| Mã test case      | Auth state   | Cart state / Test data                                  | total_amount | shipping_address     | Giá trị biên được test                       | Kết quả mong đợi                                                           | Kết quả thực tế                                                                                   | Trạng thái | Bug ID / Evidence                       | Phủ mã biên  |
| :---------------- | :----------- | :------------------------------------------------------ | :----------- | :------------------- | :------------------------------------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :--------- | :-------------------------------------- | :----------- |
| **FR08-BVA-TC01** | Token hợp lệ | Cart có product nominal                                 | `199999`     | `123 Le Loi, TP.HCM` | `total_amount = X - 1` (199.999 VNĐ)         | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 199999`.                            | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | FR08-BVA-B01 |
| **FR08-BVA-TC02** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `123 Le Loi, TP.HCM` | `total_amount = X` (200.000 VNĐ)             | Checkout thành công; order được tạo và cart được xóa.                      | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout vẫn giữ nguyên sản phẩm cũ. | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B01 |
| **FR08-BVA-TC03** | Token hợp lệ | Cart có product nominal                                 | `200001`     | `123 Le Loi, TP.HCM` | `total_amount = X + 1` (200.001 VNĐ)         | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 200001`.                            | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | FR08-BVA-B01 |
| **FR08-BVA-TC04** | Token hợp lệ | Cart có product nominal                                 | `0`          | `123 Le Loi, TP.HCM` | `total_amount = 0` (Cận dưới ngoài biên)     | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 0`.                                 | Failed     | [BUG-FR08-02](./Bug_Report_Template.md) | FR08-BVA-B02 |
| **FR08-BVA-TC05** | Token hợp lệ | Cart có product `{ id: 1, price: 1, quantity: 1 }`      | `1`          | `123 Le Loi, TP.HCM` | `total_amount = 1` VNĐ (Biên dưới)           | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B02 |
| **FR08-BVA-TC06** | Token hợp lệ | Cart có product `{ id: 1, price: 2, quantity: 1 }`      | `2`          | `123 Le Loi, TP.HCM` | `total_amount = 2` VNĐ (Cận dưới trong biên) | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B02 |
| **FR08-BVA-TC07** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `""`                 | `shipping_address` rỗng (0 ký tự)            | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với địa chỉ giao hàng rỗng `""`.                        | Failed     | [BUG-FR08-03](./Bug_Report_Template.md) | FR08-BVA-B03 |
| **FR08-BVA-TC08** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `"A"`                | `shipping_address` dài 1 ký tự               | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B03 |
| **FR08-BVA-TC09** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `"AB"`               | `shipping_address` dài 2 ký tự               | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B03 |
| **FR08-BVA-TC10** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 0 }` | `0`          | `123 Le Loi, TP.HCM` | `cart_item.quantity = 0`                     | Hệ thống từ chối thêm vào giỏ hàng hoặc báo lỗi checkout; không tạo order. | API trả về `200 OK`, chấp nhận giỏ hàng chứa sản phẩm số lượng bằng 0 và tạo đơn hàng.            | Failed     | [BUG-FR08-05](./Bug_Report_Template.md) | FR08-BVA-B04 |
| **FR08-BVA-TC11** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 1 }` | `100000`     | `123 Le Loi, TP.HCM` | `cart_item.quantity = 1`                     | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B04 |
| **FR08-BVA-TC12** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 2 }` | `200000`     | `123 Le Loi, TP.HCM` | `cart_item.quantity = 2`                     | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B04 |
| **FR08-BVA-TC13** | Token hợp lệ | Cart rỗng (0 sản phẩm)                                  | `0`          | `123 Le Loi, TP.HCM` | `cart_state` có 0 sản phẩm                   | Hệ thống từ chối checkout, báo lỗi giỏ hàng rỗng; không tạo order.         | API trả về `200 OK`, tạo order thành công với tổng tiền 0đ ngay cả khi giỏ hàng rỗng.             | Failed     | [BUG-FR08-06](./Bug_Report_Template.md) | FR08-BVA-B05 |
| **FR08-BVA-TC14** | Token hợp lệ | Cart có 1 sản phẩm nominal                              | `200000`     | `123 Le Loi, TP.HCM` | `cart_state` có 1 sản phẩm                   | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B05 |
| **FR08-BVA-TC15** | Token hợp lệ | Cart có 2 sản phẩm khác nhau                            | `200000`     | `123 Le Loi, TP.HCM` | `cart_state` có 2 sản phẩm                   | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B05 |
| **FR08-BVA-TC16** | Token hợp lệ | Cart có product `{ id: 1, price: 0, quantity: 2 }`      | `0`          | `123 Le Loi, TP.HCM` | `cart_item.price = 0`                        | Hệ thống từ chối thêm vào giỏ hàng hoặc báo lỗi checkout; không tạo order. | API trả về `200 OK`, chấp nhận sản phẩm đơn giá bằng 0đ và cho phép tạo đơn hàng thành công.      | Failed     | [BUG-FR08-05](./Bug_Report_Template.md) | FR08-BVA-B06 |
| **FR08-BVA-TC17** | Token hợp lệ | Cart có product `{ id: 1, price: 1, quantity: 2 }`      | `2`          | `123 Le Loi, TP.HCM` | `cart_item.price = 1` VNĐ                    | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B06 |
| **FR08-BVA-TC18** | Token hợp lệ | Cart có product `{ id: 1, price: 2, quantity: 2 }`      | `4`          | `123 Le Loi, TP.HCM` | `cart_item.price = 2` VNĐ                    | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report_Template.md) | FR08-BVA-B06 |

### 5.4 AI Gap Analysis

Phân tích khoảng cách (AI Gap Analysis) đánh giá sự khác biệt giữa thiết kế lý thuyết và hành vi thực tế của SUT qua BVA và Domain Testing.

- **Khoảng cách do prompt/context:** Prompt ban đầu chưa nhấn mạnh các quy tắc kiểm thử biên và sự thiếu sót validation của backend, dẫn đến các expected result ban đầu còn mang tính giả định. Khi đối chiếu với observed behavior của SUT, ta thấy rõ sự chênh lệch lớn giữa thiết kế bảo mật/kiểm duyệt lý thuyết và mã thực tế của SUT.
- **Khoảng cách do giới hạn AI:** AI thiết kế ban đầu có xu hướng tin tưởng hệ thống sẽ tự động chặn các giá trị biên sai như `total_amount = 0` hay `quantity = 0`. Tuy nhiên khi thực thi bằng script kiểm thử API thực tế, backend SUT hoàn toàn không validate các giá trị này, chấp nhận mọi request thanh toán lỗi.
- **Khoảng cách do SUT-specific behavior:**
  1. **Lỗi UI/API Integration:** Giao diện Web Frontend của Checkout không hề render trường nhập địa chỉ giao hàng (`shipping_address`) và gửi request checkout thiếu trường này, trong khi API backend vẫn trả về `200 OK` và ghi đè giá trị địa chỉ thành `null`/`undefined`.
  2. **Lỗi logic tiền tệ:** Frontend Checkout thiết lập trường nhập tổng tiền thanh toán là một ô input số có thể chỉnh sửa tự do (`editableTotal`), cho phép người dùng thay đổi tùy ý số tiền trước khi gửi lên API backend, và backend tin tưởng 100% số tiền client gửi lên.
  3. **Lỗi giỏ hàng:** Cả frontend và backend đều không thực hiện xóa giỏ hàng sau khi checkout thành công, cho phép người dùng giữ nguyên sản phẩm cũ và tiếp tục checkout nhiều lần hoặc checkout giỏ hàng rỗng.
- **Human review correction:** Sinh viên thực hiện kiểm duyệt từng bước thiết kế BVA, bổ sung kiểm thử biên cho đơn giá và số lượng sản phẩm trong giỏ hàng (phát hiện ra việc SUT nhận đơn giá và số lượng bằng 0), đồng thời cập nhật toàn bộ actual results từ script API kiểm thử thực tế và ánh xạ đến các mã lỗi \`BUG-FR08-01\` tới \`BUG-FR08-06\` trong báo cáo lỗi.

## 6. FR-15 - Product Management CRUD

### 6.1 Feature Overview

TODO

### 6.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT | Cơ sở lý do lựa chọn (Rationale) |
| :------------- | :------------------------ | :----------------------- | :----------------------- | :------------------------------- |
| TODO           | TODO                      | TODO                     | TODO                     | TODO                             |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng | Mô tả điều kiện | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale) |
| :---------------- | :---------------- | :-------------- | :------------------------------------------- |
| TODO              | TODO              | TODO            | TODO                                         |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện | Lý do lựa chọn & Biên (Rationale) |
| :----------------- | :--------------------- | :-------------------------------------- | :---------------------------------- | :-------------------------------- |
| TODO               | TODO                   | TODO                                    | TODO                                | TODO                              |

#### Step 4: Xác định Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ các lớp EP |
| :----------- | :-------- | :-------- | :-------- | :--------------- | :-------------- | :--------- | :---------------- | :------------- |
| TODO         | TODO      | TODO      | TODO      | TODO             | TODO            | TODO       | TODO              | TODO           |

### 6.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số | Có áp dụng BVA không? | Lý do |
| :------ | :-------------------- | :---- |
| TODO    | TODO                  | TODO  |

#### Step 2: Xác định biên và cận biên

| Mã biên | Tham số | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale) |
| :------ | :------ | :------------------ | :-------- | :------------------ | :------------------ | :------------------ | :-------- | :------------------ | :------------------------------------ |
| TODO    | TODO    | TODO                | TODO      | TODO                | TODO                | TODO                | TODO      | TODO                | TODO                                  |

#### Step 3: Xác định BVA Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Giá trị biên được test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ mã biên |
| :----------- | :-------- | :-------- | :-------- | :--------------------- | :--------------- | :-------------- | :--------- | :---------------- | :---------- |
| TODO         | TODO      | TODO      | TODO      | TODO                   | TODO             | TODO            | TODO       | TODO              | TODO        |

### 6.4 AI Gap Analysis

TODO

## 7. FR-06 - Mobile Product Detail View

### 7.1 Feature Overview

TODO

### 7.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT | Cơ sở lý do lựa chọn (Rationale) |
| :------------- | :------------------------ | :----------------------- | :----------------------- | :------------------------------- |
| TODO           | TODO                      | TODO                     | TODO                     | TODO                             |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng | Mô tả điều kiện | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale) |
| :---------------- | :---------------- | :-------------- | :------------------------------------------- |
| TODO              | TODO              | TODO            | TODO                                         |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện | Lý do lựa chọn & Biên (Rationale) |
| :----------------- | :--------------------- | :-------------------------------------- | :---------------------------------- | :-------------------------------- |
| TODO               | TODO                   | TODO                                    | TODO                                | TODO                              |

#### Step 4: Xác định Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ các lớp EP |
| :----------- | :-------- | :-------- | :-------- | :--------------- | :-------------- | :--------- | :---------------- | :------------- |
| TODO         | TODO      | TODO      | TODO      | TODO             | TODO            | TODO       | TODO              | TODO           |

### 7.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số | Có áp dụng BVA không? | Lý do |
| :------ | :-------------------- | :---- |
| TODO    | TODO                  | TODO  |

#### Step 2: Xác định biên và cận biên

| Mã biên | Tham số | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale) |
| :------ | :------ | :------------------ | :-------- | :------------------ | :------------------ | :------------------ | :-------- | :------------------ | :------------------------------------ |
| TODO    | TODO    | TODO                | TODO      | TODO                | TODO                | TODO                | TODO      | TODO                | TODO                                  |

#### Step 3: Xác định BVA Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Giá trị biên được test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ mã biên |
| :----------- | :-------- | :-------- | :-------- | :--------------------- | :--------------- | :-------------- | :--------- | :---------------- | :---------- |
| TODO         | TODO      | TODO      | TODO      | TODO                   | TODO             | TODO            | TODO       | TODO              | TODO        |

### 7.4 AI Gap Analysis

TODO

## 8. Test Summary

| Feature | Designed | Executed | Passed | Failed | Blocked | Not Executed | Confirmed bug count |
| :------ | -------: | -------: | -----: | -----: | ------: | -----------: | ------------------: |
| FR-04   |     TODO |     TODO |   TODO |   TODO |    TODO |         TODO |                TODO |
| FR-08   |     TODO |     TODO |   TODO |   TODO |    TODO |         TODO |                TODO |
| FR-15   |     TODO |     TODO |   TODO |   TODO |    TODO |         TODO |                TODO |
| FR-06   |     TODO |     TODO |   TODO |   TODO |    TODO |         TODO |                TODO |
| Total   |     TODO |     TODO |   TODO |   TODO |    TODO |         TODO |                TODO |

## 9. Agent Skills and Demo Video

TODO: Add the Agent Skills path and YouTube unlisted demo video link.

## 10. References

- [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf)
- [\_\_\_2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf)
- [04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf)
- [23127205.pdf](./references/23127205.pdf)
- [ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf)

## 11. Appendices

- Báo cáo AI Audit: [AI_Audit_Report.md](./AI_Audit_Report.md)
- Báo cáo AI Critique: [AI_Critique.md](./AI_Critique.md)
- Danh sách báo cáo lỗi: [Bug_Report_Template.md](./Bug_Report_Template.md)
- Git commit log: [git_commit_log.txt](./git_commit_log.txt)
