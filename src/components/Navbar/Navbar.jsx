import React, { useState } from "react";
import "./Navbar.css";
import navbarbrand from "../../assets/pictures/Navbar/MilanNavBrand.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Button from "../Button/GlobalButton/Button";
import ClickAwayListener from "../../utils/ClickAwayListener";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const navigateToProfile = () => {
    if (Cookies.get("isLoggedIn")) {
      navigate(`/${Cookies.get("usertype")}/${Cookies.get("username")}`);
    }
  };

  return (
    <>
      <ClickAwayListener onClickAway={() => setIsNavbarOpen(false)}>
        <nav className="navbar navbar-expand-lg navbar-light sticky-top navbar_main ">
          {window.location.href.includes("beta") && (
            <button className="navbar_betabtn">Beta</button>
          )}
          <div className="container">
           
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => toggleNavbar()}
            >
              {isNavbarOpen ? <IoMdClose /> : <FaBars />}
            </button>

            <div
              className={`collapse navbar-collapse ${
                isNavbarOpen ? "show" : ""
              }`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item home">
                  <Link
                    to={"/"}
                    onClick={() => setIsNavbarOpen(false)}
                    data-cy="home"
                  >
                    Home
                  </Link>
                  <div
                    className={
                      "" + (location.pathname === "/" ? "active-link" : "")
                    }
                  ></div>
                </li>

                <li className="nav-item home">
                  <Link to={"/clubs"} onClick={() => setIsNavbarOpen(false)}>
                    Clubs
                  </Link>
                  <div
                    className={
                      "" + (location.pathname === "/clubs" ? "active-link" : "")
                    }
                  ></div>
                </li>

                <li className="nav-item home">
                  <Link to="/events" onClick={() => setIsNavbarOpen(false)}>
                    Events
                  </Link>
                  <div
                    className={
                      "" +
                      (location.pathname === "/events" ? "active-link" : "")
                    }
                  ></div>
                </li>

                <li className="nav-item home">
                  <Link to="/shop" onClick={() => setIsNavbarOpen(false)}>
                    Shop
                  </Link>
                  <div
                    className={
                      "" + (location.pathname === "/shop" ? "active-link" : "")
                    }
                  ></div>
                </li>
              </ul>
              <div className="nav-buttons">
                {Cookies.get("OAuthLoginInitiated") ||
                Cookies.get("isLoggedIn") ||
                Cookies.get("club") ? (
                  <img
                    onClick={() => {
                      navigateToProfile();
                    }}
                    src="https://images.ctfassets.net/lzny33ho1g45/RdyJrgaCvIKpSB5EUmwNq/319552e88aac20cb8bdffbe307cc9d92/reddit-app-tips-00-hero.png"
                    alt="user profile"
                    className="nav_user_img"
                  />
                ) : (
                  <>
                    <Button
                      variant="outline"
                      to="/auth/login"
                      fontweight="bold"
                    >
                      Sign in
                    </Button>
                    <Button to="/auth/signup" fontweight="bold" variant="solid">
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </ClickAwayListener>
    </>
  );
};

export default Navbar;
