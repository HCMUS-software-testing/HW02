# Feature Contexts cho HW02

File này dùng để copy context vào prompt trước khi chạy `domain_testing` và `bva_testing` cho từng feature.

## Nguyên tắc sử dụng

- Chỉ xem mục `Ràng buộc/rule đã có căn cứ` là rule có cơ sở từ requirement, API spec công khai, UI quan sát được, hoặc behavior quan sát được khi chạy SUT.
- Các thông tin chưa chắc chắn phải được kiểm chứng trước khi đưa vào bảng phân tích chính.
- Không biến giả định về độ dài, format, min/max thành expected result chính thức nếu chưa verify.
- Các mục `Candidate input variables` và `Candidate output/state variables` chỉ là gợi ý khởi đầu cho agent. Chúng không phải equivalence classes cuối cùng và không được copy nguyên vào report nếu chưa review.
- Khi UI/API thực tế khác context này, cập nhật lại context hoặc ghi rõ trong `Main_Report.md`.

## Nguồn thiết kế context

Các context bên dưới không được viết từ tưởng tượng. Chúng được tổng hợp từ:

- `eshop-sut/api_specification.md`: endpoint, request body mẫu, auth note cho Users, Cart/Orders, Products, Categories. Chỉ dùng như tài liệu đặc tả công khai, không dùng implementation.
- `eshop-sut/README.md`: rule Web Admin access control nếu README được xem như tài liệu yêu cầu/công khai của SUT.
- UI web/admin/mobile khi chạy SUT: label, field, validation message, navigation flow, success/error state quan sát được.
- Behavior quan sát được khi thao tác trên SUT hoặc gọi API theo đặc tả công khai.

Các thông tin sau cần kiểm chứng trước khi dùng trong bảng chính:

- Min/max length cho `name`, `shipping_address`, `phone`, `description`, `imageUrl`.
- Format bắt buộc của phone number hoặc image URL.
- Min/max của `total_amount`, `price`, `quantity`.
- Behavior của empty cart checkout, non-existing product id, invalid category id, slow network, missing image.

Với các điểm này, AI không được đưa vào expected result chính thức nếu chưa có căn cứ. Kết luận Pass/Fail hoặc bug chỉ được ghi sau khi verify trên SUT.

---

## FR-04: Personal Profile Management

```text
Feature ID: FR-04
Tên feature: Personal profile management
Pool: A
Surface: Web/API
User role: Customer đã đăng nhập

Preconditions:
- User có tài khoản hợp lệ.
- User đã đăng nhập và có authentication token hợp lệ.
- Trang/API profile có thể truy cập được.

API endpoint/body liên quan:
- GET /api/users/me
- PUT /api/users/me
{
  "name": "Nguyen Van A",
  "shipping_address": "123 Le Loi, Q1, TP.HCM",
  "phone": "0912345678"
}

Ràng buộc/rule đã có căn cứ:
- API profile yêu cầu authentication.
- Customer có thể xem thông tin profile của chính mình.
- Customer có thể cập nhật các field cơ bản: name, shipping_address, phone.

Out of scope:
- Registration/login flow.
- Password change/reset.
- Admin user management.
- Dữ liệu profile của user khác.

Thông tin cần kiểm chứng:
- Requirement/API spec chưa nêu min/max length cụ thể cho name, shipping_address, phone.
- Requirement/API spec chưa nêu format phone bắt buộc.
- Cần kiểm chứng hành vi khi field rỗng trên SUT trước khi xem là rule.
- Cần kiểm chứng persistence sau update bằng reload profile hoặc GET /api/users/me.

Candidate input variables:
- Authentication state: token hợp lệ, thiếu token, token sai/hết hạn.
- Giá trị name.
- Giá trị shipping_address.
- Giá trị phone.
- Mức đầy đủ của request body: đủ field được hỗ trợ, thiếu một field, có field ngoài scope.

Candidate output/state variables:
- Profile data được hiển thị.
- Update được chấp nhận và persisted.
- Validation error được hiển thị/trả về.
- Unauthorized error được hiển thị/trả về.
- Dữ liệu profile cũ không đổi sau invalid update.

Giá trị nominal:
- name: Nguyen Van A
- shipping_address: 123 Le Loi, Q1, TP.HCM
- phone: 0912345678
```

---

## FR-08: Checkout

```text
Feature ID: FR-08
Tên feature: Checkout
Pool: B
Surface: Web/API
User role: Customer đã đăng nhập

Preconditions:
- User có tài khoản hợp lệ.
- User đã đăng nhập và có authentication token hợp lệ.
- Cart feature hoạt động.
- Có thể add ít nhất một product vào cart cho normal checkout path.

API endpoint/body liên quan:
- GET /api/cart
- POST /api/cart
{
  "id": 1,
  "name": "Sample Product",
  "price": 100000,
  "quantity": 2
}
- POST /api/checkout
{
  "total_amount": 200000,
  "shipping_address": "123 Le Loi, TP.HCM"
}

Ràng buộc/rule đã có căn cứ:
- Cart và checkout APIs yêu cầu authentication.
- Checkout request gồm total_amount và shipping_address.
- Checkout thành công nên tạo order hoặc trạng thái xác nhận checkout tương đương.

Out of scope:
- Discount/coupon validation, trừ khi checkout UI bắt buộc dùng trong FR-08.
- Order cancellation.
- Order history/detail, trừ phần xác nhận order được tạo nếu cần.
- Payment gateway nếu SUT không triển khai real payment flow.

Thông tin cần kiểm chứng:
- Requirement/API spec chưa nêu min/max cụ thể cho total_amount.
- Requirement/API spec chưa nêu min/max length cụ thể cho shipping_address.
- Cần kiểm chứng checkout với empty cart có bị chặn không.
- Cần kiểm chứng server tự tính lại total_amount hay tin giá trị client gửi lên.
- Cần kiểm chứng quantity/stock constraints nếu UI/API có thể hiện.

Candidate input variables:
- Authentication state: token hợp lệ, thiếu token, token sai/hết hạn.
- Cart state: cart có item, cart rỗng.
- total_amount: khớp cart total, bằng 0, âm, không phải số, không khớp cart.
- shipping_address: có nội dung, rỗng, chỉ whitespace, dài, có ký tự đặc biệt.
- Mức đầy đủ của request body: thiếu total_amount, thiếu shipping_address, có field ngoài scope.

Candidate output/state variables:
- Checkout/order được tạo thành công.
- Validation error được hiển thị/trả về.
- Unauthorized error được hiển thị/trả về.
- Cart/order state sau checkout đúng.
- Không tạo order với invalid checkout data.

Giá trị nominal:
- Product id: 1
- Product name: Sample Product
- price: 100000
- quantity: 2
- total_amount: 200000
- shipping_address: 123 Le Loi, TP.HCM
```

---

## FR-15: Product Management CRUD

```text
Feature ID: FR-15
Tên feature: Product management CRUD
Pool: C
Surface: Admin Web/API
User role: Admin

Preconditions:
- Admin account tồn tại.
- Admin đã đăng nhập và có authentication token hợp lệ.
- Có ít nhất một product category cho create/update test paths.
- Với update/delete test paths, có ít nhất một test product tồn tại.

API endpoint/body liên quan:
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
{
  "name": "Test Product HW02",
  "price": 100000,
  "description": "Test product description",
  "imageUrl": "https://example.com/product.png",
  "category_id": 1
}

API liên quan:
- GET /api/categories

Ràng buộc/rule đã có căn cứ:
- Product management bao gồm create, update, delete product.
- Product body gồm name, price, description, imageUrl, category_id.
- README yêu cầu API ảnh hưởng dữ liệu như product CRUD cần admin access; cần verify lại bằng UI/API behavior thực tế khi execute.

Out of scope:
- Category management.
- Product CSV/import feature.
- Coupon management.
- Order/user admin management.
- Customer product browsing, trừ khi dùng để verify CRUD change đã phản ánh.

Thông tin cần kiểm chứng:
- Requirement/API spec chưa nêu min/max length cụ thể cho name.
- Requirement/API spec chưa nêu min/max cụ thể cho price.
- Requirement/API spec chưa nêu format image URL bắt buộc.
- Cần kiểm chứng category_id có bắt buộc tham chiếu category tồn tại không.
- Cần kiểm chứng behavior với non-admin user và unauthenticated user.
- Cần kiểm chứng delete behavior với product ID không tồn tại.

Candidate input variables:
- Authentication/authorization state: admin, non-admin, thiếu token, token sai/hết hạn.
- CRUD operation: create, update, delete.
- Product id cho update/delete: id tồn tại, id không tồn tại, id sai format.
- Giá trị name.
- Giá trị price.
- Giá trị description.
- Giá trị imageUrl.
- Giá trị category_id: category tồn tại, category không tồn tại, sai type.
- Mức đầy đủ của request body: đủ field, thiếu field có vẻ required, có field ngoài scope.

Candidate output/state variables:
- Product được tạo.
- Product được cập nhật.
- Product bị xóa hoặc không còn truy cập được sau delete.
- Validation error được hiển thị/trả về.
- Unauthorized/forbidden error được hiển thị/trả về.
- Not found error được hiển thị/trả về.
- Product list/detail phản ánh thay đổi thành công.

Giá trị nominal:
- name: Test Product HW02
- price: 100000
- description: Test product description
- imageUrl: https://example.com/product.png
- category_id: 1
```

---

## FR-06: Mobile Product Detail View

```text
Feature ID: FR-06
Tên feature: Mobile product detail view
Pool: D
Surface: Mobile/API
User role: Guest hoặc customer đã đăng nhập, tùy behavior thực tế của mobile app

Preconditions:
- Mobile app đang chạy.
- Có product list hoặc navigation path tới product detail.
- Có ít nhất một product tồn tại.

API endpoint/body liên quan:
- GET /api/products/:id

Ràng buộc/rule đã có căn cứ:
- Product detail view hiển thị thông tin của selected product.
- Product detail data được lấy theo product id.
- Product browsing API không yêu cầu authentication, trừ khi SUT behavior cho thấy ngược lại.

Out of scope:
- Product search/listing, trừ phần navigation tới detail screen.
- Add to cart, trừ khi không thể tách khỏi product detail test path.
- Checkout.
- Admin product management.

Thông tin cần kiểm chứng:
- Requirement/API spec chưa nêu display rule cụ thể cho missing image, empty description, hoặc long text.
- Cần kiểm chứng behavior với product id không tồn tại.
- Cần kiểm chứng behavior với invalid product id format nếu trigger được.
- Cần kiểm chứng loading/error/offline states nếu quan sát được trên mobile app.
- Cần kiểm chứng product detail có truy cập được khi chưa login không.

Candidate input variables:
- Product id: id tồn tại, id không tồn tại, id sai format.
- Mức đầy đủ của product data: đủ data, thiếu/rỗng imageUrl, description rỗng/dài, name dài.
- Price display: price dương bình thường, price bằng 0/invalid chỉ test nếu tạo được data qua admin/API.
- Authentication state: guest, logged-in user, missing token nếu product detail bất ngờ yêu cầu auth.
- Network/API state nếu môi trường test quan sát được: normal response, loading/slow, error response.

Candidate output/state variables:
- Product name hiển thị đúng.
- Product price hiển thị đúng.
- Product description hiển thị đúng.
- Product image hoặc fallback hiển thị đúng.
- Loading state hiển thị khi đang fetch data.
- Error/not-found state hiển thị với product invalid/missing.
- App không crash và không hiển thị nhầm product khác.

Giá trị nominal:
- product_id: 1
- Expected display fields: name, price, description, image/imageUrl nếu có
```
