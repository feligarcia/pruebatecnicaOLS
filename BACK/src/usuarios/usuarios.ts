import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async getUser(
    login: LoginUserDto
  ): Promise<{ access_token: string; rol: string, correo: string }> {
    try {

      const usuario = await this.prisma.usuario.findFirst({
        where: {
          correo: login.correo,
        },
      });

      if (!usuario) {
        throw new NotFoundException('Usuario no encontrado');
      }
      //lo ideal es hashear con bcrypt, si da el tiempo lo hago
      if (usuario.contrasena !== login.contrasena) {
        throw new NotFoundException('user or password incorrecto');
      }
      const payload = { correo: usuario.correo, rol: usuario.rol };
      return {
        access_token: await this.jwtService.signAsync(payload),
        rol: usuario.rol,
        correo: usuario.correo,
      };
    } catch (error) {
      throw new UnauthorizedException(`Error en getUser: ${error.message}`);
    }
  }
}
