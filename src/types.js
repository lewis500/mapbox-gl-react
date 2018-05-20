//@flow
export type State = {
    dataActive: boolean,
    style: Object,
    data:number[][]
};
export type Action = {
    type: 'TOGGLE_DATA',
}
export type Dispatch = (a:Action)=>void;