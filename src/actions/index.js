import firebase from "../firebase/firebase";
import _ from "lodash";
import { GET_QUESTION_FEED, GET_NEW_QUESTION_FEED } from "./types";

export const getQuestions = (lastKey = 0) => {
  return dispatch => {
    if (lastKey === 0) {
      dispatch({
        type: GET_NEW_QUESTION_FEED
      });
    }

    const database = firebase.database();
    return database
      .ref("questions")
      .once("value")
      .then(snapshot => snapshot.val())
      .then(rows => {
        if (!_.isEmpty(rows) || !_.isNull(rows)) {
          console.log("rows", rows);
          dispatch({
            type: GET_QUESTION_FEED,
            payload: rows
          });
        }
      });
  };
};
