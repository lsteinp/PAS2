import { Controller, Get, Post, Delete, Query, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly servico: UsersService){}
    @Get()
    async index(@Res() res){
        try {
            const users = await this.servico.findAll();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Post()
    async store(@Body() paylood, @Res() res) {
        try {
            const user = await this.servico.create(paylood);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Delete()
    async remove(@Query('id') userId, @Res() res) {
        try {
            const user = await this.servico.removeUser(userId);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);

        }
    }
}
