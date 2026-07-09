const API_URL = "http://localhost:3000/api";

async function runTests() {
  console.log("=== STARTING FR-04 AUTOMATED TESTS ===");
  
  const email = `test_fr04_${Date.now()}@test.com`;
  const password = "Password123!";
  const initialName = "FR04 Initial User";

  // 1. Register User
  console.log("\n[1] Registering test user...");
  const registerRes = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: initialName, email, password }),
  });
  const registerData = await registerRes.json();
  console.log("Register response:", registerRes.status, registerData);

  // 2. Login User
  console.log("\n[2] Logging in...");
  const loginRes = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log("Login response:", loginRes.status, token ? "Token received" : "No token");

  // Helper GET profile function
  async function getProfile(authToken) {
    const headers = {};
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    return await fetch(`${API_URL}/users/me`, { method: "GET", headers });
  }

  // Helper PUT profile function
  async function putProfile(authToken, body) {
    const headers = { "Content-Type": "application/json" };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    return await fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  }

  // --- FR04-DOM-TC01: GET Profile with valid token ---
  console.log("\n[TC01] GET /api/users/me with valid token...");
  const tc01Res = await getProfile(token);
  const tc01Data = await tc01Res.json();
  console.log("Status:", tc01Res.status, "Data:", tc01Data);

  // --- FR04-DOM-TC03: GET Profile with missing token ---
  console.log("\n[TC03] GET /api/users/me with missing token...");
  const tc03Res = await getProfile(null);
  const tc03Data = await tc03Res.json();
  console.log("Status:", tc03Res.status, "Data:", tc03Data);

  // --- FR04-DOM-TC04: GET Profile with invalid token ---
  console.log("\n[TC04] GET /api/users/me with invalid token...");
  const tc04Res = await getProfile("invalid_token_123");
  const tc04Data = await tc04Res.json();
  console.log("Status:", tc04Res.status, "Data:", tc04Data);

  // --- FR04-DOM-TC02: PUT Profile success (happy path) ---
  console.log("\n[TC02] PUT /api/users/me (happy path)...");
  const tc02Body = {
    name: "Nguyen Van A",
    shipping_address: "123 Le Loi, Q1, TP.HCM",
    phone: "0912345678"
  };
  const tc02Res = await putProfile(token, tc02Body);
  const tc02Data = await tc02Res.json();
  console.log("PUT status:", tc02Res.status, tc02Data);
  
  // Verify persistence
  const verifyTc02Res = await getProfile(token);
  const verifyTc02Data = await verifyTc02Res.json();
  console.log("GET profile after PUT:", verifyTc02Data);

  // --- FR04-DOM-TC05: PUT Profile with missing token ---
  console.log("\n[TC05] PUT /api/users/me with missing token...");
  const tc05Res = await putProfile(null, tc02Body);
  const tc05Data = await tc05Res.json();
  console.log("Status:", tc05Res.status, tc05Data);

  // --- FR04-DOM-TC06: PUT Profile with invalid token ---
  console.log("\n[TC06] PUT /api/users/me with invalid token...");
  const tc06Res = await putProfile("invalid_token_123", tc02Body);
  const tc06Data = await tc06Res.json();
  console.log("Status:", tc06Res.status, tc06Data);

  // --- FR04-DOM-TC07: PUT Profile missing field (Data Loss Test) ---
  console.log("\n[TC07] PUT /api/users/me with missing field (phone)...");
  const tc07Body = {
    name: "Nguyen Van A New",
    shipping_address: "123 Le Loi, Q1, TP.HCM"
    // phone is missing
  };
  const tc07Res = await putProfile(token, tc07Body);
  const tc07Data = await tc07Res.json();
  console.log("PUT status:", tc07Res.status, tc07Data);

  // Verify database after partial PUT
  const verifyTc07Res = await getProfile(token);
  const verifyTc07Data = await verifyTc07Res.json();
  console.log("GET profile after partial PUT:", verifyTc07Data);
  console.log("Is phone null?", verifyTc07Data.phone === null ? "YES (BUG: Data Loss)" : "NO");

  // --- FR04-DOM-TC08: PUT Profile with extra field (Mass Assignment Privilege Escalation) ---
  console.log("\n[TC08] PUT /api/users/me with role: 'admin'...");
  const tc08Body = {
    name: "Nguyen Van A",
    shipping_address: "123 Le Loi, Q1, TP.HCM",
    phone: "0912345678",
    role: "admin"
  };
  const tc08Res = await putProfile(token, tc08Body);
  const tc08Data = await tc08Res.json();
  console.log("PUT status:", tc08Res.status, tc08Data);

  // Verify role in profile
  const verifyTc08Res = await getProfile(token);
  const verifyTc08Data = await verifyTc08Res.json();
  console.log("GET profile after role PUT:", verifyTc08Data);
  console.log("Is role updated to admin?", verifyTc08Data.role === "admin" ? "YES (CRITICAL BUG: Privilege Escalation)" : "NO");

  // --- FR04-DOM-TC09: PUT Profile with empty name ---
  console.log("\n[TC09] PUT /api/users/me with empty name...");
  const tc09Res = await putProfile(token, {
    name: "",
    shipping_address: "123 Le Loi, Q1, TP.HCM",
    phone: "0912345678"
  });
  console.log("Status:", tc09Res.status, await tc09Res.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-DOM-TC10: PUT Profile with empty address ---
  console.log("\n[TC10] PUT /api/users/me with empty address...");
  const tc10Res = await putProfile(token, {
    name: "Nguyen Van A",
    shipping_address: "",
    phone: "0912345678"
  });
  console.log("Status:", tc10Res.status, await tc10Res.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-DOM-TC11: PUT Profile with empty phone ---
  console.log("\n[TC11] PUT /api/users/me with empty phone...");
  const tc11Res = await putProfile(token, {
    name: "Nguyen Van A",
    shipping_address: "123 Le Loi, Q1, TP.HCM",
    phone: ""
  });
  console.log("Status:", tc11Res.status, await tc11Res.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-DOM-TC12: PUT Profile with invalid phone format ---
  console.log("\n[TC12] PUT /api/users/me with invalid phone format...");
  const tc12Res = await putProfile(token, {
    name: "Nguyen Van A",
    shipping_address: "123 Le Loi, Q1, TP.HCM",
    phone: "abc-phone"
  });
  console.log("Status:", tc12Res.status, await tc12Res.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // === BVA TESTS ===
  console.log("\n=== RUNNING BVA TESTS ===");

  // --- FR04-BVA-TC01: name length = 1 (Valid) ---
  console.log("\n[BVA-TC01] name length = 1...");
  const bva01 = await putProfile(token, { name: "A", shipping_address: "123 Le Loi", phone: "0912345678" });
  console.log("Status:", bva01.status, await bva01.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-BVA-TC02: name length = 2 (Valid) ---
  console.log("\n[BVA-TC02] name length = 2...");
  const bva02 = await putProfile(token, { name: "AB", shipping_address: "123 Le Loi", phone: "0912345678" });
  console.log("Status:", bva02.status, await bva02.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-BVA-TC03: phone length = 10 (Valid) ---
  console.log("\n[BVA-TC03] phone length = 10...");
  const bva03 = await putProfile(token, { name: "Nguyen Van A", shipping_address: "123 Le Loi", phone: "0912345678" });
  console.log("Status:", bva03.status, await bva03.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-BVA-TC04: name length = 0 (Invalid) ---
  console.log("\n[BVA-TC04] name length = 0...");
  const bva04 = await putProfile(token, { name: "", shipping_address: "123 Le Loi", phone: "0912345678" });
  console.log("Status:", bva04.status, await bva04.json());

  // --- FR04-BVA-TC05: phone length = 9 (Invalid) ---
  console.log("\n[BVA-TC05] phone length = 9...");
  const bva05 = await putProfile(token, { name: "Nguyen Van A", shipping_address: "123 Le Loi", phone: "091234567" });
  console.log("Status:", bva05.status, await bva05.json());
  console.log("Profile state:", await (await getProfile(token)).json());

  // --- FR04-BVA-TC06: phone length = 11 (Invalid) ---
  console.log("\n[BVA-TC06] phone length = 11...");
  const bva06 = await putProfile(token, { name: "Nguyen Van A", shipping_address: "123 Le Loi", phone: "09123456789" });
  console.log("Status:", bva06.status, await bva06.json());
  console.log("Profile state:", await (await getProfile(token)).json());
}

runTests().catch(err => console.error("Test execution failed:", err));
