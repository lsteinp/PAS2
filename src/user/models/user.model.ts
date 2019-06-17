import { EventModel } from './../../event/models/event.model';
export class UserModel{
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: string,
        public email: string,
        public password: string,
        public role: string,
        public interestCategories: string[],
        public favoritedEvents: EventModel[],
        public participatedEvents: EventModel[],
        public createdEvents: EventModel[],
    ) {}
}
