/* Test use case for register users */
import {
    AuthDatasource, AuthRepository,
    AuthRepositoryImplementation,
    RegisterUserDto,
    RegisterUserUseCaseImpl
} from "../../../src/modules/auth";

import {
    MongoDatasourceImplementationAuthFailedMock,
    MongoDatasourceImplementationAuthMock
} from "../../../src/mocks";

describe('Auth use cases', () => {
    const registerUserDto: RegisterUserDto = RegisterUserDto.create({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456'
    })[1] as RegisterUserDto

    test('RegisterUseCase should return error with token', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve('')
        }

        new RegisterUserUseCaseImpl(authRepository, signToken)
            .execute(registerUserDto)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                expect(error.message).toBe('Failed to generate token')
            })
    });

    test('RegisterUseCase should register a user', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve(payload.toString() + duration)
        }

        new RegisterUserUseCaseImpl(authRepository, signToken)
            .execute(registerUserDto)
            .then((data) => {
                expect(data.user.email).toBe(registerUserDto.email)
            })
            .catch((error) => {
                console.log(error)
            })
    });

    test('RegisterUseCase should return error with User already exist', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthFailedMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve(payload.toString() + duration)
        }

        new RegisterUserUseCaseImpl(authRepository, signToken)
            .execute(registerUserDto)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                expect(error.message).toBe('User already exists')
            });
    })
});



