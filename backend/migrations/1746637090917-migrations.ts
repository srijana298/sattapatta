import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746637090917 implements MigrationInterface {
    name = 'Migrations1746637090917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_2163e5b60952a0c431ea31e9b82\``);
        await queryRunner.query(`DROP INDEX \`REL_2163e5b60952a0c431ea31e9b8\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mentorProfileId\` \`mentor_profile_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_05ff7fa7c73804c21dcb2e4681\` (\`mentor_profile_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_05ff7fa7c73804c21dcb2e4681\` ON \`users\` (\`mentor_profile_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_05ff7fa7c73804c21dcb2e46815\` FOREIGN KEY (\`mentor_profile_id\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_05ff7fa7c73804c21dcb2e46815\``);
        await queryRunner.query(`DROP INDEX \`REL_05ff7fa7c73804c21dcb2e4681\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_05ff7fa7c73804c21dcb2e4681\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`mentor_profile_id\` \`mentorProfileId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_2163e5b60952a0c431ea31e9b8\` ON \`users\` (\`mentorProfileId\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_2163e5b60952a0c431ea31e9b82\` FOREIGN KEY (\`mentorProfileId\`) REFERENCES \`mentor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
