import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1748275349695 implements MigrationInterface {
    name = 'Migrations1748275349695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_ae50007dd0ddc9050deaa92185b\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`dayOfWeek\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`endTime\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`isAvailable\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`startTime\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`timezone\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`day_of_week\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`start_time\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`end_time\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`is_available\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`hourly_rate\` decimal NOT NULL DEFAULT '1000'`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`trial_rate\` decimal NOT NULL DEFAULT '1000'`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_ae50007dd0ddc9050deaa92185b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_ae50007dd0ddc9050deaa92185b\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`trial_rate\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`hourly_rate\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`is_available\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`start_time\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP COLUMN \`day_of_week\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`timezone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`startTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`isAvailable\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`endTime\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD \`dayOfWeek\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_ae50007dd0ddc9050deaa92185b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
