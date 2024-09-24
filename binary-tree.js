/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
  
    function traverse(node) {
      if (!node) return Infinity; // Treat null as an infinitely deep branch
      if (!node.left && !node.right) return 1; // Leaf node
      return Math.min(traverse(node.left), traverse(node.right)) + 1;
    }
  
    return traverse(this.root);
  }
  

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
  
    function traverse(node) {
      if (!node) return 0;
      return Math.max(traverse(node.left), traverse(node.right)) + 1;
    }
  
    return traverse(this.root);
  }
  

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = { max: 0 };
  
    function maxPathSum(node) {
      if (!node) return 0;
  
      let leftSum = Math.max(maxPathSum(node.left), 0); // Ignore negative paths
      let rightSum = Math.max(maxPathSum(node.right), 0); // Ignore negative paths
  
      // Calculate max sum passing through the node
      let localMax = node.val + leftSum + rightSum;
      result.max = Math.max(result.max, localMax);
  
      // Return max sum including the node itself
      return node.val + Math.max(leftSum, rightSum);
    }
  
    maxPathSum(this.root);
    return result.max;
  }
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
  
    let queue = [this.root];
    let closest = null;
  
    while (queue.length) {
      let current = queue.shift();
  
      if (current.val > lowerBound && (closest === null || current.val < closest)) {
        closest = current.val;
      }
  
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  
    return closest;
  }
  

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }
  
  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    function traverse(node) {
      if (!node) return "null";
      return `${node.val},${traverse(node.left)},${traverse(node.right)}`;
    }
  
    return traverse(tree.root);
  }
  

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    let nodes = stringTree.split(',');
  
    function buildTree() {
      let val = nodes.shift();
      if (val === "null") return null;
      let node = new BinaryTreeNode(Number(val));
      node.left = buildTree();
      node.right = buildTree();
      return node;
    }
  
    return new BinaryTree(buildTree());
  }
  

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    function findLCA(node, p, q) {
      if (!node) return null;
      if (node === p || node === q) return node;
  
      let left = findLCA(node.left, p, q);
      let right = findLCA(node.right, p, q);
  
      if (left && right) return node;
      return left ? left : right;
    }
  
    return findLCA(this.root, node1, node2);
  }
  
}

module.exports = { BinaryTree, BinaryTreeNode };
