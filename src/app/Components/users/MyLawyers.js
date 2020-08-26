import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {Modal, Table, Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Tooltip} from "@material-ui/core";
import * as cases from "../../store/ducks/cases.duck";
import PaginationComponent from "../../Components/PaginationComponent";
import {getAllCases} from "../../crud/user.crud";
import _ from 'lodash'
const MyLawyers = ({user, removeJob}) => {
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState('');
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [filteredData, setFilteredData] = useState([])
  const [cases, setCases] = useState([])
  const [lawyers, setLawyers] = useState([])
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    type: '',
    search: ''
  })

  useEffect(() => {
    getAllCases({userId: user._id, userType: 'client'})
      .then(result => {
        console.log('result', result)
        if (result.data.success) {
          setCases(result.data.cases)
          const unique = _.uniqWith(result.data.cases.map(c => c.lawyer), _.isEqual)
          setLawyers( unique)
          setFilteredData(unique)
        } else {
          console.log('Something went wrong')
        }
      })
      .catch(error => console.log('error', error.message))
  }, [])
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setJobId(id)
    setShow(true);
  }

  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }

  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  useEffect(() => {
    setFilteredData(lawyers.filter(client =>
      client.firstName.toLowerCase().includes(filters.search.toLowerCase()) || client.lastName.toLowerCase().includes(filters.search.toLowerCase())
    ))
  }, [filters])
  return (
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title='My Clients'

        />
        <PortletBody>
          <div className="d-flex align-items-center justify-content-end">
            <div className="position-relative">
              <input type="text" className='form-control form-control-sm ml-2 ' placeholder='Search for Lawyers' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
              <span className='fa fa-search position-absolute ' style={{top: '30%', right: 0}}/>
            </div>
          </div>
          <Table responsive className='mt-2'>
            <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>No of Cases</th>
            </tr>
            </thead>
            <tbody>
            {
              filteredData.length === 0
                ? <tr >
                  <td colSpan={8} style={{textAlign: 'center'}}>No Clients Found</td>
                </tr>
                : filteredData
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= lawyers.length ? ((pageNo - 1) * perPage) + perPage : lawyers.length)
                  .map((lawyer, i) => (
                    <tr key={i} className='table-row-center'>
                      <td>{i+1}</td>
                      <td>
                        {
                          lawyer.profileImage?.filename ? <img alt="Pic" className="kt-badge  kt-badge--lg kt-img-rounded" src={`/images/${lawyer.profileImage.filename}`} />
                            : <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                    <b>{lawyer && lawyer.firstName[0]}</b>
                  </span>
                        }

                      </td>
                      <td>{lawyer.firstName}</td>
                      <td>{lawyer.lastName}</td>
                      <td>{lawyer.email}</td>
                      <td>{cases.filter(c => c.lawyer._id === lawyer._id).length}</td>
                    </tr>
                  ))
            }
            </tbody>
          </Table>
          <PaginationComponent
            pageNo={pageNo}
            perPage={perPage}
            handlePageChange={handlePageChange}
            handlePerPageChange={handlePerPageChange}
            total={filteredData.length}
          />
        </PortletBody>
      </Portlet>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this job post?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-danger btn-sm' >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps =({ auth: {user} }) => ({
  user
});


export default connect(mapStateToProps, cases.actions)(MyLawyers);
