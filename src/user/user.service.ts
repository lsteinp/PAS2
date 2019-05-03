import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly model: Model<UserModel>) { }

    async get(): Promise<UserModel[]> {
        try {
            return await this.model.find().exec();
        } catch (e) {
            return e;
        }
    }

    async create(model: UserModel): Promise<UserModel> {
        try {
            const event = new this.model(model);
            return await event.save();
        }   catch  (e) {
            return e;
        }
    }
}