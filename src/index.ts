import Item, {Id} from "./types/item";
import TreeStoreType from "./types/TreeStore";

export class TreeStore implements TreeStoreType {
    private readonly mainArray: Array<Item>;

    constructor(array: Array<Item>) {
        this.mainArray = array;
    }

    public getAll(): Array<Item> {
        return this.mainArray;
    }

    public getItem(id: Id): Item | undefined {
        return this.mainArray.find(e => e.id === id);
    }

    public getChildren(id: Id): Array<Item> {
        return this.mainArray.filter(e => e.parent === id);
    }

    public getAllChildren(id: Id, array: Array<Item> = []): Array<Item> {
        const currArray = this.getChildren(id);
        array.push(...currArray);
        currArray.forEach(e => {
            this.getAllChildren(e.id, array);
        });
        return array;
    }

    public getAllParents(id: Id, array: Array<Item> = []): Array<Item> {
        const currItem = this.getItem(id);
        if (currItem) {
            array.push(currItem);
            this.getAllParents(currItem.parent, array);
        }
        return array.slice(1);
    }
}

const items = [
    {id: 1, parent: 'root'},
    {id: 2, parent: 1, type: 'test'},
    {id: 3, parent: 1, type: 'test'},

    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},

    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
];
const ts = new TreeStore(items);
console.log(ts.getAllParents(7))