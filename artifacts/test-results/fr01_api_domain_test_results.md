# FR-01 Đăng ký tài khoản - Kết quả thực thi API

- Nguồn thiết kế testcase: `domain-testing/FR-01_account_registration_domain_testing.md`
- Bề mặt thực thi: `POST /api/register` trên backend local `http://localhost:3000`
- Tổng số testcase: 52
- Passed: 21
- Failed: 31

| TC | Kết quả mong đợi | Actual HTTP | Actual Response | Status |
| --- | --- | --- | --- | --- |
| EP-FR01-001 | Accept | 200 | `{"message":"User registered successfully","id":3}` | PASS |
| EP-FR01-002 | Accept | 200 | `{"message":"User registered successfully","id":4}` | PASS |
| EP-FR01-003 | Reject | 200 | `{"message":"User registered successfully","id":5}` | FAIL |
| EP-FR01-004 | Reject | 200 | `{"message":"User registered successfully","id":6}` | FAIL |
| EP-FR01-005 | Reject | 200 | `{"message":"User registered successfully","id":7}` | FAIL |
| EP-FR01-006 | Reject | 200 | `{"message":"User registered successfully","id":8}` | FAIL |
| EP-FR01-007 | Reject | 200 | `{"message":"User registered successfully","id":9}` | FAIL |
| EP-FR01-008 | Reject | 200 | `{"message":"User registered successfully","id":10}` | FAIL |
| EP-FR01-009 | Reject | 200 | `{"message":"User registered successfully","id":11}` | FAIL |
| EP-FR01-010 | Reject | 200 | `{"message":"User registered successfully","id":12}` | FAIL |
| EP-FR01-011 | Reject | 200 | `{"message":"User registered successfully","id":13}` | FAIL |
| EP-FR01-012 | Reject | 200 | `{"message":"User registered successfully","id":14}` | FAIL |
| EP-FR01-013 | Reject | 200 | `{"message":"User registered successfully","id":15}` | FAIL |
| EP-FR01-014 | Reject | 200 | `{"message":"User registered successfully","id":16}` | FAIL |
| EP-FR01-015 | Reject | 200 | `{"message":"User registered successfully","id":17}` | FAIL |
| EP-FR01-016 | Reject | 200 | `{"message":"User registered successfully","id":18}` | FAIL |
| EP-FR01-017 | Reject | 200 | `{"message":"User registered successfully","id":19}` | FAIL |
| EP-FR01-018 | Reject | 200 | `{"message":"User registered successfully","id":20}` | FAIL |
| EP-FR01-019 | Reject | 200 | `{"message":"User registered successfully","id":21}` | FAIL |
| EP-FR01-020 | Reject | 200 | `{"message":"User registered successfully","id":22}` | FAIL |
| EP-FR01-021 | Accept | 200 | `{"message":"User registered successfully","id":23}` | PASS |
| EP-FR01-022 | Accept | 200 | `{"message":"User registered successfully","id":24}` | PASS |
| EP-FR01-023 | Accept | 200 | `{"message":"User registered successfully","id":25}` | PASS |
| EP-FR01-024 | Accept | 200 | `{"message":"User registered successfully","id":26}` | PASS |
| EP-FR01-025 | Accept | 200 | `{"message":"User registered successfully","id":27}` | PASS |
| EP-FR01-026 | Accept | 200 | `{"message":"User registered successfully","id":28}` | PASS |
| BV-FR01-001 | Reject | 200 | `{"message":"User registered successfully","id":29}` | FAIL |
| BV-FR01-002 | Accept | 200 | `{"message":"User registered successfully","id":30}` | PASS |
| BV-FR01-003 | Reject | 200 | `{"message":"User registered successfully","id":31}` | FAIL |
| BV-FR01-004 | Reject | 200 | `{"message":"User registered successfully","id":32}` | FAIL |
| BV-FR01-005 | Accept | 200 | `{"message":"User registered successfully","id":33}` | PASS |
| BV-FR01-006 | Reject | 200 | `{"message":"User registered successfully","id":34}` | FAIL |
| BV-FR01-007 | Accept | 200 | `{"message":"User registered successfully","id":35}` | PASS |
| BV-FR01-008 | Accept | 200 | `{"message":"User registered successfully","id":36}` | PASS |
| BV-FR01-009 | Reject | 200 | `{"message":"User registered successfully","id":37}` | FAIL |
| BV-FR01-010 | Accept | 200 | `{"message":"User registered successfully","id":38}` | PASS |
| BV-FR01-011 | Accept | 200 | `{"message":"User registered successfully","id":39}` | PASS |
| BV-FR01-012 | Reject | 200 | `{"message":"User registered successfully","id":40}` | FAIL |
| BV-FR01-013 | Accept | 200 | `{"message":"User registered successfully","id":41}` | PASS |
| BV-FR01-014 | Accept | 200 | `{"message":"User registered successfully","id":42}` | PASS |
| BV-FR01-015 | Reject | 200 | `{"message":"User registered successfully","id":43}` | FAIL |
| BV-FR01-016 | Accept | 200 | `{"message":"User registered successfully","id":44}` | PASS |
| BV-FR01-017 | Accept | 200 | `{"message":"User registered successfully","id":45}` | PASS |
| BV-FR01-018 | Reject | 200 | `{"message":"User registered successfully","id":46}` | FAIL |
| BV-FR01-019 | Accept | 200 | `{"message":"User registered successfully","id":47}` | PASS |
| BV-FR01-020 | Accept | 200 | `{"message":"User registered successfully","id":48}` | PASS |
| BV-FR01-021 | Reject | 200 | `{"message":"User registered successfully","id":49}` | FAIL |
| BV-FR01-022 | Reject | 200 | `{"message":"User registered successfully","id":50}` | FAIL |
| BV-FR01-023 | Accept | 200 | `{"message":"User registered successfully","id":51}` | PASS |
| BV-FR01-024 | Reject | 200 | `{"message":"User registered successfully","id":52}` | FAIL |
| BV-FR01-025 | Reject | 200 | `{"message":"User registered successfully","id":53}` | FAIL |
| BV-FR01-026 | Reject | 200 | `{"message":"User registered successfully","id":54}` | FAIL |

## Ghi chú

- Các testcase UI có `confirmPassword` được gửi qua API để kiểm tra khả năng backend tự validate khi client-side validation bị bypass.
- Với oracle domain testing, testcase expected Reject nhưng API vẫn trả `200` được ghi `FAIL`.
