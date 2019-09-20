import { GroupModel } from './models/group.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';

@Injectable()
export class GroupService {
    constructor(@InjectModel('Group') private readonly model: Model<GroupModel>) { }

    async get(): Promise<GroupModel[]> {
        return await this.model.find().exec();
    }

    async findOneById(id: string): Promise<GroupModel> {
        return await this.model.findOne({ _id: id }).exec()
    }

    async create(model: GroupModel): Promise<GroupModel> {
        const group = new this.model(model);
        return await group.save();
    }

    async update(model: GroupModel, id: string): Promise<GroupModel> {
        return await this.model.findOneAndUpdate({ _id: id }, model, { new: true }).exec();
    }

    async insertMember(idGroup: string, idUser: string): Promise<GroupModel> {
        var group = await this.findOneById(idGroup);
        const convertido = Types.ObjectId(idUser);
        var index = group.members.indexOf(convertido);
        if (index > -1) {
            group.members.splice(index, 1);
        }
        else {
            group.members.push(convertido);
        }
    
        await this.model.findOneAndUpdate({ _id: idGroup }, group).exec();
        return group;        
    }

    async receberAvaliacao(idGroup: string, idUser: string,
            software: Number, process: Number, pitch: Number,
            innovation: Number, teamFormation: Number): Promise<GroupModel>{

        var group = await this.findOneById(idGroup);
        const convertido = Types.ObjectId(idUser);
        
        var evaluation=
            {
                "evaluator": convertido,
                "software": software,
                "process": process,
                "pitch": pitch,
                "innovation": innovation,
                "teamFormation": teamFormation
            }
        group.status = "avaliado",
        group.evaluation.push(evaluation);
    
        await this.model.findOneAndUpdate({ _id: idGroup }, group).exec();
        return group;
    }

    async getGroupByStatus(status: string): Promise<GroupModel> {
        return await this.model.find({ status: status });
    }

    async deleteGroupByObjectId(id: string) {
        this.model.findOneAndDelete({ _id: id }).exec().then(res => {
            return
        })
    }

    async getGroupDetail(id: string) {
        var query = [];
        if(id){
            query.push('');
        }
        query.push({
            '$unwind': {
                'path': '$members', 
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'users', 
                'localField': 'members', 
                'foreignField': '_id', 
                'as': 'members_doc'
            }
        }, {
            '$lookup': {
                'from': 'users', 
                'localField': 'createdBy', 
                'foreignField': '_id', 
                'as': 'creator_doc'
            }
        }, {
            '$unwind': {
                'path': '$evaluation', 
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$lookup': {
                'from': 'users', 
                'localField': 'evaluation.evaluator', 
                'foreignField': '_id', 
                'as': 'evaluator_doc'
            }
        }, {
            '$project': {
                'createdAt': 0, 
                'updatedAt': 0, 
                '__v': 0, 
                'evaluator_doc._id': 0, 
                'evaluator_doc.email': 0, 
                'evaluator_doc.password': 0, 
                'evaluator_doc.createdAt': 0, 
                'evaluator_doc.updatedAt': 0, 
                'evaluator_doc.__v': 0, 
                'evaluator_doc.group': 0, 
                'creator_doc._id': 0, 
                'creator_doc.email': 0, 
                'creator_doc.password': 0, 
                'creator_doc.createdAt': 0, 
                'creator_doc.updatedAt': 0, 
                'creator_doc.__v': 0, 
                'creator_doc.group': 0, 
                'members_doc._id': 0, 
                'members_doc.email': 0, 
                'members_doc.password': 0, 
                'members_doc.createdAt': 0, 
                'members_doc.updatedAt': 0, 
                'members_doc.__v': 0, 
                'members_doc.group': 0, 
                'evaluation.evaluator': 0, 
                'evaluation._id': 0
            }
        }, {
            '$addFields': {
                'evaluation.evaluator': {
                    '$arrayElemAt': [
                        '$evaluator_doc', 0
                    ]
                }
            }
        }, {
            '$group': {
                '_id': '$_id', 
                'title': {
                    '$first': '$title'
                }, 
                'status': {
                    '$first': '$status'
                }, 
                'members': {
                    '$addToSet': {
                        '$arrayElemAt': [
                            '$members_doc', 0
                        ]
                    }
                }, 
                'createdBy': {
                    '$first': {
                        '$arrayElemAt': [
                            '$creator_doc', 0
                        ]
                    }
                }, 
                'evaluation': {
                    '$addToSet': '$evaluation'
                }
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
