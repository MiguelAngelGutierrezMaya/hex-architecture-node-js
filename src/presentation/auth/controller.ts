import {Request, Response} from 'express'
import {AuthRepository, RegisterUserDto, User} from '../../domain'

export class AuthController {
    // DI
    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) {
            return res.status(400).json({message: error})
        }

        this.authRepository.register(registerUserDto!)
            .then((user: User) => res.json(user))
            .catch((error) => {
                console.error(error)
                res.status(500).json({message: 'Internal Server Error'})
            })
    }

    loginUser = (req: Request, res: Response) => {
        res.json({message: 'Hello, World! login'})
    }
}
