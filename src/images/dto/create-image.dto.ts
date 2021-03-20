import { IsDate, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateImageDto extends BaseEntity {
  @IsString()
  readonly src: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly tags?: string;

  @IsDate()
  readonly date?: Date;

  @IsString()
  readonly description?: string;
}
