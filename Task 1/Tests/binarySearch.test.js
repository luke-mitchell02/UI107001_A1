// https://www.geeksforgeeks.org/javascript/testing-with-jest/

import binarySearch from '../binarySearch.js';
import { largeSorted } from './mergeSort.test.js';

// Test Case 1
test('Finds a target value in the array', () => {
    expect(binarySearch(largeSorted, 44943)).toBe(44);
});

// Test Case 2
test('Finds a target value at the start of the array', () => {
    expect(binarySearch(largeSorted, 376)).toBe(0);
});

// Test Case 3
test('Finds a target value at the end of the array', () => {
    expect(binarySearch(largeSorted, 99454)).toBe(99);
});

// Test Case 3
test('Finds a target value in the middle of the array', () => {
    expect(binarySearch(largeSorted, 50837)).toBe(50);
});

// Test Case 4
test('Returns -1 when the target value is not in the array', () => {
    expect(binarySearch(largeSorted, 99999999)).toBe(-1);
});

// Test Case 5
test('Returns -1 when the array provided is empty', () => {
    expect(binarySearch([], 0)).toBe(-1);
});

// Test Case 6
test('Finds the target value in a single-element array', () => {
    expect(binarySearch([42], 42)).toBe(0);
});

// Test Case 7
test('Throws an error when the array contains mixed types', () => {
    expect(() => binarySearch(["Hello World", 42], 42)).toThrow("The input must be an array of the same type");
});

// Test Case 8
test('Throws an error when the target type does not match the array element type', () => {
    expect(() => binarySearch([42], null)).toThrow("The target must be the same type as the array elements");
    expect(() => binarySearch([42], undefined)).toThrow("The target must be the same type as the array elements");
    expect(() => binarySearch([42], true)).toThrow("The target must be the same type as the array elements");
    expect(() => binarySearch([42], "Hello world")).toThrow("The target must be the same type as the array elements");
});

// Test Case 9
test('Finds the target value if array is an array of strings, and the target is also a string', () => {
    expect(binarySearch(["Hello world", "Im a string"], "Hello world")).toBe(0);
});