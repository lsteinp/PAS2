import { UserModel } from './../models/user.model';
import { UserService } from './../user.service';
import { Model } from 'mongoose';
import { Get, Controller, Post, Body, Res, Param, Put } from '@nestjs/common';
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
            const users = await this.service.get();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: string,@Res() res): Promise<UserModel>{
        try{
            var user = await this.service.findOneById(id);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }

    @Get('events/:type/:id')
    async getUserEvents(@Param('id') id: string,@Param('type') type: string,@Res() res): Promise<UserModel>{
        try{
            if(type == 'createdEvents' || type == 'favoritedEvents' || type == 'participatedEvents'){
                var user = await this.service.findUserCreatedEvents(id, type);
                return res.status(200).json(user);
            }
            else{
                return res.status(500).json({message : 'Tipo de evento Inválido'})
            }
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
    @Put('favoritar/:id')
    async updateFavoritar(@Res() res, @Param('id') idUser, @Body('idEvent') idEvent): Promise<UserModel>{
        console.log('kkkkkkk', idUser, 'kkkkkkk', idEvent);
        try{
            var user = await this.service.updateFavoritar(idUser, idEvent);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Post('favoritado/:id')
    async getEventFavorite(@Param('id') idUser: string, @Body('idEvent') idEvent, @Res() res): Promise<string> {
        try {
            var user = await this.service.getEventFavorite(idUser, idEvent);
            console.log(user);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}
