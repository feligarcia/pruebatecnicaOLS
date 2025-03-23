import { Test, TestingModule } from '@nestjs/testing';
import { Usuarios } from './usuarios';

describe('Usuarios', () => {
  let provider: Usuarios;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Usuarios],
    }).compile();

    provider = module.get<Usuarios>(Usuarios);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
