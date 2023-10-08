import React, { useEffect, useState } from "react";
import A from "../images/logo-light.png";
import B from "../images/logo-dark.png";
import axios from "axios";

const Header = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [user_id, setUserId] = useState(null);

  useEffect(() => {
    const tk = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user_id");
    setUserId(user);

    setToken(tk);
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .post(
          `${process.env.REACT_APP_Base_url}/users/user_details`,
          {
            user_id: user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);

          setUserData(res.data.info);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, user_id]);

  return (
    <div>
      <header id="topnav" className="defaultscroll scroll-active">
        {/* Tagline STart */}
        <div className="tagline">
          <div className="container">
            <div className="float-left">
              <div className="phone">
                <a href="tel:+233 501592984" style={{ color: "#fff" }}>
                  <i className="mdi mdi-phone-classic" /> +233 501000000
                </a>
              </div>
              <div className="email">
                <a href="mailto:customerservices@jobya.com">
                  <i className="mdi mdi-email" /> customerservices@jobya.com
                </a>
              </div>
            </div>
            <div>
              {token === null ? (
                <>
                  <div className="float-right">
                    <ul
                      className="topbar-list list-unstyled d-flex"
                      style={{ margin: "11px 0px" }}>
                      <li className="list-inline-item">
                        <a
                          href="/login"
                          className="d-flex justify-content-center">
                          <span className="mx-2">
                            <i className="mdi mdi-account" />
                          </span>
                          login
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {userData && (
                    <div className="float-right">
                      <ul
                        className="topbar-list list-unstyled d-flex"
                        style={{ margin: "11px 0px" }}>
                        <li className="list-inline-item">
                          <a href="/" className="d-flex justify-content-center">
                            <div className="mx-2">
                              <span className="rounded-circle bg-light text-dark p-2">
                                {userData?.first_name[0]}{" "}
                                {userData?.last_name[0]}
                              </span>
                            </div>
                            {userData?.first_name} {userData?.last_name}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/* Tagline End */}

        {/* Menu Start */}
        <div className="container">
          {/* Logo container*/}
          <div>
            <a href="/" className="logo">
              <img src={A} alt=".." className="logo-light" height={18} />
              <img src={B} alt=".." className="logo-dark" height={18} />
            </a>
          </div>
          <div className="buy-button">
            <a href="/post-job" className="btn btn-primary">
              <i className="mdi mdi-cloud-upload" /> want to post ?
            </a>
          </div>
          {/* End Logo container*/}
          <div className="menu-extras">
            <div className="menu-item">
              {/* Mobile menu toggle*/}
              <a href="#/" className="navbar-toggle">
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </a>
              {/* End mobile menu toggle*/}
            </div>
          </div>
          <div id="navigation">
            {/* Navigation Menu*/}
            <ul className="navigation-menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li className="has-submenu">
                <a href="/jobs">Jobs</a>
              </li>
              <li className="has-submenu">
                <a href="/jobs-portal">My Job Portal</a>
              </li>
            </ul>
            {/*end navigation menu*/}
          </div>
          {/*end navigation*/}
        </div>
        {/*end container*/}
        {/*end end*/}
      </header>
    </div>
  );
};

export default Header;
