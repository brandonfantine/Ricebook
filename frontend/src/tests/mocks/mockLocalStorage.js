export const mockLocalStorage = {
    userList: "[]",
    postList: "[]",
}

export function mockGetItem(itemName) {
    return mockLocalStorage[itemName];
}

export function mockSetItem(itemName, newVal) {
    mockLocalStorage[itemName] = newVal;
}
