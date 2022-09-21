import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './command/create-user.handler';
import { UserEventsHandler } from './event/user-events.handler';
import { LoginHandler } from './command/login.handler';
import { VerifyAccessTokenHandler } from './command/verify-access-token.handler';
import { VerifyEmailHandler } from './command/verify-email.handler';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [
    Logger,
    CreateUserHandler,
    UserEventsHandler,
    LoginHandler,
    VerifyAccessTokenHandler,
    VerifyEmailHandler,
  ],
})
export class UsersModule {}
