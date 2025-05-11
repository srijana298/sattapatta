import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746890243223 implements MigrationInterface {
    name = 'Migrations1746890243223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_education\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_education\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` ADD PRIMARY KEY (\`id\`)`);
    }

}
