import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
