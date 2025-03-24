import {
  Controller,
  Get,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { CsvService } from './csv';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/usuarios/usuarios.guard';
import * as fs from 'fs';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('csv')
export class CsvController {
  constructor(
    private readonly csvservice: CsvService,
    private jwtService: JwtService,
  ) {}

  @Get()
  async generateAllCSV(@Res() res: Response, @Request() req) {
    const [type, token] = (await req.headers.authorization).split(' ') ?? [];
    const { rol } = this.jwtService.decode(token);
    const fileName = 'comerciantes.csv';

    try {
      await this.csvservice.generateAllCSV(rol);

      if (!fs.existsSync(fileName)) {
        throw new HttpException(
          'El archivo CSV no se pudo generar.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const fileStream = fs.createReadStream(fileName);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );

      fileStream.pipe(res);

      fileStream.on('end', () => {
        console.log('Archivo enviado correctamente.');
      });

      fileStream.on('error', (err) => {
        console.error('Error al leer el archivo:', err);
        throw new NotFoundException('No se pudo leer el archivo');
      });
    } catch (error) {
      console.error('Error al generar o enviar el archivo CSV:', error);
      throw new NotFoundException('Error en el csv');
    }
  }
}
