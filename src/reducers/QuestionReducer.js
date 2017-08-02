import { GET_QUESTION_FEED, GET_NEW_QUESTION_FEED } from "../actions/types";

const initialState = {
  posts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NEW_QUESTION_FEED:
      return { ...state, posts: [] };
    case GET_QUESTION_FEED:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
