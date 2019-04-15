import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Registration extends Component {
  state = {
    user: {},
    currentView: this.props.currentView
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  /*  */
  handleRegistraton = e => {
    e.preventDefault();

    //send request to security to validate user
    fetch("http://localhost:8090/registerUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        details: {
          mobile: this.state.mobile,
          street: this.state.street,
          city: this.state.city,
          state: this.state.state,
          country: this.state.country,
          zip: this.state.zip,
          ssn: this.state.ssn
        }
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

        if (response.registered) {
          this.setState({ currentView: "login" });
          this.props.loginMessage("Successfully registered!");
        }
      })
      .catch(error => {
        console.log("Error --->>>", error);

        super.setState({ error });
      });
  };

  render() {
    if (this.state.currentView === "login") {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid bg-light py-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body">
              <h3 className="text-center mb-4">Sign-up</h3>
              <div className="alert alert-danger 	d-none">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                Password is too short.
              </div>
              <fieldset>
                <form onSubmit={this.handleRegistraton}>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="E-mail Address"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="Mobile"
                      name="mobile"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="Street Address"
                      name="street"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <div className="input-group">
                      <input
                        onChange={this.handleChange}
                        className="form-control input-md"
                        placeholder="Apt/Ste #"
                        name="apt"
                        type="text"
                        required
                      />
                      &nbsp;
                      <input
                        onChange={this.handleChange}
                        className="form-control input-md"
                        placeholder="City"
                        name="city"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group has-error">
                    <div className="input-group">
                      <input
                        onChange={this.handleChange}
                        className="form-control input-sm"
                        placeholder="State"
                        name="state"
                        type="text"
                        required
                      />
                      &nbsp;
                      <input
                        onChange={this.handleChange}
                        className="form-control input-sm"
                        placeholder="Country"
                        name="country"
                        type="text"
                        required
                      />
                      &nbsp;
                      <input
                        onChange={this.handleChange}
                        className="form-control input-sm"
                        placeholder="ZIP Code"
                        name="zip"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="SSN"
                      name="ssn"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-error">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="User Name"
                      name="userName"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-group has-success">
                    <div className="input-group">
                      <input
                        onChange={this.handleChange}
                        className="form-control input-md"
                        placeholder="Password"
                        name="password"
                        type="password"
                        required
                      />
                      &nbsp;
                      <input
                        onChange={this.handleChange}
                        className="form-control input-md"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <select className="form-control input-lg">
                      <option defaultValue value="-1">
                        Security Question
                      </option>
                      <option value="0">what is your favourite car?</option>
                      <option value="1">
                        what is your Mother maiden name?
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.handleChange}
                      className="form-control input-lg"
                      placeholder="Security Answer"
                      name="answer"
                      type="text"
                      required
                    />
                  </div>
                  <div className="checkbox">
                    <label className="small">
                      <input
                        onChange={this.handleChange}
                        name="terms"
                        type="checkbox"
                      />
                      I have read and agree to the <a>terms of service</a>
                    </label>
                  </div>
                  <input
                    className="btn btn-lg btn-primary btn-block"
                    value="Sign Me Up"
                    type="submit"
                  />
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
