import { comerciante } from '@prisma/client';

export type CreateComercianteDto = Omit<comerciante, 'userid'>