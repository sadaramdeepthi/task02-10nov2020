import { call, put, takeLatest } from "redux-saga/effects";
import FetchDataApi from "../utils/FetchDataApi";
import { REQUEST_FETCH_DATA } from "../actions/types";
import { receiveFetchUsersData } from "../actions/fetchDataAction";

function* fetchUsersData() {
  const data = yield call(FetchDataApi);
  yield put(receiveFetchUsersData(data));
}

function* userSaga() {
  yield takeLatest(REQUEST_FETCH_DATA, fetchUsersData);
}

export { userSaga, fetchUsersData };
