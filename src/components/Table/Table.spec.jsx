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

  it("checking if users data is not loaded, then loading message displays", () => {
    const component = mount(<Table />);
    const table = component.find("DataTable");
    expect(table.exists()).toBe(false);
    const noDataWrapper = component.find(".noData-wrapper");
    expect(noDataWrapper.text()).toBe(
      "Please Hold on, fetching data may take some time..."
    );
  });
});
