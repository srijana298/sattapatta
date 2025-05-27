import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748336677140 implements MigrationInterface {
    name = 'Migrations1748336677140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`mentor_review\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL DEFAULT '5', \`comment\` text NULL, \`session_type\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, \`reviewerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` ADD CONSTRAINT \`FK_2b20d12bd1477f171634ed27242\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` ADD CONSTRAINT \`FK_247b54e5c39bdcd0fa2f21ec222\` FOREIGN KEY (\`reviewerId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_review\` DROP FOREIGN KEY \`FK_247b54e5c39bdcd0fa2f21ec222\``);
        await queryRunner.query(`ALTER TABLE \`mentor_review\` DROP FOREIGN KEY \`FK_2b20d12bd1477f171634ed27242\``);
        await queryRunner.query(`DROP TABLE \`mentor_review\``);
    }

}
