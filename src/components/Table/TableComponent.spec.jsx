import React from "react";
import _ from "lodash";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TableComponent from "./TableComponent";

configure({ adapter: new Adapter() });

describe("TableComponent", () => {
  const component = mount(<TableComponent />);
  it("checking if TableComponent and Pagination component is loaded.", () => {
    const table = component.find(".table-wrapper");
    expect(table.exists()).toBe(true);
    const component2 = component.find("Pagination");
    expect(component2.exists()).toBe(true);
  });

  it("checking when the loading is false datatable dispalys the data", () => {
    const table = component.find("loading");
    expect(table.exists()).toBe(false);
    const component2 = component.find("DataTable");
    expect(component2.exists()).toBe(true);
  });

  it("Checking the number of datatable and number of rows rendered", () => {
    const table = component.find("DataTable");
    expect(table.length).toEqual(1);
    const rows = table.find(".lucid-Table-Tbody .lucid-Table-Tr");
    expect(rows.length).toEqual(10);
  });
});
