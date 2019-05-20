import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import Environment  from './enviroments';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(Environment.api_url), EventModule, UserModule],
})
export class AppModule {}
