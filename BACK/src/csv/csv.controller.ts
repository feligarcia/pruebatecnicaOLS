import { Controller, Get, UseGuards } from '@nestjs/common';
import { CsvService } from './csv';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/usuarios/usuarios.guard';

@UseGuards(AuthGuard)
@Controller('csv')
export class CsvController {
  constructor(
    private readonly csvservice: CsvService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async generateAllCSV() {
    return this.csvservice.generateAllCSV();
  }
}
