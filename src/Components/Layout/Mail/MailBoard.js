import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Inbox from "./Inbox";
import OpenInboxMail from "./OpenMail/OpenInboxMail";

const MailBoard = () => {
  const param = useParams();
  const Allinboxmails = useSelector((state) => state.Mail.inboxMails);
  return (
    <div className="container-fluid">
      <div className="row mt-5">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="row">
            {/* BEGIN INBOX MENU */}
            <div className="col-md-3 col-lg-3 col-sm-6">
              <h2 className="grid-title">
                <i className="fa fa-inbox"></i> Inbox
              </h2>

              <Link
                className="btn btn-block bg-dark text-white "
                // data-toggle="modal"
                // data-target="#compose-modal"
                to="composemail"
              >
                <i className="fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE
              </Link>
              <hr className="hr hr-blurry" />
              <div>
                <ul className=" list-unstyled pl-3">
                  <li
                    className="header text-uppercase h5 mb-4"
                    style={{ color: "#777" }}
                  >
                    Folders
                  </li>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Link
                      to="inbox"
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Inbox({Allinboxmails.length})
                    </Link>
                    <Link
                      to="sent"
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Sent
                    </Link>
                    <Link
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Unread({Allinboxmails.length})
                    </Link>
                    <Link
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    ></Link>
                  </div>
                </ul>
              </div>
            </div>
            <div className="col-md-9 col-lg-9 col-sm-9 mt-5">
              {param.mailId ? <OpenInboxMail /> : <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailBoard;
