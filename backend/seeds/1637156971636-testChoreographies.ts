import { MigrationInterface, QueryRunner } from 'typeorm';

export class testChoreographies1637156971636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('choreography')
      .values([
        {
          name: 'SM-karsinnat',
          team: 'Pyrintö-A',
          frames: [
            {
              name: 'Alkutila',
              type: 'content',
              duration: 2,
              grid: Array(12 * 12)
                .fill(null)
                .map(() => ({
                  content: null,
                  shape: 'rounded',
                  position: 'center',
                })),
              notes: '',
            },
            {
              name: 'Lopputila',
              type: 'content',
              duration: 2,
              grid: Array(12 * 12)
                .fill(null)
                .map(() => ({
                  content: null,
                  shape: 'rounded',
                  position: 'center',
                })),
              notes: '',
            },
          ],
        },
        {
          name: 'EM-karsinnat',
          team: 'Pyrintö-B',
          frames: {
            name: 'Alkutila',
            type: 'content',
            duration: 2,
            grid: '',
            notes: '',
          },
        },
        {
          name: 'MM-karsinnat',
          team: 'Pyrintö-C',
          frames: {
            name: 'Alkutila',
            type: 'content',
            duration: 2,
            grid: '',
            notes: '',
          },
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('choreography');
  }
}
