import {User} from "../../../shared";
import {RegisterUserDto} from "../dtos";
import {LoginUserDto} from "../dtos";

export abstract class AuthRepository {
    abstract login(loginUserDto: LoginUserDto): Promise<User>;

    abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}