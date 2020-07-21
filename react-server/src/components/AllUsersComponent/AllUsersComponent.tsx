import React, { FunctionComponent, useEffect, useState } from 'react'
import { User } from '../../models/User'
import { getAllUsers } from '../../remote/react-server-api/get-all-users'
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent'
import { makeStyles, createStyles, Theme, Grid } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: theme.palette.background.paper
        },
    }),
);

export const AllUsersComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    //I need to fetch all the user information
    let [allUsers, changeAllUsers] = useState<User[]>([])
    //should look just like profile
    useEffect(() => {//runs on every single re render

        //write an async function that can update state with fetched users
        const getUsers = async () => {
            let response = await getAllUsers()
            changeAllUsers(response)
        }

        //we only call that function of we haven't already called it
        if (allUsers.length === 0) {
            //get the users
            //update the state with those users
            getUsers()
        }
    })

    //map data into components and then put them into the jsx
    let userDisplays = allUsers.map((user) => {
        return <UserDisplayComponent key={'user-key-' + user.userId} user={user} />
    })

    return (
        <div> <br /><br /><br /><br /><br /><br />
            <Grid container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {userDisplays}
            </Grid>
        </div>
    )
}