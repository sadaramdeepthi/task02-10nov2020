import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import _ from "lodash";
import React from "react";
import Table from "./Table";

configure({ adapter: new Adapter() });
describe("Table", () => {
  it("checking if Table component is loaded", () => {
    const component = mount(<Table />);
    const table = component.find(".datatable-wrapper");
    expect(table.exists()).toBe(true);
  });
});
