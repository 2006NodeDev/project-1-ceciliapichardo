import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { GridListTileBar, IconButton, GridListTile } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

interface IUserDisplayProps {
   user: User
}

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'space-around',
         overflow: 'hidden',
         backgroundColor: theme.palette.background.paper,
         //'& > *': {
         //  margin: theme.spacing(1),
         //  width: theme.spacing(20),
         //  height: theme.spacing(30),
         //},
      },
      gridList: {
         display: 'flex',
         justifyContent: 'space-around',
         width: 500,
         height: 450,
      },
      icon: {
         color: 'rgba(255, 255, 255, 0.54)',
      },
      //paper:{
      //     backgroundColor:'grey' 
      // }
   }),
);


export const UserDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
   let classes = useStyles()
   return (
      <div className={classes.root}>
         <GridListTile key={props.user.userId}>
            <img src={props.user.image} alt={props.user.username} width="300" height="400" />
            <GridListTileBar
               title={<span>{props.user.firstName} and {props.user.dogName}</span>}
               subtitle={<span>{props.user.city}, {props.user.state}</span>}
               actionIcon={
                  <IconButton aria-label={`info about ${props.user.username}`} className={classes.icon}>
                     <InfoIcon />
                  </IconButton>
               }
            />
         </GridListTile>
         {/* <Paper className={classes.paper} variant="outlined" square>
                <Typography variant='body1'>
                   Username : {props.user.username}
                </Typography>
                <Typography variant='body1'>
                   First Name : {props.user.firstName}
                </Typography>
                <Typography variant='body1'>
                   Last Name : {props.user.lastName}
                </Typography>
                <Typography variant='body1'>
                   Email : {props.user.email}
                </Typography>
                <Typography variant='body1'>
                   PuppyPal : {props.user.dogName}
                </Typography>
                <Typography variant='body1'>
                   Breed : {props.user.breed}
                </Typography>
                <Typography variant='body1'>
                   Location : {props.user.city}, {props.user.state}
                </Typography>
                <img src={props.user.image} alt="Profile Picture" width="200" height="300"/>
                <Button variant='contained' color='inherit'>Edit</Button>
            </Paper> */}
      </div>
   )
}