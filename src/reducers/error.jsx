import {
  HANDLE_ERROR_SHOW,
  HAND_DIALOG_SHOW,
  HAND_DIALOG_NOSHOW,
  FETCH_DATA,
} from "../actions/types";

const initialState = { isShown: false, error: "" };
export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_ERROR_SHOW:
      return { error: action.payload };
    case HAND_DIALOG_SHOW:
      return { isShown: true };
    case HAND_DIALOG_NOSHOW:
      return { isShown: false };
    case FETCH_DATA:
      return { error: "" };
  }
  return state;
};
