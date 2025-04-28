import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745759212286 implements MigrationInterface {
    name = 'Migrations1745759212286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`category\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`offering_skill\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`requested_skill\``);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`offeringSkillId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`requestedSkillId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD CONSTRAINT \`FK_f7aa2103cf81d3ca06656dd58b6\` FOREIGN KEY (\`offeringSkillId\`) REFERENCES \`skill\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD CONSTRAINT \`FK_c69caa09d60f4bff960a54e3384\` FOREIGN KEY (\`requestedSkillId\`) REFERENCES \`skill\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD CONSTRAINT \`FK_ec7707e3d6ac9f84f24a6baee4a\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listings\` DROP FOREIGN KEY \`FK_ec7707e3d6ac9f84f24a6baee4a\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP FOREIGN KEY \`FK_c69caa09d60f4bff960a54e3384\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP FOREIGN KEY \`FK_f7aa2103cf81d3ca06656dd58b6\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`requestedSkillId\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`offeringSkillId\``);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`requested_skill\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`offering_skill\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`category\` int NOT NULL`);
    }

}
