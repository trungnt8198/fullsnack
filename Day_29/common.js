export { validateItems };

const getInvalidItems = (items, requiredKeys) => {
    const invalidItems = [];
    items.forEach((item, index) => {
        const missingKeys = [];
        requiredKeys.forEach(key => {
            if(!item.hasOwnProperty(key))
                missingKeys.push(key);
        });
        if (missingKeys.length > 0)
            invalidItems.push({ index, missingKeys });
    });
    return invalidItems;
};

const validateItems = (items, requiredKeys) => {
    if(!Array.isArray(items)) {
        return "Input must be an array"
    }
    if(items.length === 0) {
        return "Input must not be empty";
    }
    if(items.some(item => item === null || typeof item !== "object")) {
        return "Input must contain non-null objects only";
    }

    const invalidItems = getInvalidItems(items, requiredKeys);

    if (invalidItems.length > 0) {
        return invalidItems
        .map(item => `Error: input[${item.index}] is missing keys: [${item.missingKeys.join(', ')}]`)
        .join('\n');
    }
    return "Valid";
}