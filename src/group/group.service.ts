import { GroupModel } from './models/group.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';

@Injectable()
export class GroupService {
    constructor(@InjectModel('Event') private readonly model: Model<GroupModel>) { }

    async get(): Promise<GroupModel[]> {
        return await this.model.find().exec();
    }

    async findOneById(id: string): Promise<GroupModel> {
        return await this.model.findOne({ _id: id }).exec()
    }

    async create(model: GroupModel): Promise<GroupModel> {
        const event = new this.model(model);
        return await event.save();
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
    
        await this.model.findOneAndUpdate({ _id: idUser }, group).exec();
        return group;        
    }

    async avaliarGrupo(idGroup: string, idUser: string, software: Number, process: Number, pitch: Number, innovation: Number, teamFormation: Number){
        var group = await this.findOneById(idGroup);
        const convertido = Types.ObjectId(idUser);


        var index = group.members.indexOf(convertido);
        if (index > -1) {
            group.members.splice(index, 1);
        }
        else {
            group.members.push(convertido);
        }
    
        await this.model.findOneAndUpdate({ _id: idUser }, group).exec();
        return group;
    }

    async getEventByStatus(status: string): Promise<GroupModel> {
        return await this.model.find({ status: status });
    }

    async deleteEventByObjectId(id: string) {
        this.model.findOneAndDelete({ _id: id }).exec().then(res => {
            return
        })
    }
}
