import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login/LoginPage";
import Challenge from "./Components/ChallengePage";
import AccountDetails from "./Components/AccountDetails";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import RegistrationPage from "./Components/RegistrationPage";
import ForgetPassword from "./Components/ForgotPassword";
import ForgetUsername from "./Components/ForgotUsername";
import TransactionDetails from "./Components/TransactionDetails";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: { userId: "12345", userName: "", phone: "", email: "" },
      loginMessage: "",
      currentView: "",
      accountNumber: "213251"
    };
  }

  submitChange = newPerson => {
    console.log("seeting state" + newPerson.userId);
    const newState = { ...this.state };
    newState.person = newPerson;
    super.setState(newState);
  };

  switchViewFromNavBar = view => {
    const newState = { ...this.state };
    newState.currentView = view;
    console.log("setting new state in app");
    console.log(newState);
    super.setState(newState);
  };

  sendAccountNumber = accountNumber => {
    const newState = { ...this.state };
    console.log("Entered the update ", accountNumber);
    newState.accountNumber = accountNumber;
    newState.currentView = "transactions";
    super.setState(newState);
  };

  loginMessage = message => {
    super.setState({ loginMessage: message });
  };

  render() {
    if (this.state.currentView === "transactions") {
      return <Redirect to="/transactions" />;
    }
    return (
      <React.Fragment>
        <NavBar
          selectPage={this.switchViewFromNavBar}
          person={this.state.person.userName}
        />
        <div>
          <BrowserRouter>
            <Switch>
              {/* <Route
                path="/accountDashboard"
                component={() => (
                  // <AccountDashboard
                  //   person={this.state.person}
                  //   currentView={this.state.currentView}
                  // />
                  <AccountDetails
                    person={this.state.person}
                    currentView={this.state.currentView}
                    sendAccountNumber={this.sendAccountNumber}
                  />
                )}
              /> */}

              <Route
                path="/AccountDetails"
                component={() => (
                  <AccountDetails
                    person={this.state.person}
                    currentView={this.state.currentView}
                    sendAccountNumber={this.sendAccountNumber}
                  />
                )}
              />
              <Route
                path="/transactions"
                component={() => (
                  <TransactionDetails
                    accountNumber={this.state.accountNumber}
                    currentView={this.state.currentView}
                    sendAccountNumber={this.sendAccountNumber}
                  />
                )}
              />

              <Route
                path="/RegistrationPage"
                component={() => (
                  <RegistrationPage
                    loginMessage={this.loginMessage}
                    currentView={this.state.currentView}
                  />
                )}
              />
              <Route
                exact
                path="/Login"
                component={() => (
                  <Login
                    loginMessage={this.state.loginMessage}
                    error={this.state.error}
                    submitState={this.submitChange}
                    person={this.state.person}
                    currentView={this.state.currentView}
                  />
                )}
              />
              <Route
                path="/ForgetPassword"
                component={() => (
                  <ForgetPassword currentView={this.state.currentView} />
                )}
              />
              <Route
                path="/ForgetUsername"
                component={() => (
                  <ForgetUsername currentView={this.state.currentView} />
                )}
              />
              <Route
                exact
                path="/ChallengeView"
                component={() => <Challenge person={this.state.person} />}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}
