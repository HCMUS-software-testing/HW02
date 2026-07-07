// scratch_test_bug_fr09_04.js
// Script tự động kiểm chứng lỗi BUG-FR09-04 (Giả mạo user_id hoặc bỏ trống user_id)
// Đảm bảo backend server đang chạy tại http://localhost:3000 trước khi chạy script này.

const runTest = async () => {
  console.log("=== KHỞI CHẠY KIỂM THỬ BUG-FR09-04 (ID SPOOFING & EMPTY USER_ID) ===");

  // 1. Đăng nhập để lấy token của User chính chủ (test@eshop.com)
  console.log("\n1. Đăng nhập tài khoản test@eshop.com để lấy JWT Token...");
  const loginRes = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }),
  });
  
  if (!loginRes.ok) {
    console.error("Đăng nhập thất bại! Hãy chắc chắn server backend đang chạy.");
    return;
  }
  
  const loginData = await loginRes.json();
  const token = loginData.token;
  const realUserId = loginData.user.id;
  console.log(`-> Đăng nhập thành công. ID người dùng thực tế: ${realUserId}`);

  // ----------------------------------------------------
  // TRƯỜNG HỢP 1: Bỏ trống user_id trong request body
  // ----------------------------------------------------
  console.log("\n----------------------------------------------------");
  console.log("TRƯỜNG HỢP 1: Bỏ trống user_id (không gửi kèm user_id)");
  console.log("Gửi request POST tới /api/apply-coupon (không có JWT Token)...");
  
  const resCase1 = await fetch("http://localhost:3000/api/apply-coupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: "SAVE10",
      total_amount: 500000
      // Bỏ trống user_id
    }),
  });

  console.log(`HTTP Status: ${resCase1.status}`);
  const dataCase1 = await resCase1.json();
  console.log("Response:", dataCase1);
  
  if (resCase1.ok && dataCase1.success) {
    console.log("🔴 [BUG PHÁT HIỆN]: Hệ thống vẫn cho phép áp dụng mã giảm giá thành công mà không cần user_id (Bypass kiểm tra lượt dùng)!");
  } else {
    console.log("🟢 [PASS]: Hệ thống đã chặn thành công khi thiếu user_id.");
  }

  // ----------------------------------------------------
  // TRƯỜNG HỢP 2: Giả mạo user_id (ID Spoofing)
  // ----------------------------------------------------
  console.log("\n----------------------------------------------------");
  console.log("TRƯỜNG HỢP 2: Giả mạo user_id (ID Spoofing)");
  const spoofedUserId = realUserId + 999; // Giả mạo ID khác
  console.log(`Gửi request POST tới /api/apply-coupon với Token của User ID: ${realUserId} nhưng truyền user_id trong body: ${spoofedUserId}...`);

  const resCase2 = await fetch("http://localhost:3000/api/apply-coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      code: "SAVE10",
      total_amount: 500000,
      user_id: spoofedUserId // ID giả mạo
    }),
  });

  console.log(`HTTP Status: ${resCase2.status}`);
  const dataCase2 = await resCase2.json();
  console.log("Response:", dataCase2);

  if (resCase2.status === 200 && dataCase2.success) {
    console.log("🔴 [BUG PHÁT HIỆN]: Backend không đối chiếu user_id trong body với token JWT, cho phép giả mạo ID người khác áp dụng coupon!");
  } else {
    console.log("🟢 [PASS]: Hệ thống đã chặn thành công request giả mạo ID (Trả về 403 hoặc 400).");
  }

  console.log("\n=== KẾT THÚC KIỂM THỬ ===");
};

runTest().catch((err) => console.error("Lỗi khi chạy script:", err));
