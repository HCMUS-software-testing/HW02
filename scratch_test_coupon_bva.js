const { execSync } = require('child_process');
const path = require('path');

const DB_PATH = path.join(__dirname, 'eshop-sut/backend/database.sqlite');
const BASE_URL = 'http://localhost:3000/api';

// Helper to run sqlite query using system CLI (removes dependency on npm sqlite3 module at root)
function runQuery(query) {
  try {
    execSync(`sqlite3 "${DB_PATH}" "${query}"`);
  } catch (err) {
    console.error(`Database error running: ${query}`, err.message);
  }
}

// Reset database using database.js
function resetDB() {
  console.log('Resetting SUT database to original seed state...');
  execSync('node eshop-sut/backend/database.js', { stdio: 'ignore' });
}

async function runTests() {
  try {
    resetDB();

    // Login to get JWT Token for User 2 (test@eshop.com)
    console.log('\nLogging in to obtain JWT Token for Test User...');
    const loginRes = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@eshop.com',
        password: 'Test1234!'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('JWT Token retrieved successfully.\n');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // TC-BVA-01
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-01] total_amount = 300,000 (Exactly minimum threshold)');
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'SAVE10',
          total_amount: 300000,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-02
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-02] total_amount = 299,999 (Slightly below threshold)');
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'SAVE10',
          total_amount: 299999,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-03
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-03] total_amount = 300,001 (Slightly above threshold)');
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'SAVE10',
          total_amount: 300001,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-04
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-04] usage = 1 of VIP100 (Limit is 2) - total_amount = 500,000 (Nominal)');
    runQuery("DELETE FROM coupon_usage;");
    runQuery("INSERT INTO coupon_usage (user_id, coupon_id, used_at) VALUES (2, 3, datetime('now'));");
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'VIP100',
          total_amount: 500000,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-05
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-05] usage = 2 of VIP100 (Limit is 2) - total_amount = 500,000 (Nominal)');
    runQuery("INSERT INTO coupon_usage (user_id, coupon_id, used_at) VALUES (2, 3, datetime('now'));"); // Now 2 usages
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'VIP100',
          total_amount: 500000,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-06
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-06] Expiry check: 10s before expiration (valid)');
    runQuery("UPDATE coupons SET expired_at = datetime('now', '+7 hours', '+10 seconds') WHERE code = 'SAVE10';");
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'SAVE10',
          total_amount: 500000,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }

    // TC-BVA-07
    console.log('--------------------------------------------------');
    console.log('[TC-BVA-07] Expiry check: 1s after expiration (expired)');
    runQuery("UPDATE coupons SET expired_at = datetime('now', '+7 hours', '-1 second') WHERE code = 'SAVE10';");
    {
      const res = await fetch(`${BASE_URL}/apply-coupon`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: 'SAVE10',
          total_amount: 500000,
          user_id: 2
        })
      });
      console.log(`HTTP Status: ${res.status}`);
      console.log('Response:', await res.text());
    }
    console.log('--------------------------------------------------\n');

    // Restore database seeds at the end
    resetDB();
    console.log('All tests completed successfully. Database restored to seed state.');

  } catch (error) {
    console.error('Error running test script:', error);
  }
}

runTests();
