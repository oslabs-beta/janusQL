import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import { Action, signupState } from '../types/reducerPattern';

// Material ui imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';


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
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);


const initialState:signupState = {
  username: '',
  fullname: '',
  password: '',
  email: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false,
  signupRedirect: false,
  reducerError: ''
};


//reducers
const reducer = (state: signupState, action: Action): signupState => {
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

    default:
      return {
        ...state,
        reducerError: 'default reducer case invoked'
    };
  }
}

// methods / function definitions 
const Signup = (): JSX.Element => {
  const classes = useStyles();

  // Hook for reducer state management pattern
  const [state, dispatch] = useReducer(reducer, initialState);

  // Disable registration button until user enters all credentials
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

  // Post to DB
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
      body: JSON.stringify(userData)
    }

     fetch('http://localhost:3000/user/register', options)
     .then(result => {

        // Log user in on successful signup
        if (result.status === 200) {
          dispatch({type: 'signupRedirect', payload: true})
         }
      })
     .catch(err => {
       console.log(err)
       dispatch({
         type: 'loginFailed',
         payload: 'Error signing up'
       });
     })
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

    // Log user in on successful signup
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