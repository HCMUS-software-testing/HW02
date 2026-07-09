 

# HW02 Main Report - Domain Testing and Boundary Value Analysis

## 1. Introduction

Báo cáo này trình bày kết quả thiết kế và thực thi kiểm thử Domain Testing / Boundary Value Analysis cho bốn tính năng được chọn của EShop SUT: FR-04, FR-08, FR-15 và FR-06. Quy trình làm bài sử dụng hướng tiếp cận **AI-first, human-reviewed**: Agent Skills hỗ trợ sinh phân tích miền, điều kiện, phân hoạch tương đương, giá trị biên và candidate test cases; sinh viên rà soát từng checkpoint, thực thi test trên SUT, ghi nhận actual result và chỉ xác nhận bug khi có bằng chứng quan sát được.

## 2. Selected Features

| Pool | Feature ID | Feature Name                | Surface       | Status |
| :--- | :--------- | :-------------------------- | :------------ | :----- |
| A    | FR-04      | Personal profile management | Web/API       | Completed |
| B    | FR-08      | Checkout                    | Web/API       | Completed |
| C    | FR-15      | Product management CRUD     | Admin Web/API | Completed |
| D    | FR-06      | Mobile product detail view  | Mobile/API    | Completed |

## 3. Testing Methodology

### 3.1 Phân tích Phân hoạch tương đương / Domain Testing

Kỹ thuật Phân hoạch tương đương (Equivalent Partitioning - EP) và Phân tích Miền (Domain Testing) được thực hiện theo cấu trúc 4 bước kế thừa từ tài liệu bài giảng và biểu mẫu báo cáo chuẩn [23127205.pdf](./references/23127205.pdf). Tuy nhiên, các bước 1, 2 và 3 đã được chuẩn hóa sang **dạng bảng biểu** có cột **Cơ sở lý do lựa chọn (Rationale)** để giải thích rõ lý do kỹ thuật đằng sau mỗi quyết định thiết kế:

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
| FR04-DOM-TC02 | Token hợp lệ         | `PUT /api/users/me` rồi reload/`GET /api/users/me` | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ`name`, `shipping_address`, `phone`           | Update được chấp nhận; profile sau reload/GET trả về dữ liệu mới.                                                                         | API cập nhật trực tiếp thành công, nhưng trên giao diện Web Frontend yêu cầu bị chặn lại và hiển thị cảnh báo không hợp lệ do lỗi định dạng Regex của Client. | Failed     | [BUG-FR04-05](./Bug_Report.md)                 | E1, E4, E5, E10, E12, E14, E17 |
| FR04-DOM-TC03 | Thiếu token          | `GET /api/users/me`                                | `""`         | `""`                        | `""`       | `""`                                            | Trả về/hiển thị unauthorized error; không trả về profile data.                                                                            | API từ chối với mã lỗi 401 Unauthorized.                                                                                                                      | Pass       | `""`                                                    | E2                             |
| FR04-DOM-TC04 | Token sai/hết hạn    | `GET /api/users/me`                                | `""`         | `""`                        | `""`       | `""`                                            | Trả về/hiển thị unauthorized error; không trả về profile data.                                                                            | API từ chối với mã lỗi 403 Forbidden.                                                                                                                         | Pass       | `""`                                                    | E3                             |
| FR04-DOM-TC05 | Thiếu token          | `PUT /api/users/me`                                | Tran Van B   | 45 Nguyen Hue, Q1, TP.HCM   | 0987654321 | Đủ`name`, `shipping_address`, `phone`           | Trả về/hiển thị unauthorized error; profile cũ không bị thay đổi.                                                                         | API từ chối với mã lỗi 401 Unauthorized.                                                                                                                      | Pass       | `""`                                                    | E2                             |
| FR04-DOM-TC06 | Token sai/hết hạn    | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ`name`, `shipping_address`, `phone`           | Trả về/hiển thị unauthorized/forbidden error; profile cũ không bị thay đổi.                                                               | API từ chối với mã lỗi 403 Forbidden.                                                                                                                         | Pass       | `""`                                                    | E3                             |
| FR04-DOM-TC07 | Token hợp lệ         | `PUT /api/users/me`                                | Le Thi C     | 88 Pasteur, Q3, TP.HCM      | `""`       | Thiếu field`phone`                              | Trả về validation error và profile cũ không đổi (yêu cầu đủ field).                                                                       | API trả về 200 OK nhưng gán giá trị NULL xóa trắng dữ liệu phone hiện có.                                                                                     | Failed     | [BUG-FR04-02](./Bug_Report.md)                 | E7                             |
| FR04-DOM-TC08 | Token hợp lệ         | `PUT /api/users/me`                                | Pham Van D   | 10 Hai Ba Trung, Q1, TP.HCM | 0900000000 | Có thêm field ngoài scope, ví dụ`role: "admin"` | Chỉ cập nhật các trường thông tin cá nhân và từ chối nâng quyền.                                                                          | API trả về 200 OK và cập nhật vai trò của tài khoản thành admin.                                                                                              | Failed     | [BUG-FR04-01](./Bug_Report.md)                 | E9                             |
| FR04-DOM-TC09 | Token hợp lệ         | `PUT /api/users/me`                                | `""`         | 123 Le Loi, Q1, TP.HCM      | 0912345678 | Đủ field,`name` rỗng                            | Báo lỗi validation bắt buộc nhập`name`.                                                                                                   | API trả về 200 OK và cập nhật chuỗi rỗng vào tên của tài khoản.                                                                                               | Failed     | [BUG-FR04-03](./Bug_Report.md)                 | E11                            |
| FR04-DOM-TC10 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | `""`                        | 0912345678 | Đủ field,`shipping_address` rỗng                | Báo lỗi validation bắt buộc nhập`shipping_address`.                                                                                       | API trả về 200 OK và cập nhật chuỗi rỗng vào địa chỉ trong DB.                                                                                                | Failed     | [BUG-FR04-03](./Bug_Report.md)                 | E13                            |
| FR04-DOM-TC11 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | `""`       | Đủ field,`phone` rỗng                           | Báo lỗi validation bắt buộc nhập`phone`.                                                                                                  | API trả về 200 OK và cập nhật chuỗi rỗng vào trường số điện thoại.                                                                                            | Failed     | [BUG-FR04-03](./Bug_Report.md)                 | E15                            |
| FR04-DOM-TC12 | Token hợp lệ         | `PUT /api/users/me`                                | Nguyen Van A | 123 Le Loi, Q1, TP.HCM      | abc-phone  | Đủ field,`phone` không đúng định dạng số        | Báo lỗi số điện thoại không đúng định dạng.                                                                                               | API trả về 200 OK và chấp nhận lưu chuỗi "abc-phone" sai định dạng.                                                                                           | Failed     | [BUG-FR04-03](./Bug_Report.md)                 | E16                            |

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
| FR04-BVA-TC03 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `0912345678` (10 số)  | `phone` length = 10 (tại biên)       | Cập nhật thành công.                                              | API cập nhật trực tiếp thành công, nhưng trên giao diện Web Frontend yêu cầu bị chặn lại và hiển thị cảnh báo không hợp lệ do lỗi định dạng Regex của Client. | Failed     | [BUG-FR04-05](./Bug_Report.md) | FR04-BVA-B02 |
| FR04-BVA-TC04 | Token hợp lệ         | Chuỗi rỗng`""` | 123 Le Loi, Q1   | 0912345678            | `name` length = 0 (dưới biên dưới)   | Báo lỗi validation bắt buộc nhập`name`.                           | API trả về 200 OK và lưu chuỗi rỗng vào DB.                                                                                                                   | Failed     | [BUG-FR04-03](./Bug_Report.md) | FR04-BVA-B01 |
| FR04-BVA-TC05 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `091234567` (9 số)    | `phone` length = 9 (dưới biên dưới)  | Báo lỗi số điện thoại không đúng định dạng.                       | API trả về 200 OK và chấp nhận số điện thoại 9 số.                                                                                                            | Failed     | [BUG-FR04-03](./Bug_Report.md) | FR04-BVA-B02 |
| FR04-BVA-TC06 | Token hợp lệ         | Nguyen Van A   | 123 Le Loi, Q1   | `09123456789` (11 số) | `phone` length = 11 (trên biên trên) | Báo lỗi số điện thoại không đúng định dạng; profile cũ không đổi. | API trả về 200 OK và chấp nhận số điện thoại 11 số.                                                                                                           | Failed     | [BUG-FR04-03](./Bug_Report.md) | FR04-BVA-B02 |

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
| FR08-DOM-TC01 | Token hợp lệ      | Cart có product`{ id: 1, name: "Sample Product", price: 100000, quantity: 2 }` | `200000`                                                   | `123 Le Loi, TP.HCM`          | Checkout thành công; order hoặc trạng thái xác nhận checkout tương đương được tạo/hiển thị; cart/order state sau checkout đúng.                                  | API trả `200 OK`, tạo order `pending` với `total_amount=200000`; nhưng `GET /api/cart` sau checkout vẫn còn item cũ. | Failed     | [BUG-FR08-01](./Bug_Report.md) | E1, E4, E6, E7, E8, E9, E11, E16, E18, E22, E25, E28 |
| FR08-DOM-TC02 | Thiếu token       | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị unauthorized error; không tạo order.                                                                                                    | API trả `401 Unauthorized`.                                                                                          | Pass       | `""`                                    | E2, E27                                              |
| FR08-DOM-TC03 | Token sai/hết hạn | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị unauthorized error; không tạo order.                                                                                                    | API trả `403 Forbidden`.                                                                                             | Pass       | `""`                                    | E3, E27                                              |
| FR08-DOM-TC04 | Token hợp lệ      | Cart rỗng                                                                      | `0` hoặc giá trị theo UI/API cho empty cart                | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: checkout empty cart nên bị chặn hoặc trả về validation/error state; không tự kết luận nếu SUT chưa verify.                                     | Với user mới có `beforeCart=[]`, API vẫn trả `200 OK` và tạo order `pending` có `total_amount=0`.                    | Failed     | [BUG-FR08-06](./Bug_Report.md) | E5                                                   |
| FR08-DOM-TC05 | Token hợp lệ      | Cart có product nominal                                                        | Thiếu field`total_amount`                                  | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount=null`.                                                                 | Failed     | [BUG-FR08-02](./Bug_Report.md) | E10, E23, E26, E29                                   |
| FR08-DOM-TC06 | Token hợp lệ      | Cart có product nominal                                                        | `100000`                                                   | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: hệ thống xử lý trường hợp`total_amount` không khớp cart total; không tạo order nếu xem đây là dữ liệu checkout không hợp lệ.                   | API trả `200 OK`, tạo order với `total_amount=100000` dù cart nominal là `200000`.                                   | Failed     | [BUG-FR08-02](./Bug_Report.md) | E12                                                  |
| FR08-DOM-TC07 | Token hợp lệ      | Cart có product nominal                                                        | `0`                                                        | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `total_amount=0`.                                                                    | Failed     | [BUG-FR08-02](./Bug_Report.md) | E13                                                  |
| FR08-DOM-TC08 | Token hợp lệ      | Cart có product nominal                                                        | `-1`                                                       | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount=-1`.                                                                   | Failed     | [BUG-FR08-02](./Bug_Report.md) | E14, E26, E29                                        |
| FR08-DOM-TC09 | Token hợp lệ      | Cart có product nominal                                                        | `"abc"`                                                    | `123 Le Loi, TP.HCM`          | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `total_amount="abc"`.                                                                | Failed     | [BUG-FR08-02](./Bug_Report.md) | E15, E26, E29                                        |
| FR08-DOM-TC10 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | Thiếu field`shipping_address` | Hệ thống trả về/hiển thị validation error; không tạo order.                                                                                                      | API trả `200 OK`, tạo order với `shipping_address=null`.                                                             | Failed     | [BUG-FR08-03](./Bug_Report.md) | E17, E23, E26, E29                                   |
| FR08-DOM-TC11 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `""`                          | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `shipping_address=""`.                                                               | Failed     | [BUG-FR08-03](./Bug_Report.md) | E19                                                  |
| FR08-DOM-TC12 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `"   "`                       | Hệ thống trả về/hiển thị validation error hoặc behavior tương ứng cần verify; không tạo order nếu dữ liệu bị xem là không hợp lệ.                                | API trả `200 OK`, tạo order với `shipping_address="   "`.                                                            | Failed     | [BUG-FR08-03](./Bug_Report.md) | E20                                                  |
| FR08-DOM-TC13 | Token hợp lệ      | Cart có product nominal                                                        | `200000`                                                   | `123 Le Loi, Q.1, TP.HCM`     | Checkout thành công nếu SUT chấp nhận địa chỉ có ký tự thường gặp như dấu phẩy, dấu chấm; order hoặc trạng thái xác nhận checkout tương đương được tạo/hiển thị. | API trả `200 OK`, tạo order với địa chỉ `123 Le Loi, Q.1, TP.HCM`; cart vẫn không được xóa sau checkout.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | E21, E25, E28                                        |
| FR08-DOM-TC14 | Token hợp lệ      | Cart có product nominal                                                        | `200000`, kèm thêm field ngoài scope, ví dụ `note: "test"` | `123 Le Loi, TP.HCM`          | Cần quan sát SUT: field ngoài scope có thể bị bỏ qua hoặc bị từ chối; không tự gán Pass/Fail trước khi execute.                                                  | API trả `200 OK`, tạo order bình thường và bỏ qua field `note`; cart vẫn không được xóa sau checkout.                | Failed     | [BUG-FR08-01](./Bug_Report.md) | E24                                                  |

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
| **FR08-BVA-TC01** | Token hợp lệ | Cart có product nominal                                 | `199999`     | `123 Le Loi, TP.HCM` | `total_amount = X - 1` (199.999 VNĐ)         | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 199999`.                            | Failed     | [BUG-FR08-02](./Bug_Report.md) | FR08-BVA-B01 |
| **FR08-BVA-TC02** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `123 Le Loi, TP.HCM` | `total_amount = X` (200.000 VNĐ)             | Checkout thành công; order được tạo và cart được xóa.                      | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout vẫn giữ nguyên sản phẩm cũ. | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B01 |
| **FR08-BVA-TC03** | Token hợp lệ | Cart có product nominal                                 | `200001`     | `123 Le Loi, TP.HCM` | `total_amount = X + 1` (200.001 VNĐ)         | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 200001`.                            | Failed     | [BUG-FR08-02](./Bug_Report.md) | FR08-BVA-B01 |
| **FR08-BVA-TC04** | Token hợp lệ | Cart có product nominal                                 | `0`          | `123 Le Loi, TP.HCM` | `total_amount = 0` (Cận dưới ngoài biên)     | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với `total_amount = 0`.                                 | Failed     | [BUG-FR08-02](./Bug_Report.md) | FR08-BVA-B02 |
| **FR08-BVA-TC05** | Token hợp lệ | Cart có product `{ id: 1, price: 1, quantity: 1 }`      | `1`          | `123 Le Loi, TP.HCM` | `total_amount = 1` VNĐ (Biên dưới)           | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B02 |
| **FR08-BVA-TC06** | Token hợp lệ | Cart có product `{ id: 1, price: 2, quantity: 1 }`      | `2`          | `123 Le Loi, TP.HCM` | `total_amount = 2` VNĐ (Cận dưới trong biên) | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B02 |
| **FR08-BVA-TC07** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `""`                 | `shipping_address` rỗng (0 ký tự)            | Hệ thống trả về/hiển thị validation error; không tạo order.                | API trả về `200 OK`, tạo order thành công với địa chỉ giao hàng rỗng `""`.                        | Failed     | [BUG-FR08-03](./Bug_Report.md) | FR08-BVA-B03 |
| **FR08-BVA-TC08** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `"A"`                | `shipping_address` dài 1 ký tự               | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B03 |
| **FR08-BVA-TC09** | Token hợp lệ | Cart có product nominal                                 | `200000`     | `"AB"`               | `shipping_address` dài 2 ký tự               | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B03 |
| **FR08-BVA-TC10** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 0 }` | `0`          | `123 Le Loi, TP.HCM` | `cart_item.quantity = 0`                     | Hệ thống từ chối thêm vào giỏ hàng hoặc báo lỗi checkout; không tạo order. | API trả về `200 OK`, chấp nhận giỏ hàng chứa sản phẩm số lượng bằng 0 và tạo đơn hàng.            | Failed     | [BUG-FR08-05](./Bug_Report.md) | FR08-BVA-B04 |
| **FR08-BVA-TC11** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 1 }` | `100000`     | `123 Le Loi, TP.HCM` | `cart_item.quantity = 1`                     | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B04 |
| **FR08-BVA-TC12** | Token hợp lệ | Cart có product `{ id: 1, price: 100000, quantity: 2 }` | `200000`     | `123 Le Loi, TP.HCM` | `cart_item.quantity = 2`                     | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B04 |
| **FR08-BVA-TC13** | Token hợp lệ | Cart rỗng (0 sản phẩm)                                  | `0`          | `123 Le Loi, TP.HCM` | `cart_state` có 0 sản phẩm                   | Hệ thống từ chối checkout, báo lỗi giỏ hàng rỗng; không tạo order.         | API trả về `200 OK`, tạo order thành công với tổng tiền 0đ ngay cả khi giỏ hàng rỗng.             | Failed     | [BUG-FR08-06](./Bug_Report.md) | FR08-BVA-B05 |
| **FR08-BVA-TC14** | Token hợp lệ | Cart có 1 sản phẩm nominal                              | `200000`     | `123 Le Loi, TP.HCM` | `cart_state` có 1 sản phẩm                   | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B05 |
| **FR08-BVA-TC15** | Token hợp lệ | Cart có 2 sản phẩm khác nhau                            | `200000`     | `123 Le Loi, TP.HCM` | `cart_state` có 2 sản phẩm                   | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B05 |
| **FR08-BVA-TC16** | Token hợp lệ | Cart có product `{ id: 1, price: 0, quantity: 2 }`      | `0`          | `123 Le Loi, TP.HCM` | `cart_item.price = 0`                        | Hệ thống từ chối thêm vào giỏ hàng hoặc báo lỗi checkout; không tạo order. | API trả về `200 OK`, chấp nhận sản phẩm đơn hàng bằng 0đ và cho phép tạo đơn hàng thành công.      | Failed     | [BUG-FR08-05](./Bug_Report.md) | FR08-BVA-B06 |
| **FR08-BVA-TC17** | Token hợp lệ | Cart có product `{ id: 1, price: 1, quantity: 2 }`      | `2`          | `123 Le Loi, TP.HCM` | `cart_item.price = 1` VNĐ                    | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B06 |
| **FR08-BVA-TC18** | Token hợp lệ | Cart có product `{ id: 1, price: 2, quantity: 2 }`      | `4`          | `123 Le Loi, TP.HCM` | `cart_item.price = 2` VNĐ                    | Checkout thành công; order được tạo.                                       | API trả về `200 OK`, tạo order thành công nhưng giỏ hàng sau checkout không được xóa.             | Failed     | [BUG-FR08-01](./Bug_Report.md) | FR08-BVA-B06 |


### 5.4 AI Gap Analysis

Phần AI Gap Analysis của FR-08 tập trung vào khoảng cách giữa thiết kế kiểm thử ban đầu, các giả định hợp lý của AI theo requirement, và hành vi thực tế quan sát được khi chạy SUT qua API/Web.

- **Khoảng cách do context/prompt ban đầu:** Context FR-08 mô tả checkout request gồm `total_amount` và `shipping_address`, nhưng chưa có rule explicit về min/max, cart rỗng, server có tự tính lại tổng tiền hay không, hoặc cart có cần được clear sau checkout. Vì vậy thiết kế ban đầu dễ dừng ở happy path: cart có item, `total_amount` khớp, địa chỉ có nội dung và checkout tạo order.
- **Khoảng cách do AI giả định hệ thống được validate tốt:** AI có xu hướng kỳ vọng backend sẽ từ chối `total_amount = 0`, số âm, sai kiểu, thiếu `shipping_address`, cart rỗng, hoặc cart item có `quantity = 0` / `price = 0`. Khi execute bằng script API, SUT lại trả `200 OK` và tạo order cho nhiều dữ liệu sai, cho thấy expected result lý thuyết khác xa behavior thực tế.
- **Khoảng cách do thiếu kiểm thử tương tác UI/API:** Nếu chỉ nhìn API spec, khó thấy frontend Checkout cho người dùng sửa trực tiếp tổng tiền thanh toán và có thể gửi dữ liệu không đáng tin lên backend. Human review và thao tác UI giúp phát hiện bug UI/API integration: tổng tiền là input có thể chỉnh sửa, `shipping_address` không được xử lý đúng, còn backend tin dữ liệu client gửi.
- **Khoảng cách do trạng thái hậu điều kiện:** AI ban đầu dễ xác nhận checkout thành công ngay khi API trả success hoặc order được tạo. Tuy nhiên khi kiểm tra thêm hậu trạng thái, cart không được xóa sau checkout, khiến người dùng có thể checkout lặp lại hoặc tiếp tục giữ dữ liệu cũ. Đây là khoảng trống quan trọng giữa "order created" và "checkout workflow completed correctly".
- **Các SUT-specific behavior đã quan sát được:**
  1. Backend tin trực tiếp `total_amount` từ client, kể cả thiếu field, sai lệch với cart, bằng `0`, âm hoặc sai kiểu.
  2. Backend không validate `shipping_address`, vẫn tạo order khi thiếu, rỗng hoặc chỉ gồm whitespace.
  3. Backend cho checkout với cart rỗng và tạo order tổng tiền `0`.
  4. API cart/checkout chấp nhận cart item có `quantity = 0` hoặc `price = 0`.
  5. Cart không được clear sau checkout thành công.
  6. Frontend Checkout cho phép chỉnh sửa tổng tiền, làm tăng rủi ro client-side tampering.
- **Human review correction:** Sau review, test suite được bổ sung thêm các case BVA/negative quan trọng: `total_amount = 0/-1/"abc"`, thiếu `total_amount`, thiếu/rỗng/whitespace `shipping_address`, cart rỗng, `quantity = 0`, `price = 0`, và kiểm tra cart state sau checkout. Các kết quả thực thi được map sang `BUG-FR08-01` đến `BUG-FR08-06`.
- **Bài học cho prompt sau:** Với các feature xử lý giao dịch như checkout, prompt cần yêu cầu AI kiểm tra cả request validation, server-side recomputation, state transition sau success, khả năng client tampering, và consistency giữa UI/API. Nếu chỉ yêu cầu EP/BVA trên input field, AI có thể bỏ sót lỗi workflow và hậu điều kiện.

## 6. FR-15 - Product Management CRUD

### 6.1 Feature Overview

FR-15 Product Management CRUD cho phép Admin quản lý sản phẩm trong hệ thống EShop thông qua Web Admin và Product APIs. Tính năng được kiểm thử theo hướng black-box, tập trung vào phân quyền Admin, thao tác create/update/delete product, dữ liệu product body, category hợp lệ, và trạng thái product list/detail sau khi thao tác.

| Mục                      | Nội dung                                                                                                                                                                                                                                                                 |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Feature ID               | FR-15                                                                                                                                                                                                                                                                    |
| Feature name             | Product management CRUD                                                                                                                                                                                                                                                  |
| Pool                     | C                                                                                                                                                                                                                                                                        |
| Surface                  | Admin Web/API                                                                                                                                                                                                                                                            |
| User role                | Admin                                                                                                                                                                                                                                                                    |
| Preconditions            | Admin có tài khoản hợp lệ, đã đăng nhập và có authentication token hợp lệ. Product APIs và Web Admin có thể truy cập được. Có ít nhất một category hợp lệ; với update/delete path cần có ít nhất một test product tồn tại.                                               |
| API liên quan            | `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`, `GET /api/categories`                                                                                                                           |
| Input chính              | Authentication/admin state, CRUD operation, `product_id`, `name`, `price`, `description`, `imageUrl`, `category_id`, mức đầy đủ của request body, trạng thái category list và target product.                                                                            |
| Output/state chính       | Product được tạo/cập nhật/xóa, product list/detail phản ánh thay đổi, validation error, unauthorized/forbidden error, not found error, trạng thái giao diện Admin sau update.                                                                                            |
| Out of scope             | Quản lý category CRUD, upload file ảnh thật, inventory/stock management, discount/price promotion, search/filter/sort nâng cao, concurrent update/delete giữa nhiều Admin nếu không được kiểm thử riêng.                                                                  |
| Điểm cần verify trên SUT | `name` bắt buộc và tối đa 255 ký tự; `price` bắt buộc và phải lớn hơn 0; `category_id` phải thuộc danh sách category có sẵn; hành vi khi thiếu field bắt buộc; phân quyền Admin cho `POST`/`PUT`/`DELETE`; update một product không làm ảnh hưởng product khác trên UI. |

### 6.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT | Cơ sở lý do lựa chọn (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| `auth_state` | State | Enum / trạng thái phiên | Trạng thái xác thực/phân quyền khi gọi Admin Product CRUD: admin hợp lệ, non-admin, thiếu token, token sai/hết hạn. | Context nêu product CRUD cần admin access và cần verify hành vi với non-admin/unauthenticated user. |
| `crud_operation` | Input | Enum | Thao tác quản lý product: create, update, delete; ngoài ra có thể dùng list/detail để quan sát kết quả. | Feature FR-15 là Product management CRUD, trong đó rule có căn cứ nêu bao gồm create, update, delete product. |
| `product_id` | Input | Path parameter | ID product dùng cho `GET /api/products/:id`, `PUT /api/products/:id`, `DELETE /api/products/:id`. | Update/delete/detail cần định danh product mục tiêu; context nêu cần có test product tồn tại cho update/delete paths. |
| `name` | Input | String | Tên product trong request body khi create/update. | Product body công khai gồm `name`; giá trị nominal: `Test Product HW02`. |
| `price` | Input | Number | Giá product trong request body khi create/update. | Product body công khai gồm `price`; giá trị nominal: `100000`. Requirement/API spec chưa nêu min/max cụ thể. |
| `description` | Input | String | Mô tả product trong request body khi create/update. | Product body công khai gồm `description`; giá trị nominal: `Test product description`. |
| `imageUrl` | Input | String / URL-like text | Đường dẫn ảnh product trong request body khi create/update. | Product body công khai gồm `imageUrl`; giá trị nominal: `https://example.com/product.png`. Requirement/API spec chưa nêu format URL bắt buộc. |
| `category_id` | Input | Number / ID reference | ID category gắn với product khi create/update. | Product body công khai gồm `category_id`; precondition yêu cầu có ít nhất một product category cho create/update paths. |
| `request_body_completeness` | Input | Object shape / mức đầy đủ body | Mức đầy đủ của request body khi create/update: đủ field, thiếu field có vẻ required, hoặc có field ngoài scope. | Context liệt kê đây là candidate input cần xem xét; body product gồm 5 field công khai, nhưng required/optional cụ thể cần verify trước khi kết luận rule. |
| `category_list_state` | State | Collection state | Trạng thái có category khả dụng từ `GET /api/categories` để dùng trong create/update. | Precondition nêu cần có ít nhất một product category; API liên quan có `GET /api/categories`. |
| `target_product_state` | State | Entity state | Trạng thái product mục tiêu cho update/delete: có ít nhất một test product tồn tại. | Precondition nêu update/delete test paths cần có ít nhất một test product tồn tại. |
| `created_product` | Output | Entity / persisted state | Product được tạo sau thao tác create thành công. | Candidate output/state nêu "Product được tạo"; đây là kết quả quan sát chính của create. |
| `updated_product` | Output | Entity / persisted state | Product được cập nhật sau thao tác update thành công. | Candidate output/state nêu "Product được cập nhật"; đây là kết quả quan sát chính của update. |
| `deleted_product_state` | Output/State | Entity availability state | Product bị xóa hoặc không còn truy cập được sau delete. | Candidate output/state nêu "Product bị xóa hoặc không còn truy cập được sau delete". |
| `product_list_or_detail` | Output | List / entity response | Product list/detail phản ánh thay đổi sau create/update/delete. | Context nêu `GET /api/products` và `GET /api/products/:id`; candidate output/state nêu list/detail phản ánh thay đổi thành công. |
| `validation_error` | Output | Error response / UI message | Lỗi validation được hiển thị hoặc trả về khi dữ liệu product không được chấp nhận. | Candidate output/state nêu validation error; chi tiết rule validation chưa được xác định ở Step 1. |
| `unauthorized_or_forbidden_error` | Output | Error response / UI message | Lỗi unauthorized/forbidden khi user không đủ quyền hoặc thiếu/sai token. | Context nêu admin access cho product CRUD cần verify; candidate output/state nêu unauthorized/forbidden error. |
| `not_found_error` | Output | Error response / UI message | Lỗi not found khi product ID mục tiêu không tồn tại hoặc không truy cập được. | Context nêu cần kiểm chứng delete behavior với product ID không tồn tại; candidate output/state nêu not found error. |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng | Mô tả điều kiện | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale) |
| :--- | :--- | :--- | :--- |
| C1 | `auth_state` | User thực hiện Product CRUD phải có quyền Admin hợp lệ. | Context FR-15 nêu Product CRUD ảnh hưởng dữ liệu cần admin access; đây là điều kiện phân quyền chính của Admin Web/API. |
| C2 | `crud_operation` | Thao tác quản lý product thuộc nhóm create, update, delete. | Requirement có căn cứ nêu Product management bao gồm create, update, delete product. |
| C3 | `product_id` | Với update/delete/detail, request cần xác định product mục tiêu bằng `product_id`. | API công khai có `GET /api/products/:id`, `PUT /api/products/:id`, `DELETE /api/products/:id`; update/delete cần product mục tiêu tồn tại theo precondition. |
| C4 | `name` | Khi create/update product, request body có field `name` dạng string. | Product body công khai gồm `name`; chưa có căn cứ về min/max length nên không đưa điều kiện độ dài. |
| C5 | `price` | Khi create/update product, request body có field `price` dạng number. | Product body công khai gồm `price` với giá trị nominal `100000`; chưa có căn cứ về min/max hoặc miền giá trị cụ thể. |
| C6 | `description` | Khi create/update product, request body có field `description` dạng string. | Product body công khai gồm `description`; context chưa nêu constraint bắt buộc về độ dài/nội dung. |
| C7 | `imageUrl` | Khi create/update product, request body có field `imageUrl` dạng string. | Product body công khai gồm `imageUrl`; requirement/API spec chưa nêu format URL bắt buộc nên chưa xem format URL là condition chính thức. |
| C8 | `category_id` | Khi create/update product, request body có field `category_id` để gắn product với category. | Product body công khai gồm `category_id`; precondition nêu cần có ít nhất một product category cho create/update test paths. |
| C9 | `request_body_completeness` | Request body cho create/update cần có các field bắt buộc và dùng các field product được API công khai hỗ trợ. | Context nêu body product gồm `name`, `price`, `description`, `imageUrl`, `category_id`; README công khai nêu `name`, `price`, `category_id` là bắt buộc. |
| C10 | `category_list_state` | Có category khả dụng để chọn/gửi `category_id` trong create/update. | Preconditions nêu có ít nhất một product category; API liên quan có `GET /api/categories`. |
| C11 | `target_product_state` | Có test product tồn tại trước khi thực hiện update/delete path hợp lệ. | Preconditions nêu với update/delete test paths, cần có ít nhất một test product tồn tại. |
| C12 | `created_product` | Sau create thành công, hệ thống tạo product mới và có thể quan sát lại qua list/detail. | Candidate output/state nêu Product được tạo và product list/detail phản ánh thay đổi thành công. |
| C13 | `updated_product` | Sau update thành công, dữ liệu product được cập nhật và có thể quan sát lại qua list/detail. | Candidate output/state nêu Product được cập nhật và product list/detail phản ánh thay đổi thành công. |
| C14 | `deleted_product_state` | Sau delete thành công, product bị xóa hoặc không còn truy cập được như product còn tồn tại. | Candidate output/state nêu Product bị xóa hoặc không còn truy cập được sau delete. |
| C15 | `validation_error` | Với dữ liệu product không được chấp nhận, hệ thống hiển thị/trả về validation error. | Candidate output/state nêu validation error; chi tiết rule validation chưa có căn cứ nên chưa tách min/max/format. |
| C16 | `unauthorized_or_forbidden_error` | Với thiếu quyền hoặc thiếu/sai token, hệ thống hiển thị/trả về unauthorized/forbidden error. | Context nêu cần verify behavior với non-admin và unauthenticated user; admin access là rule có căn cứ từ README/context. |
| C17 | `not_found_error` | Với product mục tiêu không tồn tại, hệ thống hiển thị/trả về not found error hoặc trạng thái tương đương. | Context nêu cần kiểm chứng delete behavior với product ID không tồn tại; candidate output/state có not found error. |
| C18 | `updated_product` / `product_list_or_detail` | Khi update một product, chỉ product mục tiêu bị thay đổi; các product khác giữ nguyên. | README công khai của FR-15 nêu khi sửa một sản phẩm, chỉ sản phẩm đó bị thay đổi, các sản phẩm khác giữ nguyên. |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện | Lý do lựa chọn & Biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| E1 | C1 | Hợp lệ (Valid) | User là Admin đã đăng nhập với token hợp lệ. | FR-15 là Admin Web/API; Product CRUD cần admin access. |
| E2 | C1, C16 | Không hợp lệ (Invalid) | Thiếu token authentication. | CRUD ảnh hưởng dữ liệu cần xác thực; context yêu cầu verify unauthenticated behavior. |
| E3 | C1, C16 | Không hợp lệ (Invalid) | Token sai/hết hạn. | Cùng nhóm lỗi authentication không hợp lệ, cần trả unauthorized/forbidden tương ứng. |
| E4 | C1, C16 | Không hợp lệ (Invalid) | User đã đăng nhập nhưng không phải Admin. | Context nêu cần verify behavior với non-admin user. |
| E5 | C2 | Hợp lệ (Valid) | Thao tác `create` product bằng `POST /api/products`. | Requirement có căn cứ nêu Product management bao gồm create. |
| E6 | C2 | Hợp lệ (Valid) | Thao tác `update` product bằng `PUT /api/products/:id`. | Requirement có căn cứ nêu Product management bao gồm update. |
| E7 | C2 | Hợp lệ (Valid) | Thao tác `delete` product bằng `DELETE /api/products/:id`. | Requirement có căn cứ nêu Product management bao gồm delete. |
| E8 | C3, C11 | Hợp lệ (Valid) | `product_id` trỏ tới product đang tồn tại, ví dụ test product đã tạo trước đó. | Preconditions nêu update/delete cần có ít nhất một test product tồn tại. |
| E9 | C3, C17 | Không hợp lệ (Invalid) | `product_id` không tồn tại. | Context nêu cần kiểm chứng delete behavior với product ID không tồn tại; output kỳ vọng thuộc nhóm not found/error tương đương. |
| E10 | C3, C17 | Không hợp lệ (Invalid) | `product_id` sai định dạng, ví dụ không phải ID hợp lệ theo API path. | Context liệt kê product id sai format là candidate input; đây là lớp request không định danh được product hợp lệ. |
| E11 | C4 | Hợp lệ (Valid) | `name` là string, ví dụ `Test Product HW02`. | Product body công khai gồm `name`; chưa có căn cứ min/max nên chỉ phân hoạch theo type/có giá trị mẫu. |
| E12 | C4, C15 | Không hợp lệ (Invalid) | `name` không phải string. | Body mẫu thể hiện `name` là string; sai kiểu dữ liệu thuộc nhóm validation error. |
| E13 | C5 | Hợp lệ (Valid) | `price` là number, ví dụ `100000`. | Product body công khai gồm `price` với giá trị number nominal. |
| E14 | C5, C15 | Không hợp lệ (Invalid) | `price` không phải number. | Body mẫu thể hiện `price` là number; sai kiểu dữ liệu thuộc nhóm validation error. |
| E15 | C6 | Hợp lệ (Valid) | `description` là string, ví dụ `Test product description`. | Product body công khai gồm `description`; chưa có căn cứ min/max/nội dung bắt buộc. |
| E16 | C6, C15 | Không hợp lệ (Invalid) | `description` không phải string. | Body mẫu thể hiện `description` là string; sai kiểu dữ liệu thuộc nhóm validation error. |
| E17 | C7 | Hợp lệ (Valid) | `imageUrl` là string, ví dụ `https://example.com/product.png`. | Product body công khai gồm `imageUrl`; chưa có căn cứ bắt buộc validate URL format. |
| E18 | C7, C15 | Không hợp lệ (Invalid) | `imageUrl` không phải string. | Body mẫu thể hiện `imageUrl` là string; sai kiểu dữ liệu thuộc nhóm validation error. |
| E19 | C8, C10 | Hợp lệ (Valid) | `category_id` là ID number dùng category khả dụng, ví dụ `1`. | Body công khai gồm `category_id`; precondition nêu có ít nhất một category cho create/update. |
| E20 | C8, C15 | Không hợp lệ (Invalid) | `category_id` sai type, ví dụ string/object thay vì number ID. | Body mẫu thể hiện `category_id` là number; sai kiểu dữ liệu thuộc nhóm validation error. |
| E21 | C9 | Hợp lệ (Valid) | Request body create/update có đủ các field công khai: `name`, `price`, `description`, `imageUrl`, `category_id`. | API spec/context cung cấp body mẫu với các field này; dùng làm request hợp lệ nominal. |
| E22 | C12 | Hợp lệ (Valid) | Sau create hợp lệ, product mới xuất hiện trong list/detail. | Candidate output/state nêu product được tạo và list/detail phản ánh thay đổi. |
| E23 | C13 | Hợp lệ (Valid) | Sau update hợp lệ, product detail/list phản ánh dữ liệu đã cập nhật. | Candidate output/state nêu product được cập nhật và list/detail phản ánh thay đổi. |
| E24 | C14 | Hợp lệ (Valid) | Sau delete hợp lệ, product không còn truy cập được như product tồn tại. | Candidate output/state nêu product bị xóa hoặc không còn truy cập được sau delete. |
| E25 | C15 | Không hợp lệ (Invalid) | Request có dữ liệu sai kiểu ở một field product và hệ thống trả/hiển thị validation error. | Gom nhóm output cho các EP invalid về type như `name`, `price`, `description`, `imageUrl`, `category_id`. |
| E26 | C16 | Không hợp lệ (Invalid) | Request Product CRUD không đủ quyền và hệ thống trả/hiển thị unauthorized/forbidden error. | Output tương ứng với các EP auth invalid: thiếu token, token sai/hết hạn, non-admin. |
| E27 | C17 | Không hợp lệ (Invalid) | Request trỏ tới product không tồn tại/sai định danh và hệ thống trả/hiển thị not found/error tương đương. | Output tương ứng với `product_id` không tìm được hoặc không hợp lệ. |
| E28 | C9, C15 | Không hợp lệ (Invalid) | Request body thiếu field bắt buộc `name`. | README công khai nêu tên sản phẩm là bắt buộc; thiếu `name` phải bị validation error. |
| E29 | C9, C15 | Không hợp lệ (Invalid) | Request body thiếu field bắt buộc `price`. | README công khai nêu giá là bắt buộc và phải là số dương. |
| E30 | C9, C15 | Không hợp lệ (Invalid) | Request body thiếu field bắt buộc `category_id`. | README công khai nêu danh mục là bắt buộc và phải chọn từ danh sách có sẵn. |
| E31 | C18 | Hợp lệ (Valid) | Update product A không làm thay đổi product B. | FR-15 README nêu khi sửa một sản phẩm, chỉ sản phẩm đó bị thay đổi, các sản phẩm khác giữ nguyên. |
| E32 | C18 | Không hợp lệ (Invalid) | Sau khi update một product trên Web Admin, tên các product khác cũng bị đổi theo. | Vi phạm rule isolation của FR-15: khi sửa một sản phẩm, chỉ sản phẩm đó bị thay đổi; đây là lỗi quan sát được trên giao diện Admin. |

Các rule không đưa vào EP chính thức vì chưa có căn cứ đủ rõ: max `price`, format bắt buộc của `imageUrl`, min/max length của `description`.

#### Step 4: Xác định Test Case

| Mã test case | Auth state | Operation | Product ID | Request body / Test data | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ các lớp EP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR15-DOM-TC01 | Admin token hợp lệ | Create | N/A | `name="Test Product HW02"`, `price=100000`, `description="Test product description"`, `imageUrl="https://example.com/product.png"`, `category_id=1` | Product mới được tạo thành công và có thể quan sát trong list/detail. | API trả về 200 OK, tạo product thành công và trả về ID mới. | Pass | `""` | E1, E5, E11, E13, E15, E17, E19, E21, E22 |
| FR15-DOM-TC02 | Admin token hợp lệ | Update | ID product tồn tại | `name="Test Product HW02 Updated"`, `price=100000`, `description="Updated product description"`, `imageUrl="https://example.com/product.png"`, `category_id=1` | Product được cập nhật thành công và list/detail phản ánh dữ liệu mới. | API trả về 200 OK, thông báo "Product updated". | Pass | `""` | E1, E6, E8, E11, E13, E15, E17, E19, E21, E23 |
| FR15-DOM-TC03 | Admin token hợp lệ | Delete | ID product tồn tại | N/A | Product bị xóa thành công hoặc không còn truy cập được như product tồn tại. | API trả về 200 OK, thông báo "Product deleted". | Pass | `""` | E1, E7, E8, E24 |
| FR15-DOM-TC04 | Thiếu token | Create | N/A | Body hợp lệ như TC01 | Hệ thống trả/hiển thị unauthorized hoặc forbidden error; product không được tạo. | API trả về 200 OK, tạo product thành công (bỏ qua phân quyền). | Failed | [BUG-FR15-01](#bug-fr15-01-api-products-thieu-xac-thuc-phan-quyen-va-cho-phep-guest-truy-cap-crud) | E2, E5, E26 |
| FR15-DOM-TC05 | Token sai/hết hạn | Update | ID product tồn tại | Body hợp lệ như TC02 | Hệ thống trả/hiển thị unauthorized hoặc forbidden error; product không được cập nhật. | API trả về 200 OK, cập nhật product thành công (bỏ qua phân quyền). | Failed | [BUG-FR15-01](#bug-fr15-01-api-products-thieu-xac-thuc-phan-quyen-va-cho-phep-guest-truy-cap-crud) | E3, E6, E8, E26 |
| FR15-DOM-TC06 | Non-admin token | Delete | ID product tồn tại | N/A | Hệ thống trả/hiển thị unauthorized hoặc forbidden error; product không bị xóa. | API trả về 200 OK, xóa product thành công (bỏ qua phân quyền). | Failed | [BUG-FR15-01](#bug-fr15-01-api-products-thieu-xac-thuc-phan-quyen-va-cho-phep-guest-truy-cap-crud) | E4, E7, E8, E26 |
| FR15-DOM-TC07 | Admin token hợp lệ | Update | ID product không tồn tại | Body hợp lệ như TC02 | Hệ thống trả/hiển thị not found hoặc error tương đương; không cập nhật product nào. | API trả về 200 OK, thông báo "Product updated" dù ID không tồn tại. | Failed | [BUG-FR15-04](#bug-fr15-04-api-productsid-cap-nhat-xoa-id-khong-ton-tai-van-bao-thanh-cong) | E1, E6, E9, E27 |
| FR15-DOM-TC08 | Admin token hợp lệ | Delete | ID product không tồn tại | N/A | Hệ thống trả/hiển thị not found hoặc error tương đương; không xóa product nào. | API trả về 200 OK, thông báo "Product deleted" dù ID không tồn tại. | Failed | [BUG-FR15-04](#bug-fr15-04-api-productsid-cap-nhat-xoa-id-khong-ton-tai-van-bao-thanh-cong) | E1, E7, E9, E27 |
| FR15-DOM-TC09 | Admin token hợp lệ | Update | Product ID sai định dạng | Body hợp lệ như TC02 | Hệ thống trả/hiển thị not found/error tương đương hoặc từ chối request sai định danh. | API trả về 200 OK, thông báo "Product updated" (SQLite chấp nhận ID dạng chuỗi). | Failed | [BUG-FR15-04](#bug-fr15-04-api-productsid-cap-nhat-xoa-id-khong-ton-tai-van-bao-thanh-cong) | E1, E6, E10, E27 |
| FR15-DOM-TC10 | Admin token hợp lệ | Create | N/A | `name=12345`, các field còn lại hợp lệ như TC01 | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về 200 OK, tạo product thành công với tên dạng số. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E12, E25 |
| FR15-DOM-TC11 | Admin token hợp lệ | Create | N/A | `price="100000"`, các field còn lại hợp lệ như TC01 | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về 200 OK, tạo product thành công với giá dạng chuỗi. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E14, E25 |
| FR15-DOM-TC12 | Admin token hợp lệ | Create | N/A | `description=999`, các field còn lại hợp lệ như TC01 | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về 200 OK, tạo product thành công với mô tả dạng số. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E16, E25 |
| FR15-DOM-TC13 | Admin token hợp lệ | Create | N/A | `imageUrl=999`, các field còn lại hợp lệ như TC01 | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về 200 OK, tạo product thành công với link ảnh dạng số. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E18, E25 |
| FR15-DOM-TC14 | Admin token hợp lệ | Create | N/A | `category_id="1"`, các field còn lại hợp lệ như TC01 | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về 200 OK, tạo product thành công với category_id dạng chuỗi. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E20, E25 |
| FR15-DOM-TC15 | Admin token hợp lệ | Create | N/A | Thiếu field `name`, các field còn lại hợp lệ | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công dù thiếu `name`. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E28, E25 |
| FR15-DOM-TC16 | Admin token hợp lệ | Create | N/A | Thiếu field `price`, các field còn lại hợp lệ | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công dù thiếu `price`. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E29, E25 |
| FR15-DOM-TC17 | Admin token hợp lệ | Create | N/A | Thiếu field `category_id`, các field còn lại hợp lệ | Hệ thống trả/hiển thị validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công dù thiếu `category_id`. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | E1, E5, E30, E25 |
| FR15-DOM-TC18 | Admin token hợp lệ | Update | ID product A tồn tại | Tạo product A và product B; update product A; GET lại product B | Product A được cập nhật, product B giữ nguyên dữ liệu ban đầu. | API trả về `200 OK`; product B vẫn giữ `name`, `price`, `description`, `imageUrl`, `category_id` ban đầu. | Pass | `""` | E1, E6, E8, E23, E31 |
| FR15-DOM-TC19 | Admin đăng nhập trên Web Admin | Update qua UI | ID product A tồn tại | Trên giao diện Admin, cập nhật bất kỳ field nào của product A; quan sát lại danh sách product | Chỉ product A thay đổi; tên các product khác giữ nguyên. | Sau khi cập nhật thành công product A, tên của tất cả các product khác trên giao diện cũng bị đổi theo. | Failed | [BUG-FR15-05](#bug-fr15-05-giao-dien-admin-cap-nhat-mot-san-pham-lam-doi-ten-tat-ca-san-pham-khac) | E6, E8, E32 |

Checklist:

- Các valid EP chính đã được cover qua TC01, TC02, TC03, TC18.
- Các invalid EP được tách theo single fault chính: auth, product id, hoặc sai type từng field.
- Các required-field invalid cases được bổ sung sau khi đối chiếu README công khai của SUT.
- Web Admin update isolation được bổ sung bằng TC19 vì API isolation pass nhưng UI hiển thị/cập nhật sai.

### 6.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số | Có áp dụng BVA không? | Lý do |
| :--- | :--- | :--- |
| `name` | Có | README công khai của SUT nêu tên sản phẩm bắt buộc và tối đa 255 ký tự, nên có boundary theo độ dài chuỗi. |
| `price` | Có | README công khai của SUT nêu giá bắt buộc và phải là số dương (`> 0`), nên có boundary dưới tại ngưỡng chuyển từ không hợp lệ sang hợp lệ. |
| `category_id` | Có giới hạn | README công khai nêu danh mục bắt buộc và phải chọn từ danh sách có sẵn; đây là boundary/trạng thái hợp lệ theo sự tồn tại của category, không phải numeric min/max đầy đủ. |
| `description` | Không | Requirement/API spec chưa nêu min/max length hoặc boundary rõ ràng cho mô tả. |
| `imageUrl` | Không | Requirement/API spec chưa nêu boundary độ dài hoặc format URL bắt buộc cho Product CRUD. |
| `product_id` | Không áp dụng BVA chính thức | Product ID tồn tại/không tồn tại đã được cover trong Domain Testing; không có numeric range công khai để xác định min/max ID. |

#### Step 2: Xác định biên và cận biên

| Mã biên | Tham số | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR15-BVA-B01 | `name` length | `0` ký tự (`""`) | `1` ký tự | `2` ký tự | `Test Product HW02` | `254` ký tự | `255` ký tự | `256` ký tự | README công khai nêu tên sản phẩm bắt buộc và tối đa 255 ký tự. |
| FR15-BVA-B02 | `price` | `-1` | `0` là giá trị không hợp lệ sát biên | `1` | `100000` | N/A | N/A | N/A | README công khai nêu giá phải là số dương (`> 0`), nên giá hợp lệ nhỏ nhất là `1` với dữ liệu integer; không có upper bound công khai. |
| FR15-BVA-B03 | `category_id` existence | Category ID không tồn tại, ví dụ `999` | Category được chọn từ danh sách có sẵn | Category ID tồn tại, ví dụ `1` | `1` | N/A | N/A | N/A | README công khai nêu danh mục bắt buộc và phải chọn từ danh sách có sẵn; test tập trung vào ranh giới tồn tại/không tồn tại của tham chiếu category. |

#### Step 3: Xác định BVA Test Case

| Mã test case | Auth state | Operation | Request body / Test data | Giá trị biên được test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ mã biên |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR15-BVA-TC01 | Admin token hợp lệ | Create | `name="A"`, `price=100000`, `description="Desc"`, `imageUrl="https://example.com/product.png"`, `category_id=1` | `name` length = 1 | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B01 |
| FR15-BVA-TC02 | Admin token hợp lệ | Create | `name="AB"`, các field còn lại hợp lệ như TC01 | `name` length = 2 | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B01 |
| FR15-BVA-TC03 | Admin token hợp lệ | Create | `name=""`, các field còn lại hợp lệ như TC01 | `name` length = 0 | Hệ thống trả validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công với tên rỗng. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | FR15-BVA-B01 |
| FR15-BVA-TC11 | Admin token hợp lệ | Create | `name` gồm 254 ký tự `A`, các field còn lại hợp lệ như TC01 | `name` length = 254 | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B01 |
| FR15-BVA-TC04 | Admin token hợp lệ | Create | `name` gồm 255 ký tự `A`, các field còn lại hợp lệ như TC01 | `name` length = 255 | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B01 |
| FR15-BVA-TC05 | Admin token hợp lệ | Create | `name` gồm 256 ký tự `A`, các field còn lại hợp lệ như TC01 | `name` length = 256 | Hệ thống trả validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công với tên vượt quá 255 ký tự. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | FR15-BVA-B01 |
| FR15-BVA-TC06 | Admin token hợp lệ | Create | `name="Negative Price Product"`, `price=-1`, các field còn lại hợp lệ | `price = -1` | Hệ thống trả validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công với giá âm. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | FR15-BVA-B02 |
| FR15-BVA-TC07 | Admin token hợp lệ | Create | `name="Zero Price Product"`, `price=0`, các field còn lại hợp lệ | `price = 0` | Hệ thống trả validation error; product không được tạo. | API trả về `200 OK`, tạo product thành công với giá bằng 0. | Failed | [BUG-FR15-02](#bug-fr15-02-api-products-backend-khong-validate-du-lieu-dau-vao-khi-them-sua-san-pham) | FR15-BVA-B02 |
| FR15-BVA-TC08 | Admin token hợp lệ | Create | `name="Min Price Product"`, `price=1`, các field còn lại hợp lệ | `price = 1` | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B02 |
| FR15-BVA-TC09 | Admin token hợp lệ | Create | `name="Low Price Product"`, `price=2`, các field còn lại hợp lệ | `price = 2` | Product được tạo thành công. | API trả về `200 OK`, tạo product thành công. | Pass | `""` | FR15-BVA-B02 |
| FR15-BVA-TC10 | Admin token hợp lệ | Create | `name="Invalid Category Product"`, `price=100000`, `description="Desc"`, `imageUrl="https://example.com/product.png"`, `category_id=999` | `category_id` không tồn tại | Hệ thống trả validation error hoặc từ chối category không có trong danh sách; product không được tạo. | API trả về `200 OK`, tạo product thành công với `category_id=999`. | Failed | [BUG-FR15-03](#bug-fr15-03-backend-chap-nhan-imageurl-va-category_id-khong-hop-le-khi-them-sua-san-pham) | FR15-BVA-B03 |

Checklist:

- Mỗi test case chỉ thay đổi một boundary chính; các field còn lại giữ giá trị nominal hợp lệ.
- Boundary được lấy từ README/API spec công khai, không dùng source code hoặc database schema.
- Các boundary chưa có căn cứ như max `price`, min/max `description`, min/max `imageUrl` không được đưa vào bảng chính.

### 6.4 AI Gap Analysis

Phân tích khoảng cách (AI Gap Analysis) cho FR-15 cho thấy khác biệt lớn giữa thiết kế kiểm thử black-box dựa trên requirement và hành vi thực tế của API Product CRUD.

- **Khoảng cách do prompt/context ban đầu:** Context FR-15 trong `references/development_process/Feature_Contexts.md` chỉ nêu body mẫu và ghi rõ nhiều constraint cần kiểm chứng, nên thiết kế Domain Testing ban đầu cố tình không đưa min/max hoặc required-field rule vào bảng chính. Sau khi rà soát thêm README công khai của SUT, các rule `name` bắt buộc tối đa 255 ký tự, `price > 0`, `category_id` bắt buộc từ danh sách có sẵn mới có đủ căn cứ để chuyển thành BVA và Domain negative cases.
- **Khoảng cách do nguồn thông tin bị phân tán:** API specification mô tả endpoint/body, còn README mô tả business rule chi tiết hơn. Nếu agent chỉ đọc API spec hoặc chỉ dùng context rút gọn, các test quan trọng như thiếu `name`, thiếu `price`, thiếu `category_id`, `name` dài 256 ký tự và `price=0` rất dễ bị xem là ngoài scope.
- **Khoảng cách do giới hạn AI trong chọn test:** AI có xu hướng dừng ở dữ liệu nominal (`name="Test Product HW02"`, `price=100000`, `category_id=1`) và các sai kiểu dữ liệu rõ ràng. Rà soát sau giúp bổ sung các lỗi bắt buộc/biên: missing required fields, `name` length 254/255/256, `price=-1/0/1/2`, và category không tồn tại.
- **Khoảng cách do cần execution thực tế:** Trước khi chạy script, expected result chỉ là thiết kế kiểm thử. Khi thực thi `HW02/references/execution_scripts/test_fr15.js`, SUT cho thấy backend trả `200 OK` cho hầu hết negative cases, biến các giả thuyết validation/security thành bug xác nhận.
- **SUT-specific behavior đã quan sát được:**
  1. **Thiếu xác thực/phân quyền Product CRUD:** `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` trả `200 OK` khi thiếu token, token sai, hoặc non-admin token.
  2. **Thiếu validation dữ liệu sản phẩm:** Backend chấp nhận sai type, thiếu field bắt buộc, `name=""`, `name` dài 256 ký tự, `price=0`, `price=-1` và vẫn tạo/cập nhật product.
  3. **Thiếu kiểm tra category tồn tại:** Backend chấp nhận `category_id=999` dù không phải category được chọn từ danh sách có sẵn.
  4. **Sai trạng thái thành công với product ID không tồn tại:** Update/delete ID không tồn tại hoặc sai định dạng vẫn trả thông báo thành công.
  5. **API update isolation pass nhưng UI update isolation fail:** Test API bổ sung cho thấy khi update product A, product B vẫn giữ nguyên dữ liệu backend. Tuy nhiên khi thao tác trên Web Admin, sau khi cập nhật thành công một product, tên các product khác trên giao diện cũng bị đổi theo. Điều này cho thấy bug nằm ở tầng giao diện/state management hoặc mapping dữ liệu UI, không phải ở API update isolation đã kiểm qua `GET /api/products/:id`.
- **Tác động đến test suite:** Sau rà soát, FR-15 tăng từ 24 lên 30 test case được thiết kế/thực thi: Domain thêm 5 case (`FR15-DOM-TC15` tới `FR15-DOM-TC19`), BVA thêm 1 case (`FR15-BVA-TC11`). Các failure API missing-field được gom vào `BUG-FR15-02`; bug UI update isolation được tách riêng thành `BUG-FR15-05`.
- **Rủi ro còn lại:** Chưa kiểm thử tự động bằng browser automation cho toàn bộ Web Admin workflow, concurrency khi nhiều admin sửa/xóa cùng product, và persistence cleanup sau nhiều negative cases. Các rủi ro này nên tách thành exploratory/UI/integration tests nếu còn thời gian.

## 7. FR-06 - Mobile Product Detail View

### 7.1 Feature Overview

FR-06 Mobile Product Detail View cho phép người dùng trên mobile mở trang chi tiết của một sản phẩm đã chọn, xem đầy đủ thông tin sản phẩm và nhập số lượng để thêm sản phẩm vào giỏ hàng. Tính năng được kiểm thử theo hướng black-box trên Mobile/API, dựa trên `eshop-sut/README.md` và `eshop-sut/api_specification.md`, tập trung vào việc lấy đúng dữ liệu theo `product_id`, hiển thị đúng nội dung của selected product, kiểm tra quantity là số nguyên dương tối thiểu 1, xử lý trạng thái lỗi/not-found và đảm bảo app không crash hoặc hiển thị nhầm dữ liệu sản phẩm khác.

| Mục | Nội dung |
| :--- | :--- |
| Feature ID | FR-06 |
| Feature name | Mobile Product Detail View |
| Pool | D |
| Surface | Mobile/API |
| User role | Guest hoặc customer đã đăng nhập, tùy behavior thực tế của mobile app |
| Preconditions | Mobile app đang chạy; có đường dẫn từ product list tới product detail; có ít nhất một product tồn tại. |
| API liên quan | `GET /api/products/:id` |
| Input chính | `product_id`, `quantity`, trạng thái xác thực người dùng, mức đầy đủ của product data, trạng thái phản hồi API/network. |
| Output/state chính | Product image lớn, name, price, description, category, quantity validation, add-to-cart feedback, loading state, error/not-found state, trạng thái không crash và không hiển thị nhầm product. |
| Out of scope | Product search/listing ngoài navigation tới detail, checkout, admin product management. |
| Điểm cần verify trên SUT | Product detail có truy cập được khi chưa login không; detail có hiển thị đủ ảnh lớn/tên/giá/mô tả/danh mục không; quantity chỉ nhận số nguyên dương tối thiểu 1 không; add-to-cart có toast/badge feedback không; behavior với product id không tồn tại/sai format; loading/error state; missing image/empty description/long text nếu có dữ liệu quan sát được. |

### 7.2 Domain Testing / EP

#### Step 1: Xác định Input và Output

| Tham số / Biến | Loại (Input/Output/State) | Kiểu dữ liệu & Định dạng | Mô tả & Hành vi trên SUT | Cơ sở lý do lựa chọn (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| `product_id` | Input | Number/String trong route/API | Định danh sản phẩm được truyền khi người dùng mở màn hình chi tiết hoặc khi gọi `GET /api/products/:id`. | Đây là input chính quyết định product nào được lấy và hiển thị trên detail view. |
| `quantity` | Input | Integer | Số lượng người dùng nhập trên màn hình chi tiết trước khi bấm thêm vào giỏ hàng. | README FR-06 quy định ô nhập Số lượng chỉ nhận số nguyên dương và tối thiểu là `1`, nên đây là input cần phân tích Domain và BVA. |
| `Authentication state` | Input/State | Guest hoặc logged-in user | Trạng thái đăng nhập của người dùng khi truy cập product detail. | Context cho biết product browsing API không yêu cầu authentication trừ khi SUT behavior cho thấy ngược lại; cần kiểm tra cả guest và logged-in user. |
| `Product data completeness` | Input/State | Object/JSON | Mức đầy đủ của dữ liệu sản phẩm trả về: có đủ name, price, description, imageUrl hoặc thiếu/rỗng một số field hiển thị. | Detail view phụ thuộc vào dữ liệu API; thiếu dữ liệu có thể ảnh hưởng hiển thị hoặc gây crash. |
| `Network/API state` | Input/State | Response state | Trạng thái API khi mobile fetch detail: normal response, loading/slow response, hoặc error response nếu quan sát được. | Mobile UI cần xử lý trạng thái bất đồng bộ thay vì chỉ happy path. |
| `Product name display` | Output | Text | Tên sản phẩm được hiển thị trên màn hình detail. | Là thông tin nhận diện chính của selected product. |
| `Product price display` | Output | Text/Number formatted | Giá sản phẩm được hiển thị trên màn hình detail. | Người dùng cần xem đúng giá của sản phẩm đã chọn. |
| `Product description display` | Output | Text | Mô tả sản phẩm được hiển thị hoặc được xử lý an toàn nếu rỗng/thiếu. | Mô tả là trường nội dung chính trong detail view. |
| `Product category display` | Output | Text | Danh mục của sản phẩm được hiển thị trên màn hình detail. | README FR-06 yêu cầu detail hiển thị đầy đủ danh mục sản phẩm. |
| `Product image/fallback display` | Output | Image/Fallback UI | Ảnh sản phẩm hoặc trạng thái fallback khi imageUrl thiếu/rỗng/lỗi tải. | Ảnh là thành phần UI quan trọng; missing image không nên làm app crash. |
| `Add-to-cart feedback` | Output/State | Toast/Badge/UI feedback | Phản hồi trực quan sau khi người dùng bấm nút Thêm vào giỏ hàng. | README FR-06 yêu cầu sau khi bấm Thêm vào giỏ hàng phải có toast notification hoặc badge cập nhật. |
| `Loading/Error state` | Output | UI state | Trạng thái loading, error hoặc not-found khi API chưa trả dữ liệu hoặc trả lỗi. | Cần kiểm chứng khả năng xử lý trạng thái bất thường của mobile app. |
| `Detail state consistency` | Output/State | UI state | Detail view không hiển thị nhầm product khác hoặc giữ stale data khi chuyển từ product A sang product B. | Đây là rủi ro thường gặp trong UI state/navigation của màn hình detail. |

#### Step 2: Xác định Condition (Điều kiện)

| Mã điều kiện (ID) | Tham số tương ứng | Mô tả điều kiện | Cơ sở lý thuyết / Luật nghiệp vụ (Rationale) |
| :--- | :--- | :--- | :--- |
| C1 | `product_id` | Product id tồn tại trong hệ thống | Happy path của product detail: selected product có dữ liệu để fetch và hiển thị. |
| C2 | `product_id` | Product id không tồn tại | Kiểm tra not-found/error state khi người dùng hoặc deep link trỏ tới sản phẩm không có thật. |
| C3 | `product_id` | Product id sai định dạng nếu có thể trigger qua API/deep link | Kiểm tra khả năng xử lý input route/API không hợp lệ mà không crash app. |
| C4 | `quantity` | Quantity là số nguyên dương và `>= 1` | README FR-06 quy định ô nhập Số lượng chỉ nhận số nguyên dương, tối thiểu là `1`. |
| C5 | `quantity` | Quantity bằng `0` hoặc số âm | Kiểm tra hệ thống từ chối giá trị dưới ngưỡng tối thiểu. |
| C6 | `quantity` | Quantity không phải số nguyên | Kiểm tra hệ thống từ chối số thập phân, chữ hoặc dữ liệu không phải số nguyên. |
| C7 | `Authentication state` | Guest mở product detail | Context cho biết browsing/product detail không yêu cầu authentication trừ khi SUT behavior chứng minh ngược lại. |
| C8 | `Authentication state` | Logged-in user mở product detail | Đảm bảo trạng thái đăng nhập không làm thay đổi sai dữ liệu detail cơ bản. |
| C9 | `Product data completeness` | Product data có đủ ảnh lớn, name, price, description, category | README FR-06 yêu cầu hiển thị đầy đủ Ảnh lớn, Tên, Giá, Mô tả, Danh mục. |
| C10 | `Product data completeness` | Product thiếu/rỗng imageUrl nếu có dữ liệu quan sát được | Kiểm tra UI xử lý thiếu ảnh an toàn; requirement yêu cầu hiển thị ảnh lớn nhưng chưa nêu fallback cụ thể nên cần verify thực tế. |
| C11 | `Product data completeness` | Product có description rỗng nếu có dữ liệu quan sát được | Kiểm tra UI xử lý mô tả rỗng ổn định, không hiển thị nhầm dữ liệu cũ. |
| C12 | `Add-to-cart feedback` | Bấm Thêm vào giỏ với quantity hợp lệ | README FR-06 yêu cầu sau khi bấm Thêm vào giỏ hàng phải có phản hồi trực quan như toast notification hoặc badge cập nhật. |
| C13 | `Network/API state` | API đang loading/slow nếu quan sát được | Màn hình mobile cần có trạng thái chờ khi fetch dữ liệu bất đồng bộ. |
| C14 | `Network/API state` | API trả lỗi hoặc không lấy được detail nếu quan sát được | Mobile app cần hiển thị error state phù hợp và không crash. |
| C15 | `Detail state consistency` | Chuyển từ product A sang product B | Đảm bảo detail view thay dữ liệu đúng theo selected product mới, không giữ stale data. |

#### Step 3: Xác định miền phân hoạch tương đương (EP)

| Mã phân hoạch (ID) | Mã điều kiện đối chiếu | Loại phân hoạch (Hợp lệ / Không hợp lệ) | Mô tả phân hoạch & Giá trị đại diện | Lý do lựa chọn & Biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- |
| E1 | C1, C7 | Hợp lệ (Valid) | Guest mở detail của product tồn tại, ví dụ `product_id=1` | Phân vùng truy cập detail cơ bản không đăng nhập. |
| E2 | C1, C8 | Hợp lệ (Valid) | Logged-in user mở detail của product tồn tại, ví dụ `product_id=1` | Kiểm tra cùng happy path trong trạng thái người dùng đã đăng nhập. |
| E3 | C2 | Không hợp lệ (Invalid/Exceptional) | Mở detail với product id không tồn tại, ví dụ `product_id=999999` | Kiểm tra not-found/error state, không hiển thị nhầm product khác. |
| E4 | C3 | Không hợp lệ (Invalid/Exceptional) | Gọi API/deep link với id sai định dạng, ví dụ `product_id=abc` | Kiểm tra khả năng xử lý route/API input sai định dạng nếu trigger được. |
| E5 | C4 | Hợp lệ (Valid) | Quantity là số nguyên dương, ví dụ `3` hoặc `5` | Phân vùng quantity hợp lệ theo README FR-06. |
| E6 | C5 | Không hợp lệ (Invalid) | Quantity bằng `0` hoặc số âm, ví dụ `0`, `-1` | Kiểm tra từ chối giá trị dưới minimum `1`. |
| E7 | C6 | Không hợp lệ (Invalid) | Quantity không phải số nguyên (`1.5`, `abc`) hoặc để trống | Kiểm tra từ chối dữ liệu không đúng kiểu số nguyên dương hoặc empty. |
| E8 | C9 | Hợp lệ (Valid) | Product trả về đủ `name`, `price`, `description`, `imageUrl`, `category` | Phân vùng dữ liệu bình thường để kiểm tra hiển thị đầy đủ theo README FR-06. |
| E9 | C10 | Hợp lệ/State cần verify | Product thiếu hoặc rỗng `imageUrl` nếu có dữ liệu quan sát được | Requirement yêu cầu ảnh lớn nhưng chưa nêu rule fallback; test tập trung vào việc app không crash và xử lý ảnh an toàn. |
| E10 | C11 | Hợp lệ/State cần verify | Product có `description` rỗng nếu có dữ liệu quan sát được | Mô tả rỗng không nên làm UI hiển thị dữ liệu cũ hoặc crash. |
| E11 | C12 | Hợp lệ/State | Bấm Thêm vào giỏ với quantity hợp lệ | Kiểm tra phản hồi trực quan sau thao tác add-to-cart theo README FR-06. |
| E12 | C13 | Hợp lệ/State cần verify | API phản hồi chậm/loading khi mở detail | Kiểm tra trạng thái chờ trong luồng fetch dữ liệu mobile. |
| E13 | C14 | Không hợp lệ (Invalid/Exceptional) | API trả lỗi hoặc không lấy được dữ liệu detail | Kiểm tra error state và độ ổn định của app. |
| E14 | C15 | Hợp lệ/State | Mở product A rồi chuyển sang product B | Kiểm tra consistency của detail state khi thay đổi selected product. |

#### Step 4: Xác định Test Case

| Mã test case | Auth state | Product id / Navigation | Product data/API state | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ các lớp EP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR06-DOM-TC01 | Guest | Mở detail từ list với `product_id=1` tồn tại | Product có đủ dữ liệu; `quantity=1` | Detail hiển thị đúng ảnh lớn, name, price, description và category của selected product. | Mobile hiển thị ảnh lớn, name, price, description nhưng không hiển thị category. | Failed | [BUG-FR06-01](#bug-fr06-01-mobile-product-detail-khong-hien-thi-danh-muc-san-pham) | E1, E5, E8 |
| FR06-DOM-TC02 | Logged-in user | Mở detail từ list với `product_id=1` tồn tại | Product có đủ dữ liệu; `quantity=1` | Detail vẫn truy cập được và hiển thị đúng thông tin selected product. | Sau khi đăng nhập bằng user test, mobile vẫn mở được màn hình detail từ list; ảnh lớn, tên, giá và description của product được hiển thị, nhưng category vẫn không xuất hiện giống TC01. | Passed | Quan sát cùng luồng detail; category issue đã được ghi ở BUG-FR06-01 | E2, E5, E8 |
| FR06-DOM-TC05 | Guest | Mở detail từ list với `product_id=1` tồn tại | Nhập `quantity=-1` | Hệ thống từ chối số lượng âm, không thêm sản phẩm vào giỏ và hiển thị lỗi/phản hồi phù hợp. | Mobile vẫn thêm sản phẩm vào giỏ; badge giỏ tăng lên `Giỏ (1)` và quantity bị normalize về `1` (cùng lỗi với nhập 0). | Failed | [BUG-FR06-02](#bug-fr06-02-mobile-detail-chap-nhan-quantity0-va-van-them-san-pham-vao-gio) | E6 |
| FR06-DOM-TC06 | Guest | Mở detail từ list với `product_id=1` tồn tại | Nhập `quantity=abc`, `1.5` hoặc để trống | Hệ thống từ chối quantity không hợp lệ (không phải số nguyên dương hoặc rỗng), không thêm sản phẩm vào giỏ và hiển thị lỗi. | Mobile vẫn cho nhập `abc`; sau khi bấm thêm, sản phẩm được thêm vào giỏ thay vì bị chặn. (Trường hợp để trống cũng không bị chặn đúng cách). | Failed | [BUG-FR06-03](#bug-fr06-03-mobile-detail-chap-nhan-quantity-khong-phai-so-nguyen-va-van-them-san-pham-vao-gio) | E7 |
| FR06-DOM-TC07 | Guest | Mở detail từ list với `product_id=1` tồn tại | `quantity=3`, bấm Thêm vào giỏ | Sản phẩm được thêm vào giỏ và app hiển thị phản hồi trực quan như toast notification hoặc badge cập nhật. | Với `quantity=3`, sau khi bấm Thêm vào giỏ hàng, nút đổi sang `Đã thêm` và badge header đổi từ `Giỏ (0)` sang `Giỏ (3)`. | Passed | Observed; no bug evidence | E5, E11 |
| FR06-DOM-TC11 | Guest | Mở product A rồi chuyển sang product B | Normal response | Detail của product B thay thế đúng dữ liệu product A, không giữ stale data. | Khi quay lại list và mở product khác, detail được render lại theo selected product mới; không quan sát thấy dữ liệu product trước bị giữ trên màn hình. | Passed | Quan sát luồng switch product trên mobile web | E1, E8, E14 |
| FR06-DOM-TC13 | Guest | Mở detail từ list với `product_id=1` tồn tại | Quan sát navigation/breadcrumb trên màn hình detail | Trang con Chi tiết sản phẩm có breadcrumb hoặc navigation context phù hợp theo GUI requirement. | Mobile detail không hiển thị breadcrumb hoặc navigation context trang con. | Failed | [BUG-FR06-04](#bug-fr06-04-mobile-product-detail-thieu-breadcrumb-trang-con) | E1, E8 |

Checklist:

- Các valid EP chính được cover qua TC01, TC02, TC07 và TC11.
- Các invalid EP được tách riêng theo single fault cho phần có thể execute trực tiếp từ mobile UI, cụ thể là quantity không hợp lệ.
- Các case cần deep link, proxy/network throttling, dữ liệu seed đặc biệt hoặc suy luận từ source code được loại khỏi bảng execution để giữ phạm vi black-box rõ ràng.

### 7.3 Boundary Value Analysis

#### Step 1: Xác định input/output có dạng số/liên tục

| Tham số | Có áp dụng BVA không? | Lý do |
| :--- | :--- | :--- |
| `product_id` | Không áp dụng formal BVA | FR-06 chỉ có trạng thái product id tồn tại/không tồn tại/sai format trong context; không có numeric min/max công khai cho id. |
| `quantity` | Có | README FR-06 quy định ô nhập Số lượng chỉ nhận số nguyên dương, tối thiểu là `1`, nên có lower boundary tại `1`. |
| `name` length | Không áp dụng formal BVA | Requirement/API spec/context chưa nêu min/max length cho tên sản phẩm trên mobile detail. |
| `description` length | Không áp dụng formal BVA | Chưa có boundary độ dài mô tả có căn cứ black-box; description rỗng/dài chỉ nên là domain/state hoặc exploratory nếu có dữ liệu quan sát được. |
| `imageUrl` | Không áp dụng formal BVA | Chưa có rule độ dài/format/fallback explicit cho imageUrl trong phạm vi FR-06. |
| `price` | Không áp dụng formal BVA cho FR-06 | Product detail view chỉ hiển thị giá; context không nêu min/max hoặc format boundary cho price ở mobile detail. |

#### Step 2: Xác định biên và cận biên

| Mã biên | Tham số | Cận dưới ngoài biên | Biên dưới | Cận dưới trong biên | Giá trị bình thường | Cận trên trong biên | Biên trên | Cận trên ngoài biên | Giải thích nguồn gốc biên (Rationale) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR06-BVA-B01 | `quantity` | `0` | `1` | `2` | `1` hoặc `2` | N/A | N/A | N/A | README FR-06 quy định quantity phải là số nguyên dương, tối thiểu `1`; không có upper bound công khai. |

#### Step 3: Xác định BVA Test Case

| Mã test case | [Input 1] | [Input 2] | [Input n] | Giá trị biên được test | Kết quả mong đợi | Kết quả thực tế | Trạng thái | Bug ID / Evidence | Phủ mã biên |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| FR06-BVA-TC01 | Guest | `product_id=1` tồn tại | `quantity=0` | Cận dưới ngoài biên | Hệ thống từ chối quantity dưới tối thiểu, không thêm sản phẩm vào giỏ và hiển thị lỗi/phản hồi phù hợp. | Mobile vẫn thêm sản phẩm vào giỏ; badge giỏ tăng lên `Giỏ (1)` và quantity bị normalize về `1`. | Failed | [BUG-FR06-02](#bug-fr06-02-mobile-detail-chap-nhan-quantity0-va-van-them-san-pham-vao-gio) | FR06-BVA-B01 |
| FR06-BVA-TC02 | Guest | `product_id=1` tồn tại | `quantity=1` | Biên dưới | Hệ thống chấp nhận quantity tối thiểu và cho phép thêm sản phẩm vào giỏ với phản hồi trực quan. | Mobile chấp nhận `quantity=1`; sau khi bấm thêm, nút đổi sang `Đã thêm` và badge giỏ cập nhật từ `Giỏ (0)` lên `Giỏ (1)`. | Passed | Observed; no bug evidence | FR06-BVA-B01 |
| FR06-BVA-TC03 | Guest | `product_id=1` tồn tại | `quantity=2` | Cận dưới trong biên | Hệ thống chấp nhận quantity hợp lệ lớn hơn tối thiểu và cho phép thêm sản phẩm vào giỏ với phản hồi trực quan. | Mobile cho nhập `quantity=2` và cho bấm thêm vào giỏ; phản hồi trực quan vẫn là nút `Đã thêm` và badge giỏ tăng theo số dòng item (`Giỏ (1)`). | Passed | Quan sát cùng luồng add-to-cart trên detail | FR06-BVA-B01 |

### 7.4 AI Gap Analysis

Phân tích khoảng cách cho FR-06 tập trung vào ranh giới giữa thiết kế kiểm thử hợp lệ và các giả định chưa có căn cứ về mobile UI.

- **Khoảng cách do context ban đầu còn ít:** Context FR-06 trong `references/development_process/Feature_Contexts.md` chỉ có endpoint `GET /api/products/:id`, scope product detail và các điểm cần verify. Sau khi đối chiếu `eshop-sut/README.md`, report bổ sung các requirement có căn cứ: hiển thị ảnh lớn, tên, giá, mô tả, danh mục; quantity là số nguyên dương tối thiểu `1`; và add-to-cart phải có phản hồi trực quan.
- **Khoảng cách do Mobile/API khó trigger hơn Web/API:** Một số ý tưởng như id sai format, API chậm/loading, API error, missing image hoặc empty description cần deep link, proxy/network throttling, dữ liệu seed đặc biệt hoặc suy luận từ source code. Sau human review, các case này được loại khỏi bảng execution để tránh trộn black-box test với white-box/environment test.
- **Khoảng cách do test oracle:** Với missing image hoặc empty description, expected result hợp lý là app không crash và không hiển thị nhầm dữ liệu; còn fallback UI cụ thể chỉ được kết luận sau khi quan sát mobile app.
- **Lý do BVA chỉ tập trung vào quantity:** README FR-06 có lower boundary rõ ràng cho `quantity` tại `1`, nên BVA chính thức được tạo cho `quantity=0/1/2`. Các biến khác như `product_id`, `name`, `description`, `imageUrl` và `price` chưa có min/max hoặc boundary công khai trong phạm vi FR-06, nên vẫn không được biến thành BVA chính thức.
- **Rủi ro còn lại:** Evidence screenshot hiện tập trung vào lỗi UI chính và add-to-cart; các kịch bản cần dữ liệu seed đặc biệt, deep link, offline/network interruption hoặc proxy error được xem là exploratory/out of execution scope cho FR-06.

## 8. Test Summary

| Feature | Designed | Executed | Passed | Failed | Blocked | Not Executed | Confirmed bug count |
| :------ | -------: | -------: | -----: | -----: | ------: | -----------: | ------------------: |
| FR-04   |       18 |       18 |      6 |     12 |       0 |            0 |                   5 |
| FR-08   |       32 |       32 |      2 |     30 |       0 |            0 |                   6 |
| FR-15   |       30 |       30 |     10 |     20 |       0 |            0 |                   5 |
| FR-06   |       10 |       10 |      5 |      5 |       0 |            0 |                   4 |
| Total   |       90 |       90 |     23 |     67 |       0 |            0 |                  20 |

## 9. Agent Skills and Demo Video

Agent Skills được đặt trong thư mục [.agents/skills](./.agents/skills) theo cấu trúc native skill:

| Skill | Đường dẫn | Vai trò trong bài |
| :--- | :--- | :--- |
| `domain_testing` | [.agents/skills/domain_testing/SKILL.md](./.agents/skills/domain_testing/SKILL.md) | Hướng dẫn AI thực hiện Domain Testing / EP theo từng bước có checkpoint human review. |
| `bva_testing` | [.agents/skills/bva_testing/SKILL.md](./.agents/skills/bva_testing/SKILL.md) | Hướng dẫn AI xác định biến áp dụng BVA, biên/cận biên và BVA test cases. |
| `audit_extraction` | [.agents/skills/audit_extraction/SKILL.md](./.agents/skills/audit_extraction/SKILL.md) | Hướng dẫn AI trích xuất nhật ký tương tác AI cho AI Audit Report. |

Tài liệu hướng dẫn và kịch bản demo:

- Tổng quan Agent Skills: [.agents/README.md](./.agents/README.md)
- Kịch bản quay demo Agent Skills và test execution trực tiếp: [Agent_Skills_Demo_Guide.md](./Agent_Skills_Demo_Guide.md)
- Workflow theo từng feature: [HW02_FR_Workflow.md](./references/development_process/HW02_FR_Workflow.md)
- Script thực thi/evidence kỹ thuật: [references/execution_scripts](./references/execution_scripts)

Video demo unlisted: Link sẽ được bổ sung sau khi quay và upload video demo.

## 10. References

- [2026.HW02.Domain Testing_En.pdf](./references/2026.HW02.Domain%20Testing_En.pdf)
- [\_\_\_2026.Homework.Policies.pdf](./references/___2026.Homework.Policies.pdf)
- [04_Domain Testing.pdf](./references/04_Domain%20Testing.pdf)
- [23127205.pdf](./references/23127205.pdf)
- [ISTQB_CT-AI_Syllabus_v1.0.pdf](./references/ISTQB_CT-AI_Syllabus_v1.0.pdf)
- Execution scripts: [references/execution_scripts](./references/execution_scripts)

## 11. Appendices

- Báo cáo AI Audit: [AI_Audit_Report.md](./AI_Audit_Report.md)
- Báo cáo AI Critique: [AI_Critique.md](./AI_Critique.md)
- Danh sách báo cáo lỗi: [Bug_Report.md](./Bug_Report.md)
- Git commit log: [git_commit_log.txt](./git_commit_log.txt)
