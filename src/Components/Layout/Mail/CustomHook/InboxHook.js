import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailSliceAction } from "../../../../Store/Mail";

const useInboxhook = (url) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.Auth.userEmail);
  const LoginUserPlainEmail = loginUser.replace(/[^a-zA-Z0-9]/g, "");
  useEffect(() => {
    if (LoginUserPlainEmail) {
      fetch(url, {
        method: "GET",
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              if (data) {
                const result = Object.keys(data).map((key) => [
                  { id: key.toString(), values: data[key] },
                ]);

                dispatch(mailSliceAction.AllinboxMails(result));
              } else {
                dispatch(mailSliceAction.ReadData([]));
                dispatch(mailSliceAction.AllinboxMails([]));
              }
            });
          }
        })
        .catch((error) => {
          console.log("error");
        });
    }
  });
};

export default useInboxhook;
