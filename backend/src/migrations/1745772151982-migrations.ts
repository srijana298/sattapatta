import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1745772151982 implements MigrationInterface {
  name = 'Migrations1745772151982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE FULLTEXT INDEX \`idx_fulltext_listings\` ON \`listings\` (\`title\`, \`description\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_fulltext_listings\` ON \`listings\``,
    );
  }
}
