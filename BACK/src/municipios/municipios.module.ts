import { Module } from '@nestjs/common';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios';

@Module({
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
})
export class MunicipiosModule {}
