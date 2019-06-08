import { CategorySchema } from './../schema/category.schema';

import { TagModel } from './../models/tag.model';
import { CategoryModel } from './../models/category.model';
import { EventModel } from './../models/event.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Body, Res } from '@nestjs/common';
import { Model, Types } from 'mongoose';

@Injectable()
export class EventService {
    constructor(@InjectModel('Event') private readonly model: Model<EventModel>) { }

    async get(): Promise<EventModel[]> {
        return await this.model.find().exec();
    }

    async create(model: EventModel): Promise<EventModel> {
        const event = new this.model(model);
        return await event.save();
    }

    async update(model: EventModel, id: string): Promise<EventModel> {
        return this.model.findOneAndUpdate({ _id: id }, model, { new: true }).exec();
    }

    async getEventDetail(id: string) {
        var query = [];

        query.push({
            '$unwind': {
                'path': '$tag',
                'preserveNullAndEmptyArrays': false
            }
        }, {
                '$lookup': {
                    'from': 'tags',
                    'localField': 'tag',
                    'foreignField': '_id',
                    'as': 'tags_doc'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'createdBy',
                    'foreignField': '_id',
                    'as': 'user_doc'
                }
            }, {
                '$lookup': {
                    'from': 'users',
                    'localField': 'approvedBy',
                    'foreignField': '_id',
                    'as': 'app_doc'
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'status': {
                        '$first': '$status'
                    },
                    'tag': {
                        '$addToSet': {
                            '$arrayElemAt': [
                                '$tags_doc', 0
                            ]
                        }
                    },
                    'title': {
                        '$first': '$title'
                    },
                    'description': {
                        '$first': '$description'
                    },
                    'startDate': {
                        '$first': '$startDate'
                    },
                    'startHour': {
                        '$first': '$startHour'
                    },
                    'endHour': {
                        '$first': '$endHour'
                    },
                    'endDate': {
                        '$first': '$endDate'
                    },
                    'price': {
                        '$first': '$price'
                    },
                    'hours': {
                        '$first': '$hours'
                    },
                    'createdBy': {
                        '$first': {
                            '$arrayElemAt': [
                                '$user_doc', 0
                            ]
                        }
                    },
                    'approvedBy': {
                        '$first': {
                            '$arrayElemAt': [
                                '$app_doc', 0
                            ]
                        }
                    },
                    'address': {
                        '$first': '$address'
                    }
                }
            }, {
                '$project': {
                    'tag.createdAt': 0,
                    'tag.updatedAt': 0,
                    'tag.__v': 0,
                    'createdBy.createdAt': 0,
                    'createdBy.updatedAt': 0,
                    'createdBy.__v': 0,
                    'createdBy.password': 0,
                    'createdBy.email': 0,
                    'createdBy.interestCategories': 0,
                    'createdBy.favoritedEvents': 0,
                    'createdBy.participatedEvents': 0,
                    'createdBy.createdEvents': 0,
                    'approvedBy.createdAt': 0,
                    'approvedBy.updatedAt': 0,
                    'approvedBy.__v': 0,
                    'approvedBy.password': 0,
                    'approvedBy.email': 0,
                    'approvedBy.interestCategories': 0,
                    'approvedBy.favoritedEvents': 0,
                    'approvedBy.participatedEvents': 0,
                    'approvedBy.createdEvents': 0
                }
            })
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

    async getEventByStatus(status: string): Promise<EventModel> {
        return await this.model.find({ status: status });
    }

    async deleteEventByObjectId(id: string) {
        this.model.findOneAndDelete({ _id: id }).exec().then(res => {
            return
        })
    }
}
