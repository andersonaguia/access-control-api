import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnum1709941281730 implements MigrationInterface {
    name = 'AddEnum1709941281730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doors\` ADD \`state\` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doors\` DROP COLUMN \`state\``);
    }

}
