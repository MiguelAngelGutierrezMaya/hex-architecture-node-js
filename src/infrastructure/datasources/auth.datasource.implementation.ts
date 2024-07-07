import {AuthDatasource, CustomError, RegisterUserDto, User} from "../../domain";

export class AuthDatasourceImplementation implements AuthDatasource {
    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const {name, email, password} = registerUserDto;

        try {
            // 1. Check if the user already exists

            // 2. Hash the password

            // 3. Map the response to the User entity

            return new User(
                '1',
                name,
                email,
                password,
                ['ADMIN_ROLE']
            );
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internal('Internal Server Error');
        }
    }

}