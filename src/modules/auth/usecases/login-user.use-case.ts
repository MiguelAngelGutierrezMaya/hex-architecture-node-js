import {LoginUserDto, AuthRepository} from "../domain";
import {CustomError} from "../../shared";

interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}

type SignToken = (payload: Object, duration: string) => Promise<string | null>;

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUserUseCaseImpl implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken
    ) {
    }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        /// Create user
        const user = await this.authRepository.login(loginUserDto)

        /// Generate token
        const token = await this.signToken({id: user.id, email: user.email}, '2h');

        if (!token) {
            throw CustomError.internal('Failed to generate token');
        }

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: token
        }
    }
}
