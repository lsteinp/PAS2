import { Model } from 'mongoose';
import { EventService } from './../services/event.service';
import { EventModel } from './../models/event.model';
import { Get, Controller, Post, Body, Res, Query, Param, Delete, Put } from '@nestjs/common';
import { EventSchema } from '../schema/event.Schema';
import { async } from 'rxjs/internal/scheduler/async';
import { UserService } from 'src/user/user.service';

@Controller('event')
export class EventController {
    constructor(private readonly service: EventService,
                private readonly userService: UserService) { }

    @Post()
    async create(@Body() model: EventModel, @Res() res) {
        try {
            var idEvent = null;
            const event = await this.service.create(model);
            idEvent = event.id;
            if(event){
                const user = await this.userService.updateCriar(model.createdBy.toString(), event.id);
            }
            return res.status(200).json(event);
        } catch (e) {
            if(idEvent){
                await this.service.deleteEventByObjectId(idEvent);
            }
            return res.status(500).json(e);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() model: EventModel, @Res() res) {
        try {
            model.status = 'pendente';
            const event = await this.service.update(model, id);
            return res.status(200).json(event);
        } catch (e) {
            return res.status(500).json({message: 'Objeto não encontrado'});
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res) {
        try {
            this.service.deleteEventByObjectId(id);
            return res.status(200).json({message:'Evento deletado'})
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<EventModel[]> {
        try {
            const events = await this.service.getEventDetail('');
            return res.status(200).json(events);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get(':id')
    async getEventDetail(@Param('id') id: string, @Res() res): Promise<EventModel> {
        try{
            var event = await this.service.getEventDetail(id);
            return res.status(200).json(event[0]);
        }
        catch (e){
            return res.status(500).json(e);
        }
    }

    @Get('status/:status')
    async getEventByStatus(@Param('status') status: string, @Res() res): Promise<EventModel[]> {
        try{
            if(status == "aprovado" || status == "rejeitado" || status == "pendente"){
                var events = await this.service.getEventByStatus(status);
            }else{
                return res.status(500).json({message : 'Status Inválido'})
            }
            return res.status(200).json(events);
        }
        catch (e){
            return res.status(500).json(e);
        }
    }

    @Put('status/:status/:id')
    async updateStatus(@Param('status') status: string, @Param('id') id: string,@Body() model: EventModel, @Res() res) {
        try{
            if(status == "aprovado" || status == "rejeitado" || status == "pendente"){
                model.status = status;
                const event =  await this.service.update(model, id);
                return res.status(200).json(event);
            }else{
                return res.status(500).json({message : 'Status Inválido'})
            }
        }
        catch (e){
            return res.status(500).json(e);
        }
    }
}
