
export function useStorage() {
    return {
        setItem: (key: string, value: any) => {
            // if exists, update
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
            localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
        },
        getItem: (key: string) => localStorage.getItem(key),
        getJson: (key: string) => JSON.parse(localStorage.getItem(key) || '{}'),
        getInt: (key: string) => parseInt(localStorage.getItem(key) || '0'),
        getBoolean: (key: string) => localStorage.getItem(key) === 'true',
        removeItem: (key: string) => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
    };
}