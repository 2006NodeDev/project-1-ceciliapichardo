import React, { FunctionComponent, useEffect, useState } from 'react'
import { User } from '../../models/User'
import { getAllUsers } from '../../remote/react-server-api/get-all-users'
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent'
import { GridList, GridListTile, ListSubheader, makeStyles, createStyles, Theme, GridListTileBar } from '@material-ui/core'


//the purpose of this component is to get and keep track of all user information
// provide that information to specialized display components
//most basic design pattern in react
//data display, function container <- bad name, stateful stateless, smart dumb, controller display


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
            //alignContent: 'left',
            paddingTop: 50,
            paddingBottom: 50,
            paddingLeft: 'auto'
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
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

    //this is one of the coolest things about react
    //map data into components and then put them into the jsx
        let userDisplays = allUsers.map((user) => {
    //whwenever you make a bunch of components like this
    // react agressively suggests you give them unqie keys so it can tell them apart
            return <UserDisplayComponent key={'user-key-' + user.userId} user={user} />
        })
    // let userDisplays = allUsers.map((user) => {
    //     <GridListTile key={'user-key-' + user.userId} user={user}>
    //         <img src={user.image} alt={user.image} />
    //         <GridListTileBar
    //             title={<span> {user.firstName} {user.lastName} and {user.dogName} </span>}
    //             subtitle={<span>{user.city}, {user.state}</span>}
    //             // actionIcon={
    //             //     <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
    //             //         <InfoIcon />
    //             //     </IconButton>
    //             // }
    //         />
    //     </GridListTile>
    // })

    return (
        //we should turn this into a grid to make it look nicer
        <div> <br/><br/><br/><br/>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">All Users</ListSubheader>
                </GridListTile>
                {userDisplays}
                {/* {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))} */}
            </GridList>
        </div>
    )
}