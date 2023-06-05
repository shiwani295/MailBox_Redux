import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mailSliceAction } from "../../../Store/Mail";
const Sent = () => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const AddsentMail = useSelector((state) => state.Mail.sentMails);
  const LoginUserPlainEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");
  const [msg, setMsg] = useState(
    <div className="text-center mt-3 ">
      <h3>Sent Data Not Available!! </h3>
    </div>
  );

  useEffect(() => {
    if (LoginUserPlainEmail) {
      fetch(
        `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/sendBox.json`,
        {
          method: "GET",
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (data) {
              const result = Object.keys(data).map((key) => [
                { id: key.toString(), values: data[key] },
              ]);
              setMsg();
              dispatch(mailSliceAction.AddsentMails(result));
            } else {
              dispatch(mailSliceAction.AddsentMails([]));
            }
          });
        }
      });
    }
  }, [dispatch, LoginUserPlainEmail]);

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
              {!AddsentMail && msg}
              {AddsentMail.map((sentAry) => {
                return (
                  <table
                    className="table table-hover table-mail"
                    key={sentAry[0].id}
                  >
                    <tbody>
                      <tr>
                        <td className="table-inbox-checkbox">
                          <div className="checkbox">
                            <label>
                              <input type="checkbox" />
                            </label>
                          </div>
                        </td>

                        <td className="name ">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`${sentAry[0].id}`}
                            state={{
                              to: sentAry[0].values.to,
                              subject: sentAry[0].values.subject,
                              msgBody: sentAry[0].values.msgBody,
                              time: sentAry[0].values.time,
                            }}
                          >
                            <span className="bg-dark text-white p-1 rounded">
                              To-{sentAry[0].values.to}
                            </span>
                            &nbsp;
                            <span className="text-dark">
                              {sentAry[0].values.subject}
                            </span>
                          </Link>
                        </td>
                        <td className="subject ">
                          <Link
                            className="text-dark"
                            style={{ textDecoration: "none" }}
                          >
                            {sentAry[0].values.msgBody}
                          </Link>
                        </td>
                        <td className="time">
                          {sentAry[0].values.time.date}
                          <span> {sentAry[0].values.time.time}</span>
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
                  </table>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sent;
