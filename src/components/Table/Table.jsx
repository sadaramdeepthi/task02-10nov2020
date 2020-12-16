import React, { useEffect, useState } from "react";
import { DataTable } from "lucid-ui";
import _ from "lodash";
import "../../style/Table.scss";
import Pagination from "./Pagination";
import FetchDataApi from "../../utils/FetchDataApi";

const Table = () => {
  const [users, setUsers] = useState([]);
  const jsonColumn = [
    { col: "id", width: "150" },
    { col: "name", width: "100" },
    { col: "email", width: "150" },
    { col: "gender", width: "100" },
    { col: "status", width: "150" },
  ];
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
    const fetchData = await FetchDataApi();
    if (fetchData) {
      setLoading(false);
      setUsers(fetchData);
    } else {
      setLoading(true);
    }
    // fetchData ? setUsers(fetchData) : setLoading(true);
  }, [setUsers, setLoading]);

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
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Table;
