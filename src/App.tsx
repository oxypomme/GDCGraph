import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

import Navbar from "./features/commons/Navbar";

import Home from "./views/home";
import Players from "./views/players";

import NotFound from "./views/errors/NotFound";
import NotImplemented from './views/errors/NotImplemented';

const AppContainer = styled.div`
  margin-top: var(--nav-size);
  text-align: center;
  height: calc(100vh - var(--nav-size));
`;

const App = (): JSX.Element => {
  return (
    <Router basename='/'>
      <Navbar />
      <AppContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={["/players", "/players/:id"]} component={Players} />
          <Route exact path={["/missions", "/missions/:id"]} component={NotImplemented} />
          <Route component={NotFound} />
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;
