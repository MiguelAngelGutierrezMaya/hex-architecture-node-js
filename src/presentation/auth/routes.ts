import {Router} from 'express'
import {AuthController} from './controller'
import {AuthDatasourceImplementation, AuthRepositoryImplementation} from "../../infrastructure";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router()

        const database = new AuthDatasourceImplementation()
        const authRepository = new AuthRepositoryImplementation(database)

        const controller = new AuthController(authRepository)

        // Define your routes here
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        return router
    }
}
