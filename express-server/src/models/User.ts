import { Role } from "./Role"
import { City } from "./City"
import { SexOfDog } from "./SexOfDog"
import { Breed } from "./Breed"
import { State } from "./State"
import { Country } from "./Country"

export class User {
    userId: number //primary key
    username: string //not null, unique
    password: string //not null
    firstName: string //not null
    lastName: string //not null
    email: string //not null
    city: City
    state: State
    country: Country
    dogName: string
    dogSex: SexOfDog
    breed: Breed
    role: Role //not null
    image?: string
}