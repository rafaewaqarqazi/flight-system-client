import React from "react";
import { connect } from "react-redux";

const AccountAside = ({ selected, setSelected, user }) => {
  return (
    <div className="kt-grid__item kt-app__toggle kt-app__aside">
      <div className="kt-portlet ">
        <div className="kt-portlet__body kt-portlet__body--fit-y">
          <div className="kt-widget kt-widget--user-profile-1">
            <div className="kt-widget__head">
              <div className="kt-widget__media">
                <img src={`${user.profileImage && user.profileImage.filename ? `/images/${user.profileImage.filename}` : '/media/users/100_13.jpg'}`} alt="profile" />
              </div>
              <div className="kt-widget__content">
                <div className="kt-widget__section">
                  <span className="kt-widget__username">
                    {`${user.firstName} ${user.lastName}`}
                  </span>
                </div>
              </div>
            </div>
            <div className="kt-widget__body">
              <div className="kt-widget__content">
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Email:</span>
                  <span className="kt-widget__data">{user.email}</span>
                </div>
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Phone:</span>
                  <span className="kt-widget__data">{user.mobileNo}</span>
                </div>
                <div className="kt-widget__info">
                  <span className="kt-widget__label">Location:</span>
                  <span className="kt-widget__data">{user.address}</span>
                </div>
              </div>
              <div className="kt-widget__items">
                <span
                  onClick={() => setSelected(0)}
                  className={`kt-widget__item ${selected === 0 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <polygon points="0 0 24 0 24 24 0 24" />
                          <path
                            d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                            fill="#000000"
                            fillRule="nonzero"
                            opacity="0.3"
                          />
                          <path
                            d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                            fill="#000000"
                            fillRule="nonzero"
                          />
                        </g>
                      </svg>{" "}
                    </span>
                    <span className="kt-widget__desc">
                      Personal Information
                    </span>
                  </span>
                </span>
                <span
                  onClick={() => setSelected(1)}
                  className={`kt-widget__item ${selected === 1 &&
                    "kt-widget__item--active"}`}
                >
                  <span className="kt-widget__section">
                    <span className="kt-widget__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        className="kt-svg-icon"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle
                            fill="#000000"
                            opacity="0.3"
                            cx="12"
                            cy="12"
                            r="10"
                          />
                          <path
                            d="M14.5,11 C15.0522847,11 15.5,11.4477153 15.5,12 L15.5,15 C15.5,15.5522847 15.0522847,16 14.5,16 L9.5,16 C8.94771525,16 8.5,15.5522847 8.5,15 L8.5,12 C8.5,11.4477153 8.94771525,11 9.5,11 L9.5,10.5 C9.5,9.11928813 10.6192881,8 12,8 C13.3807119,8 14.5,9.11928813 14.5,10.5 L14.5,11 Z M12,9 C11.1715729,9 10.5,9.67157288 10.5,10.5 L10.5,11 L13.5,11 L13.5,10.5 C13.5,9.67157288 12.8284271,9 12,9 Z"
                            fill="#000000"
                          />
                        </g>
                      </svg>{" "}
                    </span>
                    <span className="kt-widget__desc">Change Password</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user
});
export default connect(mapStateToProps)(AccountAside);
