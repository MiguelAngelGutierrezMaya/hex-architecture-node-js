import {AuthDatasource, AuthRepository, RegisterUserDto} from "../../domain";

export class AuthRepositoryImplementation implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource
    ) {
        this.authDatasource = authDatasource;
    }

    async register(registerUserDto: RegisterUserDto) {
        return this.authDatasource.register(registerUserDto);
    }
}