import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iuser } from './interface/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
   constructor(
       @InjectModel('User') private readonly userModel: Model<Iuser>) {}

       async findAll() {
        try {
            return await this.userModel.find();
        } catch (e) {
            return e;
        }
       }
       async create(paylood) {
        try {
            return await this.userModel.create({...paylood});
        } catch (e) {
            return e;
        }
       }
       async removeUser(id) {
            try {
                return await this.userModel.findOneAndRemove(id);
            } catch (e) {
                return e;
            }
       }
}
