import {GET_ALL_POST } from "../type";

const initialState = {
  posts:null
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_POST:
      return{
        ...state,
        posts:actions.payload
      }
      
    default:
      return state;
  }
}
