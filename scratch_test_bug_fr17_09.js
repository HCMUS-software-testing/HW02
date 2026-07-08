// scratch_test_bug_fr17_09.js
// Script tự động kiểm chứng lỗi BUG-FR17-09: Xóa coupon không tồn tại vẫn báo thành công
// Đảm bảo backend server đang chạy tại http://localhost:3000 trước khi chạy script này.

const runTest = async () => {
  console.log("=== KHỞI CHẠY KIỂM THỬ BUG-FR17-09 (DELETE NON-EXISTENT COUPON) ===");

  // 1. Đăng nhập tài khoản Admin (admin@eshop.com) để lấy JWT Token
  console.log("\n1. Đăng nhập tài khoản Admin admin@eshop.com để lấy JWT Token...");
  const loginRes = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@eshop.com", password: "Admin123!" }),
  });

  if (!loginRes.ok) {
    console.error("❌ Đăng nhập tài khoản Admin thất bại! Hãy chắc chắn server backend đang chạy.");
    return;
  }

  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("-> Đăng nhập thành công. Đang nắm giữ token của Admin.");

  // Hàm gửi yêu cầu xóa coupon tiện ích
  const testDeleteCoupon = async (couponId) => {
    console.log(`\n2. Gửi request DELETE tới /api/admin/coupons/${couponId}...`);
    const res = await fetch(`http://localhost:3000/api/admin/coupons/${couponId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    console.log(`HTTP Status: ${res.status}`);
    const data = await res.json();
    console.log("Response từ server:", data);
    return res.status;
  };

  // 2. Thực hiện xóa các coupon không tồn tại
  const status1 = await testDeleteCoupon(999999); // ID cực lớn không tồn tại
  const status2 = await testDeleteCoupon(0);      // ID biên không hợp lệ

  // 3. Đánh giá kết quả
  console.log("\n3. Đánh giá kết quả kiểm thử:");
  const isBug1 = status1 === 200;
  const isBug2 = status2 === 200;

  if (isBug1 || isBug2) {
    console.log("🔴 [BUG PHÁT HIỆN]: Server vẫn báo xóa thành công (HTTP 200) cho coupon không tồn tại!");
    if (isBug1) console.log("   - Lỗi ở Case ID = 999999");
    if (isBug2) console.log("   - Lỗi ở Case ID = 0");
  } else {
    console.log("🟢 [PASS]: Server trả về mã lỗi chính xác khi xóa coupon không tồn tại (Ví dụ: 404 Not Found hoặc 400 Bad Request).");
  }

  console.log("\n=== KẾT THÚC KIỂM THỬ ===");
};

runTest().catch((err) => console.error("Lỗi khi chạy script:", err));
