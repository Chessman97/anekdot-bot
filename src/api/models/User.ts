import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @IsNotEmpty()
    @Column()
    public lastName: string;

    @Column()
    public username: string;

    @Column()
    public chatId: number;

    @Column()
    public activity: Date;

    @BeforeInsert()
    // @ts-ignore
    private setActivityDate(): void {
        this.activity = new Date();
    }

}
