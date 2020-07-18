import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {Link} from 'react-router-dom'
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      //minHeight: 0,
      maxHeight: 3,
      backgroundColor: '#ff5722' //top of toolbar
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    toolbar: {
        minHeight: 10, //height of toolbar
        alignItems: 'flex-start',
        paddingTop: 15,//theme.spacing(1),
        //paddingBottom: 0,//theme.spacing(1),
        backgroundColor: '#fbe9e7',
        color: 'black',
    },
    title: {
      flexGrow: 1,
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
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
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
    if(props.user){
        //if they are logged in, add the other items
        menuItems.push(
        <MenuItem onClick={handleClose}><Link to='/title'>Title</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/profile/${ (props.user) ? props.user.userId : '0' }`}>My Profile</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to={`/edit/${ (props.user) ? props.user.userId : '0' }`}>Edit Profile</Link></MenuItem>
        )
    }
    if(props.user && props.user.role.role === 'Admin'){
        menuItems.push(<MenuItem onClick={handleClose}><Link to='/users'>All Users</Link></MenuItem>)
    }

    return (
        <div className={classes.root} >
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
              label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>

          <AppBar position="static" >
            <Toolbar className={classes.toolbar} >
              <IconButton  edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography align="left" variant="h6" className={classes.title} >
                Puppy Pals
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  > 
                    {menuItems}
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
    );
    /*
    return (
        <nav>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
                    <Typography variant="h6" className={classes.title}>
                        Project 1
                    </Typography>
                </Toolbar>
            </AppBar>
        </nav>
    ) */
}