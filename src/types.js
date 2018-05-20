//@flow
export type State = {
  dataActive: boolean,
  style: Object,
  data: number[][]
};
export type Action =
  | {
      type: "TOGGLE_DATA"
    }
  | {
      type: "SET_DATA",
      payload: [number, number][]
    };
export type Dispatch = (a: Action) => void;
