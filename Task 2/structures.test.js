// https://www.geeksforgeeks.org/javascript/testing-with-jest/

import HashMap from './hashmap.js';
import BinarySearchTree from './binarySearchTree.js';

// --- HashMap Tests ---

describe('HashMap - Simple Tasks', () => {

    // Test Case 1
    test('Set and get a string key-value pair', () => {
        const map = new HashMap();
        map.set('name', 'Alice');
        expect(map.get('name')).toBe('Alice');
    });

    // Test Case 2
    test('Get a key that does not exist returns undefined', () => {
        const map = new HashMap();
        expect(map.get('missing')).toBeUndefined();
    });

    // Test Case 3
    test('Get on a completely empty map returns undefined', () => {
        const map = new HashMap();
        expect(map.get('anything')).toBeUndefined();
    });

    // Test Case 4
    test('Updating an existing key overwrites the value, does not duplicate it', () => {
        const map = new HashMap();
        map.set('name', 'Alice');
        map.set('name', 'Bob');
        expect(map.get('name')).toBe('Bob');
    });

    // Test Case 5
    test('Delete removes a key and returns true', () => {
        const map = new HashMap();
        map.set('name', 'Alice');
        expect(map.delete('name')).toBe(true);
        expect(map.get('name')).toBeUndefined();
    });

    // Test Case 6
    test('Delete on a key that does not exist returns false', () => {
        const map = new HashMap();
        expect(map.delete('missing')).toBe(false);
    });

    // Test Case 7
    test('Delete on a completely empty map returns false', () => {
        const map = new HashMap();
        expect(map.delete('anything')).toBe(false);
    });

    // Test Case 8
    test('Deleting the same key twice returns false on the second call', () => {
        const map = new HashMap();
        map.set('x', 1);
        expect(map.delete('x')).toBe(true);
        expect(map.delete('x')).toBe(false);
    });

    // Test Case 9
    test('Can set a new value after deleting a key', () => {
        const map = new HashMap();
        map.set('x', 1);
        map.delete('x');
        map.set('x', 99);
        expect(map.get('x')).toBe(99);
    });

    // Test Case 10
    test('Multiple distinct keys do not interfere with each other', () => {
        const map = new HashMap();
        map.set('a', 1);
        map.set('b', 2);
        map.set('c', 3);
        expect(map.get('a')).toBe(1);
        expect(map.get('b')).toBe(2);
        expect(map.get('c')).toBe(3);
    });
});

describe('HashMap - Edge Case Keys', () => {

    // Test Case 11
    test('Empty string as a key works correctly', () => {
        const map = new HashMap();
        map.set('', 'empty key');
        expect(map.get('')).toBe('empty key');
    });

    // Test Case 12
    test('Numeric key 42 is stored and retrieved with the same type (not coerced to string)', () => {
        const map = new HashMap();
        map.set(42, 'number');
        expect(map.get(42)).toBe('number');
    });

    // Test Case 13
    test('Numeric key 42 and string key "42" are treated as distinct keys', () => {
        // hash() converts both to the string '42' so they land in the same bucket,
        // but strict equality (===) keeps them as separate entries
        const map = new HashMap();
        map.set(42, 'number value');
        map.set('42', 'string value');
        expect(map.get(42)).toBe('number value');
        expect(map.get('42')).toBe('string value');
    });

    // Test Case 14
    test('null key is stored and retrieved (hash converts it to the string "null")', () => {
        const map = new HashMap();
        map.set(null, 'null key');
        expect(map.get(null)).toBe('null key');
    });

    // Test Case 15
    test('undefined key is stored and retrieved (hash converts it to the string "undefined")', () => {
        const map = new HashMap();
        map.set(undefined, 'undefined key');
        expect(map.get(undefined)).toBe('undefined key');
    });

    // Test Case 16
    test('Boolean keys true and false are stored and retrieved independently', () => {
        const map = new HashMap();
        map.set(true, 'yes');
        map.set(false, 'no');
        expect(map.get(true)).toBe('yes');
        expect(map.get(false)).toBe('no');
    });

    // Test Case 17
    test('Object key is stringified to "[object Object]" by the hash function', () => {
        const map = new HashMap();
        map.set({}, 'object key');
        // Both {} hash identically, but {} !== {} under strict equality, so get({}) cannot retrieve it
        expect(map.get('[object Object]')).toBeUndefined();
    });

    // Test Case 18
    test('Array key is stringified to its comma-joined form by the hash function', () => {
        const map = new HashMap();
        const arr = [1, 2, 3];
        map.set(arr, 'array key');
        // The same array reference is used, so strict equality holds
        expect(map.get(arr)).toBe('array key');
    });

    // Test Case 19
    test('Very long key is handled without errors', () => {
        const map = new HashMap();
        const longKey = 'k'.repeat(10000);
        map.set(longKey, 'long');
        expect(map.get(longKey)).toBe('long');
    });

    // Test Case 20
    test('Special character keys are handled without errors', () => {
        const map = new HashMap();
        map.set('!@#$%^&*()', 'special');
        map.set('\n\t\r', 'whitespace');
        map.set('🔑', 'emoji');
        expect(map.get('!@#$%^&*()')).toBe('special');
        expect(map.get('\n\t\r')).toBe('whitespace');
        expect(map.get('🔑')).toBe('emoji');
    });

});

describe('HashMap - Edge Case Values', () => {

    // Test Case 21
    test('Falsy value 0 is stored and retrieved correctly', () => {
        const map = new HashMap();
        map.set('zero', 0);
        expect(map.get('zero')).toBe(0);
    });

    // Test Case 22
    test('Falsy value false is stored and retrieved correctly', () => {
        const map = new HashMap();
        map.set('bool', false);
        expect(map.get('bool')).toBe(false);
    });

    // Test Case 23
    test('Falsy value null is stored and retrieved correctly', () => {
        const map = new HashMap();
        map.set('nullVal', null);
        expect(map.get('nullVal')).toBeNull();
    });

    // Test Case 24
    test('Empty string value is stored and retrieved correctly', () => {
        const map = new HashMap();
        map.set('empty', '');
        expect(map.get('empty')).toBe('');
    });

    // Test Case 25
    test('Undefined value is stored and retrieved (get returns undefined for both missing and undefined-valued keys)', () => {
        const map = new HashMap();
        map.set('undef', undefined);
        // The key exists but its value is undefined - indistinguishable from a missing key via get()
        expect(map.get('undef')).toBeUndefined();
    });

    // Test Case 26
    test('Object and array values are stored and retrieved by reference', () => {
        const map = new HashMap();
        const obj = { x: 1 };
        const arr = [1, 2, 3];
        map.set('obj', obj);
        map.set('arr', arr);
        expect(map.get('obj')).toBe(obj);
        expect(map.get('arr')).toBe(arr);
    });

});

describe('HashMap - Collision Handling', () => {

    // Test Case 27
    test('Size-1 map forces all keys into one bucket - all operations still work correctly', () => {
        const map = new HashMap(1);
        map.set('a', 1);
        map.set('b', 2);
        map.set('c', 3);
        expect(map.get('a')).toBe(1);
        expect(map.get('b')).toBe(2);
        expect(map.get('c')).toBe(3);
        expect(map.delete('b')).toBe(true);
        expect(map.get('b')).toBeUndefined();
        expect(map.get('a')).toBe(1);
    });

    // Test Case 28
    test('Size-1 map: updating a colliding key only updates that key', () => {
        const map = new HashMap(1);
        map.set('x', 10);
        map.set('y', 20);
        map.set('x', 99);
        expect(map.get('x')).toBe(99);
        expect(map.get('y')).toBe(20);
    });

});

describe('HashMap - Large Scale', () => {

    // Test Case 29
    test('Stores and retrieves 500 entries correctly', () => {
        const map = new HashMap();
        for (let i = 0; i < 500; i++) {
            map.set(`key${i}`, i * 2);
        }
        for (let i = 0; i < 500; i++) {
            expect(map.get(`key${i}`)).toBe(i * 2);
        }
    });

    // Test Case 30
    test('Deleting all entries one by one leaves every key missing', () => {
        const map = new HashMap();
        for (let i = 0; i < 100; i++) map.set(`k${i}`, i);
        for (let i = 0; i < 100; i++) map.delete(`k${i}`);
        for (let i = 0; i < 100; i++) {
            expect(map.get(`k${i}`)).toBeUndefined();
        }
    });

});


// --- BinarySearchTree Tests ---

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
    test('Finds all values after multiple inserts', () => {
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
    test('Duplicate values are inserted (go right) and are searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(10);
        expect(tree.search(10)).toBe(true);
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
    test('Floating point numbers are inserted and found correctly', () => {
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
    test('Inserting values in ascending order (degenerate right-skewed tree) still works correctly', () => {
        const tree = new BinarySearchTree();
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(v => tree.insert(v));
        expect(tree.search(1)).toBe(true);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(5)).toBe(true);
        expect(tree.search(11)).toBe(false);
    });

    // Test Case 12
    test('Inserting values in descending order (degenerate left-skewed tree) still works correctly', () => {
        const tree = new BinarySearchTree();
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].forEach(v => tree.insert(v));
        expect(tree.search(1)).toBe(true);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(11)).toBe(false);
    });

    // Test Case 13
    test('NaN is inserted but can never be found (NaN !== NaN)', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(NaN);
        // NaN === NaN is always false, so search will never match it
        expect(tree.search(NaN)).toBe(false);
    });

    // Test Case 14
    test('null is inserted (coerces to 0 in comparisons) and is searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(null);
        // null < 10 is true, so null goes left; null === null is true so search finds it
        expect(tree.search(null)).toBe(true);
    });

    // Test Case 15
    test('undefined is inserted (NaN-like in comparisons, always goes right) and is searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert(undefined);
        // undefined < 10 is false, so it goes right; undefined === undefined is true
        expect(tree.search(undefined)).toBe(true);
    });

    // Test Case 16
    test('String values are inserted (NaN-like comparisons with numbers, always go right) and are searchable', () => {
        const tree = new BinarySearchTree();
        tree.insert(10);
        tree.insert('hello');
        // 'hello' < 10 is false, so it goes right; 'hello' === 'hello' is true
        expect(tree.search('hello')).toBe(true);
    });

});

describe('BinarySearchTree - Delete', () => {

    // Test Case 17
    test('Delete a leaf node (no children) removes it from the tree', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        tree.delete(5);
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
    test('Delete a value that does not exist does not corrupt the tree', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        tree.delete(99);
        expect(tree.search(10)).toBe(true);
        expect(tree.search(5)).toBe(true);
        expect(tree.search(15)).toBe(true);
    });

    // Test Case 24
    test('Delete on an empty tree does not throw an error', () => {
        const tree = new BinarySearchTree();
        expect(() => tree.delete(10)).not.toThrow();
    });

    // Test Case 25
    test('Deleting a value twice: second delete does not corrupt the tree', () => {
        const tree = new BinarySearchTree();
        [10, 5, 15].forEach(v => tree.insert(v));
        tree.delete(5);
        expect(tree.search(5)).toBe(false);
        tree.delete(5); // no-op
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
        const values = Array.from({ length: 1000 }, (_, i) => i - 500); // -500 to 499
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
        for (let i = 0; i < 200; i += 2) tree.delete(i); // delete all even numbers
        for (let i = 0; i < 200; i++) {
            if (i % 2 === 0) {
                expect(tree.search(i)).toBe(false);
            } else {
                expect(tree.search(i)).toBe(true);
            }
        }
    });

});
