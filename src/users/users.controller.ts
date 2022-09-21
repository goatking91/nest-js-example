import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserLoginDto } from './dto/user-login-dto';
import { VerifyEmailDto } from './dto/verify-email-dto';
import { UsersService } from './users.service';
import { UserInfo } from './UserInfo';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logging: WinstonLogger, // @Inject(WINSTON_MODULE_NEST_PROVIDER) // private readonly logging: LoggerService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    // this.printWinstonLog(dto);
    // this.printLoggerServiceLog(dto);
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Body() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  // private printWinstonLog(dto) {
  //   // console.log(this.logging.name);
  //
  //   this.logging.error('error: ', dto);
  //   this.logging.warn('warn: ', dto);
  //   this.logging.info('info: ', dto);
  //   this.logging.http('http: ', dto);
  //   this.logging.verbose('verbose: ', dto);
  //   this.logging.debug('debug: ', dto);
  //   this.logging.silly('silly: ', dto);
  // }

  // private printLoggerServiceLog(dto) {
  //   try {
  //     throw new InternalServerErrorException('test');
  //   } catch (e) {
  //     this.logging.error('error: ' + JSON.stringify(dto), e.stack);
  //   }
  //   this.logging.warn('warn: ' + JSON.stringify(dto));
  //   this.logging.log('log: ' + JSON.stringify(dto));
  //   this.logging.verbose('verbose: ' + JSON.stringify(dto));
  //   this.logging.debug('debug: ' + JSON.stringify(dto));
  // }
}
