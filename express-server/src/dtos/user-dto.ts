//Representation of User data from database

export class UserDTO {
    user_id: number
	username: string
	password: string
	first_name: string
	last_name: string
    email: string
    city: string
    state: string
    dog_name: string
    breed: string
    role_id: number
    role: string
    image?: string
}