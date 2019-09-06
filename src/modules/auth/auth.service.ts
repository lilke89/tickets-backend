import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const existingUser = await this.usersService.findOne(username);

    if (existingUser) {
      if (await this.usersService.compareHash(pass, existingUser.password)) {
        return existingUser;
      }

      throw new HttpException(`Invalid username or password!`, HttpStatus.BAD_REQUEST);
    }

    throw new HttpException(`User not found!`, HttpStatus.BAD_REQUEST);
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(user: any) {

    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
