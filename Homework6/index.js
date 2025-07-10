const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

function localize(...keys) {
    return keys
        .map(key => translations[language][key])
        .join('');
}

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr")

console.log("\n---------------------------------------------------------\n");

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

function highlightKeywords(template, keywords) {
    return template.replace(/\$\{(\d+)\}/g, (_, index) => {
        const word = keywords[parseInt(index)];
        return `<span class='highlight'>${word}</span>`;
    });
}

const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

console.log("\n---------------------------------------------------------\n");

function multiline(strings, ...values) {
    const fullString = strings.reduce((acc, str, i) => {
        return acc + str + (values[i] ?? "");
    }, "");

    return fullString
        .trim()
        .split('\n')
        .map((line, index) => `${index + 1} ${line}`)
        .join('\n');
}

const code = multiline`
function add(a, b) {
  return a + b;
}
`;

console.log(code);
// Expected:
// "1 function add(a, b) {
//  2 return a + b;
//  3 }"

console.log("\n---------------------------------------------------------\n");

function debouncedSearch(query) {
    // Perform search operation with the query
    console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

const inputElement = document.getElementById("search-input");
inputElement.addEventListener("input", event => {
    debouncedSearchHandler(event.target.value);
});

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

console.log("\n---------------------------------------------------------\n");

function onScroll(event) {
    // Handle scroll event
    console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScrollHandler);

function throttle(func, limit) {
    let lastRan = 0;

    return function (...args) {
        const context = this;
        const now = Date.now();

        if (now - lastRan >= limit) {
            func.apply(context, args);
            lastRan = now;
        }
    };
}

console.log("\n---------------------------------------------------------\n");

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24

function curry(func, arity) {
    return function curried(...args) {
        if (args.length >= arity) {
            return func(...args);
        }
        return function (...nextArgs) {
            return curried(...args, ...nextArgs);
        };
    };
}
