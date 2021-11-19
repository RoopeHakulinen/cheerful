import { MigrationInterface, QueryRunner } from 'typeorm';

export class testChoreographyPeople1637313494276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('choreography_people')
      .values([
        { color: 'red', personId: 1, choreographyId: 1 },
        { color: 'blue', personId: 2, choreographyId: 1 },
        { color: 'orange', personId: 3, choreographyId: 1 },
        { color: 'black', personId: 4, choreographyId: 1 },
        { color: 'white', personId: 5, choreographyId: 1 },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('choreography_people');
  }
}
