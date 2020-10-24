import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { useSelector } from "react-redux";
import { getUserTrips, getAllTrips } from "../../crud/flights.crud";
import FlightList from "../../Components/flights/FlightList";
import { Spinner } from "react-bootstrap";
import AlertSuccess from "../../Components/alerts/AlertSuccess";
import AlertError from "../../Components/alerts/AlertError";
import PaginationComponent from "../../Components/PaginationComponent";
import Filters from "../../Components/Filters";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
const localizer = momentLocalizer(moment);
const MyTrips = ({ userType = "admin" }) => {
  const { user } = useSelector(({ auth: { user } }) => ({
    user
  }));
  const [trips, setTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const [view, setView] = useState("details");
  const [filters, setFilters] = useState({
    bookingStatus: ""
  });
  const [dropdown, setDropdown] = useState(false);
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
  const [eventsList, setEventsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setTripsLoading(true);
    const getTipsFunction = userType === "user" ? getUserTrips : getAllTrips;
    getTipsFunction(user._id)
      .then(result => {
        setTimeout(() => {
          setTrips(result.data.trips);
          setFilteredData(result.data.trips);
          setTripsLoading(false);
          const tipss = result.data.trips
            .filter(
              trip =>
                trip.bookingStatus !== "Pending" &&
                trip.bookingStatus !== "Canceled"
            )
            .map(trip => trip.details);
          let events = [];
          tipss.map(trip => {
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
  }, [user._id, userType]);
  const handleChangeFilters = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  useEffect(() => {
    setFilteredData(
      trips.filter(trip => trip.bookingStatus.includes(filters.bookingStatus))
    );
    setPageNo(1);
  }, [filters, trips]);
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
  const updateTipsCancel = (tripId, status) => {
    const newTrips = trips.map(trip => {
      if (trip._id === tripId) {
        return {
          ...trip,
          bookingStatus: status
        };
      } else {
        return trip;
      }
    });
    setTrips(newTrips);
    setFilteredData(newTrips);
  };
  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };

  const handlePerPageChange = newPerPage => {
    setPerPage(newPerPage);
  };
  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Trips"
          toolbar={
            <PortletHeaderToolbar>
              {userType === "user" && (
                <Dropdown
                  isOpen={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  <DropdownToggle
                    className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                    caret
                  >
                    {view} view
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setView("details")}>
                      Details View
                    </DropdownItem>

                    <DropdownItem onClick={() => setView("calender")}>
                      Calender View
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}

              <Filters
                filters={filters}
                handleChangeFilters={handleChangeFilters}
              />
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
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
          {tripsLoading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : view === "details" ? (
            <React.Fragment>
              <div className="row">
                <div className="col-3 font-weight-bold mb-4">Airline</div>
                <div className="col-3 font-weight-bold mb-4">Departure</div>
                <div className="col-3 font-weight-bold mb-4">Arrival</div>
                <div className="col-3 font-weight-bold mb-4">Duration</div>
              </div>
              <FlightList
                flights={filteredData
                  .slice(
                    (pageNo - 1) * perPage,
                    (pageNo - 1) * perPage + perPage <= filteredData.length
                      ? (pageNo - 1) * perPage + perPage
                      : filteredData.length
                  )
                  .map(trip => trip)}
                readOnly={true}
                bookingStatuses={filteredData.map(trip => ({
                  bookingStatus: trip.bookingStatus,
                  _id: trip._id
                }))}
                setResponse={setResponse}
                updateTipsCancel={updateTipsCancel}
                userType={userType}
              />
            </React.Fragment>
          ) : (
            <Calendar
              localizer={localizer}
              events={eventsList}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          )}
          {view === "details" && (
            <PaginationComponent
              pageNo={pageNo}
              perPage={perPage}
              handlePageChange={handlePageChange}
              handlePerPageChange={handlePerPageChange}
              total={filteredData.length}
            />
          )}
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default MyTrips;
