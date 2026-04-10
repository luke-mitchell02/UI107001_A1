// https://www.geeksforgeeks.org/javascript/testing-with-jest/

import BinarySearchTree from '../binarySearchTree.js';

describe('BinarySearchTree - Search', () => {

    // Test Case 1
    test('Search on an empty tree returns false', () => {
        const tree = new BinarySearchTree();
        expect(tree.search(10)).toBe(false);
    });

    // Test Case 2
    test('Insert a value and search for it returns true', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        expect(tree.search(10)).toBe(true);
    });

    // Test Case 3
    test('Search for a value not in the tree returns false', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        expect(tree.search(99)).toBe(false);
    });

    // Test Case 4
    test('Insertion and searching works as intended after multiple inserts', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15, 3, 7, 12, 20].forEach(v => tree.insert(v));
        [10, 5, 15, 3, 7, 12, 20].forEach(v => {
            expect(tree.search(v)).toBe(true);
        });
    });

    // Test Case 5
    test('Search for a value between two existing nodes that is not present returns false', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(5);
        tree.insert(15);
        expect(tree.search(6)).toBe(false);
        expect(tree.search(14)).toBe(false);
    });

});

describe('BinarySearchTree - Insert Edge Cases', () => {

    // Test Case 6
    test('Inserting a single value makes it the root and it is searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(42);
        expect(tree.search(42)).toBe(true);
    });

    // Test Case 7
    test('Duplicate values are rejected and do not create extra nodes', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(10);
        expect(tree.search(10)).toBe(true);
        expect(tree.root.left).toBeNull();
        expect(tree.root.right).toBeNull();
    });

    // Test Case 8
    test('Negative numbers are inserted and found correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(-5);
        tree.insert(-10);
        tree.insert(-1);
        expect(tree.search(-5)).toBe(true);
        expect(tree.search(-10)).toBe(true);
        expect(tree.search(-1)).toBe(true);
        expect(tree.search(-3)).toBe(false);
    });

    // Test Case 9
    test('Zero is inserted and found correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(0);
        expect(tree.search(0)).toBe(true);
        expect(tree.search(1)).toBe(false);
    });

    // Test Case 10
    test('Floats are inserted and found correctly', () => {
        const tree = new BinarySearchTree();
        tree.insert(3.14);
        tree.insert(2.71);
        tree.insert(1.41);
        expect(tree.search(3.14)).toBe(true);
        expect(tree.search(2.71)).toBe(true);
        expect(tree.search(1.41)).toBe(true);
        expect(tree.search(3.15)).toBe(false);
    });

    // Test Case 11
    test('Inserting values in ascending order work as intended', () => {
        const tree = new BinarySearchTree();
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(v => tree.insert(v));
        expect(tree.search(1)).toBe(true);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(5)).toBe(true);
        expect(tree.search(11)).toBe(false);
    });

    // Test Case 12
    test('Inserting values in descending order works as intended', () => {
        const tree = new BinarySearchTree();
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].forEach(v => tree.insert(v));
        expect(tree.search(1)).toBe(true);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(11)).toBe(false);
    });

    // Test Case 13
    test('NaN is rejected by insert and cannot be found', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(NaN);
        expect(tree.search(NaN)).toBe(false);
        expect(tree.root.left).toBeNull();
        expect(tree.root.right).toBeNull();
    });

    // Test Case 14
    test('null is inserted and is searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(null);
        expect(tree.search(null)).toBe(true);
    });

    // Test Case 15
    test('undefined is inserted and is searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(undefined);
        expect(tree.search(undefined)).toBe(true);
    });

    // Test Case 16
    test('String values are inserted and are searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert('hello');
        expect(tree.search('hello')).toBe(true);
    });

});

describe('BinarySearchTree - Delete', () => {

    // Test Case 17
    test('Deleting a leaf node with no children removes it from the tree', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        expect(tree.delete(5)).toBe(true);
        expect(tree.search(5)).toBe(false);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(15)).toBe(true);
    });

    // Test Case 18
    test('Delete a node with only a left child promotes that child correctly', () => {
        const tree = new BinarySearchTree();
        [10, 5, 3].forEach(v => tree.insert(v));
        tree.delete(5);
        expect(tree.search(5)).toBe(false);
        expect(tree.search(3)).toBe(true);
        expect(tree.search(10)).toBe(true);
    });

    // Test Case 19
    test('Delete a node with only a right child promotes that child correctly', () => {
        const tree = new BinarySearchTree();
        [10, 5, 7].forEach(v => tree.insert(v));
        tree.delete(5);
        expect(tree.search(5)).toBe(false);
        expect(tree.search(7)).toBe(true);
        expect(tree.search(10)).toBe(true);
    });

    // Test Case 20
    test('Delete a node with two children replaces it with its in-order successor', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15, 3, 7].forEach(v => tree.insert(v));
        tree.delete(5);
        expect(tree.search(5)).toBe(false);
        expect(tree.search(3)).toBe(true);
        expect(tree.search(7)).toBe(true);
        expect(tree.search(10)).toBe(true);
    });

    // Test Case 21
    test('Delete the root node when it has two children leaves both subtrees intact', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        tree.delete(10);
        expect(tree.search(10)).toBe(false);
        expect(tree.search(5)).toBe(true);
        expect(tree.search(15)).toBe(true);
    });

    // Test Case 22
    test('Delete the root node when it is the only node empties the tree', () => {
        const tree = new BinarySearchTree();
        tree.insert(42);
        tree.delete(42);
        expect(tree.search(42)).toBe(false);
        // Verify tree is truly empty
        expect(tree.root).toBeNull();
    });

    // Test Case 23
    test('Delete a value that does not exist returns false and does not cause issues', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        expect(tree.delete(99)).toBe(false);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(5)).toBe(true);
        expect(tree.search(15)).toBe(true);
    });

    // Test Case 24
    test('Delete on an empty tree returns false and does not throw an error', () => {
        const tree = new BinarySearchTree();
        expect(() => tree.delete(10)).not.toThrow();
        expect(tree.delete(10)).toBe(false);
    });

    // Test Case 25
    test('Deleting a value twice: second delete returns false and does not cause issues', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        expect(tree.delete(5)).toBe(true);
        expect(tree.search(5)).toBe(false);
        expect(tree.delete(5)).toBe(false);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(15)).toBe(true);
    });

    // Test Case 26
    test('Delete all nodes one by one until the tree is empty', () => {
        const tree = new BinarySearchTree();
        const values = [10, 5, 15, 3, 7, 12, 20];
        values.forEach(v => tree.insert(v));
        values.forEach(v => tree.delete(v));
        values.forEach(v => {
            expect(tree.search(v)).toBe(false);
        });
        expect(tree.root).toBeNull();
    });

    // Test Case 27
    test('Delete works correctly on a degenerate (sorted-input) tree', () => {
        const tree = new BinarySearchTree();
        [1, 2, 3, 4, 5].forEach(v => tree.insert(v));
        tree.delete(3);
        expect(tree.search(3)).toBe(false);
        expect(tree.search(1)).toBe(true);
        expect(tree.search(5)).toBe(true);
    });

});

describe('BinarySearchTree - Large Scale', () => {

    // Test Case 28
    test('Inserts and searches 1000 values correctly', () => {
        const tree = new BinarySearchTree();
        const values = Array.from({ length: 1000 }, (_, i) => i - 500);
        values.forEach(v => tree.insert(v));
        expect(tree.search(-500)).toBe(true);
        expect(tree.search(0)).toBe(true);
        expect(tree.search(499)).toBe(true);
        expect(tree.search(500)).toBe(false);
        expect(tree.search(-501)).toBe(false);
    });

    // Test Case 29
    test('Handles a mix of inserts and deletes at scale without corrupting search', () => {
        const tree = new BinarySearchTree();
        for (let i = 0; i < 200; i++) tree.insert(i);
        for (let i = 0; i < 200; i += 2) tree.delete(i);
        for (let i = 0; i < 200; i++) {
            if (i % 2 === 0) {
                expect(tree.search(i)).toBe(false);
            } else {
                expect(tree.search(i)).toBe(true);
            }
        }
    });
});
