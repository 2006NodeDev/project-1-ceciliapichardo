import { Role } from "./Role"

export class User {
    userId: number //primary key
    username: string //not null, unique
    password: string //not null
    firstName: string //not null
    lastName: string //not null
    email: string //not null
    city: string
    state: string
    dogName: string
    breed: string
    role: Role //not null
    image?: string
}