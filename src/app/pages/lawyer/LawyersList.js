import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import PaginationComponent from "../../Components/PaginationComponent";
import {Portlet} from "../../partials/content/Portlet";
import Filters from "../../Components/Filters";
import LawyerCard from "../../Components/users/LawyerCard";

const LawyerList = () => {
  const { lawyersList } = useSelector(
    ({ lawyers: {lawyersList} }) => ({
      lawyersList
    })
  );
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [filters, setFilters] = useState({
    practiceArea: '',
    search: ''
  })
  const [filteredData, setFilteredData] = useState(lawyersList)
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  useEffect(() => {
    setFilteredData(lawyersList.filter(lawyer =>
      lawyer.lawyer_details.practiceAreas?.toString().includes(filters.practiceArea) && (lawyer.firstName.toLowerCase().includes(filters.search.toLowerCase()) || lawyer.lastName.toLowerCase().includes(filters.search.toLowerCase()))
    ))
  }, [filters, lawyersList])
  return (
    <div className='pb-5'>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand p-3 mb-5">
        <Filters filters={filters} handleChangeFilters={handleChangeFilters} />
      </Portlet>
      <div className='row pt-5'>
        {
          filteredData.length === 0 ? <h5 className='text-center w-100 p-5 letter-space-1'>No Record Found!</h5>
            : filteredData
              .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= filteredData.length ? ((pageNo - 1) * perPage) + perPage : filteredData.length)
              .map(lawyer => (
                <div className="col-12 col-sm-4 col-md-3" key={lawyer._id}>
                  <LawyerCard lawyer={lawyer}/>
                </div>
              ))
        }

      </div>
      <PaginationComponent
        pageNo={pageNo}
        perPage={perPage}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        total={filteredData.length}
      />
    </div>
  );
}

export default LawyerList