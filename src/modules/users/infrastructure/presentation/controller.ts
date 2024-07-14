import {Request, Response} from 'express'

import {DataResponse, ErrorCodes, Handler} from "../../../shared";
import {GetUsersDto, UserRepository} from "../../domain";
import {GetUsersUseCaseImpl} from "../../usecases";

export class UserController {
    // DI
    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    getUsers = (req: Request, res: Response) => {
        const [error, getUsersDto] = GetUsersDto.create(req.query)

        const dataResponse: DataResponse = {
            payload: {},
            status: false,
            message: ''
        }

        if (error) {
            dataResponse.message = error
            return res.status(ErrorCodes.BAD_REQUEST).json(dataResponse)
        }

        if (!getUsersDto) {
            dataResponse.message = 'Internal Server Error'
            return res.status(ErrorCodes.INTERNAL).json(dataResponse)
        }

        new GetUsersUseCaseImpl(this.userRepository)
            .execute(getUsersDto)
            .then((data) => {
                dataResponse.payload = {users: data}
                dataResponse.status = true
                return res.json(dataResponse)
            })
            .catch((error) => Handler.error(error, res, dataResponse))
    }
}
