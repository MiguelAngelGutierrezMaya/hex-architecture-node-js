import {
    AuthDatasource,
    LoginUserDto,
    RegisterUserDto
} from "../../domain";

import {CustomError, User, UserModel} from "../../../shared";

type HashPassword = (password: string) => string;
type ComparePassword = (password: string, hashed: string) => boolean;
type UserMapper = (obj: { [key: string]: any }) => User;

export class MongoDatasourceImplementation implements AuthDatasource {

    constructor(
        private readonly passwordHasher: HashPassword,
        private readonly passwordComparer: ComparePassword,
        private readonly userMapper: UserMapper
    ) {
    }

    async login(loginUserDto: LoginUserDto): Promise<User> {
        const {email, password} = loginUserDto;

        // 1. Check if the user exists
        const user = await UserModel
            .findOne({email})

        if (!user) {
            throw CustomError.badRequest('User not found');
        }

        // 2. Compare the passwords
        const isValid = this.passwordComparer(password, user.password);

        if (!isValid) {
            throw CustomError.badRequest('Invalid password');
        }

        // 3. Map the response to the User entity
        return this.userMapper(user.toObject());
    }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const {name, email, password} = registerUserDto;

        // 1. Check if the user already exists
        const exist = await UserModel.findOne({email});

        if (exist) {
            throw CustomError.badRequest('User already exists');
        }

        const passwordHash = this.passwordHasher(password);

        const user = await UserModel.create({
            name,
            email,
            password: passwordHash
        });

        // 2. Hash the password

        await user.save()

        // 3. Map the response to the User entity
        return this.userMapper(user.toObject());
    }
}