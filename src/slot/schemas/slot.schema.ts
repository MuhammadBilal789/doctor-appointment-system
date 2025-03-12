import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Slot extends Document {
  @ApiProperty({
    example: '65f0c0e89f9b3c001f6e1a23',
    description: 'ID of the associated doctor',
  })
  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctor_id: Types.ObjectId;

  @ApiProperty({
    example: '2025-03-13T09:00:00.000Z',
    description: 'Start time of the slot',
  })
  @Prop({ required: true })
  start_time: Date;

  @ApiProperty({
    example: '2025-03-13T09:30:00.000Z',
    description: 'End time of the slot',
  })
  @Prop({ required: true })
  end_time: Date;

  @ApiProperty({
    example: 'available',
    description: 'Status of the slot',
    enum: ['available', 'booked'],
  })
  @Prop({ enum: ['available', 'booked'], default: 'available' })
  status: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
