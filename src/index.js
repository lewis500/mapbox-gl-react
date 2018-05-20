//@flow
import React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { randomNormal } from "d3-random";
import { UPDATE_DATA } from "../messages";
import socket from "./socket";

const center = [-0.05800765456319823, 51.502950702527215],
  distributionX = randomNormal(center[0], 0.01),
  distributionY = randomNormal(center[1], 0.01),
  data = Array(50)
    .fill(0)
    .map(d => [distributionX(), distributionY()]);

fetch("data/base-style.json")
  .then(d => d.json())
  .then(base => {
    const store = createStore(reducer, {
      base,
      data,
      dataActive: true
    });

    socket.on(UPDATE_DATA, data => {
      store.dispatch({ type: "SET_DATA", payload: data });
    });

    let el = document.getElementById("root");
    if (el)
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        el
      );
  });
