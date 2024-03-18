import { MigrationInterface, QueryRunner } from "typeorm";

export class AccessCards1710759756543 implements MigrationInterface {
    name = 'AccessCards1710759756543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`access_cards\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`cardNumber\` varchar(255) NOT NULL, \`role\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '3', \`userId\` int NOT NULL, \`peopleId\` int NOT NULL, UNIQUE INDEX \`IDX_a80c2133bbcaa95e3ab8c17090\` (\`cardNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`access_cards\` ADD CONSTRAINT \`FK_bb3a97a06bd727ca9b7bc9a1f0b\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access_cards\` ADD CONSTRAINT \`FK_1307548ac62cce187309d54670b\` FOREIGN KEY (\`peopleId\`) REFERENCES \`peoples\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`access_cards\` DROP FOREIGN KEY \`FK_1307548ac62cce187309d54670b\``);
        await queryRunner.query(`ALTER TABLE \`access_cards\` DROP FOREIGN KEY \`FK_bb3a97a06bd727ca9b7bc9a1f0b\``);
        await queryRunner.query(`DROP INDEX \`IDX_a80c2133bbcaa95e3ab8c17090\` ON \`access_cards\``);
        await queryRunner.query(`DROP TABLE \`access_cards\``);
    }

}
