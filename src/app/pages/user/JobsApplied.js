import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PaginationComponent from "../../Components/PaginationComponent";
import JobCard from "../../Components/jobs/JobCard";
import {Alert} from "react-bootstrap";
import Filters from "../../Components/Filters";
import {Portlet} from "../../partials/content/Portlet";

const JobsApplied = () => {
  const { jobsList, userId } = useSelector(
    ({ jobs: {jobsList}, auth }) => ({
      jobsList,
      userId: auth.user && auth.user._id,
    })
  );
  const [userJobs, setUserJobs] = useState([])
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    type: '',
    search: ''
  })
  const [filteredData, setFilteredData] = useState(jobsList)
  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  useEffect(() => {
    setFilteredData(userJobs.filter(job =>
      filters.department !== ''
        ? job.department === filters.department && job.category.includes(filters.category) && job.type.includes(filters.type) && job.title.toLowerCase().includes(filters.search.toLowerCase())
        : job.department.includes(filters.department) && job.category.includes(filters.category) && job.type.includes(filters.type) && job.title.toLowerCase().includes(filters.search.toLowerCase())
    ))
  }, [filters])
  useEffect(() => {
    const data = jobsList.filter(job => job.applications.filter(app => app.user._id === userId).length > 0)
    setUserJobs(data)
    setFilteredData(data)
  }, [])
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };
  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  return (
    <div className='pb-5'>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand p-3">
        <Filters filters={filters} handleChangeFilters={handleChangeFilters} />
      </Portlet>
      <div className='row'>
        {
          filteredData.length === 0 ? <h5 className='text-center w-100 p-5'>No Record Found!</h5>
            : filteredData
            .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= filteredData.length ? ((pageNo - 1) * perPage) + perPage : filteredData.length)
            .map(job => (
              <div className="col-12 col-sm-4 col-md-3" key={job._id}>
                <JobCard job={job} setError={setError} setSuccess={setSuccess}/>
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
};

export default JobsApplied;