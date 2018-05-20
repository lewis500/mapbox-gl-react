//@flow
import React from "react";
import { render } from "react-dom";
import App from "./components/app";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { randomNormal } from "d3-random";

const center = [-0.05800765456319823, 51.502950702527215];
const distributionX = randomNormal(center[0], 0.01);
const distributionY = randomNormal(center[1], 0.01);
const data = Array(50)
  .fill(0)
  .map(d => {
    return [distributionX(), distributionY()];
  });

let el = document.getElementById("root");
fetch("data/base-style.json")
  .then(d => d.json())
  .then(base => {
    const store = createStore(reducer, {
      base,
      data,
      dataActive: true
    });
    console.log(data);
    if (el)
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        el
      );
  });
