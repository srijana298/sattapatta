import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746637306658 implements MigrationInterface {
    name = 'Migrations1746637306658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_05ff7fa7c73804c21dcb2e46815\``);
        await queryRunner.query(`DROP INDEX \`IDX_05ff7fa7c73804c21dcb2e4681\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_05ff7fa7c73804c21dcb2e4681\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`mentor_profile_id\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD \`users_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD UNIQUE INDEX \`IDX_a96e81ae827f9511f9cfd16b14\` (\`users_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a96e81ae827f9511f9cfd16b14\` ON \`mentor\` (\`users_id\`)`);
        await queryRunner.query(`ALTER TABLE \`mentor\` ADD CONSTRAINT \`FK_a96e81ae827f9511f9cfd16b142\` FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP FOREIGN KEY \`FK_a96e81ae827f9511f9cfd16b142\``);
        await queryRunner.query(`DROP INDEX \`REL_a96e81ae827f9511f9cfd16b14\` ON \`mentor\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP INDEX \`IDX_a96e81ae827f9511f9cfd16b14\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` DROP COLUMN \`users_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`mentor_profile_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_05ff7fa7c73804c21dcb2e4681\` ON \`users\` (\`mentor_profile_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_05ff7fa7c73804c21dcb2e4681\` ON \`users\` (\`mentor_profile_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_05ff7fa7c73804c21dcb2e46815\` FOREIGN KEY (\`mentor_profile_id\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
