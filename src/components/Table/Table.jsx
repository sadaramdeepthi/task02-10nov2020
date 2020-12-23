import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "../../style/Table.scss";
import {
  fetchUsersData,
  handleSorting,
  handleRowClick,
  paginate,
} from "../../actions/fetchDataAction";
import TableComponent from "./TableComponent";

const Table = ({
  fetchUsersData,
  currentPage,
  usersPerPage,
  users,
  loading,
  error,
  activeIndex,
  paginate,
  handleSorting,
  handleRowClick,
}) => {
  const jsonColumn = [
    { col: "id", width: "150" },
    { col: "name", width: "100" },
    { col: "email", width: "150" },
    { col: "gender", width: "100" },
    { col: "status", width: "150" },
  ];

  //Fetching data from API
  useEffect(async () => {
    await fetchUsersData();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const usersLength = users.length;

  return (
    <TableComponent
      currentUsers={currentUsers}
      loading={loading}
      error={error}
      activeIndex={activeIndex}
      jsonColumn={jsonColumn}
      usersPerPage={usersPerPage}
      users={users}
      handleRowClick={handleRowClick}
      handleSorting={handleSorting}
      paginate={paginate}
      usersLength={usersLength}
    />
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
