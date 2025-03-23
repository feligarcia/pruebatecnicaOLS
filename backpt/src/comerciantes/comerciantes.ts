import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { comerciante } from '@prisma/client';

@Injectable()
export class ComercianteService {
  constructor(private prisma: PrismaService) {}

  async getAllComerciantes(): Promise<comerciante[]> {
    return this.prisma.comerciante.findMany();
  }

  async getComercianteById(id: number): Promise<comerciante | null> {
    return this.prisma.comerciante.findUnique({
      where: {
        comid: id,
      },
    });
  }
  async createComerciante(data: comerciante): Promise<comerciante> {
    return this.prisma.comerciante.create({
      data: data,
    });
  }

  async updateComerciante(id: number, data: comerciante): Promise<comerciante> {
    return this.prisma.comerciante.update({
      where: {
        comid: id,
      },
      data: data,
    });
  }

  async deleteComerciante(id: number): Promise<comerciante> {
    return this.prisma.comerciante.delete({
      where: {
        comid: id,
      },
    });
  }
}
