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
        try {
            return await this.model.find().exec();
        } catch (e) {
            return e;
        }
    }

    async create(model: EventModel): Promise<EventModel> {
        try {
            const event = new this.model(model);
            return await event.save();
        }   catch  (e) {
            return e;
        }
    }

    async update(model: EventModel, id: string): Promise<EventModel> {
        try {
            return this.model.findOneAndUpdate({_id: id}, model, {new: true}).exec();
        }   catch  (e) {
            return e;
        }
    }

    async getEventDetail(id: string): Promise<EventModel> {
        return await this.model.findOne({_id: id}).exec()
    }

    async deleteEventByObjectId(id: string)  {
        this.model.findOneAndDelete({_id: id}).exec().then(res => {
            return
        })
    }
}
