import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EventModule } from './event/event.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/hubble-data'), EventModule],
})
export class AppModule {}
