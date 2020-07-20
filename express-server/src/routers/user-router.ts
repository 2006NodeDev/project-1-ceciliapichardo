import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
import { User } from '../models/User'
import { UserInputError } from '../errors/UserInputError'
import { saveNewUserService, getUserByIdService, getAllUsersService, updateUserService, getUsersByLocationService } from '../services/user-service'

export const userRouter = express.Router()

//Create New Users
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    let { username,
        password,
        firstName,
        lastName,
        email,
        city,
        state,
        dogName,
        //dogSex,
        breed,
        image } = req.body
    if (username && password && firstName && lastName && email && city && state && dogName /*&& dogSex*/ && breed) {
        let newUser: User = {
            userId: 0,
            username,
            password,
            firstName,
            lastName,
            email,
            city,
            state,
            //country: {
            //    country: 'USA',
            //    countryId: 1
            //},
            dogName,
            //dogSex,
            breed,
            role: {
                role: 'User',
                roleId: 2
            },
            image
        }
        newUser.image = image || undefined
        try {
            let savedUser = await saveNewUserService(newUser)
            res.json(savedUser)
        } catch (e) {
            next(e)
        }
    }
    else {
        next(new UserInputError)
    }
})

//Update User, we assume that Admin will have access to UserId for each user
//*** have to change this to for only Current users to change their own profiles, maybe with username instead of userId?
// 'Admin'
userRouter.patch('/', async (req: Request, res: Response, next: NextFunction) => {
    let { userId,
        username,
        password,
        firstName,
        lastName,
        email,
        city,
        state,
        //country,
        dogName,
        //dogSex,
        breed,
        role,
        image } = req.body
    if (!userId) { //update request must contain a userId
        res.status(400).send('User Updates Require UserId and at Least One Other Field')
    }
    else if (isNaN(+userId)) { //check if userId is valid
        res.status(400).send('Id Needs to be a Number')
    }
    else {
        let updatedUserInfo: User = {
            userId,
            username,
            password,
            firstName,
            lastName,
            email,
            city,
            state,
            //country,
            dogName,
            //dogSex,
            breed,
            role,
            image
        }
        updatedUserInfo.username = username || undefined
        updatedUserInfo.password = password || undefined
        updatedUserInfo.firstName = firstName || undefined
        updatedUserInfo.lastName = lastName || undefined
        updatedUserInfo.email = email || undefined
        updatedUserInfo.city = city || undefined
        updatedUserInfo.state = state || undefined
        updatedUserInfo.dogName = dogName || undefined
        //updatedUserInfo.dogSex = dogSex || undefined
        updatedUserInfo.breed = breed || undefined
        updatedUserInfo.image = image || undefined
        //updatedUserInfo.role = role || undefined
        try {
            let result = await updateUserService(updatedUserInfo)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
})

//Get Users By City & State
userRouter.post('/location', async (req:Request, res:Response, next:NextFunction) => {
    let { city, state } = req.body
    if (!city || !state) {
        res.status(400).send('City and State are required')
    }
    else {
        try {
            let usersByLocation = await getUsersByLocationService(city,state)
            res.json(usersByLocation)
        } catch (e) {
            next(e)
        }
    }
})

userRouter.use(authenticationMiddleware)

//Find All Users 
userRouter.get('/', authorizationMiddleware(['Admin']), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let allUsers = await getAllUsersService()
        res.json(allUsers)
    } catch (e) {
        next(e)
    }
})

//Find Users By Id ***Admin still cant search for themself, 
//might be okay for this project since searching for other users is not mandatory 
//'Admin',
userRouter.get('/:id', authorizationMiddleware(['Current']), async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    if (isNaN(+id)) {
        res.status(400).send('Id Needs to be a Number')
    }
    else {
        try {
            let userById = await getUserByIdService(+id)
            res.json(userById)
        } catch (e) {
            next(e)
        }
    }
})


//Get Users By Breed

