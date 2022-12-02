"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TreeStore {
    constructor(array) {
        this.mainArray = array;
    }
    getAll() {
        return this.mainArray;
    }
    getItem(id) {
        return this.mainArray.find(e => e.id === id);
    }
    getChildren(id) {
        return this.mainArray.filter(e => e.parent === id);
    }
    getAllChildren(id, array = []) {
        const currArray = this.getChildren(id);
        array.push(...currArray);
        currArray.forEach(e => {
            this.getAllChildren(e.id, array);
        });
        return array;
    }
    getAllParents(id, array = []) {
        const currItem = this.getItem(id);
        if (currItem) {
            array.push(currItem);
            this.getAllParents(currItem.parent, array);
        }
        return array.slice(1);
    }
}
const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
const ts = new TreeStore(items);
console.log(ts.getAllParents(7));
//# sourceMappingURL=index.js.map