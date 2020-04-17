import { AUTHORIZATION, } from "../type";

const initialState = {
  auth: false,
  
  
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    // case SET_LOGIN_SUCCESS:
    //     return{
    //         ...state,
    //         token:actions.payload,

    //         loginLoading:false,
    //         loginError:null
    //     }
    //     case SET_LOGIN_ERROR:
    //         return{
    //             ...state,
    //             loginError:actions.payload
    //         }
    
    case AUTHORIZATION:
      return {
        ...state,
        auth: actions.payload,
      };
    default:
      return state;
  }
}
