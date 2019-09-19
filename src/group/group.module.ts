import { GroupSchema } from './schema/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './controllers/group.controllers';
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PassportModule } from '@nestjs/passport';


const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: GroupSchema}]),
  passportModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class UserModule {}

