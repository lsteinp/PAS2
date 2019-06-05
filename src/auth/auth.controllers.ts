import { Get, Controller, Post, Body, Res, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/models/user.model';
import { JwtPayload, AuthUser } from 'src/auth/interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
             private readonly service: UserService) {}

  @Post('validate')
  async validate(@Body() payload: JwtPayload,@Res() res): Promise<UserModel>{
      try {
          const user = await this.authService.validateUser(payload);
          if(user === null){
              return res.states(500).json({message: 'Email ou senha inválidos'});
          }
          return res.status(200).json(user);
          
      } catch (e) {
          return res.status(500).json(e);
      }
  }

  @Get()
  @UseGuards(AuthGuard())
  async get(@Res() res): Promise<UserModel[]> {
      try {
          const users = await this.service.get();
          return res.status(200).json(users);
      } catch (e) {
          return res.status(500).json(e);
      }
  }
}