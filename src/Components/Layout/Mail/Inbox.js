import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { mailSliceAction } from "../../../Store/Mail";

const Inbox = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const Allinboxmails = useSelector((state) => state.Mail.inboxMails);
  const LoginUserPlainEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");
  const [msg, setMsg] = useState(
    <div className="text-center mt-3 ">
      <h3>Inbox Data Not Available!! </h3>
    </div>
  );

  useEffect(() => {
    if (LoginUserPlainEmail) {
      fetch(
        `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/inbox.json`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              dispatch(mailSliceAction.online()); //false
              if (data) {
                const result = Object.keys(data).map((key) => [
                  { id: key.toString(), values: data[key] },
                ]);
                setMsg();
                dispatch(mailSliceAction.AllinboxMails(result));

                const readData = result.filter(
                  (data) => data[0].values.read === false
                );
                dispatch(mailSliceAction.ReadData(readData));
              } else {
                dispatch(mailSliceAction.ReadData([]));
                dispatch(mailSliceAction.AllinboxMails([]));
              }
            });
          }
        })
        .catch((error) => {
          dispatch(mailSliceAction.offline());
        });
    }
  });

  return (
    <>
      <div className="row ">
        <div className="col-md-6 h5 d-flex  ">Mail</div>

        <div className="col-md-6 search-form">
          <form className="text-right">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-sm"
                placeholder="Search"
              />
            </div>
          </form>
        </div>
        <div className="col-md-12 tab-content mt-3">
          <div className="tab-content" id="nav-tabContent">
            <div
              classname="tab-pane fade show active table-responsive mt-3"
              id="nav-home"
              aria-labelledby="nav-home-tab"
            >
              <table className="table table-hover table-mail">
                {!Allinboxmails && msg}
                {Allinboxmails.map((inboxMails) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="table-inbox-checkbox">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />
                            </label>
                          </div>
                        </td>
                        <td key={inboxMails[0].id}>
                          <Link className="link">
                            <span className="badge badge-pill text-white font-medium badge-info ">
                              {inboxMails[0].values.read && "NEW"}
                            </span>
                          </Link>
                        </td>

                        <td className="name ">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`${inboxMails[0].id}`}
                            state={inboxMails[0].values}
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
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
