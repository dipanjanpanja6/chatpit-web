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
console.log(data);
var formdata = new FormData();
formdata.append("post_image", data.post_image);
formdata.append("post",data.post );
formdata.append("isImage", data.isImage);

  fetch(`${url}/post`, {
    method: "POST",
    headers: {Authorization: token  },
    body: formdata,
  }).then((res) =>
    res.json().then((d) => {
      console.log(d);
      d.success && alert(d.success)
      // data.success && dispatch(getPosts())
    })
  );
};
