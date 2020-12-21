import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const Table = () => {
  const jsonColumn = [
    { col: "id", width: "150" },
    { col: "name", width: "100" },
    { col: "email", width: "150" },
    { col: "gender", width: "100" },
    { col: "status", width: "150" },
  ];
  const users = useSelector((state) => state.userData.users);
  const loading = useSelector((state) => state.userData.loading);
  const activeIndex = useSelector((state) => state.userData.activeIndex);
  const usersPerPage = useSelector((state) => state.userData.usersPerPage);
  const currentPage = useSelector((state) => state.userData.currentPage);
  const dispatch = useDispatch();

  //Fetching data from API
  useEffect(async () => {
    await dispatch(fetchUsersData());
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="datatable-wrapper">
      {loading ? (
        <span className="noData-wrapper">
          Please Hold on, fetching data may take some time...
        </span>
      ) : (
        <DataTable
          data={_.map(currentUsers, (row, index) =>
            index === activeIndex ? { ...row, isActive: true } : row
          )}
          isActionable
          density="extended"
          onRowClick={(rowIndex) => dispatch(handleRowClick(rowIndex))}
          onSort={(field) => dispatch(handleSorting(field))}
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
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={(pageNumber) => dispatch(paginate(pageNumber))}
        />
      </div>
    </div>
  );
};

export default Table;
