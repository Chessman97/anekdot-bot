import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
import { rzhunemoguRequest } from '../../lib/rzhunemogu';
import { Anecdote } from '../models/Anecdote';
import { AnecdoteRepository } from '../repositories/AnecdoteRepository';

export class AnecdoteService {
    constructor(
        @OrmRepository() private anecdoteRepository: AnecdoteRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async getAnecdotes(): Promise<Anecdote[]> {
        this.log.info('AnecdoteService:getAnecdotes');
        return this.anecdoteRepository.find();
    }

    public async addAnecdote(userChatId: number, header: string, text: string): Promise<Anecdote> {
        this.log.info('AnecdoteService:addAnecdote', { userId: userChatId, header, text });
        const newEntityAnecdote = new Anecdote();
        newEntityAnecdote.header = header;
        newEntityAnecdote.text = text;
        newEntityAnecdote.userId = userChatId;
        return this.anecdoteRepository.save(newEntityAnecdote);
    }

    public async getRandomAnecdote(): Promise<Anecdote | undefined> {
        this.log.info('AnecdoteService:getRandomAnecdote');
        const anecdotes: Anecdote[] = await this.anecdoteRepository.find();
        if (anecdotes.length > 0) {
            return anecdotes[Math.floor(Math.random() * anecdotes.length)];
        } else {
            return undefined;
        }
    }

    public async generateRandomAnecdote(anecdoteType?: number): Promise<Anecdote | undefined> {
        this.log.info('AnecdoteService:generateRandomAnecdote');
        let type: number;
        if (anecdoteType) {
            type = anecdoteType;
        } else {
            type = Math.floor(Math.random() * env.rzhunemogu.types.length);
        }
        const response = await rzhunemoguRequest(env.rzhunemogu.types[type]);
        const anecdote: Anecdote = new Anecdote();
        anecdote.text = response;
        anecdote.header = response.split(' ')[0];
        const savedAnecdote: Anecdote = await this.anecdoteRepository.save(anecdote);
        this.log.info('AnecdoteService:generateRandomAnecdote:generated', { anecdoteId: savedAnecdote.id, type });
        return savedAnecdote;
    }

    public async getLastAnecdote(): Promise<Anecdote | undefined> {
        this.log.info('AnecdoteService:getRandomAnecdote');
        const anecdotes: Anecdote[] = await this.anecdoteRepository.find();
        if (anecdotes.length > 0) {
            return anecdotes[anecdotes.length - 1];
        } else {
            return undefined;
        }
    }
}
