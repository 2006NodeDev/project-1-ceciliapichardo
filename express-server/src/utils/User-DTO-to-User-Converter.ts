import { UserDTO } from "../dtos/user-dto";
import { User } from "../models/User";

//UserDTO takes objects in database format and converts it to User model object
export function UserDTOtoUserConverter(udto: UserDTO): User {
    return {
        userId: udto.user_id,
        username: udto.username,
        password: udto.password,
        firstName: udto.first_name,
        lastName: udto.last_name,
        email: udto.email,
        city: udto.city,
        state: udto.state,
        dogName: udto.dog_name,
        breed: udto.breed,
        /*city: {
            city: udto.city,
            cityId: udto.city_id,
        },
        state: {
            state: udto.state,
            stateId: udto.state_id,
        }, 
        country: {
            country: udto.country,
            countryId: udto.country_id
        }, */
        /*dogName: udto.dog_name,
        dogSex: {
            dogSex: udto.dog_sex,
            sexId: udto.sex_id
        },
        breed: {
            breed: udto.breed,
            breedId: udto.breed_id
        }, */
        role: {
            role: udto.role,
            roleId: udto.role_id
        },
        image:udto.image
    }
}