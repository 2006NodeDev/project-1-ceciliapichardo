import { Role } from "./Role";
import { City } from "./City";
import { State } from "./State";
import { Country } from "./Country";
import { SexOfDog } from "./SexOfDog";
import { Breed } from "./Breed";

export interface User {
    userId: number
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    city: string
    state: string
    dogName: string
    breed: string
    //city: City
    //state: State
    //country: Country
    //dogSex: SexOfDog
    //breed: Breed
    role: Role
    image?: string
}