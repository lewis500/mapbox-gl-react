//@flow
import type { State, Action } from "./types.js";

export default (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_DATA":
      return {
        ...state,
        dataActive: !state.dataActive
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
