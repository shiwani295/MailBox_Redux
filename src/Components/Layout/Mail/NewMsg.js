import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewMsg = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const enteredTo = useRef();
  const subject = useRef();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const LoginUserPlainEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const MailBoxFormHandler = (event) => {
    event.preventDefault();
    const toReciverEmail = enteredTo.current.value;
    const toPlanEmail = toReciverEmail.replace(/[^a-zA-Z0-9]/g, "");
    const Sub = subject.current.value;
    const msg = editorState.getCurrentContent().getPlainText();

    const currentDate = {
      date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    const msgObj = {
      to: toReciverEmail,
      subject: Sub,
      msgBody: msg,
      time: currentDate,
      from: loginUser,
      read: false,
    };

    const urlTo = `https://mailbox-57936-default-rtdb.firebaseio.com/${toPlanEmail}/inbox.json`;
    const urlLoginUser = `https://mailbox-57936-default-rtdb.firebaseio.com/${LoginUserPlainEmail}/sendBox.json`;

    if (LoginUserPlainEmail) {
      fetch(urlTo, {
        method: "POST",
        body: JSON.stringify(msgObj),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          fetch(urlLoginUser, {
            method: "POST",
            body: JSON.stringify(msgObj),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.ok) {
              enteredTo.current.value = "";
              subject.current.value = "";
              setEditorState("");
            }
          });
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="modal-content">
          <div className="modal-header bg-blue  ">
            <h4 className="modal-title">
              <i className="fa fa-envelope"></i> Compose New Message
            </h4>
          </div>
          <div className="text-center mt-2"></div>
          <form onSubmit={MailBoxFormHandler}>
            <div className="modal-body">
              <div className="form-group">
                <input
                  name="to"
                  type="email"
                  className="form-control"
                  placeholder="To"
                  ref={enteredTo}
                />
              </div>
              <div className="form-group">
                <input
                  name="subject"
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  ref={subject}
                />
              </div>
              <div className="form-group">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-dark pull-right">
                <i className="fa fa-envelope"></i> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewMsg;
