import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { comerciante } from '@prisma/client';
import { CreateComercianteDto } from './dto/create-comerciante.dto';

@Injectable()
export class ComercianteService {
  constructor(private prisma: PrismaService) {}

  async getAllComerciantes(): Promise<comerciante[]> {
    return this.prisma.comerciante.findMany();
  }

  async getComercianteById(id: number): Promise<CreateComercianteDto | null> {
    const comfound = this.prisma.comerciante.findUnique({
      where: {
        comid: id,
      },
    });
    if(!comfound) throw new NotFoundException(`Comerciante con ${id} no encontrado`)
      return comfound
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
    if(!user) throw new NotFoundException(`Usuario no existe ${correo}, acción invalida`)
    const comwithid: comerciante = { ...data, userid: Number(user?.userid) };
    return this.prisma.comerciante.create({
      data: comwithid,
    });
  }

  async updateComerciante(
    id: number,
    data: comerciante,
    correo: string,
    role: string,
  ): Promise<comerciante> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        correo: correo,
      },
    });
    if(!user) throw new NotFoundException(`Usuario no existe ${correo}, acción invalida`)
    const comwithid: comerciante = { ...data, userid: Number(user?.userid) };
    const comfound = this.prisma.comerciante.update({
      where: {
        comid: id,
      },
      data: comwithid,
    });
    if(!comfound) throw new NotFoundException(`Comerciante con ${id} no encontrado`)
      return comfound
  }

  async deleteComerciante(id: number, rol: string): Promise<comerciante> {
    if (rol !== 'administrador')
      throw new Error('Accion no permitida al usuario');
    try {
      const comercianteExistente = await this.prisma.comerciante.findUnique({
        where: {
          comid: id,
        },
      });

      if (!comercianteExistente) {
        throw new NotFoundException(`Comerciante con ${id} no existe`)
      }

      return this.prisma.comerciante.delete({
        where: {
          comid: id,
        },
      });
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  
}
