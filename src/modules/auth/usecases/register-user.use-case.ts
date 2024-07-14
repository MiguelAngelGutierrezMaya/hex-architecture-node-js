import {RegisterUserDto, AuthRepository} from "../domain";
import {CustomError, User} from "../../shared";

interface UserToken {
    token: string;
    user: User
}

type SignToken = (payload: Object, duration: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute(registeruserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken
    ) {
    }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        /// Create user
        const user = await this.authRepository.register(registerUserDto)

        /// Generate token
        const token = await this.signToken({id: user.id, email: user.email}, '2h');

        if (!token) {
            throw CustomError.internal('Failed to generate token');
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                img: user.img,
                role: user.role
            },
            token: token
        }
    }
}
