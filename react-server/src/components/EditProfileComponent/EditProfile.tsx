import React, { FunctionComponent, useState, SyntheticEvent } from 'react';
import { User } from '../../models/User';
import { Grid, TextField, Button } from '@material-ui/core';
import { useParams } from 'react-router';
import { editUser } from '../../remote/react-server-api/edit-user';

interface EditUserProps {
    user: User | null
}
//export const EditProfile: FunctionComponent<EditUserProps> = (props) => {
export const EditProfile: FunctionComponent<any> = (props) => {
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    const {userId} = useParams()//come from match.params which is provided by router
    let [username, changeUsername] = useState('')
    let [password, changePassword] = useState('')
    let [firstName, changeFirstName] = useState('')
    let [lastName, changeLastName] = useState('')
    let [email, changeEmail] = useState('')
    let [city, changeCity] = useState('')
    let [state, changeState] = useState('')
    let [dogName, changeDogName] = useState('')
    let [breed, changeBreed] = useState('')
    let [image, changeImage] = useState(undefined)

    const updateUsername = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeUsername(e.currentTarget.value)
        }
        else {
            changeUsername(props.user.username)
        }
    }
    const updatePassword = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changePassword(e.currentTarget.value)
        }
        else {
            changePassword(e.currentTarget.password)
        }
    }
    const updateFirstName = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeFirstName(e.currentTarget.value)
        }
        else {
            changeFirstName(e.currentTarget.firstName)
        }
    }
    const updateLastName = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeLastName(e.currentTarget.value)
        }
        else {
            changeLastName(e.currentTarget.lastName)
        }
    }
    const updateEmail = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeEmail(e.currentTarget.value)
        }
        else {
            changeEmail(e.currentTarget.email)
        }
    }
    const updateCity = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeCity(e.currentTarget.value)
        }
        else {
            changeCity(e.currentTarget.city)
        }
    }
    const updateState = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeState(e.currentTarget.value)
        }
        else {
            changeState(e.currentTarget.state)
        }
    }
    const updateDogName = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeDogName(e.currentTarget.value)
        }
        else {
            changeDogName(e.currentTarget.dogName)
        }
    }
    const updateBreed = (e: any) => {
        e.preventDefault()
        if (e.currentTarget.value !== undefined) {
            changeBreed(e.currentTarget.value)
        }
        else {
            changeBreed(e.currentTarget.breed)
        }
    }
    const updateImage = (e: any) => {
        let file: File = e.currentTarget.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            console.log(reader.result)
            changeImage(reader.result)
        }
    }
    
    const updateUser = async (e: SyntheticEvent) => {
        e.preventDefault()
        
        let updatedUser: User = { //*** not sure why this id isnt working */
            userId: props.user.userId, //userProfile.userId,
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
        try { 
            await editUser(updatedUser)
            console.log(updatedUser);
            
        //props.history.push(`/profile/${userId}`)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form onSubmit={updateUser}>
                <br /><br /><br /><br /><br /><br />
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <TextField id="standard-basic" label="Username" value={username} onChange={updateUsername} />
                    <TextField id="standard-basic" type='password' label="Password" value={password} onChange={updatePassword} />
                    <TextField id="standard-basic" label="First Name" value={firstName} onChange={updateFirstName} />
                    <TextField id="standard-basic" label="Last Name" value={lastName} onChange={updateLastName} />
                    <TextField id="standard-basic" type='email' label="Email" value={email} onChange={updateEmail} />
                    <TextField id="standard-basic" label="City" value={city} onChange={updateCity} />
                    <TextField id="standard-basic" label="State" value={state} onChange={updateState} />
                    <TextField id="standard-basic" label="Dog Name" value={dogName} onChange={updateDogName} />
                    <TextField id="standard-basic" label="Breed" value={breed} onChange={updateBreed} />
                </Grid>
                <br /><br />
                <label htmlFor='file'>Profile Pic</label>
                <input type='file' name='file' accept='image/*' onChange={updateImage} />
                <img src={image || ''} alt='' /> <br /> {/****this needs restrictions */}
                <br /><br />
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    );
}