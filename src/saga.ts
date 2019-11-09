import { takeEvery, select, put, call, fork } from "@redux-saga/core/effects";
import {
  ActionTypes,
  FetchWords,
  fetchWords,
  fetchWordsSuccess,
  fetchWordsFailed
} from "./actions";
import { getFreeLetters } from "./selectors";
import axios from "axios";

const URL = "https://4upb1jruoc.execute-api.us-east-1.amazonaws.com/prod/words";

export function* root() {
  yield fork(watchFetchWords);
  yield fork(watchNewGame);
  yield initializeGame();
}

export function* fetchWordsForLetters({ letters }: FetchWords) {
  try {
    const response = yield call(axios.post, URL, {
      letters
    });

    yield put(fetchWordsSuccess(response.data.body.result.items));
  } catch (e) {
    console.error(e);
    yield put(fetchWordsFailed());
  }
}

export function* initializeGame() {
  const freeLetters = yield select(getFreeLetters);
  yield put(fetchWords(freeLetters));
}

export function* watchFetchWords() {
  yield takeEvery(ActionTypes.FETCH_WORDS, fetchWordsForLetters);
}

export function* watchNewGame() {
  yield takeEvery(ActionTypes.NEW_GAME, initializeGame);
}
