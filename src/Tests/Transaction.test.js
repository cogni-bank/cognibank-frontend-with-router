import React from "react";
import { shallow, mount } from "enzyme";
import axios from "axios";
import TransactionDetails from "../Components/TransactionDetails";

//jest.mock("axiosTransaction");

describe("Transaction Details page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TransactionDetails accountID="12345" />);
  });

  //Test if two datepickers are present
  describe("Datepicker", () => {
    it("should have two datepicker component", () => {
      expect(wrapper.find("#startDate")).toHaveLength(1);
      expect(wrapper.find("#endDate")).toHaveLength(1);
      expect(wrapper.find("#viewTransaction")).toHaveLength(1);
    });
  });

  //Test if the transaction button gets the list of transaction from account mangmnt
  describe(" view transaction button click ", () => {
    it("should get the report within the date range provided by the user", () => {
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, "handlegetTransactions");
      instance.forceUpdate();
      wrapper.find("#viewTransaction").simulate("click");
      expect(spy).toHaveBeenCalled();
    });
  });

  //Test to check the view transaction put request
  describe("Check the view transaction put request", () => {
    it("The put request should be made", () => {
      const putSpy = jest.spyOn(axios, "put");
      wrapper.find("#viewTransaction").simulate("click");
      expect(putSpy).toBeCalled();
    });
  });

  describe("test to display error message when the transaction is empty", () => {
    it("should change the status of error message", () => {
      axios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: []
        })
      );
      // const putSpy = jest.spyOn(axiosTransaction, "put");
      wrapper.find("#viewTransaction").simulate("click");
      // const putPromise = putSpy.mock.results.pop().value;
      // return putPromise.then(putResponse => {
      //   // expect(putResponse.data.length).toEqual(0);
      //   //  expect(wrapper.state().errorMessage).toEqual("No data found");
      // });
      let url =
        "http://localhost:8080/users/accounts/report/12345/2019-04-12/2019-04-12";
      expect(axios.put).toHaveBeenCalledWith(url);
    });
  });

  describe("test to display error message when the transaction is empty", () => {
    it("should change the status of error message", () => {
      axios.put.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            {
              ID: "1",
              TransactionDate: "2019-04-11T11:54:50.792",
              TransactionType: "Credit",
              TransactionStatus: "In_Progress",
              TransactionAmount: "140.0"
            },
            {
              ID: "2",
              TransactionDate: "2019-04-11T11:54:52.938",
              TransactionType: "Credit",
              TransactionStatus: "In_Progress",
              TransactionAmount: "140.0"
            }
          ]
        })
      );
      wrapper.find("#viewTransaction").simulate("click");
      let url =
        "http://localhost:8080/users/accounts/report/12345/2019-04-12/2019-04-12";
      expect(axios.put).toHaveBeenCalledWith(url);
    });
  });
});
