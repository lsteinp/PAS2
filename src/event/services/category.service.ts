import { CategorySchema } from './../schema/category.schema';
import { CategoryModel } from './../models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(@InjectModel('Category') private readonly model: Model<CategoryModel>) { }

    async get(): Promise<CategoryModel[]> {
        try {
            return await this.model.find().exec();
        } catch (e) {
            return e;
        }
    }

    async create(model: CategoryModel): Promise<CategoryModel> {
        try {
            const category = new this.model(model);
            return await category.save();
        }   catch  (e) {
            return e;
        }
    }

    async deleteCategoryByObjectId(id: string)  {
        this.model.findOneAndDelete({_id: id}).exec().then(res => {
            return
        })
    }
}
