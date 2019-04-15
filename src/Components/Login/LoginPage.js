import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../style/login.css";
import "../../style/HomePage.css";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    currentView: this.props.currentView
  };

  handleSubmitLogin = person => {
    //console.log("persone", person);
    //send request to security to validate user
    fetch("http://localhost:8080/loginUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userName: person.userName,
        password: person.password
      })
    })
      .then(res => {
        console.log("The res", res);
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("User name or password is wrong!");
        } else {
          throw new Error("Unknown error happened!");
        }
      })
      .then(response => {
        console.log("The response", response);

        const { userId, phone, email } = response;

        this.props.person.userId = userId;
        this.props.person.phone = phone;
        this.props.person.email = email;
        this.props.person.userName = person.userName;

        this.setState({ currentView: "challengeView" });
        this.props.submitState(this.props.person);
      })
      .catch(error => {
        console.log("Error --->>>", error);
        super.setState({ error });
      });
  };

  /* UserName and password textbox handling*/
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* Function to handle the login and checking the input fields on login form*/
  handleLogin = e => {
    e.preventDefault();
    e.stopPropagation();
    const newState = JSON.parse(JSON.stringify(this.state));

    newState.formError = false;
    if (this.state.userName === "") {
      newState.userNameError = "Please fill the user name.";
      newState.formError = true;
    }

    if (this.state.password === "") {
      newState.passwordError = "Please fill the password.";
      newState.formError = true;
    } else if (
      this.state.password.length < 8 ||
      this.state.password.length > 32
    ) {
      newState.passwordError = "Please enter 8-32 characters.";
      newState.formError = true;
    }

    if (!newState.formError) {
      this.handleSubmitLogin(this.state);
    } else {
      this.props.submitState(newState);
      this.setState(newState);
    }
  };

  /*Function to redirect to Sign up page for registration */
  handleSignUpClick = () => {
    this.setState({ currentView: "RegistrationPage" });
  };

  handleForgotUsernameClick = () => {
    this.setState({ currentView: "ForgetUsername" });
  };

  handleForgotPasswordClick = () => {
    this.setState({ currentView: "ForgetPassword" });
  };

  render() {
    if (this.state.currentView === "challengeView") {
      return <Redirect to="/ChallengeView" />;
    } else if (this.state.currentView === "RegistrationPage") {
      return <Redirect to="/RegistrationPage" />;
    } else if (this.state.currentView === "ForgetUsername") {
      return <Redirect to="/ForgetUsername" />;
    } else if (this.state.currentView === "ForgetPassword") {
      return <Redirect to="/ForgetPassword" />;
    }
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="cogniBankLogo" />
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card rounded-0">
                  <div className="card-header">
                    <h3 className="mb-0">Login</h3>
                  </div>
                  {this.props.loginMessage ? (
                    <div className="alert alert-success alert-dismissible">
                      {this.props.loginMessage}
                    </div>
                  ) : (
                    ""
                  )}
                  {this.props.error ? (
                    <div className="alert alert-danger alert-dismissible">
                      {this.props.error.message}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="card-body">
                    <form
                      onSubmit={this.handleLogin}
                      className={
                        this.state.formError ? "form was-validated" : "form"
                      }
                      autoComplete="off"
                      noValidate=""
                      id="formLogin"
                      role="form"
                    >
                      <div className="form-group">
                        <label htmlFor="userName">Username</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-0"
                          name="userName"
                          id="userName"
                          onChange={this.handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          {this.state.userNameError}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control form-control-lg rounded-0"
                          onChange={this.handleChange}
                          autoComplete="new-password"
                          name="password"
                          id="password"
                          minLength="8"
                          maxLength="32"
                          required
                        />
                        <div className="invalid-feedback">
                          {this.state.passwordError}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary btn-lg float-right"
                        onClick={this.handleSignUpClick}
                      >
                        Sign Up
                      </button>

                      <button
                        type="submit"
                        className="btn btn-success btn-lg float-left"
                        id="btnLogin"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Forgot UserName/Forgot Password */}
        <br />
        <div>
          <button
            type="button"
            className="btn btn-warning btn-lg float-center"
            id="forgotUserBtn"
            onClick={this.handleForgotUsernameClick}
          >
            Forgot UserName?
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            type="button"
            className="btn btn-danger btn-lg float-center"
            id="forgotPasswordBtn"
            onClick={this.handleForgotPasswordClick}
          >
            Forgot Password?
          </button>
        </div>
        {/* Forgot UserName/Forgot Password */}
      </div>
    );
  }
}

export default Login;
