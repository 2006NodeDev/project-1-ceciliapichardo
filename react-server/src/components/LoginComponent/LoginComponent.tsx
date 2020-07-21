import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { RouteComponentProps } from 'react-router-dom'
import { reactLogin } from '../../remote/react-server-api/login';
import { makeStyles, createStyles, Theme, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

interface ILoginProps extends RouteComponentProps{
    changeCurrentUser:(newUser:any)=>void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    button: {
        color: '#ff5722',
        borderColor: '#ff5722'
    },
  }),
);

export const LoginComponent:FunctionComponent<ILoginProps> = (props) => {
    const classes = useStyles();

    //we need to keep track of a username and a password
    const [username, changeUsername] = useState('')// two bits of state from react
    const [password, changePassword] = useState('')// one for username, one for password
    // there used to be the user state here - now it is from props

    const updateUsername = (event:any) => {//callback for events
        event.preventDefault()//stop the default behaviour of the event
        changeUsername(event.currentTarget.value)//call the state changing function with new value from user
    }

    const updatePassword = (event:any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        let res = await reactLogin(username, password)
        props.changeCurrentUser(res)
        changePassword('')
        props.history.push(`/profile/${res.userId}`)
    }

    return (
        <div> <br/><br/><br/><br/><br/><br/><br/>
            <form autoComplete="off" onSubmit={loginSubmit}>
                <TextField
                    className={classes.margin}
                    required
                    id="input-with-icon-textfield"
                    label="Username"
                    value={username} 
                    onChange={updateUsername}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),
                    }}
                /> <br/>
                <TextField
                    className={classes.margin}
                    required
                    id="input-with-icon-textfield"
                    type='password'
                    label="Password"
                    value={password} 
                    onChange={updatePassword}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                        ),
                    }} 
                /> <br/> <br/>
                <Button type='submit' variant="outlined" className={classes.button}>Login</Button>
            </form>
            <br/>
        </div>
    )
}