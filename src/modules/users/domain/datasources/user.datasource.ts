import {User} from "../../../shared";
import {GetUsersDto} from "../dtos";


export abstract class UserDatasource {
    abstract getUsers(getUsersDto: GetUsersDto): Promise<User[]>;
}