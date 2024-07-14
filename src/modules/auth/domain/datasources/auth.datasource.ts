import {User} from "../../../shared";
import {RegisterUserDto, LoginUserDto} from "../dtos";

export abstract class AuthDatasource {
    abstract login(loginUserDto: LoginUserDto): Promise<User>;

    abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}