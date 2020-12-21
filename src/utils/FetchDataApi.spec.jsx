import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import FetchDataApi from "./FetchDataApi";

configure({ adapter: new Adapter() });

describe("FetchDataApi", () => {
  it("checking if FetchDataApi component is loaded", () => {
    const component = mount(<FetchDataApi />);
    expect(component.exists()).toBe(true);
  });
});
