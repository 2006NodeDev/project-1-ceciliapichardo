import { reactClient } from "."


export const getAllUsers = async () => {
    try {
        let response = await reactClient.get('/users')
        return response.data
    } catch (e) {
        console.log(e);
        console.log('we should probably handle this');
    }
}