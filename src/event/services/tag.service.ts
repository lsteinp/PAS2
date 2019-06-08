import { TagModel } from './../models/tag.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
    constructor(@InjectModel('Tag') private readonly model: Model<TagModel>) { }

    async get(): Promise<TagModel[]> {
            return await this.model.find().sort({ title : 1}).exec();
    }

    async create(model: TagModel): Promise<TagModel> {
            const tag = new this.model(model);
            return await tag.save();
    }

    async deleteTagByObjectId(id: string)  {
        this.model.findOneAndDelete({_id: id}).exec().then(res => {
            return
        })
    }
}
