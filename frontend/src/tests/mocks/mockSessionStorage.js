export let mockSessionStorage = {
}

export function mockSessionGetItem(itemName) {
    return mockSessionStorage[itemName];
}

export function mockSessionSetItem(itemName, newVal) {
    mockSessionStorage[itemName] = newVal;
}

export function mockClear() {
    mockSessionStorage = {};
}