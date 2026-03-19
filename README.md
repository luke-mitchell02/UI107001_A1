# UI107001_A1

Assessment 1 for Applied Algorithms and Data Structures.

This repository contains JavaScript implementations of two classic algorithms — **Merge Sort** and **Binary Search** — along with a Jest test suite covering a range of edge cases.

---

## Project Structure

```
UI107001_A1/
├── Task 1/
│   ├── mergeSort.js          # Merge Sort implementation
│   ├── binarySearch.js       # Binary Search implementation
│   └── algorithms.test.js    # Jest unit tests for both algorithms
├── package.json
└── README.md
```

---

## Algorithms

### Merge Sort — `Task 1/mergeSort.js`

**Function:** `sortArray(arr)`

Sorts an array of numbers using the merge sort algorithm.

- Recursively splits the array in half until each sub-array has a single element (the base case).
- Merges sub-arrays back together in sorted order by comparing elements from each half.
- Time complexity: **O(n log n)**

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `arr` | `number[]` | The array of numbers to sort |

**Returns:** A new sorted array of numbers.

**Throws:**
- `TypeError: "The input must be an array"` — if the argument is not an array.
- `TypeError: "The input must be an array of numbers"` — if the array contains non-number values (including `NaN`).

**Usage Example:**
```js
import sortArray from './Task 1/mergeSort.js';

sortArray([99, 33, 21, 69, 85]);   // → [21, 33, 69, 85, 99]
sortArray([-3, 5, -1, 0, 2]);      // → [-3, -1, 0, 2, 5]
sortArray([42]);                    // → [42]
sortArray([]);                      // → []
```

---

### Binary Search — `Task 1/binarySearch.js`

**Function:** `binarySearch(arr, target, start?, end?)`

Searches a **sorted** array for a target value and returns its index.

- Finds the middle element and compares it to the target.
- If the target is greater, the search continues on the right half; if less, on the left half.
- Repeats recursively until the target is found or the search space is exhausted.
- Time complexity: **O(log n)**

**Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `arr` | `any[]` | — | A sorted array to search |
| `target` | `any` | — | The value to search for |
| `start` | `number` | `0` | Start index (used internally for recursion) |
| `end` | `number` | `arr.length - 1` | End index (used internally for recursion) |

**Returns:** The index of the target in the array, or `-1` if not found.

> Note: The array must be sorted beforehand. If the array contains mixed types or the target is not a number (when searching a numeric array), the function returns `-1`.

**Example:**
```js
import binarySearch from './Task 1/binarySearch.js';

const sorted = [1, 9, 11, 21, 33, 69, 73, 74, 85, 99];

binarySearch(sorted, 21);       // → 3
binarySearch(sorted, 1);        // → 0
binarySearch(sorted, 99);       // → 9
binarySearch(sorted, 999);      // → -1
binarySearch([], 0);            // → -1
```

---

## Running the Tests

### Prerequisites

Assuming you have [Node.js](https://nodejs.org/) installed, install dependencies:

```bash
npm install
```

### Run all tests

```bash
npm test
```

This runs Jest via `node --experimental-vm-modules` (required for ES module support).

---

## Test Coverage

Tests are located in `Task 1/algorithms.test.js`.

### Merge Sort Tests

| # | Test Description |
|---|-----------------|
| 1 | Sorts a standard unsorted array of numbers |
| 2 | A single-element array is returned unchanged |
| 3 | An empty array is returned unchanged |
| 4 | Sorts an array with duplicate values |
| 5 | Sorts an array containing negative numbers |
| 6 | Throws an error when the array contains non-number values |
| 7 | Throws an error when the input is not an array |
| 8 | Correctly sorts a large dataset of 101 elements |

### Binary Search Tests

| # | Test Description |
|---|-----------------|
| 1 | Finds a target value in the middle of a large array |
| 2 | Finds a target value at the start of the array |
| 3 | Finds a target value at the end of the array |
| 4 | Finds a target value at the exact midpoint |
| 5 | Returns `-1` when the target is not in the array |
| 6 | Returns `-1` when the array is empty |
| 7 | Finds the target in a single-element array |
| 8 | Returns `-1` when the array contains non-number values |
| 9 | Returns `-1` when the target is not a number (`null`, `undefined`, `true`, string) |
| 10 | Finds a string target in a sorted array of strings |
