import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746869475448 implements MigrationInterface {
  name = 'Migrations1746869475448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`degreeType\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`diplomaFileUrl\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`diplomaVerified\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`endYear\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`hasHigherEducation\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`specialization\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`startYear\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`degree_type\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`start_year\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`end_year\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`end_year\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`start_year\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` DROP COLUMN \`degree_type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`startYear\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`specialization\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`hasHigherEducation\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`endYear\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`diplomaVerified\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`diplomaFileUrl\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_education\` ADD \`degreeType\` varchar(255) NULL`,
    );
  }
}
