import React, { useEffect } from "react";
import { connect } from "react-redux";
import { DataTable } from "lucid-ui";
import _ from "lodash";
import "../../style/Table.scss";
import Pagination from "./Pagination";
import {
  fetchUsersData,
  handleSorting,
  handleRowClick,
  paginate,
} from "../../actions/fetchDataAction";
import DialogBox from "./DialogBox";

const Table = (props) => {
  const jsonColumn = [
    { col: "id", width: "150" },
    { col: "name", width: "100" },
    { col: "email", width: "150" },
    { col: "gender", width: "100" },
    { col: "status", width: "150" },
  ];

  //Fetching data from API
  useEffect(async () => {
    await props.fetchUsersData();
  }, []);

  const indexOfLastUser = props.currentPage * props.usersPerPage;
  const indexOfFirstUser = indexOfLastUser - props.usersPerPage;
  const currentUsers = props.users.slice(indexOfFirstUser, indexOfLastUser);
  const { loading, error } = props;
  return (
    <div className="datatable-wrapper">
      {loading && (
        <span className="noData-wrapper">
          Please Hold on, fetching data may take some time...
        </span>
      )}
      {!loading && error && <DialogBox />}
      {!props.loading && !props.error && (
        <DataTable
          data={_.map(currentUsers, (row, index) =>
            index === props.activeIndex ? { ...row, isActive: true } : row
          )}
          isActionable
          density="extended"
          onRowClick={(rowIndex) => props.handleRowClick(rowIndex)}
          onSort={(field) => props.handleSorting(field)}
        >
          {_.map(jsonColumn, (row, i) => {
            return (
              <DataTable.Column
                className="column-wrapper"
                field={`${row.col}`}
                align="left"
                width={`${row.width}`}
                align="left"
                hasBorderLeft
                isSortable
                key={i}
              >
                {_.upperCase(row.col)}
              </DataTable.Column>
            );
          })}
        </DataTable>
      )}
      <div>
        <Pagination
          usersPerPage={props.usersPerPage}
          totalUsers={props.users.length}
          paginate={(pageNumber) => props.paginate(pageNumber)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userData.users,
  loading: state.userData.loading,
  activeIndex: state.userData.activeIndex,
  usersPerPage: state.userData.usersPerPage,
  currentPage: state.userData.currentPage,
  error: state.error.error,
});

export default connect(mapStateToProps, {
  fetchUsersData,
  handleSorting,
  handleRowClick,
  paginate,
})(Table);
