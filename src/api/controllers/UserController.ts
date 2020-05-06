import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import {
    Authorized, Delete, Get, JsonController, OnUndefined, Param, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

class BaseUser {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public username: string;
}

export class UserResponse extends BaseUser {
    @IsUUID()
    public id: string;
}

@Authorized()
@JsonController('/users')
// @OpenAPI({
//     security: [{ basicAuth: [] }],
//     tags: ['User'],
//     parameters: [
//         {
//             in: 'query', name: 'pageNumber',
//             type: 'integer',
//             description: 'Example url: /api/currentuser/invoices/in/eth?pageNumber=1&pageSize=5',
//         },
//         {
//             in: 'query', name: 'pageSize',
//             type: 'integer',
//         },
//         {
//             name: 'Access', in: 'header', description: 'Access token',
//             required: true, type: 'string', format: 'uuid',
//         },
//     ],
//     responses: {
//         200: {
//             description: 'OK',
//         },
//         401: {
//             description: 'Authorization Error',
//         },
//     },
// })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @OpenAPI({
        security: [{ basicAuth: [] }],
        tags: ['User'],
        responses: {
            200: {
                description: 'OK',
            },
            403: {
                description: 'Hui',
            },
        },
    })
    @Get()
    @ResponseSchema(UserResponse, { isArray: true })
    public find(): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/me/:loh')
    @ResponseSchema(UserResponse, { isArray: true })
    public findMe(@Req() req: any, @Param('loh') loh: number): Promise<User[]> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse)
    public one(@Param('id') id: number): Promise<User | undefined> {
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }

}
