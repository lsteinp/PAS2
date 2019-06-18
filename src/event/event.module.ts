import { TagSchema } from './schema/tag.schema';
import { CategorySchema } from './schema/category.schema';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { TagController } from './controllers/tag.controller';
import { EventSchema } from './schema/event.Schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Event', schema: EventSchema},
        {name: 'Category', schema: CategorySchema},
        {name: 'Tag', schema: TagSchema},
    ]), UserModule],
    controllers: [EventController, TagController, CategoryController],
    providers: [EventService, TagService, CategoryService],
})
export class EventModule {}
