import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745765629016 implements MigrationInterface {
    name = 'Migrations1745765629016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`conversationId\` int NULL, \`participantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation_participant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`conversationId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`listingId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_8b215a0e1be1f32e8dda39d1d42\` FOREIGN KEY (\`participantId\`) REFERENCES \`conversation_participant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_b1a75fd6cdb0ab0a82c5b01c34f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_dd90174e375c888d7f431cf829e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation\` ADD CONSTRAINT \`FK_e4902a8087c7c001879bea421d4\` FOREIGN KEY (\`listingId\`) REFERENCES \`listings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conversation\` DROP FOREIGN KEY \`FK_e4902a8087c7c001879bea421d4\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_dd90174e375c888d7f431cf829e\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_b1a75fd6cdb0ab0a82c5b01c34f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_8b215a0e1be1f32e8dda39d1d42\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`conversation_participant\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
