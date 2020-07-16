import { reactClient } from "."
import { User } from "../../models/User"


export const reactSaveUser = async (newUser:User) => {
    
    try {
        let response = await reactClient.post('/users', newUser)
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e);
        
    }
    
}