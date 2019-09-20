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

  async entrarGrupo(idUser: string, idGroup: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    const convertido = Types.ObjectId(idGroup);
    user.group = convertido;

    await this.model.findOneAndUpdate({ _id: idUser }, user).exec();
    return user;
  }

  async sairGrupo(idUser: string): Promise<UserModel> {
    var user = await this.findOneById(idUser);
    user.group = null;

    await this.model.findOneAndUpdate({ _id: idUser }, user).exec();
    return user;
  }

  async getUserDetail(id: string) {
    var query = [];
    if(id){
        query.push('');
    }
    query.push({
          '$match': {
              '_id': Types.ObjectId('5d84f171ab22f209f8e314f0')
          }
      }, {
          '$lookup': {
              'from': 'groups', 
              'localField': 'group', 
              'foreignField': '_id', 
              'as': 'group'
          }
      }, {
          '$addFields': {
              'group': {
                  '$arrayElemAt': [
                      '$group', 0
                  ]
              }
          }
      }, {
          '$unwind': {
              'path': '$group.members', 
              'preserveNullAndEmptyArrays': true
          }
      }, {
          '$lookup': {
              'from': 'users', 
              'localField': 'group.members', 
              'foreignField': '_id', 
              'as': 'members_doc'
          }
      }, {
          '$addFields': {
              'members_doc': {
                  '$arrayElemAt': [
                      '$members_doc', 0
                  ]
              }
          }
      }, {
          '$project': {
              'password': 0, 
              'createdAt': 0, 
              'updatedAt': 0, 
              '__v': 0, 
              'group.members': 0, 
              'group.createdAt': 0, 
              'group.updatedAt': 0, 
              'group.__v': 0, 
              'group.createdBy': 0, 
              'group.evaluation.evaluator': 0, 
              'group.evaluation._id': 0, 
              'members_doc.password': 0, 
              'members_doc.group': 0, 
              'members_doc.createdAt': 0, 
              'members_doc.updatedAt': 0, 
              'members_doc.__v': 0
          }
      }, {
          '$group': {
              '_id': '$_id', 
              'role': {
                  '$first': '$role'
              }, 
              'firstName': {
                  '$first': '$firstName'
              }, 
              'lastName': {
                  '$first': '$lastName'
              }, 
              'email': {
                  '$first': '$email'
              }, 
              'group': {
                  '$first': '$group'
              }, 
              'members': {
                  '$addToSet': '$members_doc'
              }
          }
      }, {
          '$addFields': {
              'group.members': '$members'
          }
      }, {
          '$project': {
              'members': 0
          }
      }
    )
    if (id) {
        query[0] = {
            ...{
                '$match': {
                    '_id': Types.ObjectId(id)
                }
            }
        };
    }
    return await this.model.aggregate([query]);
}

}
