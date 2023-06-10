import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "../Mail/Inbox.css";
import useInboxhook from "./CustomHook/InboxHook";
const Inbox = () => {
  const history = useNavigate();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const Allinboxmails = useSelector((state) => state.Mail.inboxMails);
  const LoginUserPlainEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");

  // get inbox hook
  useInboxhook(
    `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/inbox.json`
  );

  //inbox delete
  const InboxDeleteHandler = (id) => {
    const mailId = id[0].id;

    if (LoginUserPlainEmail) {
      fetch(
        `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/inbox/${mailId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            history("/dashboard/inbox");
          });
        } else {
          alert("something went wrong!");
        }
      });
    }
  };
  //search

  return (
    <>
      <div className="row ">
        <div className="col-md-6 h5 d-flex  ">Mail</div>
        <div className="col-md-12 tab-content mt-3">
          <div className="tab-content" id="nav-tabContent">
            <div
              classname="tab-pane fade show active table-responsive mt-3"
              id="nav-home"
              aria-labelledby="nav-home-tab"
            >
              <table className="table table-hover table-mail">
                {Allinboxmails.map((inboxMails) => {
                  return (
                    <>
                      <tbody
                        className={
                          inboxMails[0].values.read === false
                            ? "unread"
                            : "read"
                        }
                      >
                        <tr>
                          <td className="table-inbox-checkbox">
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className="name ">
                            <Link className="link">
                              <span className="badge badge-pill text-white font-medium  ">
                                <span
                                  className={
                                    inboxMails[0].values.read === false
                                      ? "NEW"
                                      : "READ"
                                  }
                                >
                                  {inboxMails[0].values.read === false
                                    ? "NEW"
                                    : "READ"}
                                </span>
                              </span>
                            </Link>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`${inboxMails[0].id}`}
                              state={{
                                subject: inboxMails[0].values.subject,
                                from: inboxMails[0].values.from,
                                msgBody: inboxMails[0].values.msgBody,
                                time: inboxMails[0].values.time,
                              }}
                            >
                              <span className="bg-dark text-white p-1 rounded">
                                From-{inboxMails[0].values.from}
                              </span>
                              &nbsp;
                              <span className="text-dark">
                                {inboxMails[0].values.subject}
                              </span>
                            </Link>
                          </td>
                          <td className="subject ">
                            <Link
                              className="text-dark"
                              style={{ textDecoration: "none" }}
                            >
                              {inboxMails[0].values.msgBody}
                            </Link>
                          </td>
                          <td className="time">
                            {inboxMails[0].values.time.date}
                            <span className="ml-2">
                              {inboxMails[0].values.time.time}
                            </span>
                          </td>
                          <td>
                            <Link
                              className="text-dark"
                              style={{ textDecoration: "none" }}
                              onClick={() => InboxDeleteHandler(inboxMails)}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
