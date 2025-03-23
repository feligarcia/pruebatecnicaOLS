import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  BadRequestException,
  Patch,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ComercianteService } from './comerciantes';
import { comerciante } from '@prisma/client';
import { AuthGuard } from 'src/usuarios/usuarios.guard';
import { JwtService } from '@nestjs/jwt';

@UseGuards(AuthGuard)
@Controller('/comerciantes')
export class ComerciantesController {
  constructor(
    private readonly comercianteservice: ComercianteService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async getAllComerciantes() {
    return this.comercianteservice.getAllComerciantes();
  }

  @Post()
  async createComerciante(@Body() data: comerciante, @Request() req) {
    const [type, token] = (await req.headers.authorization).split(' ') ?? [];
    const { correo, rol } = this.jwtService.decode(token);
    return this.comercianteservice.createComerciante(data, correo, rol);
  }

  @Get(':id')
  async getComercianteById(@Param('id') id: string) {
    const comFound = await this.comercianteservice.getComercianteById(
      Number(id),
    );
    if (!comFound) throw new NotFoundException('Comerciante not found');
    return comFound;
  }

  @Delete(':id')
  async deleteComerciante(@Param('id') id: string, @Request() req) {
    const [type, token] = (await req.headers.authorization).split(' ') ?? [];
    const { correo, rol } = this.jwtService.decode(token);
    try {
      return await this.comercianteservice.deleteComerciante(Number(id), rol);
    } catch (error) {
      throw new NotFoundException(`Error: ${error.message}`);
    }
  }

  @Put(':id')
  async updateComerciante(@Param('id') id: string, @Body() data: comerciante, @Request() req) {
    const [type, token] = (await req.headers.authorization).split(' ') ?? [];
    const { correo, rol } = this.jwtService.decode(token);
    try {
      return await this.comercianteservice.updateComerciante(Number(id), data, correo, rol);
    } catch (error) {
      throw new NotFoundException('Comerciante not found update');
    }
  }

  @Patch(':id')
  async updateComerciantePatch(
    @Param('id') id: string,
    @Body() data: comerciante,
    @Request() req
  ) {
    const [type, token] = (await req.headers.authorization).split(' ') ?? [];
    const { correo, rol } = this.jwtService.decode(token);
    try {
      return await this.comercianteservice.updateComerciante(Number(id), data, correo,rol);
    } catch (error) {
      throw new NotFoundException('Comerciante not found update');
    }
  }
}
