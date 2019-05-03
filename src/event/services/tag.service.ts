import { TagModel } from './../models/tag.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
    constructor(@InjectModel('Tag') private readonly model: Model<TagModel>) { }

    async get(): Promise<TagModel[]> {
        try {
            return await this.model.find().exec();
        } catch (e) {
            return e;
        }
    }

    async create(model: TagModel): Promise<TagModel> {
        try {
            const tag = new this.model(model);
            return await tag.save();
        }   catch  (e) {
            return e;
        }
    }
}
