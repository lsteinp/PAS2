
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload, AuthUser } from './interfaces/jwt-payload.interface';
import { UserModel } from 'src/user/models/user.model';
import { UserModule } from 'src/user/user.module';
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<UserModel> {
    const user = await this.usersService.findOneByEmail(payload.email.trim());
    const hash = crypto.createHmac('sha256', payload.pass).update('The cake is a lie').digest('hex');
    payload.pass = hash;
    if(user.password.trim() == payload.pass.trim()){
      return user;  
    }
    else{
      return null;
    }
  }
}