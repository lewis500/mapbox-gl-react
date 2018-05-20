//@flow
import React, { Component } from "react";
import css from "./styleApp.css";
import { connect } from "react-redux";
import type { State, Dispatch } from "src/types";
import mapboxgl from "mapbox-gl";
import { getStyle } from "src/selectors";
mapboxgl.accessToken =
  "pk.eyJ1IjoibGV3aXM1MDAiLCJhIjoiY2l0Z2V3ZWRhMDBsbjJvbWs4cHVvNzdrdSJ9.7d92mc2FzeKfYeraoLIljg";

type props = {
  style: Object,
  dataActive: boolean,
  toggleData: () => void
};

class App extends Component<props> {
  map: Object | null;
  mapContainer: HTMLDivElement | null;

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.props.style,
      center: [-0.05800765456319823, 51.502950702527215],
      zoom: 13
    });
  }

  componentWillUpdate(props) {
    if (this.map && props.style !== this.props.style)
      this.map.setStyle(props.style);
  }

  render() {
    return (
      <div className={css.main}>
        <div className={css.checkbox} onClick={this.props.toggleData}>
          <span>{this.props.dataActive && "✔"}</span> show data
        </div>
        <div
          ref={el => (this.mapContainer = el)}
          className={css.mapContainer}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  style: getStyle(state),
  dataActive: state.dataActive
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleData() {
    dispatch({ type: "TOGGLE_DATA" });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
