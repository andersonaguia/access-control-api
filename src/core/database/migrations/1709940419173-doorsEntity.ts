import { MigrationInterface, QueryRunner } from "typeorm";

export class DoorsEntity1709940419173 implements MigrationInterface {
    name = 'DoorsEntity1709940419173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(100) NOT NULL, \`readerModel\` varchar(100) NOT NULL, \`isOpen\` tinyint NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`doors\` ADD CONSTRAINT \`FK_6ee3fd9f96703bb77e6ecf5c638\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doors\` DROP FOREIGN KEY \`FK_6ee3fd9f96703bb77e6ecf5c638\``);
        await queryRunner.query(`DROP TABLE \`doors\``);
    }

}
