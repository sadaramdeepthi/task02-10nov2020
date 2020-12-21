import {
  HANDLE_ERROR_SHOW,
  HAND_DIALOG_SHOW,
  HAND_DIALOG_NOSHOW,
} from "./types";

// handling error when API call fails.
export const handleErrorShow = () => (dispatch) => {
  dispatch({
    type: HANDLE_ERROR_SHOW,
    payload: "API call Failed, please try again",
  });
};

//handling dialog box component on button click for error message
export const handledialogShow = (isShown) => (dispatch) => {
  dispatch({
    type: HAND_DIALOG_SHOW,
    payload: isShown,
  });
};

export const handledialogNoShow = (isShown) => (dispatch) => {
  dispatch({
    type: HAND_DIALOG_NOSHOW,
    payload: isShown,
  });
};
