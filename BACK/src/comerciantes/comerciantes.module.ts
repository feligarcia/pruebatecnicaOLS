import { Module } from '@nestjs/common';
import { ComerciantesController } from './comerciantes.controller';
import { ComercianteService } from './comerciantes';
import { PrismaModule } from 'src/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/usuarios/usuarios.guard';

@Module({
  controllers: [ComerciantesController],
  providers: [
    ComercianteService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  imports: [PrismaModule],
})
export class ComerciantesModule {}
