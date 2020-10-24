import React, { useEffect, useState } from "react";
import UserLayout from "../Components/layout/user/UserLayout";
import { Field, Form, Formik } from "formik";
import InputAirports from "../Components/input/InputAirport";
import { Chip } from "@material-ui/core";
import { Done, CloseOutlined } from "@material-ui/icons";
import moment from "moment";
import { formErrorMessage } from "./errors/FormErrorMessage";
import clsx from "clsx";
import {
  getOneWayFlights,
  getRecommended,
  getTwoWayFlights
} from "../crud/flights.crud";
import { Spinner } from "react-bootstrap";
import AlertSuccess from "../Components/alerts/AlertSuccess";
import AlertError from "../Components/alerts/AlertError";
import FlightList from "../Components/flights/FlightList";
const Home = () => {
  const [searched, setSearched] = useState(false);

  const [flights, setFlights] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const [recommendedLoading, setRecommendedLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1.5rem"
  });

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
    setLoadingButtonStyle({ paddingRight: "1.5rem" });
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
                    setFlights(res.data.flights || []);
                    disableLoading();
                  })
                  .catch(e => {
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
              margin: "0 -10px",
              background: "#fff",
              borderRadius: 6
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
                <div className="col-3 font-weight-bold mb-4">Airline</div>
                <div className="col-3 font-weight-bold mb-4">Departure</div>
                <div className="col-3 font-weight-bold mb-4">Arrival</div>
                <div className="col-3 font-weight-bold mb-4">Duration</div>
              </div>

              <FlightList
                flights={flights.map(f => ({ details: f }))}
                setResponse={setResponse}
              />
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
                {recommended?.map(rec => (
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
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
