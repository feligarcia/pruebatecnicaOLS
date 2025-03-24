import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
  UseGuards,
  Request,
  Post
} from '@nestjs/common';
import { usuario } from '@prisma/client';
import { UsuariosService } from './usuarios';
import { AuthGuard } from './usuarios.guard';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('login')
export class UsuariosController {
  constructor(private readonly usuarioservice: UsuariosService) {}

  @Post()
  async getUser(
    @Body('correo') correo: string,
    @Body('contrasena') contrasena: string,
  ): Promise<{ access_token: string, rol: string } | UnauthorizedException> {
    try {
      return await this.usuarioservice.getUser(correo, contrasena);
    } catch (error) {
      throw new NotFoundException('correo or passdword incorrecto');
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
