import { configure } from "enzyme";
import { put, takeLatest } from "redux-saga/effects";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { fetchUsersData, userSaga } from "./userSaga";
import { receiveFetchUsersData } from "../actions/fetchDataAction";

configure({ adapter: new Adapter() });

describe("userSaga", () => {
  it('should dispatch action "REQUEST_FETCH_DATA" ', () => {
    const generator = userSaga();
    expect(generator.next().value).toEqual(
      takeLatest("REQUEST_FETCH_DATA", fetchUsersData)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "RECEIVE_FETCH_DATA" with result from fetch user data API', () => {
    const mockResponse = {
      id: 2,
      name: "Patricia",
      email: "patricia1234@gmail.com",
      gender: "Female",
      status: "Active",
    };
    const generator = fetchUsersData();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put(receiveFetchUsersData(mockResponse))
    );
    expect(generator.next().done).toBeTruthy();
  });
});
