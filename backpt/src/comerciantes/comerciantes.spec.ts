import { Test, TestingModule } from '@nestjs/testing';
import { Comerciantes } from './comerciantes';

describe('Comerciantes', () => {
  let provider: Comerciantes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Comerciantes],
    }).compile();

    provider = module.get<Comerciantes>(Comerciantes);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
