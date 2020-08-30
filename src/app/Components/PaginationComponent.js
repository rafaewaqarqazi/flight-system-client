import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Pagination from "react-js-pagination";
const PaginationComponent = ({
  pageNo,
  perPage,
  total,
  handlePageChange,
  handlePerPageChange
}) => {
  const [perPageDropdown, setPerPageDropdown] = useState(false);
  return (
    <div className="d-flex justify-content-between  align-items-start flex-column-reverse align-items-sm-center flex-sm-row">
      <Pagination
        activePage={pageNo}
        itemsCountPerPage={perPage}
        totalItemsCount={total}
        pageRangeDisplayed={5}
        innerClass="table-paginate pagination"
        itemClass="page-item"
        linkClass="page-link"
        nextPageText=">"
        prevPageText="<"
        onChange={handlePageChange}
      />
      <div className="d-flex align-items-center">
        <Dropdown
          isOpen={perPageDropdown}
          toggle={() => setPerPageDropdown(!perPageDropdown)}
        >
          <DropdownToggle
            className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
            caret
          >
            {perPage}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handlePerPageChange(5)}>
              5
            </DropdownItem>
            <DropdownItem onClick={() => handlePerPageChange(10)}>
              10
            </DropdownItem>
            <DropdownItem onClick={() => handlePerPageChange(15)}>
              15
            </DropdownItem>
            <DropdownItem onClick={() => handlePerPageChange(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="ml-2">
          Showing {pageNo}-{perPage} of {total}
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
