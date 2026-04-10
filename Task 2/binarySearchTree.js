// https://www.geeksforgeeks.org/dsa/binary-search-tree-data-structure/

// Represents a single node in the tree. Each node holds a value and pointers to its left and right children
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Adds a new value to the tree, if the value is smaller, go left otherwise, go right
    insert(value) {
        if (Number.isNaN(value)) return;  // Reject NaN as it can never be found or deleted

        const node = new Node(value);

        if (!this.root) {
            this.root = node;  // If the tree is empty, the new node becomes the root
            return;
        }

        let current = this.root;
        while (true) {
            if (value === current.value) {
                return;  // Duplicate value, reject silently
            } else if (value < current.value) {
                // Go left, if empty, place node here
                if (!current.left) {
                    current.left = node;
                    return;
                }
                // If not empty, iterate again starting with the left node
                current = current.left;
            } else {
                // Go right, if empty, place node here
                if (!current.right) {
                    current.right = node;
                    return;
                }
                // If not empty, iterate again starting with the right node
                current = current.right;
            }
        }
    }

    // Returns true if the value exists in the tree, false otherwise
    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            // Go left if smaller, right if larger
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    // Removes a value from the tree, returns true if deleted, false if not found
    delete(value) {
        const found = this.search(value);
        if (!found) return false;
        this.root = this._deleteNode(this.root, value);
        return true;
    }

    // Recursive helper for delete - returns the updated subtree root
    _deleteNode(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value);
        } else {
            if (!node.left) return node.right;  // If no child at left position, return child on right, if this is null, node is removed
            if (!node.right) return node.left;  // If no child at right position, return child on left, if this is null, node is removed

            // Find smallest value in the right subtree, which is the next bigger number after the current node
            // Copy that value into the current node
            // Recursively delete the original node that held the new current node value
            let min = node.right;
            while (min.left) {
                min = min.left;
            }
            node.value = min.value;
            node.right = this._deleteNode(node.right, min.value);
        }
        return node;
    }
}

export default BinarySearchTree;