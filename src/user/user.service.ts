import { EventModel } from './../event/models/event.model';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';
const crypto = require('crypto');

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly model: Model<UserModel>) { }

  async get(): Promise<UserModel[]> {
    return await this.model.find().exec();
  }

  async create(model: UserModel): Promise<UserModel> {
    const hash = crypto.createHmac('sha256', model.password).update('The cake is a lie').digest('hex');
    model.password = hash;
    const event = new this.model(model);
    return await event.save();
  }

  async findOneById(id: string): Promise<UserModel> {
    return await this.model.findOne({ _id: id }).exec()
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return await this.model.findOne({ email: email }).exec()
  }

  async criarAvaliador(email: string): Promise<UserModel>{
    var user =  await this.model.findOne({ email: email }).exec();
    user.role = "Avaliador";
    return await this.model.findOneAndUpdate({ email: email }, user, { new: true }).exec()
  }
}