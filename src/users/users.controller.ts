import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // const user = new User();

    // if (createUserDto.password !== createUserDto.retypedPassword) {
    //   throw new BadRequestException(['Passwords are not identical.']);
    // }

    // const existingUser = await this.userRepository.findOne({
    //   where: [
    //     { username: createUserDto.username },
    //     { email: createUserDto.email },
    //   ],
    // });

    // if (existingUser) {
    //   throw new BadRequestException(['Username or email is already taken.']);
    // }
    // user.username = createUserDto.username;
    // user.password = await this.authService.hashPassword(createUserDto.password);
    // user.email = createUserDto.email;
    // user.isadmin = createUserDto.isadmin;

    // return {
    //   ...(await this.userRepository.save(user)),
    //   token: this.authService.getTokenForUser(user),
    // };
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
