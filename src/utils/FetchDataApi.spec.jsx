import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import FetchDataApi from "./FetchDataApi";

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

describe("FetchDataApi", () => {
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
