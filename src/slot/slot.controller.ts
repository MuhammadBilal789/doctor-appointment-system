import {
  Controller,
  Post,
  Param,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { SlotService } from './slot.service';
import { BookingService } from 'src/booking/booking.service';
import { Types } from 'mongoose';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Slot } from './schemas/slot.schema';
import { CreateBookingDto } from 'src/booking/dto/create-booking.dto';

@ApiTags('Slots')
@Controller('slots')
export class SlotController {
  constructor(
    private readonly slotService: SlotService,
    private readonly bookingService: BookingService,
  ) {}

  @Post(':slotId/book')
  @ApiOperation({ summary: 'Book a slot' })
  @ApiParam({
    name: 'slotId',
    type: String,
    description: 'ID of the slot to book',
  })
  @ApiResponse({
    status: 201,
    description: 'Slot booked successfully — slot status will be "booked"',
    schema: {
      allOf: [
        { $ref: getSchemaPath(Slot) },
        {
          properties: {
            status: {
              type: 'string',
              example: 'booked',
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid slot ID or booking conditions not met',
  })
  @ApiResponse({ status: 404, description: 'Slot not found' })
  @ApiResponse({ status: 409, description: 'Slot already booked' })
  async bookSlot(@Param('slotId') slotId: string): Promise<Slot> {
    if (!Types.ObjectId.isValid(slotId)) {
      throw new BadRequestException('Invalid slot ID');
    }

    const slot = await this.slotService.findById(slotId);
    if (!slot) {
      throw new NotFoundException('Slot not found');
    }

    if (slot.status === 'booked') {
      throw new ConflictException('Slot is already booked');
    }

    if (slot.status && new Date(slot.end_time) < new Date()) {
      throw new BadRequestException('Slot time has passed');
    }

    const bookingPayload: CreateBookingDto = {
      slot_id: new Types.ObjectId(slotId),
      reason: 'Routine checkup',
      booking_time: new Date(),
      patient_id: new Types.ObjectId().toString(),
    };

    await this.bookingService.create(bookingPayload);

    const bookedSlot = await this.slotService.bookSlot(slotId);
    return bookedSlot;
  }
}
