---
name: applying-domain-testing
description: Use when designing Domain Testing, equivalence partitioning, equivalence classes, boundary value analysis, or EP/BVA test cases for a single function, API endpoint, form, feature, or input-validation rule.
---

# Applying Domain Testing

## Overview

Use this skill to produce reusable, step-by-step Domain Testing output for one function at a time. Treat Domain Testing as stratified sampling: partition huge input/output domains into equivalence classes, then choose representatives, especially boundary values for ordered fields.

## Workflow

1. State the function under test, scope, assumptions, and any missing constraints. Do not invent hidden requirements; mark them as assumptions.
2. Identify inputs and outputs from the specification, code, API contract, or UI behavior.
3. Convert each input rule into conditions. Include type, required/optional, format, range, membership set, uniqueness, state, and cross-field constraints.
4. Build equivalence partitions. For a range, create one valid class plus lower-than-min and higher-than-max invalid classes. For a set where values behave differently, create one valid class per value plus invalid class(es). For a must-be rule, create one valid and one invalid class. Split any class that may be handled differently.
5. Number classes as `EC01`, `EC02`, etc. Include input/output, condition, class description, valid/invalid, representative value, and expected result.
6. Design EP test cases. Cover as many valid classes as possible in a single valid test. For invalid tests, isolate one invalid class while all unrelated inputs use nominal valid values.
7. Apply BVA only to ordered/numeric/date/length/count fields. Test `min-1`, `min`, `min+1`, nominal, `max-1`, `max`, `max+1` when both bounds exist. For one-sided bounds, test just outside, on, and just inside the boundary.
8. Trace every test case back to `ECxx` or a named boundary. Mark not-executed tests honestly if execution is outside scope.
9. Add AI gap analysis notes: likely missed cases, ambiguity from prompt/spec, and human review needed.

## Output Format

### A. Equivalent Partitioning

#### A1. Inputs and Outputs

| Type | Name | Description |
| --- | --- | --- |
| Input | `<input>` | `<meaning/rule source>` |
| Output | `<output>` | `<success/error/state>` |

#### A2. Conditions

| Code | Input/Output | Condition |
| --- | --- | --- |
| C1 | `<field>` | `<rule>` |

#### A3. Equivalence Classes

| EC | Input/Output | Equivalence Class | Valid? | Representative | Expected Result |
| --- | --- | --- | --- | --- | --- |
| EC01 | `<field>` | `<class description>` | Yes/No | `<value>` | `<expected>` |

#### A4. EP Test Cases

| TC | Purpose | Test Data | Covered Classes | Expected Result |
| --- | --- | --- | --- | --- |
| TC01 | `<valid/invalid focus>` | `<values>` | EC01, EC02 | `<expected>` |

### B. Boundary Value Analysis

#### B1. Boundary Candidates

| Field | Boundary Rule | Boundary Values |
| --- | --- | --- |
| `<field>` | `<min/max/length/date/count>` | `<min-1, min, min+1...>` |

#### B2. BVA Test Cases

| TC | Field | Boundary Tested | Test Data | Expected Result |
| --- | --- | --- | --- | --- |
| BV01 | `<field>` | `<min-1/min/min+1>` | `<values>` | `<expected>` |

## Quality Checks

- Every input and output from the function appears in A1.
- Every condition has at least one valid or invalid `ECxx`.
- Invalid EP test cases isolate exactly one invalid class unless documenting an intentional interaction test.
- BVA is not forced onto unordered enums; use EP for those.
- Boundary dates state the reference date explicitly.
- Expected results are observable, not vague phrases like "works correctly".
