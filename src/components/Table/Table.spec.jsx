import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
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
