import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axiosTransaction from "axios";

export default class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      errorMessage: "",
      accountNumber: this.props.accountNumber,
      transactions: []
    };
  }
  componentMount() {
    console.log("account Number in transs ", this.props.accountNumber);
  }

  handlegetTransactionsStartDate = (date, event) => {
    console.log("in start date ");
    const newState = { ...this.state };
    newState.startDate = date;
    this.setState(newState);
  };

  handlegetTransactionsEndate = (date, event) => {
    console.log("in end date");
    const newState = { ...this.state };
    newState.endDate = date;
    this.setState(newState);
  };

  handlegetTransactions = () => {
    console.log("after transaction----");
    const apiURL =
      "http://localhost:9300/users/accounts/report/" +
      this.props.accountID +
      "/" +
      this.formatDate(this.state.startDate) +
      "/" +
      this.formatDate(this.state.endDate);
    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {
      console.log("trans response ", response.data);
      console.log("trans response length", response.data.length);
      if (response.data.length === 0) {
        //display message as no data available
        console.log("empty list");
        const newState = { ...this.state };
        newState.errorMessage = "No data found";
        this.setState(newState);
      } else {
        //generate table

        console.log("generate table");
        const newState = { ...this.state };
        newState.errorMessage = "";
        newState.transactions = response.data;
        this.setState(newState);
      }
    });
  };

  handleDepositBygetAccountNumber = event => {
    console.log("in handleDepositBygetAccountNumber");
    console.log("value===> ", this.textInput.value);
    const amount = this.textInput.value;
    console.log(this.props.accountID);
    let eventName = event.target.name;
    console.log("eventName ---> ", eventName);
    const apiURL =
      "http://localhost:9300/users/accounts/getAccountNumberById/" +
      this.props.accountID;
    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(res => {
      console.log("response from account id -> ", res.data);
      const newState = JSON.parse(JSON.stringify(this.state));
      newState.accountNumber = res.data;
      this.setState(newState);
      console.log("account number from state ", this.state.accountNumber);
    });
    if (eventName === "deposit") {
      console.log("in deposit");
      this.doADeposit(amount);
    } else if (eventName === "withdraw") {
      console.log("in withdraw");
      this.withdraw(amount);
    }
  };

  withdraw = withdrawAmount => {
    const apiURL =
      "http://localhost:9300/users/accounts/withdraw/" +
      this.state.accountNumber +
      "/" +
      withdrawAmount;

    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {
      console.log("response from withdraw-> ", response);
    });
  };

  doADeposit = depositAmount => {
    console.log("in handleDeposit");
    const apiURL =
      "http://localhost:9300/users/accounts/deposit/" +
      this.state.accountNumber +
      "/" +
      depositAmount;

    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {
      console.log("response from deposit-> ", response);
    });
  };

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  render() {
    let table = "";
    if (this.state.errorMessage === "") {
      table = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Transaction Date</th>

              <th>Transaction Type</th>

              <th>Transaction Status</th>

              <th>Transaction Amount</th>
            </tr>
          </thead>
          {this.state.transactions.map(trans => (
            <tbody key={trans.ID}>
              <tr>
                <td>{trans.TransactionDate}</td>
                <td>{trans.TransactionType}</td>
                <td>{trans.TransactionStatus}</td>
                <td>{trans.TransactionAmount}</td>
              </tr>
            </tbody>
          ))}
        </table>
      );
    }
    // const transationList = response.data.map(transaction => {
    //   transaction.ID;
    // });

    return (
      <div>
        {/* VIEW TRANSACTION FORM STARTS HERE */}
        {/* <form id="formTransaction"> */}
        <DatePicker
          id="startDate"
          name="startDate"
          dateFormat="yyyy-MM-dd"
          placeholderText="Enter start date"
          selected={this.state.startDate}
          onChange={this.handlegetTransactionsStartDate}
          maxDate={new Date()}
        />
        <DatePicker
          id="endDate"
          name="endDate"
          dateFormat="yyyy-MM-dd"
          placeholderText="Enter end date"
          selected={this.state.endDate}
          onChange={this.handlegetTransactionsEndate}
          isClearable={false}
          minDate={this.state.startDate}
          maxDate={new Date()}
        />

        <button
          id="viewTransaction"
          name="viewTransaction"
          onClick={this.handlegetTransactions}
        >
          View Transactions
        </button>
        {/* </form> */}
        <div>
          <input
            type="number"
            id="amount"
            name="amount"
            ref={input => (this.textInput = input)}
          />
          <button
            id="deposit"
            name="deposit"
            onClick={this.handleDepositBygetAccountNumber}
          >
            Deposit
          </button>
          <button
            id="withdraw"
            name="withdraw"
            onClick={this.handleDepositBygetAccountNumber}
          >
            Withdraw
          </button>
        </div>
        {table}
        <p>{this.state.errorMessage}</p>
      </div>
    );
  }
}
