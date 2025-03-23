import { Module } from '@nestjs/common';
import { ComerciantesModule } from './comerciantes/comerciantes.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ComerciantesModule, PrismaModule, UsuariosModule],
})
export class AppModule {}
