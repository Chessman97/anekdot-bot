import { EntityRepository, Repository } from 'typeorm';

import { Anecdote } from '../models/Anecdote';

@EntityRepository(Anecdote)
export class AnecdoteRepository extends Repository<Anecdote>  {

}
