import React, { useRef, useState } from "react";
import logo from "../../Asset/Image/logo.png";
import "../Authentication/Signuppage.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../../Store/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Signupform = () => {
  const InputemailRef = useRef();
  const InputpasswordRef = useRef();
  const inputCpasswordRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.Auth.isAuth);
  const [login, setIslogin] = useState(islogin);
  const FormSubmitHandlar = (e) => {
    e.preventDefault();
    const email = InputemailRef.current.value;
    const password = InputpasswordRef.current.value;

    let cpassword;
    if (!login) {
      cpassword = inputCpasswordRef.current.value;
    } else {
      cpassword = InputpasswordRef.current.value;
    }

    if (password === cpassword) {
      let url;
      if (login) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNbzzh6L43Dqjd4u9TIrRhkfHIXJ9dPDk";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNbzzh6L43Dqjd4u9TIrRhkfHIXJ9dPDk";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something Went Wrong");
          }
        })
        .then((data) => {
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);

          dispatch(AuthAction.Login({ email: data.email }));
          history("/dashboard/inbox");
        })
        .catch((err) => {
          alert(err.message);
        });

      InputemailRef.current.value = "";
      InputpasswordRef.current.value = "";
      if (!login) {
        inputCpasswordRef.current.value = "";
      }
    } else {
      alert("Passwords do not match");
    }

    //
  };

  return (
    <section>
      <div className="container ">
        <div className="row justify-content-center ">
          <div className="signuppage mt-5 bg-dark text-white p-5 border border-white rounded">
            <img
              src={logo}
              alt="logo"
              className="w-25 d-block ml-auto mr-auto "
            />
            <h3>We Are The Mail Box Team</h3>
            <div className="Fromstart">
              <form onSubmit={FormSubmitHandlar}>
                {login ? (
                  <p>Please Login To Your Account</p>
                ) : (
                  <p>Please Create Your Account</p>
                )}

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example11"
                    className="form-control"
                    placeholder="Email address.."
                    ref={InputemailRef}
                    required
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password.."
                    ref={InputpasswordRef}
                    required
                  />
                </div>
                {!login && (
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password.."
                      ref={inputCpasswordRef}
                      required
                    />
                  </div>
                )}

                <div className="text-center pt-1 mb-5 pb-1">
                  <button
                    className="btn btn-dark border-white btn-block mb-3"
                    type="submit"
                  >
                    {login ? " Log in" : "SignUp"}
                  </button>
                  {login ? (
                    <Link className="text-white " to="/forgotpassword">
                      Forgot password?
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">
                    {islogin ? "Don't have an account?" : " If have an account"}
                  </p>
                  {login ? (
                    <Link
                      // type="button"
                      className="btn border border-white text-white ml-3"
                      onClick={() => setIslogin(false)}
                    >
                      Create new
                    </Link>
                  ) : (
                    <Link
                      // type="button"
                      className="btn btn-outline-white ml-3 border border-white text-white"
                      onClick={() => setIslogin(true)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </section>
  );
};

export default Signupform;
// style="width: 185px;"
