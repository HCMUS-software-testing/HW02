
### Equivalence Partitioning
#### Điều kiện:
- C1:  Người thực hiện các thao tác (thêm, xóa, xem chi tiết) có vai trò là Admin.
- C2: Tên danh mục không được để trống.

#### Equivalence Classes
- Thêm danh mục: 
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Tên danh mục bị để trống - Invalid
    - E4: Tên danh mục đã tồn tại trong hệ thống - Invalid
    - E5: Tên danh mục chưa tồn tại trong hệ thống - Valid
- Xóa danh mục: 
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Danh mục cần xóa đã tồn tại trong hệ thống - Valid
    - E4: Danh mục cần xóa chưa tồn tại trong hệ thống - Invalid
- Xem chi tiết danh mục:
    - E1: Người thực hiện có vai trò là Admin - Valid
    - E2: Người thực hiện không có vai trò là Admin - Invalid
    - E3: Danh mục cần xem đã tồn tại trong hệ thống - Valid
    - E4: Danh mục cần xem chưa tồn tại trong hệ thống - Invalid

#### Test data
- Thêm danh mục

| Test Case ID | Vai trò (Role) | Tên danh mục (Category Name) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(chưa tồn tại)* | Thêm danh mục thành công và hiển thị trên danh sách. | E1, E5 |
| TC2 | `User` | *(chưa tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(Để trống)* | Báo lỗi tên danh mục là bắt buộc, không được để trống. | E3 |
| TC4 | `Admin` | *(đã tồn tại)* | Báo lỗi tên danh mục đã tồn tại trong hệ thống. | E4 |

- Xóa danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(đã tồn tại)* | Xóa danh mục thành công và loại bỏ khỏi hệ thống. | E1, E3 |
| TC2 | `User` | *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục cần xóa. | E4 |

- Xem chi tiết danh mục

| Test Case ID | Vai trò (Role) | Danh mục mục tiêu (Target Category) | Output | Covered Classes |
| --- | --- | --- | --- | --- |
| TC1 | `Admin` | *(đã tồn tại)* | Hiển thị thông tin chi tiết của danh mục tương ứng. | E1, E3 |
| TC2 | `User` | *(đã tồn tại)* | Báo lỗi hoặc từ chối quyền truy cập do không phải là Admin. | E2 |
| TC3 | `Admin` | *(chưa tồn tại)* | Báo lỗi không tìm thấy danh mục yêu cầu. | E4 |

**Ghi chú**: Tính năng này không tồn tại biến dạng số liên tục nên không tồn tại test case trong phần boundary value analysis.