import { GroupModel } from './../models/group.model';
import { GroupService } from './../group.service';
import { Model, Types } from 'mongoose';
import { Get, Controller, Post, Body, Res, Param, Put } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('group')
export class GroupController {
    constructor(private readonly service: GroupService) { }

    @Post()
    async create(@Body() model: GroupModel, @Res() res) {
        try {
            const group = await this.service.create(model);
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Post('inserirMembro/:id')
    async insertMember(@Res() res, @Param('id') idGroup, @Body('idUser') idUser): Promise<GroupModel>{
        try{
            var user = await this.service.insertMember(idGroup, idUser);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Post('avaliarGrupo/:id')
    async avaliarGrupo(@Param('id') idGroup: string, @Body() idUser: string, @Body() software: Number, @Body() process: Number, @Body() pitch: Number, @Body() innovation: Number, @Body() teamFormation: Number, @Res() res): Promise<GroupModel>{
        try{
            var user = await this.service.avaliarGrupo(idGroup, idUser, software, process, pitch, innovation, teamFormation);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<GroupModel[]> {
        try {
            const group = await this.service.get();
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}