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
        return await this.model.findOne({_id: id}).exec()
    }

    async findOneByEmail(email: string): Promise<UserModel> {
        return await this.model.findOne({email: email}).exec()
    }

    async updateFavoritar(idUser: string, idEvent: string): Promise<UserModel>{
        var user =  await this.findOneById(idUser);
        const convertido = Types.ObjectId(idEvent);
         if(user.favoritedEvents.indexOf(convertido) > -1){
           var index = user.favoritedEvents.indexOf(convertido);
           user.favoritedEvents.splice(index);
         }
        else{
            user.favoritedEvents.push(convertido);
          }

        await this.model.findOneAndUpdate({_id: idUser}, user).exec();
        return user;
   }

   async updateCategorias(idUser: string, idCategoria: string): Promise<UserModel>{
    var user =  await this.findOneById(idUser);
    const convertido = Types.ObjectId(idCategoria);
     if(user.interestCategories.indexOf(convertido) > -1){
       var index = user.interestCategories.indexOf(convertido);
       user.interestCategories.splice(index);
     }
    else{
        user.interestCategories.push(convertido);
      }

    await this.model.findOneAndUpdate({_id: idUser}, user).exec();
    return user;
}

   async updateConfirmar(idUser: string, idEvent: string): Promise<UserModel>{
    var user =  await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
     if(user.participatedEvents.indexOf(convertido) > -1){
       var index = user.participatedEvents.indexOf(convertido);
       user.participatedEvents.splice(index);
     }
    else{
        user.participatedEvents.push(convertido);
      }

    await this.model.findOneAndUpdate({_id: idUser}, user).exec();
    return user;
  }

  async updateCriar(idUser: string, idEvent: string): Promise<UserModel>{
    var user =  await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
     if(user.createdEvents.indexOf(convertido) > -1){
       var index = user.createdEvents.indexOf(convertido);
       user.createdEvents.splice(index);
     }
    else{
        user.createdEvents.push(convertido);
      }

    await this.model.findOneAndUpdate({_id: idUser}, user).exec();
    return user;
  }

    async findUserCreatedEvents(id: string, type: string, schema:string){
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
                'from': schema, 
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
    if ( query[0] == undefined ) {
         return [];
    }
      return query[0].type;        
    } 

    async getEventConfir(idUser: string, idEvent: string): Promise<boolean> {
      var user =  await this.findOneById(idUser);
      const convertido = Types.ObjectId(idEvent);
      if (user.participatedEvents.indexOf(convertido) > -1) {
       return true;
      } else {
       return false;
      }  
    }

    async getEventFavorite(idUser: string, idEvent: string): Promise<boolean> {
      var user =  await this.findOneById(idUser);
      const convertido = Types.ObjectId(idEvent);
      if (user.favoritedEvents.indexOf(convertido) > -1) {
       return true;
      } else {
       return false;
    }
}
}