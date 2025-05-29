import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748510992065 implements MigrationInterface {
    name = 'Migrations1748510992065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_review\` DROP COLUMN \`session_type\``);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` ADD \`reply\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` ADD \`repliedAt\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_review\` DROP COLUMN \`repliedAt\``);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` DROP COLUMN \`reply\``);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` ADD \`session_type\` varchar(255) NULL`);
    }

}
