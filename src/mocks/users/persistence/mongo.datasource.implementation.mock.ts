import {CustomError, User} from "../../../modules/shared";
import {GetUsersDto, UserDatasource} from "../../../modules/users";

export class MongoDatasourceImplementationUserMock implements UserDatasource {
    getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
        return Promise.resolve([
            {
                id: '1',
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456',
                img: '',
                role: ['USER_ROLE']
            }
        ]);
    }

}