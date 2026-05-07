import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const adminUsername = this.configService.get<string>('admin.username');
    const adminPassword = this.configService.get<string>('admin.password');

    if (loginDto.username !== adminUsername) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Support both plain and bcrypt hashed passwords
    let passwordValid = loginDto.password === adminPassword;
    if (!passwordValid && adminPassword.startsWith('$2')) {
      passwordValid = await bcrypt.compare(loginDto.password, adminPassword);
    }

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: adminUsername, role: 'Super Admin' };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        username: this.configService.get<string>('admin.username'),
        name: this.configService.get<string>('admin.name'),
        email: this.configService.get<string>('admin.email'),
        avatarUrl: this.configService.get<string>('admin.avatarUrl'),
        role: 'Super Admin',
      },
    };
  }
}
