import React, { useEffect, useState } from "react";
import { DataTable } from "lucid-ui";
import _ from "lodash";
import "../../style/Table.scss";
import Pagination from "./Pagination";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [currentlySortedField, setCurrentlySortedField] = useState("id");
  const [
    currentlySortedFieldDirection,
    setCurrentlySortedFieldDirection,
  ] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  // Fetching data from API
  useEffect(async () => {
    const response = await fetch("https://gorest.co.in/public-api/users");
    const data = await response.json();
    console.log(data);
    console.log(data.data);
    setUsers(data.data);
    setLoading(false);
  }, []);

  const handleRowClick = (item, rowIndex) => {
    setActiveIndex(rowIndex);
  };

  // Handling sorting.
  const handleSorting = (field) => {
    const nextCurrentlySortedFieldDirection =
      currentlySortedField === field && currentlySortedFieldDirection === "asc"
        ? "desc"
        : "asc";
    const nextData = _.sortBy(users, field);

    setCurrentlySortedField(field);
    setCurrentlySortedFieldDirection(nextCurrentlySortedFieldDirection);
    setUsers(
      nextCurrentlySortedFieldDirection === "desc"
        ? nextData
        : _.reverse(nextData)
    );
    setActiveIndex(null);
  };

  //Getting current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Changing the page
  const paginate = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPage(pageNumber + 1);
  };

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
          onRowClick={handleRowClick}
          onSort={handleSorting}
        >
          <DataTable.Column
            field="id"
            align="center"
            width={100}
            hasBorderLeft
            isSortable
          >
            ID No.
          </DataTable.Column>

          <DataTable.Column
            field="name"
            align="left"
            hasBorderLeft
            hasBorderRight
            isSortable
            isResizable
          >
            Name
          </DataTable.Column>

          <DataTable.Column
            field="email"
            align="left"
            hasBorderLeft
            hasBorderRight
            isSortable
          >
            Email
          </DataTable.Column>

          <DataTable.Column
            field="gender"
            align="left"
            width={150}
            hasBorderLeft
            hasBorderRight
            isSortable
          >
            Gender
          </DataTable.Column>

          <DataTable.Column
            field="status"
            align="left"
            width={100}
            hasBorderLeft
            hasBorderRight
          >
            Status
          </DataTable.Column>
        </DataTable>
      )}

      <div>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Table;
