import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateAnecdoteForeignKey1588926778095 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_anecdote_user',
        columnNames: ['userId'],
        referencedColumnNames: ['chatId'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('anecdote', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('anecdote', this.tableForeignKey);
    }

}
