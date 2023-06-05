import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../OpenMail/OpenMail.css";

const OpenInboxMail = () => {
  let params = useParams();
  const location = useLocation();
  const obj = location.state;
  const history = useNavigate();

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <button
              className="btn-sm border-dark bg-white"
              onClick={() => history("/dashboard/inbox")}
            >
              Back
            </button>
            <div className="card-text mt-3">
              <div className="row">
                <p className="d-flex pt-3shadow mt-4 ml-4">
                  <span className="criclename justify-content-center mr-3 rounded-circle text-Uppercase">
                    {obj.from ? obj.from : ""}
                  </span>
                </p>
                <p style={{ marginTop: "3.5%" }}>
                  <strong className="mt-3">From-</strong>
                  {obj.from}
                </p>
                <p style={{ marginLeft: "60%", marginTop: "3.5%" }}>
                  <strong>
                    {obj.time.date}
                    <span className="ml-2">{obj.time.time}</span>
                  </strong>
                </p>
              </div>
              <div className="subject">
                <p>
                  <strong>Subject-</strong>
                  {obj.subject}
                </p>
              </div>
            </div>
            <div className="subject">
              <p>
                <strong>Message-</strong>
                {obj.msgBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenInboxMail;
// onClick={deleteMailHandler}
// onClick={() => history("/welcome/inbox")}
