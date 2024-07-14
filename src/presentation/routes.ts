import {Router} from 'express'
import {AuthRoutes} from '../modules/auth'
import {UserRoutes} from "../modules/users";

export class AppRoutes {
    static get routes(): Router {
        const router = Router()

        // Define your routes here
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/users', UserRoutes.routes)

        return router
    }
}
