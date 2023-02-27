export const parseItemFromLocalStorage = (name: string) => {
    let item = localStorage.getItem(name);
    let parsedItem: string = '';

    if (item) {
        parsedItem = JSON.parse(item);
        return parsedItem;
    }

    return null;
}