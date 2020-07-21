import React, { FunctionComponent, useState, useEffect } from 'react';
import { User } from '../../models/User';
import { useParams} from 'react-router-dom'
import { getUserById } from '../../remote/react-server-api/get-user-by-id';
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent';


export const ProfileComponent:FunctionComponent<any> =  (props) => {
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
    })
    
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