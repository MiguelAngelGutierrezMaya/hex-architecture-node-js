import {Validators} from "../../../shared";


export class GetUsersDto {
    private constructor(
        public limit: number,
        public offset: number,
        public search?: string
    ) {
    }

    static create(object: { [key: string]: any }): [string?, GetUsersDto?] {
        const {limit, offset} = object

        if (!limit) {
            return ['Limit is required']
        }

        if (!Validators.number.test(limit)) {
            return ['Limit must be a number']
        }

        if (!offset) {
            return ['Offset is required']
        }

        if (!Validators.number.test(offset)) {
            return ['Offset must be a number']
        }

        return [undefined, new GetUsersDto(limit, offset, object.search)]
    }
}