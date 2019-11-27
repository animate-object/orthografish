import {
  takeEvery,
  put,
  call,
  fork,
  cancel,
  delay
} from "@redux-saga/core/effects";
import {
  ActionTypes,
  fetchIsSlow,
  startNewGame,
  requestNewGameFailed,
  requestNewGame,
  fetchWords,
  fetchWordsSuccess,
  fetchWordsFailed
} from "./actions";
import axios from "axios";
import { Letter, Result } from "./types";
import { N_LETTERS } from "./state";

const URL = "https://4upb1jruoc.execute-api.us-east-1.amazonaws.com/prod/words";

export function* root() {
  yield fork(watchNewGame);
  yield put(requestNewGame());
}

export function* fetchWordsForLetters(letters: string) {
  yield put(fetchWords());
  const slowLoadTask = yield fork(slowLoadFeedback);
  let words: string[] = [];
  try {
    while (words.length <= 0) {
      const response = yield call(axios.post, URL, {
        letters
      });
      words = response.data.body.result.items;
    }
    yield put(fetchWordsSuccess());
    return Result.success(words);
  } catch (e) {
    console.error(e);
    yield put(fetchWordsFailed());
    return Result.error(e);
  } finally {
    yield cancel(slowLoadTask);
  }
}

export function* slowLoadFeedback() {
  yield delay(700);
  yield put(fetchIsSlow());
}

export function* initializeGame() {
  const { drawn, left }: Letter.DrawResult = yield call(Letter.draw, N_LETTERS);

  const wordsResult: Result.Result<string[]> = yield call(
    fetchWordsForLetters,
    Letter.toString(...drawn)
  );

  if (Result.isSuccess(wordsResult)) {
    yield put(startNewGame(drawn, left, wordsResult.value));
  } else {
    yield put(requestNewGameFailed());
  }
}

export function* watchNewGame() {
  yield takeEvery(ActionTypes.REQUEST_NEW_GAME, initializeGame);
}
