import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserEntity } from '../../infra/entity/user.entity';
import { ulid } from 'ulid';
import { DataSource } from 'typeorm';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { IUserRepository } from '../../domain/repository/iuser.repository';
import { UserFactory } from '../../domain/user.factory';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private userFactory: UserFactory,
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const { name, email, password } = command;

    const user = await this.userRepository.findByEmail(email);
    if (user !== null) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const id = ulid();
    const signupVerifyToken = uuid.v1();

    await this.userRepository.save(
      id,
      name,
      email,
      password,
      signupVerifyToken,
    );

    this.userFactory.create(id, name, email, signupVerifyToken, password);
  }
}
