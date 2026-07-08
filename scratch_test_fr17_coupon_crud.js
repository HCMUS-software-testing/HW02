const { execFileSync } = require('child_process');

const BASE_URL = process.env.FR17_BASE_URL || 'http://localhost:3000';
const ADMIN_UI_URL = process.env.FR17_ADMIN_UI_URL || 'http://localhost:5174/';

function loadPlaywright() {
  try {
    return require('playwright');
  } catch (_) {
    return require('/tmp/fr17-pw/node_modules/playwright');
  }
}

async function request(method, path, token, body) {
  const headers = {};
  if (token !== undefined && token !== null) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch (_) {
    payload = text;
  }
  return { status: response.status, payload };
}

async function login(email, password) {
  const result = await request('POST', '/api/login', null, { email, password });
  if (result.status !== 200 || !result.payload?.token) {
    throw new Error(`Login failed for ${email}: ${result.status} ${JSON.stringify(result.payload)}`);
  }
  return result.payload.token;
}

function resetSeed() {
  execFileSync('node', ['eshop-sut/backend/database.js'], { stdio: 'pipe' });
}

function validCoupon(overrides = {}) {
  return {
    code: 'TET2025',
    type: 'percent',
    discount_value: 15,
    min_order_amount: 200000,
    expired_at: '2027-01-31',
    max_uses_per_user: 1,
    ...overrides,
  };
}

function summarizePayload(payload) {
  if (Array.isArray(payload)) {
    return `array(${payload.length}) [${payload.map((item) => item.code ?? item.id).join(', ')}]`;
  }
  if (payload && typeof payload === 'object') {
    const slim = {};
    for (const key of ['message', 'error', 'id', 'code', 'type', 'discount_value', 'min_order_amount', 'expired_at', 'max_uses_per_user']) {
      if (payload[key] !== undefined) slim[key] = payload[key];
    }
    return JSON.stringify(slim || payload);
  }
  return String(payload);
}

async function listCoupons(token) {
  return request('GET', '/api/coupons', token);
}

async function deleteByCode(token, code) {
  const list = await listCoupons(token);
  if (!Array.isArray(list.payload)) return null;
  const coupon = list.payload.find((item) => item.code === code);
  if (!coupon) return null;
  return request('DELETE', `/api/admin/coupons/${coupon.id}`, token);
}

async function runUiHappyPath() {
  resetSeed();
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const apiResponses = [];
  page.on('response', async (response) => {
    if (response.url().includes('/api/')) {
      apiResponses.push(`${response.request().method()} ${response.url().replace(BASE_URL, '')} -> ${response.status()}`);
    }
  });
  page.on('dialog', (dialog) => dialog.accept());

  await page.goto(ADMIN_UI_URL, { waitUntil: 'networkidle' });
  await page.getByPlaceholder('Email').fill('admin@eshop.com');
  await page.getByPlaceholder('Password').fill('Admin123!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);
  await page.getByText('Mã Giảm Giá').click();
  await page.waitForTimeout(500);

  const beforeText = await page.locator('body').innerText();

  const fields = page.locator('input,select');
  async function createCoupon(coupon) {
    await fields.nth(0).fill(coupon.code);
    await fields.nth(1).selectOption(coupon.type);
    await fields.nth(2).fill(String(coupon.discount_value));
    await fields.nth(3).fill(String(coupon.min_order_amount));
    await fields.nth(4).fill(coupon.expired_at);
    await fields.nth(5).fill(String(coupon.max_uses_per_user));
    await page.getByRole('button', { name: 'Tạo mã' }).click();
    await page.waitForTimeout(700);
  }

  await createCoupon(validCoupon({ code: 'TET2025', type: 'percent', discount_value: 15 }));
  await createCoupon(validCoupon({ code: 'FREESHIP50', type: 'fixed', discount_value: 50000 }));

  await page.locator('tr', { hasText: 'SAVE10' }).getByRole('button', { name: 'Xóa' }).click();
  await page.waitForTimeout(700);
  const afterText = await page.locator('body').innerText();
  await browser.close();

  const passed =
    beforeText.includes('SAVE10') &&
    afterText.includes('TET2025') &&
    afterText.includes('FREESHIP50') &&
    !afterText.includes('SAVE10');

  return {
    id: 'TC01',
    channel: 'UI + API observed',
    actual: `UI đăng nhập Admin và mở tab Mã Giảm Giá thành công; danh sách seed hiển thị. Tạo TET2025(percent) và FREESHIP50(fixed) hiển thị trong bảng; xóa SAVE10 khỏi bảng. API observed: ${apiResponses.join('; ')}.`,
    pass: passed,
  };
}

async function runApiCase(id, fn, expectedPass) {
  resetSeed();
  const adminToken = await login('admin@eshop.com', 'Admin123!');
  const userToken = await login('test@eshop.com', 'Test1234!');
  const result = await fn({ adminToken, userToken });
  return {
    id,
    channel: 'API',
    actual: result.actual,
    pass: expectedPass(result),
  };
}

async function main() {
  const results = [];

  results.push(await runUiHappyPath());

  results.push(await runApiCase('TC02', async ({ adminToken }) => {
    const r = await request('PUT', '/api/admin/coupons/1', adminToken, validCoupon());
    return { r, actual: `PUT /api/admin/coupons/1 -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status >= 400));

  results.push(await runApiCase('TC03', async () => {
    const r = await request('POST', '/api/admin/coupons', null, validCoupon());
    return { r, actual: `POST không Authorization -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status === 401));

  results.push(await runApiCase('TC04', async () => {
    const r = await request('POST', '/api/admin/coupons', 'invalid.jwt.token', validCoupon());
    return { r, actual: `POST token sai -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status === 401 || r.status === 403));

  results.push(await runApiCase('TC05', async ({ userToken }) => {
    const r = await request('POST', '/api/admin/coupons', userToken, validCoupon());
    return { r, actual: `POST bằng token user thường -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status === 403));

  const invalidCreateCases = [
    ['TC06', validCoupon({ code: '' }), (r) => r.status >= 400],
    ['TC07', validCoupon({ code: 'SAVE10' }), (r) => r.status >= 400],
    ['TC08', validCoupon({ code: 'TET2025', type: 'cashback' }), (r) => r.status >= 400],
    ['TC09', (() => { const body = validCoupon({ code: 'TET2025' }); delete body.type; return body; })(), (r) => r.status >= 400],
    ['TC10', validCoupon({ code: 'TET2025', discount_value: 0 }), (r) => r.status >= 400],
    ['TC11', validCoupon({ code: 'TET2025', type: 'fixed', discount_value: -5 }), (r) => r.status >= 400],
    ['TC12', validCoupon({ code: 'TET2025', discount_value: 'abc' }), (r) => r.status >= 400],
    ['TC13', (() => { const body = validCoupon({ code: 'TET2025' }); delete body.expired_at; return body; })(), (r) => r.status >= 400],
    ['TC14', validCoupon({ code: 'TET2025', expired_at: 'not-a-date' }), (r) => r.status >= 400],
    ['TC15', validCoupon({ code: 'TET2025', min_order_amount: -1 }), (r) => r.status >= 400],
    ['TC16', validCoupon({ code: 'TET2025', type: 'fixed', discount_value: 50000, min_order_amount: 'two hundred' }), (r) => r.status >= 400],
    ['TC17', validCoupon({ code: 'TET2025', max_uses_per_user: 0 }), (r) => r.status >= 400],
  ];

  for (const [id, body, predicate] of invalidCreateCases) {
    results.push(await runApiCase(id, async ({ adminToken }) => {
      const r = await request('POST', '/api/admin/coupons', adminToken, body);
      return { r, actual: `POST /api/admin/coupons body ${JSON.stringify(body)} -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
    }, ({ r }) => predicate(r)));
  }

  results.push(await runApiCase('TC18', async ({ adminToken }) => {
    const r = await request('DELETE', '/api/admin/coupons/999999', adminToken);
    return { r, actual: `DELETE /api/admin/coupons/999999 -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status >= 400));

  results.push(await runApiCase('TC19', async ({ adminToken }) => {
    const body = validCoupon({ code: 'RACE2027' });
    const [r1, r2] = await Promise.all([
      request('POST', '/api/admin/coupons', adminToken, body),
      request('POST', '/api/admin/coupons', adminToken, body),
    ]);
    const list = await listCoupons(adminToken);
    const count = Array.isArray(list.payload) ? list.payload.filter((item) => item.code === 'RACE2027').length : -1;
    return {
      r1,
      r2,
      count,
      actual: `2 POST đồng thời code RACE2027 -> HTTP ${r1.status} và ${r2.status}; số coupon RACE2027 trong danh sách sau đó = ${count}; body1 ${summarizePayload(r1.payload)}; body2 ${summarizePayload(r2.payload)}.`,
    };
  }, ({ r1, r2, count }) => [r1.status, r2.status].filter((s) => s >= 200 && s < 300).length === 1 && count === 1));

  const bvaCases = [
    ['TC-BVA-01', validCoupon({ code: '' }), (r) => r.status >= 400],
    ['TC-BVA-02', validCoupon({ code: 'A' }), (r) => r.status >= 200 && r.status < 300],
    ['TC-BVA-03', validCoupon({ code: 'TET2025', discount_value: 0 }), (r) => r.status >= 400],
    ['TC-BVA-04', validCoupon({ code: 'TET2025', discount_value: 1 }), (r) => r.status >= 200 && r.status < 300],
    ['TC-BVA-05', validCoupon({ code: 'TET2025', type: 'fixed', discount_value: 50000, min_order_amount: -1 }), (r) => r.status >= 400],
    ['TC-BVA-06', validCoupon({ code: 'TET2025', type: 'fixed', discount_value: 50000, min_order_amount: 0 }), (r) => r.status >= 200 && r.status < 300],
    ['TC-BVA-07', validCoupon({ code: 'TET2025', max_uses_per_user: 0 }), (r) => r.status >= 400],
    ['TC-BVA-08', validCoupon({ code: 'TET2025', max_uses_per_user: 1 }), (r) => r.status >= 200 && r.status < 300],
  ];

  for (const [id, body, predicate] of bvaCases) {
    results.push(await runApiCase(id, async ({ adminToken }) => {
      const r = await request('POST', '/api/admin/coupons', adminToken, body);
      await deleteByCode(adminToken, body.code);
      return { r, actual: `POST /api/admin/coupons body ${JSON.stringify(body)} -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
    }, ({ r }) => predicate(r)));
  }

  results.push(await runApiCase('TC-BVA-09', async ({ adminToken }) => {
    const r = await request('DELETE', '/api/admin/coupons/0', adminToken);
    return { r, actual: `DELETE /api/admin/coupons/0 -> HTTP ${r.status}; body ${summarizePayload(r.payload)}.` };
  }, ({ r }) => r.status >= 400));

  results.push(await runApiCase('TC-BVA-10', async ({ adminToken }) => {
    const before = await listCoupons(adminToken);
    const r = await request('DELETE', '/api/admin/coupons/1', adminToken);
    const after = await listCoupons(adminToken);
    const stillExists = Array.isArray(after.payload) && after.payload.some((item) => item.id === 1);
    return {
      r,
      before,
      after,
      actual: `Trước khi xóa có ${Array.isArray(before.payload) ? before.payload.length : 'N/A'} coupon; DELETE /api/admin/coupons/1 -> HTTP ${r.status}; body ${summarizePayload(r.payload)}; sau xóa id=1 còn tồn tại: ${stillExists}.`,
    };
  }, ({ r, after }) => r.status >= 200 && r.status < 300 && Array.isArray(after.payload) && !after.payload.some((item) => item.id === 1)));

  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
