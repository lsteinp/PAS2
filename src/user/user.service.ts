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

  async updateFavoritar(idUser: string, idEvent: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
    var index = user.favoritedEvents.indexOf(convertido);
    if (index > -1) {
      user.favoritedEvents.splice(index, 1);
    }
    else {
      user.favoritedEvents.push(convertido);
    }

    await this.model.findOneAndUpdate({ _id: idUser }, user).exec();
    return user;
  }

  async updateCategorias(idUser: string, idCategoria: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idCategoria);

    if (user.interestCategories.indexOf(convertido) < 0) {
      return this.model.findOneAndUpdate(
        { _id: idUser }, 
        { $addToSet: {
          interestCategories: idCategoria
        }}
      );
    } else {
      return this.model.findOneAndUpdate(
        { _id: idUser }, 
        { $pull: {
          interestCategories: convertido,
        }},
      ).exec();
    }
  }

  async updateConfirmar(idUser: string, idEvent: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
    var index = user.participatedEvents.indexOf(convertido);
    if (index > -1) {
      user.participatedEvents.splice(index, 1);
    }
    else {
      user.participatedEvents.push(convertido);
    }

    await this.model.findOneAndUpdate({ _id: idUser }, user).exec();
    return user;
  }

  async updateCriar(idUser: string, idEvent: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
    var index = user.createdEvents.indexOf(convertido);
    if (index > -1) {
      user.createdEvents.splice(index, 1);
    }
    else {
      user.createdEvents.push(convertido);
    }

    await this.model.findOneAndUpdate({ _id: idUser }, user).exec();
    return user;
  }

  async findUserCreatedEvents(id: string, type: string, schema: string) {
    var query = await this.model.aggregate(
      [
        {
          '$match': {
            '_id': Types.ObjectId(id)
          }
        }, {
          '$unwind': {
            'path': '$' + type,
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
    if (query[0] == undefined) {
      return [];
    }
    return query[0].type;
  }

  async getEventByCategories(id: string){
    var query = [
        {
          '$match': {
            '_id': Types.ObjectId(id)
          }
        }, {
          '$unwind': {
            'path': '$interestCategories', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'events', 
            'localField': 'interestCategories', 
            'foreignField': 'category', 
            'as': 'events_doc'
          }
        }, {
          '$project': {
            '_id': 0, 
            'events': '$events_doc'
          }
        }, {
          '$project': {
            'events.createdAt': 0, 
            'events.updatedAt': 0, 
            'events.__v': 0
          }
        }, {
          '$unwind': {
            'path': '$events'
          }
        }, {
          '$match': {
            'events.status': 'aprovado'
          }
        }, {
          '$unwind': {
            'path': '$events.tag', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'tags', 
            'localField': 'events.tag', 
            'foreignField': '_id', 
            'as': 'tags_doc'
          }
        }, {
          '$lookup': {
            'from': 'categories', 
            'localField': 'events.category', 
            'foreignField': '_id', 
            'as': 'cat_doc'
          }
        }, {
          '$group': {
            '_id': '$events._id', 
            'status': {
              '$first': '$events.status'
            }, 
            'tag': {
              '$addToSet': {
                '$arrayElemAt': [
                  '$tags_doc', 0
                ]
              }
            }, 
            'title': {
              '$first': '$events.title'
            }, 
            'description': {
              '$first': '$events.description'
            }, 
            'startDate': {
              '$first': '$events.startDate'
            }, 
            'startHour': {
              '$first': '$events.startHour'
            }, 
            'endHour': {
              '$first': '$events.endHour'
            }, 
            'endDate': {
              '$first': '$events.endDate'
            }, 
            'price': {
              '$first': '$events.price'
            }, 
            'hours': {
              '$first': '$events.hours'
            }, 
            'address': {
              '$first': '$events.address'
            }, 
            'picture': {
              '$first': '$events.picture'
            }, 
            'link': {
              '$first': '$events.link'
            }, 
            'vacancies': {
              '$first': '$events.vacancies'
            }, 
            'category': {
              '$first': {
                '$arrayElemAt': [
                  '$cat_doc', 0
                ]
              }
            }
          }
        }, {
          '$project': {
            'tag.createdAt': 0, 
            'tag.updatedAt': 0, 
            'tag.__v': 0, 
            'category.createdAt': 0, 
            'category.updatedAt': 0, 
            'category.__v': 0
          }
        }
      ]
    return await this.model.aggregate([query]);
}

  async getEventConfir(idUser: string, idEvent: string): Promise<boolean> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
    if (user.participatedEvents.indexOf(convertido) > -1) {
      return true;
    } else {
      return false;
    }
  }

  async getEventFavorite(idUser: string, idEvent: string): Promise<boolean> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idEvent);
    if (user.favoritedEvents.indexOf(convertido) > -1) {
      return true;
    } else {
      return false;
    }
  }

  async criarAdmin(email: string): Promise<UserModel>{
    var user =  await this.model.findOne({ email: email }).exec();
    user.role = "Admin";
    return await this.model.findOneAndUpdate({ email: email }, user, { new: true }).exec()
  }
}