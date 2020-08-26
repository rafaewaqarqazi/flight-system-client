import React, {useEffect, useState} from 'react';
import {Alert, Modal, Table} from "react-bootstrap";
import {Portlet, PortletBody, PortletHeader, PortletHeaderToolbar} from "../../partials/content/Portlet";
import {useHistory, useParams} from "react-router-dom";
import {scheduleTestInterview, changeTestInterviewStatus} from "../../crud/job.crud";
import {connect} from "react-redux";
import * as job from "../../store/ducks/jobs.duck";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {getTestInterviewStatus} from "../../../utils";
import {Tooltip} from "@material-ui/core";
import moment from "moment";
import PaginationComponent from "../../Components/PaginationComponent";
import FiltersTestInterviews from "../../Components/FiltersTestInterviews";

const Tests = ({jobsList, jobEdit, isAdmin}) => {
  const history = useHistory()
  const params = useParams()
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [job, setJob] = useState(false);
  const [applications, setApplications] = useState([]);
  const [date, handleChangeDate] = useState(new Date())
  const [error, setError] = useState({show: false, message: ''});
  const [success, setSuccess] = useState({show: false, message: ''});
  const [selectAll, setSelectAll] = useState(false);
  const [statusData, setStatusData] = useState({applicationId: '', status: '', email: ''})
  const [perPage, setPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [applicationsInPage, setApplicationsInPage] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  })
  const handlePageChange = (pageNumber) => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseStatus = () => setShowStatus(false);
  const handleShowStatus = (applicationId, status, email) => {
    setStatusData({applicationId, status, email})
    setShowStatus(true);
  }
  useEffect(() => {
    const data = jobsList.filter(job => job._id === params.jobId)
    if (data.length === 0) {
      history.push('/tests')
    } else {
      setJob(data[0])
      const dataN = data[0].applications.filter(app => app.test).map(app => ({...app, checked: false}))
      setApplications(dataN)
      setFilteredData(dataN.filter(job =>
        job.test.status.includes(filters.status) && `${job.user.firstName.toLowerCase()} ${job.user.lastName.toLowerCase()}`.includes(filters.search.toLowerCase())
      ))
    }
  }, [jobsList, filters])
  const onCheckAll = () => {
    setFilteredData(filteredData.map(application => {
      return {...application, checked: application.status === '2' && application.test.status === '2' ? !selectAll : false}
    }))
    setSelectAll(!selectAll)
  }
  const closeAlert = () => {
    setTimeout(() => {
      setError({show: false, message: ''})
      setSuccess({show: false, message: ''})
    }, 3000)
  }
  const onCheckSingle = id => {
    setFilteredData(filteredData.map(application => {
      if (application._id === id) {
        return {...application, checked: !application.checked}
      } else {
        return application
      }
    }))
  }
  const handleScheduleInterview = () => {
    const applicationsIds = filteredData.filter(application => application.checked)
      .map(app => app._id)
    const emails = filteredData.filter(application => application.checked).map(app => app.user.email)
    scheduleTestInterview({applicationsIds, jobId: job._id, date, status: '3', type: 'interview', emails})
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleClose()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleClose()
          jobEdit(res.data.job)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not Schedule Test'})
        handleClose()
        closeAlert()
      })
  }
  const handleChangeStatus = () => {
    changeTestInterviewStatus({jobId: job._id, type: 'test', ...statusData})
      .then(res => {
        if (!res.data.success) {
          setError({show: true, message: res.data.message})
          handleCloseStatus()
          closeAlert()
        } else {
          setSuccess({show: true, message: res.data.message})
          handleCloseStatus()
          jobEdit(res.data.job)
          closeAlert()
        }
      })
      .catch(error => {
        setError({show: true, message: 'Could not Perform this action'})
        handleCloseStatus()
        closeAlert()
      })
  }
  const handleChangeFilters = (name, value) => {
    setFilters({...filters, [name]: value})
  }
  return (
    <div>
      <Alert show={success.show} variant="success">{success.message}</Alert>
      <Alert show={error.show} variant="danger">{error.message}</Alert>
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title={`${job.title} Applications`}
          toolbar={
            <PortletHeaderToolbar>
              {
                isAdmin &&
                  <button className='btn btn-label btn-bold btn-sm' onClick={handleShow} disabled={filteredData.filter(app => app.checked).length === 0}>
                    <i className='fa fa-clock'/> Schedule Interview
                  </button>
              }
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          <FiltersTestInterviews filters={filters} handleChangeFilters={handleChangeFilters}/>
          <Table responsive className='mt-3'>
            <thead>
            <tr>
              {
                isAdmin &&
                  <th>
                    <input
                      type="checkbox"
                      className='form-check'
                      disabled={filteredData.filter(app => app.test.status === '2').length === 0}
                      checked={selectAll}
                      onChange={onCheckAll}
                    />
                  </th>
              }
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              {
                isAdmin &&
                <th>CV</th>
              }

              <th>Test Status</th>
              <th>Test Date</th>
              {
                isAdmin &&
                  <th>Actions</th>
              }
            </tr>
            </thead>
            <tbody>
            {
              filteredData.length === 0
                ? <tr >
                  <td colSpan={isAdmin ? 8 : 5} style={{textAlign: 'center'}}>No Tests Found</td>
                </tr>
                : filteredData
                  .slice((pageNo - 1) * perPage, ((pageNo - 1) * perPage) + perPage <= filteredData.length ? ((pageNo - 1) * perPage) + perPage : filteredData.length)
                  .map((application, i) => (
                  <tr key={i}>
                    {
                      isAdmin &&
                        <td>
                          <input
                            type="checkbox"
                            className='form-check'
                            disabled={application.test.status !== '2' || parseInt(application.status) > 2}
                            checked={application.checked}
                            onChange={() => onCheckSingle(application._id)}
                          />
                        </td>
                    }
                    <td>{application.user.firstName}</td>
                    <td>{application.user.lastName}</td>
                    <td>{application.user.email}</td>
                    {
                      isAdmin &&
                      <td>{application.user.user_details ? <a href={`/pdf/${application.user.user_details.cv.filename}`} target='_blank' className='text-decoration-none text-danger' style={{fontSize: 16}}><i className='fa fa-file-pdf'/></a>  : 'Not Provided'}</td>
                    }

                    <td>{getTestInterviewStatus(application.test.status)}</td>
                    <td>{moment(application.test.date).format('DD/MM/YYYY')}</td>
                    {
                      isAdmin &&
                        <td>
                          <Tooltip title='Mark as Passed!' placement='top'>
                          <span>
                            <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 2} onClick={() => handleShowStatus(application._id, '2', application.user.email)}>
                              <i className='fa fa-check-double text-success mr-4' />
                            </button>
                          </span>
                          </Tooltip>
                          <Tooltip title='Mark as failed' placement='top' >
                          <span>
                            <button className='btn btn-icon h-auto w-auto' disabled={parseInt(application.status) > 2} onClick={() => handleShowStatus(application._id, '3', application.user.email)}>
                              <i className='fa fa-times-circle text-danger' />
                            </button>
                          </span>
                          </Tooltip>
                        </td>
                    }
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
          <Modal.Title>Schedule Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="input-group">
              <DateTimePicker
                animateYearScrolling
                disablePast
                className='form-control date-picker'
                value={date}
                onChange={handleChangeDate}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <span className='fa fa-calendar-check'/>
                </span>
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-success btn-sm' onClick={handleScheduleInterview}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showStatus} onHide={handleCloseStatus} centered>
        <Modal.Header closeButton>
          <Modal.Title>Test Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary btn-sm' onClick={handleCloseStatus}>
            Close
          </button>
          <button className='btn btn-success btn-sm' onClick={handleChangeStatus}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = ({ jobs: {jobsList}, auth }) => ({
  jobsList,
  isAdmin: auth.user && auth.user.role === '2'
});

export default connect(mapStateToProps, job.actions)(Tests);