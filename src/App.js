import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Layout/Header/Navbar";
import Signupform from "./Components/Layout/Authentication/Signupform";
import Home from "./Components/Layout/Page/Home";
import Forgotpassword from "./Components/Layout/Page/Forgotpassword";
import MailBoard from "./Components/Layout/Mail/MailBoard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthAction } from "./Store/AuthSlice";
import OpenInboxMail from "./Components/Layout/Mail/OpenMail/OpenInboxMail";
import Inbox from "./Components/Layout/Mail/Inbox";
import Sent from "./Components/Layout/Mail/Sent";
import NewMsg from "./Components/Layout/Mail/NewMsg";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.Auth.isAuth);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(AuthAction.Login({ email: localStorage.getItem("email") }));
    }
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        / <Route exact path="/login" element={<Signupform />} />
        {isAuth && (
          <Route path="dashboard" element={<MailBoard />}>
            <Route path="inbox" element={<Inbox />}>
              <Route path=":mailId" element={<OpenInboxMail />} />
            </Route>
            <Route path="sent" element={<Sent />}>
              <Route path=":mailId" element={<OpenInboxMail />} />
            </Route>
            <Route path="composemail" element={<NewMsg />} />
          </Route>
        )}
        <Route path="*" element={<Signupform />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
      </Routes>
    </>
  );
}

export default App;
