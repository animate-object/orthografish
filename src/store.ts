import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";

import { reducer } from "./reducer";
import { root } from "./saga";

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(root);
