import {
    GetUsersDto,
    GetUsersUseCaseImpl,
    UserDatasource,
    UserRepository,
    UserRepositoryImplementation
} from "../../../src/modules/users";
import {MongoDatasourceImplementationUserMock} from "../../../src/mocks";

describe('Users use cases', () => {
    const getUsersDto: GetUsersDto = GetUsersDto.create({
        limit: 10,
        offset: 0
    })[1] as GetUsersDto

    test('GetUsersUseCase should return a list of users', () => {
        const userDataSource: UserDatasource = new MongoDatasourceImplementationUserMock()
        const userRepository: UserRepository = new UserRepositoryImplementation(userDataSource)

        new GetUsersUseCaseImpl(userRepository)
            .execute(getUsersDto)
            .then((data) => {
                expect(data.length).toBe(1)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    test('GetUsersUseCase should verify first email record returned', () => {
        const userDataSource: UserDatasource = new MongoDatasourceImplementationUserMock()
        const userRepository: UserRepository = new UserRepositoryImplementation(userDataSource)

        new GetUsersUseCaseImpl(userRepository)
            .execute(getUsersDto)
            .then((data) => {
                expect(data[0].email).toBe('johndoea@gmail.com')
            })
            .catch((error) => {
                console.log(error)
            })
    })
})