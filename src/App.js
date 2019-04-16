import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login/LoginPage";
import Challenge from "./Components/ChallengePage";
import AccountDetails from "./Components/AccountDetails";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import RegistrationPage from "./Components/RegistrationPage";
import ForgetPassword from "./Components/ForgotPassword";
import ForgetUsername from "./Components/ForgotUsername";
import TransactionDetails from "./Components/TransactionDetails";
import FundTransfer from "./Components/FundTransfer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: { userId: "12345", userName: "Jon Doe", phone: "", email: "" },
      loginMessage: "",
      currentView: "",
      accountID: ""
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

  sendAccountNumber = accountID => {
    const newState = { ...this.state };
    console.log("Entered the update ", accountID);
    newState.accountID = accountID;
    newState.currentView = "transactions";
    super.setState(newState);
  };

  loginMessage = message => {
    super.setState({ loginMessage: message });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          selectPage={this.switchViewFromNavBar}
          person={this.state.person.userName}
        />
        <div>
          <BrowserRouter>
            <Switch>
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
                    accountID={this.state.accountID}
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
              <Route
                path="/fundTransfer"
                component={() => <FundTransfer person={this.state.person} />}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}
