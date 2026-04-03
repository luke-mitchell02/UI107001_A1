/*
This binary search function takes a sorted array and a target as the input

A binary search essentially finds the middle of the array. If the middle value is less than the target,
it then goes to the middle the second half of the array. If it is less, it goes to the middle the first half.
Each time it finds the middle, it checks if the value is equal to the target, if not, it repeats.
This function runs recursively until the index is found. If the index is not found, it returns -1
 */

export default function binarySearch(arr, target, start = 0, end = arr.length - 1) {
    if (start === 0 && end === arr.length - 1) {
        if (!Array.isArray(arr)) {
            throw new TypeError("The input must be an array");
        }
        if (arr.length > 0) {
            const type = typeof arr[0];
            if (type !== "number" && type !== "string") {
                throw new TypeError("The input must be an array of numbers or strings");
            }
            if (!arr.every(value => typeof value === type)) {
                throw new TypeError("The input must be an array of the same type");
            }
            if (typeof target !== type) {
                throw new TypeError("The target must be the same type as the array elements");
            }
        }
    }

    if (start > end) {
        return -1;
    }

    let middleOfArray = Math.floor((start + end) / 2);
    if (arr[middleOfArray] === target) {
        return middleOfArray;
    } else if (arr[middleOfArray] < target) {
        return binarySearch(arr, target, middleOfArray + 1, end);
    } else {
        return binarySearch(arr, target, start, middleOfArray - 1);
    }
}