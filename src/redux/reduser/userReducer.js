import {GET_USER_PROFILE } from "../type";

const initialState = {
  userProfile:null
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_USER_PROFILE:
      return{
        ...state,
        userProfile:actions.payload
      }
    default:
      return state;
  }
}
