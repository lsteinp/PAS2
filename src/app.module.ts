import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { GroupModule } from 'src/group/group.module';
import Environment  from './enviroments';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(Environment.api_url), UserModule, GroupModule, AuthModule],
})
export class AppModule {}
