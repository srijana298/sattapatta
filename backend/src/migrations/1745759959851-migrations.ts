import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745759959851 implements MigrationInterface {
    name = 'Migrations1745759959851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`listings\` ADD CONSTRAINT \`FK_45d5c4642c4cad0229da0ec22e7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`listings\` DROP FOREIGN KEY \`FK_45d5c4642c4cad0229da0ec22e7\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`listings\` DROP COLUMN \`created_at\``);
    }

}
