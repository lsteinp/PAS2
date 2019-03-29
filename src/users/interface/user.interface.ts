import {Document} from 'mongoose';

export interface Iuser extends Document {
    readonly title: string;
    readonly content: string;
}
