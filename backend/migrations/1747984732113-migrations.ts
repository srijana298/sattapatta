import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1747984732113 implements MigrationInterface {
    name = 'Migrations1747984732113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_b1a75fd6cdb0ab0a82c5b01c34f\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_dd90174e375c888d7f431cf829e\``);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_b1a75fd6cdb0ab0a82c5b01c34f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_dd90174e375c888d7f431cf829e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_dd90174e375c888d7f431cf829e\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_b1a75fd6cdb0ab0a82c5b01c34f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_dd90174e375c888d7f431cf829e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_b1a75fd6cdb0ab0a82c5b01c34f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
