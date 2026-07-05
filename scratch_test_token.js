// scratch_test_token.js
// Script test session/token invalidation (TC09)
// Hãy chắc chắn rằng backend server đang chạy tại http://localhost:3000

const email = `token_test_${Date.now()}@eshop.com`;
const password = 'Test1234!';
const wrongPassword = 'WrongPassword!';

const runTokenTest = async () => {
  console.log("=== BẮT ĐẦU KIỂM THỬ TOKEN KHI TÀI KHOẢN BỊ KHÓA (TC09) ===");
  
  // 1. Đăng ký tài khoản sạch
  await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Token Test User', email, password })
  });
  console.log(`1. Đăng ký thành công tài khoản: ${email}`);

  // 2. Đăng nhập thành công trên Thiết bị A để lấy JWT Token
  const loginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("2. Thiết bị A đăng nhập thành công. Nhận JWT Token:", token ? "Thành công (đã lấy được token)" : "Thất bại");

  // 3. Giả lập Thiết bị B nhập sai 2 lần liên tiếp khiến tài khoản bị khóa
  console.log("3. Thiết bị B gửi 2 request đăng nhập sai mật khẩu liên tiếp để khóa tài khoản...");
  await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: wrongPassword })
  });
  await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: wrongPassword })
  });

  // 4. Thiết bị A dùng Token cũ để truy cập endpoint bảo mật /api/users/me
  console.log("4. Thiết bị A gọi API `/api/users/me` sử dụng JWT Token cũ...");
  try {
    const meRes = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const status = meRes.status;
    const meData = await meRes.json();
    console.log(`\nKết quả gọi API: HTTP Status = ${status}`);
    console.log("Response JSON:", meData);
    
    if (status === 200) {
      console.log("\n-> KẾT QUẢ: Hệ thống VẪN CHO PHÉP truy cập API bằng token cũ mặc dù tài khoản đã bị khóa!");
    } else {
      console.log("\n-> KẾT QUẢ: Hệ thống đã chặn thành công token cũ khi tài khoản bị khóa.");
    }
  } catch (err) {
    console.error("Lỗi khi gọi API me:", err.message);
  }
  console.log("=== KẾT THÚC KIỂM THỬ ===");
};

runTokenTest();
