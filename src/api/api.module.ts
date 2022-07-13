import { Module } from '@nestjs/common';
import { JobPositionModule } from './job_position/job-position.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, JobPositionModule],
})
export class ApiModule {}
