import { UserModel } from 'src/user/models/user.model';
export class GroupModel {
    public id: string;
    public status: string;
    public title: string;
    public members: UserModel[];
    public createdBy: UserModel;
    public evaluation: {
        evaluator: UserModel;
        software: number;
        process: number;
        pitch: number;
        innovation: number;
        teamFormation: number;
    }[];
}