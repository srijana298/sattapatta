import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746857425835 implements MigrationInterface {
    name = 'Migrations1746857425835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`certificateName\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`startYear\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`endYear\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`start_year\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`end_year\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`end_year\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`start_year\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`endYear\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`startYear\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`certificateName\` varchar(255) NULL`);
    }

}
