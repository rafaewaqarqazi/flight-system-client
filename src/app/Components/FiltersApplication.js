import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {getStatus} from "../../utils";

const FiltersApplication = ({filters, handleChangeFilters}) => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className='d-flex justify-content-sm-end flex-wrap align-items-center '>
      <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
        <DropdownToggle
          className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
          caret
        >
          {filters.status !== '' ? getStatus(filters.status) : 'Select Status'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleChangeFilters('status', '')} >All</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '1')}>Pending</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '2')}>Test Scheduled</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '3')}>Interview Scheduled</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '4')}>Selected</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '5')}>Application Rejected</DropdownItem>
          <DropdownItem onClick={() => handleChangeFilters('status', '6')}>Selection Rejected</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="position-relative">
        <input type="text" className='form-control ml-2 ' placeholder='Search by Name' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
        <span className='fa fa-search position-absolute ' style={{top: '30%', right: 0, fontSize: 16}}/>
      </div>
    </div>
  );
};

export default FiltersApplication;