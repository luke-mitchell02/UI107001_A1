# Technical Report

---

## 1. Implementations and Design Decisions

### 1.1 Merge Sort

Merge Sort is a 'divide and conquer' sorting algorithm. The implementation recursively splits the input array in half until each sub-array contains a single element, then merges the sub-arrays back together in sorted order by comparing elements from each half.

**Design decisions:**
- Input validation is performed upfront, throwing a `TypeError` if the argument is not an array, if the array contains unsupported types or mixed types. This safeguards the function from providing invalid or incorrect outputs. 
- The implementation accepts arrays which consist of only one type; either numbers or strings. JavaScript's `<=` operator compares strings lexicographically, so the same merge logic produces correct alphabetical ordering without any additional logic.
- The implementation returns a new array rather than sorting in place, which avoids mutating the caller's data.

---

### 1.2 Binary Search

Binary Search locates a target value within a sorted array. The implementation finds the midpoint of the current search range, compares it to the target value, then recurses on the left or right half depending on whether the target value is smaller or larger.

**Design decisions:**
- The function accepts optional `start` and `end` parameters to support internal recursion without requiring the caller to pass them.
- Input validation is performed upfront, throwing a `TypeError` if the argument is not an array, if the array contains unsupported or mixed types, or if the target type does not match the array element type.
- The function returns `-1` only when the target is not present in the array.
- The function requires a pre-sorted array to be provided; sorting can be done via mergeSort first.

---

### 1.3 HashMap

A HashMap stores key-value pairs using a hash function to map keys to indices in a fixed-size backing array. Each index holds a **bucket**, which is just an array of `[key, value]` pairs and handles collisions via **separate chaining**.

A hashmap is the equivalent of a JavaScript object or Python dictionary.

**Design decisions:**
- The backing array is initialised with 53 slots. I have used 53 as it's a prime number which distributes keys more evenly across buckets and reduces the likelihood of collisions.
- The hash function weights each character by its position (`charCodeAt(i) * (i + 1)`), so inputs like `"abc"` and `"cba"` produce different hashes.
- All keys are converted to strings with `String(key)` before hashing, so non-string keys (e.g. numbers) are handled safely.
- Buckets are initialised lazily, so slots are only assigned an array when a key first hashes to it. This avoids unnecessary memory usage.

---

### 1.4 Binary Search Tree

A Binary Search Tree (BST) stores values in a hierarchical node structure where every left child is smaller than its parent and every right child is larger. This ordering property allows efficient searching, insertion, and deletion operations.

**Design decisions:**
- `insert` and `search` are implemented iteratively (using a `while` loop) to avoid call stack overhead for large trees.
- `delete` is implemented recursively, as the three-case logic (no children, one child, two children) is most clearly expressed recursively. If there are two children, the node is replaced with its **in-order successor**, which is the smallest value in its right subtree. This preserves the BST ordering property.
- `delete` returns `true` if the value was found and removed, `false` if it was not present. This keeps the interface consistent with the HashMap implementation.
- Duplicate values are rejected on insert. A strict BST requires unique values to preserve the ordering guarantee that every left child is smaller and every right child is larger.
- `NaN` is rejected on insert. Since `NaN !== NaN` in JavaScript, any inserted NaN node could never be found or deleted, creating an unreachable zombie node.
- No self-balancing is implemented. My research suggests production environments would typically use a self-balancing variant like an AVL tree or Red-Black tree.

---

## 2. Time and Space Complexity

### 2.1 Merge Sort

| Case    | Time Complexity | Space Complexity |
|---------|-----------------|------------------|
| Best    | O(n log n)      | O(n)             |
| Average | O(n log n)      | O(n)             |
| Worst   | O(n log n)      | O(n)             |

### 2.2 Binary Search

| Case    | Time Complexity | Space Complexity |
|---------|-----------------|------------------|
| Best    | O(1)            | O(log n)         |
| Average | O(log n)        | O(log n)         |
| Worst   | O(log n)        | O(log n)         |

### 2.3 HashMap

| Operation | Average Case | Worst Case | Space Complexity |
|-----------|--------------|------------|------------------|
| `set`     | O(1)         | O(n)       | O(n)             |
| `get`     | O(1)         | O(n)       | O(1)             |
| `delete`  | O(1)         | O(n)       | O(1)             |

### 2.4 Binary Search Tree

| Operation | Average Case | Worst Case | Space Complexity   |
|-----------|--------------|------------|--------------------|
| `insert`  | O(log n)     | O(n)       | O(1) iterative     |
| `search`  | O(log n)     | O(n)       | O(1) iterative     |
| `delete`  | O(log n)     | O(n)       | O(log n) recursive |

---

## 3. Memory and Performance Trade-offs

### Merge Sort vs Binary Search

Merge Sort requires O(n) auxiliary space to hold the merged sub-arrays during sorting, whereas Binary Search requires no additional space for the data itself.

However, Binary Search does require the input to already be sorted, so if the data is unsorted, sorting it first (e.g. with Merge Sort) adds O(n) space and O(n log n) time overhead. 

For a dataset that is frequently searched but rarely changed, the upfront cost of sorting is worthwhile.

### HashMap vs Binary Search Tree

A HashMap pre-allocates a fixed-size array regardless of how many items are stored. This means it uses memory even when mostly empty, but achieves O(1) average-case lookup. A BST only allocates memory per node as values are inserted, making it more memory-efficient, but its O(log n) lookup is slower on average.

The HashMap is preferable when fast lookup is the priority and the key-space is reasonably dense. The BST is preferable when ordered traversal or range queries are needed, as the BST's structure preserves sorted order whereas a HashMap cannot guarantee any order.

---

## 4. Algorithm Efficiency and Computational Sustainability

The efficiency of an algorithm directly affects the energy a system consumes. An algorithm with a lower time complexity performs fewer operations for the same input, therefore consumes less power.

For small datasets the difference is negligible, but at scale the impact is significant. 

The algorithms and data structures implemented here all operate at O(n log n) or better:
- Merge Sort -> Guarantees O(n log n) in all cases, avoiding the unpredictable worst-case behaviour of O(n²) algorithms.
- Binary Search -> O(log n) lookup is far more efficient than a linear scan at scale.
- HashMap -> O(1) average lookup is the most energy-efficient option for key-value retrieval.
- The BST -> O(log n) operations are efficient; however, its worst-case O(n) behaviour shows why a self-balancing tree is probably better. 

In conclusion, choosing the right algorithm and data structure for the right task can result in both better performance and reduced environmental impact. This becomes more evident in larger datasets which are running millions or billions of operations.

---

## 5. References

I used a variety of resources when working on these algorithms and data structures. In addition to the UHI content, I used the following;

### Merge Sort
- Doable Danny - *Merge Sort - JavaScript* - https://www.doabledanny.com/merge-sort-javascript
- GeeksforGeeks - *Merge Sort* - https://www.geeksforgeeks.org/dsa/merge-sort/

### Binary Search
- BBC - *Binary Search* - https://www.bbc.co.uk/bitesize/guides/zm77xfr/revision/3
- GeeksforGeeks - *Binary Search* - https://www.geeksforgeeks.org/dsa/binary-search/
- W3Schools - *DSA Binary Search* - https://www.w3schools.com/dsa/dsa_algo_binarysearch.php

### Hash Map
- TheOdinProject - *HashMap Data Structure* - https://www.theodinproject.com/lessons/javascript-hashmap-data-structure
- W3Schools - *DSA Hash Maps* - https://www.w3schools.com/dsa/dsa_data_hashmaps.php

### Binary Search Tree
- W3Schools - *DSA Binary Search Tree* - https://www.w3schools.com/dsa/dsa_data_binarysearchtrees.php
- GeeksforGeeks - *Binary Search Tree* - https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/

### Testing
- GeeksforGeeks - *Testing with Jest* - https://www.geeksforgeeks.org/javascript/testing-with-jest/