import {UserRepository, UserDatasource, GetUsersDto} from "../../domain";
import {User} from "../../../shared";

export class UserRepositoryImplementation implements UserRepository {
    constructor(private readonly userDatasource: UserDatasource
    ) {
        this.userDatasource = userDatasource;
    }

    async getUsers(getUsersDto: GetUsersDto): Promise<User[]> {
        return this.userDatasource.getUsers(getUsersDto);
    }
}