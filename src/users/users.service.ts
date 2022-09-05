import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
