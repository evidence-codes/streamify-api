import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDTO } from 'src/usecases/user/dto/register.dto';
import { LoginUserDTO } from 'src/usecases/user/dto/login.dto';
import { LoginUserUseCase } from 'src/usecases/login.usecase';
import { UserRepositoryImpl } from '../database/repositories/user.repository';
import { RegisterUserUseCase } from 'src/usecases/register.usecase';

@Controller('api/users')
export class UserController {
  constructor(private readonly userRepository: UserRepositoryImpl) {}

  @Post('register')
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    const usecase = new RegisterUserUseCase(this.userRepository);
    const user = await usecase.execute(
      registerUserDTO.name,
      registerUserDTO.email,
      registerUserDTO.password,
      registerUserDTO.role,
    );
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    const usecase = new LoginUserUseCase(this.userRepository);
    const user = await usecase.execute(
      loginUserDTO.email,
      loginUserDTO.password,
    );
    return { message: 'User logged in successfully', user };
  }
}
