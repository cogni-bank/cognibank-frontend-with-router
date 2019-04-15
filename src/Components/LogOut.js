import React, { Component } from "react";

export default class LogOut extends Component {
  state = {
    view: "loginView"
  };

  handleOnClick = e => {
    this.props.logOut(this.state.view);
  };

  render() {
    return (
      <div className="logOut">
        <button
          className="btn btn-secondary"
          type="button"
          id="logOut"
          name="logOut"
          onClick={() => this.handleOnClick()}
        >
          LogOut
        </button>
      </div>
    );
  }
}
