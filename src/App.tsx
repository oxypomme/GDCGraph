import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import ReactTooltip from 'react-tooltip';

import Navbar from "./features/commons/Navbar";

import Home from "./views/home";
import Players from "./views/players";

import NotFound from "./views/errors/NotFound";
import NotImplemented from './views/errors/NotImplemented';
import Maps from './views/maps';
import Footer from './features/commons/Footer';

const AppContainer = styled.div`
  text-align: center;
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
          <Route exact path={"/maps"} component={Maps} />
          <Route component={NotFound} />
        </Switch>
      </AppContainer>
      <Footer />
      <ReactTooltip type='light' />
    </Router>
  );
}

export default App;
