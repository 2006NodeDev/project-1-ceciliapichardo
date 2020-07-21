import { loginWithUsernameAndPassword, getAllUsers, getUserById, saveAUser, updateUserInfo, getUsersByLocation } from "../daos/SQL/user-dao"
import { User } from "../models/User"
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images"
import { bucketBaseUrl } from "../daos/Cloud-Storage"
import { customExpressEvents, expressEventEmitter } from "../event-listeners"
//calls the dao

//Login a User
export async function loginWithUsernameAndPasswordService(username: string, password: string): Promise<User> {
    return await loginWithUsernameAndPassword(username, password)
}

//Find All Users 
export async function getAllUsersService(): Promise<User[]> {
    return await getAllUsers()
}

//Find Users by Id
export async function getUserByIdService(userId: number): Promise<User> {
    return await getUserById(userId)
}

//Find Users by City & State
export async function getUsersByLocationService(city:string, state:string): Promise<User[]> {
    return await getUsersByLocation(city,state)
}

//Create New Users
export async function saveNewUserService(newUser: User): Promise<User> {
    //two major process to manage in this function
    try {
        let base64Image = newUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')// gets us the two important parts of the base 64 string
        //we need to make sure picture is in the right format
        let contentType = dataType.split('/').pop()// split our string that looks like data:image/ext into ['data:image' , 'ext']
        //then the pop method gets us the last thing in the array
        //we need to add the picture path to the user data in the sql database
        if (newUser.image) {
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }
        //we need to save new user data to the sql database
        let savedUser = await saveAUser(newUser)

        //we need to save a picture to cloud storage 

        //we should probably make sure that username has no spaces in it or that we replace them with -
        await saveProfilePicture(contentType, imageBase64Data, `users/${newUser.username}/profile.${contentType}`)
        //with event driven design after I completed the save a user process
        //I send an event saying tis done with the relevent info
        expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        return savedUser
    } catch (e) {
        console.log(e)
        throw e
    }

    //if we can't save the user in the db, don't save the picture
    //if we do save the user and the picture save fails - pretend that nothing happened ( you should probably update the user to set the image to null)
}

//Update User
export async function updateUserService(updatedUser: User): Promise<User> {
    try {
        let base64Image = updatedUser.image
        let [dataType, imageBase64Data] = base64Image.split(';base64,')
        let contentType = dataType.split('/').pop()

        if (updatedUser.image) {
            updatedUser.image = `${bucketBaseUrl}/users/${updatedUser.username}/profile.${contentType}`
        }
        //we need to save new user data to the sql database
        let updatedUserInfo = await updateUserInfo(updatedUser)
        await saveProfilePicture(contentType, imageBase64Data, `users/${updatedUser.username}/profile.${contentType}`)

        return updatedUserInfo
    } catch (e) {
        console.log(e);
        throw e
    }
}
