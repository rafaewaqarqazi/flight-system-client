import React, {useEffect, useState} from 'react';
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../../partials/content/Portlet";
import {Modal, Table, Alert} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Tooltip} from "@material-ui/core";
import {deleteJob} from "../../../crud/job.crud";
import * as cases from "../../../store/ducks/cases.duck";
import PaginationComponent from "../../../Components/PaginationComponent";
import {getAllCases} from "../../../crud/user.crud";
import _ from 'lodash'
const Clients = ({user, removeJob}) => {
  const [show, setShow] = useState(false);
  const [jobId, setJobId] = useState('');
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [filteredData, setFilteredData] = useState([])
  const [cases, setCases] = useState([])
  const [clients, setClients] = useState([])
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    type: '',
    search: ''
  })

  useEffect(() => {
    getAllCases({userId: user._id, userType: 'lawyer'})
      .then(result => {
        console.log('result', result)
        if (result.data.success) {
          setCases(result.data.cases)
          const unique = _.uniqWith(result.data.cases.map(c => c.client), _.isEqual)
          setClients( unique)
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
  const confirmDelete = () => {
    deleteJob(jobId)
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleClose()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleClose()
          removeJob(jobId)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not delete Job Post'})
        handleClose()
        closeAlert()
      })
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
    setFilteredData(clients.filter(client =>
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
              <input type="text" className='form-control form-control-sm ml-2 ' placeholder='Search for Clients' value={filters.search} onChange={(event) => handleChangeFilters('search', event.target.value)}/>
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
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= clients.length ? ((pageNo - 1) * perPage) + perPage : clients.length)
                  .map((client, i) => (
                    <tr key={i} className='table-row-center'>
                      <td>{i+1}</td>
                      <td>
                        {
                          client.profileImage?.filename ? <img alt="Pic" className="kt-badge  kt-badge--lg kt-img-rounded" src={`/images/${client.profileImage.filename}`} />
                            : <span className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                    <b>{client && client.firstName[0]}</b>
                  </span>
                        }
                      </td>
                      <td>{client.firstName}</td>
                      <td>{client.lastName}</td>
                      <td>{client.email}</td>
                      <td>{cases.filter(c => c.client._id === client._id).length}</td>
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
          <button className='btn btn-danger btn-sm' onClick={confirmDelete}>
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


export default connect(mapStateToProps, cases.actions)(Clients);
