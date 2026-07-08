const fs = require("fs");
const http = require("http");
const path = require("path");

const repoRoot = path.resolve(__dirname, "../..");
const sourcePath = path.join(
  repoRoot,
  "domain-testing/FR-01_account_registration_domain_testing.md",
);
const jsonPath = path.join(__dirname, "fr01_api_domain_test_results.json");
const markdownPath = path.join(__dirname, "fr01_api_domain_test_results.md");

function decodeMarkdown(value) {
  return value
    .replace(/&#36;/g, "$")
    .replace(/&amp;/g, "&")
    .replace(/`/g, "")
    .trim();
}

function extractField(data, field) {
  const normalized = decodeMarkdown(data);
  const match = normalized.match(new RegExp(`${field}=([^;|]*)`));
  return match ? match[1] : undefined;
}

function extractBody(data) {
  const decoded = decodeMarkdown(data);
  const jsonMatch = decoded.match(/body\s+(\{.*\})/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1]);
  }

  return {
    name: extractField(data, "name"),
    email: extractField(data, "email"),
    password: extractField(data, "password"),
  };
}

function expectedAccepted(expected) {
  const normalized = decodeMarkdown(expected);
  return (
    normalized.includes("API trả200 OK") ||
    normalized.includes("Chấp nhận") ||
    normalized.startsWith("Tạo tài khoản mới")
  );
}

function postRegister(body) {
  const payload = JSON.stringify(body);

  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let responseBody = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          let parsed;
          try {
            parsed = responseBody ? JSON.parse(responseBody) : null;
          } catch {
            parsed = responseBody;
          }
          resolve({ statusCode: res.statusCode, body: parsed });
        });
      },
    );

    req.on("error", (error) => {
      resolve({ statusCode: 0, body: { error: error.message } });
    });

    req.write(payload);
    req.end();
  });
}

function parseRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\| (EP|BV)-FR01-\d+ \|/.test(line))
    .map((line) => {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim());

      if (cells[0].startsWith("EP-")) {
        return {
          tc: cells[0],
          focus: decodeMarkdown(cells[1]),
          data: cells[2],
          expected: decodeMarkdown(cells[4]),
          body: extractBody(cells[2]),
          expectedAccepted: expectedAccepted(cells[4]),
        };
      }

      return {
        tc: cells[0],
        focus: `${decodeMarkdown(cells[1])} - ${decodeMarkdown(cells[2])}`,
        data: cells[3],
        expected: decodeMarkdown(cells[4]),
        body: extractBody(cells[3]),
        expectedAccepted: expectedAccepted(cells[4]),
      };
    });
}

function toMarkdown(results) {
  const totals = results.reduce(
    (acc, result) => {
      acc.total += 1;
      acc[result.status] += 1;
      return acc;
    },
    { total: 0, PASS: 0, FAIL: 0 },
  );

  const lines = [
    "# FR-01 Đăng ký tài khoản - Kết quả thực thi API",
    "",
    `- Nguồn thiết kế testcase: \`domain-testing/FR-01_account_registration_domain_testing.md\``,
    "- Bề mặt thực thi: `POST /api/register` trên backend local `http://localhost:3000`",
    `- Tổng số testcase: ${totals.total}`,
    `- Passed: ${totals.PASS}`,
    `- Failed: ${totals.FAIL}`,
    "",
    "| TC | Kết quả mong đợi | Actual HTTP | Actual Response | Status |",
    "| --- | --- | --- | --- | --- |",
  ];

  for (const result of results) {
    const expected = result.expectedAccepted ? "Accept" : "Reject";
    const actualResponse = JSON.stringify(result.actual.body).replace(/\|/g, "\\|");
    lines.push(
      `| ${result.tc} | ${expected} | ${result.actual.statusCode} | \`${actualResponse}\` | ${result.status} |`,
    );
  }

  lines.push("");
  lines.push("## Ghi chú");
  lines.push("");
  lines.push(
    "- Các testcase UI có `confirmPassword` được gửi qua API để kiểm tra khả năng backend tự validate khi client-side validation bị bypass.",
  );
  lines.push(
    "- Với oracle domain testing, testcase expected Reject nhưng API vẫn trả `200` được ghi `FAIL`.",
  );

  return `${lines.join("\n")}\n`;
}

async function main() {
  const markdown = fs.readFileSync(sourcePath, "utf8");
  const testCases = parseRows(markdown);
  const results = [];

  for (const testCase of testCases) {
    const actual = await postRegister(testCase.body);
    const actualAccepted =
      actual.statusCode >= 200 &&
      actual.statusCode < 300 &&
      actual.body &&
      actual.body.message === "User registered successfully";

    results.push({
      ...testCase,
      actual,
      status: actualAccepted === testCase.expectedAccepted ? "PASS" : "FAIL",
    });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  fs.writeFileSync(markdownPath, toMarkdown(results));

  const pass = results.filter((result) => result.status === "PASS").length;
  const fail = results.length - pass;
  console.log(`Executed ${results.length} FR-01 API checks: ${pass} PASS, ${fail} FAIL`);
  console.log(`JSON: ${jsonPath}`);
  console.log(`Markdown: ${markdownPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
