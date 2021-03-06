import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';

import Sheets from 'views/Sheets'
import View from 'views/View';
import Login from 'views/Login'

import 'easymde/dist/easymde.min.css';
import './App.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100vh',
    position: 'relative',
  },
  ch: {
    minHeight: '85vh',
  },
  header: {
    position: 'absolute',
    width: '100%',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <HashRouter>
      <div className={classes.paper}>
        <div className={classes.header}>
          <Header />
        </div>
        <Container className={classes.ch}>
          <Switch>
            <Route exact path='/' component={Sheets} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/view' component={View} />
          </Switch>
        </Container>
      </div>
    </HashRouter>
  );
}

export default App;
