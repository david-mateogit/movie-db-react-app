import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import Movie from '../Movie/Movie';
import Actor from '../Actor/Actor';
import NotFound from '../elements/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:movieId" component={Movie} />
          <Route exact path="/:movieId/actor/:actorId" component={Actor} />
          <Route component={NotFound} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
