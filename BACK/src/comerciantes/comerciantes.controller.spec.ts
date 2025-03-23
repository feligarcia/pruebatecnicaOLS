import { Test, TestingModule } from '@nestjs/testing';
import { ComerciantesController } from './comerciantes.controller';

describe('ComerciantesController', () => {
  let controller: ComerciantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComerciantesController],
    }).compile();

    controller = module.get<ComerciantesController>(ComerciantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
