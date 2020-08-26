import React, {useEffect, useState} from 'react';
import { PortletBody, PortletFooter} from "../../partials/content/Portlet";
import {connect} from "react-redux";
import * as job from "../../store/ducks/jobs.duck";
import Tooltip from "@material-ui/core/Tooltip";
import Rating from '@material-ui/lab/Rating'
import {Link} from "react-router-dom";
import {getRatings} from "../../../utils";
import {getAllCases} from "../../crud/user.crud";
const LawyerCard = ({lawyer}) => {
  const [cases, setCases] = useState([])
  useEffect(() => {
    getAllCases({userId: lawyer._id, userType: 'lawyer'})
      .then(result => {
        console.log('result', result)
        if (result.data.success) {
          setCases(result.data.cases)
        } else {
          console.log('Something went wrong')
        }
      })
      .catch(error => console.log('error', error.message))
  }, [])
  const getNoOfActiveCases = () => {
    return cases.filter(c => c.details?.status !== 'Completed').length
  }
  const getCompletedCases = () => {
    return cases.filter(c => c.details?.status === 'Completed').length
  }
  return (
    <>
      <Link to={`/lawyer/details/${lawyer._id}`} className="kt-portlet kt-portlet--border-bottom-brand text-decoration-none lawyer-card__scale-image" style={{cursor: 'pointer', color: 'inherit'}}>
        <div className='d-flex justify-content-center'>
          <img className='kt-img-rounded shadow' style={{marginTop: '-50px'}} width={120} height={120} src={lawyer.profileImage && lawyer.profileImage.filename ? `/images/${lawyer.profileImage.filename}` : "/media/users/100_13.jpg"} alt={lawyer.firstName}/>
        </div>
        <PortletBody>
          <Tooltip title={`${lawyer.firstName} ${lawyer.lastName}`} placement='top'>
            <h5 style={{textOverflow: 'ellipsis'}} className='text-nowrap overflow-hidden text-center'>{`${lawyer.firstName} ${lawyer.lastName}`}</h5>
          </Tooltip>
          <div className='pt-2 pb-2'>
            <div className='d-flex justify-content-between'>
              <span className='font-weight-bold'>Law School:</span>
              <span>{lawyer.lawyer_details.lawSchool || 'N/A'}</span>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <span className='font-weight-bold'>Practice Areas:</span>
              <div >
                {
                  lawyer.lawyer_details.practiceAreas && lawyer.lawyer_details.practiceAreas.length > 0 ?
                    lawyer.lawyer_details.practiceAreas.map(practiceArea => (
                      <div key={practiceArea}>{practiceArea}</div>
                    )) : <div>N/A</div>
                }
              </div>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <span className='font-weight-bold'>Active Cases:</span>
              <span>
                {getNoOfActiveCases()}/{cases.length}
              </span>
            </div>
            <div className='d-flex justify-content-between mb-3'>
              <span className='font-weight-bold'>Completed Cases:</span>
              <span>
                {getCompletedCases()}/{cases.length}
              </span>
            </div>
          </div>

        </PortletBody>
        <PortletFooter>
          <div className='d-flex justify-content-between'>
            <span className='font-weight-bold'>Ratings:</span>
            <span className='d-flex align-items-center'><Rating name="lawyer-rating" value={getRatings(lawyer.lawyer_details.reviews)} readOnly/>({getRatings(lawyer.lawyer_details.reviews)})</span>
          </div>
        </PortletFooter>
      </Link>
    </>
  );
};

export default LawyerCard;
