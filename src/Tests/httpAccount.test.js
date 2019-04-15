import React from "react";
import { shallow } from "enzyme";
import AccountDetails from "../Components/AccountDetails";
import axios from "axios";

//jest.mock("axios");

describe("AccountDetailsPage", () => {
  let wrapper;

  beforeEach(() => {
    let person = {
      userId: "123456",
      userName: "acv",
      phone: "123456789",
      email: "acv@gmail.com"
    };

    wrapper = shallow(<AccountDetails person={person} />);
  });

  describe("Radio button", () => {
    //To check the radio button selects the correct option
    it("should select checking accounts by default", () => {
      expect(wrapper.state().selectedOption).toEqual("Checking");
    });

    //OnChange Radio option...
    it("Should change the radio option to saving", () => {
      const newAccountType = "Savings";
      const radioButton = wrapper.find("#radioSavings");
      radioButton.simulate("change", { target: { value: newAccountType } });
      expect(wrapper.state().selectedOption).toEqual("Savings");
    });
  });
  // //Test for Create account post request when the HTTP response is ok
  // describe("create account of selected type", () => {
  //   it("it should put request for create account and return account number", () => {
  //     //Mocking the create account function
  //     const postSpy = jest.spyOn(axios, "put");
  //     wrapper.find("#createAccount").simulate("click");
  //     expect(postSpy).toBeCalled();

  //     const postPromise = postSpy.mock.results.pop().value;
  //     return postPromise.then(postResponse => {
  //       const currentState = wrapper.state();
  //       expect(currentState.accountID.includes(postResponse.data)).toBe(true);
  //     });
  //   });
  // });
  describe("create account of selected type", () => {
    it("it should put request for create account and return account number", () => {
      //setup
      axios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: "123456"
        })
      );

      //work
      wrapper.find("#createAccount").simulate("click");

      //expect
      expect(axios.put).toHaveBeenCalledTimes(1);
      let url = "http://localhost:8080/users/accounts/create/123456/Checking";
      expect(axios.put).toHaveBeenCalledWith(url);

      // setTimeout(() => {
      //   console.log("state in test--> " + wrapper.state().accountID);
      // });
    });
  });

  describe("get transaction button", () => {
    //Get the transaction details of the selected account type
    it("should return list of transaction for the account", () => {});
  });
});
