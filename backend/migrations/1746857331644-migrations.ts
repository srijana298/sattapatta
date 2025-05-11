import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746857331644 implements MigrationInterface {
    name = 'Migrations1746857331644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` CHANGE \`hasTeachingCertificate\` \`hasTeachingCertificate\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor_certificate\` CHANGE \`hasTeachingCertificate\` \`hasTeachingCertificate\` tinyint NOT NULL`);
    }

}
