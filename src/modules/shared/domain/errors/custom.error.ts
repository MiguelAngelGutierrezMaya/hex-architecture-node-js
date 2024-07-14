import {ErrorCodes} from "./code.error";

export class CustomError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {
        super(message);
    }

    static badRequest(message: string): CustomError {
        return new CustomError(message, ErrorCodes.BAD_REQUEST);
    }

    static unauthorized(message: string): CustomError {
        return new CustomError(message, ErrorCodes.UNAUTHORIZED);
    }

    static forbidden(message: string): CustomError {
        return new CustomError(message, ErrorCodes.FORBIDDEN);
    }

    static notFound(message: string): CustomError {
        return new CustomError(message, ErrorCodes.NOT_FOUND);
    }

    static conflict(message: string): CustomError {
        return new CustomError(message, ErrorCodes.CONFLICT);
    }

    static internal(message: string = 'Internal Server Error'): CustomError {
        return new CustomError(message, ErrorCodes.INTERNAL);
    }

    static serviceUnavailable(message: string): CustomError {
        return new CustomError(message, ErrorCodes.SERVICE_UNAVAILABLE);
    }

    static customError(message: string, statusCode: number): CustomError {
        return new CustomError(message, statusCode);
    }
}


