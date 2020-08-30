import React from "react";
import moment from "moment";

const FlightItem = ({ itinerary }) => {
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
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-3 p-3">
          <div>{itinerary.segments[0]?.aircraft.code}</div>
          <div>
            {itinerary.segments[0]?.carrierCode}-{itinerary.segments[0]?.number}
          </div>
        </div>
        <div className="col-3 p-3">
          <div>{getRoute(itinerary.segments)}</div>
          <div>
            {moment(itinerary.segments[0]?.departure.at).format(
              "DD-MM-YY hh:mm a"
            )}
          </div>
        </div>
        <div className="col-3 p-3">
          <div>{}</div>
          <div>
            {moment(
              itinerary.segments[itinerary.segments.length - 1]?.arrival.at
            ).format("DD-MM-YY hh:mm a")}
          </div>
        </div>
        <div className="col-3 p-3">
          {moment
            .utc(moment.duration(itinerary.duration).asMilliseconds())
            .subtract(1, "hour")
            .format("HH:mm")}
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default FlightItem;
