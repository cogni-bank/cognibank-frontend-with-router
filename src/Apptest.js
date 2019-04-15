import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders the login page", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("Login")).toHaveLength(1);
});

it("Login button should be clickable", () => {
  // const mockFn = jest.fn();
  const wrapper1 = shallow(<App />);

  const person = { userName: "Alan", password: "password1234" };
  expect(wrapper1.instance().handleSubmitLogin(person)).toEqual();

  expect(wrapper1);
});

it("should invoke challenge view page ", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().currentView).toEqual("loginView");
  wrapper.instance().handleSubmitLogin();
  expect(wrapper.state().currentView).toEqual("challengeView");
});
