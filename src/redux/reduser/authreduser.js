import { AUTHORIZATION } from "../type"

const initialState = {
  auth: false,
}

export default function authReducer(state = initialState, actions) {
  switch (actions.type) {
    case AUTHORIZATION:
      return {
        ...state,
        auth: actions.payload,
      }
    default:
      return state
  }
}
