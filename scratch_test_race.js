// scratch_test_race.js
// Script test Race Condition (Brute-force song song) cho TC08
// Đăng ký tài khoản sạch, gửi 5 request đồng thời, sau đó đăng nhập bằng mật khẩu đúng

const email = `race_${Date.now()}@eshop.com`; // Tạo email ngẫu nhiên
const password = 'Test1234!';
const wrongPassword = 'WrongPassword!';

const registerUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Race Test User', email, password })
    });
    const data = await res.json();
    console.log("Đăng ký tài khoản test mới:", email, data.message || data.error);
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err.message);
  }
};

const makeRequest = async (id) => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: wrongPassword })
    });
    const status = res.status;
    const data = await res.json();
    console.log(`Request ${id}: HTTP Status = ${status} - Response:`, data);
  } catch (err) {
    console.error(`Request ${id}: Lỗi -`, err.message);
  }
};

const verifyLogin = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const status = res.status;
    const data = await res.json();
    console.log(`\nĐăng nhập lại bằng mật khẩu ĐÚNG: HTTP Status = ${status} - Response:`, data);
  } catch (err) {
    console.error("Lỗi khi đăng nhập lại:", err.message);
  }
};

const runRaceTest = async () => {
  console.log("=== BẮT ĐẦU KIỂM THỬ RACE CONDITION (TC08) ===");
  await registerUser();
  
  console.log("\nGửi đồng thời 5 request đăng nhập sai...");
  const promises = [];
  for (let i = 1; i <= 5; i++) {
    promises.push(makeRequest(i));
  }
  
  await Promise.all(promises);
  
  // Chờ 500ms để đảm bảo các update database đã được thực thi xong
  await new Promise(resolve => setTimeout(resolve, 500));
  
  await verifyLogin();
  console.log("\n=== KẾT THÚC KIỂM THỬ ===");
};

runRaceTest();
