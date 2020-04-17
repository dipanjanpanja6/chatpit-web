import { url } from "../../config/config";
import { GET_USER_PROFILE } from "../type";


const token = localStorage.getItem("token");


export const getProfile = () => (dispatch) => {
    // const userID = localStorage.getItem('uid')
  fetch(`${url}/profile/`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token },
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);

        dispatch({
          type: GET_USER_PROFILE,
          payload: data,
        });
      })
    )
    .catch((error) => {
      console.log(error);
    });
};
// export const post = (data) => (dispatch) => {
//   fetch(`${url}/post`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json",Authorization: token  },
//     body: JSON.stringify(data),
//   }).then((res) =>
//     res.json().then((data) => {
//       console.log(data);
//     })
//   );
// };
export const updateName = (data)=>(dispatch)=>{
  console.log(token);
  
fetch(`${url}/profile/update/name`,{
  method:'POST',
  headers:{
    "authorization":token,
    "Content-Type":"application/json"
  },
  body:JSON.stringify(data),
})
.then((res)=>{res.json().then((data)=>{
  console.log(data);
  
})})
.catch((error)=>{
  console.log(error);
  
})
}
export const updateDp = (data)=>(dispatch)=>{
//   var myHeaders = new Headers();
// myHeaders.append("Authorization", token);

var formdata = new FormData();
formdata.append("profile_image", data);

  fetch(`${url}/profile/update/image`,{
    method:'POST',
    headers:{
      "Authorization":token
    },
    body:formdata
  })
.then((res)=>res.json().then((d)=>{console.log(d)}))

  .catch(error => console.log('error', error));
}