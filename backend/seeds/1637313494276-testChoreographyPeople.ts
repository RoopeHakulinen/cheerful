import { MigrationInterface, QueryRunner } from 'typeorm';

export class testChoreographyPeople1637313494276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('choreography_people')
      .values([
        { color: '#FF0000', personId: 1, choreographyId: 1 },
        { color: '#0000FF', personId: 2, choreographyId: 1 },
        { color: '#FFA500', personId: 3, choreographyId: 1 },
        { color: '#000000', personId: 4, choreographyId: 1 },
        { color: '#FFFFFF', personId: 5, choreographyId: 1 },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('choreography_people');
  }
}
