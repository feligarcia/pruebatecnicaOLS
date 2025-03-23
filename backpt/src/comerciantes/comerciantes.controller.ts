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
} from '@nestjs/common';
import { ComercianteService } from './comerciantes';
import { comerciante } from '@prisma/client';

@Controller('/comerciantes')
export class ComerciantesController {
  constructor(private readonly comercianteservice: ComercianteService) {}

  @Get()
  async getAllComerciantes() {
    return this.comercianteservice.getAllComerciantes();
  }

  @Post()
  async createComerciante(@Body() data: comerciante) {
    return this.comercianteservice.createComerciante(data);
  }

  @Get(':id')
  async getComercianteById(@Param('id') id: string) {
    const comFound = await this.comercianteservice.getComercianteById(
      Number(id),
    );
    if (!comFound) throw new BadRequestException('Comerciante not found');
    return comFound;
  }

  @Delete(':id')
  async deleteComerciante(@Param('id') id: string) {
    try {
      return await this.comercianteservice.deleteComerciante(Number(id));
    } catch (error) {
      throw new BadRequestException('Comerciante not found delete');
    }
  }

  @Put(':id')
  async updateComerciante(@Param('id') id: string, @Body() data: comerciante) {
    try {
      return await this.comercianteservice.updateComerciante(Number(id), data);
    } catch (error) {
      throw new BadRequestException('Comerciante not found update');
    }
  }

  @Patch(':id')
  async updateComerciantePatch(@Param('id') id: string, @Body() data: comerciante) {
    try {
      return await this.comercianteservice.updateComerciante(Number(id), data);
    } catch (error) {
      throw new BadRequestException('Comerciante not found update');
    }
  }
}
