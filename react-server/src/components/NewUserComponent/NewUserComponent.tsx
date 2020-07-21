import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, makeStyles, createStyles, Theme, FormHelperText, Grid, Paper, IconButton } from '@material-ui/core';
import { reactSaveUser } from '../../remote/react-server-api/save-user';
import { toast } from 'react-toastify';
import { User } from '../../models/User';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: '#ff5722',
            borderColor: '#ff5722',
            bottom: 10
        },
        input: {
            display: 'none',
        },
    }),
);

export const NewUserComponent: FunctionComponent<any> = (props) => {
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [confirmPassword, changeConfirmPassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [city, changeCity] = useState('')
    let [state, changeState] = useState('')
    let [dogName, changeDogName] = useState('')
    let [breed, changeBreed] = useState('')
    let [image, changeImage] = useState(undefined)

    const classes = useStyles();

    const updateUsername = (e: any) => {
        e.preventDefault()
        changeUsername(e.currentTarget.value)
    }
    const updatePassword = (e: any) => {
        e.preventDefault()
        changePassword(e.currentTarget.value)
    }
    const updateConfirmPassword = (e: any) => {
        e.preventDefault()
        changeConfirmPassword(e.currentTarget.value)
    }
    const updateEmail = (e: any) => {
        e.preventDefault()
        changeEmail(e.currentTarget.value)
    }
    const updateFirstName = (e: any) => {
        e.preventDefault()
        changeFirstName(e.currentTarget.value)
    }
    const updateLastName = (e: any) => {
        e.preventDefault()
        changeLastName(e.currentTarget.value)
    }
    const updateCity = (e: any) => {
        e.preventDefault()
        changeCity(e.currentTarget.value)
    }
    const updateState = (e: any) => {
        e.preventDefault()
        changeState(e.currentTarget.value)
    }
    const updateDogName = (e: any) => {
        e.preventDefault()
        changeDogName(e.currentTarget.value)
    }
    const updateBreed = (e: any) => {
        e.preventDefault()
        changeBreed(e.currentTarget.value)
    }
    const updateImage = (e: any) => {
        let file: File = e.currentTarget.files[0]// the tag contains an array of files, we want the first and only
        //blast to the past and utiliza an old school FileReader
        let reader = new FileReader()

        //we start an async function on the reader object
        reader.readAsDataURL(file)

        //set a callback function for when the reader finishes
        reader.onload = () => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }
    const submitUser = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('Passwords Do Not Match')
        }
        else {
            let newUser: User = {
                userId: 0,
                username,
                password,
                firstName,
                lastName,
                email,
                city,
                state,
                dogName,
                breed,
                role: { role: 'User', roleId: 2 },
                image
            }
            await reactSaveUser(newUser)
            props.history.push(`/login`)
        }
    }

    return (
        <div>
            <form onSubmit={submitUser}>
                <br /><br /><br /><br /><br /><br />
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <input accept="image/*" alt="Add Profile Picture" className={classes.input} id="icon-button-file" type="file" onChange={updateImage}/>
                    <label htmlFor='icon-button-file'>
                        <IconButton
                            color="default"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <img src={image || ''} width="125" height="160" />

                    <TextField required id="standard-basic" label="Username" value={username} onChange={updateUsername} />
                    <TextField required id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} />
                    <TextField required id="standard-basic" type='password' label="Confirm Password" value={confirmPassword} onChange={updateConfirmPassword} />
                    <TextField required id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName} />
                    <TextField required id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName} />
                    <TextField required id="standard-basic" type='email' label="Email" value={email} onChange={updateEmail} />
                    <TextField required id="standard-basic" label="City" value={city} onChange={updateCity} />
                    <TextField required id="standard-basic" label="State" value={state} onChange={updateState} />
                    <TextField required id="standard-basic" label="Pet Name" value={dogName} onChange={updateDogName} />
                    <TextField required id="standard-basic" label="Breed" value={breed} onChange={updateBreed} />

                </Grid>
                <br /><br />
                <Button type='submit' variant="outlined" className={classes.button}>Register</Button>
            </form>
        </div>
    )
}
