import { TagModel } from './../models/tag.model';
import { TagService } from './../services/tag.service';
import { Model } from 'mongoose';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';

@Controller('tag')
export class TagController {
    constructor(private readonly service: TagService) { }

    @Post()
    async create(@Body() model: TagModel, @Res() res) {
        try {
            const tag = await this.service.create(model);
            return res.status(200).json(tag);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<TagModel[]> {
        try {
            const tags = await this.service.get();
            return res.status(200).json(tags);
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}
