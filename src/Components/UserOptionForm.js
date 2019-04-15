import React, { Component } from "react";

/*Child component of ChallengePage  */
export default class UserOptionForm extends Component {
  render() {
    return (
      <div id="userOptionForm">
        <form>
          <p>Welcome {this.props.person.userName} ,</p>
          <p>
            Please choose one of the below option to authenticate your account
          </p>
          <label>
            <input
              type="radio"
              id="email"
              value="email"
              onChange={this.props.handleOptionChange}
              checked={this.props.selectedOption === "email"}
            />
            {this.props.person.email}
          </label>

          <label>
            <input
              type="radio"
              id="phone"
              value="phone"
              onChange={this.props.handleOptionChange}
              checked={this.props.selectedOption === "phone"}
            />
            {this.props.person.phone}
          </label>

          <button
            type="button"
            className="btn btn-primary"
            id="submitBtn"
            onClick={() => this.props.sendChallenge(this.props.selectedOption)}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
