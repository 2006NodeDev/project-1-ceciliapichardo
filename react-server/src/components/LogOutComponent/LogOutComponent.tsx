import React, { FunctionComponent } from 'react';
import { Button, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logout: {
            position: 'fixed',
            bottom: 10,
            alignSelf: 'flex-end',
            backgroundColor: '#ff5722',
            color: "white",
            right: 10
        },
    }),
);
export const LogOutComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    
    return (
        <div>
            <form>
                <Button href="/login" className={classes.logout}>Logout</Button>
            </form>
        </div>
    )
}