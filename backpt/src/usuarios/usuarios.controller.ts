import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { usuario } from '@prisma/client';
import { UsuariosService } from './usuarios';

@Controller('login')
export class UsuariosController {
  constructor(private readonly usuarioservice: UsuariosService) {}

  @Get()
  async getUser(
    @Body('userid') userid: string,
    @Body('contrasena') contrasena: string,
  ): Promise<usuario | null> {
    try {
      return await this.usuarioservice.getUser(Number(userid), contrasena);
    } catch (error) {
      throw new BadRequestException('User or passdword incorrecto');
    }
  }
}
