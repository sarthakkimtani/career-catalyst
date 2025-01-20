import { IsNumber, IsOptional, IsString, IsEnum } from "class-validator";

export class InternshipQueryParams {
  @IsOptional()
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  stipend?: number;

  @IsOptional()
  @IsString()
  mode?: string;
}
