import {
  put,
  takeLatest,
  call,
  setContext,
  getContext,
  select,
  fork
} from "@redux-saga/core/effects";
import * as Api from "../common/api";
import { ArrayUtils } from "../common/types";
import { PrefixParams } from "./state";
import { getPrefixParams } from "./selectors";
import { startNewGame, requestNewGame } from "./actions";
import { ActionTypes } from "../speller/actions";

export function* root() {
  const getPrefix = yield call(fetchPrefixes);
  yield setContext({ getPrefix });

  yield fork(watchNewGame);
  yield put(requestNewGame());
}

export function* fetchPrefixes() {
  const { wordLength, prefixLength }: PrefixParams = yield select(
    getPrefixParams
  );
  const prefixes = yield call(Api.wordPrefixes, wordLength, prefixLength);
  return (): string => {
    return ArrayUtils.randomItem(Object.keys(prefixes));
  };
}

export function* newGame() {
  try {
    const getPrefix = yield getContext("getPrefix");
    const prefix = getPrefix();
    const { wordLength }: PrefixParams = yield select(getPrefixParams);

    const words = yield call(Api.wordsStartingWith, prefix, wordLength);
    yield put(startNewGame(words, prefix));
  } catch (e) {
    console.error(e);
  }
}

export function* watchNewGame() {
  yield takeLatest(ActionTypes.REQUEST_NEW_GAME, newGame);
}
