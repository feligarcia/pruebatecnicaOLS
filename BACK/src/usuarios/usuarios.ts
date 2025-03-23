import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getUser(
    correo: string,
    contrasena: string,
  ): Promise<{ access_token: string ; rol: string }> {
    try {
      if (!correo || !contrasena) {
        throw new Error('Correo y contraseña son obligatorios');
      }
      const usuario = await this.prisma.usuario.findFirst({
        where: {
          correo: correo,
        },
      });

      if (!usuario) {
        throw new UnauthorizedException('Usuario no encontrado');
      }
      //lo ideal es hashear con bcrypt, si da el tiempo lo hago
      if (usuario.contrasena !== contrasena) {
        throw new UnauthorizedException('user or password incorrecto');
      }
      const payload = { correo: usuario.correo, rol: usuario.rol };
      return {
        access_token: await this.jwtService.signAsync(payload),
        rol: usuario.rol
      };
    } catch (error) {
      throw new UnauthorizedException(`Error en getUser: ${error.message}`);
    }
  }
}
