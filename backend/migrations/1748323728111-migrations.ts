import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748323728111 implements MigrationInterface {
    name = 'Migrations1748323728111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`status\` varchar(255) NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`status\``);
    }

}
