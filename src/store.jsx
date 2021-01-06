import { createStore, applyMiddleware } from "redux";
//import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return Store;
}

export default configureStore;
