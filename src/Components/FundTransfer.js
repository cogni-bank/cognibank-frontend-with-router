import React, { Component } from "react";
import axios from "axios";

class FundTransfer extends Component {
  state = {
    accountNumberList: [],
    originalAccNo: "",
    destinationAccNo: ""
  };

  componentDidMount() {
    console.log("exampleComponent mounted");
    const apiUrl =
      "http://localhost:9300/users/accounts/accountsList/" +
      this.props.person.userId;
    axios.put(`${apiUrl}`).then(response => {
      console.log(response.data);
      const newState = { ...this.state };
      newState.accountNumberList = response.data.accounts;
      this.setState(newState);
    });
  }

  handleTransferAmount = () => {
    const amt = this.textInput.value;
    console.log("Amount ", amt);
    const apiURL =
      "http://localhost:9300/users/accounts/transfer/" +
      this.state.originalAccNo +
      "/" +
      this.state.destinationAccNo +
      "/" +
      amt;

    console.log("apiURL---- ", apiURL);

    axios.put(`${apiURL}`).then(response => {
      console.log("in transfer resp status", response.data, response.status);
    });
  };

  handleFromAccoutno = e => {
    console.log("handleFromAccoutno ---- " + e.target.value);
    const newState = { ...this.state };
    let eventName = e.target.name;
    console.log("target name ---" + eventName);
    // newState.({ [e.target.name] })= e.target.value;
    if (eventName === "originalAccNo") {
      newState.originalAccNo = e.target.value;
    } else if (eventName === "destinationAccNo") {
      newState.destinationAccNo = e.target.value;
    }
    this.setState(newState);
    console.log("original acc----", this.state.originalAccNo);
  };

  render() {
    return (
      <div>
        {/* <form onSubmit={this.handleTransferAmount}> */}
        <label>Amount to be transferred: </label> &nbsp;&nbsp;
        <input
          name="transferAmount"
          id="transferAmount"
          type="number"
          ref={input => (this.textInput = input)}
          required
        />
        <br />
        Select an account for transfer: &nbsp;&nbsp;
        <select name="originalAccNo" onChange={this.handleFromAccoutno}>
          <option value="select">Select an Account</option>
          {this.state.accountNumberList.map(acc => (
            <option key={acc.id} value={acc.accountNumber}>
              {acc.accountNumber}
            </option>
          ))}
        </select>
        <br />
        Select a Recipient: &nbsp;&nbsp;
        <select name="destinationAccNo" onChange={this.handleFromAccoutno}>
          <option value="select">Select an Account</option>
          {this.state.accountNumberList.map(acc => (
            <option key={acc.id}>{acc.accountNumber}</option>
          ))}
        </select>
        <br />
        <button
          type="submit"
          disabled={!(this.state.originalAccNo && this.state.destinationAccNo)}
          onClick={this.handleTransferAmount}
        >
          Transfer
        </button>
        {/* </form> */}
      </div>
    );
  }
}

export default FundTransfer;
