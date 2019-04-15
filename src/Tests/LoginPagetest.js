import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Components/LoginPage';
import {shallow} from 'enzyme';

it('Login page contains the UI elements', () => {
    const wrapper = shallow (<Login />);
    expect(wrapper.find("div.LoginForm")).toHaveLength(1);
    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find("input")).toHaveLength(2);
    expect(wrapper.find("button#loginBtn")).toHaveLength(1);
    expect(wrapper.find("a")).toHaveLength(1);
    expect(wrapper.find("button#signUp")).toHaveLength(1);
    //expect(wrapper.find())
  });

  




// it("calls addPerson with state", () => {  
//     const mockAddPerson = jest.fn();  
//     const wrapper1 = shallow(<Login validateUser={mockAddPerson} />);

//     const submitState = { userName: "Alan", password: "password1234"};   
//     wrapper1.setState(submitState);   

//     wrapper1.find("button#loginBtn").simulate("click");    
//     expect(mockAddPerson).toBeCalledWith(submitState);
// });


