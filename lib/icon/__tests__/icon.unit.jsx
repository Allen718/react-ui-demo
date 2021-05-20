import * as renderer from "react-test-renderer";
import React from "react";
import Icon from "../icon";
import {shallow} from 'enzyme'

describe("icon", () => {
  it("xxx", () => {
    const json = renderer.create(<Icon name="wechat" />).toJSON();
    expect(json).toMatchSnapshot();
  });
  it("可点击", () => {
    const fn = jest.fn();
    const component = shallow(<Icon onClick={fn} />);
    component.find("svg").simulate("click");
    expect(fn).toBeCalled();
  });
});
