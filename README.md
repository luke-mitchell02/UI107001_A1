# UI107001_A1

Assessment 1 for Applied Algorithms and Data Structures.

JavaScript implementations of **Merge Sort**, **Binary Search**, **HashMap**, and **Binary Search Tree**, with Jest unit tests.

---

## Project Structure

```
├── UI107001_A1/
│   ├── Task 1/
│   │   ├── Tests/
│   │   │   ├── mergeSort.test.js         # Jest unit tests for Merge Sort
│   │   │   └── binarySearch.test.js      # Jest unit tests for Binary Search
│   │   ├── mergeSort.js                  # Merge Sort implementation
│   │   └── binarySearch.js               # Binary Search implementation    
│   └── Task 2/
│       ├── Tests/
│       │   ├── binarySearchTree.test.js  # Jest unit tests for Binary Search Tree
│       │   └── hashmap.test.js           # Jest unit tests for Hashmap
│       ├── hashmap.js                    # HashMap implementation
│       └── binarySearchTree.js           # Binary Search Tree implementation
├── package.json
└── README.md

https://tree.nathanfriend.com/
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