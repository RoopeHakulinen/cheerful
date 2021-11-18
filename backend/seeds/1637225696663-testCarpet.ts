import { MigrationInterface, QueryRunner } from 'typeorm';

export class testCarpet1637225696663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('carpet')
      .values({
        width: 12,
        height: 12,
        color: '#5151b8',
        horizontalSegments: 12,
        verticalSegments: 6,
        choreographyId: 1,
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('carpet');
  }
}
