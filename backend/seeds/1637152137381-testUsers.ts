import { MigrationInterface, QueryRunner } from 'typeorm';

export class testUsers1637152137381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('person')
      .values([
        { name: 'Kasa' },
        { name: 'Hasa' },
        { name: 'Masa' },
        { name: 'Uuno' },
        { name: 'Iina' },
        { name: 'Kia' },
        { name: 'Sia' },
        { name: 'Mia' },
        { name: 'Nia' },
        { name: 'Hep' },
        { name: 'Jep' },
        { name: 'Shak' },
        { name: 'Mat' },
        { name: 'Pat' },
        { name: 'Hat' },
        { name: 'Not' },
        { name: 'Hot' },
        { name: 'Juu' },
        { name: 'Jee' },
        { name: 'Jes' },
        { name: 'Essi' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('people');
  }
}
