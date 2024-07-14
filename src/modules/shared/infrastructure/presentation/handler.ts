import {Response} from "express";
import {CustomError, DataResponse, ErrorCodes} from "../../domain";

export class Handler {
    static error = (error: unknown, res: Response, dataResponse: DataResponse) => {
        if (error instanceof CustomError) {
            dataResponse.message = error.message
            return res.status(error.statusCode).json(dataResponse)
        }

        console.error(error) // log the error for debugging

        dataResponse.message = 'Internal Server Error'
        return res.status(ErrorCodes.INTERNAL).json(dataResponse)
    }
}