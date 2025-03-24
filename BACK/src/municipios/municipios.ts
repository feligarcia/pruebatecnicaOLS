import { Injectable } from '@nestjs/common';
import { municipioslist } from './colombia.min';

@Injectable()
export class MunicipiosService {
  getMunicipios(departamento: string): string[] {
    const ciudadesencon = municipioslist.find((depto) => {
      return depto.departamento === departamento;
    })?.ciudades;
    return ciudadesencon || []
  }
}
