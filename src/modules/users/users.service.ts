import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await this.getHash(createUserDto.password);
    const createdUserDtoTmp = {
      username: createUserDto.username,
      password: passwordHash,
      email: createUserDto.email,
    };
    const createdUser = new this.userModel(createdUserDtoTmp);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username});
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  private async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
