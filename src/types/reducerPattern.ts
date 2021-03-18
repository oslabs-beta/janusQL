//action type definitions
export type Action = { type: 'setUsername', payload: string }
| { type: 'setPassword', payload: string }
| { type: 'setfullname', payload: string } 
| { type: 'setemail', payload: string }
| { type: 'setIsButtonDisabled', payload: boolean }
| { type: 'loginSuccess', payload: string }
| { type: 'loginFailed', payload: string }
| { type: 'setIsError', payload: boolean }
| { type: 'loginRedirect', payload: boolean}
| { type: 'signupRedirect', payload: boolean};


// type definition for signup component
export type signupState = {
  username: string
  fullname: string
  password: string
  email: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
  signupRedirect: boolean,
  reducerError: string
};

// type definition for login component
export type loginState = {
  username: string
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean,
  loginRedirect: boolean,
  reducerError: string
};