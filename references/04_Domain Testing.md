# Software Testing: Domain Testing

Tran Duy Hoang

## Domain Testing

- Equivalence partitioning, equivalence analysis, boundary analysis.
- Fundamental question or goal:
  - There are too many test cases for anyone to run.
  - Domain testing is a stratified sampling strategy that provides a rationale for selecting a few test cases from a huge population.

In domain testing, we partition a domain into sub-domains, also called equivalence classes, and then test using values from each sub-domain.

## General Approach

Domain testing has 4 steps:

1. Identify input and output variables.
2. Identify equivalence classes for each input and output.
3. Find a best representative for each subset.
4. Use boundary values as the best representatives for ordered fields.

For step 2, divide the set of possible values, or domain, of the field into subsets. These subsets are sub-domains or equivalence classes.

## Step 1: Identify Input and Output

Identification is based on the program specification.

Example: the program adds 2 numbers.

- Input:
  - `A`
  - `B`
- Output:
  - `SUM`
  - Error message: `Invalid Input`

## Step 2: Identify Equivalence Classes

Two tests belong to the same equivalence class if the expected result of each is the same.

Executing multiple test cases of the same equivalence class is, by definition, redundant testing.

Equivalence classes are based on input and output conditions:

- Valid equivalence classes represent valid inputs.
- Invalid equivalence classes represent invalid inputs.

| Condition | Valid Equivalence Classes | Invalid Equivalence Classes |
| --- | --- | --- |
| Has 1 or 2 digits | `-99 <= Number <= 99` | `< -99` or `> 99` |
| Is a number | Is a number | Not a number |
| Output | `SUM` | `Invalid Input` |

Identifying equivalence classes is a heuristic process.

## Complete Set of Partitions

| ID | Input / Output | Equivalence Class |
| --- | --- | --- |
| EC1 | A | `-99 <= A <= 99` |
| EC2 | A | `A < -99` |
| EC3 | A | `A > 99` |
| EC4 | A | `A is not an integer` |
| EC5 | B | `-99 <= B <= 99` |
| EC6 | B | `B < -99` |
| EC7 | B | `B > 99` |
| EC8 | B | `B is not an integer` |
| EC9 | SUM | `= A + B` |
| EC10 | SUM | Error message |

## Guidelines

### Range of Values

If an input condition specifies a range of values, identify:

- One valid equivalence class.
- Two invalid equivalence classes.

Example: "the item count can be from 1 to 999".

- Valid: `1 <= count <= 999`
- Invalid:
  - `count < 1`
  - `count > 999`

### Set of Input Values

If an input condition specifies a set of input values and each value may be handled differently by the program:

- Identify one valid equivalence class for each value.
- Identify one invalid equivalence class.

Example: "type of vehicle must be BUS, TRUCK, TAXI-CAB, PASSENGER, or MOTORCYCLE".

- Valid classes:
  - `BUS`
  - `TRUCK`
  - `TAXI-CAB`
  - `PASSENGER`
  - `MOTORCYCLE`
- Invalid class:
  - `TRAILER`

### Must-Be Situation

If an input condition specifies a "must be" situation, identify:

- One valid equivalence class.
- One invalid equivalence class.

Example: "first character of the identifier must be a letter".

- Valid: it is a letter.
- Invalid: it is not a letter.

### Splitting Classes

If there is any reason to believe that elements in an equivalence class are not handled identically by the program, split the equivalence class into two or more smaller equivalence classes.

## Example: Positive Integer Less Than 100

Input: enter a positive integer less than 100.

Condition C1: is an integer.

- EC1: is an integer, valid.
- EC2: not an integer, invalid.

Condition C2: `(0, 100)`.

- EC3: `0 < x < 100`, valid.
- EC4: `x <= 0`, invalid.
- EC5: `x >= 100`, invalid.

Valid class:

- Is an integer and `0 < x < 100`.

Invalid classes:

- Is an integer and `x <= 0`.
- Is an integer and `x >= 100`.
- Not an integer.

## Example: String of 7 Characters

Input: a string of 7 characters. The first character must be upper-case.

Valid class:

- Length is 7 and the first character is upper-case.

Invalid classes:

- Length is 7 and the first character is lower-case.
- Length is less than 7.
- Length is greater than 7.

## Example: Coordinate Point

Input: coordinate point `(X, Y)`.

Constraints:

- `3 <= X <= 7`
- `5 <= Y <= 9`

Valid class:

- `3 <= X <= 7` and `5 <= Y <= 9`.

Invalid classes:

- `X < 3`
- `X > 7`
- `Y < 5`
- `Y > 9`

## Example: Widget Identifier

The module allows a user to enter new widget identifiers into a widget database.

The input specification states that a widget identifier should:

- Consist of 3 to 15 alphanumeric characters.
- Have the first two characters as letters.

### Input Conditions

1. It must consist of alphanumeric characters.
2. The total number of characters must be between 3 and 15.
3. The first two characters must be letters.

### Equivalence Classes

Condition 1: must be alphanumeric characters.

- EC1: the widget identifier is alphanumeric, valid.
- EC2: the widget identifier is not alphanumeric, invalid.

Condition 2: allowed length is 3 to 15 characters.

- EC3: the widget identifier has between 3 and 15 characters, valid.
- EC4: the widget identifier has less than 3 characters, invalid.
- EC5: the widget identifier has greater than 15 characters, invalid.

Condition 3: first two characters must be letters.

- EC6: the first 2 characters are letters, valid.
- EC7: the first 2 characters are not letters, invalid.

Combined valid class:

- The widget identifier is alphanumeric, has between 3 and 15 characters, and the first 2 characters are letters.

Combined invalid classes:

- The widget identifier is not alphanumeric.
- The widget identifier has less than 3 characters.
- The widget identifier has greater than 15 characters.
- The first 2 characters are not letters.

## Step 3: Selecting Test Cases

- Choose at least one test case from each equivalence class.
- For valid classes, choose test cases that cover as many valid equivalence classes as possible until all valid classes have been covered.
- For invalid classes, choose test cases so that each covers one and only one invalid class until all invalid classes are covered.

## Test Cases Providing Coverage of Partitions

| Partition Tested | Input 1 (A) | Input 2 (B) | Expected Output |
| --- | ---: | ---: | --- |
| EC1: `-99 <= A <= 99` | `10` | `9` | `19` |
| EC2: `A < -99` | `-102` | `9` | `Invalid Input` |
| EC3: `A > 99` | `102` | `9` | `Invalid Input` |
| EC4: `A is not an integer` | `Abc` | `9` | `Invalid Input` |
| EC5: `-99 <= B <= 99` | `10` | `9` | `19` |
| EC6: `B < -99` | `10` | `-200` | `Invalid Input` |
| EC7: `B > 99` | `10` | `200` | `Invalid Input` |
| EC8: `B is not an integer` | `10` | `1.25` | `Invalid Input` |
| EC9: `SUM = A + B` | `10` | `9` | `19` |
| EC10: `Invalid Input` | `-102` | `9` | `Invalid Input` |

## Minimum Set of Test Cases

| Test Case | Partitions Tested | Input 1 (A) | Input 2 (B) | Expected Output |
| --- | --- | ---: | ---: | --- |
| TC1 | EC1: `-99 <= A <= 99`; EC5: `-99 <= B <= 99`; EC9: `SUM = A + B` | `10` | `9` | `19` |
| TC2 | EC2: `A < -99`; EC10: `Invalid Input` | `-102` | `9` | `Invalid Input` |
| TC3 | EC3: `A > 99` | `102` | `9` | `Invalid Input` |
| TC4 | EC4: `A is not an integer` | `Abc` | `9` | `Invalid Input` |
| TC5 | EC6: `B < -99` | `10` | `-200` | `Invalid Input` |
| TC6 | EC7: `B > 99` | `10` | `200` | `Invalid Input` |
| TC7 | EC8: `B is not an integer` | `10` | `1.25` | `Invalid Input` |

## Step 4: Boundary Value Analysis

Programs are more likely to fail at boundaries.

Example program design:

- `INPUT < 10`: result is error message.
- `10 <= INPUT < 25`: result is `Print "hello"`.
- `25 >= INPUT`: result is error message.

Some error types:

- Inequalities are mis-specified.
  - Example: `INPUT <= 25` instead of `INPUT < 25`.
  - This can be detected only at the boundary.
- Boundary values are mistyped.
  - Example: `INPUT < 52`, a transposition error.
  - This can be detected at the boundary and at any other value that is handled incorrectly.

## Boundary or Non-Boundary?

- Boundary values, such as testing at `25`, can catch all two example errors.
- Non-boundary values, such as `53`, may catch none of the two example errors.

## Boundary Value Analysis Model

For each equivalence class partition, there are at most 9 test cases to execute.

Each identified equivalence class represents a specific risk that it may pose.

Important values around a partition include:

- Smallest possible value allowed through the UI.
- Largest possible value allowed through the UI.
- Lower boundary (`LB`).
- `LB - 1`.
- `LB + 1`.
- Upper boundary (`UB`).
- `UB - 1`.
- `UB + 1`.
- Representative values inside and outside the valid partition.

## Boundary Value Test Cases

| Test Case | Partition Tested | Input 1 (A) | Input 2 (B) | Expected Output |
| --- | --- | ---: | ---: | --- |
| TC1 | `A < -99` | `-100` | `9` | `Invalid Input` |
| TC2 | `-99 <= A <= 99` | `-99` | `9` | `90` |
| TC3 | `-99 <= A <= 99` | `-98` | `9` | `89` |
| TC4 | `-99 <= A <= 99` | `98` | `9` | `107` |
| TC5 | `-99 <= A <= 99` | `99` | `9` | `108` |
| TC6 | `A > 99` | `100` | `9` | `Invalid Input` |
| TC7 | `B < -99` | `-10` | `-100` | `Invalid Input` |
| TC8 | `-99 <= B <= 99` | `10` | `-99` | `89` |
| TC9 | `-99 <= B <= 99` | `10` | `-98` | `88` |
| TC10 | `-99 <= B <= 99` | `10` | `98` | `108` |
| TC11 | `-99 <= B <= 99` | `10` | `99` | `109` |
| TC12 | `B > 99` | `10` | `100` | `Invalid Input` |

## Strengths and Weaknesses

### Strengths

- Finds high-probability errors with a relatively small set of tests.
- Uses an intuitively clear approach that is easy to teach and understand.
- Extends well to multi-variable situations.

### Blind Spots and Weaknesses

- May miss errors that are not at boundaries or in obvious special cases.
- Actual domains are often unknowable.
