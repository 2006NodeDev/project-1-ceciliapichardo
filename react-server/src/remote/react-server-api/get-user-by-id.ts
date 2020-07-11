import { reactClient } from "."


export const getUserById = async (userId:number) => {
    try {
        let response = await reactClient.get(`/users/${userId}`)
        return response.data
    } catch (e) {
        console.log(e);
        console.log('we should probably handle this');
    }
}