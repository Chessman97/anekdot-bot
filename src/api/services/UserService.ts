import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(): Promise<User[]> {
        this.log.info('Find all users');
        return this.userRepository.find();
    }

    // Метод для добавления нового пользователя в базу данных
    public async addUser(ctx: any): Promise<User> {
        const duplicateChatIdUser = await this.userRepository.findOne({
            where: {
                chatId: ctx.message.from.id,
            },
        });
        if (duplicateChatIdUser) {
            this.log.info(`UserService:addUser:duplicated`, { message: `Duplicated chat_id #${duplicateChatIdUser.chatId}` });
            return this.userRepository.save(duplicateChatIdUser);
        }
        const newUserEntity = new User();
        newUserEntity.chatId = ctx.message.from.id;
        if (ctx.message.from.username) {
            newUserEntity.username = ctx.message.from.username;
        }
        if (ctx.message.from.last_name) {
            newUserEntity.lastName = ctx.message.from.last_name;
        }
        if (ctx.message.from.first_name) {
            newUserEntity.firstName = ctx.message.from.first_name;
        }
        const user = await this.userRepository.save(newUserEntity);
        this.log.info(`UserService:addUser:created`, { userId: user.id });
        return user;
    }

}
