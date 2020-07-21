import React, { FunctionComponent } from 'react'
import { User } from '../../models/User'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {  Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Container, CssBaseline, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

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
         minWidth: 150,
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
      media: {
         height: 0,
         paddingTop:'75%'
      },
      expand: {
         transform: 'rotate(0deg)',
         marginLeft: 'auto',
         transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
         }),
      },
      expandOpen: {
         transform: 'rotate(180deg)',
      },
   }),
);


export const UserDisplayComponent: FunctionComponent<IUserDisplayProps> = (props) => {
   let classes = useStyles()
   const [expanded, setExpanded] = React.useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   return (
      <div>
         <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
               <Card className={classes.root}></Card>
               <CardHeader
                  title={<span>{props.user.firstName} and {props.user.dogName}</span>}
                  subheader={<span>{props.user.city}</span>}
               />
               <CardMedia
                  className={classes.media}
                  image={props.user.image}
                  title={props.user.username}
               />
               <CardContent>
               {/* <Typography variant="body2" color="textSecondary" component="p">
                  Description
               </Typography> */}
               </CardContent>
               <CardActions disableSpacing>
                  <IconButton
                     className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                     })}
                     onClick={handleExpandClick}
                     aria-expanded={expanded}
                     aria-label="show more"
                  >
                     <ExpandMoreIcon />
                  </IconButton>
               </CardActions>
               <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                     <Typography variant="body2" color="textSecondary" component="p">
                        Bio
                     </Typography>
                     <Typography paragraph>
                        {props.user.dogName} is a {props.user.breed}
                     </Typography>
                     <Typography paragraph>
                        {props.user.firstName} {props.user.lastName} and {props.user.dogName} live in {props.user.city}, {props.user.state}
                     </Typography>
                     <Typography paragraph>
                        Email {props.user.firstName} for playdates at {props.user.email}
                     </Typography>
                  </CardContent>
               </Collapse>
            </Container>
         </React.Fragment>
      </div>
   )
}