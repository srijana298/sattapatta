import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745752100983 implements MigrationInterface {
    name = 'Migrations1745752100983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`listings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`offering_skill\` varchar(255) NOT NULL, \`requested_skill\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`duration\` varchar(255) NOT NULL, \`category\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`listings\``);
        await queryRunner.query(`DROP TABLE \`skill\``);
    }

}
