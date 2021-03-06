import React from "react";
import { DataTable } from "lucid-ui";
import _ from "lodash";
import DialogBox from "./DialogBox";
import Pagination from "./Pagination";
import PropTypes from "prop-types";

const TableComponent = ({
  loading,
  error,
  currentUsers,
  activeIndex,
  jsonColumn,
  usersPerPage,
  handleRowClick,
  handleSorting,
  paginate,
  usersLength,
}) => {
  return (
    <div className="table-wrapper">
      {!loading && error && <DialogBox />}
      {loading && (
        <span className="noData-wrapper">
          Please Hold on, fetching data may take some time...
        </span>
      )}

      {!loading && !error && currentUsers.length && (
        <DataTable
          className="datatable-wrapper"
          data={_.map(currentUsers, (row, index) =>
            index === activeIndex ? { ...row, isActive: true } : row
          )}
          isActionable
          density="extended"
          onRowClick={(rowIndex) => handleRowClick(rowIndex)}
          onSort={(field) => handleSorting(field)}
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
          totalUsers={usersLength}
          paginate={(pageNumber) => paginate(pageNumber)}
        />
      </div>
    </div>
  );
};

TableComponent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  currentUsers: PropTypes.array.isRequired,
  activeIndex: PropTypes.number,
  jsonColumn: PropTypes.array.isRequired,
  usersPerPage: PropTypes.number,
  handleRowClick: PropTypes.func,
  handleSorting: PropTypes.func,
  paginate: PropTypes.func,
  usersLength: PropTypes.number,
};

export default TableComponent;
