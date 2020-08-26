import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as chat from "./ducks/chat.duck";
import * as cases from "./ducks/cases.duck";
import * as lawyers from "./ducks/lawyers.duck";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  chat: chat.reducer,
  cases: cases.reducer,
  lawyers: lawyers.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
