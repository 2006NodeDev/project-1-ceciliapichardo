import React, { FunctionComponent, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles, GridList, GridListTile, ListSubheader } from '@material-ui/core';
import { getUsersByLocation } from '../../remote/react-server-api/get-users-by-location';
import { User } from '../../models/User';
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent';
import { RouteComponentProps } from 'react-router';
import { getAllUsers } from '../../remote/react-server-api/get-all-users';

interface ILocationProps extends RouteComponentProps {
    changeCurrentLocation:(newLocation:any)=>void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            backgroundColor: theme.palette.background.paper
        },
        gridList: {
            display: 'flex',
            justifyContent: 'space-around',
            width: 300,
            height: 550,
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 'auto'
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

export const AllUsersInLocationComponent: FunctionComponent<ILocationProps> = (props) => {
    const classes = useStyles();
    let [allUsers, changeAllUsers] = useState<User[]>([])
    //let [city, changeCity] = useState('')
    //let [state, changeState] = useState('')

    useEffect(() => {
        const getUsers = async () => {
            let response = await getAllUsers()
            props.changeCurrentLocation(response)
        }
        if (allUsers.length === 0) {
            getUsers()
        }
    })

    let userDisplays = allUsers.map((user) => {
        return <UserDisplayComponent key={'user-key-' + user.userId} user={user} />
    })

    return (
        <div> <br/><br/><br/><br/>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Users In This Location</ListSubheader>
                </GridListTile>
                {userDisplays}
            </GridList>
        </div>
    )
}