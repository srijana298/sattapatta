import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746857269642 implements MigrationInterface {
    name = 'Migrations1746857269642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD PRIMARY KEY (\`id\`)`);
    }

}
