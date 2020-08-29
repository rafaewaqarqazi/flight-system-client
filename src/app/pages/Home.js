import React, { useEffect, useState } from "react";
import UserLayout from "../Components/layout/user/UserLayout";
import * as lawyer from "../store/ducks/lawyers.duck";
import { connect, shallowEqual, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import InputAirports from "../Components/input/InputAirport";
import { Chip } from "@material-ui/core";
import { Done, CloseOutlined } from "@material-ui/icons";
import moment from "moment";
import { formErrorMessage } from "./errors/FormErrorMessage";
import clsx from "clsx";
import {
  bookFlight,
  getAirline,
  getOneWayFlights,
  getRecommended,
  getTwoWayFlights
} from "../crud/flights.crud";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import Login from "./auth/Login";
import AlertSuccess from "../Components/alerts/AlertSuccess";
import AlertError from "../Components/alerts/AlertError";
const Home = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [searched, setSearched] = useState(false);
  const [details, setDetails] = useState(null);
  const [flights, setFlights] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [response, setResponse] = useState({
    success: {
      show: false,
      message: ""
    },
    error: {
      show: false,
      message: ""
    }
  });
  const [showLogin, setShowLogin] = useState(false);
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user
    }),
    shallowEqual
  );
  //Fetching Recommended
  useEffect(() => {
    setRecommendedLoading(true);
    getRecommended()
      .then(result => {
        setRecommended(result.data.recommended);
        setRecommendedLoading(false);
      })
      .catch(error => {
        console.log("error", error.message);
      });
  }, []);
  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  const handleClickShowDetails = data => {
    setDetails(data);
    setShowDetails(true);
  };
  const getAirlineByCode = async code => {
    const result = await getAirline({ airlineCodes: code });
    const data = await result.data;
    if (data?.airline) {
      return `${result.data?.airline[0]?.businessName}`;
    } else {
      return "NA";
    }
  };
  const getRoute = segments => {
    let route = "";
    segments.map((segment, i) => {
      if (segments.length === 1) {
        route = `${segment.departure.iataCode}-${segment.arrival.iataCode}`;
      } else if (i !== segments.length - 1) {
        route += segment.departure.iataCode + "-";
      } else {
        route += `${segment.departure.iataCode}-${segment.arrival.iataCode}`;
      }
    });
    return route;
  };
  const handleClickBookNow = () => {
    if (isAuthorized) {
      bookFlight({ details, userId: user._id })
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            setShowDetails(false);
            setDetails(null);
            setResponse({
              success: {
                show: true,
                message: res.data.message
              },
              error: {
                show: false,
                message: ""
              }
            });
          }, 500);
        })
        .catch(error => {
          setResponse({
            success: {
              show: false,
              message: ""
            },
            error: {
              show: true,
              message: "Could not book Flight at the moment"
            }
          });
        });
    } else {
      setShowDetails(false);
      setShowLogin(true);
    }
  };
  const handleLogin = () => {
    setShowLogin(false);
    setShowDetails(true);
  };
  const closeAlert = () => {
    setResponse({
      success: {
        show: false,
        message: ""
      },
      error: {
        show: false,
        message: ""
      }
    });
  };
  return (
    <UserLayout nobg={true}>
      <div
        style={{
          marginTop: "-20px",
          backgroundImage: "url(/media/bg/main.jpg)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center" style={{ height: 310 }}>
            <Formik
              initialValues={{
                origin: "",
                destination: "",
                oneWay: false,
                depart: "",
                return: "",
                adults: "",
                child: ""
              }}
              validate={values => {
                const errors = {};

                if (!values.origin) {
                  errors.origin = "Required!";
                }
                if (!values.destination) {
                  errors.destination = "Required!";
                }
                if (!values.depart) {
                  errors.depart = "Required!";
                }
                if (!values.oneWay && !values.return) {
                  errors.return = "Required!";
                }
                if (!values.adults && !values.child) {
                  errors.adults = "Required!";
                  errors.child = "Required!";
                }
                if (!values.adults && values.child) {
                  errors.child = "Adults are Required!";
                }
                return errors;
              }}
              onSubmit={(values, { setStatus, setSubmitting }) => {
                console.log("values", values);
                enableLoading();
                const getFlight = values.oneWay
                  ? getOneWayFlights
                  : getTwoWayFlights;

                getFlight(values)
                  .then(res => {
                    setSearched(true);
                    setFlights(res.data.flights);
                    disableLoading();
                  })
                  .catch(e => {
                    console.log("error", e.message);
                    disableLoading();
                    setSubmitting(false);
                  });
              }}
            >
              {({ values, errors, handleSubmit, setFieldValue }) => (
                <Form
                  className="kt-form row w-100 align-items-center"
                  style={{
                    background: "#fff",
                    padding: "10px 5px 30px 10px",
                    borderRadius: "4px"
                  }}
                  onSubmit={handleSubmit}
                >
                  <div className="col-12 mb-3">
                    <Chip
                      label="One Way"
                      onClick={() => setFieldValue("oneWay", !values.oneWay)}
                      onDelete={() => setFieldValue("oneWay", false)}
                      deleteIcon={values.oneWay ? <Done /> : <CloseOutlined />}
                      variant={values.oneWay ? "default" : "outlined"}
                      size="small"
                      style={{ marginRight: 5 }}
                      color="secondary"
                    />
                    <Chip
                      label="Two Way"
                      onClick={() => setFieldValue("oneWay", !values.oneWay)}
                      onDelete={() => setFieldValue("oneWay", true)}
                      deleteIcon={!values.oneWay ? <Done /> : <CloseOutlined />}
                      variant={!values.oneWay ? "default" : "outlined"}
                      color="secondary"
                      size="small"
                    />
                  </div>
                  <div className={values.oneWay ? "col-3" : "col-2"}>
                    <div>From</div>
                    <InputAirports field={"origin"} />
                    {formErrorMessage(errors.origin)}
                  </div>
                  <div className={values.oneWay ? "col-3" : "col-2"}>
                    <div>To</div>
                    <InputAirports field={"destination"} />
                    {formErrorMessage(errors.destination)}
                  </div>
                  <div className="col-2">
                    <div>Depart</div>

                    <Field
                      as={props => (
                        <input
                          type="text"
                          className="form-control"
                          onFocus={e => (e.currentTarget.type = "date")}
                          onBlur={e => (e.currentTarget.type = "text")}
                          {...props}
                        />
                      )}
                      placeholder="Depart Date"
                      name="depart"
                      min={moment(new Date()).format("YYYY-MM-DD")}
                    />
                    {formErrorMessage(errors.depart)}
                  </div>
                  {!values.oneWay && (
                    <div className="col-2">
                      <div>Return</div>
                      <Field
                        as={props => (
                          <input
                            type="text"
                            className="form-control"
                            onFocus={e => (e.currentTarget.type = "date")}
                            onBlur={e => (e.currentTarget.type = "text")}
                            {...props}
                          />
                        )}
                        placeholder="Depart Date"
                        name="return"
                        min={moment(values.depart || new Date()).format(
                          "YYYY-MM-DD"
                        )}
                      />
                      {formErrorMessage(errors.return)}
                    </div>
                  )}

                  <div className="col-2">
                    <div>Adults</div>
                    <Field className="form-control" name="adults" as="select">
                      <option value="">Select</option>
                      {[...Array(9).keys()].map(v => (
                        <option
                          value={v + 1}
                          disabled={
                            v +
                              1 +
                              parseInt(values.adults || 0) +
                              parseInt(values.child || 0) >
                            9
                          }
                        >
                          {v + 1}
                        </option>
                      ))}
                    </Field>
                    {formErrorMessage(errors.adults)}
                  </div>
                  <div className="col-2">
                    <div>Child</div>
                    <Field className="form-control" name="child" as="select">
                      <option value="">Select</option>
                      {[...Array(9).keys()].map(v => (
                        <option
                          value={v + 1}
                          disabled={
                            v +
                              1 +
                              parseInt(values.adults || 0) +
                              parseInt(values.child || 0) >
                            9
                          }
                        >
                          {v + 1}
                        </option>
                      ))}
                    </Field>
                    {formErrorMessage(errors.child)}
                  </div>

                  <div className="col-12 text-right">
                    <button
                      className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                        {
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                        }
                      )}`}
                      style={loadingButtonStyle}
                      type={"submit"}
                    >
                      <i className="fa fa-search" /> Find Offers
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div
            className="w-100"
            style={{
              margin: "0 -10px"
            }}
          >
            <AlertSuccess
              show={response.success.show}
              message={response.success.message}
              handleClose={closeAlert}
            />
            <AlertError
              show={response.error.show}
              message={response.error.message}
              handleClose={closeAlert}
            />
          </div>
          {searched && (
            <div
              className="w-100"
              style={{
                background: "#fff",
                padding: "20px",
                margin: "0 -10px",
                borderRadius: "4px"
              }}
            >
              <div className="row">
                <h4 className="mb-3 col-12">Flights</h4>
                {console.log("flights", flights)}
                <div className="col-3 font-weight-bold mb-4">Airline</div>
                <div className="col-3 font-weight-bold mb-4">Departure</div>
                <div className="col-3 font-weight-bold mb-4">Arrival</div>
                <div className="col-3 font-weight-bold mb-4">Duration</div>
              </div>

              {flights.length === 0 ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: 100, fontSize: 20 }}
                >
                  Nothing Found!
                </div>
              ) : (
                flights.map((flight, index) => (
                  <div
                    style={{ border: "1px solid lightgrey", borderRadius: 4 }}
                    className="pl-1 pr-1 mb-2"
                    key={index}
                  >
                    {flight.itineraries.map((itinerary, i) => (
                      <React.Fragment key={i}>
                        <div className="row">
                          <div className="col-3 p-3">
                            <div>{itinerary.segments[0]?.aircraft.code}</div>
                            <div>
                              {itinerary.segments[0]?.carrierCode}-
                              {itinerary.segments[0]?.number}
                            </div>
                          </div>
                          <div className="col-3 p-3">
                            <div>{getRoute(itinerary.segments)}</div>
                            <div>
                              {moment(
                                itinerary.segments[0]?.departure.at
                              ).format("DD-MM-YY hh:mm a")}
                            </div>
                          </div>
                          <div className="col-3 p-3">
                            <div>{}</div>
                            <div>
                              {moment(
                                itinerary.segments[
                                  itinerary.segments.length - 1
                                ]?.arrival.at
                              ).format("DD-MM-YY hh:mm a")}
                            </div>
                          </div>
                          <div className="col-3 p-3">
                            {moment
                              .utc(
                                moment
                                  .duration(itinerary.duration)
                                  .asMilliseconds()
                              )
                              .subtract(1, "hour")
                              .format("HH:mm")}
                          </div>
                        </div>
                        <hr />
                      </React.Fragment>
                    ))}
                    <div className="d-flex align-items-center justify-content-end p-3">
                      <div className="mr-3">
                        Total Price: {flight.price.currency}-
                        {flight.price?.total}
                      </div>
                      <div>
                        <button
                          className="btn btn-label btn-sm"
                          onClick={() => handleClickShowDetails(flight)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          <div
            className="w-100 mt-5 mb-5"
            style={{
              background: "#fff",
              padding: "20px",
              margin: "0 -10px",
              borderRadius: "4px"
            }}
          >
            <h4 className="mb-3">Recommended Locations</h4>
            {recommendedLoading ? (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: 150 }}
              >
                <Spinner animation={"grow"} />
              </div>
            ) : (
              <div className="row mt-3">
                {recommended.map(rec => (
                  <a
                    className="p-4 align-items-center text-decoration-none col-6 col-sm-3 kt-portlet kt-portlet--border-bottom-brand scale-up"
                    href={`https://www.google.com/maps/search/?api=1&query=${rec.geoCode.latitude},${rec.geoCode.longitude}`}
                    target="_blank"
                    style={{ color: "#646c9a" }}
                    rel="noopener noreferrer"
                    key={rec.iataCode}
                  >
                    <div style={{ fontSize: "32px" }} className="mr-3">
                      <i className="fa fa-location-arrow" />
                    </div>
                    <h5 className="flex-grow-1">
                      {rec.name}({rec.subtype})
                    </h5>
                  </a>
                ))}
              </div>
            )}
          </div>
          <Modal
            show={showDetails}
            onHide={() => setShowDetails(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Flight Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 className="mb-3 col-12">Routes</h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Route Type</th>
                    <th>Airline</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.itineraries.map((itinerary, index) =>
                    itinerary.segments.map((segment, i) => (
                      <tr key={`${index}-itineraries`}>
                        <td>
                          {index === 0 && i === 0
                            ? "Depart"
                            : i === 0
                            ? "Return"
                            : ""}
                        </td>
                        <td>
                          <div>{segment.aircraft.code}</div>
                          <div>
                            {segment.carrierCode}-{segment.number}
                          </div>
                        </td>
                        <td>
                          {moment(segment.departure.at).format(
                            "DD-MM-YY hh:mm a"
                          )}
                        </td>
                        <td>
                          {moment(segment.arrival.at).format(
                            "DD-MM-YY hh:mm a"
                          )}
                        </td>
                        <td>
                          {moment
                            .utc(
                              moment.duration(segment.duration).asMilliseconds()
                            )
                            .subtract(1, "hour")
                            .format("HH:mm")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>

              <h4 className="mb-3 col-12">Travelers Pricing</h4>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Fare Option</th>
                    <th>Cabins</th>
                    <th>Classes</th>
                    <th>Weight</th>
                    <th>Individual Price</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.travelerPricings.map(tPricing => (
                    <tr>
                      <td>{tPricing.travelerType}</td>
                      <td>{tPricing.fareOption}</td>
                      <td>
                        {tPricing.fareDetailsBySegment.map(fDetails => (
                          <div>{fDetails.cabin}</div>
                        ))}
                      </td>
                      <td>
                        {tPricing.fareDetailsBySegment.map(fDetails => (
                          <div>{fDetails.class}</div>
                        ))}
                      </td>
                      <td>
                        {tPricing.fareDetailsBySegment.map(fDetails => (
                          <div>
                            {fDetails.includedCheckedBags?.weight}-
                            {fDetails.includedCheckedBags?.weightUnit}
                          </div>
                        ))}
                      </td>
                      <td>
                        {tPricing.price.currency}-{tPricing.price.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <div className="p-3 text-right">
                <div>Total Price</div>
                {details?.price.currency}-{details?.price?.total}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDetails(false)}>
                Close
              </Button>
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                  }
                )}`}
                style={loadingButtonStyle}
                onClick={handleClickBookNow}
              >
                Book Now
              </button>
            </Modal.Footer>
          </Modal>
          <Modal show={showLogin} onHide={() => setShowLogin(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Login isModal={true} handleLogin={handleLogin} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </UserLayout>
  );
};

export default connect(null, lawyer.actions)(Home);
