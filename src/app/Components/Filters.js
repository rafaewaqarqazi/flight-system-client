import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {practiceAreas} from "../../utils/practiceAreas";
const Filters = ({filters, handleChangeFilters}) => {
  const [dropdown, setDropdown] = useState({
    department: false,
    category: false,
    type: false
  })
  return (
    <div className='d-flex justify-content-sm-between flex-wrap align-items-center '>
      <div className="d-flex align-items-center">
        <Dropdown isOpen={dropdown.department} toggle={() => setDropdown({...dropdown, department: !dropdown.department})}>
          <DropdownToggle
            className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0"
            caret
          >
            {filters.practiceArea !== '' ? filters.practiceArea : 'Select Area of Practice'}
          </DropdownToggle>

          <DropdownMenu className='dropdown-scroll'>
            <DropdownItem onClick={() => handleChangeFilters('practiceArea', '')} >All</DropdownItem>
            {
              practiceAreas.map(practiceArea => (
                <DropdownItem onClick={() => handleChangeFilters('practiceArea', practiceArea)} key={practiceArea}>{practiceArea}</DropdownItem>
              ))
            }
          </DropdownMenu>

        </Dropdown>
        <div className="position-relative">
          <input type="text" className='form-control form-control-sm ml-2 ' placeholder='Search for Lawyer' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
          <span className='fa fa-search position-absolute ' style={{top: '30%', right: 0}}/>
        </div>
      </div>
    </div>
  );
};

export default Filters;
