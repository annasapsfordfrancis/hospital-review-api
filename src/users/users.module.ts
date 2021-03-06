import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UniqueValidator } from './unique.validator';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UniqueValidator],
  exports: [UsersService],
})
export class UsersModule {}
