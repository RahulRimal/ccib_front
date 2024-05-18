
export const humanizeString = (str, { capitalizeOnlyOne = true } = {}) => {
    // Replace all underscores with spaces and split the string into an array of words
    let words = str.replace(/_/g, ' ').split(' ');

    if (capitalizeOnlyOne) {
        // Capitalize the first letter of the first word
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    else {
        // Capitalize the first letter of each word
        words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    }

    // Join the words back into a single string
    return words.join(' ');
}


export function flattenNestedObject(obj) {
    const flattened = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                flattened[nestedKey] = nestedValue;
            }
        } else {
            flattened[key] = value;
        }
    }

    return flattened;
}

export function flattenObject(obj, parentKey = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flattenObject(obj[key], newKey));
        } else {
            acc[newKey] = obj[key];
        }
        return acc;
    }, {});
}