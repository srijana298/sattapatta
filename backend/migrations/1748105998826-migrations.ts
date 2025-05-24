import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748105998826 implements MigrationInterface {
    name = 'Migrations1748105998826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD PRIMARY KEY (\`id\`)`);
    }

}
