import React, { useState } from "react";
import FlightItem from "./FlightItem";
import FlightDetails from "./FlightDetails";

const FlightList = ({
  flights,
  setResponse,
  readOnly,
  bookingStatuses,
  updateTipsCancel,
  userType
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const handleClickShowDetails = (data, status) => {
    setDetails(data);
    setBookingStatus(status);
    setShowDetails(true);
  };
  return (
    <React.Fragment>
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
            {flight.details.itineraries.map((itinerary, i) => (
              <FlightItem itinerary={itinerary} key={i} />
            ))}
            <div
              className={`d-flex align-items-center p-3 ${
                bookingStatuses
                  ? "justify-content-between"
                  : "justify-content-end"
              }`}
            >
              {bookingStatuses && (
                <div>
                  Booking Status: {bookingStatuses[index]?.bookingStatus}
                </div>
              )}
              {bookingStatuses && (
                <div>Ticket Number: {bookingStatuses[index]?._id}</div>
              )}
              <div className="d-flex align-items-center">
                <div className="mr-3">
                  Total Price: {flight.details.price.currency}-
                  {flight.details.price?.total}
                </div>
                <div>
                  <button
                    className="btn btn-label btn-sm"
                    onClick={() =>
                      handleClickShowDetails(
                        flight,
                        bookingStatuses ? bookingStatuses[index] : {}
                      )
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <FlightDetails
        flight={details}
        setDetails={setDetails}
        setShowDetails={setShowDetails}
        showDetails={showDetails}
        setResponse={setResponse}
        readOnly={readOnly}
        updateTipsCancel={updateTipsCancel}
        bookingStatus={bookingStatus}
        userType={userType}
      />
    </React.Fragment>
  );
};

export default FlightList;
