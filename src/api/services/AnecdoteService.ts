import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Anecdote } from '../models/Anecdote';
import { AnecdoteRepository } from '../repositories/AnecdoteRepository';

export class AnecdoteService {
    constructor(
        @OrmRepository() private anecdoteRepository: AnecdoteRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async getAnecdotes(): Promise<Anecdote[]> {
        this.log.info('AnecdoteService:getAnecdotes');
        return await this.anecdoteRepository.find();
    }

    public async addAnecdote(userChatId: number, header: string, text: string): Promise<Anecdote> {
        this.log.info('AnecdoteService:addAnecdote', { userId: userChatId, header, text });
        const newEntityAnecdote = new Anecdote();
        newEntityAnecdote.header = header;
        newEntityAnecdote.text = text;
        newEntityAnecdote.userId = userChatId;
        return await this.anecdoteRepository.save(newEntityAnecdote);
    }
}
