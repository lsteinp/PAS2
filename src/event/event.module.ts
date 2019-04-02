import { EventSchema } from './schema/event.Schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './services/event.service';
import { EventController } from './controllers/event.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Event', schema: EventSchema}])],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}
