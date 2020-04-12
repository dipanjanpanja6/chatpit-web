import { SET_LOGIN_SUCCESS, SET_LOGIN_ERROR } from "../type";
import { url } from "../../config/config";
import { AUTHORIZATION } from "../type";

export const signUp = (data) => (dispatch) => {
  fetch(`http://localhost:4009/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      res.json().then((data) => {
        console.log(data);

        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("device", data.device_key);
        dispatch(token());
        data.success && (window.location = "/");
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const login = (data) => (dispatch) => {
  fetch(`${url}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      res.json().then((data) => {
        console.log(data);
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("device", data.device_key);
        localStorage.setItem("uid", data.user_id);

        data.success && dispatch(token(data.user_id, data.device_key));
        data.success && (window.location = "/");
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const token = (userID, deviceKEY) => (dispatch) => {
  const deviceKEY = localStorage.getItem("device");
  const token = localStorage.getItem("token");

  // console.log(deviceKEY);

  fetch(`http://localhost:4009/token/create/${userID}/${deviceKEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        // window.location='/'
        dispatch({
          type: AUTHORIZATION,
          payload: true,
        });
      }
      if (!res.ok) {
        console.log("vag");
        // window.location = "/auth";
      }
      res.json().then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          window.location = `/auth`;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
