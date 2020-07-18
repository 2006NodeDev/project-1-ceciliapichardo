import { reactClient } from "."


export const reactLogin = async (username:string, password:string) => {
    let credentials = {
        username,
        password
    }
    try {
        let response = await reactClient.post('/login', credentials)
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e);
        throw(e)
    }
    
}