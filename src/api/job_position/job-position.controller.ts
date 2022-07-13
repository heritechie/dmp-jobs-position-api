import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Get,
  Query,
  Inject,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { SearchJobPositionDto } from './job-position.dto';
import { JobPositionService } from './job-position.service';

@Controller('job-position')
export class JobPositionController {
  @Inject(JobPositionService)
  private readonly service: JobPositionService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findAll(
    @Query() queryParams: SearchJobPositionDto,
  ): Promise<ResponseDto> {
    const data = await this.service.jobList(queryParams);
    if (!data) throw new NotFoundException('Resource Not Found');
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private async findOne(@Param('id') id): Promise<ResponseDto> {
    const data = await this.service.jobDetail(id);
    if (!data) throw new NotFoundException('Resource Not Found');
    return {
      statusCode: 200,
      message: 'Success',
      data,
    };
  }
}
