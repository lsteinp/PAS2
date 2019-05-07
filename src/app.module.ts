import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import Environment  from './enviroments';

@Module({
  imports: [MongooseModule.forRoot(Environment.api_url), EventModule],
})
export class AppModule {}
