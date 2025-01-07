import { User } from '../domain/entities/user.entity';
import { UserRepository } from 'src/domain/interfaces/user.repository.interface';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    name: string,
    email: string,
    password: string,
    role: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = Buffer.from(password).toString('base64');

    const user = new User(name, email, hashedPassword, role);

    return await this.userRepository.create(user);
  }
}
