import React, { Component } from "react";

class forgotUser extends Component {
  state = {
    userEmail: "",
    securityQue: "Who was your first girlfriend?",
    currentView: this.props.currentView
  };

  /*handling Forgot userName to send the corresponding email (user management - Notification Team's) */
  retriveForgotUserName = userName => {
    console.log("Inside retrive method");
    fetch("http://localhost:8090/securityQuestions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userEmail: this.state.userEmail,
        securityQue: "You Submitted your email successfuly"
      })
    })
      .then(res => {
        return res;
      })
      .then(() => {
        alert("Your UserName has been send to given Email");
        this.props.switchView("LoginView");
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
          <label>Enter your Email attached with this account : &nbsp; </label>
          <input
            type="text"
            id="userEmail"
            name="userEmail"
            onChange={this.handleChange}
          />
        </div>
        <br />

        <button
          type="submit"
          id="submitEmail"
          onClick={() => this.retriveForgotUserName(this.state.userEmail)}
        >
          Submit
        </button>
      </div>
    );
  }
}
export default forgotUser;
