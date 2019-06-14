import { CategorySchema } from './../schema/category.schema';
import { CategoryModel } from './../models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly model: Model<CategoryModel>) { }

    async get(): Promise<CategoryModel[]> {
            return await this.model.find().sort({ title : 1}).exec();
    }

    async create(model: CategoryModel): Promise<CategoryModel> {
            const category = new this.model(model);
            return await category.save();
    }

    async deleteCategoryByObjectId(id: string)  {
        this.model.findOneAndDelete({_id: id}).exec().then(res => {
            return
        })
    }
}
