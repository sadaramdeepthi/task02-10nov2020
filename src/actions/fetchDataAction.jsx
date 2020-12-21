import {
  FETCH_DATA,
  HANDLE_SORT,
  HANDLE_ROWCLICK,
  HANDLE_PAGINATION,
} from "./types";
import FetchDataApi from "../utils/FetchDataApi";

// fetch users data from API
export const fetchUsersData = () => async (dispatch) => {
  try {
    let data = await FetchDataApi();
    dispatch({
      type: FETCH_DATA,
      payload: data,
    });
  } catch (err) {}
};

//Handle Sorting
export const handleSorting = (field) => async (dispatch) => {
  try {
    dispatch({
      type: HANDLE_SORT,
      payload: field,
    });
  } catch (err) {}
};

//Handle row clicking
export const handleRowClick = (rowIndex) => async (dispatch) => {
  try {
    dispatch({
      type: HANDLE_ROWCLICK,
      payload: rowIndex,
    });
  } catch (err) {}
};

//pagination
export const paginate = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: HANDLE_PAGINATION,
      payload: pageNumber,
    });
  } catch (err) {}
};
