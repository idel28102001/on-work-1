export type Id = number | string;

export default interface Item {
    id: Id;
    parent: string | number,
    type?: null | string
}