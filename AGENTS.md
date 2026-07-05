# Repository Guidelines

## Project Structure & Module Organization

This repository contains HW02 testing materials and the EShop system under test. Requirements live in `requirements/`. The SUT lives in `eshop-sut/` with four modules: `backend/` for the Node.js/Express API and SQLite database, `frontend-web/` for the customer React/Vite app, `frontend-admin/` for the admin React/Vite app, and `frontend-mobile/` for the Expo React Native app. Keep reports outside source modules, for example in `report/`, `artifacts/screenshots/`, and `artifacts/test-results/`.

## Build, Test, and Development Commands

Run shell commands through `rtk`, for example `rtk npm run build`.

- `cd eshop-sut/backend && npm install`: install API dependencies.
- `cd eshop-sut/backend && node database.js`: seed or reset the SQLite database.
- `cd eshop-sut/backend && node server.js`: start the API at `http://localhost:3000`.
- `cd eshop-sut/frontend-web && npm run dev`: start the customer web app, usually at `http://localhost:5173`.
- `cd eshop-sut/frontend-admin && npm run dev`: start the admin app, usually at `http://localhost:5174`.
- `cd eshop-sut/frontend-mobile && npm start`: start Expo for mobile testing.
- `npm run build` and `npm run lint`: available in both web and admin frontends.

## Coding Style & Naming Conventions

Use JavaScript/JSX conventions already present in each module. React components use PascalCase filenames such as `Register.jsx`; context files use descriptive names such as `AuthContext.jsx`. Prefer 2-space indentation in frontend files. Do not reformat unrelated files while preparing HW02 deliverables.

## Testing Guidelines

This assignment focuses on manual/API domain testing rather than automated unit tests. Use requirements as the oracle, not current SUT behavior. Record every executed case with ID, input domain, steps, expected result, actual result, status, and evidence path. Store screenshots in `artifacts/screenshots/` and API outputs or notes in `artifacts/test-results/`. If a case is not executed, mark it `Not executed`.

## Commit & Pull Request Guidelines

Existing commit history uses short imperative messages such as `setup` and `first commit`. Keep future commits concise and scoped, for example `add hw02 domain testing report`. Do not commit generated reports or SUT changes unless explicitly requested. Pull requests should summarize tested features, list failed cases and linked issues, include screenshots for UI bugs, and note any unexecuted coverage.

## Agent-Specific Instructions

Do not modify `eshop-sut` source code for documentation-only tasks. Avoid destructive git commands. Before staging or committing, check `git status` and confirm with the user.

For each user prompt session in this repository, add one AI audit entry before the final response. Use the repo-local skill at `.agents/skills/ai-audit-entry/SKILL.md` and run `rtk python3 .agents/skills/ai-audit-entry/scripts/append_ai_audit_entry.py` to append to `23127075_HW02_AI_DomainTesting_100/report/ai_audit_report.md`. Leave `Human Review/Corrections` and `Final Use in Submission` as manual placeholders for the user.
