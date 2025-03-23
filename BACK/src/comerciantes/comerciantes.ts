import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { comerciante } from '@prisma/client';
import { CreateComercianteDto } from './dto/create-comerciante.dto';

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
  async createComerciante(
    data: CreateComercianteDto,
    correo: string,
    role: string,
  ): Promise<comerciante> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        correo: correo,
      },
    });
    const comwithid: comerciante = { ...data, userid: Number(user?.userid) };    
    return this.prisma.comerciante.create({
      data: comwithid,
    });
  }

  async updateComerciante(id: number, data: comerciante, correo: string, role: string): Promise<comerciante> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        correo: correo,
      },
    });
    const comwithid: comerciante = { ...data, userid: Number(user?.userid) };
    return this.prisma.comerciante.update({
      where: {
        comid: id,
      },
      data: comwithid,
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
