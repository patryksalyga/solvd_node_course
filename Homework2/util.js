export function addValues(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    }
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
        return { ...a, ...b };
    }
    throw new Error('Unsupported types for addition');
}

export function stringifyValue(value) {
    if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value);
    }
    return String(value);
}

export function invertBoolean(value) {
    if (typeof value !== 'boolean') {
        throw new Error('Value must be a boolean');
    }
    return !value;
}

export function convertToNumber(value) {
    const num = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(num)) {
        throw new Error('Value cannot be converted to a number');
    }
    return num;
}


export function coerceToType(value, type) {
    switch (type) {
        case 'string':
            return stringifyValue(value);
        case 'number':
            return convertToNumber(value);
        case 'boolean':
            let boolResult;
            if (typeof value === 'string') {
                boolResult = value.toLowerCase() === 'true';
            } else if (typeof value === 'number') {
                boolResult = value !== 0;
            } else if (typeof value === 'boolean') {
                boolResult = value;
            } else {
                throw new Error('Value cannot be coerced to boolean');
            }

            return invertBoolean(invertBoolean(boolResult));
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}


export function deepClone(value, weakMap = new WeakMap()) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value);
    }

    if (value instanceof Map) {
        return new Map([...value].map(([k, v]) => [deepClone(k, weakMap), deepClone(v, weakMap)]));
    }

    if (value instanceof Set) {
        return new Set([...value].map((v) => deepClone(v, weakMap)));
    }

    if (weakMap.has(value)) {
        return weakMap.get(value);
    }

    const result = Array.isArray(value) ? [] : {};
    weakMap.set(value, result);

    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            result[key] = deepClone(value[key], weakMap);
        }
    }

    return result;
}
