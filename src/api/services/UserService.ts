import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(): Promise<User[]> {
        this.log.info('Find all users');
        console.log(await this.userRepository.find());
        return await this.userRepository.find();
    }

    public findOne(id: number): Promise<User | undefined> {
        this.log.info('Find one user');
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        this.log.info('Create a new user => ', user.toString());
        // user.id = uuid.v1();
        const newUser = await this.userRepository.save(user);
        this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        this.log.info('Update a user');
        // user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a user');
        await this.userRepository.delete(id);
        return;
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
            return await this.userRepository.save(duplicateChatIdUser);
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
