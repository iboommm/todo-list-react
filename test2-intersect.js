const arr1 = [1, 2, 3, 4, 5, 6, 7, 7, 8, 2, 8, 9, 10];
const arr2 = [7, 8, 9, 10, 11, 12, 13, 14];

var setA = new Set(arr1);
var setB = new Set(arr2);

const result = new Set([...setA].filter((x) => [...setB].includes(x)));

console.log('result', Array.from(result));
