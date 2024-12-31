// add to string prototype
export const getFallbackStr = (str: string, length?: number): string => {
    // if length given then return substring
    if (length && length >= 0) {
        return str.substring(0, length);
    } else {
        return str.split(' ').map((word) => word.charAt(0)).join('').toUpperCase();
    }
};

