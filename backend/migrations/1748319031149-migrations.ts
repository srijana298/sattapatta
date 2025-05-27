import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748319031149 implements MigrationInterface {
    name = 'Migrations1748319031149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`subject\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`subject\` varchar(255) NULL`);
    }

}
