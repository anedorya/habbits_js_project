import { Test, TestingModule } from '@nestjs/testing';
import { HabbitsService } from './habbits.service';

describe('HabbitsService', () => {
  let service: HabbitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabbitsService],
    }).compile();

    service = module.get<HabbitsService>(HabbitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
