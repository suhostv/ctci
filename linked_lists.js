class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    add(value) {
        const newNode = new Node(value);
        let n = this;
        while (n.next !== null) {
            n = n.next;
        }

        n.next = newNode;
        return newNode;
    }
}

const LinkedList = new Node(1); // {1} -> {2} -> {3} -> {4} -> {10} -> {1} 
const second = LinkedList.add(2);
const third = LinkedList.add(3);
const fourth = LinkedList.add(4);
const fifth = LinkedList.add(10);
const sixth = LinkedList.add(1);

// --------------------- // 2.1 // ---------------------------

const removeDuplicates = (list) => {
    let previous = null;
    const hash = {};
    let currentNode = list;

    // using hash

    while (currentNode) {
        if (!hash[currentNode.value]) {
            hash[currentNode.value] = true;
            previous = currentNode;
        } else {
            previous.next = currentNode.next ? currentNode.next : null;
        }
        currentNode = currentNode.next;
    }

    // not using hash or any additional space

    while (currentNode) {
        let currentInnerNode = list;
        let togglePrevious = true;

        while (currentInnerNode !== currentNode) {
            if (currentInnerNode.value === currentNode.value) {
                previous.next = currentNode.next ? currentNode.next : null;
                togglePrevious = false;
                break;
            } else {
                currentInnerNode = currentInnerNode.next;
            }
        }

        previous = togglePrevious ? currentNode : previous;
        currentNode = currentNode.next;
    }

    return list;
}

// console.log(removeDuplicates(LinkedList));

// --------------------- // 2.2 // ---------------------------

const kthFromLast = (list, k) => { // {1} -> {2} -> {3} -> {4} -> {10} -> {1}
    // iterative way    
    // iterate twice simultaniously
    // let size = 0;
    let p1 = list;
    let p2 = list;

    for (let i = 0; i < k; i++) {
        if (!p1) {
            return null;
        }

        p1 = p1.next;
    }

    while (p1) {
        p1 = p1.next;
        p2 = p2.next;
    }

    return p2;

    // recursive way

    let current = {};

    if (list) {
        let counter = kthFromLast(list.next, k);
        if (counter === k) {
            return list;
        } else {
            return typeof counter === 'number' ? counter + 1 : counter;
        }
    } else {
        return 1;
    }
}

// console.log(kthFromLast(LinkedList, 3));

// --------------------- // 2.3 // ---------------------------

const deleteInTheMiddle = (node) => { // {3}, {1} -> {2} -> {3} -> {4} -> {10} -> {1} 
    if (!node || !node.next) { // i have access only to node, not to whole list
        return false;
    }

    node.value = node.next.value;
    node.next = node.next.next;

    return true;
}

// deleteInTheMiddle(third);
// console.log(LinkedList);

// --------------------- // 2.4 // ---------------------------

const LinkedList4 = new Node(5); // {5} -> {3} -> {2} -> {4} -> {10} -> {1} 
LinkedList4.add(3);
LinkedList4.add(2);
LinkedList4.add(4);
LinkedList4.add(10);
LinkedList4.add(1);

const partition = (list, divider) => {
    let current = list;
    let previous = null;
    let final = list;

    while (current) {
        let changePrevious = true;

        if (current.value < divider) {
            if (previous) {
                previous.next = current.next ? current.next : null;
                current.next = final;
                final = current;
                current = previous.next;
                changePrevious = false;
            }
        }

        changePrevious && (previous = current) && (current = current.next);
    }

    return final;
}

// console.log(partition(LinkedList4, 5));

// --------------------- // 2.5 // ---------------------------

const List1 = new Node(7); // {7} -> {1} -> {9} 
List1.add(1);
List1.add(9);

const List2 = new Node(5); // {5} -> {9} -> {2} 
List2.add(9);
List2.add(2);

const produceNumber = (list) => {
    if (list.next) {
        const previousDigits = produceNumber(list.next);
        return previousDigits + list.value.toString();
    } else {
        return list.value.toString();
    }
}
const sumLists = (list1, list2) => {
    const result = (+produceNumber(list1) + +produceNumber(list2)).toString();
    const resultList = new Node(result[result.length - 1]);
    let lastNode = resultList;

    for (let i = result.length - 2; i >= 0; i--) {
        lastNode.next = new Node(result[i]);
        lastNode = lastNode.next;
    }

    return resultList;
}

// console.log(sumLists(List1, List2));

// --------------------- // 2.6 // ---------------------------

const LinkedList6 = new Node(5); // {5} -> {3} -> {2} -> {3} -> {5}
LinkedList6.add(3);
LinkedList6.add(2);
LinkedList6.add(3);
LinkedList6.add(5);

const isPalindrome = (list) => {
    let p1 = list;
    let numbers = '';

    while (p1) {
        numbers += p1.value;
        p1 = p1.next
    }

    return numbers = numbers.split('').reverse().join('');
}

console.log(isPalindrome(LinkedList6));