import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './schemas/booking.schema';
import { Model, Types, FilterQuery } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<Booking>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new this.bookingModel(createBookingDto);
    return await booking.save();
  }

  async listDoctorBookings(
    doctorId: string,
    startDate?: string,
    endDate?: string,
  ): Promise<Booking[]> {
    const filter: FilterQuery<Booking> =
      startDate && endDate
        ? {
            booking_time: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          }
        : {};

    return this.bookingModel
      .find(filter)
      .populate({
        path: 'slot_id',
        match: { doctor_id: new Types.ObjectId(doctorId) },
      })
      .exec();
  }
}
