import { TagModel } from './../models/tag.model';
import { TagService } from './../services/tag.service';
import { Model } from 'mongoose';
import { Get, Controller, Post, Body, Res, Delete, Param } from '@nestjs/common';

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

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res) {
        try {
            this.service.deleteTagByObjectId(id);
            return res.status(200).json({message:'Tag deletada'})
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}
