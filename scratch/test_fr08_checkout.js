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

async function createUser(label) {
  const email = `fr08_${label}_${Date.now()}@test.local`;
  const password = "Test1234!";
  await request("/api/register", {
    method: "POST",
    body: JSON.stringify({ name: `FR08 ${label}`, email, password }),
  });
  const login = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!login.body?.token) throw new Error(`Login failed for ${email}: ${JSON.stringify(login)}`);
  return login.body.token;
}

function auth(token) {
  return { Authorization: `Bearer ${token}` };
}

async function addNominalCart(token) {
  return request("/api/cart", {
    method: "POST",
    headers: auth(token),
    body: JSON.stringify({ id: 1, name: "Sample Product", price: 100000, quantity: 2 }),
  });
}

async function checkout(token, payload) {
  return request("/api/checkout", {
    method: "POST",
    headers: auth(token),
    body: JSON.stringify(payload),
  });
}

async function orders(token) {
  const res = await request("/api/orders/my-orders", { method: "GET", headers: auth(token) });
  return Array.isArray(res.body) ? res.body : [];
}

async function cart(token) {
  const res = await request("/api/cart", { method: "GET", headers: auth(token) });
  return res.body;
}

async function record(id, { withCart = true, payload, expectedBug = null }) {
  const token = await createUser(id.toLowerCase());
  if (withCart) await addNominalCart(token);
  const beforeOrders = (await orders(token)).length;
  const beforeCart = await cart(token);
  const result = await checkout(token, payload);
  const afterOrders = await orders(token);
  const afterCart = await cart(token);
  return {
    id,
    result,
    beforeOrders,
    afterOrders: afterOrders.length,
    order: afterOrders[0] || null,
    beforeCart,
    afterCart,
    expectedBug,
  };
}

async function run() {
  const cases = [];

  cases.push(await record("FR08-DOM-TC01", {
    payload: { total_amount: 200000, shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Cart should be cleared after successful checkout.",
  }));

  const noToken = await request("/api/checkout", {
    method: "POST",
    body: JSON.stringify({ total_amount: 200000, shipping_address: "123 Le Loi, TP.HCM" }),
  });
  cases.push({ id: "FR08-DOM-TC02", result: noToken });

  const badToken = await request("/api/checkout", {
    method: "POST",
    headers: { Authorization: "Bearer invalid.token" },
    body: JSON.stringify({ total_amount: 200000, shipping_address: "123 Le Loi, TP.HCM" }),
  });
  cases.push({ id: "FR08-DOM-TC03", result: badToken });

  cases.push(await record("FR08-DOM-TC04", {
    withCart: false,
    payload: { total_amount: 0, shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Checkout should reject empty cart.",
  }));

  cases.push(await record("FR08-DOM-TC05", {
    payload: { shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Checkout should reject missing total_amount or compute total server-side.",
  }));

  cases.push(await record("FR08-DOM-TC06", {
    payload: { total_amount: 100000, shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Backend should recalculate cart total and not trust mismatched client total.",
  }));

  cases.push(await record("FR08-DOM-TC07", {
    payload: { total_amount: 0, shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Checkout should reject zero total for non-empty cart.",
  }));

  cases.push(await record("FR08-DOM-TC08", {
    payload: { total_amount: -1, shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Checkout should reject negative total.",
  }));

  cases.push(await record("FR08-DOM-TC09", {
    payload: { total_amount: "abc", shipping_address: "123 Le Loi, TP.HCM" },
    expectedBug: "Checkout should reject non-numeric total.",
  }));

  cases.push(await record("FR08-DOM-TC10", {
    payload: { total_amount: 200000 },
    expectedBug: "Checkout should reject missing shipping_address.",
  }));

  cases.push(await record("FR08-DOM-TC11", {
    payload: { total_amount: 200000, shipping_address: "" },
    expectedBug: "Checkout should reject empty shipping_address.",
  }));

  cases.push(await record("FR08-DOM-TC12", {
    payload: { total_amount: 200000, shipping_address: "   " },
    expectedBug: "Checkout should reject whitespace shipping_address.",
  }));

  cases.push(await record("FR08-DOM-TC13", {
    payload: { total_amount: 200000, shipping_address: "123 Le Loi, Q.1, TP.HCM" },
  }));

  cases.push(await record("FR08-DOM-TC14", {
    payload: { total_amount: 200000, shipping_address: "123 Le Loi, TP.HCM", note: "test" },
  }));

  console.log(JSON.stringify(cases, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
