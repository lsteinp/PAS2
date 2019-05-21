import { CategoryModel } from './category.model';
import { TagModel } from './tag.model';
export class EventModel {
    public status: string;
    public title: string;
    public description: string;
    public picture: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public hours: string;
    public observations: string;
    public address: {
         street: string;
         complements: string;
         zipCode: number;
         district: string;
         city: string;
         state: string;
     };
     public category: CategoryModel;
     public tag: TagModel;
}
