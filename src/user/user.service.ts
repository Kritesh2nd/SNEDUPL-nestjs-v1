import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(private configService: ConfigService) {}

  getProfile() {
    return {
      username: this.configService.get<string>('admin.username'),
      name: this.configService.get<string>('admin.name'),
      email: this.configService.get<string>('admin.email'),
      avatarUrl: this.configService.get<string>('admin.avatarUrl'),
      role: 'Super Admin',
    };
  }
}
