import { Module } from '@nestjs/common';
import { ComerciantesModule } from './comerciantes/comerciantes.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ComerciantesModule, PrismaModule],
})
export class AppModule {}
