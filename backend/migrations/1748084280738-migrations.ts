import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748084280738 implements MigrationInterface {
    name = 'Migrations1748084280738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
