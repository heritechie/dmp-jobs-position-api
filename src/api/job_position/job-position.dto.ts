import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchJobPositionDto {
  @IsString()
  @IsOptional()
  public readonly description?: string;

  @IsString()
  @IsOptional()
  public readonly location?: string;

  @IsString()
  @IsOptional()
  public readonly fulltime?: string;
}
