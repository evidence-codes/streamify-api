import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:tHN9vpHzKPObDWl2@streamify-cluster.owtsp.mongodb.net/?retryWrites=true&w=majority&appName=streamify-cluster',
    ),
    DatabaseModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
