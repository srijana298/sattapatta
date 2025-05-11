import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746594102360 implements MigrationInterface {
  name = 'Migrations1746594102360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'student'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
  }
}
