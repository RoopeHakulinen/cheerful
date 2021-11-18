import { MigrationInterface, QueryRunner } from 'typeorm';

export class testChoreographies1637156971636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('choreography')
      .values([
        { name: 'SM-karsinnat', team: 'Pyrintö-A', frames: '' },
        {
          name: 'EM-karsinnat',
          team: 'Pyrintö-B',
          frames: '',
        },
        {
          name: 'MM-karsinnat',
          team: 'Pyrintö-C',
          frames: '',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('choreography');
  }
}
