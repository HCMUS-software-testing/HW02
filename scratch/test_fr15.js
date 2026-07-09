const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { status: res.status, body };
}

async function getTokens() {
  const adminLogin = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email: "admin@eshop.com", password: "Admin123!" }),
  });
  const userLogin = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email: "test@eshop.com", password: "Test1234!" }),
  });

  return {
    adminToken: adminLogin.body?.token,
    userToken: userLogin.body?.token,
  };
}

function auth(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function run() {
  const tokens = await getTokens();
  console.log("Tokens obtained successfully.");

  const results = [];

  // Helper to record test results
  async function testCase(id, description, action) {
    try {
      const res = await action();
      results.push({ id, description, status: "Done", response: res });
    } catch (err) {
      results.push({ id, description, status: "Error", error: err.message });
    }
  }

  // --- ACCESS CONTROL TESTS ---
  await testCase("FR15-AC-01", "Create product as Guest (No token)", async () => {
    return request("/api/products", {
      method: "POST",
      body: JSON.stringify({ name: "Guest Product", price: 100, description: "Desc", imageUrl: "http://img.com", category_id: 1 }),
    });
  });

  await testCase("FR15-AC-02", "Create product as Regular User", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.userToken),
      body: JSON.stringify({ name: "User Product", price: 100, description: "Desc", imageUrl: "http://img.com", category_id: 1 }),
    });
  });

  // Let's create a test category and a product to run our CRUD operations
  let testProductId = null;
  await testCase("FR15-PRE", "Setup: Create a product using Admin token", async () => {
    const res = await request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Nominal Product", price: 100000, description: "Nominal Desc", imageUrl: "http://img.com", category_id: 1 }),
    });
    if (res.body && res.body.id) {
      testProductId = res.body.id;
    }
    return res;
  });

  if (!testProductId) {
    console.error("Failed to create setup product.");
    process.exit(1);
  }

  // --- DOMAIN TESTING CASES ---
  await testCase("FR15-DOM-TC01", "Create valid product as Admin", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Test Product HW02",
        price: 100000,
        description: "Test product description",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC02", "Update existing product as Admin", async () => {
    return request(`/api/products/${testProductId}`, {
      method: "PUT",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Test Product HW02 Updated",
        price: 120000,
        description: "Updated product description",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  let deleteProductId = null;
  await testCase("FR15-DOM-TC03-PRE", "Setup: Create product for valid delete case", async () => {
    const res = await request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Delete Target Product",
        price: 100000,
        description: "Delete target",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
    deleteProductId = res.body?.id;
    return res;
  });

  await testCase("FR15-DOM-TC03", "Delete existing product as Admin", async () => {
    return request(`/api/products/${deleteProductId}`, {
      method: "DELETE",
      headers: auth(tokens.adminToken),
    });
  });

  await testCase("FR15-DOM-TC04", "Create product without token (Guest)", async () => {
    return request("/api/products", {
      method: "POST",
      body: JSON.stringify({
        name: "Unauthenticated Product",
        price: 100000,
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC05", "Update existing product with invalid token", async () => {
    return request(`/api/products/${testProductId}`, {
      method: "PUT",
      headers: auth("invalid_token"),
      body: JSON.stringify({
        name: "Test Product HW02 Updated",
        price: 120000,
        description: "Updated product description",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC06", "Delete product as non-admin", async () => {
    return request(`/api/products/${testProductId}`, {
      method: "DELETE",
      headers: auth(tokens.userToken),
    });
  });

  await testCase("FR15-DOM-TC07", "Update non-existing product id", async () => {
    return request("/api/products/9999", {
      method: "PUT",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Non-existing Product",
        price: 100000,
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC08", "Delete non-existing product id", async () => {
    return request("/api/products/9999", {
      method: "DELETE",
      headers: auth(tokens.adminToken),
    });
  });

  await testCase("FR15-DOM-TC09", "Update product ID with invalid format", async () => {
    return request("/api/products/invalid-id-format", {
      method: "PUT",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Invalid ID Product",
        price: 100000,
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC10", "Create product with invalid name type (number)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: 12345,
        price: 100000,
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC11", "Create product with invalid price type (string)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "String Price Product",
        price: "100000",
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC12", "Create product with invalid description type (number)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Test Product",
        price: 100000,
        description: 999,
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC13", "Create product with invalid imageUrl type (number)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Test Product",
        price: 100000,
        description: "Desc",
        imageUrl: 999,
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC14", "Create product with invalid category_id type (string)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Test Product",
        price: 100000,
        description: "Desc",
        imageUrl: "https://example.com/product.png",
        category_id: "1"
      }),
    });
  });

  await testCase("FR15-DOM-TC15", "Create product missing required name", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        price: 100000,
        description: "Missing name",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC16", "Create product missing required price", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Missing Price Product",
        description: "Missing price",
        imageUrl: "https://example.com/product.png",
        category_id: 1
      }),
    });
  });

  await testCase("FR15-DOM-TC17", "Create product missing required category_id", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Missing Category Product",
        price: 100000,
        description: "Missing category",
        imageUrl: "https://example.com/product.png"
      }),
    });
  });

  await testCase("FR15-DOM-TC18", "Update one product should not change another product", async () => {
    const first = await request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Isolation Product A",
        price: 100000,
        description: "Before update",
        imageUrl: "https://example.com/a.png",
        category_id: 1
      }),
    });
    const second = await request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Isolation Product B",
        price: 200000,
        description: "Should stay unchanged",
        imageUrl: "https://example.com/b.png",
        category_id: 1
      }),
    });
    const update = await request(`/api/products/${first.body?.id}`, {
      method: "PUT",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({
        name: "Isolation Product A Updated",
        price: 150000,
        description: "After update",
        imageUrl: "https://example.com/a2.png",
        category_id: 1
      }),
    });
    const secondAfter = await request(`/api/products/${second.body?.id}`, {
      method: "GET",
      headers: auth(tokens.adminToken),
    });
    return { first, second, update, secondAfter };
  });

  // --- BOUNDARY VALUE ANALYSIS (BVA) CASES ---
  // name length cases (nominal valid length, min boundary, max boundary)
  await testCase("FR15-BVA-TC01", "Create product with name length = 1 (Min boundary)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "A", price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC02", "Create product with name length = 2 (Cận dưới trong biên)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "AB", price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC03", "Create product with name length = 0 (Cận dưới ngoài biên - rỗng)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "", price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC11", "Create product with name length = 254 (Cận trên trong biên)", async () => {
    const upperInsideName = "A".repeat(254);
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: upperInsideName, price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC04", "Create product with name length = 255 (Biên trên)", async () => {
    const longName = "A".repeat(255);
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: longName, price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC05", "Create product with name length = 256 (Cận trên ngoài biên)", async () => {
    const extraLongName = "A".repeat(256);
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: extraLongName, price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  // price numeric cases
  await testCase("FR15-BVA-TC06", "Create product with price = -1 (Cận dưới ngoài biên - âm)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Negative Price Product", price: -1, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC07", "Create product with price = 0 (Biên dưới ngoài biên)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Zero Price Product", price: 0, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC08", "Create product with price = 1 (Biên dưới trong biên - số dương nhỏ nhất)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Min Price Product", price: 1, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  await testCase("FR15-BVA-TC09", "Create product with price = 2 (Cận dưới trong biên)", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Low Price Product", price: 2, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 1 }),
    });
  });

  // category_id existence/validity cases
  await testCase("FR15-BVA-TC10", "Create product with non-existing category_id = 999", async () => {
    return request("/api/products", {
      method: "POST",
      headers: auth(tokens.adminToken),
      body: JSON.stringify({ name: "Invalid Category Product", price: 100000, description: "Desc", imageUrl: "https://example.com/product.png", category_id: 999 }),
    });
  });

  // Clean up
  await testCase("FR15-POST", "Cleanup: Delete created product using Admin token", async () => {
    return request(`/api/products/${testProductId}`, {
      method: "DELETE",
      headers: auth(tokens.adminToken),
    });
  });

  console.log(JSON.stringify(results, null, 2));
}

run().catch((err) => {
  console.error(err);
});
