import { MigrationInterface, QueryRunner } from "typeorm";

export class Unique1709947168801 implements MigrationInterface {
    name = 'Unique1709947168801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_45cb2a90b79a80f4b7ce81dbec\` ON \`doors\``);
        await queryRunner.query(`ALTER TABLE \`doors\` ADD UNIQUE INDEX \`IDX_45cb2a90b79a80f4b7ce81dbec\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doors\` DROP INDEX \`IDX_45cb2a90b79a80f4b7ce81dbec\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_45cb2a90b79a80f4b7ce81dbec\` ON \`doors\` (\`name\`)`);
    }

}
