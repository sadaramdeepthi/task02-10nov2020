import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React, { useState as useStateMock } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import FetchDataApi from "../../utils/FetchDataApi";

configure({ adapter: new Adapter() });

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          data: [
            {
              id: 1,
              name: "Indira Ahuja",
              email: "indira_ahuja@lueilwitz.org",
              gender: "Male",
              status: "Active",
            },
            {
              id: 2,
              name: "Aadidev Patil",
              email: "patil_aadidev@kessler-price.co",
              gender: "Female",
              status: "Active",
            },
          ],
        },
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Table", () => {
  it("checking if Table component and pagination component is loaded", () => {
    const component = mount(<Table />);
    const table = component.find(".datatable-wrapper");
    expect(table.exists()).toBe(true);
    const component2 = mount(<Pagination />);
    expect(component2.exists()).toBe(true);
  });

  it("Untill data is fetched from api,loading message displays", () => {
    const component = mount(<Table />);
    const table = component.find("DataTable");
    expect(table.exists()).toBe(false);
    const noDataWrapper = component.find(".noData-wrapper");
    expect(noDataWrapper.text()).toBe(
      "Please Hold on, fetching data may take some time..."
    );
  });

  it("fetching data from API", () => {
    const onResponse = jest.fn();
    const onError = jest.fn();

    return FetchDataApi()
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expect(onResponse.mock.calls[0][0]).toEqual({
          data: [
            {
              id: 1,
              name: "Indira Ahuja",
              email: "indira_ahuja@lueilwitz.org",
              gender: "Male",
              status: "Active",
            },
            {
              id: 2,
              name: "Aadidev Patil",
              email: "patil_aadidev@kessler-price.co",
              gender: "Female",
              status: "Active",
            },
          ],
        });
      });
  });
});
