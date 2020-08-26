import React, {useEffect, useState} from 'react';
import UserLayout from "../Components/layout/user/UserLayout";
import {Link} from "react-router-dom";
import {getAllLawyers} from "../crud/user.crud";
import LawyerCard from "../Components/users/LawyerCard";
import * as lawyer from "../store/ducks/lawyers.duck";
import {connect, useSelector} from "react-redux";
import {getRatings} from "../../utils";
import {login} from "../crud/auth.crud";
import {Field, Form, Formik} from "formik";
import InputAirports from "../Components/input/InputAirport";
import Chip from "@material-ui/core/Chip";
import {Done, CloseOutlined} from '@material-ui/icons'
import moment from "moment";
import {formErrorMessage} from "./errors/FormErrorMessage";
import clsx from "clsx";
import {getOneWayFlights} from "../crud/flights.crud";
const Home = ({addLawyers}) => {
  const { lawyersList } = useSelector(
    ({ lawyers: {lawyersList} }) => ({
      lawyersList
    })
  );
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };
  useEffect(() => {
    getAllLawyers()
      .then(res => {
        if (res.data.success) {
          addLawyers(res.data.lawyers)
        }
      })
  }, [])
  return (
    <UserLayout nobg={true}>
      <div style={{marginTop: '-20px', backgroundImage: 'url(/media/bg/main.jpg)', backgroundSize: '100%',  backgroundRepeat: 'no-repeat'}}>
        <div className="container">
          <div className="row align-items-center" style={{height: 310}}>
            <Formik
              initialValues={{
                origin: "",
                destination: "",
                oneWay: false,
                depart:'',
                return: '',
                adults: '',
                child: ''
              }}
              validate={values => {
                const errors = {};

                if (!values.origin) {
                  errors.origin = 'Required!';
                }
                if (!values.destination) {
                  errors.destination =  'Required!';
                }
                if (!values.depart) {
                  errors.depart =  'Required!';
                }
                if (!values.oneWay && !values.return) {
                  errors.return =  'Required!';
                }
                if ( !values.adults && !values.child) {
                  errors.adults =  'Required!';
                  errors.child =  'Required!';
                }
                if ( !values.adults && values.child) {
                  errors.child =  'Adults are Required!';
                }
                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                console.log('values', values)
                enableLoading();
                // setTimeout(() => {
                  getOneWayFlights(values)
                    .then((res) => {
                      console.log('res', res)
                      disableLoading();
                    })
                    .catch((e) => {
                      console.log('error', e.message)
                      disableLoading();
                      setSubmitting(false);
                    });
                // }, 1000);
              }}
            >
              {({
                  values,
                  errors,
                  handleSubmit,
                  setFieldValue

                }) => (
                <Form className="kt-form row w-100 align-items-center"  style={{background: '#fff', padding: '10px 5px 30px 10px', borderRadius: '4px'}} onSubmit={handleSubmit}>
                  <div className="col-12">
                    <Chip
                      label="One Way"
                      onClick={() => setFieldValue('oneWay', !values.oneWay)}
                      onDelete={() => setFieldValue('oneWay', false)}
                      deleteIcon={values.oneWay ? <Done /> : <CloseOutlined/>}
                      variant={values.oneWay ? 'default' : 'outlined'}
                      size='small'
                      style={{marginRight: 5}}
                      color='secondary'
                    />
                    <Chip
                      label="Two Way"
                      onClick={() => setFieldValue('oneWay', !values.oneWay)}
                      onDelete={() => setFieldValue('oneWay', true)}
                      deleteIcon={!values.oneWay ? <Done /> : <CloseOutlined/>}
                      variant={!values.oneWay ? 'default' : 'outlined'}
                      color='secondary'
                      size='small'
                    />
                  </div>
                  <div className={values.oneWay ? "col-3" : "col-2"}>
                    <div>From</div>
                    <InputAirports field={'origin'}/>
                    {formErrorMessage(errors.origin)}
                  </div>
                  <div className={values.oneWay ? "col-3" : "col-2"}>
                    <div>To</div>
                    <InputAirports field={'destination'}/>
                    {formErrorMessage(errors.destination)}
                  </div>
                  <div className="col-2">
                    <div>Depart</div>

                      <Field as={
                        (props) => (
                          <input type="text" className="form-control" onFocus={(e) => e.currentTarget.type='date'} onBlur={(e) => e.currentTarget.type='text'}  {...props} />
                        )
                      } placeholder='Depart Date' name='depart' min={moment(new Date()).format('YYYY-MM-DD')}/>
                    {formErrorMessage(errors.depart)}
                  </div>
                  {
                    !values.oneWay &&  <div className="col-2">
                      <div>Return</div>
                      <Field as={
                        (props) => (
                          <input type="text" className="form-control" onFocus={(e) => e.currentTarget.type='date'} onBlur={(e) => e.currentTarget.type='text'}  {...props} />
                        )
                      } placeholder='Depart Date' name='return' min={moment(values.depart || new Date()).format('YYYY-MM-DD') }/>
                      {formErrorMessage(errors.return)}
                    </div>
                  }

                  <div className="col-2">
                    <div>Adults</div>
                    <Field className="form-control" name="adults" as='select'>
                      <option value=''>Select</option>
                      {
                        [...Array(9 ).keys()]
                          .map(v => (
                            <option value={v + 1} disabled={ (v + 1 + parseInt(values.adults || 0)  + parseInt(values.child || 0)) > 9}>{v + 1}</option>
                          ))
                      }
                    </Field>
                    {formErrorMessage(errors.adults)}
                  </div>
                  <div className="col-2">
                    <div>Child</div>
                    <Field className="form-control" name="child" as='select'>
                      <option value=''>Select</option>
                      {
                        [...Array(9 ).keys()]
                          .map(v => (
                            <option value={v + 1} disabled={ (v + 1 + parseInt(values.adults || 0)  + parseInt(values.child || 0)) > 9}>{v + 1}</option>
                          ))
                      }
                    </Field>
                    {formErrorMessage(errors.child)}
                  </div>

                  <div className="col-12 text-right">
                    <button  className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                      {
                        "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                      }
                    )}`}
                             style={loadingButtonStyle} type={"submit"}> <i className='fa fa-search'/> Find Offers</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 30px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Highest Ranked</h4>
          <Link to='/lawyers/list' className='nav-link'>See All</Link>
          </div>
          <div className="row mt-5">
            {
              lawyersList.length === 0 ? <h5 className='text-center w-100 p-5'>No Record Found!</h5>
              : lawyersList.sort((a, b) => getRatings(b.lawyer_details.reviews) - getRatings(a.lawyer_details.reviews))
                .map((lawyer, i) => (
                  i < 6 &&
                  <div className="col-12 col-sm-4" key={lawyer._id}>
                    <LawyerCard lawyer={lawyer} />
                  </div>
                ))
            }
          </div>
          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderRadius: '4px'}}>
            <h4 className='mb-0'>Categories</h4>
          </div>
          <div className="row mt-3">
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-user-injured'/></div>
              <h5 className='flex-grow-1'>Accident & Injuries</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-gavel'/></div>
              <h5 className='flex-grow-1'>Criminal Law</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-users'/></div>
              <h5 className='flex-grow-1'>Family Law</h5>
            </div>
            <div className='p-4 align-items-center col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up'>
              <div style={{fontSize: '36px'}} className='mr-3'><i className='fa fa-user-tie'/></div>
              <h5 className='flex-grow-1'>Employment Law</h5>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center' style={{background: 'rgb(242, 243, 248)', padding: '10px 5px 10px 10px', borderBottom: '1px solid rgb(220, 220, 220)'}}>
            <h4 className='mb-0'>Here's What Clients say about our lawyers</h4>
          </div>
          <div className="row mt-3 pb-5">
            {
              lawyersList.length === 0 ? <h5 className='text-center w-100 p-5'>Nothing Found!</h5>
                : lawyersList.sort((a, b) => getRatings(b.lawyer_details.reviews) - getRatings(a.lawyer_details.reviews))
                  .map((lawyer, i) => {
                    const review = lawyer.lawyer_details.reviews.sort((a, b) => parseInt(b.rating, 10) - parseInt(a.rating, 10) )[0]
                    if (1<4) {
                      if (review) {
                        return (
                          <div className='p-4 d-flex align-items-start col-12 col-sm-6 '>
                            <img
                              className="kt-img-rounded mr-4"
                              width={95}
                              height={95}
                              src={
                                review?.reviewedBy?.profileImage?.filename
                                  ? `/images/${review?.reviewedBy?.profileImage.filename}`
                                  : "/media/users/100_13.jpg"
                              }
                              alt={review?.reviewedBy?.firstName}
                            />
                            <div className='flex-grow-1 d-flex flex-column'>
                              <p>{review.text}</p>
                              <div className='font-weight-bold mt-2'>{`${review.reviewedBy.firstName} ${review.reviewedBy.lastName}`}</div>
                              <div>{review.reviewedBy.address}</div>
                            </div>
                          </div>
                        )
                      } else {
                        return (<h5 className='text-center w-100 p-5'>Nothing Found!</h5>)
                      }

                    }
                  })
            }

          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default  connect(null, lawyer.actions)(Home);
