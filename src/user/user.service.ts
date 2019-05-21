import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';

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

    async findOneById(id: string): Promise<UserModel> {
        return await this.model.findOne({_id: id}).exec()
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        return await this.model.findOne({email: email}).exec()
    }

    async findUserCreatedEvents(id: string, type: string){
        var query =  await this.model.aggregate(
          [
            {
              '$match': {
                '_id': Types.ObjectId(id)
              }
            }, {
              '$unwind': {
                'path': '$'+type, 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$lookup': {
                'from': 'events', 
                'localField': type, 
                'foreignField': '_id', 
                'as': 'events_doc'
              }
            }, {
              '$project': {
                '_id': 0, 
                'events': {
                  '$arrayElemAt': [
                    '$events_doc', 0
                  ]
                }
              }
            }, {
              '$project': {
                'events.createdAt': 0, 
                'events.updatedAt': 0, 
                'events.__v': 0
              }
            }, {
              '$group': {
                '_id': {
                  'id': '$id', 
                  'name': '$name'
                }, 
                type: {
                  '$addToSet': '$events'
                }
              }
            }, {
              '$project': {
                '_id': 0, 
                type: 1
              }
            }
          ]
        ) 
      if(query[0] == undefined){
          return [];
      }
      return query[0].type;        
    }

    async updateFavoritar(idUser: string, idEvent: string): Promise<UserModel>{
      var user =  await this.findOneById(idUser);
      const convertido = Types.ObjectId(idEvent);
       if(user.favoritedEvents.indexOf(convertido) > -1){
        var index = user.favoritedEvents.indexOf(convertido);
        await user.favoritedEvents.splice(index);
       }
      else{
        await user.favoritedEvents.push(convertido);
        }
        //return user;
        await this.model.findOneAndUpdate(idUser, user).exec();
        return user;
    }
    
}

