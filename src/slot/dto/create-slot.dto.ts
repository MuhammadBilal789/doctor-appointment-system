import {
  IsDate,
  IsIn,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class RecurrenceDto {
  @ApiProperty({
    enum: ['daily', 'weekly', 'one-time'],
    description: 'Recurrence type',
    default: 'weekly'
  })
  @IsIn(['daily', 'weekly', 'one-time'])
  type: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'Days of the week for recurrence, only used for weekly type',
    example: ['Monday', 'Wednesday', 'Friday'],
  })
  @IsOptional()
  @IsArray()
  daysOfWeek?: string[];
}

export class CreateSlotDto {
  @ApiProperty({
    type: Date,
    description: 'Start time of the slot',
    example: '2025-03-13T09:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  start_time: Date;

  @ApiProperty({
    type: Date,
    description: 'End time of the slot',
    example: '2025-03-13T10:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  end_time: Date;

  @ApiProperty({
    enum: [15, 30],
    description: 'Slot duration in minutes',
    example: 15,
  })
  @IsIn([15, 30])
  slot_duration: number;

  @ApiProperty({
    type: () => RecurrenceDto,
    description: 'Recurrence settings for the slot',
  })
  @ValidateNested()
  @Type(() => RecurrenceDto)
  recurrence: RecurrenceDto;
}
