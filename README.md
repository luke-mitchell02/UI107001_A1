# UI107001_A1

Assessment 1 for Applied Algorithms and Data Structures.

JavaScript implementations of **Merge Sort**, **Binary Search**, **HashMap**, and **Binary Search Tree**, with Jest unit tests.

---

## Project Structure

```
UI107001_A1/
├── Task 1/
│   ├── mergeSort.js            # Merge Sort implementation
│   ├── binarySearch.js         # Binary Search implementation
│   └── algorithms.test.js      # Jest unit tests for Task 1
├── Task 2/
│   ├── hashmap.js              # HashMap implementation
│   ├── binarySearchTree.js     # Binary Search Tree implementation
│   └── structures.test.js      # Jest unit tests for Task 2
├── package.json
└── README.md
```

---

## Prerequisites

[Node.js](https://nodejs.org/) must be installed.

Install dependencies:

```bash
npm install
```

---

## Running the Tests

Run all tests:

```bash
npm test
```

Run Task 1 tests only:

```bash
npm test -- "Task 1"
```

Run Task 2 tests only:

```bash
npm test -- "Task 2"
```