// https://www.w3schools.com/dsa/dsa_data_hashmaps.php


class HashMap
{
    // Number of buckets in the array (default 53, this is a prime number which helps reduce collisions)
    constructor(size = 53) {
        this.buckets = new Array(size);
        this.size = size;
    }

    // Turns a key into an index in the array
    hash(key) {
        key = String(key);
        let hash = 0;

        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i) * (i + 1);
        }
        // % this.size keeps the result within the bounds of the array
        return hash % this.size;
    }

    // Inserts a new key-value pair, or updates the value if the key already exists
    set(key, value) {
        const index = this.hash(key);
        // Initialise the bucket as an empty array if it doesn't exist yet
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }
        const bucket = this.buckets[index];

        // Try find existing key and update it
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        // If the key is not found, add a new [key, value] pair to the bucket
        bucket.push([key, value]);
    }

    // Returns the value for key if it exists, otherwise returns undefined
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // If the bucket was never initialised, the key can't exist
        if (!bucket) return undefined;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    // Removes a key-value pair and returns true if its deleted otherwise returns false
    delete(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);  // splice(i, 1) removes 1 element at position i
                return true;
            }
        }
        return false;
    }
}

export default HashMap;