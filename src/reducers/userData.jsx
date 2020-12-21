import {
  FETCH_DATA,
  HANDLE_SORT,
  HANDLE_ROWCLICK,
  HANDLE_PAGINATION,
} from "../actions/types";
import _ from "lodash";

let initialState = {
  users: [],
  loading: true,
  activeIndex: 1,
  currentlySortedField: "id",
  currentlySortedFieldDirection: "desc",
  currentPage: 1,
  usersPerPage: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      const users = action.payload;
      return {
        ...state,
        users: [...users],
        loading: false,
      };

    case HANDLE_SORT:
      const field = action.payload;
      const nextCurrentlySortedFieldDirection =
        state.currentlySortedField === field &&
        state.currentlySortedFieldDirection === "asc"
          ? "desc"
          : "asc";
      const nextData = _.sortBy(state.users, field);

      return {
        ...state,
        currentlySortedField: field,
        currentlySortedFieldDirection: nextCurrentlySortedFieldDirection,
        users:
          nextCurrentlySortedFieldDirection === "desc"
            ? nextData
            : _.reverse(nextData),

        activeIndex: null,
      };
    case HANDLE_ROWCLICK:
      return {
        ...state,
        activeIndex: action.payload,
      };
    case HANDLE_PAGINATION:
      const pageNumber = action.payload;
      return {
        ...state,
        currentPage: pageNumber + 1,
      };

    default:
      return state;
  }
};
