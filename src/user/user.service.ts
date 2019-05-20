import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
<<<<<<< 86e6db6ac7e478720a8ef77e65853a2f8fb763a8
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';
=======
import { Injectable, Body, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
>>>>>>> update favoritar-eventos

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
<<<<<<< 86e6db6ac7e478720a8ef77e65853a2f8fb763a8

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
}
=======
    async update(id: string, user: UserModel): Promise<UserModel> {
        if (!id || !user) {
            throw new HttpException ('Missing parameters', HttpStatus.BAD_REQUEST);
        }
        const u: UserModel = await this.findOneById(id);
        u.password = user.password;
        u.role = user.role;
        u.phoneNumber = user.phoneNumber;
        u.firstName = user.firstName;
        u.lastName = user.lastName;
        u.email = user.email;
        u.createdEvents = user.createdEvents;
        u.favoritedEvents = user.favoritedEvents;
        u.participatedEvents = user.participatedEvents;
        try {
            return await this.model.findByIdAndUpdate(id, u, {new: true}).exec();
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
>>>>>>> update favoritar-eventos
