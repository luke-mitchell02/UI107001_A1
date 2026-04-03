// https://www.geeksforgeeks.org/javascript/testing-with-jest/

import sortArray from './mergeSort.js';
import binarySearch from './binarySearch.js';

const largeUnsorted = [
    12345,20264,28183,36102,44021,51940,59859,67778,75697,83616,
    91535,99454,7373,15292,23211,31130,39049,46968,54887,62806,
    70725,78644,86563,94482,2401,10320,18239,26158,34077,41996,
    49915,57834,65753,73672,81591,89510,97429,5348,13267,21186,
    29105,37024,44943,52862,60781,68700,76619,84538,92457,376,
    8295,16214,24133,32052,39971,47890,55809,63728,71647,79566,
    87485,95404,3323,11242,19161,27080,34999,42918,50837,58756,
    66675,74594,82513,90432,98351,6270,14189,22108,30027,37946,
    45865,53784,61703,69622,77541,85460,93379,1298,9217,17136,
    25055,32974,40893,48812,56731,64650,72569,80488,88407,96326,
    99998
];
const largeSorted = [
    376,1298,2401,3323,5348,6270,7373,8295,9217,10320,
    11242,12345,13267,14189,15292,16214,17136,18239,19161,20264,
    21186,22108,23211,24133,25055,26158,27080,28183,29105,30027,
    31130,32052,32974,34077,34999,36102,37024,37946,39049,39971,
    40893,41996,42918,44021,44943,45865,46968,47890,48812,49915,
    50837,51940,52862,53784,54887,55809,56731,57834,58756,59859,
    60781,61703,62806,63728,64650,65753,66675,67778,68700,69622,
    70725,71647,72569,73672,74594,75697,76619,77541,78644,79566,
    80488,81591,82513,83616,84538,85460,86563,87485,88407,89510,
    90432,91535,92457,93379,94482,95404,96326,97429,98351,99454,
    99998
];


// --- Merge Sort Unit Tests ---
describe('Merge Sort Unit Test', () => {

    // Test Case 1
    test('Sort an unsorted array of numbers', () => {
        expect(sortArray([99, 33, 21, 69, 85, 73, 11, 1, 9, 74])).toEqual([1, 9, 11, 21, 33, 69, 73, 74, 85, 99]);
    });

    // Test Case 2
    test('A single element-array input returns unchanged', () => {
        expect(sortArray([42])).toEqual([42]);
    });

    // Test Case 3
    test('Empty array returns unchanged', () => {
        expect(sortArray([])).toEqual([]);
    });

    // Test Case 4
    test('Sorts an array with duplicate values', () => {
        expect(sortArray([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
    });

    // Test Case 5
    test('Sorts an array with negative numbers', () => {
        expect(sortArray([-3, 5, -1, 0, 2])).toEqual([-3, -1, 0, 2, 5]);
    });

    // Test Case 6
    test('Throws an error when the array contains mixed types', () => {
        expect(() => {
            sortArray(["Hello world", 1, 4, 9, 2, 8, 3.14, true]);
        }).toThrow("The input must be an array of the same type");
    });

    // Test Case 7
    test('Throws an error when the value provided is not an array', () => {
        expect(() => {
            sortArray("Hello world");
        }).toThrow("The input must be an array");
    });

    // Test Case 8
    test('Sorts a large dataset of 101 elements', () => {
        expect(sortArray(largeUnsorted)).toEqual(largeSorted);
    });

    // Test Case 9
    test('Sorts an array of strings into alphabetical order', () => {
        expect(sortArray(['banana', 'apple', 'cherry', 'date'])).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    // Test Case 10
    test('Sorts a single-element string array unchanged', () => {
        expect(sortArray(['only'])).toEqual(['only']);
    });

    // Test Case 11
    test('Sorts a string array with duplicate values', () => {
        expect(sortArray(['banana', 'apple', 'banana', 'cherry'])).toEqual(['apple', 'banana', 'banana', 'cherry']);
    });

    // Test Case 12
    test('Sorts strings with uppercase correctly — uppercase sorts before lowercase in Unicode', () => {
        expect(sortArray(['banana', 'Apple', 'cherry'])).toEqual(['Apple', 'banana', 'cherry']);
    });

    // Test Case 13
    test('Throws an error when the array contains booleans (not a supported type)', () => {
        expect(() => {
            sortArray([true, false, true]);
        }).toThrow("The input must be an array of numbers or strings");
    });

    // Test Case 14
    test('Throws an error when the array contains null (not a supported type)', () => {
        expect(() => {
            sortArray([null, null]);
        }).toThrow("The input must be an array of numbers or strings");
    });
});

// --- Binary Search Tests ---

describe('Binary Search', () => {

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
});