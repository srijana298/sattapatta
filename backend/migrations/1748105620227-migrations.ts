import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748105620227 implements MigrationInterface {
    name = 'Migrations1748105620227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`booking\` (\`id\` varchar(36) NOT NULL, \`start_date\` date NOT NULL, \`end_time\` timestamp NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, \`menteeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_1887b3c01481a548364eecd11b6\` FOREIGN KEY (\`mentorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking\` ADD CONSTRAINT \`FK_71b47d3dc892eb64dc87b06a4ed\` FOREIGN KEY (\`menteeId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_71b47d3dc892eb64dc87b06a4ed\``);
        await queryRunner.query(`ALTER TABLE \`booking\` DROP FOREIGN KEY \`FK_1887b3c01481a548364eecd11b6\``);
        await queryRunner.query(`DROP TABLE \`booking\``);
    }

}
