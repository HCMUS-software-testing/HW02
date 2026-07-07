# HW02 Action Plan - Domain Testing & Boundary Value Analysis

## 1. Senior QA Review of Current Preparation

Your preparation is directionally strong: the selected features cover all required pools, the workflow separates AI generation from human review, and you already prepared reusable prompts/skills. The main risks to fix before execution are:

- The plan must map every activity to the homework rubric and submission evidence, not only to "generate test cases".
- The current Agent Skills are useful but need clearer input contracts, checkpoint rules, output schemas, and anti-hallucination rules.
- Each feature report must show the testing technique step by step: variables, equivalence classes, representative values, combination matrix, BVA values, final test cases, execution result, bugs, and AI gap analysis.
- AI Audit must record tool name, date/time, user prompts, and AI outputs. A short summary alone is not enough unless the raw output is referenced or attached.
- Git commits must prove the process for each feature, not just the final report.
- Bug evidence must exist in both Markdown and GitHub Issues, with screenshots.

This revised plan is designed to reduce grading risk and make the submission defensible in an oral defense.

## 1.1. Interpretation of AI-First and Human Review

For this homework, "AI-first" means using AI as a disciplined assistant to apply the testing techniques taught in class. It does not mean AI must automatically operate the web/mobile application, decide every oracle, or file bugs without human verification.

The intended workflow is:

1. AI helps analyze requirements, variables, equivalence classes, boundary values, representative values, and candidate test cases.
2. The student reviews and corrects each AI output before moving to the next step.
3. The student executes or verifies the final test cases on the SUT.
4. The student records actual results, confirms whether failures are real bugs, captures screenshots, and logs GitHub Issues.
5. AI usage, AI mistakes, and human corrections are documented in the AI Audit Report and AI Gap Analysis.

AI-driven UI automation, Playwright scripts, visual testing tools, or AI agents that operate the web UI are optional supporting materials. They are not required by the HW02 statement unless the student chooses to add them. If used, their results still need human review because AI-generated tests can suffer from a test oracle problem: the tool may know how to generate inputs or actions but may not reliably know the correct expected result.

## 1.2. Theory Alignment

| Source                 | Requirement / Principle                                                                       | How this plan satisfies it                                                                                |
| :--------------------- | :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| Domain Testing lecture | Identify input and output variables                                                           | Each feature starts with requirement/rule extraction and records input plus output/state variables        |
| Domain Testing lecture | Identify valid and invalid equivalence classes                                                | `domain_testing` requires valid/invalid partitions and rationale                                          |
| Domain Testing lecture | Select best representatives                                                                   | `domain_testing` requires concrete representative values before test cases                                |
| Domain Testing lecture | For valid classes, cover as many valid ECs as possible                                        | Combination matrix includes positive scenarios with valid partitions                                      |
| Domain Testing lecture | For invalid classes, cover one invalid class at a time                                        | The plan and skill use Single Fault Assumption                                                            |
| Domain Testing lecture | Ordered fields typically use boundary values                                                  | `bva_testing` derives min/min-1/min+1/max/max+1 values where applicable                                   |
| ISTQB CT-AI Chapter 11 | AI can assist test case generation                                                            | Agent Skills generate structured candidate test cases                                                     |
| ISTQB CT-AI Chapter 11 | AI-generated tests may have a test oracle problem                                             | Human review and manual/verified execution are mandatory                                                  |
| ISTQB CT-AI Chapter 11 | Some activities are less suitable for AI, such as clarifying ambiguity and specifying oracles | The workflow keeps ambiguity resolution, final expected results, and bug confirmation under human control |

## 2. Assignment Requirements Checklist

| Requirement                              | Evidence to Prepare                              | Status  |
| :--------------------------------------- | :----------------------------------------------- | :------ |
| Select 4 features, one from each pool    | Feature list in README and main report           | Planned |
| Domain Testing for each feature          | Step-by-step domain analysis and test cases      | Planned |
| Boundary Value Analysis for each feature | Boundary table and BVA test cases                | Planned |
| AI-first strategy with human review      | Agent Skill demo, checkpoints, AI audit log      | Planned |
| AI gap analysis                          | Per-feature "AI Gap Analysis" section            | Planned |
| Bug report                               | Markdown bug table + GitHub Issues + screenshots | Planned |
| AI Audit Report                          | Declaration + interaction logs                   | Planned |
| AI Critique                              | 200-300 word critique                            | Planned |
| Git commit log                           | `git_commit_log.txt`                             | Planned |
| README                                   | Self-assessment table, test summary, video links | Planned |
| PDF copies                               | PDF export of required Markdown reports          | Planned |

## 3. Feature Scope

| Pool | Feature                           | Surface    | Suggested Focus                                                    |
| :--- | :-------------------------------- | :--------- | :----------------------------------------------------------------- |
| A    | FR-04 Personal profile management | Web/API    | Name, phone, shipping address, auth state                          |
| B    | FR-08 Checkout                    | Web/API    | Cart state, total amount, shipping address, auth state             |
| C    | FR-15 Product management CRUD     | Admin/API  | Product name, price, description, image URL, category, permissions |
| D    | FR-06 Mobile product detail view  | Mobile/API | Product ID, loading states, unavailable product, display data      |

## 4. Workspace Structure

```text
HW02/
├── README.md
├── HW02_Action_Plan.md
├── FR04_Profile/
│   └── Test_Report.md
├── FR08_Checkout/
│   └── Test_Report.md
├── FR15_Product_Admin/
│   └── Test_Report.md
├── FR06_Mobile_Product/
│   └── Test_Report.md
├── Bugs_Screenshots/
├── Agent_Skills/
│   ├── README.md
│   ├── Domain_Testing_Prompt.md
│   ├── BVA_Prompt.md
│   └── Audit_Extraction_Prompt.md
├── .agents/
│   └── skills/
│       ├── domain_testing/SKILL.md
│       ├── bva_testing/SKILL.md
│       └── audit_extraction/SKILL.md
├── AI_Reports/
│   ├── AI_Audit_Report.md
│   └── AI_Critique.md
└── git_commit_log.txt
```

Do not include the full EShop source code in the final submission zip unless the lecturer explicitly asks for it. Keep the submission focused on reports, evidence, screenshots, skills, videos, and logs.

## 5. Execution Workflow for Each Feature

Repeat the following workflow for FR-04, FR-08, FR-15, and FR-06.

### Step 1 - Requirement and Rule Extraction

Inputs:

- Feature name and pool.
- UI behavior observed in the SUT.
- API specification, if relevant.
- Any known business rules from the source, only if used as supporting evidence.

Outputs:

- Feature scope.
- In-scope and out-of-scope notes.
- Preconditions and test environment.
- Input and output variables.
- Explicit and implicit business rules.

Commit example:

```text
Analyze requirements and variables for FR-04
```

### Step 2 - Domain Testing Analysis

Use `domain_testing` skill or `Domain_Testing_Prompt.md`.

Required outputs:

- Valid equivalence partitions.
- Invalid equivalence partitions.
- Rationale for each partition.
- Representative values.
- Combination matrix.
- Final domain test cases.

Quality rules:

- Use Single Fault Assumption for invalid partitions unless interaction between fields is the point of the test.
- Separate positive, negative, auth/permission, and state-related scenarios.
- Do not accept AI output until you review missing variables and unrealistic expected results.

Commit example:

```text
Define domain partitions and matrix for FR-04
```

### Step 3 - Boundary Value Analysis

Use `bva_testing` skill or `BVA_Prompt.md`.

Required outputs:

- Boundary variables only: numeric ranges, string length, date/time, quantity, amount, list size, ID existence, status transitions.
- Min-1, min, min+1, nominal, max-1, max, max+1 where applicable.
- BVA test cases with other variables kept nominal.

Quality rules:

- If no explicit max exists, state "No explicit upper boundary found" and use exploratory stress values separately, not as formal BVA.
- Distinguish UI validation, API validation, and database/system behavior.
- For mobile view, include ID not found, missing image, long text display, and loading/error states when observable.

Commit example:

```text
Add BVA analysis and cases for FR-04
```

### Step 4 - Test Execution and Bug Reporting

Required outputs:

- Execution status for each test case: Pass, Fail, Blocked, or Not Executed.
- Actual result for every failed case.
- Bug report in Markdown.
- GitHub Issue link for each bug.
- Screenshot path or attachment reference.

Bug report minimum fields:

- Bug ID/title.
- Feature.
- Severity and priority.
- Environment.
- Preconditions.
- Steps to reproduce.
- Expected result.
- Actual result.
- Screenshot/evidence.
- GitHub Issue link.

Commit example:

```text
Execute FR-04 tests and document bugs
```

### Step 5 - AI Gap Analysis

For each feature, write a short but concrete analysis:

- What AI missed.
- Why it missed it: weak prompt, missing context, model assumption, feature complexity, or SUT-specific behavior.
- How human review corrected it.
- What test case or bug was added manually.

Commit example:

```text
Add AI gap analysis for FR-04
```

## 6. Agent Skills Demo Plan

Demo one complete feature end to end, preferably FR-04 because it is compact and easy to explain.

Video must show:

- The skill file or prompt being used.
- Input feature description.
- AI producing Step 1 output.
- Human checkpoint review and correction.
- AI producing matrix/test cases only after approval.
- BVA workflow with at least one reviewed boundary table.
- Final output copied into the report.

Recommended video sections:

1. Start: state feature and objective.
2. Domain skill Step 1: variables and partitions.
3. Human review: point out at least one correction or confirmation.
4. Domain skill Step 2/3: matrix and test cases.
5. BVA skill: boundary table and BVA cases.
6. Close: show report section and mention AI audit.

Commit example:

```text
Add Agent Skills demo video link
```

## 7. AI Audit and Critique

### AI Audit Report

Start with the required declaration:

```text
I use AI tools for the following tasks:
```

For each interaction, record:

- AI tool/model name.
- Date and time.
- Task description.
- Prompt used.
- AI output or concise output summary with a reference to the generated section/file.
- Human review notes and corrections.

### AI Critique

Write 200-300 words. Address:

- Where AI was wrong, biased, incomplete, or overconfident.
- Why the issue happened.
- What principle you learned about collaborating with AI in testing.

Commit example:

```text
Complete AI audit report and critique
```

## 8. README and Final Submission

README must include:

- Student information.
- Selected feature table.
- Self-assessment table from the assignment.
- Test summary: number of features, designed/executed/passed/failed/not executed test cases, bugs.
- Links to demo videos.
- Link or reference to GitHub Issues.
- Submission contents checklist.

Final commands:

```text
git log --oneline > git_commit_log.txt
```

Export PDF copies of the main report, AI Audit Report, AI Critique, and any required feature reports.

Zip naming format:

```text
<StudentID>_HW02_AI_DomainTesting_<SelfAssessedGrade>.zip
```

Example:

```text
23127205_HW02_AI_DomainTesting_090.zip
```

## 9. Definition of Done

A feature is done only when:

- Domain variables, partitions, representative values, matrix, and domain test cases are complete.
- BVA table and BVA test cases are complete.
- Test execution result is recorded.
- Bugs are logged in Markdown and GitHub Issues with screenshots.
- AI gap analysis is written.
- Related AI interactions are recorded in AI Audit Report.
- A clear Git commit exists for each major step.

The whole assignment is done only when:

- All four features are complete.
- README has self-assessment and test summary.
- AI Audit and AI Critique are complete.
- Agent Skills and demo video links are included.
- Git log is exported.
- Markdown and PDF versions are present.
- Zip filename follows the required format.
