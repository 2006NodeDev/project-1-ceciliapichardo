import { reactClient } from "."
import { User } from "../../models/User";

export const editUser = async (updatedUser:User) => {
    try {
        let res = await reactClient.patch('/users', updatedUser)
        console.log(res);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}