import { UserModel } from './../models/user.model';
import { UserService } from './../user.service';
import { AuthGuard} from '@nestjs/passport';
import { AuthService } from '/home/14202112/Documentos/Hubble/API/API/src/auth/auth.service';
import { Model } from 'mongoose';
import { Get, Controller, Post, Body, Res, Param, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    async create(@Body() model: UserModel, @Res() res) {
        try {
            const user = await this.service.create(model);
            return res.status(200).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get()
    //@UseGuards(AuthGuard())
    async get(@Res() res): Promise<UserModel[]> {
        try {
            const users = await this.service.get();
            return res.status(200).json(users);
        } catch (e) {
            return res.status(500).json(e);
        }
    }

    @Get(':id')
    async getUserEvents(@Param('id') id: string,@Res() res): Promise<UserModel>{
        var user = await this.service.findOneById(id);

        return res.status(200).json(user);
    }

    // @Get(':email')
    // async getUserBtEmail(@Param('email') email: string,@Res() res): Promise<UserModel>{
    //     var user = await this.service.findOneByEmail(email);

    //     return res.status(200).json(user);
    // }
  
}
