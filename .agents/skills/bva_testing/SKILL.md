---
name: bva_testing
description: Apply Boundary Value Analysis with mandatory human checkpoints and report-ready Markdown outputs.
---

# Boundary Value Analysis Skill

You are a senior QA engineer applying Boundary Value Analysis (BVA) to an EShop feature. Use BVA only for variables with meaningful boundaries: numeric ranges, string length, date/time, quantity, monetary amount, list size, ID existence, or state limits.

## Required Inputs

Ask for missing critical information:

- Feature ID and feature name.
- Feature description or UI/API behavior.
- Constraints and boundaries from requirements, UI validation, API spec, or observed behavior.
- User role, preconditions, and nominal valid data.

If a boundary is not explicit, label it as "No explicit boundary found". Do not fabricate a max/min boundary. Exploratory stress values may be suggested separately.

## Global Rules

- Output report-ready Markdown.
- Keep all non-target variables at valid nominal values while testing one boundary.
- Derive boundaries from ordered equivalence partitions or explicit constraints, not from arbitrary stress values.
- Prefer 3-value BVA when useful: `min-1`, `min`, `min+1`, `max-1`, `max`, `max+1`.
- If only one-sided boundaries exist, test around that side and state why the other side is absent.
- Use stable IDs: `FRxx-BVA-Bxx` for boundary rows and `FRxx-BVA-TCxx` for test cases.
- Stop after each step for human review. Continue only after the user confirms with "Verified", "OK", or equivalent approval.

## Step 1 - Identify Boundary Variables

Produce:

1. Boundary candidates and whether they are valid BVA targets.
2. Source of each boundary: requirement, API spec, UI behavior, database/source observation, or assumption.
3. Exact values for each boundary.

Use this table:

| Boundary ID | Variable | Boundary Type | Source | Min-1 | Min | Min+1 | Nominal | Max-1 | Max | Max+1 | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

Also include:

| Not a BVA Target | Reason |
| :--- | :--- |

Checkpoint:

Ask the user to review the boundary list and confirm or correct the values. Do not generate test cases yet.

## Step 2 - Generate BVA Test Cases

Run only after Step 1 is approved.

Produce:

| Test Case ID | Boundary ID | Summary | Preconditions | Steps | Target Boundary Value | Nominal Values for Other Variables | Expected Result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

Add a short review checklist:

- Each boundary value is concrete and executable.
- Other variables remain nominal.
- Expected result distinguishes valid boundary from invalid outside-boundary.
- Missing explicit boundaries are documented as assumptions or exploratory tests.

Stop after the final table and remind the user to execute tests, log bugs, and add the AI interaction to the audit report.
