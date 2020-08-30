import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import moment from "moment";
import clsx from "clsx";
import Login from "../../pages/auth/Login";
import { bookFlight, cancelFlight } from "../../crud/flights.crud";
import { shallowEqual, useSelector } from "react-redux";

const FlightDetails = ({
  details,
  showDetails,
  setShowDetails,
  setDetails,
  setResponse,
  readOnly,
  bookingStatus,
  updateTipsCancel
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
      bookFlight({ details, userId: user._id })
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
  const handleClickCancel = () => {
    if (isAuthorized) {
      enableLoading();
      cancelFlight({ flightId: bookingStatus._id })
        .then(res => {
          console.log("res", res);
          setTimeout(() => {
            disableLoading();
            setShowDetails(false);
            setDetails(null);
            updateTipsCancel(bookingStatus._id);
            setResponse({
              success: {
                show: true,
                message: "Booking Canceled Successfully"
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
  return (
    <React.Fragment>
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
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
          {!readOnly ? (
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
          ) : (
            <button
              className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                {
                  "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loadingBooking
                }
              )}`}
              disabled={bookingStatus?.bookingStatus !== "Pending"}
              style={loadingButtonStyle}
              onClick={handleClickCancel}
            >
              Cancel Booking
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
