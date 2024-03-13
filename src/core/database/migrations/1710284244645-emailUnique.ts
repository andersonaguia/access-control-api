import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailUnique1710284244645 implements MigrationInterface {
    name = 'EmailUnique1710284244645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7d0c5d9d416f217dfda04e0f24\` ON \`peoples\``);
        await queryRunner.query(`ALTER TABLE \`peoples\` ADD UNIQUE INDEX \`IDX_7d0c5d9d416f217dfda04e0f24\` (\`phoneNumber\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`peoples\` DROP INDEX \`IDX_7d0c5d9d416f217dfda04e0f24\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7d0c5d9d416f217dfda04e0f24\` ON \`peoples\` (\`phoneNumber\`)`);
    }

}
