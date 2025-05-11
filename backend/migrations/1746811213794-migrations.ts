import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746811213794 implements MigrationInterface {
    name = 'Migrations1746811213794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`has_education\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`has_certificate\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`has_certificate\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`has_education\``);
    }

}
