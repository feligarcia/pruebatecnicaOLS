import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CsvService {

    constructor(private prisma: PrismaService) {}


    async generateAllCSV() {
        return this.prisma.comerciante
          .findMany({ where: { estado: 'activo' } })
    
      //     .then((comerciantes) => {
      //       const fields = ['comid', 'nombre', 'direccion', 'telefono', 'userid'];
      //       const json2csvParser = new Parser({ fields });
      //       const csv = json2csvParser.parse(comerciantes);
      //       fs.writeFileSync('comerciantes.csv', csv);
      //     });
      }
}
