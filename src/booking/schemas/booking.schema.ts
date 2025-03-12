import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Booking extends Document {
  @ApiProperty({
    type: String,
    description: 'ID of the slot being booked.',
    example: '65f2b1234abcd56789ef0123',
  })
  @Prop({ type: Types.ObjectId, ref: 'Slot', required: true })
  slot_id: Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'ID of the patient making the booking.',
    example: '1234567890abcdef12345678',
  })
  @Prop({ required: true })
  patient_id: string;

  @ApiProperty({
    type: String,
    description: 'Reason for booking the slot (e.g., consultation, follow-up).',
    example: 'Routine checkup',
  })
  @Prop({ required: true })
  reason: string;

  @ApiProperty({
    type: Date,
    description: 'Timestamp when the booking was made.',
    example: '2025-03-13T12:00:00Z',
  })
  @Prop({ default: Date.now })
  booking_time: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
