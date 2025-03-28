import {
  Body,
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
  Request,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UsuariosService } from './usuarios';
import { AuthGuard } from './usuarios.guard';
import { Public } from './decorators/public.decorator';
import { LoginUserDto } from './dto/usuarios.dto';

@Public()
@Controller('login')
export class UsuariosController {
  constructor(private readonly usuarioservice: UsuariosService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async getUser(
    @Body() login: LoginUserDto
  ): Promise<{ access_token: string, rol: string } | UnauthorizedException> {
    return await this.usuarioservice.getUser(login);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
