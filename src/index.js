import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { searchRobots, requestRobots } from 'containers/Robo/rRobo';
import { signinStatus, RegisterUser, imageDetection } from 'containers/SmartBrain/rSmartBrain';
import Project from 'containers/Project/cProject';
import registerServiceWorker from 'registerServiceWorker';

const logger = createLogger();
const rootReducers = combineReducers({
  signinStatus,
  RegisterUser,
  imageDetection,
  searchRobots,
  requestRobots,
});
const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware, logger),
);

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Provider store={store}>
        <Route path="/" component={Project} />
      </Provider>
    </Switch>
  </BrowserRouter>,
  document.querySelector('#page-wrapper')
);
registerServiceWorker();
