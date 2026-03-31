import { Test, TestingModule } from '@nestjs/testing';
import { HabbitsController } from './habbits.controller';
import { HabbitsService } from './habbits.service';

describe('HabbitsController', () => {
  let controller: HabbitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabbitsController],
      providers: [HabbitsService],
    }).compile();

    controller = module.get<HabbitsController>(HabbitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
