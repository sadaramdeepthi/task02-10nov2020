import React from "react";
import _ from "lodash";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import TableComponent from "./TableComponent";

configure({ adapter: new Adapter() });

describe("TableComponent", () => {
  let data = {
    loading: false,
    error: "",
    currentUsers: [
      {
        id: 2,
        name: "Patricia",
        email: "patricia1234@gmail.com",
        gender: "Female",
        status: "Active",
      },
      {
        email: "gaurang_phd_prajapat@king-welch.name",
        gender: "Female",
        id: 4,
        name: "Gaurang Prajapat PhD",
        status: "Inactive",
      },
      {
        email: "priyala_nayar@corkery-spencer.biz",
        gender: "Female",
        id: 6,
        name: "Priyala Nayar",
        status: "Inactive",
      },
    ],
    jsonColumn: [
      { col: "id", width: "150" },
      { col: "name", width: "100" },
      { col: "email", width: "150" },
      { col: "gender", width: "100" },
      { col: "status", width: "150" },
    ],
  };

  it("checking if loading is true , loading message displays.", () => {
    const component = mount(<TableComponent {...data} loading={true} />);
    const loading = component.find(".noData-wrapper");
    expect(loading.exists()).toBe(true);
    expect(loading.text()).toBe(
      "Please Hold on, fetching data may take some time..."
    );
  });

  it("checking if loading is false and error occurs ,DialogBox component appears", () => {
    const state = {
      error: { isShown: false },
    };
    const component = mount(
      <Provider store={createStore(_.identity, state)}>
        <TableComponent {...data} error="Something went wrong" />
      </Provider>
    );
    const dialogBox = component.find("DialogBox");
    expect(dialogBox.exists()).toBe(true);
  });

  it("checking when loading is false , data table dispalys.", () => {
    const component = mount(<TableComponent {...data} />);
    const table = component.find("DataTable");
    expect(table.exists()).toBe(true);
  });

  it("Checking the data displays in dataTable and the number of rows in the dataTable", () => {
    const component = mount(<TableComponent {...data} />);
    const table = component.find("DataTable");
    expect(table.exists()).toBe(true);
    const rows = table.find("tr");
    // renders the number of rows in the datatable
    expect(
      rows.filterWhere(
        (row) => row.find("td").length && row.find("td").at(0).text() != ""
      ).length
    ).toBe(3);

    // checks if the data displayed is correct
    expect(rows.at(1).find("td").at(0).text()).toBe("2");
    expect(rows.at(1).find("td").at(1).text()).toBe("Patricia");
    expect(rows.at(1).find("td").at(2).text()).toBe("patricia1234@gmail.com");
    expect(rows.at(1).find("td").at(3).text()).toBe("Female");
    expect(rows.at(1).find("td").at(4).text()).toBe("Active");

    expect(rows.at(2).find("td").at(0).text()).toBe("4");
    expect(rows.at(2).find("td").at(1).text()).toBe("Gaurang Prajapat PhD");
    expect(rows.at(2).find("td").at(2).text()).toBe(
      "gaurang_phd_prajapat@king-welch.name"
    );
    expect(rows.at(2).find("td").at(3).text()).toBe("Female");
    expect(rows.at(2).find("td").at(4).text()).toBe("Inactive");
  });

  it("checking the number of columns in the dataTable", () => {
    const component = mount(<TableComponent {...data} />);
    const table = component.find("DataTable");
    expect(table.exists()).toBe(true);
    const columns = table.find("th");
    expect(columns.length).toBe(5);
  });

  it("Checking if pagination component is rendered", () => {
    const component = mount(<TableComponent {...data} />);
    const pagination = component.find("Pagination");
    expect(pagination.exists()).toBe(true);
  });
});
