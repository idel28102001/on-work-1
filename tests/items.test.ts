import {TreeStore} from "../src";

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

describe('get All elements', () => {
    test('all elements', () => {
        expect(ts.getAll().length).toBe(items.length);
    });
})

describe('getItem', () => {
    test('get element 1', () => {
        const id = 1;
        expect(ts.getItem(id)).toEqual(expect.objectContaining({id: 1, parent: 'root'}))
    })
    test('get element 3', () => {
        const id = 3;
        expect(ts.getItem(id)).toEqual(expect.objectContaining({id: 3, parent: 1, type: 'test'}))
    })
    test('get element 5', () => {
        const id = 5;
        expect(ts.getItem(id)).toEqual(expect.objectContaining({id: 5, parent: 2, type: 'test'}))
    })
    test('get element 7', () => {
        const id = 7;
        expect(ts.getItem(id)).toEqual(expect.objectContaining({id: 7, parent: 4, type: null}))
    })
    test('get element 99', () => {
        const id = 99;
        expect(ts.getItem(id)).toBe(undefined)
    })
});

describe('getChildren', () => {
    test('get children 1', () => {
        const id = 1;
        expect(ts.getChildren(id)).toEqual(expect.arrayContaining(
            [{id: 2, parent: 1, type: 'test'},
                {id: 3, parent: 1, type: 'test'}]));
    })
    test('get children 3', () => {
        const id = 3;
        expect(ts.getChildren(id)).toEqual(expect.arrayContaining([]));
    })
    test('get children 2', () => {
        const id = 2;
        expect(ts.getChildren(id)).toEqual(expect.arrayContaining(
            [{id: 4, parent: 2, type: 'test'},
                {id: 5, parent: 2, type: 'test'},
                {id: 6, parent: 2, type: 'test'},]));
    })
    test('get children 4', () => {
        const id = 4;
        expect(ts.getChildren(id)).toEqual(expect.arrayContaining(
            [{id: 7, parent: 4, type: null},
                {id: 8, parent: 4, type: null}]));
    })
    test('get children 99', () => {
        const id = 99;
        expect(ts.getChildren(id)).toEqual(expect.arrayContaining(
            []));
    })
});

describe('getAllChildren', () => {
    test('get children 1', () => {
        const id = 1;
        expect(ts.getAllChildren(id)).toEqual(expect.arrayContaining(
            [{id: 2, parent: 1, type: 'test'},
                {id: 3, parent: 1, type: 'test'},

                {id: 4, parent: 2, type: 'test'},
                {id: 5, parent: 2, type: 'test'},
                {id: 6, parent: 2, type: 'test'},

                {id: 7, parent: 4, type: null},
                {id: 8, parent: 4, type: null},]));
    })
    test('get children 2', () => {
        const id = 2;
        expect(ts.getAllChildren(id)).toEqual(expect.arrayContaining([
            {id: 4, parent: 2, type: 'test'},
            {id: 5, parent: 2, type: 'test'},
            {id: 6, parent: 2, type: 'test'},

            {id: 7, parent: 4, type: null},
            {id: 8, parent: 4, type: null}]));
    })
    test('get children 4', () => {
        const id = 4;
        expect(ts.getAllChildren(id)).toEqual(expect.arrayContaining(
            [{id: 7, parent: 4, type: null},
                {id: 8, parent: 4, type: null}]));
    })
    test('get children 7', () => {
        const id = 7;
        expect(ts.getAllChildren(id)).toEqual(expect.arrayContaining(
            []));
    })
    test('get children 99', () => {
        const id = 99;
        expect(ts.getAllChildren(id)).toEqual(expect.arrayContaining(
            []));
    })
});

describe('getAllParents', () => {
    test('get parent 1', () => {
        const id = 1;
        expect(ts.getAllParents(id)).toEqual(expect.arrayContaining(
            []));
    })
    test('get parent 2', () => {
        const id = 2;
        expect(ts.getAllParents(id)).toEqual(expect.arrayContaining([
            {id: 1, parent: 'root'}]));
    })
    test('get parent 4', () => {
        const id = 4;
        expect(ts.getAllParents(id)).toEqual(expect.arrayContaining(
            [{id: 1, parent: 'root'},
                {id: 2, parent: 1, type: 'test'}]));
    })
    test('get parent 7', () => {
        const id = 7;
        expect(ts.getAllParents(id)).toEqual(expect.arrayContaining(
            [{id: 4, parent: 2, type: "test"}, {id: 2, parent: 1, type: "test"}, {id: 1, parent: "root"}]));
    })
    test('get parent 99', () => {
        const id = 99;
        expect(ts.getAllParents(id)).toEqual(expect.arrayContaining(
            []));
    })
});