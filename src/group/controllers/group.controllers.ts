import { GroupModel } from './../models/group.model';
import { GroupService } from './../group.service';
import { Model, Types } from 'mongoose';
import { Get, Controller, Post, Body, Res, Param, Put, Delete } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';
import { UserService } from 'src/user/user.service';

@Controller('group')
export class GroupController {
    constructor(private readonly service: GroupService,
                private readonly userService: UserService) { }

    @Post()
    async create(@Body() model: GroupModel, @Res() res) {
        try {
            const group = await this.service.create(model);
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    @Post('inserirMembro/:id')
    async insertMember(@Res() res, @Param('id') idGroup, @Body('idUser') idUser): Promise<GroupModel>{
        try{
            var group = await this.service.insertMember(idGroup, idUser);
            if(group){
                if(group.members.indexOf(idUser) > -1){
                    const user = await this.userService.entrarGrupo(group.createdBy.toString(), group.id);
                }
                else{
                    const user = await this.userService.sairGrupo(group.createdBy.toString());
                }
            }
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    @Post('receberAvaliacao/:id')
    async avaliarGrupo(@Param('id') idGroup: string, @Body('idUser') idUser, @Body('software') software, @Body('process') process, @Body('pitch') pitch, @Body('innovation') innovation, @Body('teamFormation') teamFormation, @Res() res): Promise<GroupModel>{
        try{
            var user = await this.service.receberAvaliacao(idGroup, idUser, software, process, pitch, innovation, teamFormation);
            return res.status(200).json(user);
        }
        catch(e){
            return res.status(500).json(e.message);
        }
    }

    @Get('status/:status')
    async getEventByStatus(@Param('status') status: string, @Res() res): Promise<GroupModel[]> {
        try{
            if(status == "avaliado" || status == "pendente"){
                var events = await this.service.getGroupByStatus(status);
            }else{
                return res.status(500).json({message : 'Status Inválido'})
            }
            return res.status(200).json(events);
        }
        catch (e){
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<GroupModel[]> {
        try {
            const group = await this.service.getGroupDetail('');
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    @Get(':id')
    async getGroupDetail(@Param('id') id: string, @Res() res): Promise<GroupModel> {
        try{
            var event = await this.service.getGroupDetail(id);
            return res.status(200).json(event[0]);
        }
        catch (e){
            return res.status(500).json(e);
        }
    }

    @Delete(':id')
    async delete(@Param('id') idGroup: string, @Res() res): Promise<GroupModel[]> {
        try {
            const group = await this.service.deleteGroupByObjectId(idGroup);
            return res.status(200).json('Grupo Deletado');
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }
}
