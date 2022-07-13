import { Module } from '@nestjs/common';
import { JobPositionController } from './job-position.controller';
import { JobPositionService } from './job-position.service';
import { AuthModule } from '../user/auth/auth.module';
import { HttpModule } from 'nestjs-http-promise';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [JobPositionController],
  providers: [JobPositionService],
})
export class JobPositionModule {}
