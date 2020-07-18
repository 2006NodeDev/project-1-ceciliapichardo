// this component will be on the path /profile/idnumber
//we will use that id number to send a request to the api to get that user
//we will pass that user into a user display component
import React, { FunctionComponent, useState, useEffect } from 'react';
import { User } from '../../models/User';
import { useParams} from 'react-router-dom'
import { getUserById } from '../../remote/react-server-api/get-user-by-id';
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent';
import { LoginComponent } from '../LoginComponent/LoginComponent';


export const ProfileComponent:FunctionComponent<any> =  (props)=>{
    let [userProfile, changeUserProfile] = useState<null | User>(null)
    let {userId} = useParams()//come from match.params which is provided by router

    // this will run after every single render
    useEffect(()=>{
        //we define an async operation we want to run
        let getUser = async ()=>{
            //we await user info and then call a state update function with it
            let userInfo = await getUserById(userId)
            changeUserProfile(userInfo)
        }
        //if we haven't gotten a user profile yet
        if(!userProfile || userProfile.userId !== +userId){
            //go get the user
            getUser()
        }
        //else do nothing
    })
    

    //how do I do async stuff in a component?
    //especially becasue we rely on the request for the component to work

    return (
        (userProfile) ?
        <UserDisplayComponent user={userProfile} />
        :
        <div>
            <h3>User Not Found</h3>
            {/* Redirect to Login <LoginComponent></LoginComponent> */}
        </div>
    )
}