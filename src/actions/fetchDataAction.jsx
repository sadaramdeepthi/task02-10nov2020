import {
  FETCH_DATA,
  HANDLE_SORT,
  HANDLE_ROWCLICK,
  HANDLE_PAGINATION,
} from "./types";
import FetchDataApi from "../utils/FetchDataApi";
import { handleErrorShow } from "./errorActions";

// fetch users data from API
export const fetchUsersData = () => async (dispatch) => {
  try {
    let data = await FetchDataApi();
    dispatch({
      type: FETCH_DATA,
      payload: data,
    });
  } catch (err) {
    dispatch(handleErrorShow(err));
    throw err;
  }
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
  console.log("test98");
  return {
    type: HANDLE_PAGINATION,
    payload: pageNumber,
  };
};
