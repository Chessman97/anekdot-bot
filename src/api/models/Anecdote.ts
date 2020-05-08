import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Anecdote {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public text: string;

    @Column()
    public userId: number;

    @ManyToOne(type => User, user => user.anecdotes)
    @JoinColumn()
    public user: User;
}
