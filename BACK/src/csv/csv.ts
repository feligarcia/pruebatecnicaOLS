import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';

@Injectable()
export class CsvService {
  constructor(private prisma: PrismaService) {}

  async generateAllCSV(rol: string) {
    if (rol !== 'administrador')
      throw new Error('Accion no permitida al usuario');
    const fileName = 'comerciantes.csv';

    try {
      const comerciantes = await this.prisma.comerciante.findMany({
        where: { estado: 'activo' },
        include: { establecimiento: true },
      });

      const csvLines = [
        'Nombre o razón social|Municipio|Teléfono|Correo Electrónico|Fecha de Registro|Estado|Cantidad de Establecimientos|Total Ingresos|Cantidad de Empleados',
      ];

      comerciantes.forEach((comerciante) => {
        const cantidadEstablecimientos = comerciante.establecimiento.length;
        const totalIngresos = comerciante.establecimiento
          .reduce(
            (sum, est) => sum + (est.ingresos ? est.ingresos.toNumber() : 0),
            0,
          )
          .toFixed(2);
        const cantidadEmpleados = comerciante.establecimiento.reduce(
          (sum, est) => sum + (est.numempleados || 0),
          0,
        );

        csvLines.push(
          `${comerciante.nombre || ''}|${comerciante.municipio || ''}|${
            comerciante.telefono || ''
          }|${comerciante.correo || ''}|${
            comerciante.fecha_registro
              ? comerciante.fecha_registro.toISOString()
              : ''
          }|${comerciante.estado || ''}|${cantidadEstablecimientos}|${totalIngresos}|${cantidadEmpleados}`,
        );
      });

      fs.writeFileSync(fileName, csvLines.join('\n'), 'utf8');
      console.log(`Archivo CSV generado OK: ${fileName}`);
    } catch (error) {
      console.error('Error generando el archivo CSV:', error);
    }
  }

  async getEstablecimientosAll() {
    const establecimientos = await this.prisma.comerciante.findMany({
      include: { establecimiento: true },
    });
    const resultados = establecimientos.map((comerciante) => {
      const totalIngresos = comerciante.establecimiento.reduce(
        (sum, est) => sum + (est.ingresos ? est.ingresos.toNumber() : 0),
        0,
      );

      const totalEmpleados = comerciante.establecimiento.reduce(
        (sum, est) => sum + (est.numempleados || 0),
        0,
      );

      return {
        comid: comerciante.comid,
        totalIngresos: totalIngresos.toFixed(0),
        totalEmpleados,
      };
    });
    return resultados
  }
}
