import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { createStore } from "redux";
import React from "react";
import _ from "lodash";
import Table from "./Table";
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
  const setup = () => {
    const state = {
      userData: {
        users: [
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
          {
            email: "gauranga_prajapat_miss@watsica.co",
            gender: "Male",
            id: 7,
            name: "Miss Gauranga Prajapat",
            status: "Active",
          },
          {
            email: "brajendra_malik@pouros.name",
            gender: "Male",
            id: 8,
            name: "Brajendra Malik",
            status: "Inactive",
          },
          {
            email: "mehra_rukhmani@rodriguez.net",
            gender: "Male",
            id: 9,
            name: "Rukhmani Mehra",
            status: "Inactive",
          },
          {
            email: "bhattacharya_dhaanyalakshmi@quigley.biz",
            gender: "Female",
            id: 10,
            name: "Dhaanyalakshmi Bhattacharya",
            status: "Active",
          },
          {
            email: "veda_malik@effertz-fritsch.info",
            gender: "Female",
            id: 12,
            name: "Veda Malik",
            status: "Active",
          },
          {
            email: "guneta_chetanaanand@stark-roob.io",
            gender: "Male",
            id: 13,
            name: "Chetanaanand Guneta",
            status: "Active",
          },
          {
            email: "bandopadhyay_ambar@daniel-keeling.info",
            gender: "Female",
            id: 14,
            name: "Ambar Bandopadhyay",
            status: "Inactive",
          },
          {
            email: "khanna_vaijayanti@ankunding.biz",
            gender: "Female",
            id: 15,
            name: "Vaijayanti Khanna",
            status: "Inactive",
          },
          {
            email: "chandini_kapoor@macejkovic.com",
            gender: "Male",
            id: 16,
            name: "Chandini Kapoor",
            status: "Active",
          },
          {
            email: "wluissilva@live.com",
            gender: "Male",
            id: 26,
            name: "Washington Luis Cabral da Silva",
            status: "Active",
          },
          {
            email: "bhima_asan@schowalter.org",
            gender: "Female",
            id: 27,
            name: "Bhima Asan",
            status: "Active",
          },
          {
            email: "deenabandhu_gill@grant.biz",
            gender: "Female",
            id: 28,
            name: "Deenabandhu Gill",
            status: "Active",
          },
          {
            email: "balagopal_bhat@fadel-dooley.info",
            gender: "Female",
            id: 29,
            name: "Balagopal Bhat",
            status: "Inactive",
          },
          {
            email: "ananta_guha@mclaughlin.info",
            gender: "Male",
            id: 30,
            name: "Ananta Guha",
            status: "Inactive",
          },
          {
            email: "guha_anil@durgan.io",
            gender: "Female",
            id: 31,
            name: "Anil Guha",
            status: "Active",
          },
          {
            email: "nambeesan_diptendu@runte.com",
            gender: "Male",
            id: 32,
            name: "Diptendu Nambeesan",
            status: "Inactive",
          },
          {
            email: "tara_lld_mehra@wintheiser.name",
            gender: "Female",
            id: 33,
            name: "Tara Mehra LLD",
            status: "Inactive",
          },
        ],
        loading: false,
        activeIndex: null,
        usersPerPage: 10,
        currentPage: 1,
      },
      error: {
        error: "",
        isShown: false,
      },
    };
    const props = {};
    const store = createStore(_.identity, state);

    const wrapper = mount(
      <Provider store={store}>
        <Table />
      </Provider>
    );
    return {
      connectedComponent: wrapper,
      state,
      props,
    };
  };

  it("checking if Table component and Pagination component is loaded.", () => {
    const { connectedComponent } = setup();
    const table = connectedComponent.find(".table-wrapper");
    expect(table.exists()).toBe(true);
    const component2 = connectedComponent.find("Pagination");
    expect(component2.exists()).toBe(true);
  });

  it("Untill data is fetched from api,loading message displays", () => {
    const { connectedComponent } = setup();
    const loading = connectedComponent.find("loading");
    expect(loading.exists()).toBe(true);
    const noDataWrapper = connectedComponent.find(".noData-wrapper").at(1);
    expect(noDataWrapper.text()).toBe(
      "Please Hold on, fetching data may take some time"
    );
  });

  it("Checking if loading is false then datatable is displayed.", () => {
    const { connectedComponent } = setup();
    const loading = connectedComponent.find("loading");
    expect(loading.exists()).toBe(false);
    const table = connectedComponent.find(".datatable-wrapper");
    expect(table.exists()).toBe(true);
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
