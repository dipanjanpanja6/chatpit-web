import { url } from "../../config/config"
import { AUTHORIZATION } from "../type"

const token = sessionStorage.getItem("token")
// const deviceKEY = sessionStorage.getItem("device")

export const signUp = data => dispatch => {
  fetch(`${url}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => {
      res.json().then(data => {
        console.log(data)
        sessionStorage.setItem("token", `Bearer ${data.token}`)
        sessionStorage.setItem("device", data.device_key)
        sessionStorage.setItem("uid", data.user_id)
        data.error && alert(data.message)
        data.success && dispatch(createToken(data.user_id, data.device_key))
        // dispatch(checkAuthenticated());
        data.success && (window.location = "/")
      })
    })
    .catch(error => {
      console.log(error)
    })
}
export const login = data => dispatch => {
  fetch(`${url}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then(res => {
      res.json().then(data => {
        console.log(data)
        sessionStorage.setItem("token", `Bearer ${data.token}`)
        sessionStorage.setItem("device", data.device_key)
        sessionStorage.setItem("uid", data.user_id)

        // data.success && dispatch(createToken(data.user_id, data.device_key));
        data.success && (window.location = "/")
        data.error && alert(data.message)
      })
    })
    .catch(error => {
      console.log(error)
    })
}
export const createToken = (userID, deviceKEY) => dispatch => {
  // console.log(deviceKEY);

  fetch(`http://localhost:4009/token/create/${userID}/${deviceKEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then(res => {
      res.json().then(data => {
        console.log(data)
        if (data.error) {
          // console.log(data.error);
          // window.location = `/auth`;
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
export const checkAuthenticated = () => dispatch => {
  fetch(`${url}/authenticated/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      AUTHORIZATION: token,
    },
  })
    .then(res => {
      res.json().then(data => {
        console.log(data)
        if (data.authorized) {
          localStorage.shout_name = data.name
          sessionStorage.isAnonymous = data.isAnonymous
          dispatch({
            type: AUTHORIZATION,
            payload: data,
          })
        } else {
          window.location = "/auth"
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
}
