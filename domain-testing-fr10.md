
### Equivalence Partitioning
#### Điều kiện:
- C1: Chuyển đổi trạng thái từ pending => confirmed khi Admin xác nhận.
- C2: Chuyển đổi trạng thái từ confirmed => shipping khi Admin giao hàng.
- C3: Chuyển đổi trạng thái từ shipping => delivered khi Admin hoàn tất.
- C4: Chuyển đổi trạng thái từ pending => canceled khi User/Admin hủy.
- C5: Chuyển đổi trạng thái từ confirmed => canceled khi User/Admin hủy.
- C6: Chuyển đổi trạng thái từ shipping => canceled khi Admin hủy.
- C7: Đơn hàng ở trạng thái delivered là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.
- C8: Đơn hàng ở trạng thái canceled là trạng thái kết thúc, không được phép chuyển sang bất kỳ trạng thái nào khác.

#### Equivalence Classes
- E1: Trạng thái hiện tại là pending, người thực hiện là Admin yêu cầu chuyển sang confirmed - Valid
- E2: Trạng thái hiện tại là pending, người thực hiện là User yêu cầu chuyển sang confirmed - Invalid
- E3: Trạng thái hiện tại là confirmed, người thực hiện là Admin yêu cầu chuyển sang shipping - Valid
- E4: Trạng thái hiện tại là confirmed, người thực hiện là User yêu cầu chuyển sang shipping - Invalid
- E5: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang delivered - Valid
- E6: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang delivered - Invalid
- E7: Trạng thái hiện tại là pending, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E8: Trạng thái hiện tại là confirmed, người thực hiện là Admin hoặc User yêu cầu chuyển sang canceled - Valid
- E9: Trạng thái hiện tại là shipping, người thực hiện là Admin yêu cầu chuyển sang canceled - Valid
- E10: Trạng thái hiện tại là shipping, người thực hiện là User yêu cầu chuyển sang canceled - Invalid
- E11: Trạng thái hiện tại là delivered, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid
- E12: Trạng thái hiện tại là canceled, có yêu cầu chuyển sang trạng thái bất kỳ khác - Invalid


#### Test data
| Test Case ID | Role (Vai trò) | Thao tác | Current State (Trạng thái hiện tại) | Target State (Yêu cầu chuyển) | Output | Covered Classes |
| --- | --- | --- | --- | --- | --- | --- |
| TC1 | `Admin` | Xác nhận | `pending` | `confirmed` | Đơn hàng chuyển sang `confirmed` thành công | E1 |
| TC2 | `User` | Xác nhận | `pending` | `confirmed` | Báo lỗi không có quyền thay đổi trạng thái | E2 |
| TC3 | `Admin` | Giao hàng | `confirmed` | `shipping` | Đơn hàng chuyển sang `shipping` thành công | E3 |
| TC4 | `User` | Giao hàng | `confirmed` | `shipping` | Báo lỗi không có quyền thay đổi trạng thái | E4 |
| TC5 | `Admin` | Hoàn tất | `shipping` | `delivered` | Đơn hàng chuyển sang `delivered` thành công | E5 |
| TC6 | `User` | Hoàn tất | `shipping` | `delivered` | Báo lỗi không có quyền thay đổi trạng thái | E6 |
| TC7 | `User` | Hủy | `pending` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E7 |
| TC8 | `Admin` | Hủy | `confirmed` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E8 |
| TC9 | `Admin` | Hủy | `shipping` | `canceled` | Đơn hàng chuyển sang `canceled` thành công | E9 |
| TC10 | `User` | Hủy | `shipping` | `canceled` | Báo lỗi User không được phép hủy khi đang giao hàng | E10 |
| TC11 | `User` | Hủy | `delivered` | `canceled` | Báo lỗi không thể thay đổi từ trạng thái kết thúc | E11 |

**Ghi chú**: Tính năng này không tồn tại biến dạng số liên tục nên không tồn tại test case trong phần boundary value analysis.