import {Request, Response} from 'express'

import {JwtAdapter, Handler, DataResponse, ErrorCodes} from "../../../shared";
import {AuthRepository, LoginUserDto, RegisterUserDto} from "../../domain";
import {LoginUserUseCaseImpl, RegisterUserUseCaseImpl} from "../../usecases";

export class AuthController {
    // DI
    constructor(
        private readonly authRepository: AuthRepository
    ) {
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        const dataResponse: DataResponse = {
            payload: {},
            status: false,
            message: ''
        }

        if (error) {
            dataResponse.message = error
            return res.status(ErrorCodes.BAD_REQUEST).json(dataResponse)
        }

        if (!registerUserDto) {
            dataResponse.message = 'Internal Server Error'
            return res.status(ErrorCodes.INTERNAL).json(dataResponse)
        }

        new RegisterUserUseCaseImpl(this.authRepository, JwtAdapter.generateToken)
            .execute(registerUserDto)
            .then((data) => {
                dataResponse.payload = data
                dataResponse.status = true
                return res.json(dataResponse)
            })
            .catch((error) => Handler.error(error, res, dataResponse))
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)

        const dataResponse: DataResponse = {
            payload: {},
            status: false,
            message: ''
        }

        if (error) {
            dataResponse.message = error
            return res.status(ErrorCodes.BAD_REQUEST).json(dataResponse)
        }

        if (!loginUserDto) {
            dataResponse.message = 'Internal Server Error'
            return res.status(ErrorCodes.INTERNAL).json(dataResponse)
        }

        new LoginUserUseCaseImpl(this.authRepository, JwtAdapter.generateToken)
            .execute(loginUserDto)
            .then((data) => {
                dataResponse.payload = data
                dataResponse.status = true
                return res.json(dataResponse)
            })
            .catch((error) => Handler.error(error, res, dataResponse))
    }
}
