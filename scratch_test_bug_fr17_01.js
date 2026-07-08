// scratch_test_bug_fr17_01.js
// Script tự động kiểm chứng lỗi BUG-FR17-01: API Admin tạo coupon không kiểm tra role Admin
// Đảm bảo backend server đang chạy tại http://localhost:3000 trước khi chạy script này.

const runTest = async () => {
  console.log("=== KHỞI CHẠY KIỂM THỬ BUG-FR17-01 (ROLE ADMIN BYPASS ON CREATING COUPON) ===");

  // 1. Đăng nhập tài khoản user thường (test@eshop.com) để lấy JWT Token
  console.log("\n1. Đăng nhập tài khoản user thường test@eshop.com để lấy JWT Token...");
  const loginRes = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }),
  });

  if (!loginRes.ok) {
    console.error("❌ Đăng nhập tài khoản user thường thất bại! Hãy chắc chắn server backend đang chạy.");
    return;
  }

  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("-> Đăng nhập thành công. Đang nắm giữ token của user thường.");

  // 2. Gửi yêu cầu tạo Coupon tới API admin bằng token của user thường
  console.log("\n2. Gửi request POST tới /api/admin/coupons bằng token của user thường...");
  const couponData = {
    code: "TET2025_BYPASS",
    type: "percent",
    discount_value: 15,
    expired_at: "2027-01-31",
    min_order_amount: 200000,
    max_uses_per_user: 1
  };

  const res = await fetch("http://localhost:3000/api/admin/coupons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(couponData),
  });

  console.log(`HTTP Status nhận được: ${res.status}`);
  const data = await res.json();
  console.log("Response từ server:", data);

  // 3. Đánh giá kết quả
  console.log("\n3. Đánh giá kết quả kiểm thử:");
  if (res.status === 200 || res.status === 201) {
    console.log("🔴 [BUG PHÁT HIỆN]: Server cho phép user thường tạo coupon thành công (HTTP 200/201)!");
    console.log("   API /api/admin/coupons không kiểm tra role Admin của token.");
  } else if (res.status === 403 || res.status === 401) {
    console.log("🟢 [PASS]: Server từ chối request của user thường một cách chính xác (trả về 403 Forbidden hoặc 401 Unauthorized).");
  } else {
    console.log(`🟡 [KẾT QUẢ KHÁC]: Nhận mã HTTP ${res.status}. Vui lòng kiểm tra lại logic backend.`);
  }

  console.log("\n=== KẾT THÚC KIỂM THỬ ===");
};

runTest().catch((err) => console.error("Lỗi khi chạy script:", err));
