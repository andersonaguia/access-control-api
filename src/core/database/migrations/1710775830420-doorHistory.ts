import { MigrationInterface, QueryRunner } from "typeorm";

export class DoorHistory1710775830420 implements MigrationInterface {
    name = 'DoorHistory1710775830420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`door_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`doorId\` int NOT NULL, \`accessCardId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`door_history\` ADD CONSTRAINT \`FK_0e7993d0ca90c72f74d604db621\` FOREIGN KEY (\`doorId\`) REFERENCES \`doors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`door_history\` ADD CONSTRAINT \`FK_31cb37af1390696cafe1940ad53\` FOREIGN KEY (\`accessCardId\`) REFERENCES \`access_cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`door_history\` DROP FOREIGN KEY \`FK_31cb37af1390696cafe1940ad53\``);
        await queryRunner.query(`ALTER TABLE \`door_history\` DROP FOREIGN KEY \`FK_0e7993d0ca90c72f74d604db621\``);
        await queryRunner.query(`DROP TABLE \`door_history\``);
    }

}
