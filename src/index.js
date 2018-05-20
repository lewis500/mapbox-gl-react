//@flow
import React from "react";
import { render } from "react-dom";
import App from "./components/app";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer";

let el = document.getElementById("root");
fetch("data/data.json")
  .then(d => d.json())
  .then(initialState => {
    const store = createStore(reducer, initialState);
    if (el)
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        el
      );
  });
