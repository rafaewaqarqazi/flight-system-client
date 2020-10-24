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
import { shallowEqual, useSelector } from "react-redux";
const WorldTour = () => {
  const [filters, setFilters] = useState({
    country: "",
    myTours: false
  });
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user
    }),
    shallowEqual
  );
  const [dropdown, setDropdown] = useState(false);
  const [dropdownMyTours, setDropdownMyTours] = useState(false);
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
        // setCurrentDeal(result.data.deals[0]?.details?.packages);
        setFilters({ country: result.data.deals[0]?.details?.country });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);
  useEffect(() => {
    const packages = deals.filter(deal =>
      deal.details?.country.includes(filters.country)
    )[0]?.details?.packages;
    setCurrentDeal(
      filters.myTours
        ? packages.filter(
            p => p.bookedBy.filter(bb => bb === user._id).length > 0
          )
        : packages
    );
  }, [deals, filters]);

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="World Tour"
          toolbar={
            <PortletHeaderToolbar>
              {user?.role === "1" && (
                <Dropdown
                  isOpen={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  <DropdownToggle
                    className="btn-bold btn-sm btn-label-brand border-0 mb-1 mb-sm-0 mr-3 text-capitalize"
                    caret
                  >
                    {filters.myTours ? "My Tours" : "All Tours"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, myTours: false })}
                    >
                      All Tours
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, myTours: true })}
                    >
                      My Tours
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
              <Dropdown
                isOpen={dropdownMyTours}
                toggle={() => setDropdownMyTours(!dropdownMyTours)}
              >
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
              {user?.role === "2" && (
                <Link to="/world-tour/create" className="btn btn-label btn-sm">
                  <i className="fa fa-plus" /> Add New Tour
                </Link>
              )}
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
                  {currentDeal.length === 0 ? (
                    <div
                      className="d-flex justify-content-center align-items-center w-100"
                      style={{ height: 100, fontSize: 20 }}
                    >
                      No Tour Found!
                    </div>
                  ) : (
                    currentDeal?.map(pack => (
                      <Link
                        to={`/world-tour/details?country=${filters.country}&package=${pack._id}`}
                        className="col-12 col-sm-6 col-md-4 scale-up"
                        style={{ color: "inherit" }}
                        key={pack._id}
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
                      </Link>
                    ))
                  )}
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
