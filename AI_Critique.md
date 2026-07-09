# AI Critique

Trong quá trình kiểm thử FR-08 Checkout, AI hỗ trợ tốt ở bước phân tách miền dữ liệu: authentication state, cart state, `total_amount`, `shipping_address`, request completeness và post-checkout state. Tuy nhiên, AI ban đầu còn quá thận trọng ở một số expected result, ghi “cần quan sát SUT” thay vì bám chặt oracle nghiệp vụ trong requirement: backend phải tự tính lại tổng tiền, không cho người dùng sửa tổng tiền trực tiếp, và sau checkout thành công cart phải được xóa.

Khoảng cách lớn nhất là AI dễ bị kéo theo API specification, nơi `POST /api/checkout` có body mẫu chứa `total_amount`. Nếu không có human review đối chiếu lại requirement FR-08, AI có thể xem `total_amount` như input hợp lệ thay vì xem đây là dữ liệu backend phải kiểm soát lại. AI cũng dễ bỏ sót lỗi tích hợp quan sát được giữa Web UI và API: màn hình Checkout cho chỉnh sửa tổng tiền, còn API vẫn tạo order khi dữ liệu checkout thiếu hoặc không hợp lệ.

Human review đã chỉnh lại BVA: FR-08 không có min/max explicit cho tổng tiền hoặc độ dài địa chỉ, nên không nên tự bịa boundary chính thức. Các giá trị `0`, `-1`, thiếu field và sai kiểu được giữ là Domain/negative test. Bài học chính là AI nên được dùng để sinh coverage ban đầu, nhưng oracle nghiệp vụ và bug confirmation phải được kiểm tra bằng requirement, thao tác UI/API black-box và evidence thực tế.
