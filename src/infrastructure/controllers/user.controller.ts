import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDTO } from 'src/usecases/user/dto/register.dto';
import { UserRepositoryImpl } from '../database/repositories/user.repository';
import { RegisterUserUseCase } from 'src/usecases/register.usecase';

@Controller('api/users')
export class UserController {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const usecase = new RegisterUserUseCase(this.userRepository);
    return await usecase.execute(
      registerUserDTO.name,
      registerUserDTO.email,
      registerUserDTO.password,
      registerUserDTO.role,
    );
    return { message: 'User registered successfully' };
  }
}
