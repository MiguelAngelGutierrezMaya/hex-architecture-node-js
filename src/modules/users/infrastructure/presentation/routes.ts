import {Router} from 'express'
import {UserController} from './controller'

import {UserMapper} from "../../../shared";
import {UserMiddleware} from "./middlewares";
import {MongoDatasourceImplementation} from "../datasources";
import {UserRepositoryImplementation} from "../repositories";

export class UserRoutes {
    static get routes(): Router {
        const router = Router()

        const userMapper = UserMapper.userEntityFromObject

        const database = new MongoDatasourceImplementation(
            userMapper
        )
        const userRepository = new UserRepositoryImplementation(database)

        const controller = new UserController(userRepository)

        // Define your routes here
        router.get('/', UserMiddleware.validateJWT, controller.getUsers)

        return router
    }
}
