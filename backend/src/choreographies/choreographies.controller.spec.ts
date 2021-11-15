import { Test, TestingModule } from '@nestjs/testing';
import { ChoreographiesController } from './choreographies.controller';

describe('ChoreographiesController', () => {
  let controller: ChoreographiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChoreographiesController],
    }).compile();

    controller = module.get<ChoreographiesController>(ChoreographiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
