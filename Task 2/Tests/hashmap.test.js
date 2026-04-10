// https://www.geeksforgeeks.org/javascript/testing-with-jest/

import HashMap from '../hashmap.js';

describe('HashMap - Basic Stuff', () => {

    // Test Case 1
    test('Set and get a string key-value pair', () => {
        const map = new HashMap();
        map.set('name', 'Alice');
        expect(map.get('name')).toBe('Alice');
    });

    // Test Case 2
    test('Getting a non-existent key returns undefined', () => {
        const map = new HashMap();
        expect(map.get('idontexist')).toBeUndefined();
    });

    // Test Case 3
    test('Get on an empty hashmap returns undefined', () => {
        const map = new HashMap();
        expect(map.get('hello')).toBeUndefined();
    });

    // Test Case 4
    test('Updating an existing key overwrites the value', () => {
        const map = new HashMap();
        map.set('name', 'Charles');
        map.set('name', 'Heckie');
        expect(map.get('name')).toBe('Heckie');
    });

    // Test Case 5
    test('Delete removes a key and returns true', () => {
        const map = new HashMap();
        map.set('name', 'Charles');
        expect(map.delete('name')).toBe(true);
        expect(map.get('name')).toBeUndefined();
    });

    // Test Case 6
    test('Delete on a key that does not exist returns false', () => {
        const map = new HashMap();
        expect(map.delete('name')).toBe(false);
    });

    // Test Case 7
    test('Delete on a completely empty hashmap returns false', () => {
        const map = new HashMap();
        expect(map.delete('hello')).toBe(false);
    });

    // Test Case 8
    test('Deleting the same key twice returns false on the second call', () => {
        const map = new HashMap();
        map.set('name', 'Charles');
        expect(map.delete('name')).toBe(true);
        expect(map.delete('name')).toBe(false);
    });

    // Test Case 9
    test('Setting a new value works after deleting a key', () => {
        const map = new HashMap();
        map.set('name', 'Charles');
        map.delete('name');
        map.set('name', 'Heckie');
        expect(map.get('name')).toBe('Heckie');
    });

    // Test Case 10
    test('Multiple keys do not interfere with each other', () => {
        const map = new HashMap();
        map.set('uno', 1);
        map.set('dos', 2);
        map.set('tres', 3);
        expect(map.get('uno')).toBe(1);
        expect(map.get('dos')).toBe(2);
        expect(map.get('tres')).toBe(3);
    });
});

describe('HashMap - Edge Cases (Keys)', () => {

    // Test Case 11
    test('Empty string as a key works correctly', () => {
        const map = new HashMap();
        map.set('', 'this shouldnt work in my opinion but the world says it does');
        expect(map.get('')).toBe('this shouldnt work in my opinion but the world says it does');
    });

    // Test Case 12
    test('Numeric keys work as intended', () => {
        const map = new HashMap();
        map.set(42, 'the answer to life the universe and everything?');
        expect(map.get(42)).toBe('the answer to life the universe and everything?');
    });

    // Test Case 13
    test('A number type key and string type key of the same value are treated as distinct keys', () => {
        const map = new HashMap();
        map.set(42, 'the actual answer to life the universe and everything');
        map.set('42', 'the fake answer to life the universe and everything');
        expect(map.get(42)).toBe('the actual answer to life the universe and everything');
        expect(map.get('42')).toBe('the fake answer to life the universe and everything');
    });

    // Test Case 14
    test('Null keys work as intended', () => {
        const map = new HashMap();
        map.set(null, 'i also dont agree that this should be allowed');
        expect(map.get(null)).toBe('i also dont agree that this should be allowed');
    });

    // Test Case 15
    test('Undefined keys work as intended', () => {
        const map = new HashMap();
        map.set(undefined, 'surely not');
        expect(map.get(undefined)).toBe('surely not');
    });

    // Test Case 16
    test('Bool keys work as intended', () => {
        const map = new HashMap();
        map.set(true, 'im true');
        map.set(false, 'im false');
        expect(map.get(true)).toBe('im true');
        expect(map.get(false)).toBe('im false');
    });

    // Test Case 17
    test('Array key is stringified by the hash function', () => {
        const map = new HashMap();
        const arr = [1, 2, 3];
        map.set(arr, 'uno dos tres');
        expect(map.get(arr)).toBe('uno dos tres');
    });

    // Test Case 18
    test('A very long key works as intended', () => {
        const map = new HashMap();
        const longKey = 'ok'.repeat(5000);
        map.set(longKey, 'long');
        expect(map.get(longKey)).toBe('long');
    });

    // Test Case 19
    test('Special character work as intended', () => {
        const map = new HashMap();
        map.set('!@#$%^&*()', 'special characters');
        map.set('\n\t\r', 'whitespace');
        map.set('🔑', 'emoji');
        expect(map.get('!@#$%^&*()')).toBe('special characters');
        expect(map.get('\n\t\r')).toBe('whitespace');
        expect(map.get('🔑')).toBe('emoji');
    });
});

describe('HashMap - Edge Case (Values)', () => {

    // Test Case 20
    test('Integer stored and retrieved as intended', () => {
        const map = new HashMap();
        map.set('zero', 0);
        expect(map.get('zero')).toBe(0);
    });

    // Test Case 21
    test('Bool stored and retrieved as intended', () => {
        const map = new HashMap();
        map.set('bool', false);
        expect(map.get('bool')).toBe(false);
    });

    // Test Case 22
    test('Null stored and retrieved as intended', () => {
        const map = new HashMap();
        map.set('Skills', null);
        expect(map.get('Skills')).toBeNull();
    });

    // Test Case 23
    test('Empty string stored and retrieved as intended', () => {
        const map = new HashMap();
        map.set('speechless', '');
        expect(map.get('speechless')).toBe('');
    });

    // Test Case 24
    test('Undefined value stored and retrieved as intended', () => {
        const map = new HashMap();
        map.set('Brain', undefined);
        expect(map.get('Brain')).toBeUndefined();
    });

    // Test Case 25
    test('Objects and arrays stored and retrieved as intended', () => {
        const map = new HashMap();
        const obj = { x: 1 };
        const arr = [1, 2, 3];
        map.set('obj', obj);
        map.set('arr', arr);
        expect(map.get('obj')).toBe(obj);
        expect(map.get('arr')).toBe(arr);
    });
});

describe('HashMap - Size 1 Collision Handling', () => {

    // Test Case 26
    test('Test a hashmap with a size of 1 works as intended', () => {
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

    // Test Case 27
    test('Test to ensure updating a colliding key only updates that key', () => {
        const map = new HashMap(1);
        map.set('x', 10);
        map.set('y', 20);
        map.set('x', 99);
        expect(map.get('x')).toBe(99);
        expect(map.get('y')).toBe(20);
    });
});

describe('HashMap - Large Scale', () => {

    // Test Case 28
    test('Stores and retrieves 500 entries as intended', () => {
        const map = new HashMap();
        for (let i = 0; i < 500; i++) {
            map.set(`key${i}`, i * 2);
        }
        for (let i = 0; i < 500; i++) {
            expect(map.get(`key${i}`)).toBe(i * 2);
        }
    });

    // Test Case 29
    test('Deleting all entries one by one leaves every key missing', () => {
        const map = new HashMap();
        for (let i = 0; i < 100; i++) map.set(`k${i}`, i);
        for (let i = 0; i < 100; i++) map.delete(`k${i}`);

        for (let i = 0; i < 100; i++) {
            expect(map.get(`k${i}`)).toBeUndefined();
        }
    });
});
