import FetchDataApi from "../utils/FetchDataApi";
import {
  REQUEST_FETCH_DATA,
  HANDLE_SORT,
  RECEIVE_FETCH_DATA,
  HANDLE_ROWCLICK,
  HANDLE_PAGINATION,
} from "./types";

// fetch users data from API
export const requestFetchUsersData = () => {
  return {
    type: REQUEST_FETCH_DATA,
  };
};

export const receiveFetchUsersData = (data) => {
  return {
    type: RECEIVE_FETCH_DATA,
    payload: data,
  };
};

//Handle Sorting
export const handleSorting = (field) => ({
  type: HANDLE_SORT,
  payload: field,
});

//Handle row clicking
export const handleRowClick = (rowIndex) => ({
  type: HANDLE_ROWCLICK,
  payload: rowIndex,
});

//pagination
export const paginate = (pageNumber) => {
  return {
    type: HANDLE_PAGINATION,
    payload: pageNumber,
  };
};
