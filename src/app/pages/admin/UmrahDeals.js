import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Portlet,
  PortletBody,
  PortletHeader,
  PortletHeaderToolbar
} from "../../partials/content/Portlet";
import { getUmrahDeals, getWorldTour } from "../../crud/flights.crud";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
const UmrahDeals = () => {
  const [filters, setFilters] = useState({
    country: "",
    booking: false
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
    getUmrahDeals()
      .then(res => {
        console.log("res", res);
        setDeals(res.data.deals);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);
  useEffect(() => {
    setCurrentDeal(
      filters.booking
        ? deals?.filter(
            d =>
              d.details.packages.bookedBy.filter(bb => bb === user._id).length >
              0
          )
        : deals
    );
  }, [deals, filters]);

  return (
    <div className="pb-5">
      <Portlet className="kt-portlet--height-fluid-half kt-portlet--border-bottom-brand">
        <PortletHeader
          title="Umrah Deals"
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
                    {filters.booking ? "My Booking" : "All Packages"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, booking: false })}
                    >
                      All Packages
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => setFilters({ ...filters, booking: true })}
                    >
                      My Bookings
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}

              {user?.role === "2" && (
                <Link to="/umrah-deals/create" className="btn btn-label btn-sm">
                  <i className="fa fa-plus" /> Add New Package
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
          ) : currentDeal.length === 0 ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: 100, fontSize: 20 }}
            >
              No Package Found!
            </div>
          ) : (
            <div className="row">
              {currentDeal?.map(deal => (
                <Link
                  to={`/umrah-deals/details?deal=${deal._id}`}
                  className="col-12 col-sm-6 col-md-4 scale-up"
                  style={{ color: "inherit" }}
                >
                  <div style={{ border: "1px solid #f7f7f7" }}>
                    <div style={{ height: 200 }}>
                      <img
                        src={`images/${deal.details.packages.image}`}
                        alt={`${deal.details.packages.title} Tour`}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <h4 className="p-3 text-center world-tour__title">
                      {deal.details.packages.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </PortletBody>
      </Portlet>
    </div>
  );
};

export default UmrahDeals;
