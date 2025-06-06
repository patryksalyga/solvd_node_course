import {
    addValues,
    stringifyValue,
    invertBoolean,
    convertToNumber,
    coerceToType,
    deepClone
} from './util.js';

console.log('--- Test addValues ---');
console.log(addValues(5, 10)); // 15
console.log(addValues('foo', 'bar')); // "foobar"
console.log(addValues([1, 2], [3, 4])); // [1, 2, 3, 4]
console.log(addValues({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }

console.log('--- Test stringifyValue ---');
console.log(stringifyValue(123)); // "123"
console.log(stringifyValue({ a: 1 })); // '{"a":1}'

console.log('--- Test invertBoolean ---');
console.log(invertBoolean(true)); // false
console.log(invertBoolean(false)); // true

console.log('--- Test convertToNumber ---');
console.log(convertToNumber("42")); // 42
console.log(convertToNumber("3.14")); // 3.14

console.log('--- Test coerceToType ---');
console.log(coerceToType("true", "boolean")); // true
console.log(coerceToType(0, "boolean")); // false
console.log(coerceToType("123.45", "number")); // 123.45

console.log('--- Test deepClone ---');
const original = { x: true };
const clone = deepClone(original);
console.log(clone); // deep clone of original
console.log(clone !== original); // true
console.log(clone.y !== original.y); // true
original.x = invertBoolean(original.x);
console.log(original.x); // false
console.log(clone.x); // true (remains unchanged)
