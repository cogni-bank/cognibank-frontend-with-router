import React, { Component } from "react";

class ForgotPass extends Component {
  state = {
    userName: " "
  };
  /** Handling forgot Password component */
  retriveForgotPassword = password => {
    console.log("Inside retrive method");
    fetch("http://localhost:8090/securityQuestions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userName: this.state.userName
      })
    })
      .then(res => {
        return res;
      })
      .then(() => {
        alert("Your Email has been send Successfuly");
        this.props.switchView("SecurityQuestion");
      })
      .catch(error => console.error("Error", error));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <label>
            Enter your UserName attached with this account : &nbsp;{" "}
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div>
          <button
            type="submit"
            id="submitUserName"
            onClick={() => this.retriveForgotPassword(this.state.userName)}
          >
            Submit
          </button>
        </div>
      </div>
      // </form>
    );
  }
}
export default ForgotPass;
