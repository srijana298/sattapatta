import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746768844990 implements MigrationInterface {
    name = 'Migrations1746768844990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`skillCategoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`skillsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD CONSTRAINT \`FK_21af5d3696b4e2e90cf0efb8e7c\` FOREIGN KEY (\`skillCategoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD CONSTRAINT \`FK_fe285c635086f7a64d71d70a5f4\` FOREIGN KEY (\`skillsId\`) REFERENCES \`skill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP FOREIGN KEY \`FK_fe285c635086f7a64d71d70a5f4\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP FOREIGN KEY \`FK_21af5d3696b4e2e90cf0efb8e7c\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`skillsId\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`skillCategoryId\``);
    }

}
