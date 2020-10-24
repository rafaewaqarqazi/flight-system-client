import React, { useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import moment from "moment";
import clsx from "clsx";
import Login from "../../pages/auth/Login";
import {
  bookFlight,
  changeFlightStatus,
  checkoutForPayment
} from "../../crud/flights.crud";
import { shallowEqual, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
const FlightDetails = ({
  flight,
  showDetails,
  setShowDetails,
  setDetails,
  setResponse,
  readOnly,
  bookingStatus,
  updateTipsCancel,
  userType
}) => {
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthorized, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
      user: auth.user
    }),
    shallowEqual
  );
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "1.5rem"
  });
  const enableLoading = () => {
    setLoadingBooking(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoadingBooking(false);
    setLoadingButtonStyle({ paddingRight: "1.5rem" });
  };
  const handleClickBookNow = () => {
    if (isAuthorized) {
      enableLoading();
      bookFlight({ details: flight.details, userId: user._id })
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
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
          }, 1000);
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
  const handleClickChangeStatus = status => {
    if (isAuthorized) {
      enableLoading();
      changeFlightStatus({ flightId: bookingStatus._id, status })
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            updateTipsCancel(bookingStatus._id, status);
            setResponse({
              success: {
                show: true,
                message: `Booking ${status} Successfully`
              },
              error: {
                show: false,
                message: ""
              }
            });
          }, 1000);
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
  const makePayment = token => {
    console.log("token", token);
    checkoutForPayment({
      token,
      amount: parseInt(flight.details?.price?.total, 10) * 100,
      flightId: bookingStatus._id
    })
      .then(result => {
        setShowDetails(false);
        setDetails(null);
        if (!result.data.error) {
          updateTipsCancel(bookingStatus._id, "Confirmed");
          setResponse({
            success: {
              show: true,
              message: `Booking Confirmed Successfully`
            },
            error: {
              show: false,
              message: ""
            }
          });
        } else {
          setResponse({
            success: {
              show: false,
              message: ""
            },
            error: {
              show: true,
              message: result.data.message
            }
          });
        }
      })
      .catch(error => {
        setShowDetails(false);
        setDetails(null);
        setResponse({
          success: {
            show: false,
            message: ""
          },
          error: {
            show: true,
            message: "Could not make payment at the moment"
          }
        });
      });
  };
  console.log(flight);
  return (
    <React.Fragment>
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Flight Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user && user.role !== "2" && !user.passportNo && (
            <Alert show={true} onHide={() => {}} variant="warning">
              Your Passport Number is missing Please complete your profile by
              <Alert.Link>
                <Link to="/account"> clicking here</Link>
              </Alert.Link>
            </Alert>
          )}
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
              {flight?.details?.itineraries.map((itinerary, index) =>
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
                      {moment(segment.departure.at).format("DD-MM-YY hh:mm a")}
                    </td>
                    <td>
                      {moment(segment.arrival.at).format("DD-MM-YY hh:mm a")}
                    </td>
                    <td>
                      {moment
                        .utc(moment.duration(segment.duration).asMilliseconds())
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
              {flight?.details?.travelerPricings.map(tPricing => (
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
          {user && user.role === "2" && (
            <>
              <h4 className="mb-3 col-12">Booked By</h4>
              <div className="row mx-2">
                <div className="form-group col-6">
                  <div className="form-label">First Name</div>
                  <h5>{flight?.bookedBy?.firstName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Last Name</div>
                  <h5>{flight?.bookedBy?.lastName}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Email</div>
                  <h5>{flight?.bookedBy?.email || "Not Provided"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Mobile No</div>
                  <h5>{flight?.bookedBy?.mobileNo || "Not Provided"}</h5>
                </div>
                <div className="form-group col-6">
                  <div className="form-label">Passport Number</div>
                  <h5>{flight?.bookedBy?.passportNo || "Not Provided"}</h5>
                </div>
              </div>
            </>
          )}

          <div className="p-3 text-right">
            <div>Total Price</div>
            {flight?.details?.price.currency}-{flight?.details?.price?.total}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
          {(userType === "user" || !isAuthorized || isAuthorized) &&
          userType !== "admin" ? (
            !readOnly ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                  }
                )}`}
                style={loadingButtonStyle}
                disabled={user && !user.passportNo}
                onClick={handleClickBookNow}
              >
                Book Now
              </button>
            ) : bookingStatus?.bookingStatus === "Pending" ? (
              <button
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                  }
                )}`}
                disabled={bookingStatus?.bookingStatus !== "Pending"}
                style={loadingButtonStyle}
                onClick={() => handleClickChangeStatus("Canceled")}
              >
                Cancel Booking
              </button>
            ) : (
              <StripeCheckout
                token={makePayment}
                stripeKey={
                  "pk_test_51HLtFDCzlUjqqV4cLqsB8OvMpfcaVDzIhl9HJAzf2trhhw3wEdQrIjR26zvooiOdLS1pqsxdW6xpbped5ObJUSIf0069JxvS7k"
                }
                name="PaymentForFlight"
                amount={parseInt(flight?.details?.price?.total, 10) * 100}
                currency="PKR"
              >
                <button
                  className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                    {
                      "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                    }
                  )}`}
                  disabled={bookingStatus?.bookingStatus !== "Approved"}
                  style={loadingButtonStyle}
                  // onClick={() => handleClickChangeStatus("Canceled")}
                >
                  Confirm To Checkout
                </button>
              </StripeCheckout>
            )
          ) : (
            <button
              className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                {
                  "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                }
              )}`}
              disabled={bookingStatus?.bookingStatus !== "Pending"}
              style={loadingButtonStyle}
              onClick={() => handleClickChangeStatus("Approved")}
            >
              Approve Booking
            </button>
          )}
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
    </React.Fragment>
  );
};

export default FlightDetails;
