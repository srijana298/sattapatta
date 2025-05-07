import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746593545553 implements MigrationInterface {
  name = 'Migrations1746593545553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`language\``);
    await queryRunner.query(
      `ALTER TABLE \`mentor\` DROP COLUMN \`languageLevel\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentor\` ADD \`languageLevel\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor\` ADD \`language\` varchar(255) NOT NULL`,
    );
  }
}
