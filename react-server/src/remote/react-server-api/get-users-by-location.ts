import { reactClient } from "."


export const getUsersByLocation = async (city:string, state:string) => {
    let location = {
        city,
        state
    }
    try {
        let response = await reactClient.post('/location', location)
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e);
        throw(e)
    }
    
}