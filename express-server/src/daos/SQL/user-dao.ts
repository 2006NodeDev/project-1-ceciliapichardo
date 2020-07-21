import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../../models/User";
import { UserInputError } from "../../errors/UserInputError";
import { AuthenticationFailureError } from "../../errors/AuthenticationFailureError";
import { UserNotFoundError } from "../../errors/UserNotFoundError";
import { UserDTOtoUserConverter } from "../../utils/User-DTO-to-User-Converter";

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
        u."city",
        u."state",
        u."dog_name",
        u."breed",
        r."role_id", 
        r."role",
        u."image" from puppy_pals_site.users u
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
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

        let results = await client.query(`insert into puppy_pals_site.users ("username", "password", "first_name", "last_name", "email", "city", "state", "dog_name", "breed", "role", "image")
                                            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning "user_id";`,
            [newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.city, newUser.state, newUser.dogName, newUser.breed, newUser.role.roleId, newUser.image])
        newUser.userId = results.rows[0].user_id
        await client.query('COMMIT;')
        return newUser
    } catch (e) {
        client && client.query('ROLLBACK;')
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
        u."city",
        u."state",
        u."dog_name",
        u."breed",
        r."role_id", 
        r."role",
        u."image" from puppy_pals_site.users u
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
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
        u."city",
        u."state",
        u."dog_name",
        u."breed",
        r."role_id", 
        r."role",
        u."image" from puppy_pals_site.users u
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
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

//Get Users By City & State
export async function getUsersByLocation(city:string, state:string):Promise<User[]> {
    let client: PoolClient
    try {
        client = await connectionPool.connect()
        let results = await client.query(`select u."user_id", 
        u."username", 
        u."password", 
        u."first_name", 
        u."last_name", 
        u."email",
        u."city",
        u."state",
        u."dog_name",
        u."breed",
        r."role_id", 
        r."role",
        u."image" from puppy_pals_site.users u
    left join puppy_pals_site.roles r 
        on u."role" = r."role_id"
    where "city"=$1 and "state"= $2
    order by u.user_id;`, [city,state])
        return results.rows.map(UserDTOtoUserConverter)
    } catch (e) {
        console.log(e);
        throw new Error('Unhandled Error Occured')
    } finally {
        client && client.release()
    }
}

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
            await client.query(`update puppy_pals_site.users set "city" = $1 where "user_id" = $2;`,
                [updatedUserInfo.city, updatedUserInfo.userId])
        }
        if (updatedUserInfo.state) {
            await client.query(`update puppy_pals_site.users set "state" = $1 where "user_id" = $2;`,
                //[stateId, updatedUserInfo.userId])
                [updatedUserInfo.state, updatedUserInfo.userId])
        }
        if (updatedUserInfo.dogName) {
            await client.query(`update puppy_pals_site.users set "dog_name" = $1 where "user_id" = $2;`,
                [updatedUserInfo.dogName, updatedUserInfo.userId])
        }
        if (updatedUserInfo.breed) {
            await client.query(`update puppy_pals_site.users set "breed" = $1 where "user_id" = $2;`,
                [updatedUserInfo.breed, updatedUserInfo.userId])
        }
        if (updatedUserInfo.image) {
            await client.query(`update puppy_pals_site.users set "image" = $1 where "user_id" = $2;`,
                [updatedUserInfo.image, updatedUserInfo.userId])
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

