import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  findAll() {
    return this.userRepository.find({ relations: ['reviews'] });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['reviews'],
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    user.password = await this.authService.hashPassword(createUserDto.password);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto, currentUser: User) {
    const user = await this.findOne(id);
    if (user.id !== currentUser.id && currentUser.isadmin === false) {
      throw new ForbiddenException(
        "You don't have permission to edit this user.",
      );
    }
    if (
      user.isadmin !== updateUserDto.isadmin &&
      currentUser.isadmin === false
    ) {
      throw new ForbiddenException(
        "You don't have permission to change admin priveleges for this user.",
      );
    }
    return await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: string, currentUser: User) {
    const user = await this.findOne(id);
    if (user.id !== currentUser.id && currentUser.isadmin === false) {
      throw new ForbiddenException(
        "You don't have permission to delete this user.",
      );
    }
    return this.userRepository.remove(user);
  }
}
