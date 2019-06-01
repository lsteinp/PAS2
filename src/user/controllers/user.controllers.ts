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
            if(type == 'createdEvents' || type == 'favoritedEvents') {
                var user = await this.service.findUserCreatedEvents(id, type);
                return res.status(200).json(user);
            }
            else if(type == 'participatedEvents'){
                var fui = await this.service.findUserCreatedEvents(id, type);
                var vou = fui.slice(0);
                var agora = await Date.now();
                for(let i = 0; i < fui.length; i++){
                    console.log(i);
                    let converted = await this.toDate(fui[i].startDate);
                    if(converted >  agora){
                        console.log('euFui :D');
                        vou.pop(i);
                    }
                    else{
                        console.log('Nao euFui :D');
                        fui.pop(i);
                        i--;
                    }
                }
                var eventos = {
                    euFui: fui,
                    euVou: vou,
                };
                return res.status(200).json(eventos);
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

    @Post('updateCategoria/:idUser')
    async updateCategoria(@Param('idUser') idUser: string, @Body('idCategoria') idCategoria, @Res() res): Promise<string> {
        try {
            var user = await this.service.updateCategorias(idUser, idCategoria);
            console.log(user);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
    

    @Post('confirmar/:id')
    async updateConfirmar(@Res() res, @Param('id') idUser, @Body('idEvent') idEvent): Promise<UserModel>{
        try{
            var user = await this.service.updateConfirmar(idUser, idEvent);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }

    @Post('criar/:id')
    async updateCriar(@Res() res, @Param('id') idUser, @Body('idEvent') idEvent): Promise<UserModel>{
        try{
            var user = await this.service.updateCriar(idUser, idEvent);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }
  
    toDate(string){
        var dateString = string;
        var dataSplit =  dateString.split('/');
        var dateConverted;
    
        if (dataSplit[2].split(" ").length > 1) {
    
            var hora = dataSplit[2].split(" ")[1].split(':');
            dataSplit[2] = dataSplit[2].split(" ")[0];
            dateConverted = new Date(dataSplit[2], dataSplit[1]-1, dataSplit[0], hora[0], hora[1]);
    
        } else {
            dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0]).getTime();
        }
        return dateConverted;
    }
}