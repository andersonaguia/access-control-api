import { Module } from '@nestjs/common';
import { AuthService } from 'src/core/auth/services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './guards/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/system_users/users.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}