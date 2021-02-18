import { Authorized, Get, JsonController, Param, Req } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { ErrorResponse } from './responses/ErrorResponse';
import { UserResponse } from './responses/UserResponse';

@Authorized()
@JsonController('/user')
@OpenAPI({
    security: [{ ApiKeyAuth: [] }],
    tags: ['User'],
    parameters: [{
        in: 'query',
        name: 'pageSize',
        type: 'integer',
    }],
})
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @OpenAPI({ summary: 'Get all users', description: 'All users', parameters: [{
        in: 'query', name: 'pageSize', type: 'integer',
    }]})
    @ResponseSchema(UserResponse, { description: 'Users', isArray: true })
    @ResponseSchema(ErrorResponse, { description: 'Access denied', statusCode: '401' })
    public find(): Promise<User[]> {
        return this.userService.find();
    }

    @Get('/me/:loh')
    @ResponseSchema(UserResponse, { isArray: true })
    public findMe(@Req() req: any, @Param('loh') loh: number): Promise<User[]> {
        return req.user;
    }

}
