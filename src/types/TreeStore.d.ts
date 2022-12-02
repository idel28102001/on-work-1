import Item from "./item";

export default interface TreeStoreType {
    getAll: () => Array<Item>,
    getItem: (id: Id) => Item | undefined,
    getChildren: (id: Id) => Array<Item>,
    getAllChildren: (id: Id) => Array<Item>,
    getAllParents: (id: Id) => Array<Item>,

}