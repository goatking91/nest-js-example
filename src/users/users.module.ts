import { Logger, Module } from '@nestjs/common';
import { UsersController } from './interface/users.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/command/create-user.handler';
import { UserEventsHandler } from './application/event/user-events.handler';
import { LoginHandler } from './application/command/login.handler';
import { VerifyAccessTokenHandler } from './application/command/verify-access-token.handler';
import { VerifyEmailHandler } from './application/command/verify-email.handler';
import { UserFactory } from './domain/user.factory';
import { UserRepository } from './infra/db/repository/user.repository';
import { EmailService } from './infra/adapter/email.service';
import { GetUserInfoQueryHandler } from './application/query/get-user-info.handler';

const commandHandlers = [
  CreateUserHandler,
  VerifyEmailHandler,
  LoginHandler,
  VerifyAccessTokenHandler,
];

const queryHandlers = [GetUserInfoQueryHandler];

const eventHandlers = [UserEventsHandler];

const factories = [UserFactory];

const repositories = [
  { provide: 'UserRepository', useClass: UserRepository },
  { provide: 'EmailService', useClass: EmailService },
];

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
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class UsersModule {}
