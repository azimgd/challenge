import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from 'containers/AppContainer/index';
import HomeContainer from 'containers/HomeContainer/index';
import NotFoundContainer from 'containers/NotFoundContainer/index';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={HomeContainer} />
          <Route path="*" component={NotFoundContainer}/>
        </Route>
      </Router>
    )
  }
}
