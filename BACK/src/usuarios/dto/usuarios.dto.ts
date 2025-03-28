import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export enum RolUsuario {
    'administrador',
    'auxiliar'
}

export class UserDto {

    @IsNumber()
    @IsInt()
    userid: number;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    nombre: string;

    @IsEmail()
    @IsString()
    correo: string;

    @IsString()
    @MinLength(6)
    @MaxLength(255)
    contrasena: string;

    @IsEnum(RolUsuario)
    rol: RolUsuario;


}

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    correo: string;
  
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    contrasena: string;
  }