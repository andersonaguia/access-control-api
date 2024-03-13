import { MigrationInterface, QueryRunner } from "typeorm";

export class Peoples1710275997472 implements MigrationInterface {
    name = 'Peoples1710275997472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`peoples\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`phoneNumber\` varchar(30) NULL, \`sourceId\` int NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`peoples\` ADD CONSTRAINT \`FK_8e9c256aaf2f8e7d9930dc35d72\` FOREIGN KEY (\`sourceId\`) REFERENCES \`sources\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`peoples\` ADD CONSTRAINT \`FK_23601072771a184dd8d1c6169da\` FOREIGN KEY (\`userId\`) REFERENCES \`system_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`peoples\` DROP FOREIGN KEY \`FK_23601072771a184dd8d1c6169da\``);
        await queryRunner.query(`ALTER TABLE \`peoples\` DROP FOREIGN KEY \`FK_8e9c256aaf2f8e7d9930dc35d72\``);
        await queryRunner.query(`DROP TABLE \`peoples\``);
    }

}
