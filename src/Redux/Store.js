import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./Reducers/RootReducer";
import rootSaga from "./Sagas/RootSaga";
import Sagaa from "./Sagas/loginsaga";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["getUserData"],
};

const composeEnhancers =
  (process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(Sagaa);

export const persistor = persistStore(store);
