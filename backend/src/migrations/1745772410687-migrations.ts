import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745772410687 implements MigrationInterface {
    name = 'Migrations1745772410687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_4cccfe7631b60e5c268a2e43c8\` ON \`listings\` (\`title\`)`);
        await queryRunner.query(`CREATE FULLTEXT INDEX \`IDX_714082a6c711034618b989894d\` ON \`listings\` (\`description\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_714082a6c711034618b989894d\` ON \`listings\``);
        await queryRunner.query(`DROP INDEX \`IDX_4cccfe7631b60e5c268a2e43c8\` ON \`listings\``);
    }

}
