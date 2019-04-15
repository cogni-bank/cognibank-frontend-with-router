import React, { Component } from "react";

class SecurityQuestion extends Component {
  state = {
    question: "Your grandFather's name",
    answer: "",
    name: ""
  };

  /* UserName and password textbox handling*/
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /*handling security questions recived from user management for corresponding userid*/
  checkAns = () => {
    console.log("inside checkAns Function");
    if (this.state.answer === "MeESt") {
      console.log("inside check ans if");
      alert("You Answered correct !!!! ");
    } else {
      console.log("inside check ans else");
      alert("You Answered Wrong !!!! ");
      this.props.switchView("LoginView");
    }
  };

  render() {
    return (
      <form>
        <div>
          <label>{this.state.question}</label>
          <input
            type="text"
            id="answer"
            name="answer"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <br />
        <div className="forUserAndSingIn">
          <button
            type="button"
            id="loginBtn"
            name="login"
            onClick={() => this.checkAns(this.state)}
          >
            submit
          </button>
        </div>
      </form>
    );
  }
}
export default SecurityQuestion;
