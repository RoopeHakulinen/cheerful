import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class databaseSetup1637148979709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'choreography',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'team',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'frames',
            type: 'json',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'carpet',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          },
          {
            name: 'width',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'height',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'horizontalSegments',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'verticalSegments',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'choreographyId',
            type: 'int',
            isNullable: false,
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['choreographyId'],
            referencedTableName: 'choreography',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'person',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'choreography_people',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'personId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'choreographyId',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['personId'],
            referencedTableName: 'person',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['choreographyId'],
            referencedTableName: 'choreography',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('choreography');
    await queryRunner.dropTable('person');
    await queryRunner.dropTable('choreography_person');
    await queryRunner.dropTable('carpet');
  }
}
