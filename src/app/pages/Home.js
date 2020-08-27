import React, {useEffect, useState} from 'react';
import UserLayout from "../Components/layout/user/UserLayout";
import {Link} from "react-router-dom";
import {getAllLawyers} from "../crud/user.crud";
import LawyerCard from "../Components/users/LawyerCard";
import * as lawyer from "../store/ducks/lawyers.duck";
import {connect, useSelector} from "react-redux";
import {getRatings} from "../../utils";
import {Field, Form, Formik} from "formik";
import InputAirports from "../Components/input/InputAirport";
import {Chip} from "@material-ui/core";
import {Done, CloseOutlined} from '@material-ui/icons'
import moment from "moment";
import {formErrorMessage} from "./errors/FormErrorMessage";
import clsx from "clsx";
import {getAirline, getOneWayFlights, getTwoWayFlights} from "../crud/flights.crud";
const Home = ({addLawyers}) => {
  const { lawyersList } = useSelector(
    ({ lawyers: {lawyersList} }) => ({
      lawyersList
    })
  );
  const [flights, setFlights] = useState([])
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
  }, [addLawyers])
  const getAirlineByCode = async code => {
    const result = await getAirline({airlineCodes: code})
    const data = await result.data
    if (data?.airline) {
      return  `${result.data?.airline[0]?.businessName}`
    } else {
      return 'NA'
    }

  }
  return (
    <UserLayout nobg={true}>
      <div style={{marginTop: '-20px', backgroundImage: 'url(/media/bg/main.jpg)', backgroundSize: '100%',  backgroundRepeat: 'no-repeat'}}>
        <div className="container">
          <div className="d-flex align-items-center" style={{height: 310}}>
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
                const getFlight = values.oneWay ? getOneWayFlights : getTwoWayFlights

                getFlight(values)
                    .then((res) => {
                      console.log('res', res)
                      setFlights(res.data.flights)
                      disableLoading();
                    })
                    .catch((e) => {
                      console.log('error', e.message)
                      disableLoading();
                      setSubmitting(false);
                    });

              }}
            >
              {({
                  values,
                  errors,
                  handleSubmit,
                  setFieldValue

                }) => (
                <Form className="kt-form row align-items-center"  style={{background: '#fff', padding: '10px 5px 30px 10px', borderRadius: '4px'}} onSubmit={handleSubmit}>
                  <div className="col-12 mb-3">
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
          <div className='row' style={{background: '#fff', padding: '10px 5px 30px 10px', borderRadius: '4px'}}>
            <h4 className='mb-3 col-12'>Flights</h4>
            {console.log('flights', flights)}
            <div className="col-2">Airline</div>
            <div className="col-2">Departure</div>
            <div className="col-2">Arrival</div>
            <div className="col-2">Duration</div>
            <div className="col-2">Availability</div>
            <div className="col-2"></div>

          </div>
          <div  style={{background: '#fff', padding: '10px 5px 30px 10px', borderRadius: '4px'}}>
            {
              flights.map(flight => (
                <>
                  {flight.itineraries[0]?.segments?.map(segment => (
                    <div className='row'>
                      <div className="col-2">{segment.carrierCode}-{segment.aircraft?.code}</div>
                      <div className="col-2">{segment?.departure.iataCode}-{moment(segment?.departure.at).format('DD-MM-YY hh:mm a')}</div>
                      <div className="col-2">{segment?.arrival.iataCode}-{moment(segment?.arrival.at).format('DD-MM-YY hh:mm a')}</div>
                      <div className="col-2">{moment.duration(segment.duration).hours()}</div>
                      <div className="col-2"></div>
                    </div>
                  ))}
                </>

              ))
            }
          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default  connect(null, lawyer.actions)(Home);
