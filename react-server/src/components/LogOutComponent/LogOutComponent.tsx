import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { Button, FormGroup, FormControlLabel, Switch, makeStyles, createStyles, Theme, withStyles } from '@material-ui/core';
import Axios from 'axios';
import { RouteComponentProps } from 'react-router';

interface ILoginProps extends RouteComponentProps{
    changeCurrentUser:(newUser:any)=>void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logout: {
            position: 'fixed',
            bottom: 0,
            alignSelf: 'flex-end',
        },
        switch: {
            backgroundColor: '#ff5722'
        }
    }),
);
export const LogOutComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    //let [currentUser, changeCurrentUser] = useState('')
    const [auth, setAuth] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const OrangeSwitch = withStyles({
        switchBase: {
          color: "#ff5722",
          "&$checked": {
            color: '#ff5722'
          },
          "&$checked + $track": {
            backgroundColor: '#ff5722'
          }
        },
        checked: {},
        track: {}
    })(Switch);

    let userSession = 'http://localhost:2004/logout'
    console.log(userSession);
    const logoutSubmit = (e:SyntheticEvent) => { 
        //e.preventDefault()
        Axios.delete(userSession)
        props.history.push(`/login`)
    }
    //logoutSubmit()

    return (
        <div>
            {/* <FormGroup>
                <FormControlLabel className={classes.logout}
                    control = {<OrangeSwitch
                        checked={auth}
                        onChange={handleChange}
                        aria-label="login switch"
                    /> }
                    // control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" className={classes.switch} />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup> */}
            <form>
                <Button onClick={logoutSubmit} className={classes.logout}>Logout</Button>
            </form>
        </div>
    )
}