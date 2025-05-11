import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1746637617474 implements MigrationInterface {
    name = 'Migrations1746637617474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a96e81ae827f9511f9cfd16b14\` ON \`mentor\``);
        await queryRunner.query(`ALTER TABLE \`mentor\` CHANGE \`countryOfBirth\` \`countryOfBirth\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` CHANGE \`subject\` \`subject\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`mentor\` CHANGE \`subject\` \`subject\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`mentor\` CHANGE \`countryOfBirth\` \`countryOfBirth\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a96e81ae827f9511f9cfd16b14\` ON \`mentor\` (\`users_id\`)`);
    }

}
