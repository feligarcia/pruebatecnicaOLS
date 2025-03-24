import { Module } from '@nestjs/common';
import { ComerciantesModule } from './comerciantes/comerciantes.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [ComerciantesModule, PrismaModule, UsuariosModule, MunicipiosModule, CsvModule],
})
export class AppModule {}
