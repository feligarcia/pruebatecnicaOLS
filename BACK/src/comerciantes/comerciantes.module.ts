import { Module } from '@nestjs/common';
import { ComerciantesController } from './comerciantes.controller';
import { ComercianteService } from './comerciantes';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComerciantesController],
  providers: [ComercianteService],
  imports: [PrismaModule],
})
export class ComerciantesModule {}
