import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/usuarios/usuarios.guard';
import { MunicipiosService } from './municipios';

@UseGuards(AuthGuard)
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosservice: MunicipiosService) {}

  @Get(':departamento')
  getMunicipios(@Param('departamento') departamento: string): string[] {
    return this.municipiosservice.getMunicipios(departamento);
  }
}
