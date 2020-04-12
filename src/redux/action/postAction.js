import { url } from "../../config/config";
import { GET_ALL_POST } from "../type";


const token = localStorage.getItem("token");


export const getPosts = () => (dispatch) => {
  fetch(`${url}/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
        dispatch({
          type: GET_ALL_POST,
          payload: data.posts,
        });
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
export const post = (data) => (dispatch) => {
  fetch(`${url}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json",Authorization: token  },
    body: JSON.stringify(data),
  }).then((res) =>
    res.json().then((data) => {
      console.log(data);
    })
  );
};
