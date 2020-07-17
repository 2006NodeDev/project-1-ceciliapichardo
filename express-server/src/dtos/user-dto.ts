//Representation of User data from database

export class UserDTO {
    user_id: number
	username: string
	password: string
	first_name: string
	last_name: string
    email: string
    city_id: number
    city: string
    state_id: number
    state: string
    country_id: number
    country: string
    dog_name: string
    sex_id: number
    dog_sex: string
    breed_id: number
    breed: string
    role_id: number
    role: string
    image?: string
}