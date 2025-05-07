import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746593271601 implements MigrationInterface {
    name = 'Migrations1746593271601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryId\` int NULL, UNIQUE INDEX \`IDX_0f49a593960360f6f85b692aca\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mentor_education\` (\`id\` varchar(36) NOT NULL, \`hasHigherEducation\` tinyint NOT NULL, \`university\` varchar(255) NULL, \`degree\` varchar(255) NULL, \`degreeType\` varchar(255) NULL, \`specialization\` varchar(255) NULL, \`startYear\` varchar(255) NULL, \`endYear\` varchar(255) NULL, \`diplomaVerified\` tinyint NULL, \`diplomaFileUrl\` varchar(255) NULL, \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mentor_certificate\` (\`id\` varchar(36) NOT NULL, \`hasTeachingCertificate\` tinyint NOT NULL, \`subject\` varchar(255) NULL, \`certificateName\` varchar(255) NULL, \`description\` text NULL, \`issuedBy\` varchar(255) NULL, \`startYear\` varchar(255) NULL, \`endYear\` varchar(255) NULL, \`certificateVerified\` tinyint NOT NULL DEFAULT 0, \`certificateFileUrl\` varchar(255) NULL, \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mentor_availability\` (\`id\` varchar(36) NOT NULL, \`dayOfWeek\` varchar(255) NOT NULL, \`startTime\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`isAvailable\` tinyint NOT NULL, \`timezone\` varchar(255) NULL, \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mentor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`countryOfBirth\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`languageLevel\` varchar(255) NOT NULL, \`profilePhotoUrl\` varchar(255) NULL, \`introduction\` text NULL, \`experience\` text NULL, \`motivation\` text NULL, \`headline\` varchar(255) NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`isActive\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`mentorProfileId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_2163e5b60952a0c431ea31e9b8\` (\`mentorProfileId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`conversationId\` int NULL, \`participantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conversation_participant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`conversationId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`mentor_skills\` (\`mentorId\` int NOT NULL, \`skillId\` int NOT NULL, INDEX \`IDX_36329e2ca4652f3efdc0de9307\` (\`mentorId\`), INDEX \`IDX_7be2c57eb4a59928e77a68be4e\` (\`skillId\`), PRIMARY KEY (\`mentorId\`, \`skillId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`skill\` ADD CONSTRAINT \`FK_ae50007dd0ddc9050deaa92185b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` ADD CONSTRAINT \`FK_1fe43a9c405c140e8302ffd5b24\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` ADD CONSTRAINT \`FK_8740a3f00def7208d8a654b0fa6\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` ADD CONSTRAINT \`FK_8d3165d476cea380eb194b4974b\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_2163e5b60952a0c431ea31e9b82\` FOREIGN KEY (\`mentorProfileId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_7cf4a4df1f2627f72bf6231635f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_8b215a0e1be1f32e8dda39d1d42\` FOREIGN KEY (\`participantId\`) REFERENCES \`conversation_participant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_b1a75fd6cdb0ab0a82c5b01c34f\` FOREIGN KEY (\`conversationId\`) REFERENCES \`conversation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` ADD CONSTRAINT \`FK_dd90174e375c888d7f431cf829e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`mentor_skills\` ADD CONSTRAINT \`FK_36329e2ca4652f3efdc0de93074\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`mentor_skills\` ADD CONSTRAINT \`FK_7be2c57eb4a59928e77a68be4e5\` FOREIGN KEY (\`skillId\`) REFERENCES \`skill\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_skills\` DROP FOREIGN KEY \`FK_7be2c57eb4a59928e77a68be4e5\``);
        await queryRunner.query(`ALTER TABLE \`mentor_skills\` DROP FOREIGN KEY \`FK_36329e2ca4652f3efdc0de93074\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_dd90174e375c888d7f431cf829e\``);
        await queryRunner.query(`ALTER TABLE \`conversation_participant\` DROP FOREIGN KEY \`FK_b1a75fd6cdb0ab0a82c5b01c34f\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_8b215a0e1be1f32e8dda39d1d42\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_7cf4a4df1f2627f72bf6231635f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_2163e5b60952a0c431ea31e9b82\``);
        await queryRunner.query(`ALTER TABLE \`mentor_availability\` DROP FOREIGN KEY \`FK_8d3165d476cea380eb194b4974b\``);
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` DROP FOREIGN KEY \`FK_8740a3f00def7208d8a654b0fa6\``);
        await queryRunner.query(`ALTER TABLE \`mentor_education\` DROP FOREIGN KEY \`FK_1fe43a9c405c140e8302ffd5b24\``);
        await queryRunner.query(`ALTER TABLE \`skill\` DROP FOREIGN KEY \`FK_ae50007dd0ddc9050deaa92185b\``);
        await queryRunner.query(`DROP INDEX \`IDX_7be2c57eb4a59928e77a68be4e\` ON \`mentor_skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_36329e2ca4652f3efdc0de9307\` ON \`mentor_skills\``);
        await queryRunner.query(`DROP TABLE \`mentor_skills\``);
        await queryRunner.query(`DROP TABLE \`conversation_participant\``);
        await queryRunner.query(`DROP TABLE \`conversation\``);
        await queryRunner.query(`DROP TABLE \`message\``);
        await queryRunner.query(`DROP INDEX \`REL_2163e5b60952a0c431ea31e9b8\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`mentor\``);
        await queryRunner.query(`DROP TABLE \`mentor_availability\``);
        await queryRunner.query(`DROP TABLE \`mentor_certificate\``);
        await queryRunner.query(`DROP TABLE \`mentor_education\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f49a593960360f6f85b692aca\` ON \`skill\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }

}
