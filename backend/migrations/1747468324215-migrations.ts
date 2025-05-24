import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747468324215 implements MigrationInterface {
    name = 'Migrations1747468324215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`is_unread\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`is_unread\``);
    }

}
