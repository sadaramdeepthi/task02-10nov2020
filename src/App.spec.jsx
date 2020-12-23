import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";
import _ from "lodash";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

configure({ adapter: new Adapter() });

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
        <App />
      </Provider>
    );
    return {
      connectedComponent: wrapper,
      state,
      props,
    };
  };
  it("checking if App component is loaded.", () => {
    const { connectedComponent } = setup();
    const app = connectedComponent.find(".App");
    expect(app.exists()).toBe(true);
  });
});
