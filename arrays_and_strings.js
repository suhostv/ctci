// -------- // Hints and Questions for interview // ----------

/*
    General:
        1) Start talking about brute-force solution and then get more eficcient
    String:
        1) Ask if string is ASCII or Unicode (ASCII is 128-character, extended ASCII is 156-character)
        2) Sorting takes O(n*log(n)), so sometimes it is better than iterating twice through string (O(n2))
*/

// --------------------- // 1.1 // ---------------------------

const isUnique = (string) => { // time: O(n)
    return new Set(string.split('')).size === string.length; // space: (1)

    // Another approach would be  to check each character with 
    // array of all characters available
}

// console.log(isUnique('string'));
// console.log(isUnique('stringg'));

// --------------------- // 1.2 // ---------------------------

// done this task assuming that permutations doesnt necessary must be same size as provided string
const isPermutation = (perm, string) => { // time: O(string)
    const hash = {}; // space: O(string)

    for (let i = 0; i < string.length; i++) {
        hash[string[i]] = hash[string[i]] ? hash[string[i]] + 1 : 1;
    }

    for (let i = 0; i < perm.length; i++) {
        if (hash[perm[i]]) {
            hash[perm[i]] = hash[perm[i]] - 1;
        } else {
            return false
        };
    }
    return true;
}

// console.log(isPermutation('oolll', 'hello world'));

// --------------------- // 1.3 // ---------------------------

const urlify = (url) => { // time: O(n)
    return url.trim().split(' ').join('%20'); // space: O(1)
}

// console.log(urlify('Mr John Smith   '));

// --------------------- // 1.4 // ---------------------------

const palindromPerm = (string) => { // time: O(n)
    const hash = {}; // space: O(n  )
    string = string.split(' ').join('').toLowerCase();

    for (let letter of string) {
        hash[letter] = hash[letter] ? hash[letter] + 1 : 1;
    }

    let odd = 0;

    Object.values(hash).forEach(item => {
        if (item % 2 !== 0) {
            odd++
        }
    });

    return string % 2 === 0 ? !odd : odd <= 1;
}

// console.log(palindromPerm('soso posos'));

// --------------------- // 1.5 // ---------------------------

const oneWay = (first, second) => { // time: O(max(first, second))
    if (Math.abs(first.length - second.length) > 1) { // space: O(1)
        return false;
    }

    let diff = 0;

    if (first.length === second.length) {
        return first.split('').every((item, index) => {
            if (second[index] === item) {
                return true;
            } else {
                return ++diff > 1 ? false : true;
            };
        });
    }

    if (first.length > second.length) {
        return second.split('').every((item, index) => {
            if (first[index + diff] === item) {
                return true;
            } else {
                return ++diff > 1 ? false : true;
            }
        });
    } else if (second.length > first.length) {
        return first.split('').every((item, index) => {
            if (second[index + diff] === item) {
                return true;
            } else {
                return ++diff > 1 ? false : true;
            }
        });
    }
}

// console.log(oneWay('paleontology', 'paleontoloy'))
// console.log(oneWay('paleontology', 'paleontoloogy'))
// console.log(oneWay('paleontology', 'padeontology'))
// console.log(oneWay('pale', 'bake'))

// --------------------- // 1.6 // ---------------------------

const stringCompression = (string) => { // time: O(n)
    let currentCount = 1; // space: O(n)
    let currentLetter = string.charAt(0);
    let result = '';

    for (let i = 1; i < string.length; i++) {
        if (string[i] === currentLetter) {
            currentCount++

            if (!string[i + 1] || string[i + 1] !== currentLetter) {
                result += currentCount + currentLetter;
                currentCount = 0;
                currentLetter = string[i + 1];
            }
        }
    }

    return result.length < string.length ? result : string;
}

// console.log(stringCompression('aabbccc'));

// --------------------- // 1.7 // ---------------------------

const rotateMatrix = (matrix) => { //time: O(n)
    const rotatedRight = []; //space: O(1)
    const rotatedLeft = [];

    // rotate to the right
    for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[i].length - 1; j >= 0; j--) {
            if (!rotatedRight[j]) {
                rotatedRight[j] = [];
            }

            rotatedRight[j][matrix[i].length - i] = matrix[i][j]
        }
    }

    // rotate to the left
    for (let i = matrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (!rotatedLeft[matrix[i].length - 1 - j]) {
                rotatedLeft[matrix[i].length - 1 - j] = [];
            }

            rotatedLeft[matrix[i].length - 1 - j][i] = matrix[i][j]
        }
    }

    return [rotatedRight, rotatedLeft];
}

// console.log(rotateMatrix(      
// [[1,  2,  3],               // [[3, 6, 9, 12],          // 3:  [0][2] -> [2][0]
//  [4,  5,  6],               //  [2, 5, 8, 11],          // 12: [3][2] -> [0][3]
//  [7,  8,  9],               //  [1, 4, 7, 10]]          // 8:  [2][1] -> [1][2]
//  [10, 11, 12]]                                          // 1:  [0][0] -> [2][0]
//     ))

// --------------------- // 1.8 // ---------------------------

const zeroMatrix = (matrix) => { // time: O(n)
    const zeroedMatrix = []; // space: O()
    const nullRows = {};
    const nullCols = {};

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                nullRows[i] = true;
                nullCols[j] = true;
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        zeroedMatrix.push([]);

        for (let j = 0; j < matrix[i].length; j++) {
            if (nullRows[i] || nullCols[j]) {
                zeroedMatrix[i][j] = 0
            } else {
                zeroedMatrix[i][j] = matrix[i][j];
            }
        }
    }

    return zeroedMatrix;
}

// console.log(zeroMatrix(
//     [[1,  2,  3],               
//      [4,  5,  6],               
//      [7,  8,  9],               
//      [0, 11, 12]]
// ))

// --------------------- // 1.9 // ---------------------------

// got wrong the question, assumed that string is reversed, should assumed that string is rotated
const isSubstring = (first, second) => {
    //checks if first is substring of another
}

const stringRotation = (s1, s2) => {
    return isSubstring(s1, s2.split('').reverse().join());
}

console.log(stringRotation('watterbottle', 'elttobrettawelttobrettaw'))