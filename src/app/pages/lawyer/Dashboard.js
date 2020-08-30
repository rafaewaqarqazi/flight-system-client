import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Portlet,
  PortletBody,
  PortletHeader
} from "../../partials/content/Portlet";
import { getAllTrips } from "../../crud/flights.crud";
const localizer = momentLocalizer(moment);
export default function Dashboard() {
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    getAllTrips()
      .then(result => {
        setTimeout(() => {
          const trips = result.data.trips
            .filter(
              trip =>
                trip.bookingStatus !== "Pending" &&
                trip.bookingStatus !== "Canceled"
            )
            .map(trip => trip.details);
          let events = [];
          trips.map(trip => {
            trip.itineraries.map((intinerary, index) => {
              intinerary.segments.map(segment => {
                events = [
                  ...events,
                  {
                    title: `${
                      index === 0 ? "Going" : "Return"
                    }-Departure From ${segment.departure.iataCode}`,
                    start: new Date(segment?.departure?.at),
                    end: new Date(segment?.departure?.at)
                  },
                  {
                    title: `${index === 0 ? "Going" : "Return"}-Arrival at ${
                      segment.arrival.iataCode
                    }`,
                    start: new Date(segment?.arrival?.at),
                    end: new Date(segment?.arrival?.at)
                  }
                ];
              });
            });
          });
          setEventsList(events);
        }, 1000);
      })
      .catch(error => console.log("error", error.message));
  }, []);

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader title="All Trips" />
        <PortletBody>
          <Calendar
            localizer={localizer}
            events={eventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </PortletBody>
      </Portlet>
    </div>
  );
}
