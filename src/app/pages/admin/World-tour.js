import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { getWorldTour } from "../../crud/flights.crud";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Spinner } from "react-bootstrap";
const WorldTour = () => {
  const [filters, setFilters] = useState({
    country: ""
  });
  const [dropdown, setDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deals, setDeals] = useState([]);
  const [currentDeal, setCurrentDeal] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setLoading(true);
    getWorldTour()
      .then(result => {
        console.log("result", result);
        setDeals(result.data.deals);
        setCountries(result.data.deals.map(deal => deal.details.country));
        console.log("result", result.data.deals[0]?.details?.packages);
        setCurrentDeal(result.data.deals[0]?.details?.packages);
        setFilters({ country: result.data.deals[0]?.details?.country });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);
  console.log("currentDeal", currentDeal);
  const handleChangeFilters = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  // useEffect(() => {
  //   setFilteredData(
  //     trips.filter(trip => trip.bookingStatus.includes(filters.bookingStatus))
  //   );
  // }, [filters, trips]);

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="World Tour"
          toolbar={
            <PortletHeaderToolbar>
              <Dropdown isOpen={dropdown} toggle={() => setDropdown(!dropdown)}>
                <DropdownToggle
                  className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                  caret
                >
                  {filters.country !== "" ? filters.country : "Select Country"}
                </DropdownToggle>
                <DropdownMenu>
                  {countries.map(country => (
                    <DropdownItem
                      onClick={() => setFilters({ country })}
                      key={country}
                    >
                      {country}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Link to="/world-tour/create" className="btn btn-label btn-sm">
                <i className="fa fa-plus" /> Add New Tour
              </Link>
            </PortletHeaderToolbar>
          }
        />
        <PortletBody>
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: 150 }}
            >
              <Spinner animation={"grow"} />
            </div>
          ) : deals.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 100, fontSize: 20 }}
            >
              No deal Found!
            </div>
          ) : (
            <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
              <PortletHeader title={`${filters.country} Tour`} />
              <PortletBody>
                <div className="row">
                  {currentDeal?.map(pack => (
                    <div
                      className="col-12 col-sm-6 col-md-4 scale-up "
                      style={{ cursor: "pointer" }}
                    >
                      <div style={{ border: "1px solid #f7f7f7" }}>
                        <div style={{ height: 200 }}>
                          <img
                            src={`images/${pack.image}`}
                            alt={`${filters.country} Tour`}
                            width="100%"
                            height="100%"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <h4 className="p-3 text-center world-tour__title">
                          {pack.title} Tour Package
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </PortletBody>
            </Portlet>
          )}
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default WorldTour;
