import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';
import { CsvService } from './csv';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CsvController],
  providers: [CsvService],
  imports: [PrismaModule],
})
export class CsvModule {}
