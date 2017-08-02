import firebaseApp from "../firebase/firebase";
import _ from "lodash";
import { GET_QUESTION_FEED, GET_NEW_QUESTION_FEED } from "./types";

export const getQuestions = (lastKey = 0) => {
  return dispatch => {
    const database = firebaseApp.database();
    return database
      .ref("questions")
      .orderByKey()
      .once("value")
      .then(snapshot => snapshot.val())
      .then(rows => {
        if (!_.isEmpty(rows) || !_.isNull(rows)) {
          dispatch({
            type: GET_QUESTION_FEED,
            payload: rows
          });
        }
      });
  };
};
