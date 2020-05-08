import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAnecdoteTable1588926346443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'anecdote',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'text',
                    type: 'text',
                    isNullable: false,
                }, {
                    name: 'userId',
                    type: 'integer',
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('anecdote');
    }

}
