// https://www.doabledanny.com/merge-sort-javascript

/*
* This function finds the middle of an array and recursively splits it until it hits the base case
* The base case is arr length of 1
* Once the base case is hit, it then merges back up.
 */
export default function sortArray(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let middleOfArray = Math.floor(arr.length / 2);
    let left = sortArray(arr.slice(0, middleOfArray));
    let right = sortArray(arr.slice(middleOfArray));
    return mergeArrays(left, right);
}

/*
* This function is used to build up the sorted arrays into the result array.
* It starts off with two arrays of length 1 each, ie [73, 24] -> [[73], [24]]
* The numbers inside are then compared, and the smallest value is pushed into the results array
* This returns the sorted array, and the cycle repeats, until it outputs the full, sorted array
 */
function mergeArrays(left, right) {
    let result = [];
    let l = 0;
    let r = 0;

    while (l < left.length && r < right.length) {
        if (left[l] <= right[r]) {
            result.push(left[l]);
            l++
        } else {
            result.push(right[r]);
            r++
        }
    }
    return result.concat(left.slice(l), right.slice(r));
}