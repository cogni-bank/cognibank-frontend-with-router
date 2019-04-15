import React from 'react';
import ReactDOM from 'react-dom';
import Challenge from '../Components/ChallengePage';
import {shallow} from 'enzyme';

it('Challenge page should contains the UI elements', () => {
    const wrapper = shallow (<Challenge />);
    expect(wrapper.find("div.ChallengeForm")).toHaveLength(1);
    expect(wrapper.find("form")).toHaveLength(1);
    expect(wrapper.find("input#email")).toHaveLength(1);
    expect(wrapper.find("input#phoneNumber")).toHaveLength(1);
    expect(wrapper.find("button#submitBtn")).toHaveLength(1);
    // expect(wrapper.find("a")).toHaveLength(1);
    // expect(wrapper.find("button#signUp")).toHaveLength(1);
    //expect(wrapper.find())
  });