import {
    AuthDatasource,
    AuthRepository,
    AuthRepositoryImplementation, LoginUserDto,
    LoginUserUseCaseImpl
} from "../../../src/modules/auth";
import {MongoDatasourceImplementationAuthFailedMock, MongoDatasourceImplementationAuthMock} from "../../../src/mocks";

describe('Auth use cases', () => {
    const loginUserDto: LoginUserDto = LoginUserDto.create({
        email: 'johndoe@gmail.com',
        password: '123456'
    })[1] as LoginUserDto

    test('LoginUseCase should return a error with token', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve('')
        }

        new LoginUserUseCaseImpl(authRepository, signToken)
            .execute(loginUserDto)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                expect(error.message).toBe('Failed to generate token')
            })
    });

    test('LoginUseCase should return a user', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve(payload.toString() + duration)
        }

        new LoginUserUseCaseImpl(authRepository, signToken)
            .execute(loginUserDto)
            .then((data) => {
                expect(data.user.email).toBe(loginUserDto.email)
            })
            .catch((error) => {
                console.log(error)
            })
    });

    test('LoginUseCase should return a error with user not found', () => {
        const authDatasource: AuthDatasource = new MongoDatasourceImplementationAuthFailedMock()
        const authRepository: AuthRepository = new AuthRepositoryImplementation(authDatasource)

        const signToken = (payload: Object, duration: string): Promise<string> => {
            return Promise.resolve(payload.toString() + duration)
        }

        new LoginUserUseCaseImpl(authRepository, signToken)
            .execute(loginUserDto)
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                expect(error.message).toBe('User not found')
            })
    });
});