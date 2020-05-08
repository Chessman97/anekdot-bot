import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Anecdote } from './Anecdote';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column()
    public username: string;

    @Column()
    public chatId: number;

    @Column()
    public activity: Date;

    @OneToMany(type => Anecdote, anecdote => anecdote.user)
    public anecdotes: Anecdote[];

    @BeforeInsert()
    // @ts-ignore
    private setActivityDate(): void {
        this.activity = new Date();
    }
}
