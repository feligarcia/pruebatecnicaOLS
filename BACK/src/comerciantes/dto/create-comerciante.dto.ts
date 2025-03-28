import { comerciante } from '@prisma/client';

export type CreateComercianteDto = Omit<comerciante, 'userid'>

export type UpdateComercianteDto = Partial<comerciante>;

// export type getComercianteDto = Omit<comerciante, 'userid' | 'comid' | 'fecha_actualizacion' | 'usuario' | 'establecimiento'>;
// export type getAllComercianteDto = Array<Omit<comerciante, 'userid' | 'comid' | 'fecha_actualizacion' | 'usuario' | 'establecimiento'>>;