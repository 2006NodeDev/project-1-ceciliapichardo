import express, { Request, Response, NextFunction } from 'express'
import { getAllUsers, getUserById, saveAUser, updateUserInfo } from '../daos/user-dao'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { User } from '../models/User'
import { UserInputError } from '../errors/UserInputError'

export const userRouter = express.Router()

//Create New Users
userRouter.post('/', async (req:Request, res:Response, next:NextFunction) => {
    console.log(req.body);
    let { username,
        password,
        firstName,
        lastName,
        email,
        city,
        state,
        //country,
        dogName,
        dogSex,
        breed
        //, role 
    } = req.body
    if(username && password && firstName && lastName && email && city && state && dogName && dogSex && breed) {
        let newUser: User = {
            userId: 0,
            username,
            password,
            firstName,
            lastName,
            email,
            city,
            state,
            country: {
                countryId: 1,
                country: 'USA'
            },
            dogName,
            dogSex,
            breed,
            role: {
                roleId: 2,
                role: 'User'
            }
        }
        try {
            let savedUser = await saveAUser(newUser)
            res.json(savedUser)
        } catch (e) {
            next(e)
        }
    }
    else {        
        next(new UserInputError)
    }
}) 

userRouter.use(authenticationMiddleware) 

//Find All Users 
userRouter.get('/', authorizationMiddleware(['Admin']), async (req:Request, res:Response, next:NextFunction) => { 
    try {
        let allUsers = await getAllUsers()
        res.json(allUsers)
    } catch (e) {
        next(e)
    }
})

//Find Users By Id ***Admin still cant search for themself
userRouter.get('/:id', authorizationMiddleware(['Admin','Current']), async (req:Request, res:Response, next:NextFunction) => {
    let {id} = req.params
    if(isNaN(+id)) {
        res.status(400).send('Id Needs to be a Number')
    }
    else { 
        try {
            let userById = await getUserById(+id)
            res.json(userById)
        } catch (e) {
            next(e)
        }
    }
})

//Update User, we assume that Admin will have access to UserId for each user
userRouter.patch('/', authorizationMiddleware(['Admin']), async (req:Request, res:Response, next:NextFunction) => {
    let { userId,
        username,
        password,
        firstName,
        lastName,
        email,
        city,
        state,
        country,
        dogName,
        dogSex,
        breed,
        role } = req.body
    if(!userId) { //update request must contain a userId
        res.status(400).send('User Updates Require UserId and at Least One Other Field')
    }
    else if(isNaN(+userId)) { //check if userId is valid
        res.status(400).send('Id Needs to be a Number')
    }
    else {
        let updatedUserInfo:User = {
            userId,
            username,
            password,
            firstName,
            lastName,
            email,
            city,
            state,
            country,
            dogName,
            dogSex,
            breed,
            role
        }
        updatedUserInfo.username = username || undefined
        updatedUserInfo.password = password || undefined
        updatedUserInfo.firstName = firstName || undefined
        updatedUserInfo.lastName = lastName || undefined
        updatedUserInfo.email = email || undefined
        updatedUserInfo.city = city || undefined
        updatedUserInfo.state = state || undefined
        updatedUserInfo.dogName = dogName || undefined
        updatedUserInfo.dogSex = dogSex || undefined
        updatedUserInfo.breed = breed || undefined
        //updatedUserInfo.role = role || undefined
        try {
            let result = await updateUserInfo(updatedUserInfo)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
}) 
