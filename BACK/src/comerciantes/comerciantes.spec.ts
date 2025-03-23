import { ComercianteService } from './comerciantes';
import { PrismaService } from '../prisma/prisma.service';

describe('ComercianteService', () => {
  let comercianteService: ComercianteService;
  let prismaServiceMock: any;

  beforeEach(() => {
    prismaServiceMock = {
      comerciante: {
        findUnique: jest.fn(),
      },
    };

    comercianteService = new ComercianteService(prismaServiceMock);
  });

  describe('getComercianteById', () => {
    it('debe devolver un comerciante si existe', async () => {
      const id = 1;
      const mockComerciante = { comid: id, nombre: 'Mercado de la 80' };

      prismaServiceMock.comerciante.findUnique.mockResolvedValue(mockComerciante);

      const result = await comercianteService.getComercianteById(id);

      expect(result).toEqual(mockComerciante);
      expect(prismaServiceMock.comerciante.findUnique).toHaveBeenCalledWith({
        where: { comid: id },
      });
    });

    it('debe devolver null si el comerciante no existe', async () => {
      const id = 1;

      prismaServiceMock.comerciante.findUnique.mockResolvedValue(null);

      const result = await comercianteService.getComercianteById(id);

      expect(result).toBeNull();
      expect(prismaServiceMock.comerciante.findUnique).toHaveBeenCalledWith({
        where: { comid: id },
      });
    });
  });
});