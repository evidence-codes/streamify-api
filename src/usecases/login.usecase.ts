import { User } from '../domain/entities/user.entity';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const hashedPassword = existingUser.password;

    if (Buffer.from(password).toString('base64') !== hashedPassword) {
      throw new Error('Invalid credentials!');
    }

    return existingUser;
  }
}
