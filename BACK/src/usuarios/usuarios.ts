import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { usuario } from '@prisma/client';
@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async getUser(userid: number, contrasena: string): Promise<usuario> {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { userid },
      });
  
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
  
      if (usuario.contrasena !== contrasena) {
        throw new Error("Credenciales incorrectas");
      }
  
      return usuario;
    } catch (error) {
      throw new Error(`Error en getUser: ${error.message}`);
    }
  }
  
}
