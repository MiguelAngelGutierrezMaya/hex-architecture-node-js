import {GetUsersDto, UserRepository} from "../domain";
import {User} from "../../shared";

interface GetUsersUseCase {
    execute(getUsersDto: GetUsersDto): Promise<User[]>;
}

export class GetUsersUseCaseImpl implements GetUsersUseCase {

    constructor(
        private readonly userRepository: UserRepository
    ) {
    }

    async execute(getUsersDto: GetUsersDto): Promise<User[]> {
        /// Get users
        return await this.userRepository.getUsers(getUsersDto)
    }
}
