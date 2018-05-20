//@flow
import React, { Component } from "react";
import style from "./styleApp.css";
import { connect } from"react-redux";
import type {State, MapStateToProps} from 'src/types';

type props = {
  message: string
}

class App extends Component<props> {
  render() {
    return <div className={style.main}>{this.props.message}</div>;
  }
}
const mapStateToProps:MapStateToProps<props> = (state:State)=>({
  message:state.message
});

export default connect(mapStateToProps)(App);
