import React from 'react';
import { makeStyles, AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: '40px',
  },
  bl: {
    width: '120px',
    borderRadius: '0px',
  },
  rmd: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color='transparent' position='static'>
        <Toolbar>
          <img className={classes.logo} src="data:image/png;base64,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" alt='logo' />

          <Link to='/' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>New File</h3>
            </Button>
          </Link>
          <Link to='/view' className={classes.rmd}>
            <Button className={classes.bl} color='inherit'>
              <h3>My Files</h3>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
