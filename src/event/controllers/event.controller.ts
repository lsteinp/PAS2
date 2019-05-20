import { Model } from 'mongoose';
import { EventService } from './../services/event.service';
import { EventModel } from './../models/event.model';
import { Get, Controller, Post, Body, Res, Query, Param, Delete, Put } from '@nestjs/common';
import { EventSchema } from '../schema/event.Schema';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('event')
export class EventController {
    constructor(private readonly service: EventService) { }

    @Post()
    async create(@Body() model: EventModel, @Res() res) {
        try {
            const event = await this.service.create(model);
            return res.status(200).json(event);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() model: EventModel, @Res() res) {
        try {
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
            const events = await this.service.get();
            console.log(JSON.stringify(events));
            return res.status(200).json(events);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get(':id')
    async getEventDetail(@Param('id') id: string, @Res() res): Promise<EventModel> {
        var event = await this.service.getEventDetail(id);
        return res.status(200).json(event);
    }
}
