import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axiosTransaction from "axios";
import { properties } from "../properties";

export default class TransactionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      errorMessage: "",
      transactions: []
    };
  }

  componentDidMount() {
    console.log("intransaction ---- " + this.props.accountID);
  }

  handlegetTransactionsStartDate = (date, event) => {
    const newState = { ...this.state };
    newState.startDate = date;
    this.setState(newState);
  };

  handlegetTransactionsEndate = (date, event) => {
    const newState = { ...this.state };
    newState.endDate = date;
    this.setState(newState);
  };

  handlegetTransactions = () => {
    const apiURL =
      properties.accountManagementURL +
      "report/" +
      this.props.accountID +
      "/" +
      this.formatDate(this.state.startDate) +
      "/" +
      this.formatDate(this.state.endDate);
    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {
      if (response.data.length === 0) {
        //display message as no data available
        const newState = { ...this.state };
        newState.errorMessage = "No data found";
        this.setState(newState);
      } else {
        //generate table
        const newState = { ...this.state };
        newState.errorMessage = "";
        newState.transactions = response.data;
        this.setState(newState);
      }
    });
  };

  handleDepositBygetAccountNumber = event => {
    const amount = this.textInput.value;
    let eventName = event.target.name;
    const apiURL =
      properties.accountManagementURL +
      "getAccountNumberById/" +
      this.props.accountID;
    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(res => {
      console.log(res);
      const newState = JSON.parse(JSON.stringify(this.state));
      newState.accountNumber = res.data;
      this.setState(newState);

      if (eventName === "deposit") {
        this.doADeposit(amount, res.data);
      } else if (eventName === "withdraw") {
        this.withdraw(amount, res.data);
      }
    });
  };

  withdraw = (withdrawAmount, accountNo) => {
    const apiURL =
      properties.accountManagementURL +
      "withdraw/" +
      accountNo +
      "/" +
      withdrawAmount;

    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {});
  };

  doADeposit = (depositAmount, accountNo) => {
    const apiURL =
      properties.accountManagementURL +
      "deposit/" +
      accountNo +
      "/" +
      depositAmount;

    console.log(apiURL);
    axiosTransaction.put(`${apiURL}`).then(response => {});
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

    return (
      <div>
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
