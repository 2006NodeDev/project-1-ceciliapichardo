import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../models/User";
import { UserInputError } from "../errors/UserInputError";
import { AuthenticationFailureError } from "../errors/AuthenticationFailureError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { UserDTOtoUserConverter } from "../utils/User-DTO-to-User-Converter";

//Find All Users
export async function getAllUsers(): Promise<User[]> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        u."email",
        c."city_id",
        c."city",
        s."state_id",
        s."state",
        c2."country_id",
        c2."country",
        u."dog_name",
        sod."sex_id",
        sod."dog_sex",
        db."breed_id",
        db."breed",
        r."role_id", 
        r."role" from puppy_pals_site.users u
    left join puppy_pals_site.sex_of_dog sod 
        on u."dog_sex" = sod."sex_id"
    left join puppy_pals_site.dog_breeds db
        on u."breed" = db."breed_id"
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
    left join puppy_pals_site.cities c
        on u."city" = c."city_id"
    left join puppy_pals_site.states s
        on u."state" = s."state_id"
    left join puppy_pals_site.countries c2
        on u."country" = c2."country_id"
    order by u.user_id;`)
        return results.rows.map(UserDTOtoUserConverter)
    } catch (e) {
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//Create New Users
export async function saveAUser(newUser: User): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        let city = await client.query(`select c."city_id" from puppy_pals_site.cities c where c."city" = $1;`, [newUser.city]) //check if city exists
        let cityId = city.rows[0].city_id
        //console.log(cityId);
        
        if (city.rowCount === 0) {

            city = await client.query(`insert into puppy_pals_site.cities  ("city") values ($1) returning "city_id";`, [newUser.city]) //if not, insert it and return city_id
            
            cityId = city.rows[0].city_id
            //console.log(cityId);
            
            if(cityId.rowCount === 0) {
                throw new Error('City Not Found')
            }
        }
        let state = await client.query(`select s."state_id" from puppy_pals_site.states s where "state" = $1;`, [newUser.state]) //select state_id from table
        let stateId = state.rows[0].state_id
        //console.log(stateId);
        
        if (stateId.rowCount === 0) {
            throw new Error('State Not Found')
        }
        let dogSex = await client.query(`select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1;`, [newUser.dogSex]) //select sex_id from table
        let dogSexId = dogSex.rows[0].sex_id
        //console.log(dogSexId);
        
        if (dogSexId === 0) {
            throw new Error('Sex Not Found')
        }
            //***not working
        let breed = await client.query(`select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = $1;`, [newUser.breed]) //check if breed exists
        let breedId = breed.rows[0].breed_id;
        //console.log(breedId);
        
        if (breed.rowCount === 0) {
            breed = await client.query(`insert into puppy_pals_site.dog_breeds ("breed") values ($1) returning "breed_id";`, [newUser.breed]) //if not, insert it and return breed_id

            breedId = breed.rows[0].breed_id;
            //console.log(breedId);

            if (breedId.rowCount === 0) {
                throw new Error('Breed Not Found')
            }
        }   //Finally create New User
        let results = await client.query(`insert into puppy_pals_site.users ("username", "password", "first_name", "last_name", "email", "city", "state", "country", "dog_name", "dog_sex", "breed", "role")
                                            values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning "user_id";`,
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, cityId, stateId, newUser.country.countryId, newUser.dogName, dogSexId, breedId, newUser.role.roleId])
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        return newUser
    } catch (e) {
        client && client.query('ROLLBACK;')
        if (e.message === 'City Not Found' || e.message === 'State Not Found' && e.message === 'Sex Not Found' || e.message === 'Breed Not Found') {
            throw new UserInputError()
        }
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//Login a User
export async function loginWithUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        u."email",
        c."city_id",
        c."city",
        s."state_id",
        s."state",
        c2."country_id",
        c2."country",
        u."dog_name",
        sod."sex_id",
        sod."dog_sex",
        db."breed_id",
        db."breed",
        r."role_id", 
        r."role" from puppy_pals_site.users u
    left join puppy_pals_site.sex_of_dog sod 
        on u."dog_sex" = sod."sex_id"
    left join puppy_pals_site.dog_breeds db
        on u."breed" = db."breed_id"
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
    left join puppy_pals_site.cities c
        on u."city" = c."city_id"
    left join puppy_pals_site.states s
        on u."state" = s."state_id"
    left join puppy_pals_site.countries c2
        on u."country" = c2."country_id"
    where u."username" = $1 
        and u."password" = $2;`,
            [username, password])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConverter(results.rows[0])
    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new AuthenticationFailureError()
        }
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//Find User by Id
export async function getUserById(id: number): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        u."email",
        c."city_id",
        c."city",
        s."state_id",
        s."state",
        c2."country_id",
        c2."country",
        u."dog_name",
        sod."sex_id",
        sod."dog_sex",
        db."breed_id",
        db."breed",
        r."role_id", 
        r."role" from puppy_pals_site.users u
    left join puppy_pals_site.sex_of_dog sod 
        on u."dog_sex" = sod."sex_id"
    left join puppy_pals_site.dog_breeds db
        on u."breed" = db."breed_id"
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
    left join puppy_pals_site.cities c
        on u."city" = c."city_id"
    left join puppy_pals_site.states s
        on u."state" = s."state_id"
    left join puppy_pals_site.countries c2
        on u."country" = c2."country_id"
        where u."user_id" = $1;`, [id])
        if (results.rowCount === 0) {
            throw new Error('User Not Found')
        }
        return UserDTOtoUserConverter(results.rows[0]) //should only be one row with the user corresponding to ID
    } catch (e) {
        if (e.message === 'User Not Found') {
            throw new UserNotFoundError()
        }
        //For errors we don't recognize
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

//Get Users By City

//Get Users By State

//Get Users By Breed


//Update User Info
export async function updateUserInfo(updatedUserInfo: User): Promise<User> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        await client.query('BEGIN;')

        if (updatedUserInfo.username) {
            await client.query(`update puppy_pals_site.users set "username" = $1 where "user_id" = $2;`,
                [updatedUserInfo.username, updatedUserInfo.userId])
        }
        if (updatedUserInfo.password) {
            await client.query(`update puppy_pals_site.users set "password" = $1 where "user_id" = $2;`,
                [updatedUserInfo.password, updatedUserInfo.userId])
        }
        if (updatedUserInfo.firstName) {
            await client.query(`update puppy_pals_site.users set "first_name" = $1 where "user_id" = $2;`,
                [updatedUserInfo.firstName, updatedUserInfo.userId])
        }
        if (updatedUserInfo.lastName) {
            await client.query(`update puppy_pals_site.users set "last_name" = $1 where "user_id" = $2;`,
                [updatedUserInfo.lastName, updatedUserInfo.userId])
        }
        if (updatedUserInfo.email) {
            await client.query(`update puppy_pals_site.users set "email" = $1 where "user_id" = $2;`,
                [updatedUserInfo.email, updatedUserInfo.userId])
        }
        if (updatedUserInfo.city) {
            let cityId = await client.query(`select c."city_id" from puppy_pals_site.cities c where c."city" = $1;`,
                [updatedUserInfo.city])
            if (cityId.rowCount === 0) {
                throw new Error('City Not Found')
            }
            cityId = cityId.rows[0].city_id
            await client.query(`update puppy_pals_site.users set "city" = $1 where "user_id" = $2;`,
                [cityId, updatedUserInfo.userId])
        }
        if (updatedUserInfo.state) {
            let stateId = await client.query(`select s."state_id" from puppy_pals_site.states s where s."state" = $1;`,
                [updatedUserInfo.state])
            if (stateId.rowCount === 0) {
                throw new Error('State Not Found')
            }
            stateId = stateId.rows[0].state_id
            await client.query(`update puppy_pals_site.users set "state" = $1 where "user_id" = $2;`,
                [stateId, updatedUserInfo.userId])
        }
        if (updatedUserInfo.dogName) {
            await client.query(`update puppy_pals_site.users set "dog_name" = $1 where "user_id" = $2;`,
                [updatedUserInfo.dogName, updatedUserInfo.userId])
        }
        if (updatedUserInfo.dogSex) {
            let sexId = await client.query(`select sod."sex_id" from puppy_pals_site.sex_of_dog sod where sod."dog_sex" = $1;`,
                [updatedUserInfo.dogSex])
            if (sexId.rowCount === 0) {
                throw new Error('Sex Not Found')
            }
            sexId = sexId.rows[0].sex_id
            await client.query(`update puppy_pals_site.users set "dog_sex" = $1 where "user_id" = $2;`,
                [sexId, updatedUserInfo.userId])
        }
        if (updatedUserInfo.breed) {
            let breedId = await client.query(`select db."breed_id" from puppy_pals_site.dog_breeds db where db."breed" = $1;`,
                [updatedUserInfo.breed])
            if (breedId.rowCount === 0) {
                throw new Error('Breed Not Found')
            }
            breedId = breedId.rows[0].breed_id
            await client.query(`update puppy_pals_site.users set "breed" = $1 where "user_id" = $2;`,
                [breedId, updatedUserInfo.userId])
        }

        await client.query('COMMIT;')
        return updatedUserInfo
    } catch (e) {
        client && client.query('ROLLBACK;')
        if (e.message === 'Role Not Found') {
            throw new UserInputError()
        }
        console.log(e);
        throw new Error('Unhandled Error')
    } finally {
        client && client.release()
    }
}
