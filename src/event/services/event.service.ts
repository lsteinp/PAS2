import { CategorySchema } from './../schema/category.schema';

import { TagModel } from './../models/tag.model';
import { CategoryModel } from './../models/category.model';
import { EventModel } from './../models/event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
    constructor(@InjectModel('Event') private readonly model: Model<EventModel>) { }

    async get(): Promise<EventModel[]> {
        return await this.model.find().exec();
    }

    async create(model: EventModel): Promise<EventModel> {
        const event = new this.model(model);
        return await event.save();
    }

    async update(model: EventModel, id: string): Promise<EventModel> {
            model.status = 'pendente';
            return this.model.findOneAndUpdate({_id: id}, model, {new: true}).exec();
    }

    async getEventDetail(id: string): Promise<EventModel> {
        return await this.model.findOne({_id: id}).exec()
    }

    async getEventByStatus(status: string): Promise<EventModel> {
        return await this.model.find({status: status});
    }

    async deleteEventByObjectId(id: string)  {
        this.model.findOneAndDelete({_id: id}).exec().then(res => {
            return
        })
    }
}
