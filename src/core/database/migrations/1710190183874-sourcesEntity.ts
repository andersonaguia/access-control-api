import { MigrationInterface, QueryRunner } from "typeorm";

export class SourcesEntity1710190183874 implements MigrationInterface {
    name = 'SourcesEntity1710190183874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sources\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`IDX_ee4027d72bd2c0c01c4d1fc110\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sources\` ADD CONSTRAINT \`FK_5210810d91fac50005e5a087bcf\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sources\` DROP FOREIGN KEY \`FK_5210810d91fac50005e5a087bcf\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee4027d72bd2c0c01c4d1fc110\` ON \`sources\``);
        await queryRunner.query(`DROP TABLE \`sources\``);
    }

}
