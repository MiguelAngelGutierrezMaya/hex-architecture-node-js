import {AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto} from "../../domain";

export class AuthRepositoryImplementation implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource
    ) {
        this.authDatasource = authDatasource;
    }

    async login(loginUserDto: LoginUserDto) {
        return this.authDatasource.login(loginUserDto);
    }

    async register(registerUserDto: RegisterUserDto) {
        return this.authDatasource.register(registerUserDto);
    }
}