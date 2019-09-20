import { GroupSchema } from './schema/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './controllers/group.controllers';
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { UserModule } from 'src/user/user.module';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}]),UserModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}

