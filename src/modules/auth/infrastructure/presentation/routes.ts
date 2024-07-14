import {Router} from 'express'
import {AuthController} from './controller'
import {UserMapper, BcryptAdapter} from "../../../shared";
import {MongoDatasourceImplementation} from "../datasources";
import {AuthRepositoryImplementation} from "../repositories";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router()

        const passwordHasher = BcryptAdapter.hash
        const passwordComparer = BcryptAdapter.compare
        const userMapper = UserMapper.userEntityFromObject

        const database = new MongoDatasourceImplementation(
            passwordHasher,
            passwordComparer,
            userMapper
        )
        const authRepository = new AuthRepositoryImplementation(database)

        const controller = new AuthController(authRepository)

        // Define your routes here
        router.post('/login', controller.loginUser)
        router.post('/register', controller.registerUser)

        return router
    }
}
