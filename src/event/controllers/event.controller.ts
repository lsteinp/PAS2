import { Model } from 'mongoose';
import { EventService } from './../services/event.service';
import { EventModel } from './../models/event.model';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';
import { EventSchema } from '../schema/event.Schema';

@Controller('event')
export class EventController {
    constructor(private readonly service: EventService) { }

    @Post()
    async create(@Body() model: EventModel, @Res() res) {
        try {
            // const event = await this.service.create(model);
            var random = require('random-object-generator');
            var nn = random.randomObject( new EventModel() );
            console.log(random);
            console.log(nn);
            return res.status(200).json( nn );
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<EventModel[]> {
        try {
            const events = await this.service.get();
            // console.log(JSON.stringify(events));
            return res.status(200).json(events);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}
