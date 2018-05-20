//@flow
import type { State, Action } from "./types.js";

export default (state: State, action: Action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload
      };
    default:
      return state;
  }
};
