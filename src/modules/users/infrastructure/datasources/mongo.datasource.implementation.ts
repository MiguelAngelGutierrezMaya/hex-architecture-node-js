import {
    GetUsersDto,
    UserDatasource
} from "../../domain";
import {User, UserModel} from "../../../shared";

type UserMapper = (obj: { [key: string]: any }) => User;

export class MongoDatasourceImplementation implements UserDatasource {

    constructor(
        private readonly userMapper: UserMapper
    ) {
    }

    async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
        // Get users from the database by limiting the results and skipping the offset

        const {search} = getUsersDto;

        let users: { [key: string]: any }[] = [];

        if (search) {
            users = await UserModel
                .find({name: new RegExp(search, 'i')})
                .limit(getUsersDto.limit)
                .skip(getUsersDto.offset);
        } else {
            users = await UserModel
                .find()
                .limit(getUsersDto.limit)
                .skip(getUsersDto.offset);
        }


        return users.map(user => this.userMapper(user.toObject()));
    }

}