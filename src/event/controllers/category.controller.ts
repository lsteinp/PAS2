import { CategoryModel } from './../models/category.model';
import { CategoryService } from './../services/category.service';
import { Model } from 'mongoose';
import { Get, Controller, Post, Body, Res, Delete, Param } from '@nestjs/common';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService) { }

    @Post()
    async create(@Body() model: CategoryModel, @Res() res) {
        try {
            const category = await this.service.create(model);
            return res.status(200).json(category);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    async get(@Res() res): Promise<CategoryModel[]> {
        try {
            const categories = await this.service.get();
            return res.status(200).json(categories);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res) {
        try {
            this.service.deleteCategoryByObjectId(id);
            return res.status(200).json({message:'Categoria deletada'})
        } catch (e) {
            return res.status(500).json(e);
        }
    }
}
