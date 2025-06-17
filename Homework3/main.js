const { pipe } = require('ramda');
//1.1
function calculateDiscountedPrice(products, discountRate) {
    if (!Array.isArray(products)) {
        throw new Error('Input must be an array of products');
    }
    if (products.length === 0) {
        return [];
    }
    if (typeof discountRate !== 'number' || discountRate < 0 || discountRate > 100) {
        throw new Error('Discount rate must be a number between 0 and 100');
    }
    discountRate = discountRate / 100; 
    let newProducts = [];
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let discountedPrice = product.price - (product.price * discountRate);
        newProducts.push({
            name: product.name,
            price: Number(discountedPrice.toFixed(2))
        });
    }
    return newProducts;
}
//1.2
function calculateTotalPrice(products) {
    if (!Array.isArray(products)) {
        throw new Error('Input must be an array of products');
    }

    if (products.length === 0) {
        return 0.00;
    }

    let total = 0;

    for (let i = 0; i < products.length; i++) {
        if (typeof products[i].price !== 'number' || isNaN(products[i].price)) {
            throw new Error('Each product must have a valid numeric price');
        }
        if (products[i].price < 0) {
            throw new Error('Product price cannot be negative');
        }
        if (!products[i].name || typeof products[i].name !== 'string') {
            throw new Error('Each product must have a valid name');
        }
        if (products[i].name.trim() === '') {
            throw new Error('Product name cannot be empty');
        }
        
        total += parseFloat(products[i].price);
    }
    
    return total.toFixed(2);
}
//////////////////////////////////////////////////////////
//2.1
function getFullName(person) {
    if (!person || !person.firstName || !person.lastName) {
        throw new Error('Invalid person object');
    }
    if (typeof person.firstName !== 'string' || typeof person.lastName !== 'string') {
        throw new Error('First name and last name must be strings');
    }
    if (person.firstName.trim() === '' || person.lastName.trim() === '') {
        throw new Error('First name and last name cannot be empty');
    }

    return `${person.firstName} ${person.lastName}`;
}
//2.2
const splitWords = (str) => str.toLowerCase().split(/\s+/);
const unique = (arr) => Array.from(new Set(arr));
const sort = (arr) => [...arr].sort(); 

const filterUniqueWords = pipe(
    splitWords,
    unique,
    sort
  );
//2.3
const getAllGrades = (students) => students.flatMap(student => student.grades);
const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

const getAverageGradePointFree = pipe(
    getAllGrades,
    calculateAverage
);
////////////////////////////////////////////////////////////
//3.1
function createCounter() {
    let counter = 0;
    return function() {
      counter++;
      return counter;
    };
}
//3.2
function repeatFunction(fun, num){
    return function() {
        if (num > 0){
            for (let i = 0; i < num; i++) {
                fun();
            }
        } else{
            for (;;){
                fun();
            }
        }
    }
}
////////////////////////////////////////////////////////////
//4.1
function calculateFactorial(n, result = 1) {
    if (n < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    if (n === 0 || n === 1) {
        return result;
    }
    return calculateFactorial(n - 1, result * n);
}
//4.2
function power(base, exponent, result = 1) {
    if (exponent < 0) {
        throw new Error('Exponent must be a non-negative integer');
    }
    if (exponent === 0) {
        return result;
    }
    return power(base, exponent - 1, result * base);
}
//////////////////////////////////////////////////////////////
//5.1
function lazyMap(array, mapFn) {
    let index = 0;

    return {
        next: function () {
            if (index < array.length) {
                const value = mapFn(array[index], index, array);
                index++;
                return { value, done: false };
            } else {
                return { value: undefined, done: true };
            }
        },

        [Symbol.iterator]() {
            return this;
        }
    };
}
//5.2
function fibonacciGenerator() {
    let a = 0, b = 1;

    return {
        next: function () {
            const value = a;
            [a, b] = [b, a + b];
            return { value, done: false };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}
