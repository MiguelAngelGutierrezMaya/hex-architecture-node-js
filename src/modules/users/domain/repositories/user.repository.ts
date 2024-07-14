import {User} from "../../../shared";
import {GetUsersDto} from "../dtos";

export abstract class UserRepository {
    abstract getUsers(getUsersDto: GetUsersDto): Promise<User[]>;
}