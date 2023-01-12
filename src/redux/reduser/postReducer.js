import { GET_ALL_POST, NEW_POST, POST_NULL } from "../type"

const initialState = {
  posts: null,
  newPost: {},
}

export default function (state = initialState, actions) {
  switch (actions.type) {
    case GET_ALL_POST:
      return {
        ...state,
        posts: actions.payload,
      }
    case NEW_POST:
      return {
        ...state,
        newPost: actions.payload,
      }
    case POST_NULL:
      return {
        ...state,
        newPost: {},
      }
    default:
      return state
  }
}
