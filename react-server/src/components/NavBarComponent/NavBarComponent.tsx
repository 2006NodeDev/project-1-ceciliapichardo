import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { LogOutComponent } from '../LogOutComponent/LogOutComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxHeight: 3,
      backgroundColor: '#ff5722', //top of toolbar
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    toolbar: {
      minHeight: 10, //height of toolbar
      alignItems: 'flex-start',
      paddingTop: 50,//theme.spacing(1),
      paddingBottom: 5,//theme.spacing(1),
      backgroundColor: '#fbe9e7',
      color: 'black',
      borderBottom: 'dashed',
      borderBottomColor: '#ff5722',
    },
    title: {
      flexGrow: 1,
      fontFamily: 'Arial Black, Arial Bold, Gadget, sansSerif',
      fontVariant: 'small-caps',
      fontWeight: 'bold',
      fontSize: '23pt'
    },
  }),
);

//this is the skeleton
export const NavBarComponent: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [auth, setAuth] = React.useState(true);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //we can programmatically build the menu items
  let menuItems = []

  //always have the login item
  menuItems.push(
    <MenuItem onClick={handleClose}><Link to='/login'>Login</Link></MenuItem>,
    <MenuItem onClick={handleClose}><Link to='/new-user'>Create Account</Link></MenuItem>
  )
  if (props.user) {
    menuItems.push(
      <MenuItem onClick={handleClose}><Link to={`/profile/${(props.user) ? props.user.userId : '0'}`}>My Profile</Link></MenuItem>,
      <MenuItem onClick={handleClose}><Link to={`/edit/${(props.user) ? props.user.userId : '0'}`}>Edit Profile</Link></MenuItem>,
      <MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>
      // <MenuItem onClick={handleClose}><Link to={'/location'}>Search By Location</Link></MenuItem>
    )
  }
  // if (props.user && props.user.role.role === 'Admin') {
  //   menuItems.push(<MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>)
  // }

  return (
    <div className={classes.root} >
      <AppBar position="static" >
        <Toolbar className={classes.toolbar} >
          <IconButton
            onClick={handleClick}
            color="inherit" 
            aria-controls="long-menu"
            aria-haspopup="true"
            aria-label="menu">
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch',
              },
            }}
          >
            {menuItems}
          </Menu>
          <Typography align="left" variant="h6" className={classes.title} >
            Puppy Pals
              </Typography>
        </Toolbar>
      </AppBar>
      <LogOutComponent />
    </div>
  );
}