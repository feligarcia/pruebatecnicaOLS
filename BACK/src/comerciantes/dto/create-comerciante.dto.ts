import { comerciante } from '@prisma/client';
import { IsString, MinLength, MaxLength, IsOptional, IsNumber, IsInt, IsEmail, Matches, IsNotEmpty, IsEnum } from 'class-validator';
export type CreateComercianteDto = Omit<comerciante, 'userid'>

export type UpdateComercianteDto = Partial<comerciante>;

// export type getComercianteDto = Omit<comerciante, 'userid' | 'comid' | 'fecha_actualizacion' | 'usuario' | 'establecimiento'>;
// export type getAllComercianteDto = Array<Omit<comerciante, 'userid' | 'comid' | 'fecha_actualizacion' | 'usuario' | 'establecimiento'>>;

export enum estado {
    'activo',
    'inactivo'
}

export class ComercianteDtoVal {
    @IsNotEmpty()
    @IsString()    
    @MinLength(3)
    @MaxLength(255)
    nombre: string;
  
    @IsNotEmpty()
    @IsString()    
    @MinLength(3)
    @MaxLength(255)
    municipio: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{7,10}$/, {
      message: 'El teléfono debe tener mas de 7 dígitos'
    })
    telefono?: string;
  
    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    correo?: string;
  
    @IsNumber()
    @IsInt()
    userid: number;
  
    @IsEnum(estado)
    estado: estado;
}