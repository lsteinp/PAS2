
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload, AuthUser } from './interfaces/jwt-payload.interface';
import { UserModel } from 'src/user/models/user.model';
import { UserModule } from 'src/user/user.module';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const user: JwtPayload = { email: 'user@email.com', pass: 'senha' };
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload): Promise<UserModel> {//Promise<AuthUser> {

    const user = await this.usersService.findOneByEmail(payload.email.trim());
    if(user.password.trim() == payload.pass.trim()){
      // var userPayload: AuthUser;
      // userPayload.token = this.jwtService.sign(user)
      // userPayload.user = user;
      // return userPayload;
      return user;  
    }
    else{
      return null;
    }
    //return await this.usersService.findOneByEmail(payload.email);
  }
}