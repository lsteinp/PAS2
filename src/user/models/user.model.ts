import { GroupModel } from 'src/group/models/group.model';
export class UserModel{
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public role: string,
        public group: GroupModel,
        public curso: string
    ) {}
}
