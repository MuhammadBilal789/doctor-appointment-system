import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBookingDto {
  @ApiProperty({
    description: 'The unique identifier of the slot being booked',
    type: String,
    example: '60c72b2f9b1d8e35d8f1f123',
  })
  @IsMongoId()
  @IsNotEmpty()
  slot_id: Types.ObjectId;

  @ApiProperty({
    description: 'The unique identifier of the patient',
    type: String,
    example: 'abc123patient',
  })
  @IsString()
  @IsNotEmpty()
  patient_id: string;

  @ApiProperty({
    description: 'The reason for the booking',
    type: String,
    example: 'Routine checkup',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiPropertyOptional({
    description: 'The time of the booking',
    type: Date,
    example: '2025-03-15T09:00:00.000Z',
  })
  @IsOptional()
  booking_time?: Date;
}
