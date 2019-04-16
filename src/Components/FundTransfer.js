import React, { Component } from "react";
import axios from "axios";
import { properties } from "../properties";

class FundTransfer extends Component {
  state = {
    accountNumberList: [],
    originalAccNo: "",
    destinationAccNo: "",
    message: ""
  };

  componentDidMount() {
    console.log("exampleComponent mounted");
    const apiUrl =
      properties.accountManagementURL +
      "accountsList/" +
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
      properties.accountManagementURL +
      "transfer/" +
      this.state.originalAccNo +
      "/" +
      this.state.destinationAccNo +
      "/" +
      amt;

    console.log("apiURL---- ", apiURL);

    axios
      .put(`${apiURL}`)
      .then(response => {
        console.log("in transfer resp status", response.data, response.status);
        const newState = { ...this.state };
        if (response.status === 200) {
          newState.message = "Transfer successfull";
        }
        this.setState(newState);
      })
      .catch(error => {
        console.log(error);
        const newState = { ...this.state };
        newState.message = "Oops! Something went wrong. Please, try again.";
        this.setState(newState);
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
              this.state.message === "Transfer successfull"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {this.state.message}
          </p>
        </div>
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
