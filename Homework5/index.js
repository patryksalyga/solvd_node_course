function customFilterUnique(arr, callback) {
    const seen = new Set();
    for (const item of arr) {
        const key = callback(item);
        if (seen.has(key)) {
            arr.splice(arr.indexOf(item), 1);
        } else {
            seen.add(key);
        }
    }
}

const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 1, name: 'Laptop Pro' }, 
    { id: 3, name: 'Keyboard' },
    { id: 2, name: 'Gaming Mouse' } 
];
const uniqueProductsById = customFilterUnique(products, (product) => product.id);
console.log("Original products:", products);
console.log("Unique products by ID:", uniqueProductsById); 
console.log('--------------------\n');

/////////////////////////////////////////////////////////////////////

function chunkArray(arr, size) {
    const result = [];
    const chunked = []
    for (let i = 0; i < arr.length; i++) {
        if (i % size === 0) {
            if (chunked.length > 0) {
                result.push(chunked);
            }
            chunked.length = 0;
        }
        chunked.push(arr[i]);
    }
    return result;
}

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const chunkedNumbers = chunkArray(numbers, 3);
console.log("Original numbers:", numbers);
console.log("Chunked numbers:", chunkedNumbers);
console.log('--------------------\n');

//////////////////////////////////////////////////////////////////////

function customShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const shuffledNumbers = customShuffle(numbers);
console.log("Original numbers:", numbers);
console.log("Shuffled numbers:", shuffledNumbers);
console.log('--------------------\n');

//////////////////////////////////////////////////////////////////////

function getArrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    for (const item of set1) {
        if (!set2.has(item)) {
            set1.delete(item);
        }
    }
    return Array.from(set1);
}

function getArrayUnion(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    for (const item of set2) {
        if (!set1.has(item)) {
            set1.add(item);
        }
    }

    return Array.from(set1);
}

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];

const intersection = getArrayIntersection(array1, array2);
const union = getArrayUnion(array1, array2);

console.log("Array 1:", array1);
console.log("Array 2:", array2);

console.log("Intersection:", intersection);

console.log("Union:", union);

console.log('--------------------\n');

//////////////////////////////////////////////////////////////////////

function customFilterUnique(arr, callback) {
    const seen = new Set();
    return arr.filter(item => {
        const key = callback(item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

function customShuffle(arr) {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function getArrayIntersection(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    for (const item of set1) {
        if (!set2.has(item)) set1.delete(item);
    }
    return Array.from(set1);
}

function getArrayUnion(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    for (const item of set2) {
        if (!set1.has(item)) set1.add(item);
    }
    return Array.from(set1);
}

function measureArrayPerformance(func, ...args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    return { result, duration: end - start };
}

// Built-in equivalents

function builtInUniqueByMap(arr) {
    const map = new Map();
    arr.forEach(item => map.set(item.id, item));
    return Array.from(map.values());
}

function builtInChunkArray(arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) },
        (_, i) => arr.slice(i * size, i * size + size)
    );
}

function builtInIntersection(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}

function builtInUnion(arr1, arr2) {
    return Array.from(new Set([...arr1, ...arr2]));
}

// === Test Data ===

const bigProductList = Array.from({ length: 100_000 }, (_, i) => ({
    id: i % 1000,
    name: `Product ${i}`
}));

const bigNumberList = Array.from({ length: 100_000 }, (_, i) => i);
const a1 = Array.from({ length: 50_000 }, (_, i) => i);
const a2 = Array.from({ length: 50_000 }, (_, i) => i + 25_000);

// === Tests ===

console.log("\n Task 5 – Performance Comparison");

// Task 1
const test1_custom = measureArrayPerformance(customFilterUnique, bigProductList, p => p.id);
const test1_builtin = measureArrayPerformance(builtInUniqueByMap, bigProductList);

console.log("\n Task 1 - Unique filter:");
console.log(`Custom:   ${test1_custom.duration.toFixed(2)} ms`);
console.log(`Built-in: ${test1_builtin.duration.toFixed(2)} ms`);

// Task 2
const test2_custom = measureArrayPerformance(chunkArray, bigNumberList, 100);
const test2_builtin = measureArrayPerformance(builtInChunkArray, bigNumberList, 100);

console.log("\n Task 2 - Chunk array:");
console.log(`Custom:   ${test2_custom.duration.toFixed(2)} ms`);
console.log(`Built-in: ${test2_builtin.duration.toFixed(2)} ms`);

// Task 3
const test3_custom = measureArrayPerformance(customShuffle, bigNumberList);
// const test3_builtin = measureArrayPerformance(builtInShuffle, bigNumberList);

console.log("\n Task 3 - Shuffle array:");
console.log(`Custom:   ${test3_custom.duration.toFixed(2)} ms`);
// console.log(`Built-in: ${test3_builtin.duration.toFixed(2)} ms`);

// Task 4
const test4_custom_intersection = measureArrayPerformance(getArrayIntersection, a1, a2);
const test4_builtin_intersection = measureArrayPerformance(builtInIntersection, a1, a2);

const test4_custom_union = measureArrayPerformance(getArrayUnion, a1, a2);
const test4_builtin_union = measureArrayPerformance(builtInUnion, a1, a2);

console.log("\n Task 4 - Intersection:");
console.log(`Custom:   ${test4_custom_intersection.duration.toFixed(2)} ms`);
console.log(`Built-in: ${test4_builtin_intersection.duration.toFixed(2)} ms`);

console.log("\n Task 4 - Union:");
console.log(`Custom:   ${test4_custom_union.duration.toFixed(2)} ms`);
console.log(`Built-in: ${test4_builtin_union.duration.toFixed(2)} ms`);

