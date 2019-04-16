import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../style/Account.css";
import { Redirect } from "react-router-dom";
import { properties } from "../properties";

/*Will be called once success Otp validation   */
export default class AccountDetails extends Component {
  state = {
    selectedOption: "Checking",
    accountID: "",
    message: "",
    accountsList: [],
    accountNumber: "",
    currentView: this.props.currentView
  };

  componentDidMount() {
    const apiUrl =
      properties.accountManagementURL +
      "accountsList/" +
      this.props.person.userId;
    axios.put(`${apiUrl}`).then(response => {
      console.log(response.data.accounts);
      const newState = { ...this.state };
      newState.accountsList = response.data.accounts;
      this.setState(newState);
    });
  }

  handleChange = changeEvent => {
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.selectedOption = changeEvent.target.value;
    this.setState(newState);
  };

  handleChangeWithAccountNumber = event => {
    let accountID = event.target.value;
    const newState = { ...this.state };
    newState.accountID = accountID;
    this.setState(newState);
  };

  createAccount = () => {
    let userId = this.props.person.userId;
    const apiUrl =
      properties.accountManagementURL +
      "create/" +
      userId +
      "/" +
      this.state.selectedOption;
    axios
      .put(`${apiUrl}`)
      .then(response => {
        const newState = JSON.parse(JSON.stringify(this.state));
        newState.message =
          "Your " +
          this.state.selectedOption +
          " account has been created successfully";
        this.setState(newState);
        this.componentDidMount();
      })
      .catch(error => {
        console.log(error);
        const newState = { ...this.state };
        newState.message = "An internal error occurred. Please try again";
        this.setState(newState);
      });
  };

  maskAccountNumber = string => {
    string.substr(2, 6);
    console.log("sub--- ", string.substr(2, 6));
  };

  render() {
    if (this.state.currentView === "transactions") {
      return <Redirect to="/transactions" />;
    }
    let tableWithAccounts = (
      <table id="listOfAccountsTable" className="table table-hover table-fixed">
        <thead className="thead-light">
          <tr>
            <th>Select account</th>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        {this.state.accountsList.map(account => (
          <tbody key={account.id}>
            <tr>
              <td>
                <input
                  type="radio"
                  name="accountRadioGrp"
                  onChange={this.handleChangeWithAccountNumber}
                  value={account.id}
                />
              </td>
              <td>{account.accountNumber}</td>
              <td>{account.accountType}</td>
              <td>{account.status}</td>
              <td>{account.balance}</td>
            </tr>
          </tbody>
        ))}
      </table>
    );

    return (
      <div id="accountDetails">
        <label>Select an account to be created: </label>&nbsp;&nbsp;
        <label>
          <input
            type="radio"
            id="radioCheckings"
            onChange={this.handleChange}
            value="Checking"
            checked={this.state.selectedOption === "Checking"}
          />
          Checking
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <label>
          <input
            type="radio"
            id="radioSavings"
            onChange={this.handleChange}
            value="Savings"
            checked={this.state.selectedOption === "Savings"}
          />
          Savings
        </label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          id="createAccount"
          onClick={this.createAccount}
          className="btn btn-primary"
        >
          Create Account
        </button>
        <br />
        <div
          id="messageDiv"
          style={{
            display: this.state.message !== "" ? "block" : "none",
            width: "40%",
            marginLeft: "29%",
            marginTop: "2%"
          }}
        >
          <p
            className={
              this.state.message !==
              "An internal error occurred. Please try again"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {this.state.message}
          </p>
        </div>
        <br />
        {tableWithAccounts}
        <br />
        <button
          id="goToTransaction"
          name="goToTransaction"
          onClick={() => {
            this.props.sendAccountNumber(this.state.accountID);
          }}
          className="btn btn-primary"
          // style={{
          //   display: this.state.accountID !== " " ? "block" : "none"
          // }}

          disabled={!this.state.accountID}
        >
          View Transactions
        </button>
      </div>
    );
  }
}
