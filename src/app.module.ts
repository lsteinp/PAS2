import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { EventModule } from './event/event.module';
import Environment  from './enviroments';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(Environment.api_url), UserModule, EventModule, AuthModule],
})
export class AppModule {}