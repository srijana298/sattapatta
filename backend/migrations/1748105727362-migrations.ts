import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748105727362 implements MigrationInterface {
    name = 'Migrations1748105727362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`end_time\` tinytext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`end_time\` timestamp NOT NULL`);
    }

}
