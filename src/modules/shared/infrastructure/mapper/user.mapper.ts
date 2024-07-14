import {CustomError, User} from "../../domain";

export class UserMapper {
    static userEntityFromObject(obj: { [key: string]: any }): User {
        const {id, _id, name, email, password, roles, img} = obj;

        if (!id && !_id) {
            throw CustomError.badRequest('User ID is required')
        }

        if (!name) {
            throw CustomError.badRequest('User name is required')
        }

        if (!email) {
            throw CustomError.badRequest('User email is required')
        }

        if (!password) {
            throw CustomError.badRequest('User password is required')
        }

        if (!roles || roles.length === 0) {
            throw CustomError.badRequest('User roles is required')
        }

        return new User(_id || id, name, email, password, roles, img);
    }
}