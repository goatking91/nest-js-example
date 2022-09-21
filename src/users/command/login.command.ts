import { ICommand } from '@nestjs/cqrs';

export class LoginCommand implements ICommand {
  constructor(readonly email, readonly password) {}
}
