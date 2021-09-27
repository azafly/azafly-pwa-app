export function useLocalStorage() {
    const item = (key: string) => localStorage.getItem(key) as any;

    const getLocalStorageItem = (key: string) =>
        JSON.parse(item(key));
    const setLocalStorageItem = (key: string, data: any) =>
        localStorage.setItem(key, JSON.stringify(data));
    const removeLocalStorageItem = (key: string) =>
        localStorage.removeItem(key);

    return {
        getLocalStorageItem,
        setLocalStorageItem,
        removeLocalStorageItem
    };
}
