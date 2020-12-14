import { Paginator } from "lucid-ui";
import "../../style/Table.scss";
import React from "react";

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  return (
    <div className="pagination-wrapper">
      <Paginator
        totalCount={totalUsers}
        onPageSelect={(number) => paginate(number)}
        totalPages={totalUsers / usersPerPage}
      />
    </div>
  );
};

export default Pagination;
