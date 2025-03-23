import { Controller, Get } from '@nestjs/common';

@Controller('/comerciantes')
export class ComerciantesController {
    @Get()
    getComerciantes(){
            return 'Lista de comerciantes';
        
    }
}
