import { AUTHORIZATION,MODE} from "../type";

const initialState = {
  auth: false,
  mode:'light'
};

export default function (state = initialState, actions) {
  switch (actions.type) {
case MODE:
  return{
    ...state,
    mode:'dark'
  }
    case AUTHORIZATION:
      return {
        ...state,
        auth: actions.payload,
      };
    default:
      return state;
  }
}
