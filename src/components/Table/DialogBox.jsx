import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Button, Dialog } from "lucid-ui";
import {
  handledialogShow,
  handledialogNoShow,
} from "../../actions/errorActions";

const DialogBox = (props) => {
  const { isShown } = props;
  return (
    <div>
      <Button onClick={_.partial(props.handledialogShow, !isShown)}>
        Error Message
      </Button>

      <Dialog
        isShown={isShown}
        handleClose={_.partial(props.handledialogNoShow, !isShown)}
        onBackgroundClick={_.partial(props.handledialogNoShow, false)}
        onEscape={_.partial(props.handledialogNoShow, false)}
        Header="Oops.."
        size="medium"
      >
        API call Failed...
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isShown: state.error.isShown,
});

export default connect(mapStateToProps, {
  handledialogShow,
  handledialogNoShow,
})(DialogBox);
