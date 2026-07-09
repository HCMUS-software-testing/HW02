# Main Report Writeback

Use this reference only after the user has approved the final BVA step for a feature.

## Trigger

Write to `HW02/Main_Report.md` when either condition is true:

- The user explicitly asks to write/update the main report after Step 3.
- The user approves Step 3 and previously requested automatic report writing.

Do not write after Step 1 or Step 2 approval.

## Feature Scope Guard

Before editing, resolve the active feature ID from the current user request or the feature context being processed.

- The active feature ID must be explicit, for example `FR-08`.
- Update exactly one feature block: the block whose heading contains that active feature ID.
- Do not update Pool C, Pool D, or any other feature unless that exact feature ID is the active feature ID in the current request.
- If the active feature ID is missing, ambiguous, or does not match exactly one heading in `HW02/Main_Report.md`, stop and ask the user before writing.
- A generic instruction such as "write main report" does not authorize updating multiple features.

## Target Section

For the active feature ID only, update only:

- `## n. FR-xx - <Feature Name>` feature overview if it is still `TODO` or clearly belongs to the same feature.
- `### n.3 Boundary Value Analysis`

Do not modify Domain Testing, AI Gap Analysis, other features, execution results, bug links, or unrelated report sections unless the user explicitly asks.

## Write Procedure

1. Read `HW02/Main_Report.md` before editing.
2. Resolve the active feature ID from the current context and confirm it appears in exactly one `##` feature heading.
3. Locate that exact feature heading, for example `## 5. FR-08 - Checkout`.
4. Locate the next major heading `## ` to define the feature block.
5. Inside only that feature block, replace only the content from `### n.3 Boundary Value Analysis` up to the next sibling heading, usually `### n.4 AI Gap Analysis`.
6. If the section is missing, insert `### n.3 Boundary Value Analysis` after Domain Testing in the same feature block.
7. Preserve existing actual execution data if it is already filled in and the new table has the same test case ID. Ask the user before overwriting non-`TODO` execution cells.
8. Write the file as valid UTF-8.

## Encoding Guard

Before finishing, verify the file does not contain mojibake markers:

- U+00C3 Latin capital A with tilde.
- U+00C4 Latin capital A with diaeresis.
- U+00C6 Latin capital AE.
- Broken Vietnamese byte sequences that look like lowercase `a` plus combining-looking fragments instead of readable Vietnamese.
- Broken examples such as the word `Xác` rendered as four or more Latin-1-looking characters, the word `Mã` rendered incorrectly, or the letter `đ` rendered as two Latin-1-looking characters.

If any marker exists, fix encoding before final response. Prefer UTF-8 read/write APIs. Avoid shell commands that reinterpret Vietnamese text through the active console code page.

## Final Response

Report the updated file path and section. Mention that execution columns remain `TODO` unless the user provided actual execution results.
