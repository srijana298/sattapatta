import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748506586720 implements MigrationInterface {
    name = 'Migrations1748506586720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'confirmed'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'pending'`);
    }

}
