import { UserModel } from './../models/user.model';
import { UserService } from './../user.service';
import { Model, Types } from 'mongoose';
import { Get, Controller, Post, Body, Res, Param, Put } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    async create(@Body() model: UserModel, @Res() res) {
        try {
            const user = await this.service.create(model);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<UserModel[]> {
        try {
            const users = await this.service.getUserDetail('');
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string,@Res() res): Promise<UserModel>{
        try{
            var user = await this.service.getUserDetail(id);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }    
    
    @Get('mail/:email')
    async getUserEmail(@Param('email') email: string,@Res() res): Promise<UserModel>{
        try{
            var user = await this.service.findOneByEmail(email);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }

    @Post('criarAvaliador/:email')
    async criarAvaliador(@Param('email') email: string,@Res() res): Promise<UserModel>{
        try{
            var user = await this.service.criarAvaliador(email);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }
}
