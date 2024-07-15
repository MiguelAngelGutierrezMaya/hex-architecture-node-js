import {AuthDatasource, LoginUserDto, RegisterUserDto} from "../../../modules/auth";
import {CustomError, User} from "../../../modules/shared";

export class MongoDatasourceImplementationAuthMock implements AuthDatasource {
    login(loginUserDto: LoginUserDto): Promise<User> {
        const user: User = {
            id: '1',
            name: 'John Doe',
            email: loginUserDto.email,
            password: loginUserDto.password,
            img: '',
            role: ['USER_ROLE']
        }
        return Promise.resolve(user);
    }

    register(registerUserDto: RegisterUserDto): Promise<User> {
        const user: User = {
            id: '1',
            name: registerUserDto.name,
            email: registerUserDto.email,
            password: registerUserDto.password,
            img: '',
            role: ['USER_ROLE']
        }
        return Promise.resolve(user);
    }
}

export class MongoDatasourceImplementationAuthFailedMock implements AuthDatasource {
    login(loginUserDto: LoginUserDto): Promise<User> {
        throw CustomError.badRequest('User not found');
    }

    register(registerUserDto: RegisterUserDto): Promise<User> {
        throw CustomError.badRequest('User already exists');
    }
}