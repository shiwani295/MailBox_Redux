import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Header/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../Store/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  const email = localStorage.getItem("email");
  const logoutHandler = () => {
    dispatch(AuthAction.Logout());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark headerNav">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h3 className="text-white">MailBox</h3>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              to={"/dashboard/inbox"}
              className="text-white ml-4"
              style={{ textDecoration: "none" }}
            >
              Mails
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          {!isAuth && (
            <Link
              className="btn btn-outline-dark text-white border-white"
              type="submit"
              to={"/login"}
            >
              Login
            </Link>
          )}
          {isAuth && (
            <li className="nav-item dropdown">
              <i
                className="fa fa-user  text-white mr-5"
                aria-hidden="true"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              ></i>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <p className="ml-3">{email}</p>

                <p
                  className="ml-3"
                  onClick={logoutHandler}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
