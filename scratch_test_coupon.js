// scratch_test_coupon.js
// Script test các kịch bản nâng cao của FR-09 (Mã giảm giá) bằng các HTTP API
// Hãy chắc chắn rằng backend server đang chạy tại http://localhost:3000

const runTests = async () => {
  console.log("=== BẮT ĐẦU KIỂM THỬ CÁC KỊCH BẢN NÂNG CAO FR-09 BẰNG API ===");

  // 0. Đăng nhập Admin và tạo mã INACTIVE để phục vụ TC04
  console.log("0. Đăng nhập Admin...");
  const adminLoginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@eshop.com', password: 'Admin123!' })
  });
  const adminLoginData = await adminLoginRes.json();
  const adminToken = adminLoginData.token;

  console.log("Tạo coupon INACTIVE (is_active = 0)...");
  const createCouponRes = await fetch('http://localhost:3000/api/admin/coupons', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({
      code: 'INACTIVE',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 100000,
      expired_at: '2099-12-31',
      is_active: 0,
      max_uses_per_user: 1
    })
  });
  const createCouponData = await createCouponRes.json();
  const inactiveCouponId = createCouponData.couponId;
  console.log(`Đã tạo coupon INACTIVE. ID: ${inactiveCouponId}`);

  // Đăng nhập Test User 1
  const loginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@eshop.com', password: 'Test1234!' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  // ==========================================
  // TC04: Áp dụng mã ngưng hoạt động
  // ==========================================
  console.log("\n--- TC04: Áp dụng mã ngưng hoạt động (INACTIVE) ---");
  const resTC04 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ code: 'INACTIVE', total_amount: 150000, user_id: 1 })
  });
  console.log(`Status: ${resTC04.status}`);
  console.log(`Response:`, await resTC04.json());

  // ==========================================
  // TC09: Giả mạo user_id trong request body khác với token
  // ==========================================
  console.log("\n--- TC09: Giả mạo user_id (body user_id = 2, token user_id = 1) ---");
  const resTC09 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ code: 'SAVE10', total_amount: 500000, user_id: 2 })
  });
  console.log(`Status: ${resTC09.status}`);
  console.log(`Response:`, await resTC09.json());

  // ==========================================
  // TC10: user_id không tồn tại (user_id = 9999)
  // ==========================================
  console.log("\n--- TC10: user_id không tồn tại (user_id = 9999) ---");
  const resTC10 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ code: 'SAVE10', total_amount: 500000, user_id: 9999 })
  });
  console.log(`Status: ${resTC10.status}`);
  console.log(`Response:`, await resTC10.json());

  // ==========================================
  // TC11: Áp dụng mã không cần Đăng nhập / Token JWT
  // ==========================================
  console.log("\n--- TC11: Áp dụng mã không truyền Token JWT ---");
  const resTC11 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'SAVE10', total_amount: 500000, user_id: 1 })
  });
  console.log(`Status: ${resTC11.status}`);
  console.log(`Response:`, await resTC11.json());

  // ==========================================
  // TC13: Mã giảm giá hết lượt sử dụng (Dùng 1 lần)
  // ==========================================
  console.log("\n--- TC13: Mã giảm giá hết lượt sử dụng ---");
  // Tạo user sạch để test
  const cleanEmail = `user_tc13_${Date.now()}@eshop.com`;
  await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'TC13 User', email: cleanEmail, password: 'Password123!' })
  });
  const loginCleanRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: cleanEmail, password: 'Password123!' })
  });
  const loginCleanData = await loginCleanRes.json();
  const cleanToken = loginCleanData.token;
  const cleanUserId = loginCleanData.user.id;

  // Sử dụng coupon SAVE10 lần 1
  await fetch('http://localhost:3000/api/coupon-usage', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cleanToken}`
    },
    body: JSON.stringify({ coupon_id: 1 }) // SAVE10 ID = 1
  });
  console.log("Đã ghi nhận sử dụng mã SAVE10 lần 1.");

  // Thử áp dụng lại lần 2
  const resTC13 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cleanToken}`
    },
    body: JSON.stringify({ code: 'SAVE10', total_amount: 500000, user_id: cleanUserId })
  });
  console.log(`Status lần 2: ${resTC13.status}`);
  console.log(`Response lần 2:`, await resTC13.json());

  // ==========================================
  // TC14: Race Condition - Gửi 2 request checkout đồng thời
  // ==========================================
  console.log("\n--- TC14: Race Condition khi ghi nhận sử dụng mã giảm giá ---");
  const cleanEmail2 = `user_tc14_${Date.now()}@eshop.com`;
  await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'TC14 User', email: cleanEmail2, password: 'Password123!' })
  });
  const loginCleanRes2 = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: cleanEmail2, password: 'Password123!' })
  });
  const loginCleanData2 = await loginCleanRes2.json();
  const cleanToken2 = loginCleanData2.token;

  console.log("Gửi song song 2 request ghi nhận sử dụng mã SAVE10...");
  const usageReq = async (id) => {
    const res = await fetch('http://localhost:3000/api/coupon-usage', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanToken2}`
      },
      body: JSON.stringify({ coupon_id: 1 })
    });
    console.log(`Request ${id}: Status = ${res.status}, Body =`, await res.json());
  };
  await Promise.all([usageReq(1), usageReq(2)]);

  // ==========================================
  // TC15: Checkout Bypass
  // ==========================================
  console.log("\n--- TC15: Checkout Bypass ---");
  // Gọi checkout trực tiếp với giá trị nhỏ (chỉ 50k) mà không cần qua giỏ hàng hay check coupon tối thiểu
  const resTC15 = await fetch('http://localhost:3000/api/checkout', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ total_amount: 50000, shipping_address: '123 Bypass Road' })
  });
  console.log(`Status: ${resTC15.status}`);
  console.log(`Response:`, await resTC15.json());

  // ==========================================
  // TC16: Timezone Discrepancy
  // ==========================================
  console.log("\n--- TC16: Lệch múi giờ ---");
  const resTC16 = await fetch('http://localhost:3000/api/apply-coupon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: 'EXPIRED', total_amount: 500000, user_id: 1 })
  });
  console.log(`Status: ${resTC16.status}`);
  console.log(`Response:`, await resTC16.json());

  // Dọn dẹp: xóa coupon INACTIVE
  console.log("\nDọn dẹp coupon test...");
  await fetch(`http://localhost:3000/api/admin/coupons/${inactiveCouponId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  console.log("Đã dọn dẹp xong.");
  console.log("=== KẾT THÚC KIỂM THỬ ===");
};

runTests().catch(err => console.error("Lỗi:", err));
