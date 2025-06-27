//1.
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com"
};

Object.keys(person).forEach(prop => {
    Object.defineProperty(person, prop, {
        writable: false,
        configurable: false,
    });
});

Object.defineProperty(person, 'updateInfo', {
    value: function(newInfo) {
        console.log("Attempting to update person info...");
        for (let key in newInfo) {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
                console.warn(`Cannot update non-writable property '${key}'.`);
            }
        }
    },
    writable: false,
    enumerable: false,
    configurable: false
});

Object.defineProperty(person, 'address', {
    value: {},
    writable: true, 
    enumerable: false,
    configurable: false
});

console.log('Task 1: Initial Person Object & Descriptors', Object.getOwnPropertyDescriptors(person));

person.updateInfo({ firstName: "Jane" });
console.log('Task 1: After trying to update', `First Name remains: ${person.firstName}`);

person.address.city = "New York";
console.log('Task 1: After adding address details', `Address property is non-enumerable. Access directly:`, person.address);
console.log('Task 1: Final Person Object', person);
console.log('-----------------------------------------------------');

//2.
const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
};

Object.defineProperties(product, {
    price: { enumerable: false, writable: false, configurable: true }, 
    quantity: { enumerable: false, writable: false, configurable: false } 
});

const getTotalPrice = (prod) => {
    const priceDesc = Object.getOwnPropertyDescriptor(prod, 'price');
    const quantityDesc = Object.getOwnPropertyDescriptor(prod, 'quantity');
    
    if (priceDesc && quantityDesc) {
        return priceDesc.value * quantityDesc.value;
    }
    return 0;
};

const deleteProperty = (obj, propName) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
    if (!descriptor) {
        throw new Error(`Property "${propName}" does not exist.`);
    }
    if (!descriptor.configurable) {
        throw new Error(`Property "${propName}" is non-configurable and cannot be deleted.`);
    }
    delete obj[propName];
    return `Property "${propName}" deleted successfully.`;
};

console.log('Task 2: Initial Product Object', Object.getOwnPropertyDescriptors(product), 'Enumerable keys:', Object.keys(product));
console.log('Task 2: Total Price', `Total price is: $${getTotalPrice(product)}`);

try {
    const result = deleteProperty(product, 'price');
    console.log('Task 2: Deleting "price"', result, product);
} catch (e) {
    console.log('Task 2: Error deleting "price"', e.message);
}

try {
    deleteProperty(product, 'quantity');
} catch (e) {
    console.log('Task 2: Deleting "quantity"', e.message, product);
}
console.log('Task 2: Final Product Object', Object.getOwnPropertyDescriptors(product));
console.log('-----------------------------------------------------');

//3.
const createBankAccount = (initialBalance) => ({
    _balance: initialBalance,

    get formattedBalance() {
        return `$${this._balance.toLocaleString()}`;
    },

    set balance(amount) {
        if (typeof amount === 'number' && amount >= 0) {
            this._balance = amount;
            console.log(`Balance updated to ${this.formattedBalance}`);
        } else {
            console.error("Invalid balance amount provided.");
        }
    },

    transfer: function(targetAccount, amount) {
        if (amount > 0 && this._balance >= amount) {
            this._balance -= amount;
            targetAccount._balance += amount;
            console.log("Task 3: Transfer Successful", `Transferred $${amount}.`);
        } else {
            console.log("Task 3: Transfer Failed", "Check amount or insufficient funds.");
        }
    }
});

const accountA = createBankAccount(1000);
const accountB = createBankAccount(500);

console.log("Task 3: Initial State", 
    `Account A: ${accountA.formattedBalance}`, 
    `Account B: ${accountB.formattedBalance}`
);

accountA.transfer(accountB, 250);

console.log("Task 3: After Transfer",
    `Account A: ${accountA.formattedBalance}`,
    `Account B: ${accountB.formattedBalance}`
);

console.log("------------------------------------------------------");

//4.
function createImmutableObject(obj) {
    const newObj = Array.isArray(obj) ? [] : {};
    
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const newValue = (typeof value === 'object' && value !== null) 
            ? createImmutableObject(value) 
            : value;

        Object.defineProperty(newObj, key, {
            value: newValue,
            writable: false,
            enumerable: true,
            configurable: false
        });
    });
    return Object.freeze(newObj); // freeze prevents adding new props
}

const sourceObject = { name: "Matrix", year: 1999, cast: [{ name: "Keanu" }, { name: "Carrie-Anne" }] };
const immutableObject = createImmutableObject(sourceObject);
console.log('Task 4: Immutable Object Creation', 'Source:', sourceObject, 'Immutable:', immutableObject);

try {
    immutableObject.year = 2000;
} catch(e) {
    console.log('Task 4: Attempting to mutate', `Error caught: ${e.message}`, `Year remains: ${immutableObject.year}`);
}

console.log('------------------------------------------------------');

//5.
function observeObject(obj, callback) {
    return new Proxy(obj, {
        get(target, property, receiver) {
            callback(property, 'get', target[property]);
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            callback(property, 'set', value);
            return Reflect.set(target, property, value, receiver);
        }
    });
}

const observedPerson = observeObject(
    person,
    (prop, action, value) => {
        console.log('Task 5: Observation Log', `Action: "${action}", Property: "${prop}", Value: ${JSON.stringify(value)}`);
    }
);

let name = observedPerson.firstName;
observedPerson.age = 29; 

console.log('Task 5: Observed Person Object', observedPerson);
console.log('------------------------------------------------------');

//6.
function deepCloneObject(obj, cache = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (cache.has(obj)) return cache.get(obj);
    
    let clone;
    if (obj instanceof Date) clone = new Date(obj.getTime());
    else if (obj instanceof RegExp) clone = new RegExp(obj.source, obj.flags);
    else clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    
    cache.set(obj, clone);
    
    for (let key of Reflect.ownKeys(obj)) {
        clone[key] = deepCloneObject(obj[key], cache);
    }
    
    return clone;
}

const circularObject = { a: 1, b: { c: [2, 3] } };
circularObject.d = circularObject;
const cloned = deepCloneObject(circularObject);

console.log('Task 6: Deep Cloning with Circular Reference', 
    `Original and clone are different objects: ${circularObject !== cloned}`,
    `Nested objects are also different: ${circularObject.b !== cloned.b}`,
    `Circular reference was handled: ${cloned.d === cloned}`
);

console.log('------------------------------------------------------');

//7.
function validateObject(obj, schema) {
    for (const key in schema) {
        const rule = schema[key];
        const value = obj[key];
        
        if (rule.required && obj[key] === undefined) {
            console.error(`Validation Failed: Missing required property "${key}".`);
            return false;
        }
        
        if (value !== undefined) {
            if (rule.type && typeof value !== rule.type) {
                console.error(`Validation Failed: Property "${key}" expects type "${rule.type}", got "${typeof value}".`);
                return false;
            }
            if (rule.validate && !rule.validate(value)) {
                console.error(`Validation Failed: Custom rule for "${key}" failed.`);
                return false;
            }
        }
    }
    console.log("Validation Passed!");
    return true;
}

const userSchema = {
    username: { required: true, type: 'string', validate: v => v.length > 3 },
    age: { required: true, type: 'number', validate: v => v >= 18 },
    email: { required: false, type: 'string', validate: v => v.includes('@') }
};

console.log('Task 7: Object Validation');
validateObject({ username: 'testuser', age: 30, email: 'test@test.com' }, userSchema); 
validateObject({ username: 'bob', age: 25 }, userSchema); 
validateObject({ username: 'alice', age: '17' }, userSchema);