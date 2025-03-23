import { Module } from '@nestjs/common';
import { ComerciantesController } from './comerciantes.controller';
import { Comerciantes } from './comerciantes';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ComerciantesController],
  providers: [Comerciantes],
  imports: [PrismaModule],
})
export class ComerciantesModule {}
