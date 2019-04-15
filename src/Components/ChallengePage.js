import React, { Component } from "react";
import UserOptionForm from "./UserOptionForm";
import OtpForm from "./OtpForm";
import LogOut from "./LogOut";

/*Challenge page has UserOPtionForm and  OtpForm as child components */
export default class Challenge extends Component {
  state = {
    selectedOption: "email",
    challengeCurrentView: "userOptionForm"
  };

  /*This function is called with respect to radio button handling in the userOption page */
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  /*This function, changes the view from OtpForm to loginView after timeout  */
  timeHandleChange = () => {
    console.log("inside handle");
    this.props.switchView("loginView");
  };

  /*Passing the user notification option type to the Security team, 
  will proceed based on the security team response */
  sendChallenge = selectedOption => {
    const newState = JSON.parse(JSON.stringify(this.state));

    fetch("http://localhost:8080/sendOtp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        type: selectedOption,
        userId: this.props.person.userId
      })
    })
      .then(res => {
        console.log("Challenge OTP ", res);
        newState.challengeCurrentView = "otpForm";
        super.setState(newState);
        console.log("The response sending to security", this.props.person);
      })
      .catch(error => console.error("Error", error));
  };

  /* Send the user enterd otp to security team ,and 
    ,check the response string and switch the page based on that
   */
  sendOTP = otpCode => {
    //send request to security to validate user
    fetch("http://localhost:8080/validateUserWithOTP", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        code: otpCode,
        userId: this.props.person.userId
      })
    })
      .then(res => {
        if (res.ok) {
          console.log("Response Captured in sendOTP method", res);
          return res;
        } else if (res.status === 401) {
          throw new Error("OTP Code is wrong");
        } //else {
        //   throw new Error("Unknown error happened!");
        // }
      })
      .then(response => {
        // to do
        // add routing
        console.log("AccountView method.");
      })
      .catch(error => {
        console.error("Error", error);
        super.setState({ error });
      });
  };

  render() {
    let tmpView = <UserOptionForm sendChallenge={this.sendChallenge} />;
    if (this.state.challengeCurrentView === "userOptionForm") {
      tmpView = (
        <UserOptionForm
          sendChallenge={this.sendChallenge}
          person={this.props.person}
          selectedOption={this.state.selectedOption}
          handleOptionChange={this.handleOptionChange}
        />
      );
    } else if (this.state.challengeCurrentView === "otpForm") {
      tmpView = (
        <OtpForm
          sendOTP={this.sendOTP}
          timeHandleChange={this.timeHandleChange}
          error={this.state.error}
        />
      );
    }

    return (
      <div className="ChallengeForm">
        {tmpView}
        <LogOut logOut={this.props.switchView} />
      </div>
    );
  }
}
