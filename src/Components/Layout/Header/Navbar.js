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
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark headerNav">
      <h3 className="text-white">MailBox</h3>
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
          <li className="nav-item"></li>
        </ul>
        <ul className="navbar-nav">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
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
              <button
                className="nav-link btn bg-white ml-3 mr-5"
                href="#"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-user" aria-hidden="true"></i>
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" href="#">
                  {email}
                </Link>

                <Link className="dropdown-item" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
