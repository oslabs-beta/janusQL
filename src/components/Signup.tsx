import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link, 
  useRouteMatch,
  useParams
} from "react-router-dom";

//import css style library here
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

//css styling imported from material-ui

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    createBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: 'linear-gradient(45deg, #FE688B 30%, #FF8E53 90%)',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type definitions and initial state of state
type State = {
  username: string
  fullname: string
  password: string
  email: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
  signupRedirect: boolean
};

const initialState:State = {
  username: '',
  fullname: '',
  password: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
  signupRedirect: false
};

//action type definitions
type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setfullname', payload: string } 
  | { type: 'setemail', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setIsError', payload: boolean }
  | { type: 'signupRedirect', payload: boolean};

//reducer definitions

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };

    case 'setfullname': 
      return {
        ...state,
        fullname: action.payload
      };

    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };

      case 'setemail': 
      return {
        ...state,
        email: action.payload
      };

    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };

    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };

    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };

    case 'signupRedirect':
      return { 
        ...state,
      signupRedirect: action.payload
      };
  }
}

// methods / function definitions 
const Signup = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim() && state.fullname.trim() && state.email.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.fullname, state.password, state.email]);

  
  const handleSignup = () => {
   
     const { username, fullname, password, email } = state;
     const userData = {
       username,
       fullname,
       password,
       email
     }
     const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData) // do we even need to stringify this?
    }

     fetch('http://localhost:3000/user/register', options)
    //  .then(result => result.json())
     .then(result => {
       if (result.status === 200) {
         dispatch({type: 'signupRedirect', payload: true})
        }
      })
     .catch(err => console.log(err))
     
      // dispatch({
      //   type: 'loginFailed',
      //   payload: 'Incorrect username or password'
      // });
  };

//this needs attention - depricated
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setfullname',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

    const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setemail',
        payload: event.target.value
      });
    }

    const { signupRedirect } = state;
    if (signupRedirect) {
      return <Redirect to='/Graphs' />
    }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Sign up for JanusQL" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="username"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
              <TextField
              error={state.isError}
              fullWidth
              id="fullname"
              type="fullname"
              label="Fullname"
              placeholder="First Last"
              margin="normal"
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email@here.com"
              margin="normal"
              helperText={state.helperText}
              onChange={handleEmailChange} 
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.createBtn}
            onClick={handleSignup}
            disabled={state.isButtonDisabled}>
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  );
  }

export default Signup;