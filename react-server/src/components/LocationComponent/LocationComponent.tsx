 import React, { SyntheticEvent, FunctionComponent, useState } from 'react';
// import { getUsersByLocation } from "../../remote/react-server-api/get-users-by-location";
// import { TextField, Theme, InputAdornment, Button, makeStyles, createStyles } from '@material-ui/core';
// import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
// import { RouteComponentProps } from 'react-router';

// interface ILocationProps extends RouteComponentProps {
//     //changeCurrentLocation:(newLocation:any)=>void
//     city: string,
//     state: string
// }

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     margin: {
//       margin: theme.spacing(1),
//     },
//     button: {
//         color: '#ff5722',
//         borderColor: '#ff5722'
//     },
//   }),
// );

// export const UsersByLocationComponent:FunctionComponent<ILocationProps> = (props) => {
//     const classes = useStyles();

//     const [city, changeCity] = useState('')
//     const [state, changeState] = useState('')

//     const updateCity = (event:any) => {
//         event.preventDefault()
//         changeCity(event.currentTarget.value)
//     }

//     const updateState = (event:any) => {
//         event.preventDefault()
//         changeState(event.currentTarget.value)
//     }

//     const locationSubmit = async (e:SyntheticEvent) => {
//         e.preventDefault()
//        let res = await getUsersByLocation(city, state)
//         //props.changeCurrentLocation(res)
//         //changePassword('')
//         //props.history.push(`/location`)
//     }

//     return (
//         <div> <br/><br/><br/><br/><br/><br/><br/>
//             {/* by default the submit event in a form tries to send a get request to the href value in the form */}
//             <form autoComplete="off" onSubmit={locationSubmit}>
//                 {/*<TextField id="standard-basic" label="Username" value={username} onChange={updateUsername}/>
//                 <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} />
//                 <Button type='submit' variant="contained" color="primary">Login</Button> */}
//                 <TextField
//                     className={classes.margin}
//                     required
//                     id="input-with-icon-textfield"
//                     label="City"
//                     value={city} 
//                     onChange={updateCity}
//                     InputProps={{
//                         startAdornment: (
//                         <InputAdornment position="start">
//                             <LocationSearchingIcon/>
//                         </InputAdornment>
//                         ),
//                     }}
//                 /> <br/>
//                 <TextField
//                     className={classes.margin}
//                     required
//                     id="input-with-icon-textfield"
//                     label="State"
//                     value={state}
//                     onChange={updateState}
//                     InputProps={{
//                         startAdornment: (
//                         <InputAdornment position="start">
//                             <LocationSearchingIcon/>
//                         </InputAdornment>
//                         ),
//                     }} 
//                 /> <br/> <br/>
//                 <Button type='submit' variant="outlined" className={classes.button}>Search</Button>
//             </form>
//             <br/>
//         </div>
//     )
// }
